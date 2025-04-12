import axios from 'axios';
import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Add axios interceptor for authentication
axios.interceptors.request.use(
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

// Add axios interceptor for logging
axios.interceptors.request.use(request => {
  console.log('Starting Request:', request);
  return request;
});

axios.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.error('Error Response:', error.response);
    return Promise.reject(error);
  }
);

const communityService = {
  // Posts
  getAllPosts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/community/api/posts/`);
      return response.data;
    } catch (error) {
      console.error('Error in getAllPosts:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },

  getPostById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/community/api/posts/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Error in getPostById:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },

  createPost: async (postData) => {
    try {
      // Log the data being sent
      console.log('Creating post with data:', postData);
      
      // Ensure we have the required fields
      if (!postData.title || !postData.description) {
        throw new Error('Title and description are required');
      }

      // Get user data from localStorage if not provided in postData
      if (!postData.email && !postData.user_email) {
        try {
          const userData = JSON.parse(localStorage.getItem('userData') || '{}');
          if (userData.email) {
            postData.email = userData.email;
            postData.user_email = userData.email;
            console.log('Added email from localStorage:', userData.email);
          }
        } catch (error) {
          console.error('Error accessing localStorage:', error);
        }
      }

      const response = await axios.post(`${API_BASE_URL}/community/api/posts/`, postData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Post created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in createPost:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      throw error.response?.data || error.message;
    }
  },

  updatePost: async (id, postData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/community/api/posts/${id}/`, postData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deletePost: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/community/api/posts/${id}/`);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Comments
  getCommentsByPostId: async (postId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/community/api/posts/${postId}/comments/`);
      console.log('Raw comments response:', response.data); // Debug log
      
      // Process comments to ensure they have email information
      const processedComments = response.data.map(comment => {
        // If comment doesn't have email info, try to get it from localStorage
        if (!comment.email && !comment.user_email && !comment.user?.email) {
          try {
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            if (userData.email) {
              return {
                ...comment,
                email: userData.email,
                user_email: userData.email
              };
            }
          } catch (error) {
            console.error('Error accessing localStorage:', error);
          }
        }
        return comment;
      });
      
      console.log('Processed comments:', processedComments); // Debug log
      return processedComments;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createComment: async (postId, commentData) => {
    try {
      // Get user data from localStorage if not provided in commentData
      if (!commentData.email && !commentData.user_email) {
        try {
          const userData = JSON.parse(localStorage.getItem('userData') || '{}');
          if (userData.email) {
            commentData.email = userData.email;
            commentData.user_email = userData.email;
            console.log('Added email from localStorage to comment:', userData.email);
          }
        } catch (error) {
          console.error('Error accessing localStorage:', error);
        }
      }

      const response = await axios.post(
        `${API_BASE_URL}/community/api/posts/${postId}/comments/`,
        commentData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateComment: async (postId, commentId, commentData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/community/api/posts/${postId}/comments/${commentId}/`,
        commentData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteComment: async (postId, commentId) => {
    try {
      await axios.delete(`${API_BASE_URL}/community/api/posts/${postId}/comments/${commentId}/`);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default communityService; 