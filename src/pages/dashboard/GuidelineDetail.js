import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, BookOpenIcon, ClockIcon } from '@heroicons/react/24/outline';
import guideService from '../../services/guideService';
import { API_BASE_URL } from '../../config';

const GuidelineDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await guideService.getGuideBySlug(slug);
        // Parse the image URL if it exists
        if (data.image) {
          data.image_url = data.image.startsWith('http') 
            ? data.image 
            : `${API_BASE_URL}${data.image}`;
        }
        setGuide(data);
        console.log('Guide data:', data);
      } catch (err) {
        console.error('Error fetching guide:', err);
        setError(err.message || 'Failed to fetch guide details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchGuide();
  }, [slug]);

  const parseDescription = (description) => {
    if (!description) return 'No description available.';
    return description
      .replace(/<p>\s*<\/p>/g, '') // Remove empty paragraphs
      .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
      .replace(/&amp;/g, '&') // Replace &amp; with &
      .replace(/&lt;/g, '<') // Replace &lt; with <
      .replace(/&gt;/g, '>') // Replace &gt; with >
      .replace(/&quot;/g, '"') // Replace &quot; with "
      .replace(/&#39;/g, "'"); // Replace &#39; with '
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-500">
          Guide not found.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate('/dashboard/guidelines')}
        className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-8 transition-colors duration-200"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Guides
      </button>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {(guide.image || guide.image_url) && (
          <div className="relative h-96 w-full">
            <img
              src={guide.image_url || `${API_BASE_URL}${guide.image}`}
              alt={guide.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('Image load error:', e);
                e.target.src = 'https://via.placeholder.com/800x400?text=Guide+Image';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}

        <div className="px-8 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <BookOpenIcon className="h-8 w-8 text-primary-600 mr-3" />
                <h1 className="text-3xl font-bold text-gray-900">{guide.title}</h1>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span>Last updated: {new Date(guide.updated_at).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700"
                dangerouslySetInnerHTML={{ 
                  __html: parseDescription(guide.description)
                }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidelineDetail; 