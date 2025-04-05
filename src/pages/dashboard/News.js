import React, { useState, useEffect } from 'react';
import { 
  NewspaperIcon,
  MicrophoneIcon,
  DocumentTextIcon,
  MegaphoneIcon,
  ChatBubbleLeftRightIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import rssService from '../../services/rssService';

const ITEMS_PER_PAGE = 10;

const News = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newsData, setNewsData] = useState({
    backgrounders: [],
    mediaAdvisories: [],
    newsReleases: [],
    speeches: [],
    statements: []
  });
  const [selectedCategory, setSelectedCategory] = useState('news-releases');
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'news-releases', name: 'News Releases', icon: NewspaperIcon },
    { id: 'speeches', name: 'Speeches', icon: MicrophoneIcon },
    { id: 'backgrounders', name: 'Backgrounders', icon: DocumentTextIcon },
    { id: 'media-advisories', name: 'Media Advisories', icon: MegaphoneIcon },
    { id: 'statements', name: 'Statements', icon: ChatBubbleLeftRightIcon }
  ];

  const formatDate = (dateString) => {
    try {
      // Check if the dateString is valid
      if (!dateString || dateString === 'Invalid Date') {
        return 'Date not available';
      }
      
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Date not available';
      }
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date not available';
    }
  };

  // Helper function to parse date strings reliably
  const parseDate = (dateString) => {
    if (!dateString) return new Date(0); // Return epoch date for invalid dates
    
    // Try to parse the date
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.warn('Invalid date:', dateString);
      return new Date(0); // Return epoch date for invalid dates
    }
    
    return date;
  };

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError('');
      const [backgrounders, mediaAdvisories, newsReleases, speeches, statements] = await Promise.all([
        rssService.getBackgrounders(),
        rssService.getMediaAdvisories(),
        rssService.getNewsReleases(),
        rssService.getSpeeches(),
        rssService.getStatements()
      ]);

      // Process and sort the data by date
      const processData = (items) => {
        return items
          .map(item => {
            // Ensure we have a valid date
            let pubDate = item.pubDate || item.published_date || item.updated;
            
            // If no date is available, use a fallback date
            if (!pubDate || pubDate === 'Invalid Date') {
              pubDate = new Date().toISOString();
            }
            
            return {
              ...item,
              pubDate: pubDate,
              description: item.description || item.summary || 'No description available'
            };
          })
          .sort((a, b) => {
            // Sort by date in descending order (newest first)
            const dateA = parseDate(a.pubDate);
            const dateB = parseDate(b.pubDate);
            return dateB.getTime() - dateA.getTime();
          });
      };

      setNewsData({
        backgrounders: processData(backgrounders),
        mediaAdvisories: processData(mediaAdvisories),
        newsReleases: processData(newsReleases),
        speeches: processData(speeches),
        statements: processData(statements)
      });
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(err.message || 'Failed to fetch news. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      setError('');
      await rssService.fetchAndStore();
      await fetchNews();
    } catch (err) {
      console.error('Error refreshing news:', err);
      setError(err.message || 'Failed to refresh news. Please try again.');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when category changes
  }, [selectedCategory]);

  const getCurrentNews = () => {
    let news = [];
    switch (selectedCategory) {
      case 'backgrounders':
        news = newsData.backgrounders;
        break;
      case 'media-advisories':
        news = newsData.mediaAdvisories;
        break;
      case 'news-releases':
        news = newsData.newsReleases;
        break;
      case 'speeches':
        news = newsData.speeches;
        break;
      case 'statements':
        news = newsData.statements;
        break;
      default:
        news = [];
    }

    // Filter news based on search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      return news.filter(item => 
        (item.title && item.title.toLowerCase().includes(query)) ||
        (item.description && item.description.toLowerCase().includes(query))
      );
    }
    
    // Ensure news is sorted by date (newest first)
    return [...news].sort((a, b) => {
      const dateA = parseDate(a.pubDate);
      const dateB = parseDate(b.pubDate);
      return dateB.getTime() - dateA.getTime();
    });
  };

  const currentNews = getCurrentNews();
  const totalPages = Math.ceil(currentNews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedNews = currentNews.slice(startIndex, endIndex);

  // Reset to first page when search query or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Latest News</h1>
          <p className="mt-1 text-sm text-gray-500">Stay updated with the latest immigration news and updates</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowPathIcon className={`h-5 w-5 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh News'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center">
          <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      <div className="bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden mb-8 transform hover:shadow-xl transition-shadow duration-300">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news..."
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm pl-10 py-3"
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="divide-y divide-gray-200">
          {paginatedNews.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              {searchQuery.trim() 
                ? 'No news items found matching your search.'
                : 'No news items available in this category.'}
            </div>
          ) : (
            paginatedNews.map((item, index) => {
              // Log the date for debugging
              console.log(`News item ${index}: ${item.title}, Date: ${item.pubDate}, Parsed: ${parseDate(item.pubDate).toISOString()}`);
              
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full transform hover:-translate-y-1 border border-gray-100">
                  {item.image_url && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          console.error('Image load error:', e);
                          e.target.src = 'https://via.placeholder.com/400x300?text=News+Image';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">{item.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <CalendarIcon className="h-4 w-4 mr-1 text-primary-500" />
                        <span>{formatDate(item.pubDate)}</span>
                      </div>
                      <div className="mt-4">
                        <p className="text-gray-600 line-clamp-3 group-hover:text-gray-700 transition-colors duration-200">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center text-primary-600 group-hover:text-primary-700 transition-colors duration-200">
                      <span className="text-sm font-medium">Read more</span>
                      <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {totalPages > 1 && (
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(endIndex, currentNews.length)}</span> of{' '}
                  <span className="font-medium">{currentNews.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === i + 1
                          ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default News; 