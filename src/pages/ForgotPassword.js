import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  KeyIcon, 
  EnvelopeIcon, 
  LockClosedIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
import authService from '../services/authService';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    new_password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // For OTP, only allow numeric input
    if (name === 'otp' && !/^\d*$/.test(value)) {
      return;
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validatePassword = () => {
    if (formData.new_password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    return true;
  };

  const validateOtp = () => {
    // OTP should be numeric and have a reasonable length (e.g., 6 digits)
    const otpRegex = /^\d{6}$/;
    if (!otpRegex.test(formData.otp)) {
      setError('OTP should be 6 digits');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (step === 1) {
        if (!formData.email) {
          throw new Error('Email is required');
        }
        console.log('Requesting password reset for email:', formData.email);
        await authService.forgotPassword(formData.email);
        console.log('Password reset code sent successfully');
        setStep(2);
      } else if (step === 2) {
        // Validate all required fields
        if (!formData.email || !formData.otp || !formData.new_password) {
          console.error('Missing required fields:', {
            hasEmail: !!formData.email,
            hasOtp: !!formData.otp,
            hasPassword: !!formData.new_password
          });
          throw new Error('Email, OTP, and Password are all required');
        }
        
        // Validate OTP format
        if (!validateOtp()) {
          setLoading(false);
          return;
        }

        // Validate password
        if (!validatePassword()) {
          setLoading(false);
          return;
        }
        
        console.log('Attempting to reset password with:', {
          emailLength: formData.email.length,
          otpLength: formData.otp.length,
          passwordLength: formData.new_password.length
        });
        
        await authService.resetPassword(
          formData.email.trim(),
          formData.otp.trim(),
          formData.new_password
        );

        console.log('Password reset successful');
        setSuccess(true);
        setTimeout(() => {
          navigate('/signin');
        }, 3000);
      }
    } catch (err) {
      console.error('Password reset error in component:', err);
      // Handle specific error cases
      if (err.message.includes('Invalid email or OTP')) {
        setError('The reset code is invalid or has expired. Please request a new one.');
      } else if (err.message.includes('Password')) {
        setError(err.message);
      } else {
        setError(err.message || 'An error occurred. Please try again.');
      }
      
      // If we get an error about invalid OTP in step 2, allow the user to go back to step 1
      if (step === 2 && (err.message.includes('OTP') || err.message.includes('code'))) {
        const shouldRestart = window.confirm('Would you like to request a new reset code?');
        if (shouldRestart) {
          setStep(1);
          setFormData(prev => ({
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
    setError('');
    setLoading(true);
    try {
      console.log('Requesting new OTP for email:', formData.email);
      await authService.resendOtp(formData.email);
      setError('New reset code has been sent to your email.');
    } catch (err) {
      console.error('Resend OTP error:', err);
      setError(err.message || 'Failed to resend reset code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <KeyIcon className="h-12 w-12 text-primary-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {step === 1 ? 'Reset Password' : 'Enter New Password'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {step === 1 
            ? 'Enter your email to receive a reset code' 
            : 'Enter the code sent to your email and your new password'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {success ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Password Reset Successful</h3>
              <p className="mt-1 text-sm text-gray-500">
                Your password has been reset successfully. Redirecting to sign in...
              </p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {step === 1 ? (
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                      Enter OTP
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <KeyIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="otp"
                        name="otp"
                        type="text"
                        required
                        value={formData.otp}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        placeholder="Enter OTP"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockClosedIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="new_password"
                        name="new_password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.new_password}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        placeholder="Enter new password"
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                        ) : (
                          <EyeIcon className="h-5 w-5" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-sm text-primary-500 hover:text-primary-600"
                    >
                      Resend OTP
                    </button>
                  </div>
                </>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : step === 1 ? 'Send Reset Code' : 'Reset Password'}
                </button>
              </div>

              <div className="text-center">
                <Link
                  to="/signin"
                  className="text-sm text-primary-500 hover:text-primary-600"
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-1" />
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 