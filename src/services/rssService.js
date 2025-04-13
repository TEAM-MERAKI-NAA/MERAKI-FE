import axios from 'axios';
import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const rssService = {
  // Get backgrounders
  getBackgrounders: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/rssparser/categories/backgrounders/`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to fetch backgrounders. Please try again.');
    }
  },

  // Get media advisories
  getMediaAdvisories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/rssparser/categories/media-advisories/`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to fetch media advisories. Please try again.');
    }
  },

  // Get news releases
  getNewsReleases: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/rssparser/categories/news-releases/`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to fetch news releases. Please try again.');
    }
  },

  // Get speeches
  getSpeeches: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/rssparser/categories/speeches/`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to fetch speeches. Please try again.');
    }
  },

  // Get statements
  getStatements: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/rssparser/categories/statements/`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to fetch statements. Please try again.');
    }
  },

  // Fetch from database
  fetchFromDB: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/rssparser/fetch-from-db/`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to fetch from database. Please try again.');
    }
  },

  // Fetch and store
  fetchAndStore: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/rssparser/fetch-store/`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to fetch and store. Please try again.');
    }
  }
};

export default rssService; 