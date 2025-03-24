import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utilis/auth";

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

export default PrivateRoute;
