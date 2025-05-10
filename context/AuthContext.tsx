// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// interface AuthContextType {
//   user: any;
//   login: (email: string, password: string) => Promise<void>;
//   signup: (username: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Set axios default headers
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       const userData = JSON.parse(localStorage.getItem('user') || 'null');
//       if (userData) {
//         setUser(userData);
//         setIsAuthenticated(true);
//       }
//     }
//   }, []);

//   const login = async (email: string, password: string) => {
//     try {
//       const response = await axios.post('https://nirvaanai-i5fq.onrender.com/api/auth/Login', { 
//         email, 
//         password 
//       });
      
//       const { token, user } = response.data;
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       setUser(user);
//       setIsAuthenticated(true);
//     } catch (error: any) {
//       console.error('Login error:', error.response?.data || error.message);
//       throw new Error(error.response?.data?.error || 'Failed to login');
//     }
//   };

//   const signup = async (username: string, email: string, password: string) => {
//     try {
//       const response = await axios.post('https://nirvaanai-i5fq.onrender.com/api/auth/SignUp', {
//         username,
//         email,
//         password
//       });
      
//       const { token, user } = response.data;
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       setUser(user);
//       setIsAuthenticated(true);
//     } catch (error: any) {
//       console.error('Signup error:', error.response?.data || error.message);
//       throw new Error(error.response?.data?.error || 'Failed to create account');
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     delete axios.defaults.headers.common['Authorization'];
//     setUser(null);
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { User, AuthResponse } from '../types'; // Adjust the path accordingly

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, city: string ,password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const initializeAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const parsedUser = JSON.parse(userData) as User; // Ensure type safety
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await axios.post<AuthResponse>(
        'https://nirvaanai-i5fq.onrender.com/api/auth/Login',
        { email, password }
      );
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      setIsAuthenticated(true);
    } catch (error: any) {
      const error_Message = error.response?.data?.error || 'Login failed. Please check your credentials.';
      console.error('Login error:', error_Message);
      throw new Error(error_Message);
    }
  };

  const signup = async (username: string, email: string, city: string , password: string): Promise<void> => {
    try {
      const response = await axios.post<AuthResponse>(
        'https://nirvaanai-i5fq.onrender.com/api/auth/SignUp',
        { username, email, city ,password }
      );

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      setIsAuthenticated(true);
    } catch (error: any) {
      const error_Message = error.response?.data?.error || 'Signup failed. Please try again.';
      console.error('Signup error:', error_Message);
      throw new Error(error_Message);
    }
  };

  const logout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isAuthenticated,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
