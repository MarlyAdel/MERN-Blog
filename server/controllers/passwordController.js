
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {User, validateEmail, validateNewPassword} = require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");


//^ Send Reset Password link
/**-------------------------------------------------------------------------------------------------------------------------
 * @desc Send Reset Password link
 * @route /api/password/reset-password-link
 * @method POST 
 * @access public
---------------------------------------------------------------------------------------------------------------------------*/
const sendResetPasswordLinkCtrl = asyncHandler(async(req,res) => {
  //1- Validation
  const {error} = validateEmail(req.body);
  if(error){
    return res.status(400).json({message: error.details[0].error});
  }
  //2- Get the user from DB By email
  const user = await User.findOne({email: req.body.email});
  if(!user){
    return res.status(404).json({message: "User with given email does not exist!"})
  }
  //3- Check if token already exists — if not, create new one
  let verificationToken = await VerificationToken.findOne({ userId: user._id});
  if(!verificationToken){
    verificationToken = new VerificationToken ({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
    })
    await verificationToken.save();
  }
  //4- Creating link
  const link = `${process.env.CLIENT_DOMAIN}/reset-password/${user._id}/${verificationToken.token}`;
  //5- Creating HTML Template
  const htmlTemplate = `
  <p>Click the link below to set a new password</p>
  <a href="${link}">Reset Password</a>`
  //6- Sending Email
  await sendEmail(user.email, "Reset Password", htmlTemplate)
  //7- Response to the client
  res.status(200).json({message: "We sent you an email, please check your inbox to reset your password"});
})



//^ Get Reset Password Link
/**-------------------------------------------------------------------------------------------------------------------------------
 * @desc Get Reset Password Link
 * @route /api/password/reset-password/:userId/:token
 * @method GET
 * @access public
 --------------------------------------------------------------------------------------------------------------------------------*/
const getResetPasswordLinkCtrl = asyncHandler(async(req,res) => {
  //1- Find user by ID 
  const user = await User.findById(req.params.userId);
  if(!user){
    return res.status(400).json({message: "Invalid link"});
  }
  //2- Find token in DB
  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token
  })
  if (!verificationToken){
    return res.status(400).json({ message: "Invalid link" });
  }
  //3- Sending Response to the client
  res.status(200).json({ message: "Valid url" })

})


//^ Reset Password
/**-------------------------------------------------------------------------------------------------------------------------------
 * @desc Reset Password
 * @route /api/password/reset-password/:userId/:token
 * @method POST
 * @access public
 --------------------------------------------------------------------------------------------------------------------------------*/
const resetPsswordCtrl = asyncHandler(async(req,res) => {
  //1-Validation
  const { error } = validateNewPassword(req.body);
  if (error)
    return res.status(400).json({ message: error.details[0].message });
  //2- Find user by ID 
  const user = await User.findById(req.params.userId);
  if(!user){
    return res.status(400).json({message: "Invalid link"});
  }
  //3- Find token in DB
  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token
  })
  if (!verificationToken){
    return res.status(400).json({ message: "Invalid link" });
  }
  //4- Check account verification
  if(!user.isAccountVerified){
    user.isAccountVerified = true;
  } 
  //5- Hash New Password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password, salt);
  //6- Updaye User Password
   user.password = hashedPassword;
   await user.save();
  //7- Delete the user token
   await verificationToken.deleteOne();
  //8- Sending Response to the client
  res.status(200).json({ message: "Your password has been reset successfully.. please Log in" })
})




module.exports = {
    sendResetPasswordLinkCtrl,
    getResetPasswordLinkCtrl,
    resetPsswordCtrl
}