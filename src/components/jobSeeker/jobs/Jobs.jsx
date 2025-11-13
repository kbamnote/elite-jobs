import React, { useState, useEffect } from 'react';
import Header from '../commonSeeker/Header';
import Footer from '../commonSeeker/Footer';
import { allJobs, appliedJobs } from '../../../utils/Api';
import { useNavigate, useLocation } from 'react-router-dom';

// Utility function to properly handle image URLs
const getImageUrl = (url) => {
  if (!url) return 'https://placehold.co/60x60';
  
  // If it's already an absolute URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If it's a relative path, prepend the base URL
  const baseUrl = import.meta.env.VITE_API_URL || "https://elite-jobs-backend.onrender.com";
  return `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;
};

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
  const [experienceLevelFilter, setExperienceLevelFilter] = useState('');
  const [workTypeFilter, setWorkTypeFilter] = useState('');
  const [interviewTypeFilter, setInterviewTypeFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
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
      
      // Fetch all jobs by requesting a large page size
      const response = await allJobs({ page: 1, limit: 100 });
      
      // Check the structure of the response
      let allJobsData = [];
      if (response.data.data.jobs) {
        // If jobs are in a jobs array (paginated response)
        allJobsData = response.data.data.jobs;
      } else if (Array.isArray(response.data.data)) {
        // If jobs are directly in the data array
        allJobsData = response.data.data;
      }
      
      // Filter jobs to only show verified jobs
      const verifiedJobs = allJobsData.filter(job => job.verificationStatus === 'verified');
      setJobs(verifiedJobs);
      setFilteredJobs(verifiedJobs);
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
    
    // Location filter (handle both string and array formats)
    if (locationFilter) {
      result = result.filter(job => {
        if (Array.isArray(job.location)) {
          return job.location.some(loc => 
            loc.toLowerCase().includes(locationFilter.toLowerCase())
          );
        } else {
          return job.location && job.location.toLowerCase().includes(locationFilter.toLowerCase());
        }
      });
    }
    
    // Experience level filter
    if (experienceLevelFilter) {
      result = result.filter(job => 
        job.experienceLevel.toLowerCase() === experienceLevelFilter.toLowerCase()
      );
    }
    
    // Work type filter
    if (workTypeFilter) {
      result = result.filter(job => 
        job.workType.toLowerCase() === workTypeFilter.toLowerCase()
      );
    }
    
    // Interview type filter
    if (interviewTypeFilter) {
      result = result.filter(job => 
        job.interviewType.toLowerCase() === interviewTypeFilter.toLowerCase()
      );
    }
    
    // Job type filter
    if (jobTypeFilter) {
      result = result.filter(job => 
        job.jobType.toLowerCase() === jobTypeFilter.toLowerCase()
      );
    }
    
    // Category filter
    if (categoryFilter) {
      result = result.filter(job => 
        job.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    setFilteredJobs(result);
  }, [searchTerm, locationFilter, experienceLevelFilter, workTypeFilter, interviewTypeFilter, jobTypeFilter, categoryFilter, jobs]);

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
    setExperienceLevelFilter('');
    setWorkTypeFilter('');
    setInterviewTypeFilter('');
    setJobTypeFilter('');
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

  // Experience level options
  const experienceLevelOptions = [
    'Fresher',
    '0-1 year of experience',
    '1-2 year of experience',
    '2-4 year of experience',
    '5+ year of experience'
  ];

  // Work type options
  const workTypeOptions = [
    'Remote',
    'On-site',
    'Hybrid'
  ];

  // Interview type options
  const interviewTypeOptions = [
    'Online',
    'On-site'
  ];

  // Job type options
  const jobTypeOptions = [
    'Full-time',
    'Part-time'
  ];

  if (loading) {
    return (
      <>
        <div className="min-h-screen py-10" style={{ backgroundColor: 'var(--color-background)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Page Header Skeleton */}
            <div className="mb-8">
              <div className="h-8 bg-[var(--color-border)] rounded w-1/3 mb-4 animate-pulse"></div>
              <div className="h-6 bg-[var(--color-border)] rounded w-2/3 animate-pulse"></div>
            </div>

            {/* Main Layout: Sidebar + Content */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Sidebar - Filters Skeleton */}
              <div className="lg:w-80 flex-shrink-0">
                <div className="sticky top-8">
                  <div className="rounded-xl border p-6" style={{ 
                    backgroundColor: 'var(--color-white)', 
                    boxShadow: 'var(--shadow-md)', 
                    borderColor: 'var(--color-border)' 
                  }}>
                    <div className="flex justify-between items-center mb-6">
                      <div className="h-6 bg-[var(--color-border)] rounded w-1/3 mb-2 animate-pulse"></div>
                      <div className="h-4 bg-[var(--color-border)] rounded w-16 animate-pulse"></div>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Search Skeleton */}
                      <div>
                        <div className="h-4 bg-[var(--color-border)] rounded w-1/4 mb-2 animate-pulse"></div>
                        <div className="h-10 bg-[var(--color-border)] rounded animate-pulse"></div>
                      </div>
                      
                      {/* Location Skeleton */}
                      <div>
                        <div className="h-4 bg-[var(--color-border)] rounded w-1/4 mb-2 animate-pulse"></div>
                        <div className="h-10 bg-[var(--color-border)] rounded animate-pulse"></div>
                      </div>
                      
                      {/* Category Skeleton */}
                      <div>
                        <div className="h-4 bg-[var(--color-border)] rounded w-1/4 mb-2 animate-pulse"></div>
                        <div className="h-10 bg-[var(--color-border)] rounded animate-pulse"></div>
                      </div>
                      
                      {/* Experience Level Skeleton */}
                      <div>
                        <div className="h-4 bg-[var(--color-border)] rounded w-1/4 mb-2 animate-pulse"></div>
                        <div className="h-10 bg-[var(--color-border)] rounded animate-pulse"></div>
                      </div>
                      
                      {/* Work Type Skeleton */}
                      <div>
                        <div className="h-4 bg-[var(--color-border)] rounded w-1/4 mb-2 animate-pulse"></div>
                        <div className="h-10 bg-[var(--color-border)] rounded animate-pulse"></div>
                      </div>
                      
                      {/* Interview Type Skeleton */}
                      <div>
                        <div className="h-4 bg-[var(--color-border)] rounded w-1/4 mb-2 animate-pulse"></div>
                        <div className="h-10 bg-[var(--color-border)] rounded animate-pulse"></div>
                      </div>
                      
                      {/* Job Type Skeleton */}
                      <div>
                        <div className="h-4 bg-[var(--color-border)] rounded w-1/4 mb-2 animate-pulse"></div>
                        <div className="h-10 bg-[var(--color-border)] rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content - Job Listings Skeleton */}
              <div className="flex-1 min-w-0">
                {/* Results Header Skeleton */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 p-4 rounded-lg" style={{ 
                  backgroundColor: 'var(--color-white)', 
                  borderColor: 'var(--color-border)' 
                }}>
                  <div>
                    <div className="h-6 bg-[var(--color-border)] rounded w-32 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-[var(--color-border)] rounded w-48 animate-pulse"></div>
                  </div>
                  <div className="mt-3 sm:mt-0">
                    <div className="h-8 bg-[var(--color-border)] rounded w-48 animate-pulse"></div>
                  </div>
                </div>
                
                {/* Job Cards Skeleton */}
                <div className="space-y-6">
                  {[...Array(3)].map((_, index) => (
                    <div 
                      key={index} 
                      className="rounded-xl border p-6"
                      style={{ 
                        backgroundColor: 'var(--color-white)', 
                        boxShadow: 'var(--shadow-sm)', 
                        borderColor: 'var(--color-border)' 
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        {/* Left Section - Job Info */}
                        <div className="flex items-start space-x-4 flex-1">
                          {/* Company Logo Skeleton */}
                          <div className="w-14 h-14 rounded-xl bg-[var(--color-border)] animate-pulse flex-shrink-0"></div>
                          
                          {/* Job Details Skeleton */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="h-6 bg-[var(--color-border)] rounded w-3/4 mb-2 animate-pulse"></div>
                            </div>
                            
                            <div className="h-5 bg-[var(--color-border)] rounded w-1/2 mb-3 animate-pulse"></div>
                            
                            {/* Job Tags Skeleton */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              <div className="h-6 bg-[var(--color-border)] rounded-full w-20 animate-pulse"></div>
                              <div className="h-6 bg-[var(--color-border)] rounded-full w-24 animate-pulse"></div>
                              <div className="h-6 bg-[var(--color-border)] rounded-full w-28 animate-pulse"></div>
                            </div>
                            
                            {/* Job Meta Info Skeleton */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div className="flex items-center space-x-2">
                                <div className="h-4 bg-[var(--color-border)] rounded w-32 animate-pulse"></div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="h-4 bg-[var(--color-border)] rounded w-28 animate-pulse"></div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="h-4 bg-[var(--color-border)] rounded w-24 animate-pulse"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Right Section - Action Button Skeleton */}
                        <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-3 sm:gap-2 flex-shrink-0">
                          <div className="sm:hidden"></div> {/* Spacer for mobile */}
                          <div className="h-10 bg-[var(--color-border)] rounded-lg w-32 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
       
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
     
      </>
    );
  }

  return (
    <>
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
                        {experienceLevelOptions.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Work Type */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        Work Type
                      </label>
                      <select
                        value={workTypeFilter}
                        onChange={(e) => setWorkTypeFilter(e.target.value)}
                        className="input-field w-full"
                      >
                        <option value="">All Types</option>
                        {workTypeOptions.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Interview Type */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        Interview Type
                      </label>
                      <select
                        value={interviewTypeFilter}
                        onChange={(e) => setInterviewTypeFilter(e.target.value)}
                        className="input-field w-full"
                      >
                        <option value="">All Types</option>
                        {interviewTypeOptions.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Job Type */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        Job Type
                      </label>
                      <select
                        value={jobTypeFilter}
                        onChange={(e) => setJobTypeFilter(e.target.value)}
                        className="input-field w-full"
                      >
                        <option value="">All Types</option>
                        {jobTypeOptions.map(type => (
                          <option key={type} value={type}>{type}</option>
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
                                  src={getImageUrl(job.company.logo)} 
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
                                  {job.jobType}
                                </span>
                                <span className="px-3 py-1 text-sm rounded-full font-medium" style={{ 
                                  backgroundColor: 'var(--color-primary-light)', 
                                  color: 'var(--color-primary)',
                                  fontFamily: 'var(--font-body)'
                                }}>
                                  📍 {Array.isArray(job.location) ? job.location.join(', ') : job.location}
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
    </>
  );
};

export default Jobs;