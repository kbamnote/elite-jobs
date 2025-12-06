import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../utils/Api';
import Cookies from 'js-cookie';
import logo from '../../assets/ejLogo.png'

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
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
    window.location.href = `${import.meta.env.VITE_API_URL || 'https://elitejobsbackend-production.up.railway.app'}/auth/google`;
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
            Log in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back! Please enter your details.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-lg bg-red-50 p-4 border border-red-200">
              <div className="text-sm text-red-700">{error}</div>
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              {/* Forgot Password link moved here */}
              <div className="text-right mt-1">
                <a 
                  href="/forgot-password" 
                  className="text-sm font-medium transition-colors"
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
                  Forgot Password?
                </a>
              </div>
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
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
          
          {/* Google Login Buttons */}
          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="mt-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a 
                href="/signup" 
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
                Sign up here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;