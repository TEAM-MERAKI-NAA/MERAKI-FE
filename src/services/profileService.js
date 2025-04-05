import axios from 'axios';
import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const profileService = {
  // Get all profiles
  getAllProfiles: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/profile/api/profile/`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to fetch profiles. Please try again.');
    }
  },

  // Create new profile
  createProfile: async (profileData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/profile/api/profile/`, profileData, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to create profile. Please try again.');
    }
  },

  // Get profile by ID
  getProfileById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/profile/api/profile/${id}/`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to fetch profile. Please try again.');
    }
  },

  // Update profile
  updateProfile: async (id, profileData) => {
    try {
      // If profileData is FormData, send it directly
      if (profileData instanceof FormData) {
        const response = await axios.put(`${API_BASE_URL}/profile/api/profile/${id}/`, profileData, {
          headers: {
            ...getAuthHeader(),
            'Content-Type': 'multipart/form-data'
          }
        });
        return response.data;
      }

      // If profileData is a regular object, ensure all fields are included
      const data = {
        bio: profileData.bio || '',
        gender: profileData.gender || '',
        nationality: profileData.nationality || '',
        province: profileData.province || ''
      };

      const response = await axios.put(`${API_BASE_URL}/profile/api/profile/${id}/`, data, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to update profile. Please try again.');
    }
  },

  // Partial update profile
  patchProfile: async (id, profileData) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/profile/api/profile/${id}/`, profileData, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to update profile. Please try again.');
    }
  },

  // Delete profile
  deleteProfile: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/profile/api/profile/${id}/`, {
        headers: getAuthHeader()
      });
      return true;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to delete profile. Please try again.');
    }
  },

  // Get current user's profile
  getMyProfile: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/profile/api/profile/me/`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to fetch your profile. Please try again.');
    }
  }
};

export default profileService; 