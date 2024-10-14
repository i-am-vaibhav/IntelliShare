import { Navigate } from "react-router-dom";
import { useAuth } from "../authContentUtils";
import PropTypes from "prop-types";

const ProtectedRoute = ({children}) => {

  const {getToken} = useAuth();
  
  if (!getToken()) {
    return <Navigate to='/login'></Navigate>
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;