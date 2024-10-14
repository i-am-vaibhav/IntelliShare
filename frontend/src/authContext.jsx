import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            const userData = jwtDecode(token);
            setUser(userData);
        }
    }, [token]);

    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        console.log(userData);
        localStorage.setItem('token', token); // Store token in local storage
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token'); // Remove token from local storage
    };

    const getToken = () => {
        return token;
    }

    const getUserId = () => {
        return user.userId;
    }

    const isAuthenticated = () => {
        return !!token; // Check if the token exists
    };

    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated,
        getToken,
        getUserId,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
