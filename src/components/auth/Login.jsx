import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../utils/Api';
import Cookies from 'js-cookie';
import logo from '../../assets/Logo.png'

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
  const handleGoogleLogin = (role) => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = `${import.meta.env.VITE_API_URL || 'https://elite-jobs-backend.onrender.com'}/auth/google?role=${role}`;
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
            Sign in to your account
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
            
            <div className="mt-4 grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleGoogleLogin('jobSeeker')}
                disabled={loading}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span>Job Seeker</span>
              </button>
              <button
                type="button"
                onClick={() => handleGoogleLogin('jobHoster')}
                disabled={loading}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span>Job Hoster</span>
              </button>
              <button
                type="button"
                onClick={() => handleGoogleLogin('recruiter')}
                disabled={loading}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span>Recruiter</span>
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