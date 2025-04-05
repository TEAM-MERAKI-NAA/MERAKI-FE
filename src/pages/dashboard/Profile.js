import React, { useState, useEffect } from 'react';
import { PhotoIcon, UserCircleIcon, CheckCircleIcon, LockClosedIcon, ArrowRightOnRectangleIcon, EyeIcon, EyeSlashIcon, PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline';
import profileService from '../../services/profileService';
import authService from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState({
    id: null,
    bio: '',
    profile_image: null,
    gender: '',
    nationality: '',
    province: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    postalCode: '',
    location: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [passwordForm, setPasswordForm] = useState({
    email: '',
    otp: '',
    new_password: ''
  });
  const [passwordStep, setPasswordStep] = useState(1);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();

  // Sample data for dropdowns
  const nationalities = [
    'Afghan', 'Albanian', 'Algerian', 'American', 'Andorran', 'Angolan', 'Antiguan', 'Argentine',
    'Armenian', 'Australian', 'Austrian', 'Azerbaijani', 'Bahamian', 'Bahraini', 'Bangladeshi',
    'Barbadian', 'Belarusian', 'Belgian', 'Belizean', 'Beninese', 'Bhutanese', 'Bolivian',
    'Bosnian', 'Botswanan', 'Brazilian', 'British', 'Bruneian', 'Bulgarian', 'Burkinabe',
    'Burmese', 'Burundian', 'Cambodian', 'Cameroonian', 'Canadian', 'Cape Verdean', 'Central African',
    'Chadian', 'Chilean', 'Chinese', 'Colombian', 'Comoran', 'Congolese', 'Costa Rican',
    'Croatian', 'Cuban', 'Cypriot', 'Czech', 'Danish', 'Djibouti', 'Dominican', 'Dutch',
    'East Timorese', 'Ecuadorean', 'Egyptian', 'Emirian', 'Equatorial Guinean', 'Eritrean',
    'Estonian', 'Ethiopian', 'Fijian', 'Filipino', 'Finnish', 'French', 'Gabonese', 'Gambian',
    'Georgian', 'German', 'Ghanaian', 'Greek', 'Grenadian', 'Guatemalan', 'Guinea-Bissauan',
    'Guinean', 'Guyanese', 'Haitian', 'Herzegovinian', 'Honduran', 'Hungarian', 'Icelander',
    'Indian', 'Indonesian', 'Iranian', 'Iraqi', 'Irish', 'Israeli', 'Italian', 'Ivorian',
    'Jamaican', 'Japanese', 'Jordanian', 'Kazakhstani', 'Kenyan', 'Kittian and Nevisian',
    'Kuwaiti', 'Kyrgyz', 'Laotian', 'Latvian', 'Lebanese', 'Liberian', 'Libyan', 'Liechtensteiner',
    'Lithuanian', 'Luxembourger', 'Macedonian', 'Malagasy', 'Malawian', 'Malaysian', 'Maldivan',
    'Malian', 'Maltese', 'Marshallese', 'Mauritanian', 'Mauritian', 'Mexican', 'Micronesian',
    'Moldovan', 'Monacan', 'Mongolian', 'Moroccan', 'Mosotho', 'Motswana', 'Mozambican',
    'Namibian', 'Nauruan', 'Nepalese', 'New Zealander', 'Nicaraguan', 'Nigerian', 'Nigerien',
    'North Korean', 'Northern Irish', 'Norwegian', 'Omani', 'Pakistani', 'Palauan', 'Panamanian',
    'Papua New Guinean', 'Paraguayan', 'Peruvian', 'Polish', 'Portuguese', 'Qatari', 'Romanian',
    'Russian', 'Rwandan', 'Saint Lucian', 'Salvadoran', 'Samoan', 'San Marinese', 'Sao Tomean',
    'Saudi', 'Scottish', 'Senegalese', 'Serbian', 'Seychellois', 'Sierra Leonean', 'Singaporean',
    'Slovakian', 'Slovenian', 'Solomon Islander', 'Somali', 'South African', 'South Korean',
    'Spanish', 'Sri Lankan', 'Sudanese', 'Surinamer', 'Swazi', 'Swedish', 'Swiss', 'Syrian',
    'Taiwanese', 'Tajik', 'Tanzanian', 'Thai', 'Togolese', 'Tongan', 'Trinidadian or Tobagonian',
    'Tunisian', 'Turkish', 'Tuvaluan', 'Ugandan', 'Ukrainian', 'Uruguayan', 'Uzbekistani',
    'Venezuelan', 'Vietnamese', 'Welsh', 'Yemenite', 'Zambian', 'Zimbabwean'
  ];

  const provinces = [
    'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
    'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island',
    'Quebec', 'Saskatchewan', 'Yukon'
  ];

  useEffect(() => {
    fetchProfile();
    // Get user data from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setProfile(prevProfile => ({
        ...prevProfile,
        email: parsedUserData.email || '',
        phone: parsedUserData.phone || '',
        province: parsedUserData.province || '',
        gender: parsedUserData.gender || '',
        nationality: parsedUserData.nationality || '',
        bio: parsedUserData.bio || '',
        firstName: parsedUserData.firstName || '',
        lastName: parsedUserData.lastName || ''
      }));
      
      // Set email for password reset
      setPasswordForm(prev => ({
        ...prev,
        email: parsedUserData.email || ''
      }));
    }
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await profileService.getMyProfile();
      setProfile(prevProfile => ({
        ...prevProfile,
        id: data.id,
        bio: data.bio || '',
        gender: data.gender || '',
        nationality: data.nationality || '',
        province: data.province || '',
        profile_image: data.profile_image || null,
        email: data.email || prevProfile.email,
        firstName: data.first_name || prevProfile.firstName,
        lastName: data.last_name || prevProfile.lastName,
        phone: data.phone_number || prevProfile.phone
      }));
      if (data.profile_image) {
        setPreviewImage(data.profile_image);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, profile_image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const formData = new FormData();
      formData.append('bio', profile.bio || '');
      formData.append('gender', profile.gender || '');
      formData.append('nationality', profile.nationality || '');
      formData.append('province', profile.province || '');
      if (profile.profile_image instanceof File) {
        formData.append('profile_image', profile.profile_image);
      }

      const response = await profileService.updateProfile(profile.id, formData);
      
      // Update the profile state with the response data
      setProfile(prevProfile => ({
        ...prevProfile,
        bio: response.bio || '',
        gender: response.gender || '',
        nationality: response.nationality || '',
        province: response.province || '',
        profile_image: response.profile_image || prevProfile.profile_image
      }));

      // Update localStorage with the new data
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      localStorage.setItem('userData', JSON.stringify({
        ...userData,
        firstName: response.first_name || userData.firstName,
        lastName: response.last_name || userData.lastName,
        province: response.province || '',
        gender: response.gender || '',
        nationality: response.nationality || '',
        bio: response.bio || ''
      }));

      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    // For OTP, only allow numeric input
    if (name === 'otp' && !/^\d*$/.test(value)) {
      return;
    }
    setPasswordForm({
      ...passwordForm,
      [name]: value
    });
  };

  const validatePassword = () => {
    if (!passwordForm.new_password) {
      setPasswordError('New password is required');
      return false;
    }
    if (passwordForm.new_password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return false;
    }
    if (!/\d/.test(passwordForm.new_password)) {
      setPasswordError('Password must include at least one number');
      return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordForm.new_password)) {
      setPasswordError('Password must include at least one special character');
      return false;
    }
    return true;
  };

  const validateOtp = () => {
    if (!passwordForm.otp) {
      setPasswordError('Verification code is required');
      return false;
    }
    // OTP should be numeric and have a reasonable length (e.g., 6 digits)
    const otpRegex = /^\d{6}$/;
    if (!otpRegex.test(passwordForm.otp)) {
      setPasswordError('Verification code must be 6 digits');
      return false;
    }
    return true;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    setLoading(true);

    try {
      if (passwordStep === 1) {
        if (!passwordForm.email) {
          throw new Error('Email is required');
        }
        console.log('Requesting password reset for email:', passwordForm.email);
        await authService.forgotPassword(passwordForm.email);
        console.log('Password reset code sent successfully');
        setPasswordSuccess('Reset code has been sent to your email.');
        setPasswordStep(2);
      } else if (passwordStep === 2) {
        // Validate each field individually
        if (!passwordForm.email) {
          throw new Error('Email is required');
        }
        if (!validateOtp()) {
          setLoading(false);
          return;
        }
        
        // Move to step 3 to enter new password
        setPasswordStep(3);
      } else if (passwordStep === 3) {
        // Validate new password only in step 3
        if (!validatePassword()) {
          setLoading(false);
          return;
        }
        
        console.log('Attempting to reset password with:', {
          emailLength: passwordForm.email.length,
          otpLength: passwordForm.otp.length,
          passwordLength: passwordForm.new_password.length
        });
        
        await authService.resetPassword(
          passwordForm.email.trim(),
          passwordForm.otp.trim(),
          passwordForm.new_password
        );

        console.log('Password reset successful');
        setPasswordSuccess('Password has been reset successfully!');
        setPasswordStep(1);
        setPasswordForm(prev => ({
          ...prev,
          otp: '',
          new_password: ''
        }));
      }
    } catch (err) {
      console.error('Password reset error in component:', err);
      // Handle specific error cases
      if (err.message.includes('Invalid email or OTP')) {
        setPasswordError('The reset code is invalid or has expired. Please request a new one.');
      } else if (err.message.includes('Password')) {
        setPasswordError(err.message);
      } else {
        setPasswordError(err.message || 'An error occurred. Please try again.');
      }
      
      // If we get an error about invalid OTP in step 2, allow the user to go back to step 1
      if (passwordStep === 2 && (err.message.includes('OTP') || err.message.includes('code'))) {
        const shouldRestart = window.confirm('Would you like to request a new reset code?');
        if (shouldRestart) {
          setPasswordStep(1);
          setPasswordForm(prev => ({
            ...prev,
            otp: '',
            new_password: ''
          }));
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setPasswordError('');
    setPasswordSuccess('');
    setLoading(true);
    try {
      console.log('Requesting new OTP for email:', passwordForm.email);
      await authService.resendOtp(passwordForm.email);
      setPasswordSuccess('New reset code has been sent to your email.');
    } catch (err) {
      console.error('Resend OTP error:', err);
      setPasswordError(err.message || 'Failed to resend reset code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  if (loading && !profile.id) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile"
                      className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-md">
                      <UserCircleIcon className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                  {isEditing && (
                    <label
                      htmlFor="profile-image"
                      className="absolute bottom-0 right-0 bg-primary-500 text-white p-1.5 rounded-full cursor-pointer shadow-md hover:bg-primary-600 transition-colors"
                      title="Change profile picture"
                    >
                      <PhotoIcon className="h-4 w-4" />
                      <input
                        id="profile-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-sm text-gray-500">{profile.email}</p>
              </div>

              <nav className="space-y-1">
                <button
                  onClick={() => setActiveSection('personal')}
                  className={`flex items-center w-full px-4 py-2 text-left rounded-lg ${
                    activeSection === 'personal'
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <UserCircleIcon className="h-5 w-5 mr-3" />
                  Personal Information
                </button>
                <button
                  onClick={() => setActiveSection('security')}
                  className={`flex items-center w-full px-4 py-2 text-left rounded-lg ${
                    activeSection === 'security'
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <LockClosedIcon className="h-5 w-5 mr-3" />
                  Change Password
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-left rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                  Log Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              {activeSection === 'personal' && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Personal Information</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                      >
                        <PencilSquareIcon className="h-4 w-4 mr-2" />
                        Edit Profile
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsEditing(false)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                      >
                        <XCircleIcon className="h-4 w-4 mr-2" />
                        Cancel
                      </button>
                    )}
                  </div>

            {error && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <XCircleIcon className="h-5 w-5 text-red-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-red-700">{error}</p>
                        </div>
                      </div>
              </div>
            )}

            {success && (
                    <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <CheckCircleIcon className="h-5 w-5 text-green-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-green-700">{success}</p>
                        </div>
                      </div>
              </div>
            )}

                  {!isEditing ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-gray-500">First Name</h3>
                          <p className="mt-1 text-gray-900">{profile.firstName || 'Not provided'}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-gray-500">Last Name</h3>
                          <p className="mt-1 text-gray-900">{profile.lastName || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500">Email</h3>
                        <p className="mt-1 text-gray-900">{profile.email || 'Not provided'}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                          <p className="mt-1 text-gray-900">{profile.phone || 'Not provided'}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-gray-500">Date of Birth</h3>
                          <p className="mt-1 text-gray-900">{profile.dateOfBirth || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-gray-500">Location</h3>
                          <p className="mt-1 text-gray-900">{profile.location || 'Not provided'}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-gray-500">Postal Code</h3>
                          <p className="mt-1 text-gray-900">{profile.postalCode || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                          <p className="mt-1 text-gray-900">
                            {profile.gender === 'M' ? 'Male' : 
                             profile.gender === 'F' ? 'Female' : 
                             profile.gender === 'O' ? 'Other' : 'Not provided'}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-gray-500">Nationality</h3>
                          <p className="mt-1 text-gray-900">{profile.nationality || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-gray-500">Province</h3>
                          <p className="mt-1 text-gray-900">{profile.province || 'Not provided'}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                          <p className="mt-1 text-gray-900">{profile.bio || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500">Address</h3>
                        <p className="mt-1 text-gray-900">{profile.address || 'Not provided'}</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Profile Image Upload */}
                      <div className="mb-6">
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Profile Picture</label>
                        <div className="flex items-center">
                          <div className="relative">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile"
                                className="h-20 w-20 rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                              <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-200">
                                <UserCircleIcon className="h-12 w-12 text-gray-400" />
                              </div>
                            )}
                            <label
                              htmlFor="profile-image-edit"
                              className="absolute bottom-0 right-0 bg-primary-500 text-white p-1.5 rounded-full cursor-pointer shadow-md hover:bg-primary-600 transition-colors"
                              title="Change profile picture"
                            >
                              <PhotoIcon className="h-4 w-4" />
                      <input
                                id="profile-image-edit"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm text-gray-500">Upload a new profile picture</p>
                            <p className="text-xs text-gray-400">JPG, PNG or GIF (max. 2MB)</p>
                          </div>
                        </div>
                </div>

                      {/* Gender Selection */}
                      <div className="mb-6">
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Gender</label>
                        <div className="flex gap-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="gender"
                              value="M"
                              checked={profile.gender === 'M'}
                              onChange={handleChange}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="ml-2 text-gray-700">Male</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="gender"
                              value="F"
                              checked={profile.gender === 'F'}
                              onChange={handleChange}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="ml-2 text-gray-700">Female</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="gender"
                              value="O"
                              checked={profile.gender === 'O'}
                              onChange={handleChange}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="ml-2 text-gray-700">Other</span>
                          </label>
                </div>
              </div>

              {/* Bio */}
                      <div className="mb-6">
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Bio</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                          rows="4"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Tell us about yourself..."
                        ></textarea>
                      </div>

                      {/* Name Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            value={profile.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            value={profile.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
              </div>

                      {/* Contact Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={profile.email}
                            disabled
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-500"
                          />
                          <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={profile.phone}
                    onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                </div>

                      {/* Location Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Nationality</label>
                  <select
                    name="nationality"
                    value={profile.nationality}
                    onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  >
                            <option value="">Select Nationality</option>
                    {nationalities.map((nationality) => (
                      <option key={nationality} value={nationality}>
                        {nationality}
                      </option>
                    ))}
                  </select>
                </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Province</label>
                  <select
                    name="province"
                    value={profile.province}
                    onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  >
                            <option value="">Select Province</option>
                    {provinces.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Address</label>
                          <input
                            type="text"
                            name="address"
                            value={profile.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Postal Code</label>
                          <input
                            type="text"
                            name="postalCode"
                            value={profile.postalCode}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}

              {activeSection === 'security' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Change Password</h2>
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-primary-600 hover:text-primary-500"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  
                  {passwordError && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <XCircleIcon className="h-5 w-5 text-red-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-red-700">{passwordError}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {passwordSuccess && (
                    <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <CheckCircleIcon className="h-5 w-5 text-green-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-green-700">{passwordSuccess}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Password Reset Process</h3>
                    
                    {passwordStep === 1 && (
                      <div className="space-y-4">
                        <p className="text-gray-600">
                          To change your password, we'll send a one-time code to your email address.
                          Enter your email below to begin the process.
                        </p>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          <input
                            type="email"
                            value={passwordForm.email}
                            onChange={handlePasswordChange}
                            name="email"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Enter your email"
                          />
                        </div>
                        <button
                          onClick={handlePasswordSubmit}
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          Send Verification Code
                        </button>
                      </div>
                    )}

                    {passwordStep === 2 && (
                      <div className="space-y-4">
                        <p className="text-gray-600">
                          We've sent a verification code to your email. Please enter it below to continue.
                        </p>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                          <input
                            type="text"
                            value={passwordForm.otp}
                            onChange={handlePasswordChange}
                            name="otp"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Enter verification code"
                          />
                        </div>
                        <div className="flex justify-between">
                          <button
                            onClick={() => setPasswordStep(1)}
                            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            Back
                          </button>
                          <button
                            onClick={handlePasswordSubmit}
                            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            Verify Code
                          </button>
                        </div>
                        <div className="text-center">
                          <button
                            onClick={handleResendOtp}
                            className="text-sm text-primary-600 hover:text-primary-500"
                          >
                            Didn't receive a code? Resend
                          </button>
                        </div>
                      </div>
                    )}

                    {passwordStep === 3 && (
                      <div className="space-y-4">
                        <p className="text-gray-600">
                          Please enter your new password below.
                        </p>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? "text" : "password"}
                              value={passwordForm.new_password}
                              onChange={handlePasswordChange}
                              name="new_password"
                              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 pr-10"
                              placeholder="Enter new password"
                            />
                            <button
                              type="button"
                              onClick={toggleNewPasswordVisibility}
                              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-500"
                            >
                              {showNewPassword ? (
                                <EyeSlashIcon className="h-5 w-5" />
                              ) : (
                                <EyeIcon className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            Password must be at least 8 characters long and include a number and a special character.
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <button
                            onClick={() => setPasswordStep(2)}
                            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            Back
                          </button>
                          <button
                            onClick={handlePasswordSubmit}
                            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            Change Password
                  </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 