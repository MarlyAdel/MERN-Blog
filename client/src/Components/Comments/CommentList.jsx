import React, { useState } from 'react'
import './CommentList.css'
import swal from 'sweetalert'
import UpdateCommentModel from './UpdateCommentModel';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommnet } from '../../Redux/ApiCalls/CommentApiCall';

dayjs.extend(relativeTime);


export default function CommentList({ comments }) {

  const [updateComment, setUpdateCommet] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);

  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch()


  // Update Comment Handler
  const updateCommentHandler = (comment) => {
    setCommentForUpdate(comment);
    setUpdateCommet(true);
  }


  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteCommnet(commentId));
      } else {
        swal("Something went wrong!");
      }
    });
  };

  return (
    <>
      <div className="comment-list">
        <h4 className="comment-list-count">{comments?.length} Comments</h4>
        {comments?.map((comment) => (
          <div key={comment._id} className="comment-item">
            <div className="comment-item-info">
              <div className="comment-item-username">{comment?.username}</div>
              <div className="comment-item-time">
                {dayjs(comment.createdAt).fromNow()}
              </div>
            </div>
            <p className="comment-item-text">{comment?.text}</p>
            {user?._id === comment.user && (
              <div className="comment-item-icon">
                <i
                  onClick={() => updateCommentHandler(comment)}
                  className="fa-solid fa-pen-to-square"
                ></i>
                <i
                  onClick={() => deleteCommentHandler(comment?._id)}
                  className="fa-solid fa-trash"
                ></i>
              </div>
            )}
            
          </div>
        ))}
        {updateComment && (
          <UpdateCommentModel setUpdateComment={setUpdateCommet} commentForUpdate={commentForUpdate}/>
        )}
      </div>
    </>
  );
}
