
const asyncHandler = require("express-async-handler");
const {Comment , validateCreateComment , validateUpdateComment} = require("../models/Comment");
const {User} = require("../models/User")


//^ Create New Comment
/**---------------------------------------------------------------------------------------------------------------------------------
 * @desc Create New Comment
 * @route /api/comments
 * @method POST
 * @access private (only logged in user)
 ----------------------------------------------------------------------------------------------------------------------------------*/
const creatNewCommentCtrl = asyncHandler(async (req,res) => {
    const {error} = validateCreateComment(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message})
    }
    // Get the name of the user By his id
    const profile = await User.findById(req.user.id);
    // Create New Comment
    const comment = new Comment ({
        postId: req.body.postId,
        text: req.body.text,
        user: req.user.id,
        username: profile.username
    })
    const result = await comment.save()
    res.status(201).json(result)
 })


//^ Get All Comments
/**---------------------------------------------------------------------------------------------------------------------------------
 * @desc Get All Comments
 * @route /api/comments
 * @method GET 
 * @access private  (only Admin)
 ----------------------------------------------------------------------------------------------------------------------------------*/
const getAllCommentsCtrl = asyncHandler(async (req,res) => {
   const comments = await Comment.find().populate("user");
   res.status(200).json(comments)
})


//^ Delete Comment
/**---------------------------------------------------------------------------------------------------------------------------------
 * @desc Delete Comment
 * @route /api/comments/:id
 * @method DELETE 
 * @access private  (only Admin or owner of the comment)
 ----------------------------------------------------------------------------------------------------------------------------------*/
const deleteCommentCtrl = asyncHandler(async (req,res) => {
   const comment = await Comment.findById(req.params.id);
   if(!comment){
    return res.status(404).json({message: "Comment Not Found"})
   }
   if(req.user.isAdmin || req.user.id === comment.user.toString()){
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Comment has been deleted"})
   }
   else{  // ya3ni la al user admin wala al comment bta3o
     res.status(403).json({message: "access denied, not allowed"})
   }
})


//^ Update Comment
/**---------------------------------------------------------------------------------------------------------------------------------
 * @desc Update Comment
 * @route /api/comments/:id
 * @method PUT 
 * @access private  (only owner of the comment)
 ----------------------------------------------------------------------------------------------------------------------------------*/
const updateCommentCtrl = asyncHandler( async(req,res) => {
   const {error} = validateUpdateComment(req.body);
   if(error){
    return res.status(400).json({message: error.details[0].message})
   }
   //Take the comment from the DB 
   const comment = await Comment.findById(req.params.id)
   if(!comment){
     return res.status(404).json({message: "Comment Not Found"})
   }
   // if the comment belongs to the user who create it or not
   if(req.user.id !== comment.user.toString()){
    res.status(403).json({message: "access denied, only user himself can edit his comment"})
   }
   //Update Comment
   const updateCommet = await Comment.findByIdAndUpdate(req.params.id, {
    $set: {
        text: req.body.text
    }
   }, {new: true})
   res.status(200).json(updateCommet)
})






module.exports = {
    creatNewCommentCtrl,
    getAllCommentsCtrl,
    deleteCommentCtrl,
    updateCommentCtrl
} 