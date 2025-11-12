import React, { useEffect, useState } from "react";
import "./CreatePost.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../Redux/ApiCalls/PostApiCall";
import { useNavigate } from "react-router-dom";
import {Audio} from 'react-loader-spinner'
import { fetchAllCategories } from "../../Redux/ApiCalls/CategoryApiCall";


export default function CreatePost() {

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

   const dispatch = useDispatch();
   const { loading, isPostCreated } = useSelector((state) => state.post);
   const navigate = useNavigate();

   const { categories } = useSelector(state => state.category)


  //~ Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    
    //Validation
    if(title.trim() === "") return toast.error("Post Title is requires",{ theme:"colored" , position:"top-center" });
    if(category.trim() === "") return toast.error("Post Category is required", { theme: "colored" , position:"top-center" });
    if(description.trim() === "") return toast.error("Post Description is required", { theme: "colored" , position:"top-center" });
    if(!file) return toast.error("Post Image is required", { theme: "colored" , position:"top-center" });
    
    //Preparing Data in FormData()
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);

    //TODO{Done} .. Send fromData to Server

   if (newPost.get("image").size > 5 * 1024 * 1024) {
     // 5 ميجا
     toast.error("The Size of the photo is too larg");
     return;
   }

    //console.log({ title, category, description, file });
    dispatch(createPost(formData));

  }

  useEffect(() => {
    if(isPostCreated){  // if the post Created navigate to Home Page
      navigate("/")
    }
  },[isPostCreated, navigate])

  useEffect(() => {
    dispatch(fetchAllCategories())
  },[])


  return (
    <>
      <section className="create-post">
        <h1 className="create-post-title">Create New Post</h1>
        <form onSubmit={formSubmitHandler} className="create-post-form">
          <input
            type="text"
            placeholder="Post Title"
            className="create-post-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="create-post-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option disabled value="">Select A Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.title}>{category.title}</option>
            ))}

          </select>
          <textarea
            className="create-post-textarea"
            rows="5"
            placeholder="Post Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="file"
            name="file"
            id="file"
            className="create-post-upload"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit" className="create-post-btn">
            {loading ? (
              <Audio
                height="40"
                width="40"
                color="white"
                ariaLabel="audio-loading"
                wrapperStyle={{}}
                wrapperClass="wrapper-class"
                visible={true}
              />
            ) : (
              "Create"
            )}
          </button>
        </form>
      </section>
    </>
  );
}
