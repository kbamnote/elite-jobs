import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { googleLogin } from '../../utils/Api';
import Cookies from 'js-cookie';

const GoogleCallbackHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');

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
          const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://elitejobsbackend-production.up.railway.app'}/auth/profile`, {
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
        // Redirect to login after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 3000);
        return;
      }
      
      // Check for Google user data in URL parameters (for new users)
      const googleId = params.get('googleId');
      const email = params.get('email');
      const name = params.get('name');
      
      if (googleId && email && name) {
        // Try to login first with each role (in case the user already exists but is logging in from a different device)
        const roles = ['jobSeeker', 'jobHoster', 'recruiter'];
        for (const role of roles) {
          try {
            const loginResponse = await googleLogin({ googleId, role });
            const { token, user } = loginResponse.data.data;
            const { role: userRole } = user;
            
            // Store token and role in cookies
            Cookies.set('token', token);
            Cookies.set('role', userRole);
            
            // Navigate based on role
            if (userRole === 'jobSeeker') {
              navigate('/');
            } else if (userRole === 'jobHoster') {
              navigate('/hosting/dashboard');
            } else if (userRole === 'recruiter') {
              navigate('/recruiter/dashboard');
            }
            return; // Exit the loop if login is successful
          } catch (loginError) {
            // Continue to the next role if login fails
            continue;
          }
        }
        
        // If login fails for all roles, redirect to Google role selection page with user data
        navigate(`/google-role-selection?googleId=${googleId}&email=${email}&name=${name}`);
      } else {
        // If no relevant parameters, redirect to login
        navigate('/login');
      }
    };

    handleGoogleCallback();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-light)' }}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-700">Completing Google authentication...</p>
        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-4 border border-red-200">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleCallbackHandler;