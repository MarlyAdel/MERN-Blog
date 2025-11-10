import React, { useEffect, useState } from "react";
import "./UpdatePostModel.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../Redux/ApiCalls/PostApiCall";
import { fetchAllCategories } from "../../Redux/ApiCalls/CategoryApiCall";

export default function UpdatePostModel({ setUpdatePost, post }) {

  const [title, setTitle] = useState(post.title);
  const [category, setCategory] = useState(post.category);
  const [description, setDescription] = useState(post.description);

  const dispatch = useDispatch();

  const { categories } = useSelector(state => state.category);


  // Form Update Submit Handler
  const formUpdateSubmitHandler = (e) => {
    e.preventDefault();
    // Validateion
    if (title.trim() === "") return toast.error("Post title is required", {theme:"colored", position:"top-center" });
    if (category.trim() === "") return toast.error("Category title is required", { theme: "colored" , position:"top-center" });
    if (description.trim() === "") return toast.error("Description title is required", { theme: "colored" , position:"top-center" });

    //console.log({ title, category, description });
    dispatch(updatePost({ title, category, description }, post?._id));
    setUpdatePost(false);
  }

  useEffect(() => {
    dispatch(fetchAllCategories());
  },[])


  return (
    <>
      <div className="update-post">
        <form onSubmit={formUpdateSubmitHandler} className="update-post-form">
          <abbr title="close">
            <i
              onClick={() => setUpdatePost(false)}
              className="fa-solid fa-circle-xmark update-post-close"
            ></i>
          </abbr>
          <h1 className="update-post-title">Update Post</h1>
          <input
            type="text"
            className="update-post-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="update-post-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option disabled value="">
              Select A Category
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
          <textarea
            className="update-post-textarea"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="submit" className="update-post-btn">
            Update Post
          </button>
        </form>
      </div>
    </>
  );
}
