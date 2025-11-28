import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { googleSignup, googleLogin } from '../../utils/Api';
import Cookies from 'js-cookie';
import logo from '../../assets/Logo.png';

const GoogleRoleSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    googleId: '',
    email: '',
    name: '',
    role: 'jobSeeker'
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Extract Google user data from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const googleId = params.get('googleId');
    const email = params.get('email');
    const name = params.get('name');
    
    if (googleId && email && name) {
      setFormData(prev => ({
        ...prev,
        googleId,
        email,
        name
      }));
    } else {
      // If missing required parameters, redirect to login
      navigate('/login');
    }
  }, [location, navigate]);
  
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
      // Prepare data for Google signup
      const signupData = {
        googleId: formData.googleId,
        email: formData.email,
        name: formData.name,
        role: formData.role,
        profile: {} // Add empty profile object
      };
      
      // Try to sign up first
      const response = await googleSignup(signupData);
      const { token, user } = response.data.data;
      const { role } = user;
      
      // Store token and role in cookies
      Cookies.set('token', token);
      Cookies.set('role', role);
      
      // Navigate based on role
      if (role === 'jobSeeker') {
        navigate('/onboarding');
      } else if (role === 'jobHoster') {
        navigate('/hosting/onboarding');
      } else if (role === 'recruiter') {
        navigate('/recruiter/onboarding');
      }
    } catch (err) {
      // If signup fails, it might be because the user already exists
      // Try to login instead
      if (err.response?.data?.message?.includes('already exists')) {
        try {
          // Prepare data for Google login
          const loginData = {
            googleId: formData.googleId,
            role: formData.role
          };
          
          const loginResponse = await googleLogin(loginData);
          const { token, user } = loginResponse.data.data;
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
        } catch (loginError) {
          setError(loginError.response?.data?.message || 'Google authentication failed');
        }
      } else {
        setError(err.response?.data?.message || 'Google signup failed');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--color-accent-light)' }}>
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="absolute top-4 left-4">
          <a href="/">
            <img src={logo} alt="Company Logo" className="h-14 md:h-28 w-auto" />
          </a>
        </div>
        
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Select Your Role
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome, {formData.name}! Please select your role to continue.
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
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
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
                value={formData.email}
                readOnly
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
              {loading ? 'Creating Account...' : 'Continue'}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Changed your mind?{' '}
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
                Go back to login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoogleRoleSelection;