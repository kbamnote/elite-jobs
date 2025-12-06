import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../utils/Api';
import logo from '../../assets/ejLogo.png';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    role: 'jobSeeker'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
    
    try {
      await forgotPassword(formData);
      setSuccess(true);
      // Redirect to OTP verification page after 2 seconds
      setTimeout(() => {
        navigate('/verify-otp', { state: { email: formData.email, role: formData.role } });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset link');
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
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email and role to receive a password reset link
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
              <div className="text-sm text-green-700">
                Reset link sent successfully! Redirecting to OTP verification...
                <p className="mt-1 text-xs">OTP is valid for 5 minutes</p>
              </div>
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 transition-colors"
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
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                I am a
              </label>
              <select
                id="role"
                name="role"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 transition-colors"
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
                value={formData.role}
                onChange={handleChange}
              >
                <option value="jobSeeker">Job Seeker</option>
                <option value="jobHoster">Job Hoster</option>
                <option value="recruiter">Recruiter</option>
              </select>
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
              {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
            </button>
          </div>
          
          <div className="text-center">
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

export default ForgotPassword;