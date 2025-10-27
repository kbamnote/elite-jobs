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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Find Your Dream Job Today!
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
          Connecting Talent with Opportunity: Your Gateway to Career Success
        </p>

        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 flex flex-col sm:flex-row gap-3 hover:shadow-xl transition-all duration-300">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-teal-600" />
              </div>
              <input
                type="text"
                placeholder="Job Title or Company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200 bg-gray-50 focus:bg-white"
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
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-6 sm:px-8 py-3 rounded-xl flex items-center justify-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg font-semibold hover:-translate-y-0.5"
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
              className="text-center transform transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl border border-gray-100"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl mb-6 shadow-sm">
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {animationStarted && <NumberTicker endValue={stat.number} />}
              </h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Hero;
