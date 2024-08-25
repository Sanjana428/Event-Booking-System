import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = Boolean(localStorage.getItem('userToken')); // Replace with your actual authentication check

    return isAuthenticated ? children : <Navigate to="/Login" />;
};

export default PrivateRoute;
