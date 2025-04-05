import axios from 'axios';
import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const remindersService = {
  getAllReminders: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reminder/api/reminders/`, {
        headers: getAuthHeader()
      });
      // The backend should already be filtering by user, but let's double-check
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.error('Reminders fetch error:', error);
      if (error.response?.status === 401) {
        window.location.href = '/signin';
        return [];
      }
      throw new Error(error.response?.data?.detail || 'Failed to fetch reminders');
    }
  },

  createReminder: async (reminderData) => {
    try {
      const formattedData = {
        title: reminderData.title,
        document_expiry_date: reminderData.document_expiry_date,
        frequency: reminderData.frequency || 'daily',
        category: reminderData.category === 'custom' ? reminderData.customCategory : reminderData.category,
        priority: reminderData.priority || 'medium',
        is_active: true
      };
      
      console.log('Sending reminder data:', formattedData);
      const response = await axios.post(`${API_BASE_URL}/reminder/api/reminders/`, formattedData, {
        headers: getAuthHeader()
      });

      // Send immediate reminder after creation
      if (response.data.id) {
        await axios.post(`${API_BASE_URL}/reminder/api/reminders/${response.data.id}/send_immediate_reminder/`, {}, {
          headers: getAuthHeader()
        });
      }

      return response.data;
    } catch (error) {
      console.error('Reminder creation error:', error);
      if (error.response?.status === 401) {
        window.location.href = '/signin';
        return;
      }
      if (error.response?.data) {
        throw new Error(JSON.stringify(error.response.data));
      }
      throw new Error('Failed to create reminder');
    }
  },

  updateReminder: async (id, reminderData) => {
    try {
      const formattedData = {
        title: reminderData.title,
        document_expiry_date: reminderData.document_expiry_date,
        frequency: reminderData.frequency || 'daily',
        category: reminderData.category === 'custom' ? reminderData.customCategory : reminderData.category,
        priority: reminderData.priority || 'medium',
        is_active: reminderData.is_active
      };
      
      const response = await axios.put(`${API_BASE_URL}/reminder/api/reminders/${id}/`, formattedData, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Reminder update error:', error);
      if (error.response?.status === 401) {
        window.location.href = '/signin';
        return;
      }
      if (error.response?.data) {
        throw new Error(JSON.stringify(error.response.data));
      }
      throw new Error('Failed to update reminder');
    }
  },

  deleteReminder: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/reminder/api/reminders/${id}/`, {
        headers: getAuthHeader()
      });
    } catch (error) {
      console.error('Reminder deletion error:', error);
      if (error.response?.status === 401) {
        window.location.href = '/signin';
        return;
      }
      if (error.response?.data) {
        throw new Error(JSON.stringify(error.response.data));
      }
      throw new Error('Failed to delete reminder');
    }
  },

  markAsCompleted: async (id) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/reminder/api/reminders/${id}/complete/`, {}, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Reminder completion error:', error);
      if (error.response?.status === 401) {
        window.location.href = '/signin';
        return;
      }
      if (error.response?.data) {
        throw new Error(JSON.stringify(error.response.data));
      }
      throw new Error('Failed to mark reminder as completed');
    }
  },

  sendImmediateReminder: async (id) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reminder/api/reminders/${id}/send_immediate_reminder/`, {}, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Send immediate reminder error:', error);
      if (error.response?.status === 401) {
        window.location.href = '/signin';
        return;
      }
      if (error.response?.data) {
        throw new Error(JSON.stringify(error.response.data));
      }
      throw new Error('Failed to send immediate reminder');
    }
  }
};

export default remindersService; 