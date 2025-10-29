import React, { useState, useEffect } from 'react';
import Header from '../commonSeeker/Header';
import Footer from '../commonSeeker/Footer';
import { allJobs, appliedJobs } from '../../../utils/Api';
import { useNavigate, useLocation } from 'react-router-dom';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userApplications, setUserApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get URL parameters
  const urlParams = new URLSearchParams(location.search);
  const categoryFromUrl = urlParams.get('category') ? decodeURIComponent(urlParams.get('category')) : '';
  const titleFromUrl = urlParams.get('title') ? decodeURIComponent(urlParams.get('title')) : '';
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState(titleFromUrl);
  const [locationFilter, setLocationFilter] = useState('');
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState('');
  const [experienceLevelFilter, setExperienceLevelFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(categoryFromUrl);

  useEffect(() => {
    fetchJobs();
    fetchUserApplications();
  }, []);

  // Monitor URL changes and update filters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const categoryFromUrl = urlParams.get('category') ? decodeURIComponent(urlParams.get('category')) : '';
    const titleFromUrl = urlParams.get('title') ? decodeURIComponent(urlParams.get('title')) : '';
    setCategoryFilter(categoryFromUrl);
    setSearchTerm(titleFromUrl);
  }, [location.search]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await allJobs();
      setJobs(response.data.data.jobs);
      setFilteredJobs(response.data.data.jobs);
      setError('');
    } catch (err) {
      setError('Failed to fetch jobs');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserApplications = async () => {
    try {
      setApplicationsLoading(true);
      const response = await appliedJobs();
      setUserApplications(response.data.data);
      setApplicationsLoading(false);
    } catch (err) {
      console.error('Error fetching user applications:', err);
      setApplicationsLoading(false);
    }
  };

  // Apply filters whenever filter values change
  useEffect(() => {
    let result = jobs;
    
    // Search term filter
    if (searchTerm) {
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Location filter
    if (locationFilter) {
      result = result.filter(job => 
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
    
    // Employment type filter
    if (employmentTypeFilter) {
      result = result.filter(job => 
        job.employmentType.toLowerCase() === employmentTypeFilter.toLowerCase()
      );
    }
    
    // Experience level filter
    if (experienceLevelFilter) {
      result = result.filter(job => 
        job.experienceLevel.toLowerCase() === experienceLevelFilter.toLowerCase()
      );
    }
    
    // Category filter
    if (categoryFilter) {
      result = result.filter(job => 
        job.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    setFilteredJobs(result);
  }, [searchTerm, locationFilter, employmentTypeFilter, experienceLevelFilter, categoryFilter, jobs]);

  // Get unique filter options
  const getUniqueValues = (array, key) => {
    const uniqueValues = [...new Set(array.map(item => item[key]))];
    return uniqueValues.filter(val => val); // Remove null/undefined values
  };

  const handleViewJob = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  // Check if user has applied for a specific job
  const hasUserAppliedForJob = (jobId) => {
    if (applicationsLoading || !userApplications.length) {
      return false;
    }
    
    return userApplications.some(application => 
      application.jobId && application.jobId._id === jobId
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setEmploymentTypeFilter('');
    setExperienceLevelFilter('');
    setCategoryFilter('');
    // Clear URL parameters when resetting
    navigate('/jobs', { replace: true });
  };

  // Handle category filter change
  const handleCategoryChange = (categoryValue) => {
    setCategoryFilter(categoryValue);
    
    // Update URL with category parameter
    if (categoryValue) {
      navigate(`/jobs?category=${encodeURIComponent(categoryValue)}`, { replace: true });
    } else {
      navigate('/jobs', { replace: true });
    }
  };

  // Handle search term change
  const handleSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
    
    // Update URL with search parameter
    if (searchValue.trim()) {
      navigate(`/jobs?title=${encodeURIComponent(searchValue)}`, { replace: true });
    } else {
      navigate('/jobs', { replace: true });
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen py-10" style={{ backgroundColor: 'var(--color-background)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center py-10">
              <p style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>Loading jobs...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen py-10" style={{ backgroundColor: 'var(--color-background)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center py-10">
              <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-body)' }}>{error}</p>
              <button 
                onClick={fetchJobs}
                className="btn-accent mt-4"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
              Find Your Dream Job
            </h1>
            <p className="text-lg" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
              Discover opportunities that match your skills and aspirations
            </p>
          </div>

          {/* Main Layout: Sidebar + Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Filters */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="sticky top-8">
                <div className="rounded-xl border p-6" style={{ 
                  backgroundColor: 'var(--color-white)', 
                  boxShadow: 'var(--shadow-md)', 
                  borderColor: 'var(--color-border)' 
                }}>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                      Filter Jobs
                    </h2>
                    <button 
                      onClick={resetFilters}
                      className="text-sm px-3 py-1 rounded-md transition-all duration-200 hover:bg-gray-100"
                      style={{ 
                        color: 'var(--color-accent)', 
                        fontFamily: 'var(--font-body)'
                      }}
                    >
                      Reset All
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Search */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        Search Jobs
                      </label>
                      <input
                        type="text"
                        placeholder="Job title, company, keywords..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="input-field w-full"
                      />
                    </div>
                    
                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        Location
                      </label>
                      <input
                        type="text"
                        placeholder="City, state, country..."
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="input-field w-full"
                      />
                    </div>
                    
                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        Job Category
                      </label>
                      <select
                        value={categoryFilter}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="input-field w-full"
                      >
                        <option value="">All Categories</option>
                        {getUniqueValues(jobs, 'category').map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Employment Type */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        Employment Type
                      </label>
                      <select
                        value={employmentTypeFilter}
                        onChange={(e) => setEmploymentTypeFilter(e.target.value)}
                        className="input-field w-full"
                      >
                        <option value="">All Types</option>
                        {getUniqueValues(jobs, 'employmentType').map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Experience Level */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        Experience Level
                      </label>
                      <select
                        value={experienceLevelFilter}
                        onChange={(e) => setExperienceLevelFilter(e.target.value)}
                        className="input-field w-full"
                      >
                        <option value="">All Levels</option>
                        {getUniqueValues(jobs, 'experienceLevel').map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Job Listings */}
            <div className="flex-1 min-w-0">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-white)', borderColor: 'var(--color-border)' }}>
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                    Job Results
                  </h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                    Showing {filteredJobs.length} of {jobs.length} jobs
                  </p>
                </div>
                <div className="mt-3 sm:mt-0">
                  <select className="input-field text-sm">
                    <option>Sort by: Most Recent</option>
                    <option>Sort by: Salary (High to Low)</option>
                    <option>Sort by: Salary (Low to High)</option>
                    <option>Sort by: Company Name</option>
                  </select>
                </div>
              </div>
              
              {/* Job Cards */}
              {filteredJobs.length === 0 ? (
                <div className="rounded-xl border p-12 text-center" style={{ 
                  backgroundColor: 'var(--color-white)', 
                  boxShadow: 'var(--shadow-sm)', 
                  borderColor: 'var(--color-border)' 
                }}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                    <svg className="w-8 h-8" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                    No jobs found
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                    Try adjusting your filters to see more results
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
              {filteredJobs.map((job) => {
                const alreadyApplied = hasUserAppliedForJob(job._id);
                
                return (
                  <div 
                    key={job._id} 
                    className="rounded-xl border p-6 transition-all duration-300 hover:shadow-lg hover:border-opacity-60 cursor-pointer group"
                    style={{ 
                      backgroundColor: 'var(--color-white)', 
                      boxShadow: 'var(--shadow-sm)', 
                      borderColor: 'var(--color-border)' 
                    }}
                    onClick={() => handleViewJob(job._id)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      {/* Left Section - Job Info */}
                      <div className="flex items-start space-x-4 flex-1">
                        {/* Company Logo */}
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                          {job.company.logo ? (
                            <img 
                              src={job.company.logo} 
                              alt={job.company.name} 
                              className="w-10 h-10 rounded-lg object-cover"
                              onError={(e) => { e.target.src = 'https://placehold.co/60x60'; }}
                            />
                          ) : (
                            <span className="text-xl font-bold" style={{ color: 'var(--color-accent)' }}>
                              {job.company.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        
                        {/* Job Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-semibold group-hover:text-opacity-80 transition-all" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                              {job.title}
                            </h3>
                            {alreadyApplied && (
                              <span className="px-3 py-1 text-xs rounded-full ml-2 flex-shrink-0" style={{ 
                                backgroundColor: 'var(--color-success-light)', 
                                color: 'var(--color-success)',
                                fontFamily: 'var(--font-body)'
                              }}>
                                ✓ Applied
                              </span>
                            )}
                          </div>
                          
                          <p className="text-base font-medium mb-3" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                            {job.company.name}
                          </p>
                          
                          {/* Job Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-3 py-1 text-sm rounded-full font-medium" style={{ 
                              backgroundColor: 'var(--color-accent-light)', 
                              color: 'var(--color-accent)',
                              fontFamily: 'var(--font-body)'
                            }}>
                              {job.employmentType}
                            </span>
                            <span className="px-3 py-1 text-sm rounded-full font-medium" style={{ 
                              backgroundColor: 'var(--color-primary-light)', 
                              color: 'var(--color-primary)',
                              fontFamily: 'var(--font-body)'
                            }}>
                              📍 {job.location}
                            </span>
                            <span className="px-3 py-1 text-sm rounded-full font-medium" style={{ 
                              backgroundColor: 'var(--color-secondary-light)', 
                              color: 'var(--color-secondary)',
                              fontFamily: 'var(--font-body)'
                            }}>
                              {job.category}
                            </span>
                          </div>
                          
                          {/* Job Meta Info */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">💰</span>
                              <span className="font-medium">{job.salary ? `${job.salary.min} - ${job.salary.max} ${job.salary.currency}` : 'Not specified'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">📈</span>
                              <span>{job.experienceLevel}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">📅</span>
                              <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right Section - Action Button */}
                      <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-3 sm:gap-2 flex-shrink-0">
                        <div className="sm:hidden"></div> {/* Spacer for mobile */}
                        <button 
                          className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
                          style={{ 
                            backgroundColor: 'var(--color-accent)', 
                            color: 'var(--color-white)',
                            fontFamily: 'var(--font-body)'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewJob(job._id);
                          }}
                        >
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Jobs;