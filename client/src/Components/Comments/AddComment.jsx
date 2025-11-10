import React, { useState } from "react";
import "./AddComment.css";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { createComment } from "../../Redux/ApiCalls/CommentApiCall";

export default function AddComment({ postId }) {

  const [text, setText] = useState("");

  const dispatch = useDispatch();

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (text.trim() === "")
      return toast.error("Please Write Something", { theme: "colored" , position:"top-center" });
    //console.log({text})
    dispatch(createComment({ text,postId }));
    setText("");
  };

  return (
    <>
      <form onSubmit={formSubmitHandler} className="add-comment">
        <input
          type="text"
          placeholder="Add Comment"
          className="add-comment-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="add-comment-btn">
          Comment
        </button>
      </form>
    </>
  );
}
