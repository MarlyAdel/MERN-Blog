
const asyncHandler = require("express-async-handler");
const {User , validateUpdateUser} = require("../models/User");
const bcrypt = require("bcryptjs");
const path = require("path");
const {cloudinaryUploadImage , cloudinaryRemoveImage, cloudinaryRemoveMultipleImages} = require("../utils/cloudinary");
const fs = require("fs"); //fileSystem
const {Post} = require("../models/Post");
const {Comment} = require("../models/Comment");



//^ Get All Users Profile
/**-----------------------------------------------------------------------------------------------------------------------------------
 * @desc Get ALl Users Profile
 * @route /api/users/profile
 * @method GET
 * @access private (only admin)
 -----------------------------------------------------------------------------------------------------------------------------------*/
const getAllUsersCtrl = asyncHandler(async(req,res) => {
   
    const user = await User.find().select("-password").populate("posts");
    res.status(200).json(user)
})


//^ Get User Profile By Id
/**---------------------------------------------------------------------------------------------------------------------------------
 * @desc Get User Profile By Id
 * @route /api/users/profile/:id
 * @method GET
 * @access public  
 --------------------------------------------------------------------------------------------------------------------------------*/

const getUserByIdCtrl = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id).select("-password").populate("posts");
    if(user){
        res.status(200).json(user);
    }
    else{
        res.status(404).json({message: "User Not Found"})
    }
 })


//^ Update User Profile
/**-------------------------------------------------------------------------------------------------------------------------------
 * @desc Update User Profile
 * @route /api/user/profile/:id
 * @method PUT
 * @access private (only user himself)
 --------------------------------------------------------------------------------------------------------------------------------*/ 
const updateUserCtrl = asyncHandler(async(req,res) => {
    const {error} = validateUpdateUser(req.body);
 if(error){
    return res.status(400).json({message: error.details[0].message})
 }

 if(req.body.password){
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password , salt)
 }

 const updateUser = await User.findByIdAndUpdate(req.params.id , {
    $set: {
        username: req.body.username,
        password: req.body.password,
        bio: req.body.bio
    }
 }, {new:true}).select("-password").populate("posts");

  res.status(200).json(updateUser)

 })

 //^ Get Users Count
/**-----------------------------------------------------------------------------------------------------------------------------------
 * @desc Get Users Count
 * @route /api/users/count
 * @method GET
 * @access private (only admin)
 -----------------------------------------------------------------------------------------------------------------------------------*/
const getUsersCountCtrl = asyncHandler(async(req,res) => {
   
    const count = await User.countDocuments();
    res.status(200).json(count)
})


//^ Upload Profile Photo
/**----------------------------------------------------------------------------------------------------------------------------------
 * @desc Profile Photo Upload
 * @route /api/users/profile/profile-photo-upload
 * @method POST
 * @access private (only logged in user)
 -----------------------------------------------------------------------------------------------------------------------------------*/
const profilePhotoUploadCtrl = asyncHandler(async(req,res) => {
    //console.log(req.file)
    //1- Validation
    if(!req.file){
        return res.status(400).json({ message: "No File Provided" });
    }
    //2- Get the Path to the image
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
    //3- Upload to cloudinary
    const result = await cloudinaryUploadImage(imagePath);
    //console.log(result) 
    //4- Get the User from DB
    const user = await User.findById(req.user.id);
    //5- Delete old profile photo if exist
    if(user.profilePhoto.publicId !== null){  
      await cloudinaryRemoveImage(user.profilePhoto.publicId);
    }
    //6- Change the profile photo field in the DB
    user.profilePhoto = {
        publicId: result.public_id,
        url: result.secure_url,
    }
    await user.save();
    //7- Send respone to the client
    res.status(200).json({ 
        message: "Your Profile Photo Uploaded SuccessFully",
        profilePhoto: { url: result.secure_url , publicId: result.public_id }
    });
    //8- Remove image from the server
    fs.unlinkSync(imagePath);
})


//^ Delete User Profile
/**--------------------------------------------------------------------------------------------------------------------------------
 * @desc Delete user profile (Account)
 * @route /api/user/profile/:id
 * @method Delete
 * @access private  (only admin or user himself)
 ---------------------------------------------------------------------------------------------------------------------------------*/
const deleteUserProfileCtrl = asyncHandler(async (req,res) => {
    //1- Get user from DB
    const user = await User.findByIdAndDelete(req.params.id).select("-password");
    if(!user){
        res.status(404).json({message: "User Not Found"});
    }
    // TODO [Done] 2- Get all Posts from DB
    const posts = await Post.find({ user: user._id })
    // TODO [Done] 3- Get the public ids from the posts
    const publicIds = posts?.map((post) => post.image.publicId)
    // TODO [Done] 4-  Delete all posts image from cloudinary that belong to this user
    if(publicIds?.length > 0){
        await cloudinaryRemoveMultipleImages(publicIds);
    }
    //5- Delete the profile picture from cloudinary
    if(user.profilePhoto.publicId !== null){
      await cloudinaryRemoveImage(user.profilePhoto.publicId);
    }
    // TODO [Done] 6- Delete user posts and comments
    await Post.deleteMany({ user: user._id });
    await Comment.deleteMany({ user: user._id })
    //7- Delete the user himself
    await User.findByIdAndDelete(req.params.id);
    //8- Send response to the client
    res.status(200).json({ message: "Your profile has been deleted successfully" });
    
})

module.exports = {
    getAllUsersCtrl,
    getUserByIdCtrl,
    updateUserCtrl,
    getUsersCountCtrl,
    profilePhotoUploadCtrl,
    deleteUserProfileCtrl
}