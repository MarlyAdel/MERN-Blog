import React, { useEffect } from 'react'
import "./Home.css"
import PostList from '../Post List/PostList'
import Sidebar from '../SideBar/Sidebar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../Redux/ApiCalls/PostApiCall';

export default function Home() {

  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPosts(1))
  },[])

  return (
    <>
      <section className="home">
        <div className="hero-header">
          <div className="hero-header-layout">
            <h1 className="home-title">Welcome to Blog</h1>
          </div>
        </div>
        <div className="home-latest-post">Latest Posts</div>
        <div className="home-container">
          <PostList posts={posts} />
          <Sidebar />
        </div>
        <div className="home-see-post-link">
          <Link to={"/posts"} className='home-link'>See All Posts..</Link>
        </div>
      </section>
    </>
  );
}
