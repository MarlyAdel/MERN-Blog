import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/ApiCalls/AuthApiCall";


export default function Navbar() {

  const [toggle, setToggle] = useState(false);
  const [dropdown , setDropdown] = useState(false)

  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
   const navigate = useNavigate();

  // Logout Handler
  const logoutHandler = () => {
    setDropdown(false);
    dispatch(logoutUser());
    navigate("/login");
  }

  return (
    <header className="header">
      {/* Left side (Logo) */}
      <div className="header-left">
        {/* Mobile Menu */}
        <div onClick={() => setToggle((prev) => !prev)} className="header-menu">
          {toggle ? (
            <i className="x-icon fa-solid fa-xmark"></i>
          ) : (
            <i className="bars-icon fa-solid fa-bars"></i>
          )}
        </div>
        <div className="header-logo">
          <Link to={"/"} className="logo">
            BLOG
          </Link>
          <i className="fa-solid fa-pencil"></i>
        </div>
      </div>

      {/* Center nav */}
      <nav
        style={{
          clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
        className="navbar"
      >
        <ul className="nav-links">
          <Link to={"/"} onClick={() => setToggle(false)} className="nav-link">
            <i className="fa-solid fa-house"></i> Home
          </Link>
          <Link
            to={"/posts"}
            onClick={() => setToggle(false)}
            className="nav-link"
          >
            <i className="fa-solid fa-file"></i> Posts
          </Link>

          {user && (
            <Link
              to={"/posts/create-post"}
              onClick={() => setToggle(false)}
              className="nav-link"
            >
              <i className="fa-regular fa-newspaper"></i> Create
            </Link>
          )}

          {user?.isAdmin && (
            <Link
              to={"/admin-dashboard"}
              onClick={() => setToggle(false)}
              className="nav-link"
            >
              <i className="fa-solid fa-user-plus"></i> Admin Dashboard
            </Link>
          )}
        </ul>
      </nav>

      {/* Right side (Buttons) */}
      <div className="header-right">
        {user ? (
          <>
            <div className="header-right-user-info">
              <span
                onClick={() => setDropdown((prev) => !prev)}
                className="header-right-username"
              >
                {user?.username}
              </span>
              <img
                src={user?.profilePhoto.url}
                alt="User Photo"
                className="header-right-user-photo"
              />
              {/* Dropdown */}
              {dropdown && (
                <div className="header-right-dropdown">
                  <Link
                    to={`/profile/${user?._id}`}
                    className="header-dropdown-item"
                    onClick={() => setDropdown(false)}
                  >
                    <div className="header-dropdown-item">
                      <i className="fa-solid fa-address-card"></i>
                      <span>Profile</span>
                    </div>
                  </Link>
                  <div onClick={logoutHandler} className="header-dropdown-item">
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button className="header-right-link">
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
              <Link to={"/login"} className="login">
                Login
              </Link>
            </button>
            <button className="header-right-link">
              <i className="fa-solid fa-user"></i>
              <Link to={"/register"} className="register">
                Register
              </Link>
            </button>
          </>
        )}
      </div>
    </header>
  );
}
