// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

// AuthContext.jsx
const API_BASE_URL = 'http://localhost:8000';

// Create axios instance with better error handling
const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
  timeout: 10000, // 10 second timeout
});

// Request interceptor
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
authApi.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('⏱️ Request Timeout:', error.config?.url);
    } else if (error.response) {
      console.error('❌ API Error:', {
        status: error.response.status,
        url: error.config?.url,
        data: error.response.data
      });
    } else if (error.request) {
      console.error('❌ No Response:', error.message);
      console.error('Is Laravel running? Check: http://localhost:8000/api/test-simple');
    } else {
      console.error('❌ Request Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      console.log('🔍 AuthContext: Checking authentication...', {
        hasToken: !!token,
        hasSavedUser: !!savedUser
      });

      if (token && savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          
          // Set user from localStorage immediately
          setUser(userData);
          setIsAuthenticated(true);
          console.log('✅ User loaded from localStorage:', userData);
          
          // Verify with backend in background
          try {
            await authApi.get('/sanctum/csrf-cookie');
            const response = await authApi.get('/api/auth/me');

            if (response.data.success && response.data.user) {
              setUser(response.data.user);
              console.log('✅ User verified with backend');
            }
          } catch (verifyError) {
            console.warn('⚠️ Backend verification failed, using localStorage data');
            
            if (verifyError.response?.status === 401) {
              console.log('🔒 Token invalid, clearing auth');
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              setUser(null);
              setIsAuthenticated(false);
            }
          }
        } catch (error) {
          console.error('❌ Auth check failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        console.log('ℹ️ No saved credentials found');
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Send OTP for login
  const sendOtp = async (phone) => {
    try {
      console.log('📱 Sending OTP to:', phone);
      
      // Get CSRF cookie first
      await authApi.get('/sanctum/csrf-cookie');
      
      // Send OTP request
      const response = await authApi.post('/api/auth/send-otp', { phone });
      
      console.log('✅ OTP Response:', response.data);
      
      if (response.data.success) {
        // OTP sent successfully (either via SMS or generated for testing)
        return response.data.user_id || null;
      } else {
        throw new Error(response.data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('❌ Send OTP failed:', error.response?.data || error.message);
      
      // Check if user not found
      if (error.response?.status === 404 || error.response?.data?.user_not_found) {
        const errorMsg = error.response?.data?.message || 'User not found. Please register first.';
        const err = new Error(errorMsg);
        err.user_not_found = true;
        err.phone = error.response?.data?.phone;
        throw err;
      } else if (error.code === 'ERR_NETWORK') {
        throw new Error('Cannot connect to server. Is Laravel running on port 8000?');
      } else {
        throw new Error(error.response?.data?.message || 'Failed to send OTP');
      }
    }
  };

  // Verify OTP and login
  const login = async (phone, otp) => {
    try {
      console.log('🔐 Login attempt:', { phone, otp });
      
      await authApi.get('/sanctum/csrf-cookie');
      const response = await authApi.post('/api/auth/verify-otp', { phone, otp });

      if (response.data.success) {
        const { user: userData, token } = response.data;
        
        // Save to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Update state
        setUser(userData);
        setIsAuthenticated(true);
        
        console.log('✅ Login successful:', userData);
        return userData;
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('❌ Login failed:', error);
      throw new Error(error.response?.data?.message || 'Invalid OTP or login failed');
    }
  };

  // Register - NO AUTO-LOGIN
  const register = async (userData) => {
    try {
      console.log('📝 Registration attempt:', userData);
      
      await authApi.get('/sanctum/csrf-cookie');
      const response = await authApi.post('/api/auth/register', userData);

      if (response.data.success) {
        console.log('✅ Registration successful - redirect to login');
        
        return {
          ...response.data.user,
          redirect_to_login: response.data.redirect_to_login || true
        };
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('❌ Registration failed:', error);
      
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat();
        throw new Error(errorMessages.join(', '));
      }
      
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  // Google Login
  const googleLogin = () => {
    console.log('🔗 Redirecting to Google login');
    window.location.href = `${API_BASE_URL}/api/auth/google`;
  };

  // Google Signup
  const googleSignup = () => {
    console.log('🔗 Redirecting to Google signup');
    window.location.href = `${API_BASE_URL}/api/auth/google?signup=true`;
  };
  
  // Logout
  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (token) {
        await authApi.post('/api/auth/logout');
      }
    } catch (error) {
      console.error('❌ Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
      console.log('👋 Logged out');
      window.location.href = '/login';
    }
  };

  const value = {
    user,
    setUser,
    loading,
    isAuthenticated,
    setIsAuthenticated,
    sendOtp,
    login,
    register,
    googleLogin,
    googleSignup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;