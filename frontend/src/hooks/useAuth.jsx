import { useState, useEffect, createContext, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Try to get user profile with existing token
      authService.getProfile()
        .then(userData => {
          console.log('Auto-login successful:', userData);
          setUser(userData);
        })
        .catch(() => {
          // Token is invalid, remove it
          localStorage.removeItem('token');
        });
    }
  }, []);

  const login = async (username, password) => {
    const response = await authService.login(username, password);
    console.log('Login response:', response);
    setUser(response.user);
    localStorage.setItem('token', response.token);
    return response;
  };

  const register = async (username, email, password) => {
    const response = await authService.register(username, email, password);
    console.log('Register response:', response);
    setUser(response.user);
    localStorage.setItem('token', response.token);
    return response;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    console.log('Logged out');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  console.log('AuthProvider state:', { user, isAuthenticated: !!user });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};