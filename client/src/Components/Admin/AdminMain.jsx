import React, { useEffect } from 'react'
import "./Admin.css";
import { Link } from 'react-router-dom';
import AddCategoryForm from './AddCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories } from '../../Redux/ApiCalls/CategoryApiCall';
import { getUsersCount } from '../../Redux/ApiCalls/ProfileApiCall';
import { getPostsCount } from '../../Redux/ApiCalls/PostApiCall';
import { getAllComments } from '../../Redux/ApiCalls/CommentApiCall';

export default function AdminMain() {

 const dispatch = useDispatch();
 const { categories } = useSelector(state => state.category);
 const { usersCount } = useSelector((state) => state.profile);
 const { postsCount } = useSelector((state) => state.post);
 const { comments } = useSelector((state) => state.comment);

 useEffect(() => {
  dispatch(fetchAllCategories());
  dispatch(getUsersCount());
  dispatch(getPostsCount());
  dispatch(getAllComments());
 },[])

  return (
    <>
      <div className="admin-main">
        <div className="admin-main-header">
          {/* Users */}
          <div className="admin-main-card">
            <h5 className="admin-card-title">Users</h5>
            <div className="admin-card-count">{usersCount}</div>
            <div className="admin-card-link-wrapper">
              <Link
                to={"/admin-dashboard/users-table"}
                className="admin-card-link"
              >
                See all Users
              </Link>
              <div className="admin-card-icon">
                <i className="fa-solid fa-person"></i>
              </div>
            </div>
          </div>
          {/* Posts */}
          <div className="admin-main-card">
            <h5 className="admin-card-title">Posts</h5>
            <div className="admin-card-count">{postsCount}</div>
            <div className="admin-card-link-wrapper">
              <Link
                to={"/admin-dashboard/posts-table"}
                className="admin-card-link"
              >
                See all Posts
              </Link>
              <div className="admin-card-icon">
                <i className="fa-solid fa-address-card"></i>
              </div>
            </div>
          </div>
          {/* Categories */}
          <div className="admin-main-card">
            <h5 className="admin-card-title">Categories</h5>
            <div className="admin-card-count">{categories.length}</div>
            <div className="admin-card-link-wrapper">
              <Link
                to={"/admin-dashboard/categories-table"}
                className="admin-card-link"
              >
                See all Categories
              </Link>
              <div className="admin-card-icon">
                <i className="fa-solid fa-user-tag"></i>
              </div>
            </div>
          </div>
          {/* Comments */}
          <div className="admin-main-card">
            <h5 className="admin-card-title">Comments</h5>
            <div className="admin-card-count">{comments.length}</div>
            <div className="admin-card-link-wrapper">
              <Link
                to={"/admin-dashboard/comments-table"}
                className="admin-card-link"
              >
                See all Comments
              </Link>
              <div className="admin-card-icon">
                <i className="fa-solid fa-comment"></i>
              </div>
            </div>
          </div>
        </div>

        <AddCategoryForm />
      </div>
    </>
  );
}
