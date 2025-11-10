
const express = require("express");
const router = express.Router();
const {getAllUsersCtrl , getUserByIdCtrl , updateUserCtrl , getUsersCountCtrl , profilePhotoUploadCtrl , deleteUserProfileCtrl} = require("../controllers/usersController");
const {verifyToken , verifyTokenAndAdmin  , verifyTokenAndOnlyUser , verifyTokenAndAuthorization} = require("../middlewares/verifyToken");
const validateOnjectId = require("../middlewares/validateObjectId");
const photoUpload = require("../middlewares/photoUpload");


//* Get All Users Profile
// /api/users/profile
router.route("/profile")
      .get(verifyTokenAndAdmin , getAllUsersCtrl)


//* Get User By Id
// /api/users/profile/:id
router.route("/profile/:id")
      .get( validateOnjectId, getUserByIdCtrl)


//* Update User
// /api/users/profile/:id
router.route("/profile/:id")
      .put(validateOnjectId,verifyTokenAndOnlyUser, updateUserCtrl )


//* Get Users Count
// /api/users/count
router.route("/count")
      .get(getUsersCountCtrl)


//* Upload User Profile Photo
// /api/users/profile/profile-photo-upload
router.route("/profile/profile-photo-upload")   
      .post(verifyToken, photoUpload.single("image") , profilePhotoUploadCtrl)
      
      
//* Delete User Profile
// /api/users/profile/:id
router.route("/profile/:id")
      .delete(validateOnjectId ,verifyTokenAndAuthorization, deleteUserProfileCtrl)





module.exports = router