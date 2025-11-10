
import './Sidebar.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories } from '../../Redux/ApiCalls/CategoryApiCall';
import { useEffect } from 'react';

export default function Sidebar() {

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchAllCategories());
  },[])

  return (
    <>
      <div className="sidebar">
        <h5 className="sidebar-title">CATEGORIES</h5>
        <ul className="sidebar-links">
            {categories.map(category => 
                <Link key={category._id} to={`/posts/categories/${category.title}`} className='sidebar-link'>
                {category.title}
                </Link>
            )}
        </ul>
      </div>
    </>
  );
}
