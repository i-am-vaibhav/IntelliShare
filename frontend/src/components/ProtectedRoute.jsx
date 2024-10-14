import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../authContext";

const ProtectedRoute = ({children}) => {

  const {getToken} = useAuth();
  
  if (!getToken()) {
    return <Navigate to='/login'></Navigate>
  }
  
  return children;
};

export default ProtectedRoute;