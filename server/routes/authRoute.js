
const express = require("express");
const router = express.Router();
const {registerUserCtrl, loginUserCtrl, verifyUserAccountCtrl} = require("../controllers/authController")


//* Register
// /api/auth/register
router.route("/register")
      .post(registerUserCtrl )
      
//* Login      
// /api/auth/login
router.route("/login")
      .post(loginUserCtrl)


//* Verify User Account      
// /api/auth/:userId/verify/:token
router.route("/:userId/verify/:token")
      .get(verifyUserAccountCtrl)





module.exports = router;