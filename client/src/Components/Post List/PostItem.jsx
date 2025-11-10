import React from 'react'
import { Link } from 'react-router-dom'
import "./PostList.css"

export default function PostItem({ post, username, userId }) {

  const profileLink = userId ? `/profile/${userId}` : `/profile/${post?.user?._id}`;

  return (
    <>
      <div className="post-item">
        <div className="post-item-image">
          <img src={post?.image.url} alt="" className="image-post" />
        </div>
        <div className="post-item-info">
          <div className="post-info">
            <div className="post-item-author">
              <strong>Author: </strong>
              <Link to={profileLink} className="post-username">
                {username ? username : post?.user?.username}
              </Link>
            </div>
            <div className="post-item-date">
              {new Date(post?.createdAt).toDateString()}
            </div>
          </div>
          <div className="post-item-details">
            <h4 className="post-item-title">{post?.title}</h4>
            <Link
              to={`/posts/categories/${post?.category}`}
              className="post-item-category"
            >
              {post?.category}
            </Link>
          </div>
          <p className="post-item-description">
            {post?.description}
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias
            sapiente consectetur vitae illo, labore recusandae harum blanditiis
            facere? Consequuntur labore nostrum magni consectetur natus iste?
            Neque vel fugiat optio sunt sequi debitis esse?
          </p>
          <Link to={`/posts/details/${post?._id}`} className="post-item-link">
            Read More...
          </Link>
        </div>
      </div>
    </>
  );
 
}
