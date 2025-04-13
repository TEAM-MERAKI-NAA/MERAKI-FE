import axios from 'axios';
import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const guidelinesService = {
  getAllGuidelines: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/guidelines/`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Guidelines fetch error:', error);
      if (error.response?.status === 401) {
        window.location.href = '/signin';
        return;
      }
      throw new Error(error.response?.data?.detail || 'Failed to fetch guidelines');
    }
  },

  getGuidelineById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/guidelines/${id}/`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Guideline fetch error:', error);
      if (error.response?.status === 401) {
        window.location.href = '/signin';
        return;
      }
      throw new Error(error.response?.data?.detail || 'Failed to fetch guideline details');
    }
  },

  getGuidelinesByCategory: async (category) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/guidelines/category/${category}/`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Category guidelines fetch error:', error);
      if (error.response?.status === 401) {
        window.location.href = '/signin';
        return;
      }
      throw new Error(error.response?.data?.detail || 'Failed to fetch guidelines by category');
    }
  }
};

export default guidelinesService; 