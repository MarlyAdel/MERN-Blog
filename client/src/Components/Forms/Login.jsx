import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Forms.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Redux/ApiCalls/AuthApiCall";


export default function Login() {

   const [email , setEmail] = useState("");
   const [password , setPassword] = useState("");

   const dispatch = useDispatch();
   const navigate = useNavigate();
 
  // Form Submit Handler
  const fromSubmitHandler = (e) => {
     e.preventDefault();
 
     //validation
     if(email.trim() === "" ) return toast.error("Email is required", {theme:"colored" , position:"top-center" });
     if(password.trim() === "" ) return toast.error("Password is required", {theme:"colored" , position:"top-center" })
     
     //console.log({ email, password });
     dispatch(loginUser({ email, password }));
     navigate("/");
  }

 return (
     <>
       <section className="form-container">
         <h1 className="form-title">Login</h1>
         <form onSubmit={fromSubmitHandler} className="form">
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
             Login
           </button>
         </form>
         <div className="form-footer">
           Did you forgot your password? <Link to={"/forgot-password"}>Forgot Password</Link>
         </div>
       </section>
     </>
   );
}
