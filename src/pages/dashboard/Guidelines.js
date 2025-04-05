import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpenIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import guideService from '../../services/guideService';
import { API_BASE_URL } from '../../config';

const GuideCard = ({ guide }) => {
  const parseText = (text, wordLimit) => {
    if (!text) return '';
    const plainText = text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
      .replace(/&amp;/g, '&') // Replace &amp; with &
      .replace(/&lt;/g, '<') // Replace &lt; with <
      .replace(/&gt;/g, '>') // Replace &gt; with >
      .replace(/&quot;/g, '"') // Replace &quot; with "
      .replace(/&#39;/g, "'"); // Replace &#39; with '
    
    const words = plainText.split(' ');
    return words.length > wordLimit 
      ? words.slice(0, wordLimit).join(' ') + '...'
      : plainText;
  };

  const getImageUrl = (guide) => {
    if (guide.image_url) return guide.image_url;
    if (guide.image) {
      return guide.image.startsWith('http')
        ? guide.image
        : `${API_BASE_URL}${guide.image}`;
    }
    return null;
  };

  const imageUrl = getImageUrl(guide);

  return (
    <Link to={`/dashboard/guidelines/${guide.slug}`} className="block group">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full transform hover:-translate-y-1 border border-gray-100">
        {imageUrl && (
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={imageUrl}
              alt={guide.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                console.error('Image load error:', e);
                e.target.src = 'https://via.placeholder.com/400x300?text=Guide+Image';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
          </div>
        )}
        <div className="p-6 flex flex-col h-full">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">{guide.title}</h3>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <ClockIcon className="h-4 w-4 mr-1 text-primary-500" />
              <span>Last updated: {new Date(guide.updated_at).toLocaleDateString()}</span>
            </div>
            <div className="mt-4">
              <p className="text-gray-600 line-clamp-3 group-hover:text-gray-700 transition-colors duration-200">
                {parseText(guide.description, 25)}
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
    </Link>
  );
};

const Guidelines = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await guideService.getAllGuides();
      // Parse image URLs for all guides
      const parsedData = data.map(guide => ({
        ...guide,
        image_url: guide.image_url || (guide.image && `${API_BASE_URL}${guide.image}`)
      }));
      console.log('Guides data:', parsedData);
      setGuides(parsedData);
    } catch (err) {
      console.error('Error fetching guides:', err);
      setError(err.message || 'Failed to fetch guides. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = searchQuery.trim() === '' ||
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (guide.description && guide.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Guides</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Essential information and resources to help you navigate life in Canada
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8 flex items-center">
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
              placeholder="Search guides..."
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm pl-10 py-3"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGuides.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-lg border border-gray-100">
            <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">
              {searchQuery.trim() 
                ? 'No guides found matching your search.'
                : 'No guides available.'}
            </p>
          </div>
        ) : (
          filteredGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))
        )}
      </div>
    </div>
  );
};

export default Guidelines; 