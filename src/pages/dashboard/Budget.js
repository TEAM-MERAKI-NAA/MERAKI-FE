import React, { useState, useEffect } from 'react';
import budgetService from '../../services/budgetService';
import { 
  WalletIcon, 
  BanknotesIcon,
  PlusCircleIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
  HomeIcon,
  BoltIcon,
  ShoppingBagIcon,
  TruckIcon,
  HeartIcon,
  FilmIcon,
  AcademicCapIcon,
  EllipsisHorizontalCircleIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

const categoryIcons = {
  housing: HomeIcon,
  utilities: BoltIcon,
  food: ShoppingBagIcon,
  transportation: TruckIcon,
  healthcare: HeartIcon,
  entertainment: FilmIcon,
  education: AcademicCapIcon,
  other: EllipsisHorizontalCircleIcon
};

const categoryOptions = [
  'housing',
  'utilities',
  'food',
  'transportation',
  'healthcare',
  'entertainment',
  'education',
  'other'
];

const Budget = () => {
  const [income, setIncome] = useState(null);
  const [incomeId, setIncomeId] = useState(null);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('housing');
  const [description, setDescription] = useState('');
  const [budgets, setBudgets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editIncome, setEditIncome] = useState(false);
  const [tempIncome, setTempIncome] = useState('');
  const [error, setError] = useState('');
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [editingBudget, setEditingBudget] = useState(null);
  const [editAmount, setEditAmount] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    loadInitialData();
  }, []);

  const calculateRemainingBalance = (allBudgets) => {
    const incomeEntry = allBudgets.find(b => b.category === 'other' && b.description === 'monthly-income');
    if (!incomeEntry) return 0;

    const expenses = allBudgets
      .filter(b => !(b.category === 'other' && b.description === 'monthly-income'))
      .reduce((sum, budget) => sum + parseFloat(budget.amount), 0);

    setTotalExpenses(expenses);
    return parseFloat(incomeEntry.monthly_income) - expenses;
  };

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      setError('');
      const { hasIncome, income } = await budgetService.getIncomeStatus();
      const allBudgets = await budgetService.getAllBudgets();
      
      if (hasIncome && income) {
        const parsedIncome = parseFloat(income.monthly_income);
        setIncome(parsedIncome);
        setIncomeId(income.id);
        setTempIncome(parsedIncome.toString());
      }
      setBudgets(allBudgets);
      setRemainingBalance(calculateRemainingBalance(allBudgets));
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load budget data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncomeSubmit = async () => {
    try {
      setError('');
      if (!tempIncome || parseFloat(tempIncome) <= 0) {
        setError('Please enter a valid income amount');
        return;
      }

      const parsedIncome = parseFloat(tempIncome);
      const incomeData = {
        monthly_income: parsedIncome,
        amount: 0,
        category: 'other',
        description: 'monthly-income'
      };

      if (editIncome && incomeId) {
        await budgetService.updateBudget(incomeId, incomeData);
        setIncome(parsedIncome);
        alert('Income updated successfully!');
      } else {
        const response = await budgetService.createBudget(incomeData);
        setIncome(parsedIncome);
        setIncomeId(response.id);
        alert('Income set successfully!');
      }
      setEditIncome(false);
      await loadInitialData();
    } catch (error) {
      console.error('Error setting income:', error);
      setError(error.message || 'Failed to set income');
    }
  };

  const startEditIncome = () => {
    setTempIncome(income);
    setEditIncome(true);
  };

  const cancelEditIncome = () => {
    setTempIncome(income);
    setEditIncome(false);
  };

  const handleBudgetSubmit = async () => {
    try {
      setError('');
      if (!income) {
        setError('Please set your monthly income first');
        return;
      }

      if (!amount || amount <= 0) {
        setError('Please enter a valid amount');
        return;
      }

      const budgetData = {
        monthly_income: income,
        amount: parseFloat(amount),
        category,
        description: description || `${category} budget`
      };

      if (editingBudget) {
        await budgetService.updateBudget(editingBudget.id, budgetData);
        alert('Budget updated successfully!');
        setEditingBudget(null);
        setEditAmount('');
        setEditCategory('');
        setEditDescription('');
      } else {
        await budgetService.createBudget(budgetData);
        alert('Budget added successfully!');
      }
      setAmount('');
      setDescription('');
      setCategory('housing');
      await loadInitialData();
    } catch (error) {
      console.error('Error adding budget:', error);
      setError(error.message || 'Failed to add budget');
    }
  };

  const handleDeleteBudget = async (budgetId) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      try {
        await budgetService.deleteBudget(budgetId);
        alert('Budget deleted successfully!');
        await loadInitialData();
      } catch (error) {
        console.error('Error deleting budget:', error);
        setError(error.message || 'Failed to delete budget');
      }
    }
  };

  const startEditBudget = (budget) => {
    setEditingBudget(budget);
    setEditAmount(budget.amount.toString());
    setEditCategory(budget.category);
    setEditDescription(budget.description || '');
    setAmount(budget.amount.toString());
    setCategory(budget.category);
    setDescription(budget.description || '');
  };

  const cancelEditBudget = () => {
    setEditingBudget(null);
    setEditAmount('');
    setEditCategory('');
    setEditDescription('');
    setAmount('');
    setCategory('housing');
    setDescription('');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Budget Manager</h1>
        <WalletIcon className="h-8 w-8 text-primary-500" />
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md mb-6">
          <div className="flex items-center">
            <XCircleIcon className="h-5 w-5 text-red-400 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Budget Controls */}
        <div className="lg:col-span-2 space-y-8">
          {/* Monthly Income, Expenses, and Balance Section */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
                <div className="flex items-center mb-4">
                  <BanknotesIcon className="h-6 w-6 text-green-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Monthly Income</h2>
                </div>
                {!editIncome ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-green-600">
                        ${typeof income === 'number' ? income.toFixed(2) : '0.00'}
                      </span>
                    </div>
                    <button
                      onClick={startEditIncome}
                      className="inline-flex items-center px-2 py-1 border border-primary-300 text-xs font-medium rounded-md text-primary-700 bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <PencilSquareIcon className="h-3 w-3 mr-1" />
                      Edit Income
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      type="number"
                      value={tempIncome}
                      onChange={(e) => setTempIncome(e.target.value)}
                      placeholder="Enter monthly income"
                      className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      min="0"
                      step="0.01"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleIncomeSubmit}
                        className="flex-1 inline-flex justify-center items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        <CheckCircleIcon className="h-3 w-3 mr-1" />
                        Save Income
                      </button>
                      <button
                        onClick={cancelEditIncome}
                        className="flex-1 inline-flex justify-center items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        <XCircleIcon className="h-3 w-3 mr-1" />
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border border-red-100">
                <div className="flex items-center mb-4">
                  <ArrowTrendingDownIcon className="h-6 w-6 text-red-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Total Expenses</h2>
                </div>
                <span className="text-2xl font-bold text-red-600">
                  ${totalExpenses.toFixed(2)}
                </span>
              </div>

              <div className="p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg border border-primary-100">
                <div className="flex items-center mb-4">
                  <WalletIcon className="h-6 w-6 text-primary-500 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Remaining Balance</h2>
                </div>
                <span className={`text-2xl font-bold ${remainingBalance >= 0 ? 'text-primary-500' : 'text-red-600'}`}>
                  ${remainingBalance.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Category Budget Form */}
          {income && (
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-6">
                <PlusCircleIcon className="h-6 w-6 text-gray-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">{editingBudget ? 'Edit Budget' : 'Add New Budget'}</h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      {categoryOptions.map((cat) => {
                        const Icon = categoryIcons[cat];
                        return (
                          <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                      Amount
                    </label>
                    <input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description (optional)
                  </label>
                  <input
                    id="description"
                    type="text"
                    placeholder="Add a description for this budget"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleBudgetSubmit}
                    className="flex-1 flex justify-center py-1.5 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    {editingBudget ? (
                      <>
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                        Update Budget
                      </>
                    ) : (
                      <>
                        <PlusCircleIcon className="h-4 w-4 mr-1" />
                        Add Budget
                      </>
                    )}
                  </button>
                  {editingBudget && (
                    <button
                      onClick={cancelEditBudget}
                      className="flex-1 flex justify-center py-1.5 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <XCircleIcon className="h-4 w-4 mr-1" />
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Budget List */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Your Budgets</h2>
              <span className="text-sm text-gray-500">{budgets.filter(b => b.category !== 'other' || b.description !== 'monthly-income').length} items</span>
            </div>
            
            {budgets.filter(b => b.category !== 'other' || b.description !== 'monthly-income').length === 0 ? (
              <div className="text-center py-8">
                <WalletIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm font-medium text-gray-900">No budgets added yet</p>
                <p className="mt-1 text-sm text-gray-500">Add your first budget item to get started.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2">
                {budgets
                  .filter(b => b.category !== 'other' || b.description !== 'monthly-income')
                  .map((b) => {
                    const amount = typeof b.amount === 'string' ? parseFloat(b.amount) : b.amount;
                    const formattedAmount = !isNaN(amount) ? amount.toFixed(2) : '0.00';
                    const Icon = categoryIcons[b.category];
                    
                    return (
                      <div key={b.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-150">
                        <div className="flex items-center min-w-0">
                          {Icon && <Icon className="h-5 w-5 text-gray-600 mr-3 flex-shrink-0" />}
                          <div className="min-w-0">
                            <strong className="text-gray-900 capitalize block truncate">{b.category}</strong>
                            {b.description && (
                              <p className="text-sm text-gray-600 mt-0.5 truncate">{b.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-gray-900 ml-4 flex-shrink-0">${formattedAmount}</span>
                          <button
                            onClick={() => startEditBudget(b)}
                            className="p-0.5 text-gray-500 hover:text-primary-500 focus:outline-none"
                            title="Edit budget"
                          >
                            <PencilSquareIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBudget(b.id)}
                            className="p-0.5 text-gray-500 hover:text-red-500 focus:outline-none"
                            title="Delete budget"
                          >
                            <XCircleIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
