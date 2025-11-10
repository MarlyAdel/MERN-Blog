import React, { useState } from "react";
import "./Forms.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import { getResetPassword, resetPassword } from "../../Redux/ApiCalls/PasswordApiCall";

export default function ResetPassword() {
  
     const [password , setPassword] = useState("");
     const dispatch = useDispatch();
     const {isError} = useSelector(state => state.password);
     const {userId, token} = useParams();

     useEffect(() => {
       dispatch(getResetPassword(userId, token));
     }, [userId, token]);
   
     // Form Submit Handler
     const fromSubmitHandler = (e) => {
       e.preventDefault();
   
       //validation
       if(password.trim() === "" ) return toast.error("Password is required", {theme:"colored", position:"top-center" })
       
       //console.log({ password });
       dispatch(resetPassword(password, { userId, token }));
     }
  
   return (
     <>
       <section className="form-container">
         {isError ? (
           <h1>Not Found</h1>
         ) : (
           <>
             <h1 className="form-title">Reset Password</h1>
             <form onSubmit={fromSubmitHandler} className="form">
               {/*  New Password */}
               <div className="form-group">
                 <label htmlFor="password" className="form-label">
                   New Password
                 </label>
                 <input
                   type="password"
                   className="form-input"
                   id="password"
                   placeholder="Enter Your New Password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                 />
               </div>
               <button className="form-btn" type="submit">
                 Submit
               </button>
             </form>
           </>
         )}
       </section>
     </>
   );
}
