import React, { useState, useEffect } from 'react';
import { 
  DocumentTextIcon, 
  PlusIcon, 
  TrashIcon, 
  CheckCircleIcon,
  CalendarIcon,
  PencilIcon,
  ClockIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import remindersService from '../../services/remindersService';
import Cookies from 'js-cookie';

const Documents = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    document_expiry_date: '',
    frequency: 'daily',
    is_active: true
  });

  const documentTypes = [
    { id: 'passport', name: 'Passport' },
    { id: 'visa', name: 'Visa' },
    { id: 'drivers_license', name: "Driver's License" },
    { id: 'health_card', name: 'Health Card' },
    { id: 'sin', name: 'SIN' },
    { id: 'custom', name: 'Custom Document' }
  ];

  const frequencies = [
    { id: 'daily', name: 'Daily' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
    { id: 'yearly', name: 'Yearly' }
  ];

  useEffect(() => {
    fetchReminders();
  }, []);

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

  const fetchReminders = async () => {
    try {
      setLoading(true);
      const response = await remindersService.getAllReminders();
      // Ensure we only show reminders for the current user
      const userReminders = Array.isArray(response) ? response : [];
      setReminders(userReminders);
      setError('');
    } catch (err) {
      console.error('Error fetching reminders:', err);
      setError('Failed to load reminders. Please try again.');
      setReminders([]); // Reset reminders on error
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Validate required fields
      if (!formData.title) {
        setError('Please select a document type');
        return;
      }

      if (!formData.document_expiry_date) {
        setError('Please select an expiry date');
        return;
      }

      const formattedData = {
        title: formData.title,
        document_expiry_date: formData.document_expiry_date,
        frequency: formData.frequency || 'daily',
        is_active: formData.is_active,
        user: null // Let the backend handle user association
      };

      if (editingId) {
        await remindersService.updateReminder(editingId, formattedData);
        setSuccess('Reminder updated successfully!');
      } else {
        await remindersService.createReminder(formattedData);
        setSuccess('Reminder created and immediate notification sent!');
      }

      setShowForm(false);
      setEditingId(null);
      setShowCustomInput(false);
      setFormData({
        title: '',
        document_expiry_date: '',
        frequency: 'daily',
        is_active: true
      });
      fetchReminders();
    } catch (err) {
      console.error('Error saving reminder:', err);
      setError(err.message || 'Failed to save reminder. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      try {
        await remindersService.deleteReminder(id);
        fetchReminders();
      } catch (err) {
        console.error('Error deleting reminder:', err);
        setError('Failed to delete reminder. Please try again.');
      }
    }
  };

  const handleEdit = (reminder) => {
    setEditingId(reminder.id);
    setFormData({
      title: reminder.title,
      document_expiry_date: reminder.document_expiry_date,
      frequency: reminder.frequency,
      is_active: reminder.is_active
    });
    setShowCustomInput(!documentTypes.some(type => type.name === reminder.title));
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'documentType' && value === 'custom') {
      setShowCustomInput(true);
    } else if (name === 'documentType') {
      setShowCustomInput(false);
      setFormData(prev => ({
        ...prev,
        title: value
      }));
    }
  };

  const handleSendReminder = async (id) => {
    try {
      setLoading(true);
      setError('');
      await remindersService.sendImmediateReminder(id);
      setSuccess('Reminder sent successfully!');
      // Refresh the reminders list to show updated last_reminder_sent
      fetchReminders();
    } catch (err) {
      console.error('Error sending reminder:', err);
      setError(err.message || 'Failed to send reminder. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-primary-500 to-primary-600">
              <h1 className="text-2xl font-bold text-white">Document Reminders</h1>
        <button
                onClick={() => {
                  setEditingId(null);
                  setShowCustomInput(false);
                  setFormData({
                    title: '',
                    document_expiry_date: '',
                    frequency: 'daily',
                    is_active: true
                  });
                  setShowForm(true);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-500 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
                Add Reminder
        </button>
      </div>

            <div className="p-8">
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  {success}
                </div>
              )}

              {showForm && (
                <div className="mb-8 bg-gray-50 p-6 rounded-xl">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    {editingId ? 'Edit Reminder' : 'Add New Reminder'}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Document Type</label>
                      <select
                        name="documentType"
                        value={showCustomInput ? 'custom' : formData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      >
                        <option value="">Select document type</option>
                        {documentTypes.map((type) => (
                          <option key={type.id} value={type.name}>
                            {type.name}
                          </option>
                        ))}
                        <option value="custom">Other Document</option>
                      </select>
                    </div>

                    {showCustomInput && (
              <div>
                        <label className="block text-sm font-medium text-gray-700">Custom Document Name</label>
                <input
                  type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                  required
                          placeholder="Enter your document name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
                    )}

              <div>
                      <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="date"
                        name="document_expiry_date"
                        value={formData.document_expiry_date}
                        onChange={handleChange}
                  required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Reminder Frequency</label>
                      <select
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      >
                        {frequencies.map((freq) => (
                          <option key={freq.id} value={freq.id}>
                            {freq.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">
                        Active Reminder
                      </label>
            </div>

                    <div className="flex justify-end space-x-3">
              <button
                type="button"
                        onClick={() => {
                          setShowForm(false);
                          setEditingId(null);
                          setShowCustomInput(false);
                        }}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                        {editingId ? 'Update Reminder' : 'Add Reminder'}
              </button>
            </div>
          </form>
        </div>
      )}

              <div className="space-y-4">
                {reminders.length === 0 ? (
                  <div className="text-center py-12">
                    <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No reminders</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new reminder.</p>
                  </div>
                ) : (
                  reminders.map((reminder) => {
                    const daysUntilExpiry = calculateDaysUntilExpiry(reminder.document_expiry_date);
                    const expiryStatus = getExpiryStatus(daysUntilExpiry);
                    
                    return (
                      <div
                        key={reminder.id}
                        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="text-lg font-medium text-gray-900">{reminder.title}</h3>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${expiryStatus.bgColor} ${expiryStatus.color}`}>
                                {expiryStatus.text}
                              </span>
                            </div>
                            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                Expires: {new Date(reminder.document_expiry_date).toLocaleDateString()}
                              </div>
                              <div className="flex items-center">
                                <ClockIcon className="h-4 w-4 mr-1" />
                                {daysUntilExpiry < 0 
                                  ? `Expired ${Math.abs(daysUntilExpiry)} days ago`
                                  : daysUntilExpiry === 0
                                  ? 'Expires today'
                                  : `${daysUntilExpiry} days remaining`}
                              </div>
                              <div className="flex items-center">
                                <BellIcon className="h-4 w-4 mr-1" />
                                {reminder.frequency.charAt(0).toUpperCase() + reminder.frequency.slice(1)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleSendReminder(reminder.id)}
                              className="text-primary-500 hover:text-primary-600"
                              title="Send Reminder"
                            >
                              <BellIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleEdit(reminder)}
                              className="text-primary-500 hover:text-primary-600"
                              title="Edit"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(reminder.id)}
                              className="text-primary-500 hover:text-primary-600"
                              title="Delete"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Reminders</h2>
          <div className="space-y-4">
            {reminders
              .filter(reminder => reminder.is_active)
              .sort((a, b) => new Date(a.document_expiry_date) - new Date(b.document_expiry_date))
              .slice(0, 5)
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
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {new Date(reminder.document_expiry_date).toLocaleDateString()}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents; 