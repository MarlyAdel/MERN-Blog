
const express = require("express");
const router = express.Router();
const photoUpload = require("../middlewares/photoUpload");
const {verifyToken} = require("../middlewares/verifyToken")
const {createNewPostCtrl , getAllPostsCtrl , getSinglePostCtrl , getPostCountCtrl, deletePostCtrl , updatePostCtrl, updatePostImageCtrl, toggleLikeCtrl} = require("../controllers/postsController");
const validateObjectId = require("../middlewares/validateObjectId");


//* Create New Post
// /api/posts
router.route("/")
      .post(verifyToken, photoUpload.single("image"), createNewPostCtrl)
      

//* Get All Posts
// /api/posts
router.route("/")
      .get(getAllPostsCtrl)


//* Get Posts Count
// /api/posts/count
router.route("/count")
      .get(getPostCountCtrl)      


//* Get Single Post
// /api/posts/:id
router.route("/:id")
      .get(validateObjectId , getSinglePostCtrl)


//* Delete Post
// /api/posts/:id
router.route("/:id")
      .delete(validateObjectId, verifyToken, deletePostCtrl)


//* Update Post
// /api/posts/:id
router.route("/:id")
      .put(validateObjectId, verifyToken ,updatePostCtrl)


//* Update Post Image
// /api/posts/update-image/:id
router.route("/update-image/:id")
      .put(validateObjectId, verifyToken, photoUpload.single("image") , updatePostImageCtrl)


//* Toggle Like
// /api/posts/like/:id
router.route("/like/:id")
      .put(validateObjectId, verifyToken, toggleLikeCtrl)




 


module.exports = router;