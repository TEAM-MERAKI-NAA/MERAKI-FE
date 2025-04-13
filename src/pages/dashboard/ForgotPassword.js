import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (step === 1) {
        if (!formData.email) {
          throw new Error('Email is required');
        }
        await authService.forgotPassword(formData.email);
        setStep(2);
      } else if (step === 2) {
        // Validate all required fields
        if (!formData.email || !formData.otp || !formData.new_password) {
          throw new Error('Email, OTP, and Password are all required');
        }
        if (!validatePassword()) {
          setLoading(false);
          return;
        }
        
        console.log('Submitting password reset:', {
          email: formData.email,
          otp: formData.otp,
          new_password: formData.new_password
        });
        
        await authService.resetPassword(formData.email, formData.otp, formData.new_password);
        setSuccess(true);
        setTimeout(() => {
          navigate('/signin');
        }, 3000);
      }
    } catch (err) {
      console.error('Password reset error:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = () => {
    // Implement password validation logic here
    return true; // Placeholder return, actual implementation needed
  };

  return (
    <div>
      {/* Render your form components here */}
    </div>
  );
};

export default ForgotPassword; 