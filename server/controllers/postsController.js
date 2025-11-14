
const asyncHandler = require("express-async-handler");
const {Post, validateCreatePost, validateUpdatePost} = require("../models/Post");
const path = require("path");
const fs = require("fs");
const {cloudinaryUploadImage, cloudinaryRemoveImage} = require("../utils/cloudinary");
const {Comment} = require("../models/Comment");
const sharp = require("sharp")


//^ Create New Post
/**------------------------------------------------------------------------------------------------------------------------------
 * @desc Create New Post
 * @route /api/posts
 * @method POST
 * @access private (only logged in user)
 ---------------------------------------------------------------------------------------------------------------------------------*/
const createNewPostCtrl = asyncHandler(async (req,res) => {
    //1- Validation for image
    if(!req.file){
       return res.status(400).json({message: "No image provided"});
    }
    //2- Validation fror data
    const {error} = validateCreatePost(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message})
    }
    //3- Upload photo
    const optimizedImage = await sharp(req.file.buffer)
  .resize({ width: 800 })   
  .jpeg({ quality: 50 })     
  .toBuffer();
  const uploadedImage = await cloudinaryUploadImage(optimizedImage);

    //4- Create new post and save it to DB
    try {
       const post = new Post ({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        user: req.user.id,
        image: {
            url: uploadedImage.secure_url,
            publicId: uploadedImage.public_id,
        }
       }) 
       const result = await post.save();
        //5- Send response to the client
       res.status(201).json(result)
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
        //6- Remove image from the server
       // fs.linkSync(imagePath);
})


//^ Get All Posts
/**---------------------------------------------------------------------------------------------------------------------------------
 * @desc Get all Posts
 * @rout /api/posts
 * @method GET
 * @access public
 --------------------------------------------------------------------------------------------------------------------------------*/
const getAllPostsCtrl = asyncHandler( async(req,res) => {
    const {pageNumber, category} = req.query;
    const postPerPage = 3;
    let posts;

    if(pageNumber){
        posts = await Post.find()
            .skip((pageNumber -1) * postPerPage) 
            .limit(postPerPage)
            .sort({ createdAt: -1 }) //last post will be the first post
            .populate("user", ["-password"])  // get the info of the user & hide password
    }
    else if(category){
        posts = await Post.find({ category })
            .sort({ createdAt: -1 })
            .populate("user", ["-password"]);
    }
    else{
        posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate("user", ["-password"])
    }
    res.status(200).json(posts)
})


//^ Get single Post
/**---------------------------------------------------------------------------------------------------------------------------------
 * @desc Get Single Post
 * @rout /api/posts/:id
 * @method GET
 * @access public
 --------------------------------------------------------------------------------------------------------------------------------*/
const getSinglePostCtrl = asyncHandler( async(req,res) => {
    
    const post = await Post.findById(req.params.id).populate("user", ["-password"]).populate("comments");
    if(!post){
        res.status(404).json({message: "Post Not Found"})
    }
    res.status(200).json(post)
})


//^ Get Posts Count
/**---------------------------------------------------------------------------------------------------------------------------------
 * @desc Get Posts Count
 * @rout /api/posts/count
 * @method GET
 * @access public
 --------------------------------------------------------------------------------------------------------------------------------*/
const getPostCountCtrl = asyncHandler( async(req,res) => {
    
    const count = await Post.countDocuments();
    res.status(200).json(count);
})


//^ Delete Post 
/**--------------------------------------------------------------------------------------------------------------------------------
 * @desc Delete Post
 * @route /api/posts/:id
 * @method DELETE
 * @access private (Only Admin or the owner of the post)
 ---------------------------------------------------------------------------------------------------------------------------------*/
const deletePostCtrl = asyncHandler( async(req,res) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        return res.status(404).json({message: "Post Not Found"});
    }
    if(req.user.isAdmin || req.user.id === post.user.toString()) {
        await Post.findByIdAndDelete(req.params.id);
        await cloudinaryRemoveImage(post.image.publicId);

     //TODO [Done] .. Delete all comments that belongs to this post
     await Comment.deleteMany({ postId: post._id });
     
     res.status(200).json({message: "Post has been deleted successfully", postId: post._id});
    }
    else{
        res.status(403).json({message: "access denied, forbidden"})
    }
})


