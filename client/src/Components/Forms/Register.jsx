import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Forms.css'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Redux/ApiCalls/AuthApiCall';
import swal from "sweetalert"
import { authActions } from '../../Redux/Slices/AuthSlice';


export default function Register() {

  const [username , setUserName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("")

  const dispatch = useDispatch();
  const { registerMessage } = useSelector(state => state.auth);
  const navigate = useNavigate()



  // Form Submit Handler
  const fromSubmitHandler = (e) => {
    e.preventDefault();

    //validation
    if(username.trim() === "" ) return toast.error("Username is required", {theme:"colored", position:"top-center" });
    if(email.trim() === "" ) return toast.error("Email is required", {theme:"colored", position:"top-center" });
    if(password.trim() === "" ) return toast.error("Password is required", {theme:"colored", position:"top-center" })
    
    //console.log({ username, email, password });
    dispatch(registerUser({ username, email, password }));
  }

  if(registerMessage){
    swal({
      title: registerMessage,
      icon: "success"
    }).then(isOk => {
      if(isOk){
        navigate("/login"); //Go To the Login Page
        dispatch(authActions.clearRegisterMessage()); // Must remove the message
      }
    })
  }


  return (
    <>
      <section className="form-container">
        <h1 className="form-title">Create New Account</h1>
        <form onSubmit={fromSubmitHandler} className="form">
          {/* Username */}
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-input"
              id="username"
              placeholder="Enter Your Username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-input"
              id="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-input"
              id="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="form-btn" type="submit">
            Register
          </button>
        </form>
        <div className="form-footer">
          Already have an account? <Link to={"/login"}>Login</Link>
        </div>
      </section>
    </>
  );
}
