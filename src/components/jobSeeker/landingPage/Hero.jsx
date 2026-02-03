import React, { useState, useEffect } from 'react';
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
  const [animationStarted, setAnimationStarted] = useState(false);


  useEffect(() => {
    setAnimationStarted(true);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append('title', searchQuery.trim());

    navigate(`/jobs?${params.toString()}`);
  };

  const stats = [
    { icon: "💼", number: 25850, label: "Jobs" },
    { icon: "👥", number: 10250, label: "Candidates" },
    { icon: "🏢", number: 18400, label: "Companies" },
  ];

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
            className="w-full h-auto "
            
          >
          </video>
        </div>
      
      </div>
    </div>
  );
};

export default Hero;
