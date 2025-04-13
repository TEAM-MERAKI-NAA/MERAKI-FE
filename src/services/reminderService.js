import axios from 'axios';
import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const reminderService = {
  // Get all reminders
  getAllReminders: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reminder/api/reminders/`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to fetch reminders. Please try again.');
    }
  },

  // Create new reminder
  createReminder: async (reminderData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reminder/api/reminders/`, reminderData, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to create reminder. Please try again.');
    }
  },

  // Get reminder by ID
  getReminderById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reminder/api/reminders/${id}/`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to fetch reminder. Please try again.');
    }
  },

  // Update reminder
  updateReminder: async (id, reminderData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/reminder/api/reminders/${id}/`, reminderData, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to update reminder. Please try again.');
    }
  },

  // Partial update reminder
  patchReminder: async (id, reminderData) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/reminder/api/reminders/${id}/`, reminderData, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to update reminder. Please try again.');
    }
  },

  // Delete reminder
  deleteReminder: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/reminder/api/reminders/${id}/`, {
        headers: getAuthHeader()
      });
      return true;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to delete reminder. Please try again.');
    }
  },

  // Send immediate reminder
  sendImmediateReminder: async (id) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reminder/api/reminders/${id}/send_immediate_reminder/`, {}, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to send immediate reminder. Please try again.');
    }
  },

  // Send reminder
  sendReminder: async (id) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reminder/api/reminders/${id}/send_reminder/`, {}, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to send reminder. Please try again.');
    }
  }
};

export default reminderService; 