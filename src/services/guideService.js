import axios from 'axios';
import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const guideService = {
  // Get all guides
  getAllGuides: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/guide/api/guides`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to fetch guides. Please try again.');
    }
  },

  // Get guide by slug
  getGuideBySlug: async (slug) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/guide/api/guides/${slug}`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to fetch guide. Please try again.');
    }
  }
};

export default guideService; 