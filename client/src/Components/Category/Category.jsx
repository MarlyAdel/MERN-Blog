import React, { useEffect } from 'react'
import './Category.css'
import { Link, useParams } from 'react-router-dom'
import PostList from '../Post List/PostList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsBasedOnCategory } from '../../Redux/ApiCalls/PostApiCall';

export default function Category() {

  const { category } = useParams();
  const dispatch = useDispatch();
  const { postsCategory } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPostsBasedOnCategory(category));
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <>
      <section className="category">
        {postsCategory.length === 0 ? (
          <>
            <h1 className="category-not-found">
              Posts with <span>{category} </span> Category not Found
            </h1>
            <Link to={"/posts"} className="category-not-found-link">
              Go To Posts Page
            </Link>
          </>
        ) : (
          <>
            <h1 className="category-title">Posts based on {category}</h1>
            <PostList posts={postsCategory} />
          </>
        )}
      </section>
    </>
  );
}
