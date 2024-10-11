import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../authService";

const ProtectedRoute = ({children}) => {
  const token = getToken();
  if (!token) {
    return <Navigate to='/login'></Navigate>
  }
  return children;
};

export default ProtectedRoute;