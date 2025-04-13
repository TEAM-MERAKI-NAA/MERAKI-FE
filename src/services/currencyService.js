import axios from 'axios';
import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const currencyService = {
  // Get all exchange rates
  getAllRates: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/currencyrates/exchange-rates/`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error in getAllRates:', error);
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to fetch currency rates. Please try again.');
    }
  },

  // Get CAD exchange rates
  getCADRates: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/currencyrates/exchange-rates/cad/`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error in getCADRates:', error);
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to fetch CAD exchange rates. Please try again.');
    }
  },

  // Get available currencies for CAD conversion
  getCADCurrencies: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/currencyrates/exchange-rates/cad/currencies/`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error in getCADCurrencies:', error);
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to fetch available currencies for CAD conversion. Please try again.');
    }
  },

  // Convert amount between currencies
  convertCurrency: async (fromCurrency, toCurrency, amount) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/currencyrates/exchange-rates/cad/conversion/`, {
        params: {
          from: fromCurrency,
          to: toCurrency,
          amount: amount
        },
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error in convertCurrency:', error);
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Failed to convert currency. Please try again.');
    }
  }
};

export default currencyService; 