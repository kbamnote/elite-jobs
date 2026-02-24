import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPassword } from '../utils/Api';
import logo from '../../assets/ejLogo.png';

const AddNewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get email, role, and OTP from location state or default to empty values
  const { email: initialEmail = '', role: initialRole = 'jobSeeker', otp: initialOtp = '' } = location.state || {};
  
  const [formData, setFormData] = useState({
    email: initialEmail,
    role: initialRole,
    otp: initialOtp,
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    // Check if passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    // Check password strength
    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }
    
    try {
      await resetPassword({
        email: formData.email,
        role: formData.role,
        otp: formData.otp,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword
      });
      setSuccess(true);
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--color-accent-light)' }}>
      <div className="max-w-md w-full space-y-8">
        {/* Logo added here */}
        <div className="absolute top-4 left-4">
          <a href="/">
            <img src={logo} alt="Company Logo" className="h-14 md:h-28 w-auto" />
          </a>
        </div>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Set New Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create a new password for your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-lg bg-red-50 p-4 border border-red-200">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          {success && (
            <div className="rounded-lg bg-green-50 p-4 border border-green-200">
              <div className="text-sm text-green-700">Password reset successfully! Redirecting to login...</div>
            </div>
          )}
          <div className="space-y-4">
            {/* Hidden fields - just for display */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Email</div>
              <div className="font-medium">{formData.email}</div>
            </div>
            
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 transition-colors pr-10"
                  style={{ 
                    '--tw-ring-color': 'var(--color-accent)',
                    borderColor: 'var(--color-accent)' 
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-accent)';
                    e.target.style.boxShadow = `0 0 0 2px var(--color-accent)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 transition-colors pr-10"
                  style={{ 
                    '--tw-ring-color': 'var(--color-accent)',
                    borderColor: 'var(--color-accent)' 
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-accent)';
                    e.target.style.boxShadow = `0 0 0 2px var(--color-accent)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn-accent group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg disabled:opacity-50 transition-colors shadow-md"
              style={{ 
                '--tw-ring-color': 'var(--color-accent)' 
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = `0 0 0 2px var(--color-accent)`;
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none';
              }}
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <a 
                href="/login" 
                className="font-medium transition-colors"
                style={{ 
                  color: 'var(--color-accent)',
                  fontFamily: 'var(--font-body)' 
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--color-accent-dark)';
                  e.target.style.fontFamily = 'var(--font-heading)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'var(--color-accent)';
                  e.target.style.fontFamily = 'var(--font-body)';
                }}
              >
                Sign in here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewPassword;