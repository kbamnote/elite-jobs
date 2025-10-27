import React, { useState, useEffect } from 'react';
import Header from '../commonSeeker/Header';
import Footer from '../commonSeeker/Footer';
import { allJobs, appliedJobs } from '../../../utils/Api';
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userApplications, setUserApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState('');
  const [experienceLevelFilter, setExperienceLevelFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
    fetchUserApplications();
  }, []);

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
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center py-10">
              <p>Loading jobs...</p>
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
        <div className="min-h-screen bg-gray-50 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
              <button 
                onClick={fetchJobs}
                className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
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
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">All Jobs</h1>
          
          {/* Filters Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Filter Jobs</h2>
              <button 
                onClick={resetFilters}
                className="text-sm text-teal-600 hover:text-teal-800"
              >
                Reset Filters
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <input
                  type="text"
                  placeholder="Job title, company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="City, state..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              {/* Employment Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                <select
                  value={employmentTypeFilter}
                  onChange={(e) => setEmploymentTypeFilter(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">All Types</option>
                  {getUniqueValues(jobs, 'employmentType').map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                <select
                  value={experienceLevelFilter}
                  onChange={(e) => setExperienceLevelFilter(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">All Levels</option>
                  {getUniqueValues(jobs, 'experienceLevel').map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">All Categories</option>
                  {getUniqueValues(jobs, 'category').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </p>
          </div>
          
          {/* Job Cards Grid */}
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more results</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => {
                const alreadyApplied = hasUserAppliedForJob(job._id);
                
                return (
                  <div key={job._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <img 
                            src={job.company.logo || 'https://placehold.co/60x60'} 
                            alt={job.company.name} 
                            className="w-12 h-12 rounded-lg object-contain"
                            onError={(e) => { e.target.src = 'https://placehold.co/60x60'; }}
                          />
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-900">{job.title}</h3>
                            <p className="text-sm text-gray-600">{job.company.name}</p>
                          </div>
                        </div>
                        <span className="px-2 py-1 bg-teal-100 text-teal-800 text-xs font-medium rounded-full">
                          {job.employmentType}
                        </span>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          {job.location}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          {job.salary ? `${job.salary.min} - ${job.salary.max} ${job.salary.currency}` : 'Not specified'}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                          {job.experienceLevel}
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Posted: {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                        <div className="flex flex-col items-end">
                          {alreadyApplied && (
                            <span className="text-xs text-green-600 mb-1">Applied</span>
                          )}
                          <button
                            onClick={() => handleViewJob(job._id)}
                            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm font-medium"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Jobs;