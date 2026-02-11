import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  // Check if admin token exists and is valid
  const token = localStorage.getItem("token");
  const adminUser = localStorage.getItem("admin");

  if (!token || !adminUser) {
    return <Navigate to="/admin-login" replace />;
  }

  try {
    const admin = JSON.parse(adminUser);
    if (admin.role !== "admin") {
      return <Navigate to="/admin-login" replace />;
    }
  } catch (err) {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
