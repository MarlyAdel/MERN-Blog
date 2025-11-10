
const express = require("express");
const router = express.Router();
const {creatNewCommentCtrl, getAllCommentsCtrl, deleteCommentCtrl, updateCommentCtrl} = require("../controllers/commentsController");
const {verifyToken, verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId")


//* Create New Comment
// /api/comments
router.route("/")
    .post(verifyToken, creatNewCommentCtrl)


//* Get All Comments 
// /api/comments
router.route("/")
    .get(verifyTokenAndAdmin, getAllCommentsCtrl)   


//* Delete Comment
// /api/comments/:id
router.route("/:id")
      .delete(validateObjectId, verifyToken, deleteCommentCtrl)


//* Update Comment
// /api/comments/:id
router.route("/:id")
      .put(validateObjectId, verifyToken, updateCommentCtrl)      



module.exports = router;