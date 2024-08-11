import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  const login = async (values) => {
    try {
      const res = await axios.post("http://localhost:3001/api/loginRoutes/login", values);
      setCurrentUser(res.data);
      return res.data; 
    } catch (error) {
      console.error("Login failed:", error);
      setCurrentUser(null);
      throw error; 
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:3001/api/loginRoutes/logout"); 
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
     
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};