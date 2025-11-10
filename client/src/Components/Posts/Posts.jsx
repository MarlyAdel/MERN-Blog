import React, { useEffect, useState } from 'react'
import './Posts.css'
import PostList from '../Post List/PostList'
import Sidebar from '../SideBar/Sidebar'
import Pagination from '../Pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, getPostsCount } from '../../Redux/ApiCalls/PostApiCall'


const POST_PER_PAGE = 3;


export default function Posts() {

  const dispatch = useDispatch();
  const [currentPage , setCurrentPage] = useState(1);
  const { postsCount , posts } = useSelector(state => state.post);
  
  const pages = Math.ceil(postsCount / POST_PER_PAGE);


  useEffect(() => {
    dispatch(fetchPosts(currentPage));
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    dispatch(getPostsCount());
  }, [])

  return (
    <>
      <section className="post-page">
        <PostList posts={posts} />
        <Sidebar />
      </section>
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
