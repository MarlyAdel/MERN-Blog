import React, { useState } from "react";
import "./Forms.css";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { forgotPassword } from "../../Redux/ApiCalls/PasswordApiCall";


export default function ForgotPassword() {

  const [email , setEmail] = useState("");
  const dispatch = useDispatch();
     
     // Form Submit Handler
     const fromSubmitHandler = (e) => {
       e.preventDefault();
   
       //validation
       if(email.trim() === "" ) return toast.error("Email is required", {theme:"colored" , position:"top-center" });
       
       //console.log({ email });
       dispatch(forgotPassword( email ));
     }
  
   return (
       <>
         <section className="form-container">
           <h1 className="form-title">Forgot Passwrod</h1>
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
             <button className="form-btn" type="submit">
               Submit
             </button>
           </form>
         </section>
       </>
     );
}
