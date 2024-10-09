import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../authService";

const ProtectedRoute = ({children}) => {
  const token = getToken();
  console.log('returning child' + token);
  if (!token) {
    return <Navigate to='/login'></Navigate>
  }
  console.log('returning child' + token);
  return children;
};

export default ProtectedRoute;