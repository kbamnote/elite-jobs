import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const NumberTicker = ({ endValue }) => {
  const [count, setCount] = useState(0);
  const duration = 2000; // Animation duration in milliseconds

  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(endValue / (duration / 16)); // Approximate per-frame increment
    const startTime = Date.now();

    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed < duration) {
        start = Math.min(start + increment, endValue);
        setCount(start);
        requestAnimationFrame(updateCount);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(updateCount);
  }, [endValue]);

  return count.toLocaleString();
};

const Hero = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const queryParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState(queryParams.get('title') || '');
  const [_searchLocation, _setLocation] = useState(queryParams.get('location') || '');
  const [_category, _setCategory] = useState(queryParams.get('category') || '');
  const [_categories, _setCategories] = useState([]);
  const [animationStarted, setAnimationStarted] = useState(false);

  // useEffect(() => {
  //   fetch('https://jobquick.onrender.com/categories')
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.success) {
  //         setCategories(data.data.map(cat => cat.title));
  //       }
  //     })
  //     .catch(error => console.error('Error fetching categories:', error));
  // }, []);

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
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

            {/* <select
              className="w-full sm:w-48 py-2 px-3 rounded-md border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              value={searchLocation}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Select Location</option>
              <option value="ny">New York</option>
              <option value="sf">San Francisco</option>
              <option value="ld">London</option>
            </select> */}
{/* 
            <select
              className="w-full sm:w-48 py-2 px-3 rounded-md border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select> */}

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

        {/* Animated Statistics Section */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center transform transition-all duration-300 hover:-translate-y-2 cursor-pointer rounded-2xl p-8 border card"
              style={{ 
                boxShadow: 'var(--shadow-lg)',
                borderColor: 'var(--color-border)',
                transition: 'var(--transition-normal)'
              }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ backgroundColor: 'var(--color-primary)', boxShadow: 'var(--shadow-sm)' }}>
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                {animationStarted && <NumberTicker endValue={stat.number} />}
              </h3>
              <p className="font-medium" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Hero;