//^ Update Post
/**---------------------------------------------------------------------------------------------------------------------------------
 * @desc Update Post
 * @route /api/posts/:id
 * @method PUT 
 * @access private (only owner of the post)
 -----------------------------------------------------------------------------------------------------------------------------------*/
const updatePostCtrl = asyncHandler(async(req,res) => {
    //1- Validation
    const {error} = validateUpdatePost(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }
    //2- Get the post from DB and check if the post exist
    const post = await Post.findById(req.params.id);
    if(!post){
        return res.status(404).json({message: "Post Not Found"})
    }
    //3- Check if this post belong to logged in user
    if(req.user.id !== post.user.toString()){
        return res.status(403).json({message: "access denied, you are not allowed"})
    }
    //4- Update post
    const updatePost = await Post.findByIdAndUpdate(req.params.id , {
        $set: {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category
        }
    }, {new:true}).populate("user", ["-password"]).populate("comments")
    //5- Send response to the client
    res.status(200).json(updatePost)
})


//^ Update Post Image
/**---------------------------------------------------------------------------------------------------------------------------------
 * @desc Update Post Image
 * @route /api/posts/update-image/:id
 * @method PUT 
 * @access private (only owner of the post)
 -----------------------------------------------------------------------------------------------------------------------------------*/
const updatePostImageCtrl = asyncHandler(async(req,res) => {
    //1- Validation
    if(!req.file){
        return res.status(400).json({message: "No Image Provided"})
    }
    //2- Get the post from DB and check if the post exist
    const post = await Post.findById(req.params.id);
    if(!post){
        return res.status(404).json({message: "Post Not Found"})
    }
    //3- Check if this post belong to logged in user
    if(req.user.id !== post.user.toString()){
        return res.status(403).json({message: "access denied, you are not allowed"})
    }
    //4- First delete the old image 
    await cloudinaryRemoveImage(post.image.publicId);
    //5- Then upload the new image
    //const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
    const result = await cloudinaryUploadImage(req.file.buffer);

    //6- Update image field in the DB
    const updatePost = await Post.findByIdAndUpdate(req.params.id , {
        $set: {
            image: {
                url: result.secure_url,
                publicId: result.public_id
            }
        }
    }, {new:true}) 
    //7- Send response to the client
    res.status(200).json(updatePost);
    //8- Remove image from the Server
    //fs.linkSync(imagePath);
})


//^ Toggle Like 
/**---------------------------------------------------------------------------------------------------------------------------------
 * @desc Toggle Like
 * @route /api/posts/like/:id
 * @method PUT
 * @access private (only logged in user)
 ---------------------------------------------------------------------------------------------------------------------------------*/
const toggleLikeCtrl = asyncHandler(async(req,res) => {
    //1- Get the post from DB and check if the post exist
    let post = await Post.findById(req.params.id);
    if(!post){
       return res.status(404).json({message: "Post Not Found"})
    }
    //2- Check .. Is the logged in user is in the post array
    const isPostAlreadyLiked = post.likes.find((user) => user.toString() === req.user.id)
    //3- Check if the user make like or not
    if(isPostAlreadyLiked){
        post = await Post.findByIdAndUpdate(req.params.id, {
            $pull: { // $pull can remove value from the likes array  .. it works only on arrays
               likes: req.user.id
            }
        }, {new:true})
    }
    else{  // means the user doesn't make like and he want to make like
        post = await Post.findByIdAndUpdate(req.params.id, {
            $push: { // $push adds to the array
               likes: req.user.id
            }
        }, {new:true})
    }
    //4- Send response to the client
    res.status(200).json(post)
})




module.exports = {
   createNewPostCtrl,
   getAllPostsCtrl,
   getSinglePostCtrl,
   getPostCountCtrl,
   deletePostCtrl,
   updatePostCtrl,
   updatePostImageCtrl,
   toggleLikeCtrl
}