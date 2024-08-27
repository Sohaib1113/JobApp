import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken'); // Check if the user is authenticated

  return authToken ? children : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default PrivateRoute;
