import React, { useState } from 'react'
import "./UpdateCommentModel.css"
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateComment } from '../../Redux/ApiCalls/CommentApiCall';

export default function UpdateCommentModel({ setUpdateComment, commentForUpdate }) {

  const [text, setText] = useState(commentForUpdate?.text);
  
  const dispatch = useDispatch();

  // Form Update Submit Handler
  const formUpdateSubmitHandler = (e) => {
    e.preventDefault();
    // Validateion
    if (text.trim() === "")
      return toast.error("Please write something", { theme: "colored" , position:"top-center" });

    //console.log({ text });
    dispatch(updateComment(commentForUpdate?._id, { text }));
    setUpdateComment(false)
  };

  return (
    <>
      <div className="update-comment">
        <form onSubmit={formUpdateSubmitHandler} className="update-post-form">
          <abbr title="close">
            <i
              onClick={() => setUpdateComment(false)}
              className="fa-solid fa-circle-xmark update-comment-close"
            ></i>
          </abbr>
          <h1 className="update-comment-title">Edit Comment</h1>
          <input
            type="text"
            className="update-comment-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="update-comment-btn">
            Edit Comment
          </button>
        </form>
      </div>
    </>
  );
}
