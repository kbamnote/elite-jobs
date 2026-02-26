import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import video from '../../../assets/vid3.mp4'

const Hero = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const queryParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState(queryParams.get('title') || '');
  const [_searchLocation, _setLocation] = useState(queryParams.get('location') || '');
  const [_category, _setCategory] = useState(queryParams.get('category') || '');
  const [_categories, _setCategories] = useState([]);




  const handleSearch = (e) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append('title', searchQuery.trim());

    navigate(`/jobs?${params.toString()}`);
  };



  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
          Find Your Dream Job Today!
        </h1>
        <p className="text-lg sm:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          Connecting Talent with Opportunity: Your Gateway to Career Success
        </p>

        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <div className="rounded-2xl p-4 flex flex-col sm:flex-row gap-3 transition-all duration-300 card" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
              </div>
              <input
                type="text"
                placeholder="Job Title or Company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200"
                style={{ 
                  backgroundColor: 'var(--color-background)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-body)',
                  borderRadius: 'var(--border-radius-lg)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--color-primary)';
                  e.target.style.boxShadow = '0 0 0 2px rgba(15, 52, 96, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--color-border)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-xl flex items-center justify-center space-x-2 transition-all duration-200 font-semibold hover:-translate-y-0.5 btn-accent"
              style={{ boxShadow: 'var(--shadow-md)' }}
            >
              <Search className="w-5 h-5" />
              <span>Search Jobs</span>
            </button>
          </div>
        </form>
        
        <div className="mt-8 max-w-4xl mx-auto">
          <video 
            src={video} 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-auto rounded-2xl shadow-2xl"
            
          >
          </video>
        </div>
        
        {/* New Feature Highlights Section */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>Smart Matching</h3>
              <p className="text-gray-600">AI-powered job recommendations tailored to your skills and preferences</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>Verified Employers</h3>
              <p className="text-gray-600">Connect with trusted companies and verified job opportunities</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>Fast Application</h3>
              <p className="text-gray-600">Apply to multiple jobs with one click using your profile</p>
            </div>
          </div>
        </div>
        

      
      </div>
    </div>
  );
};

export default Hero;
