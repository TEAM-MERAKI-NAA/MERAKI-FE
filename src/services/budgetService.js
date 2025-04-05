import axios from 'axios';
import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const budgetService = {
  // Get all budget items
  getAllBudgets: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/budget/api/budget/`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Budget fetch error:', error);
      if (error.response?.status === 401) {
        window.location.href = '/signin';
      }
      throw new Error(error.response?.data?.detail || 'Failed to fetch budgets');
    }
  },

  // Get summary (optional if supported by API)
  getBudgetSummary: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/budget/api/budget/summary/`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Budget summary error:', error);
      if (error.response?.status === 401) {
        window.location.href = '/signin';
      }
      throw new Error(error.response?.data?.detail || 'Failed to fetch budget summary');
    }
  },

 
    // Create new budget (income or category)
    createBudget: async (budgetData) => {
      try {
        // Check if this is an income entry
        const isIncomeEntry = budgetData.category === 'other' && budgetData.description === 'monthly-income';
        
        if (isIncomeEntry) {
          // For income entry, check if one already exists
          const existingBudgets = await budgetService.getAllBudgets();
          const existingIncome = existingBudgets.find(b => b.category === 'other' && b.description === 'monthly-income');
          
          if (existingIncome) {
            // Update existing income instead of creating new one
            return await budgetService.updateBudget(existingIncome.id, budgetData);
          }

          // If no income exists, create new one
          const formattedData = {
            monthly_income: parseFloat(budgetData.monthly_income),
            amount: 0,
            category: 'other',
            description: 'monthly-income',
            date: new Date().toISOString().split('T')[0]
          };

          console.log('Creating income entry:', formattedData);
          const response = await axios.post(`${API_BASE_URL}/budget/api/budget/`, formattedData, {
            headers: getAuthHeader()
          });
          return response.data;
        } else {
          // For regular budget entries, check if income exists
          const existingBudgets = await budgetService.getAllBudgets();
          const incomeEntry = existingBudgets.find(b => b.category === 'other' && b.description === 'monthly-income');
          
          if (!incomeEntry) {
            throw new Error('Please set your monthly income first.');
          }

          const formattedData = {
            monthly_income: parseFloat(incomeEntry.monthly_income),
            amount: parseFloat(budgetData.amount),
            category: budgetData.category,
            description: budgetData.description || '',
            date: budgetData.date || new Date().toISOString().split('T')[0]
          };

          console.log('Creating budget entry:', formattedData);
          const response = await axios.post(`${API_BASE_URL}/budget/api/budget/`, formattedData, {
            headers: getAuthHeader()
          });
          return response.data;
        }
      } catch (error) {
        console.error('❌ Budget creation error:', error);
        
        if (error.response?.status === 401) {
          window.location.href = '/signin';
          return;
        }

        if (error.response?.data) {
          const errorMessage = error.response.data.detail || JSON.stringify(error.response.data);
          console.error('Server error details:', errorMessage);
          throw new Error(errorMessage);
        }

        throw new Error('Failed to create budget: ' + error.message);
      }
    },
  
  // Update budget by ID
  updateBudget: async (id, budgetData) => {
    try {
      const existingBudgets = await budgetService.getAllBudgets();
      const budgetToUpdate = existingBudgets.find(b => b.id === id);

      const formattedData = {
        monthly_income: parseFloat(budgetData.monthly_income),
        category: budgetData.category,
        amount: parseFloat(budgetData.amount),
        description: budgetData.description || '',
        date: budgetData.date || new Date().toISOString().split('T')[0]
      };

      const response = await axios.put(`${API_BASE_URL}/budget/api/budget/${id}/`, formattedData, {
        headers: getAuthHeader()
      });

      return response.data;
    } catch (error) {
      console.error('Budget update error:', error);
      if (error.response?.status === 401) {
        window.location.href = '/signin';
      }
      throw new Error(
        error.response?.data?.detail ||
        JSON.stringify(error.response?.data) ||
        'Failed to update budget'
      );
    }
  },

  // Delete a budget by ID
  deleteBudget: async (id) => {
    try {
      const budgets = await budgetService.getAllBudgets();
      const budgetToDelete = budgets.find(b => b.id === id);

      if (budgetToDelete?.category === 'income') {
        throw new Error('You cannot delete your income entry.');
      }

      await axios.delete(`${API_BASE_URL}/budget/api/budget/${id}/`, {
        headers: getAuthHeader()
      });
    } catch (error) {
      console.error('Budget deletion error:', error);
      if (error.response?.status === 401) {
        window.location.href = '/signin';
      }
      throw new Error(
        error.response?.data?.detail ||
        JSON.stringify(error.response?.data) ||
        'Failed to delete budget'
      );
    }
  },

  // Get budget by ID
  getBudgetById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/budget/api/budget/${id}/`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Fetch budget by ID error:', error);
      throw new Error(
        error.response?.data?.detail ||
        'Failed to fetch budget. Please try again.'
      );
    }
  },

  // Get income status (returns full object for UI use)
  getIncomeStatus: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/budget/api/budget/`, {
        headers: getAuthHeader()
      });

      const incomeEntry = response.data.find(b => b.category === 'other' && b.description === 'monthly-income');
      return {
        hasIncome: !!incomeEntry,
        income: incomeEntry || null
      };
    } catch (error) {
      console.error('Income status check error:', error);
      if (error.response?.status === 401) {
        window.location.href = '/signin';
        return { hasIncome: false };
      }
      throw new Error('Failed to check income status');
    }
  }
};

export default budgetService;
