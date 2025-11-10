import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./PostDetails.css";
import { toast } from "react-toastify";
import AddComment from "../Comments/AddComment";
import CommentList from "../Comments/CommentList";
import swal from "sweetalert"
import UpdatePostModel from "./UpdatePostModel";
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, fetchSinglePost, toggleLikeePost, updatePostImage } from "../../Redux/ApiCalls/PostApiCall";

export default function PostDetails() {

  const { id } = useParams();

  const [file, setFile] = useState(null);
  const [updatePost , setUpdatePost] = useState(false);

  const dispatch = useDispatch();
  const { post } = useSelector(state => state.post);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate()


  useEffect(() => {
    dispatch(fetchSinglePost(id))
    window.scrollTo(0, 0);
  }, [id]);

  // Update Image Submit Handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();

    if(!file) return toast.warning("There is no file!", {theme:"colored", position:"top-center" })

    //console.log("Image Updated Successfully");
    const formData = new FormData();
    formData.append("image", file);
    dispatch(updatePostImage(formData, post?._id));
  };

  // Delete Post Handler
  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOK) => {
      if (isOK) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      } 
    });
  }

  return (
    <>
      <section className="post-details">
        <div className="post-details-image">
          <img
            src={file ? URL.createObjectURL(file) : post?.image.url}
            alt="Post Image"
            className="details-img"
          />

          {user?._id === post?.user?._id && (
            <form
              onSubmit={updateImageSubmitHandler}
              className="update-post-image-form"
            >
              <label htmlFor="file" className="post-label">
                <i className="fa-regular fa-image"></i>
                Select new image
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button type="submit">Upload</button>
            </form>
          )}
        </div>
        <h1 className="post-details-title">{post?.title}</h1>
        <div className="post-details-user-info">
          <img
            src={post?.user?.profilePhoto?.url}
            alt=""
            className="post-details-user-img"
          />
          <div className="post-details-user">
            <strong>
              <Link
                className="username-details"
                to={`/profile/${post?.user?._id}`}
              >
                {post?.user?.username}
              </Link>
            </strong>
            <span>{new Date(post?.createdAt).toDateString()}</span>
          </div>
        </div>
        <p className="post-details-description">
          {post?.description}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum dolores
          odit, eos excepturi iste fugiat veniam at aliquam repudiandae! Iusto.
          orem ipsum, dolor sit amet consectetur adipisicing elit. Eum dolores
          odit, eos excepturi iste fugiat veniam at aliquam repudiandae! Iusto.
          orem ipsum, dolor sit amet consectetur adipisicing elit. Eum dolores
          odit, eos excepturi iste fugiat veniam at aliquam repudiandae! Iusto.
        </p>
        <div className="post-details-icon">
          <div>
            {user && (
              <i
                onClick={() => dispatch(toggleLikeePost(post?._id))}
                className={
                  post?.likes.includes(user?._id) 
                  ? "fa-solid fa-thumbs-up"
                  : "fa-regular fa-thumbs-up"
                  
                }
              ></i>
            )}

            <small>{post?.likes.length} Likes</small>
          </div>

          {user?._id === post?.user?._id && (
            <div>
              <i
                onClick={() => setUpdatePost(true)}
                className="fa-solid fa-pen-to-square"
              ></i>
              <i onClick={deletePostHandler} className="fa-solid fa-trash"></i>
            </div>
          )}
        </div>

        {user ? <AddComment postId={post?._id}/> : <p className="post-details-comment"> To Write a Comment you should Login first</p>}

        <CommentList comments={post?.comments} />

        {updatePost && (
          <UpdatePostModel post={post} setUpdatePost={setUpdatePost} />
        )}
      </section>
    </>
  );
}
