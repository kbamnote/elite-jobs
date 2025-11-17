import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOTP, resendOTP } from '../../utils/Api';
import Cookies from 'js-cookie';
import logo from '../../assets/Logo.png';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get email and role from location state or default to empty values
  const { email: initialEmail = '', role: initialRole = 'jobSeeker' } = location.state || {};
  
  const [formData, setFormData] = useState({
    email: initialEmail,
    role: initialRole,
    otp: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
      await verifyOTP(formData);
      setSuccess(true);
      // Redirect to add new password page
      setTimeout(() => {
        navigate('/add-new-password', { state: { email: formData.email, role: formData.role, otp: formData.otp } });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setResendSuccess(false);
    setError('');
    
    try {
      await resendOTP({ email: formData.email, role: formData.role });
      setResendSuccess(true);
      setTimeLeft(300); // Reset timer to 5 minutes
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
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
            Verify OTP
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the 6-digit code sent to your email
          </p>
          <p className="mt-1 text-center text-xs text-gray-500">
            OTP is valid for {formatTime(timeLeft)}
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
              <div className="text-sm text-green-700">OTP verified successfully! Redirecting...</div>
            </div>
          )}
          {resendSuccess && (
            <div className="rounded-lg bg-green-50 p-4 border border-green-200">
              <div className="text-sm text-green-700">OTP resent successfully! Please check your email.</div>
            </div>
          )}
          <div className="space-y-4">
            {/* Hidden fields - just for display */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Email</div>
              <div className="font-medium">{formData.email}</div>
            </div>
            
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                6-digit OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                maxLength="6"
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
                placeholder="Enter 6-digit code"
                value={formData.otp}
                onChange={handleChange}
              />
              <p className="mt-1 text-xs text-gray-500">
                OTP has been sent to your email. Please check your inbox.
              </p>
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
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
          
          <div className="text-center">
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={resendLoading || timeLeft > 0}
              className={`text-sm font-medium transition-colors ${timeLeft > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{ 
                color: 'var(--color-accent)',
                fontFamily: 'var(--font-body)' 
              }}
              onMouseEnter={(e) => {
                if (timeLeft <= 0) {
                  e.target.style.color = 'var(--color-accent-dark)';
                  e.target.style.fontFamily = 'var(--font-heading)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'var(--color-accent)';
                e.target.style.fontFamily = 'var(--font-body)';
              }}
            >
              {resendLoading ? 'Resending...' : timeLeft > 0 ? `Resend OTP in ${formatTime(timeLeft)}` : 'Resend OTP'}
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

export default VerifyOTP;