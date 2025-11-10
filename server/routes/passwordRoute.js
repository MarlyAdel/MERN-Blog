const express = require("express");
const { sendResetPasswordLinkCtrl, getResetPasswordLinkCtrl, resetPsswordCtrl } = require("../controllers/passwordController");
const router = express.Router();


//* Send Reset Password link
// /api/password/reset-password-link
router.route("/reset-password-link")
      .post(sendResetPasswordLinkCtrl)


//* Get Reset Password Link     
// /api/password/reset-password/:userId/:token
router.route("/reset-password/:userId/:token") 
      .get(getResetPasswordLinkCtrl)


//* Reset Password
// /api/password/reset-password/:userId/:token    
router.route("/reset-password/:userId/:token") 
      .post(resetPsswordCtrl)  





module.exports = router;     