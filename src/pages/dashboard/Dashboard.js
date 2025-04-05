import React, { useState, useEffect } from 'react';
import {
  DocumentTextIcon,
  NewspaperIcon,
  UserGroupIcon,
  ChartBarIcon,
  BellIcon,
  CurrencyDollarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import remindersService from '../../services/remindersService';
import budgetService from '../../services/budgetService';
import currencyService from '../../services/currencyService';
import rssService from '../../services/rssService';
import Flags from 'country-flag-icons/react/3x2';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Button,
  IconButton,
  Tooltip as MuiTooltip,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  TextField,
  Pagination,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  CurrencyExchange as CurrencyExchangeIcon,
  Logout as LogoutIcon,
  Search as SearchIcon
} from '@mui/icons-material';

// Helper function to get country code from currency code
const getCountryCode = (currency) => {
  const currencyToCountry = {
    'USD': 'US',
    'EUR': 'EU',
    'GBP': 'GB',
    'JPY': 'JP',
    'AUD': 'AU',
    'CAD': 'CA',
    'CHF': 'CH',
    'CNY': 'CN',
    'HKD': 'HK',
    'NZD': 'NZ',
    'SEK': 'SE',
    'KRW': 'KR',
    'SGD': 'SG',
    'NOK': 'NO',
    'MXN': 'MX',
    'INR': 'IN',
    'RUB': 'RU',
    'ZAR': 'ZA',
    'TRY': 'TR',
    'BRL': 'BR',
    'TWD': 'TW',
    'DKK': 'DK',
    'PLN': 'PL',
    'THB': 'TH',
    'IDR': 'ID',
    'HUF': 'HU',
    'CZK': 'CZ',
    'ILS': 'IL',
    'CLP': 'CL',
    'PHP': 'PH',
    'AED': 'AE',
    'COP': 'CO',
    'SAR': 'SA',
    'MYR': 'MY',
    'RON': 'RO'
  };
  return currencyToCountry[currency] || 'US'; // Default to US if not found
};

// Sample data for fallback UI
const sampleReminders = [
  { id: 1, title: 'Visa Application Deadline', description: 'Submit your visa application before the deadline', dueDate: '2023-05-15', priority: 'high' },
  { id: 2, title: 'Document Renewal', description: 'Renew your passport before it expires', dueDate: '2023-06-20', priority: 'medium' },
  { id: 3, title: 'Interview Preparation', description: 'Prepare for your immigration interview', dueDate: '2023-07-10', priority: 'low' }
];

const sampleBudgetSummary = {
  totalBudget: 50000,
  spent: 15000,
  remaining: 35000,
  categories: [
    { name: 'Housing', budget: 20000, spent: 8000 },
    { name: 'Transportation', budget: 5000, spent: 2000 },
    { name: 'Food', budget: 3000, spent: 1500 },
    { name: 'Utilities', budget: 2000, spent: 1000 },
    { name: 'Entertainment', budget: 1000, spent: 500 }
  ]
};

const sampleCurrencyRates = [
  { currency: 'USD', rate: 0.74, countryName: 'United States Dollar' },
  { currency: 'EUR', rate: 0.68, countryName: 'Euro' },
  { currency: 'GBP', rate: 0.59, countryName: 'British Pound' },
  { currency: 'JPY', rate: 108.45, countryName: 'Japanese Yen' },
  { currency: 'AUD', rate: 1.12, countryName: 'Australian Dollar' }
];

const sampleNewsReleases = [
  { id: 1, title: 'New Immigration Policy Announced', source: 'Immigration Canada', date: '2023-04-01', url: '#' },
  { id: 2, title: 'Changes to Express Entry System', source: 'CIC News', date: '2023-03-28', url: '#' },
  { id: 3, title: 'Temporary Foreign Worker Program Updates', source: 'Government of Canada', date: '2023-03-25', url: '#' }
];

