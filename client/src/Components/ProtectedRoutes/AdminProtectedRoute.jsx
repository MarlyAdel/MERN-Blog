import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo) {
    return <Navigate to="/" />;
  }

  if (!userInfo.isAdmin) {
    // Logged in but not admin 
    return <Navigate to="/" />;
  }

  // Logged in and admin 
  return children;
}
