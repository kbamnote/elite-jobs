import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../utils/Api';
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
    <>
      {/* Logo */}
      < div className="absolute top-4 left-4" >
        <a href="/">
          <img src={logo} alt="Company Logo" className="h-14 md:h-28 w-auto" />
        </a>
      </div >
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: 'var(--color-accent-light)' }}
      >
        <div className="max-w-md w-full space-y-8 relative animate-[fadeInUp_0.8s_ease-out] backdrop-blur-xl bg-gradient-to-br from-white/95 via-white/85 to-white/90 border border-white/60 shadow-2xl rounded-3xl p-8 overflow-hidden group">

          {/* Decorative gradient border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-300/10 via-red-500/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500 -m-1"></div>

          {/* Floating particles */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-ping opacity-40"></div>
          <div className="absolute bottom-6 left-6 w-3 h-3 bg-gradient-to-t from-pink-400 to-rose-400 rounded-full animate-pulse opacity-30 delay-1000"></div>

          {/* Header */}
          <div className="text-center space-y-4 relative z-10">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 backdrop-blur-sm border border-indigo-200/30 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
                Forgot Password
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 max-w-xs mx-auto backdrop-blur-sm">
              Enter your email and role to receive a secure password reset link
            </p>
          </div>

          {/* Form - YOUR ORIGINAL FIELDS ENHANCED */}
          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>

            {/* Enhanced Error/Success - SAME STRUCTURE */}
            {error && (
              <div className="group relative p-4 rounded-2xl bg-gradient-to-r from-red-50/95 to-rose-50/95 border border-red-200/70 backdrop-blur-sm shadow-lg animate-[shake_0.5s_ease-in-out]">
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-gradient-to-r from-red-400 to-rose-400 rounded-full animate-ping"></div>
                  <span className="text-sm font-medium text-red-800 leading-relaxed">{error}</span>
                </div>
              </div>
            )}

            {success && (
              <div className="group relative p-4 rounded-2xl bg-gradient-to-r from-emerald-50/95 to-teal-50/95 border border-emerald-200/70 backdrop-blur-sm shadow-lg">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 mt-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-800">Reset link sent successfully!</p>
                    <p className="text-xs text-emerald-700 mt-1">Redirecting to OTP verification... (valid for 5 minutes)</p>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Email Field - SAME FUNCTIONALITY */}
            <div className="group/input relative">
              <label htmlFor="email" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 opacity-80">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="peer w-full px-4 py-3.5 bg-white/70 backdrop-blur-sm border-2 border-gray-100/60 rounded-2xl text-sm focus:outline-none focus:border-accent-500 focus:ring-4 focus:ring-accent-500/30 transition-all duration-300 shadow-inner hover:shadow-md hover:border-gray-200/80"
                  style={{ '--tw-ring-color': 'var(--color-accent)' }}
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-accent)';
                    e.target.style.boxShadow = `0 0 0 3px rgba(0,0,0,0.1), 0 0 0 6px var(--color-accent, #3b82f6)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#f3f4f6';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {/* <label className="absolute left-4 top-3.5 text-xs text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-focus:-top-2 peer-focus:scale-75 peer-focus:text-accent-600 peer-focus:font-semibold bg-white/90 px-2 py-0.5 rounded-lg shadow-sm">
                  Enter your email
                </label> */}
              </div>
            </div>

            {/* Enhanced Role Field - SAME FUNCTIONALITY */}
            <div className="group/input relative">
              <label htmlFor="role" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 opacity-80">
                Account Type
              </label>
              <div className="relative">
                <select
                  id="role"
                  name="role"
                  required
                  className="peer w-full px-4 py-3.5 pr-12 bg-white/70 backdrop-blur-sm border-2 border-gray-100/60 rounded-2xl text-sm appearance-none focus:outline-none focus:border-accent-500 focus:ring-4 focus:ring-accent-500/30 transition-all duration-300 shadow-inner hover:shadow-md hover:border-gray-200/80 bg-no-repeat bg-right cursor-pointer"
                  style={{
                    '--tw-ring-color': 'var(--color-accent)',
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1.5em'
                  }}
                  value={formData.role}
                  onChange={handleChange}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-accent)';
                    e.target.style.boxShadow = `0 0 0 3px rgba(0,0,0,0.1), 0 0 0 6px var(--color-accent, #3b82f6)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#f3f4f6';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="jobSeeker">💼 Job Seeker</option>
                  <option value="jobHoster">🏢 Job Hoster</option>
                  <option value="recruiter">👔 Recruiter</option>
                </select>
                  {/* <label className="absolute left-4 top-3.5 text-xs text-gray-500 transition-all duration-300 peer-focus:-top-2 peer-focus:scale-75 peer-focus:text-accent-600 peer-focus:font-semibold bg-white/90 px-2 py-0.5 rounded-lg shadow-sm pointer-events-none">
                    Select your role
                  </label> */}
              </div>
            </div>

            {/* Premium Button - ENHANCED */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group/btn relative w-full flex justify-center items-center py-4 px-6 bg-gradient-to-r from-accent-600 to-accent-700 text-white font-bold text-sm uppercase tracking-wide rounded-2xl shadow-xl hover:shadow-2xl hover:from-red-900 hover:to-accent-800 focus:outline-none focus:ring-4 focus:ring-accent-500/50 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-md disabled:transform-none overflow-hidden"
                style={{ '--tw-ring-color': 'var(--color-accent)', backgroundColor: 'var(--color-accent-Darklight)' }}
                onFocus={(e) => {
                  e.target.style.boxShadow = `0 0 0 3px rgba(0,0,0,0.1), 0 0 0 6px var(--color-accent)`;
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = 'none';
                }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending Reset Link...
                  </>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Enhanced Link - SAME FUNCTIONALITY */}
            <div className="text-center pt-4">
              <p className="text-xs text-gray-500 gap-1 flex justify-center tracking-wide leading-relaxed">
                Remember your password?{' '}
                <a
                  href="/login"
                  className="font-semibold bg-gradient-to-r from-accent-600 to-accent-700 bg-clip-text hover:from-accent-700 hover:to-accent-800 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-1 group/link"
                  style={{ fontFamily: 'var(--font-body)' }}
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
                  <svg className="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

    </>
  );
};

export default ForgotPassword;