const Dashboard = () => {
  const [userName, setUserName] = useState({ firstName: 'John', lastName: 'Doe' });
  const [reminders, setReminders] = useState(sampleReminders);
  const [budgetSummary, setBudgetSummary] = useState(sampleBudgetSummary);
  const [currencyRates, setCurrencyRates] = useState(sampleCurrencyRates);
  const [filteredCurrencyRates, setFilteredCurrencyRates] = useState(sampleCurrencyRates);
  const [currencySearch, setCurrencySearch] = useState('');
  const [currencyPage, setCurrencyPage] = useState(1);
  const [newsReleases, setNewsReleases] = useState(sampleNewsReleases);
  const [filteredNewsReleases, setFilteredNewsReleases] = useState(sampleNewsReleases);
  const [newsSearch, setNewsSearch] = useState('');
  const [newsPage, setNewsPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currencyError, setCurrencyError] = useState(null);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const navigate = useNavigate();
  
  const itemsPerPage = 5;

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        setUserName({
          firstName: parsedUserData.firstName || 'John',
          lastName: parsedUserData.lastName || 'Doe'
        });
        
        // Check if this is a new user (no profile completion flag)
        const isNewUser = !localStorage.getItem('profileCompleted');
        if (isNewUser) {
          setShowProfilePopup(true);
        }
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
    
    // Try to fetch real data, but use sample data as fallback
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      setCurrencyError(null);

      // Fetch reminders
      try {
        const remindersData = await remindersService.getAllReminders();
        if (remindersData && remindersData.length > 0) {
          setReminders(remindersData);
        }
      } catch (error) {
        console.error('Error fetching reminders:', error);
        // Keep using sample data
      }

      // Fetch budget summary
      try {
        const budgetData = await budgetService.getBudgetSummary();
        if (budgetData) {
          setBudgetSummary(budgetData);
        }
      } catch (error) {
        console.error('Error fetching budget summary:', error);
        // Keep using sample data
      }

      // Fetch currency rates
      try {
        const ratesData = await currencyService.getCADRates();
        if (ratesData && ratesData.data && ratesData.data.length > 0) {
          // Group by currency code to avoid duplicates
          const currencyMap = new Map();
          
          ratesData.data.forEach(rate => {
            const currencyCode = rate.currency;
            
            // If this currency already exists, update the country name to include both countries
            if (currencyMap.has(currencyCode)) {
              const existingRate = currencyMap.get(currencyCode);
              // Only add the country if it's not already included
              if (!existingRate.countryName.includes(rate.countryDisplayName)) {
                existingRate.countryName = `${existingRate.countryName}, ${rate.countryDisplayName}`;
              }
            } else {
              // Add new currency
              currencyMap.set(currencyCode, {
                currency: rate.currency,
                rate: parseFloat(rate.fxRate),
                countryName: rate.countryDisplayName,
                countryCode: rate.isoCountryCode
              });
            }
          });
          
          // Convert map to array
          const transformedRates = Array.from(currencyMap.values());
          setCurrencyRates(transformedRates);
          setFilteredCurrencyRates(transformedRates);
        }
      } catch (error) {
        console.error('Error fetching currency rates:', error);
        setCurrencyError('Failed to load currency rates. Using sample data.');
        // Keep using sample data
      }

      // Fetch news releases
      try {
        const newsData = await rssService.getNewsReleases();
        if (newsData && newsData.length > 0) {
          const formattedNews = newsData.map(item => ({
            id: item.id,
            title: item.title,
            source: item.source || 'Government of Canada',
            date: item.published_date,
            url: item.link
          }));
          setNewsReleases(formattedNews);
        }
      } catch (error) {
        console.error('Error fetching news releases:', error);
        // Keep using sample data
      }
    } catch (error) {
      console.error('Error in fetchDashboardData:', error);
      setError('Failed to load dashboard data. Some features may be limited.');
    } finally {
      setLoading(false);
    }
  };

  const calculateDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpiryStatus = (days) => {
    if (days < 0) return { text: 'Expired', color: 'text-red-500', bgColor: 'bg-red-100' };
    if (days <= 7) return { text: 'Expiring Soon', color: 'text-orange-500', bgColor: 'bg-orange-100' };
    return { text: 'Valid', color: 'text-green-500', bgColor: 'bg-green-100' };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(amount);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  // Filter currency rates based on search term
  useEffect(() => {
    if (currencyRates.length > 0) {
      const searchTerm = currencySearch.toLowerCase().trim();
      const filtered = currencyRates.filter(rate => 
        (rate.currency?.toLowerCase() || '').includes(searchTerm) || 
        (rate.countryName?.toLowerCase() || '').includes(searchTerm) ||
        (rate.countryCode?.toLowerCase() || '').includes(searchTerm)
      );
      setFilteredCurrencyRates(filtered);
      setCurrencyPage(1); // Reset to first page when search changes
    } else {
      setFilteredCurrencyRates([]);
    }
  }, [currencySearch, currencyRates]);

  // Calculate paginated currency rates
  const paginatedCurrencyRates = filteredCurrencyRates.slice(
    (currencyPage - 1) * itemsPerPage,
    currencyPage * itemsPerPage
  );

  // Filter news releases based on search term
  useEffect(() => {
    if (newsReleases.length > 0) {
      const searchTerm = newsSearch.toLowerCase().trim();
      const filtered = newsReleases.filter(news => 
        (news.title?.toLowerCase() || '').includes(searchTerm) || 
        (news.source?.toLowerCase() || '').includes(searchTerm) ||
        (news.description?.toLowerCase() || '').includes(searchTerm) ||
        (news.summary?.toLowerCase() || '').includes(searchTerm)
      );
      setFilteredNewsReleases(filtered);
      setNewsPage(1); // Reset to first page when search changes
    } else {
      setFilteredNewsReleases([]);
    }
  }, [newsSearch, newsReleases]);

  // Calculate paginated news
  const paginatedNews = filteredNewsReleases.slice(
    (newsPage - 1) * itemsPerPage,
    newsPage * itemsPerPage
  );

  // Handle currency search change
  const handleCurrencySearchChange = (event) => {
    setCurrencySearch(event.target.value);
  };

  // Handle currency page change
  const handleCurrencyPageChange = (event, value) => {
    setCurrencyPage(value);
  };

  // Handle news search change
  const handleNewsSearchChange = (event) => {
    setNewsSearch(event.target.value);
  };

  // Handle news page change
  const handleNewsPageChange = (event, value) => {
    setNewsPage(value);
  };

  const handleCloseProfilePopup = () => {
    setShowProfilePopup(false);
    localStorage.setItem('profileCompleted', 'true');
  };
  
  const handleGoToProfile = () => {
    setShowProfilePopup(false);
    localStorage.setItem('profileCompleted', 'true');
    navigate('/dashboard/profile');
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={fetchDashboardData}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Profile Completion Popup */}
      <Dialog
        open={showProfilePopup}
        onClose={handleCloseProfilePopup}
        aria-labelledby="profile-popup-title"
        aria-describedby="profile-popup-description"
      >
        <DialogTitle id="profile-popup-title">
          Complete Your Profile
        </DialogTitle>
        <DialogContent id="profile-popup-description">
          <Typography>
            Welcome to Immigration Hub! To get the most out of your experience, please complete your profile information.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfilePopup} color="primary">
            Later
          </Button>
          <Button onClick={handleGoToProfile} color="primary" variant="contained">
            Complete Profile
          </Button>
        </DialogActions>
      </Dialog>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
          <Typography variant="h6" color="text.secondary">
            Welcome to Immigration Hub, {userName.firstName} {userName.lastName}
          </Typography>
        </Box>
        <MuiTooltip title="Sign Out">
          <IconButton 
            onClick={handleSignOut}
            color="inherit"
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }
            }}
          >
            <LogoutIcon />
          </IconButton>
        </MuiTooltip>
      </Box>

      <div className="space-y-6">
        {/* Budget Overview - Moved to top */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Budget Overview</h2>
          </div>
          <div className="p-6">
            {budgetSummary ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-green-100">
                        <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Monthly Income</h3>
                        <p className="text-3xl font-bold text-green-600">{formatCurrency(budgetSummary.monthly_income)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-red-100">
                        <ArrowDownIcon className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Total Expenses</h3>
                        <p className="text-3xl font-bold text-red-600">{formatCurrency(budgetSummary.total_expenses)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-primary-100">
                        <ChartBarIcon className="h-6 w-6 text-primary-500" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Balance</h3>
                        <p className={`text-3xl font-bold ${budgetSummary.remaining_amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(budgetSummary.remaining_amount)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Budget Chart */}
                {budgetSummary.category_breakdown && budgetSummary.category_breakdown.length > 0 && (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={budgetSummary.category_breakdown}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
                <div className="mt-4 text-right">
                  <Link
                    to="/dashboard/budget"
                    className="text-sm font-medium text-primary-500 hover:text-primary-600"
                  >
                    View detailed budget →
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No budget data</h3>
                <p className="mt-1 text-sm text-gray-500">Add your first budget item to get started.</p>
                <div className="mt-6">
                  <Link
                    to="/dashboard/budget"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                    Add budget
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Document Reminders - Moved to second position */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Document Reminders</h2>
          </div>
          <div className="p-6">
            {reminders.length === 0 ? (
              <div className="text-center py-12">
                <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No reminders</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new reminder.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reminders
                    .filter(reminder => reminder.is_active)
                    .sort((a, b) => new Date(a.document_expiry_date) - new Date(b.document_expiry_date))
                    .slice(0, 3)
                    .map(reminder => {
                      const daysUntilExpiry = calculateDaysUntilExpiry(reminder.document_expiry_date);
                      const expiryStatus = getExpiryStatus(daysUntilExpiry);
                      
                      return (
                        <div
                          key={reminder.id}
                          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">{reminder.title}</h3>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${expiryStatus.bgColor} ${expiryStatus.color}`}>
                              {expiryStatus.text}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <BellIcon className="h-4 w-4 mr-1" />
                            {daysUntilExpiry < 0 
                              ? `Expired ${Math.abs(daysUntilExpiry)} days ago`
                              : daysUntilExpiry === 0
                              ? 'Expires today'
                              : `${daysUntilExpiry} days remaining`}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="mt-4 text-right">
                  <Link
                    to="/dashboard/documents"
                    className="text-sm font-medium text-primary-500 hover:text-primary-600"
                  >
                    View all documents →
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Currency Rates */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Currency Exchange Rates</h2>
            <p className="mt-1 text-sm text-gray-500">1 Canadian Dollar (CAD) equals:</p>
          </div>
          <div className="p-6">
            {currencyError ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {currencyError}
              </Alert>
            ) : currencyRates.length === 0 ? (
              <div className="text-center py-12">
                <CurrencyDollarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No currency rates available</h3>
                <p className="mt-1 text-sm text-gray-500">Please try again later.</p>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={fetchDashboardData}
                  startIcon={<CurrencyExchangeIcon />}
                  sx={{ mt: 2 }}
                >
                  Refresh Rates
                </Button>
              </div>
            ) : (
              <>
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search by currency or country..."
                    value={currencySearch}
                    onChange={handleCurrencySearchChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Currency
                      </th>
                      <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Country
                      </th>
                      <th scope="col" className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Exchange Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedCurrencyRates.map((rate) => {
                        const countryCode = getCountryCode(rate.currency);
                      const Flag = Flags[countryCode];
                      return (
                          <tr key={rate.currency} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center space-x-2">
                                {Flag && <Flag className="h-4 w-6" title={rate.countryName} />}
                                <span>{rate.currency}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {rate.countryName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                              {rate.rate ? rate.rate.toFixed(4) : 'N/A'} {rate.currency}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                  {filteredCurrencyRates.length > itemsPerPage && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                      <Pagination 
                        count={Math.ceil(filteredCurrencyRates.length / itemsPerPage)} 
                        page={currencyPage} 
                        onChange={handleCurrencyPageChange} 
                        color="primary" 
                      />
                    </Box>
                  )}
                <div className="mt-4 text-sm text-gray-500 text-right">
                  Last updated: {new Date().toLocaleString()}
                </div>
              </div>
              </>
            )}
          </div>
        </div>

        {/* News Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <NewspaperIcon className="h-6 w-6 text-primary-500 mr-2" />
                  <Typography variant="h6">Latest News</Typography>
                </div>
                <Link 
                  to="/dashboard/news"
                  className="text-sm text-primary-500 hover:text-primary-600 font-medium"
                >
                  View All
                </Link>
              </div>

              {newsReleases.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  No news releases available.
                </div>
              ) : (
                <>
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Search news..."
                      value={newsSearch}
                      onChange={handleNewsSearchChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <div className="space-y-4">
                    {paginatedNews.length === 0 ? (
                      <div className="text-center text-gray-500 py-4">
                        No news matching your search.
                      </div>
                    ) : (
                      paginatedNews.map((news, index) => (
                        <div 
                          key={news.id || index}
                          className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0"
                        >
                          <h3 className="font-medium text-gray-900 mb-1">
                            {news.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            <span>
                              {new Date(news.date || news.updated).toLocaleDateString()}
                            </span>
                            <ClockIcon className="h-4 w-4 ml-4 mr-1" />
                            <span>
                              {new Date(news.date || news.updated).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {news.description || news.summary}
                          </p>
                          <a
                            href={news.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary-500 hover:text-primary-600 font-medium mt-2 inline-block"
                          >
                            Read More →
                          </a>
                        </div>
                      ))
                    )}
                    
                    {filteredNewsReleases.length > itemsPerPage && (
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Pagination 
                          count={Math.ceil(filteredNewsReleases.length / itemsPerPage)} 
                          page={newsPage} 
                          onChange={handleNewsPageChange} 
                          color="primary" 
                        />
                      </Box>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </div>
    </Box>
  );
};

export default Dashboard; 