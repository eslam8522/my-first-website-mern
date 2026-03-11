import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("userToken");

  // If no token, redirect to Login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If token exists, render the "Child" route
  return <Outlet />; 
};

export default ProtectedRoute;