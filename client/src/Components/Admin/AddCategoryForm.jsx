import React, { useState } from "react";
import "./Admin.css";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { createCategory } from "../../Redux/ApiCalls/CategoryApiCall";

export default function AddCategoryForm() {

  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (title.trim() == "")
      return toast.error("Category Title is required", { theme: "colored", position:"top-center" });

    //console.log({ title });
    dispatch(createCategory({ title }));
    setTitle("");
  };

  return (
    <>
      <div className="add-category">
        <h6 className="add-category-title">Add New Category</h6>
        <form onSubmit={formSubmitHandler}>
          <div className="add-category-form-group">
            <label htmlFor="title">Category Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter Category Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <button className="add-category-btn" type="submit">
            Add
          </button>
        </form>
      </div>
    </>
  );
}
