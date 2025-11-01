// src/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userName = localStorage.getItem("userName");
  if (!userName) {
    // Not logged in → redirect to login
    return <Navigate to="/Admin/Adminlogin" replace />;
  }
  return children;
};

export default ProtectedRoute;
