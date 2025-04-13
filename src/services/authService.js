import axios from 'axios';

const API_BASE_URL = 'http://4.206.179.192:8000';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(`${API_BASE_URL}/auth/api/token/refresh/`, {
          refresh: refreshToken
        });

        const { access } = response.data;
        localStorage.setItem('access_token', access);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, logout user
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData');
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const authService = {
  // Register new user
  register: async (userData) => {
    try {
      console.log('Sending registration data:', userData);
      const response = await axiosInstance.post('/auth/api/register/', userData);
      console.log('Registration response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      if (error.response?.data) {
        if (typeof error.response.data === 'object') {
          const errorMessages = Object.entries(error.response.data)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
            .join('\n');
          throw new Error(errorMessages);
        }
        throw new Error(error.response.data.detail || error.response.data.message || 'Registration failed');
      }
      throw new Error('Registration failed. Please try again.');
    }
  },

  // Verify email with OTP
  verifyEmail: async (email, otp) => {
    try {
      const response = await axiosInstance.post('/auth/api/verify-email/', {
        email,
        otp
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Email verification failed. Please try again.');
    }
  },

  // Resend OTP
  resendOtp: async (email) => {
    try {
      const response = await axiosInstance.post('/auth/api/resend-otp/', {
        email
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to resend OTP. Please try again.');
    }
  },

  // Request password reset
  forgotPassword: async (email) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/api/forgot-password/`, {
        email
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to send reset code. Please try again.');
    }
  },

  // Reset password with OTP
  resetPassword: async (email, otp, newPassword) => {
    try {
      console.log('Starting password reset process...');
      
      if (!email || !otp || !newPassword) {
        throw new Error('Email, OTP, and Password are all required');
      }

      const requestData = {
        email: email.trim(),
        otp: otp.trim(),
        password: newPassword // Changed from new_password to password to match backend
      };

      console.log('Sending reset password request to:', `${API_BASE_URL}/auth/api/reset-password/`);
      console.log('Request data:', requestData);

      const response = await axios.post(`${API_BASE_URL}/auth/api/reset-password/`, requestData);
      return response.data;
    } catch (error) {
      console.error('Password reset error:', error.response?.data || error.message);
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Password reset failed. Please try again.');
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/auth/api/login/', credentials);
      if (response.data.access) {
        // Store tokens
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('isAuthenticated', 'true');
        return response.data;
      }
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Login failed. Please check your credentials and try again.');
    }
  },

  // // Get token
  // getToken: async (credentials) => {
  //   try {
  //     const response = await axios.post(`${API_BASE_URL}/auth/api/token/`, credentials);
  //     if (response.data.token) {
  //       localStorage.setItem('token', response.data.token);
  //       localStorage.setItem('isAuthenticated', 'true');
  //     }
  //     return response.data;
  //   } catch (error) {
  //     if (error.response?.data?.detail) {
  //       throw new Error(error.response.data.detail);
  //     }
  //     throw new Error('Failed to get token. Please try again.');
  //   }
  // },

  // Logout user
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    localStorage.removeItem('email');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    const hasToken = !!localStorage.getItem('access_token');
    const hasRefreshToken = !!localStorage.getItem('refresh_token');
    return isAuth && hasToken && hasRefreshToken;
  },

  // Get current user data
  getCurrentUser: () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axiosInstance.post('/auth/api/token/refresh/', {
        refresh: refreshToken
      });

      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        return response.data.access;
      }
      throw new Error('Failed to refresh token');
    } catch (error) {
      // If refresh fails, logout user
      authService.logout();
      throw error;
    }
  }
};

export default authService; 