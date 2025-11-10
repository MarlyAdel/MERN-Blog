import React from 'react'
import PostItem from './PostItem'
import "./PostList.css"

export default function PostList({ posts }) {
  return(
    <>
    <div className='post-list'>
        {posts.map(item => <PostItem post={item} key={item._id}/>)}
    </div>
  </>
  )
  
}
