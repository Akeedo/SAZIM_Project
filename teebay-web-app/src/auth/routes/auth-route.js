import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

const AuthRoute = ({ component: Component }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return <Component />;
};

export default AuthRoute;
