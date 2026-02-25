/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../../utils/Api';
import Cookies from 'js-cookie';
import logo from '../../../assets/ejLogo.png';
import professionalLogin from '../../../assets/Professional-login.jpg';
import '../../auth/style/global.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false); // 👁️ Eye toggle state
  const [flicker, setFlicker] = useState(false);

  const getDefaultRole = () => {
    const params = new URLSearchParams(location.search);
    const role = params.get('role');
    return ['jobSeeker', 'jobHoster', 'recruiter'].includes(role) ? role : 'jobSeeker';
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: getDefaultRole()
  });
  const [error, setError] = useState('');
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

    try {
      const response = await login(formData);
      const { token, user } = response.data.data;
      const { role } = user;

      // Store token and role in cookies
      Cookies.set('token', token);
      Cookies.set('role', role);

      // Navigate based on role
      if (role === 'jobSeeker') {
        navigate('/');
      } else if (role === 'jobHoster') {
        navigate('/hosting/dashboard');
      } else if (role === 'recruiter') {
        navigate('/recruiter/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login redirect
  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth endpoint without specifying a role
    // The role will be selected on the GoogleRoleSelection page for new users
    // For existing users, they will be logged in directly
    window.location.href = `${import.meta.env.VITE_API_URL || 'https://api.eliteindiajobs.com'}/auth/google`;
  };

  // Handle Google authentication callback
  useEffect(() => {
    const handleGoogleCallback = async () => {
      // Check for token in URL parameters (for existing users)
      const params = new URLSearchParams(location.search);
      const urlToken = params.get('token');

      if (urlToken) {
        try {
          // Store token in cookies
          Cookies.set('token', urlToken);

          // Get user info from token by calling the profile endpoint
          const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://elite-jobs-backend.onrender.com'}/auth/profile`, {
            headers: {
              'Authorization': `Bearer ${urlToken}`
            }
          });

          if (response.ok) {
            const userData = await response.json();
            const { role } = userData.data;

            // Store role in cookies
            Cookies.set('role', role);

            // Navigate based on role
            if (role === 'jobSeeker') {
              navigate('/');
            } else if (role === 'jobHoster') {
              navigate('/hosting/dashboard');
            } else if (role === 'recruiter') {
              navigate('/recruiter/dashboard');
            }
          } else {
            throw new Error('Failed to fetch user profile');
          }
        } catch (err) {
          setError('Google authentication failed. Please try again.');
          // Clear any existing token
          Cookies.remove('token');
          Cookies.remove('role');
        }
        return;
      }

      // Check for Google auth error in URL parameters
      const error = params.get('error');
      if (error) {
        setError('Google authentication failed. Please try again.');
        return;
      }

      // Check for Google user data in URL parameters (for new users)
      const googleId = params.get('googleId');
      const email = params.get('email');
      const name = params.get('name');

      if (googleId && email && name) {
        // Redirect to Google role selection page with user data
        navigate(`/google-role-selection?googleId=${googleId}&email=${email}&name=${name}`);
      }
    };

    handleGoogleCallback();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* LEFT IMAGE SECTION */}
      <div className="w-full hidden lg:flex justify-center relative">
        {/* Dark overlay */}
        <div className="w-full hidden lg:flex absolute z-0 inset-0 bg-gradient-to-r from-slate-900 via-indigo-900 to-indigo-800/0"></div>

        {/* Content */}
        <div className="relative h-full p-10 content-center justify-between text-white">
          {/* Logo */}
          <div className="">
            <a href="/" className='flex justify-center align-center'>
              <img src={logo} alt="Elite Jobs Logo" className="h-42 md:h-80 w-auto bg-white shadow-lg rounded-xl" />
            </a>
          </div>
          {/* Tagline */}
          <div className='pt-6'>
            <h2 className="text-3xl font-bold" style={{ color: 'white' }}>
              Capturing Opportunities,
              <br />
              Creating Careers
            </h2>

            <div className="flex gap-2 mt-4">
              <span className="w-8 h-2 bg-white rounded-full" />
              <span className="w-4 h-2 bg-white/50 rounded-full" />
              <span className="w-4 h-2 bg-white/50 rounded-full" />
            </div>
          </div>
          {/* Login Link - MATCHES SIGNUP */}
          <div className="text-center mt-2 pt-2">
            <div className="mt-4 grid items-center font-semibold justify-center gap-3 text-md text-grey-900">
              <p className="">
                Don’t have an account?
              </p>

              <a
                href="/signup"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
               bg-indigo-600 text-white font-semibold
               hover:bg-indigo-700 hover:shadow-lg hover:scale-105
               transition-all duration-300"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Create an account
                <span className="text-lg">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Elite Split Layout - FIXED */}
        <div className="flex items-center justify-center min-h-[80vh] w-xl max-w-xl mx-auto">
          {/* Professional Form Card - MATCHES SIGNUP */}
          <div className="bg-white/80 animate-[infinite-pop_1.5s_ease-in-out_infinite] w-full backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-slate-700 bg-clip-text text-transparent mb-4">
                Welcome Back
              </h2>
              <p className="text-lg text-gray-600 font-medium">Sign in to continue</p>
            </div>
            <div className="animate-[pop-up-down_0.8s_ease-out] animate-[gentle-float_2.5s_ease-in-out_infinite]">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4 animate-bounce">
                    <span className="text-sm text-red-800 font-medium">{error}</span>
                  </div>
                )}

                <div className="space-y-4"> {/* Changed to space-y-4 to match signup */}
                  {/* Email - MATCHES SIGNUP STYLE */}
                  <div className="relative group">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full px-4 py-2 bg-white/50 border-b-2 border-gray-200 rounded-sm text-md placeholder-gray-500 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition-all duration-300 group-hover:border-indigo-400"
                      style={{ fontFamily: 'var(--font-body)' }}
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Password WITH EYE TOGGLE - MATCHES SIGNUP */}
                  <div className="relative group">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        className="w-full px-4 py-2 pr-12 bg-white/50 border-b-2 border-gray-200 rounded-sm text-md placeholder-gray-500 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition-all duration-300 group-hover:border-indigo-400"
                        style={{ fontFamily: 'var(--font-body)' }}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      {/* 👁️ Eye Toggle Button - PERFECT MATCH */}
                      <button
                        type="button"
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-indigo-600 transition-colors duration-200 hover:bg-gray-100 rounded-full"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {/* Forgot Password */}
                    <a
                      href="/forgot-password"
                      className="block mt-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200 text-right"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Forgot Password?
                    </a>
                  </div>

                  {/* Role Select - MATCHES SIGNUP */}
                  <div className="relative group">
                    <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      required
                      className="w-full px-4 py-2 bg-white/50 border-b-2 border-gray-200 rounded-sm text-md focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition-all duration-300 group-hover:border-indigo-400 appearance-none pr-10 bg-no-repeat bg-right"
                      style={{
                        fontFamily: 'var(--font-body)',
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\")",
                        backgroundPosition: 'right 1rem center',
                        backgroundSize: '1.5em 1.5em',
                        backgroundRepeat: 'no-repeat'
                      }}
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="jobSeeker">💼 Job Seeker</option>
                      <option value="jobHoster">🏢 Job Hoster</option>
                      <option value="recruiter">👔 Recruiter</option>
                    </select>
                  </div>
                </div>

                {/* Elite Submit Button - MATCHES SIGNUP */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center items-center py-4 px-6 font-bold text-lg rounded-2xl btn-accent shadow-xl hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-200/50 transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    'Sign In Now'
                  )}
                </button>
              </form>
            </div>

            {/* Google Auth - MATCHES SIGNUP */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 rounded-3xl bg-white text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex justify-center items-center py-3.5 px-6 border-2 border-gray-200 rounded-2xl shadow-lg bg-white hover:bg-gray-50 hover:border-indigo-400 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-100/50 transition-all duration-300 font-semibold text-gray-800"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>

            {/* Login Link - MATCHES SIGNUP */}
            <div className="lg:hidden flex flex-wrap mt-6 justify-center gap-2 items-center text-md text-blue-800">
              <p className="">
                Don’t have an account?
              </p>

              <a
                href="/signup"
                className="inline-flex items-center gap-2 hover:scale-105 transition-all duration-300 font-semibold"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Create an account
                <span className="">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;