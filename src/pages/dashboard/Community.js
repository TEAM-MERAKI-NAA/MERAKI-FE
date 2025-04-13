import React, { useState, useEffect } from 'react';
import {
  ChatBubbleLeftIcon,
  PaperAirplaneIcon,
  BookmarkIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import communityService from '../../services/communityService';

const QueryCard = ({ query }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    if (query?.id) {
      fetchComments();
    }
  }, [query?.id]);

  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const data = await communityService.getCommentsByPostId(query.id);
      console.log('Fetched comments data:', data); // Debug log
      
      // Process comments to ensure they have email information
      const processedComments = data.map(comment => {
        // If comment doesn't have email info, try to get it from localStorage
        if (!comment.email && !comment.user_email && !comment.user?.email) {
          try {
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            if (userData.email) {
              return {
                ...comment,
                email: userData.email,
                user_email: userData.email
              };
            }
          } catch (error) {
            console.error('Error accessing localStorage:', error);
          }
        }
        return comment;
      });
      
      console.log('Processed comments:', processedComments); // Debug log
      setComments(processedComments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || !query?.id) return;

    try {
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const firstName = userData.firstName || '';
      const lastName = userData.lastName || '';
      const fullName = firstName && lastName ? `${firstName} ${lastName}` : '';
      const email = userData.email || '';
      
      // Include user name and email in the comment data
      const commentData = {
        content: comment,
        user_first_name: firstName,
        user_last_name: lastName,
        user_full_name: fullName,
        user_email: email,
        email: email
      };
      
      await communityService.createComment(query.id, commentData);
      setComment('');
      fetchComments();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  // Get user's full name from the query data
  const getUserFullName = () => {
    // Check for firstName and lastName in the user object
    if (query.user?.firstName && query.user?.lastName) {
      return `${query.user.firstName} ${query.user.lastName}`;
    }
    // Check for first_name and last_name in the user object (alternative format)
    if (query.user?.first_name && query.user?.last_name) {
      return `${query.user.first_name} ${query.user.last_name}`;
    }
    // Check for user_full_name in the query
    if (query.user_full_name) {
      return query.user_full_name;
    }
    // Check for user_first_name and user_last_name in the query
    if (query.user_first_name && query.user_last_name) {
      return `${query.user_first_name} ${query.user_last_name}`;
    }
    // Fallback to email
    return query.user?.email || 'Anonymous';
  };

  // Get user's email from the query data
  const getUserEmail = () => {
    console.log('Query data:', query); // Debug log
    
    // Check for email in the user object
    if (query.user?.email) {
      console.log('Found email in user object:', query.user.email);
      return query.user.email;
    }
    
    // Check for email directly on the query
    if (query.email) {
      console.log('Found email directly on query:', query.email);
      return query.email;
    }
    
    // Check for user_email in the query
    if (query.user_email) {
      console.log('Found user_email on query:', query.user_email);
      return query.user_email;
    }
    
    // Try to get email from localStorage as a fallback
    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      if (userData.email) {
        console.log('Found email in localStorage:', userData.email);
        return userData.email;
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
    
    // Fallback to anonymous
    console.log('No email found, using Anonymous');
    return 'Anonymous';
  };

  // Clean HTML content
  const cleanHtmlContent = (content) => {
    if (!content) return '';
    // Remove HTML tags but keep line breaks
    return content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  };

  // Get comment user's email
  const getCommentUserEmail = (comment) => {
    console.log('Comment data:', comment); // Debug log
    
    // Check for email in the user object
    if (comment.user?.email) {
      console.log('Found email in user object:', comment.user.email);
      return comment.user.email;
    }
    
    // Check for email directly on the comment
    if (comment.email) {
      console.log('Found email directly on comment:', comment.email);
      return comment.email;
    }
    
    // Check for user_email in the comment
    if (comment.user_email) {
      console.log('Found user_email on comment:', comment.user_email);
      return comment.user_email;
    }
    
    // Try to get email from localStorage as a fallback
    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      if (userData.email) {
        console.log('Found email in localStorage:', userData.email);
        return userData.email;
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
    
    // Fallback to anonymous
    console.log('No email found for comment, using Anonymous');
    return 'Anonymous';
  };

  if (!query) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center">
              <span className="text-white font-semibold">
                {getUserFullName().charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{query.title || 'Untitled'}</h3>
              <p className="text-sm text-gray-500">
                Posted by {getUserEmail()} • {query.created_at ? new Date(query.created_at).toLocaleDateString() : 'Unknown date'}
              </p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">{cleanHtmlContent(query.description)}</p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-8 border-t border-gray-100 pt-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Comments</h4>
        {loadingComments ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 text-sm font-medium">
                      {getCommentUserEmail(comment).charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {getCommentUserEmail(comment)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {comment.created_at ? new Date(comment.created_at).toLocaleDateString() : 'Unknown date'}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 pl-11">{comment.content || 'No content'}</p>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleCommentSubmit} className="mt-6">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Community = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showNewQuery, setShowNewQuery] = useState(false);
  const [newQuery, setNewQuery] = useState({
    title: '',
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);

  // Quill editor modules configuration
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'link'
  ];

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      setLoading(true);
      const data = await communityService.getAllPosts();
      setQueries(Array.isArray(data) ? data : []);
      setError('');
    } catch (error) {
      console.error('Error fetching queries:', error);
      setError('Failed to load queries. Please try again.');
      setQueries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      console.log('User data from localStorage:', userData); // Debug log
      
      const firstName = userData.firstName || '';
      const lastName = userData.lastName || '';
      const fullName = firstName && lastName ? `${firstName} ${lastName}` : '';
      const email = userData.email || '';
      
      console.log('Email from userData:', email); // Debug log
      
      // Include user name and email in the post data
      const postData = {
        ...newQuery,
        user_first_name: firstName,
        user_last_name: lastName,
        user_full_name: fullName,
        user_email: email,
        email: email // Add email directly to the post data as well
      };
      
      console.log('Post data being sent:', postData); // Debug log
      
      await communityService.createPost(postData);
      setNewQuery({ title: '', description: '' });
      setShowNewQuery(false);
      fetchQueries();
    } catch (error) {
      console.error('Error creating query:', error);
      setError('Failed to create query. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewQuery(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDescriptionChange = (content) => {
    setNewQuery(prev => ({
      ...prev,
      description: content
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Community</h1>
        <button
          onClick={() => setShowNewQuery(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Query
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {showNewQuery && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Query</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newQuery.title}
                onChange={handleChange}
                required
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Enter a title for your query"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <div className="border rounded-lg">
                <ReactQuill
                  value={newQuery.description}
                  onChange={handleDescriptionChange}
                  modules={modules}
                  formats={formats}
                  className="h-48"
                  theme="snow"
                  placeholder="Describe your query in detail..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowNewQuery(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Query'
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {queries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-100">
            <ChatBubbleLeftIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No queries yet</h3>
            <p className="mt-1 text-sm text-gray-500">Be the first to start a conversation!</p>
            <div className="mt-6">
              <button
                onClick={() => setShowNewQuery(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                New Query
              </button>
            </div>
          </div>
        ) : (
          queries.map(query => (
            <QueryCard key={query.id} query={query} />
          ))
        )}
      </div>
    </div>
  );
};

export default Community; 