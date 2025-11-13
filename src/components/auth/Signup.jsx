import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup, updateProfile } from '../../utils/Api';
import Cookies from 'js-cookie';
import logo from '../../assets/Logo.png';


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'jobSeeker'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Onboarding wizard state (shown after signup for job seekers)
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [onboardSaving, setOnboardSaving] = useState(false);
  const [onboardError, setOnboardError] = useState('');
  const [onboardingData, setOnboardingData] = useState({
    phone: '',
    address: '',
    highestEducation: '',
    skills: '' // comma separated string
  });

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
      const response = await signup(formData);
      console.log("success", response.data);
      const { token, user } = response.data.data;
      const { role } = user;
      
      // Store token and role in cookies
      Cookies.set('token', token);
      Cookies.set('role', role);
      
      // Navigate / Onboard based on role
      if (role === 'jobSeeker') {
        // Navigate to onboarding page for job seekers
        navigate('/onboarding');
      } else if (role === 'jobHoster') {
        // Navigate to job hosting onboarding page
        navigate('/hosting/onboarding');
      } else if (role === 'recruiter') {
        // Navigate to recruiter onboarding page
        navigate('/recruiter/onboarding');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOnboardChange = (e) => {
    const { name, value } = e.target;
    setOnboardingData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setOnboardingStep(s => Math.min(3, s + 1));
  const prevStep = () => setOnboardingStep(s => Math.max(1, s - 1));

  const submitOnboarding = async () => {
    setOnboardError('');
    // simple validation
    const { phone, address, highestEducation, skills } = onboardingData;
    if (!phone || !address || !highestEducation || !skills) {
      setOnboardError('Please complete all required fields.');
      return;
    }

    setOnboardSaving(true);
    try {
      const skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean);
      const updateData = {
        profile: {
          phone,
          address,
          highestEducation,
          skills: skillsArray
        }
      };
      await updateProfile(updateData);
      setShowOnboarding(false);
      navigate('/profile');
    } catch (err) {
      setOnboardError(err.response?.data?.message || 'Failed to save details');
    } finally {
      setOnboardSaving(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--color-accent-light)' }}
    >
      <div className="max-w-md w-full space-y-8">
        {/* Logo added here */}
        <div className="absolute top-4 left-4">
          <a href="/">
            <img src={logo} alt="Company Logo" className="h-12 w-auto" />
          </a>
        </div>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join us today! Please fill in your details.
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none transition-colors"
                style={{
                  fontFamily: 'var(--font-body)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--color-accent)';
                  e.target.style.boxShadow = `0 0 0 2px var(--color-accent)`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
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
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none transition-colors"
                style={{
                  fontFamily: 'var(--font-body)'
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
                autoComplete="new-password"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none transition-colors"
                style={{
                  fontFamily: 'var(--font-body)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--color-accent)';
                  e.target.style.boxShadow = `0 0 0 2px var(--color-accent)`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Create a password"
                value={formData.password}
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
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 text-gray-900 focus:outline-none transition-colors"
                style={{
                  fontFamily: 'var(--font-body)'
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
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg btn-accent disabled:opacity-50 transition-colors shadow-md"
              style={{
                fontFamily: 'var(--font-body)'
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = `0 0 0 2px var(--color-accent)`;
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
              }}
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
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
        {showOnboarding && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Complete Your Profile</h3>

              {onboardError && (
                <div className="mb-4 rounded-lg bg-red-50 p-3 border border-red-200 text-red-700 text-sm">
                  {onboardError}
                </div>
              )}

              {onboardingStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Phone</label>
                    <input
                      name="phone"
                      type="tel"
                      value={onboardingData.phone}
                      onChange={handleOnboardChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Address</label>
                    <input
                      name="address"
                      type="text"
                      value={onboardingData.address}
                      onChange={handleOnboardChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                </div>
              )}

              {onboardingStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Highest Education</label>
                    <input
                      name="highestEducation"
                      type="text"
                      value={onboardingData.highestEducation}
                      onChange={handleOnboardChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="e.g., B.Tech, MSc, High School"
                    />
                  </div>
                </div>
              )}

              {onboardingStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Skills</label>
                    <input
                      name="skills"
                      type="text"
                      value={onboardingData.skills}
                      onChange={handleOnboardChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="e.g., React, Node.js, SQL"
                    />
                    <p className="text-xs text-gray-500 mt-1">Comma-separated</p>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
                  disabled={onboardingStep === 1 || onboardSaving}
                >
                  Back
                </button>
                {onboardingStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 py-2 btn-accent rounded-lg"
                    disabled={onboardSaving}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submitOnboarding}
                    className="px-4 py-2 btn-accent rounded-lg"
                    disabled={onboardSaving}
                  >
                    {onboardSaving ? 'Saving...' : 'Finish'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;