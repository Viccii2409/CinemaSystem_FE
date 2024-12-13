import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAllowed, redirectPath = '/403' }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
