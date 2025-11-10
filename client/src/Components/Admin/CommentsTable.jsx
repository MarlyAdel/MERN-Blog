import React, { useEffect } from "react";
import "./UsersTable.css";
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommnet, getAllComments } from "../../Redux/ApiCalls/CommentApiCall";


export default function CommentsTable() {

  const dispatch = useDispatch();
  const {comments} = useSelector(state => state.comment)

  useEffect(() => {
    dispatch(getAllComments());
  },[])

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
      }
    });
  };

  return (
    <>
      <section className="table-container">
        <AdminSidebar />

        <div className="table-wrapper">
          <h1 className="table-title">Comments</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Count</th>
                <th>User</th>
                <th>Comment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="table-image">
                      <img
                        src={item.user.profilePhoto?.url}
                        alt="User Profile"
                        className="table-user-img"
                      />
                      <span className="table-username">{item.user.username}</span>
                    </div>
                  </td>
                  <td>{item.text}</td>
                  <td>
                    <div className="table-btn-group">
                      <button onClick={() => deleteCommentHandler(item._id)}>
                        Delete Comment
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
