import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import authService from '../../services/authService';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();

  useEffect(() => {
    // If authenticated but token is about to expire, refresh it
    if (isAuthenticated) {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          // Decode the JWT token to check expiration
          const payload = JSON.parse(atob(token.split('.')[1]));
          const expirationTime = payload.exp * 1000; // Convert to milliseconds
          const currentTime = Date.now();
          const timeUntilExpiration = expirationTime - currentTime;
          
          // If token will expire in less than 5 minutes, refresh it
          if (timeUntilExpiration < 300000) {
            authService.refreshToken();
          }
        } catch (error) {
          console.error('Error checking token expiration:', error);
        }
      }
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    // Redirect to sign in page but save the attempted location
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute; 