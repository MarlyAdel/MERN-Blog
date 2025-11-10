import React from 'react'
import "./Admin.css";
import { Link } from 'react-router-dom';

export default function AdminSidebar() {
  return (
    <>
      <div className="admin-sidebar">
        <Link to={"/admin-dashboard"} className="admin-sidebar-title">
          <i className="fa-solid fa-chart-column"></i>
          Dashboard
        </Link>
        <ul className="admin-dashboard-list">
          <Link className='admin-sidbar-link' to={"/admin-dashboard/users-table"}>
            <i className="fa-solid fa-person"></i>
            Users
          </Link>
          <Link className='admin-sidbar-link' to={"/admin-dashboard/posts-table"}>
            <i className="fa-solid fa-address-card"></i>
            Posts
          </Link>
          <Link className='admin-sidbar-link' to={"/admin-dashboard/categories-table"}>
            <i className="fa-solid fa-user-tag"></i>
            Categories
          </Link>
          <Link className='admin-sidbar-link' to={"/admin-dashboard/comments-table"}>
            <i className="fa-solid fa-comment"></i>
            Comments
          </Link>
        </ul>
      </div>
    </>
  );
}
