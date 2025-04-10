import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // Add role state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); // Add error state for login feedback

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');
    if (storedUser && storedRole) {
      setUser(JSON.parse(storedUser));
      setRole(storedRole);
    }
    setLoading(false);
  }, []);

  const loginCustomer = async (username, password) => {
    return await login('https://db-group5-452710.wl.r.appspot.com/login/customer', 'customer', username, password);
  };

  const loginAdmin = async (username, password) => {
    return await login('https://db-group5-452710.wl.r.appspot.com/login/admin', 'admin', username, password);
  };

  const loginSeller = async (username, password) => {
    return await login('https://db-group5-452710.wl.r.appspot.com/login/seller', 'seller', username, password);
  };

  const login = async (url, assignedRole, username, password) => {
    try {
      const response = await axios.post(
        url,
        { username, password }
      );

      const userData = response.data;
      setUser(userData);
      setRole(assignedRole);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('role', assignedRole);
      setError('');
      return true; // Indicate successful login
    } catch (error) {
      console.error(`Login as ${assignedRole} failed:`, error);
      setError('Invalid username or password for this role.');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    setError(''); // Clear any previous error messages
    // Optionally, call a logout API
  };

  const contextValue = {
    user,
    role,
    loginCustomer,
    loginAdmin,
    loginSeller,
    logout,
    loading,
    error, // Expose the error state
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
