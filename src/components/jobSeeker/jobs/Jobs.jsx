/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { allJobs, appliedJobs, allCategories } from "../../utils/Api";
import { useNavigate, useLocation } from "react-router-dom";

// Utility function to properly handle image URLs
const getImageUrl = (url) => {
  if (!url) return "https://placehold.co/60x60";

  // If it's already an absolute URL, return as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // If it's a relative path, prepend the base URL
  const baseUrl =
    import.meta.env.VITE_API_URL || "https://elite-jobs-backend.onrender.com";
  return `${baseUrl}${url.startsWith("/") ? url : `/${url}`}`;
};

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userApplications, setUserApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    experienceLevels: [],
    jobTypes: [],
    workTypes: [],
    interviewTypes: [],
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Get URL parameters
  const urlParams = new URLSearchParams(location.search);
  const categoryFromUrl = urlParams.get("category")
    ? decodeURIComponent(urlParams.get("category"))
    : "";
  const titleFromUrl = urlParams.get("title")
    ? decodeURIComponent(urlParams.get("title"))
    : "";
  const companyFromUrl = urlParams.get("company")
    ? decodeURIComponent(urlParams.get("company"))
    : "";
  const pageFromUrl = parseInt(urlParams.get("page")) || 1;

  // Filter states
  const [searchTerm, setSearchTerm] = useState(titleFromUrl);
  const [locationFilter, setLocationFilter] = useState("");
  const [experienceLevelFilter, setExperienceLevelFilter] = useState("");
  const [workTypeFilter, setWorkTypeFilter] = useState("");
  const [interviewTypeFilter, setInterviewTypeFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(categoryFromUrl);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    setCurrentPage(pageFromUrl);
    fetchJobs(pageFromUrl);
    fetchUserApplications();
    fetchFilterOptions();
  }, [pageFromUrl]);

  // Monitor URL changes and update filters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const categoryFromUrl = urlParams.get("category")
      ? decodeURIComponent(urlParams.get("category"))
      : "";
    const titleFromUrl = urlParams.get("title")
      ? decodeURIComponent(urlParams.get("title"))
      : "";
    const locationFromUrl = urlParams.get("location")
      ? decodeURIComponent(urlParams.get("location"))
      : "";
    const pageFromUrl = parseInt(urlParams.get("page")) || 1;
    setCategoryFilter(categoryFromUrl);
    setSearchTerm(titleFromUrl);
    setLocationFilter(locationFromUrl);
    setCurrentPage(pageFromUrl);
  }, [location.search]);

  const fetchJobs = async (page = 1) => {
    try {
      setLoading(true);

      // Prepare filter parameters
      const params = {
        page: page,
        limit: 10, // Same as admin panel
        verificationStatus: "verified", // Only fetch verified jobs
      };

      // Add search term if provided
      if (searchTerm) {
        params.search = searchTerm;
      }

      // Add location filter if provided
      if (locationFilter) {
        params.location = locationFilter;
      }

      // Add category filter if provided
      if (categoryFilter) {
        params.category = categoryFilter;
      }

      // Add other filters if provided
      if (experienceLevelFilter) {
        params.experienceLevel = experienceLevelFilter;
      }

      if (workTypeFilter) {
        params.workType = workTypeFilter;
      }

      if (interviewTypeFilter) {
        params.interviewType = interviewTypeFilter;
      }

      if (jobTypeFilter) {
        params.employmentType = jobTypeFilter;
      }

      // Combine search term and company filter
      const searchTerms = [];
      if (searchTerm) {
        searchTerms.push(searchTerm);
      }
      if (companyFromUrl) {
        searchTerms.push(companyFromUrl);
      }
      
      // Add combined search term if any search terms exist
      if (searchTerms.length > 0) {
        params.search = searchTerms.join(' ');
      }

      // Add location filter if provided
      if (locationFilter) {
        params.location = locationFilter;
      }

      // Add sortBy parameter
      if (sortBy) {
        params.sortBy = sortBy;
      }

      const response = await allJobs(params);

      if (response.data.data.jobs) {
        const jobsData = response.data.data.jobs;
        setJobs(jobsData);
        setTotalPages(response.data.data.totalPages || 1);
        setCurrentPage(response.data.data.currentPage || 1);
        setTotalJobs(response.data.data.totalJobs || jobsData.length || 0);
      } else {
        setJobs([]);
        setTotalPages(1);
        setCurrentPage(1);
        setTotalJobs(0);
      }

      setError("");
    } catch (err) {
      setError("Failed to fetch jobs");
      console.error("Error fetching jobs:", err);
      setJobs([]);
      setTotalPages(1);
      setCurrentPage(1);
      setTotalJobs(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const response = await allCategories();
      if (response.data.success) {
        // Extract just the category names from the response
        const categories = response.data.data.map((item) => item.category);
        setFilterOptions((prev) => ({
          ...prev,
          categories: categories,
        }));
      }
    } catch (err) {
      console.error("Error fetching filter options:", err);
    }
  };

  // For other filter options, we'll keep them as they are for now
  // In a real implementation, you might want to fetch these from the backend as well

  const fetchUserApplications = async () => {
    try {
      setApplicationsLoading(true);
      const response = await appliedJobs();
      setUserApplications(response.data.data);
      setApplicationsLoading(false);
    } catch (err) {
      console.error("Error fetching user applications:", err);
      setApplicationsLoading(false);
    }
  };

  // Apply filters whenever filter values change
  useEffect(() => {
    // Update URL with current filters
    const params = new URLSearchParams();

    if (searchTerm) {
      params.set("title", searchTerm);
    }

    if (locationFilter) {
      params.set("location", locationFilter);
    }

    if (categoryFilter) {
      params.set("category", categoryFilter);
    }

    if (companyFromUrl) {
      params.set("company", companyFromUrl);
    }

    if (currentPage > 1) {
      params.set("page", currentPage);
    }

    const newUrl = params.toString() ? `/jobs?${params.toString()}` : "/jobs";
    navigate(newUrl, { replace: true });

    // Fetch jobs with current filters (excluding searchTerm and locationFilter to prevent auto-search)
    fetchJobs(currentPage);
  }, [
    categoryFilter,
    companyFromUrl,
    experienceLevelFilter,
    workTypeFilter,
    interviewTypeFilter,
    jobTypeFilter,
    currentPage,
    sortBy,
  ]);

  // Get unique filter options (case-insensitive)
  const getUniqueValues = (array, key) => {
    const seen = new Set();
    const uniqueValues = [];

    array.forEach((item) => {
      const value = item[key];
      if (value && !seen.has(value.toLowerCase())) {
        seen.add(value.toLowerCase());
        uniqueValues.push(value);
      }
    });

    return uniqueValues;
  };

  // Experience level options - dynamically generated
  const experienceLevelOptions = getUniqueValues(jobs, "experienceLevel");

  // Work type options - dynamically generated
  const workTypeOptions = getUniqueValues(jobs, "workType");

  // Interview type options - dynamically generated
  const interviewTypeOptions = getUniqueValues(jobs, "interviewType");

  // Job type options - dynamically generated
  const jobTypeOptions = getUniqueValues(jobs, "jobType");

  // Category options - from filter options
  const categoryOptions = filterOptions.categories || [];
  const handleViewJob = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  // Check if user has applied for a specific job
  const hasUserAppliedForJob = (jobId) => {
    if (applicationsLoading || !userApplications.length) {
      return false;
    }

    return userApplications.some(
      (application) => application.jobId && application.jobId._id === jobId
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setLocationFilter("");
    setExperienceLevelFilter("");
    setWorkTypeFilter("");
    setInterviewTypeFilter("");
    setJobTypeFilter("");
    setCategoryFilter("");
    setCurrentPage(1); // Reset to first page when filters are reset
    // Trigger the search by calling fetchJobs directly
    fetchJobs(1);
  };

  // Handle location filter change (without auto-search)
  const handleLocationChange = (locationValue) => {
    setLocationFilter(locationValue);
  };

  // Handle search term change (without auto-search)
  const handleSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
  };

  // Handle manual search trigger
  const handleManualSearch = () => {
    setCurrentPage(1); // Reset to first page when search is triggered
    // Trigger the search by calling fetchJobs directly
    fetchJobs(1);
  };

  // Handle Enter key press in search inputs
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleManualSearch();
    }
  };

  // Handle search reset
  const handleSearchReset = () => {
    setSearchTerm("");
    setLocationFilter("");
    setCurrentPage(1); // Reset to first page when search is reset
    // Trigger the search by calling fetchJobs directly
    fetchJobs(1);
  };

  // Render filter sidebar
  const renderFilterSidebar = (isLoading = false) => (
    <div className="lg:w-80 flex-shrink-0">
      <div className="sticky top-8">
        <div
          className="rounded-xl border p-6"
          style={{
            backgroundColor: "var(--color-white)",
            boxShadow: "var(--shadow-md)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2
              className="text-xl font-semibold"
              style={{
                color: "var(--color-primary)",
                fontFamily: "var(--font-heading)",
              }}
            >
              Filter Jobs
            </h2>
            <button
              onClick={resetFilters}
              className="text-sm px-3 py-1 rounded-md transition-all duration-200 hover:bg-gray-100"
              style={{
                color: "var(--color-accent)",
                fontFamily: "var(--font-body)",
              }}
              disabled={isLoading}
            >
              Reset All
            </button>
          </div>

          <div className="space-y-6">
            {/* Search */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Search Jobs
              </label>
              <div className="flex gap-1">
                <input
                  type="text"
                  placeholder="Job title, company, keywords..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="input-field flex-1"
                  disabled={isLoading}
                />
                <button
                  onClick={handleManualSearch}
                  className="transition-colors cursor-pointer flex items-center justify-center"
                  title="Search"
                  disabled={isLoading}
                  style={{
                color: "var(--color-accent)",
                fontFamily: "var(--font-body)",
              }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Location */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Location
              </label>
              <div className="flex gap-1">
                <input
                  type="text"
                  placeholder="City, state, country..."
                  value={locationFilter}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="input-field flex-1"
                  disabled={isLoading}
                />
                <button
                  onClick={handleManualSearch}
                  className="transition-colors cursor-pointer flex items-center"
                  style={{
                color: "var(--color-accent)",
                fontFamily: "var(--font-body)",
              }}
                  title="Search"
                  disabled={isLoading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Job Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="input-field w-full"
                disabled={isLoading}
              >
                <option value="">All Categories</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Experience Level
              </label>
              <select
                value={experienceLevelFilter}
                onChange={(e) => handleExperienceLevelChange(e.target.value)}
                className="input-field w-full"
                disabled={isLoading}
              >
                <option value="">All Levels</option>
                {experienceLevelOptions.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Work Type */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Work Type
              </label>
              <select
                value={workTypeFilter}
                onChange={(e) => handleWorkTypeChange(e.target.value)}
                className="input-field w-full"
                disabled={isLoading}
              >
                <option value="">All Types</option>
                {workTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Type */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Job Type
              </label>
              <select
                value={jobTypeFilter}
                onChange={(e) => handleJobTypeChange(e.target.value)}
                className="input-field w-full"
                disabled={isLoading}
              >
                <option value="">All Types</option>
                {jobTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Handle experience level filter change
  const handleExperienceLevelChange = (experienceLevelValue) => {
    setExperienceLevelFilter(experienceLevelValue);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Handle work type filter change
  const handleWorkTypeChange = (workTypeValue) => {
    setWorkTypeFilter(workTypeValue);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Handle interview type filter change
  const handleInterviewTypeChange = (interviewTypeValue) => {
    setInterviewTypeFilter(interviewTypeValue);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Handle job type filter change
  const handleJobTypeChange = (jobTypeValue) => {
    setJobTypeFilter(jobTypeValue);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Handle sort by change
  const handleSortByChange = (sortByValue) => {
    setSortBy(sortByValue);
    // Sorting is done client-side, so no need to reset page
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle category filter change
  const handleCategoryChange = (categoryValue) => {
    setCategoryFilter(categoryValue);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  if (loading) {
    return (
      <>
        <div
          className="min-h-screen py-10"
          style={{ backgroundColor: "var(--color-background)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Page Header */}
            <div className="mb-8">
              <h1
                className="text-3xl font-bold mb-2"
                style={{
                  color: "var(--color-primary)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Find Your Dream Job
              </h1>
              <p
                className="text-lg"
                style={{
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Discover opportunities that match your skills and aspirations
              </p>
            </div>

            {/* Main Layout: Sidebar + Content */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Sidebar - Filters (Visible during loading) */}
              {renderFilterSidebar(true)}

              {/* Right Content - Job Listings Skeleton */}
              <div className="flex-1 min-w-0">
                {/* Results Header Skeleton */}
                <div
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 p-4 rounded-lg"
                  style={{
                    backgroundColor: "var(--color-white)",
                    borderColor: "var(--color-border)",
                  }}
                >
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
                        backgroundColor: "var(--color-white)",
                        boxShadow: "var(--shadow-sm)",
                        borderColor: "var(--color-border)",
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
                          <div className="sm:hidden"></div>
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
        <div
          className="min-h-screen py-10"
          style={{ backgroundColor: "var(--color-background)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center py-10">
              <p
                style={{
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {error}
              </p>
              <button onClick={fetchJobs} className="btn-accent mt-4">
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
      <div
        className="min-h-screen"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1
              className="text-3xl font-bold mb-2"
              style={{
                color: "var(--color-primary)",
                fontFamily: "var(--font-heading)",
              }}
            >
              Find Your Dream Job
            </h1>
            <p
              className="text-lg"
              style={{
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-body)",
              }}
            >
              Discover opportunities that match your skills and aspirations
            </p>
          </div>

          {/* Main Layout: Sidebar + Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Filters */}
            {renderFilterSidebar()}

            {/* Right Content - Job Listings */}
            <div className="flex-1 min-w-0">
              {/* Results Header */}
              <div
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 p-4 rounded-lg"
                style={{
                  backgroundColor: "var(--color-white)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div>
                  <h3
                    className="text-lg font-semibold"
                    style={{
                      color: "var(--color-primary)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    Job Results
                  </h3>
                  <p
                    className="text-sm mt-1"
                    style={{
                      color: "var(--color-text-secondary)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Showing {jobs.length} of {totalJobs} jobs
                  </p>
                </div>
                <div className="mt-3 sm:mt-0">
                  <select
                    className="input-field text-sm"
                    value={sortBy}
                    onChange={(e) => handleSortByChange(e.target.value)}
                  >
                    <option value="newest">Sort by: Newest</option>
                    <option value="oldest">Sort by: Oldest</option>
                    <option value="salaryHighLow">
                      Sort by: Salary (High to Low)
                    </option>
                    <option value="salaryLowHigh">
                      Sort by: Salary (Low to High)
                    </option>
                    <option value="company">Sort by: Company Name</option>
                  </select>
                </div>
              </div>

              {/* Job Cards */}
              {jobs.length === 0 ? (
                <div
                  className="rounded-xl border p-12 text-center"
                  style={{
                    backgroundColor: "var(--color-white)",
                    boxShadow: "var(--shadow-sm)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-accent-light)" }}
                  >
                    <svg
                      className="w-8 h-8"
                      style={{ color: "var(--color-accent)" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <h3
                    className="text-xl font-medium mb-2"
                    style={{
                      color: "var(--color-primary)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    No jobs found
                  </h3>
                  <p
                    style={{
                      color: "var(--color-text-secondary)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Try adjusting your filters to see more results
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {jobs.map((job, index) => {
                    const alreadyApplied = hasUserAppliedForJob(job._id);

                    return (
                      <div
                        key={`${job._id}-${index}`}
                        className="rounded-xl border p-6 transition-all duration-300 hover:shadow-lg hover:border-opacity-60 cursor-pointer group"
                        style={{
                          backgroundColor: "var(--color-white)",
                          boxShadow: "var(--shadow-sm)",
                          borderColor: "var(--color-border)",
                        }}
                        onClick={() => handleViewJob(job._id)}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          {/* Left Section - Job Info */}
                          <div className="flex items-start space-x-4 flex-1">
                            {/* Company Logo */}
                            <div
                              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{
                                backgroundColor: "var(--color-accent-light)",
                              }}
                            >
                              {job.company.logo ? (
                                <img
                                  src={getImageUrl(job.company.logo)}
                                  alt={job.company.name}
                                  className="w-10 h-10 rounded-lg object-contain"
                                  onError={(e) => {
                                    e.target.src = "https://placehold.co/60x60";
                                  }}
                                />
                              ) : (
                                <span
                                  className="text-xl font-bold"
                                  style={{ color: "var(--color-accent)" }}
                                >
                                  {job.company.name.charAt(0)}
                                </span>
                              )}
                            </div>

                            {/* Job Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <h3
                                  className="text-xl font-semibold group-hover:text-opacity-80 transition-all truncate"
                                  style={{
                                    color: "var(--color-primary)",
                                    fontFamily: "var(--font-heading)",
                                  }}
                                >
                                  {job.title}
                                </h3>
                                {alreadyApplied && (
                                  <span
                                    className="px-3 py-1 text-xs rounded-full ml-2 flex-shrink-0"
                                    style={{
                                      backgroundColor:
                                        "var(--color-success-light)",
                                      color: "var(--color-success)",
                                      fontFamily: "var(--font-body)",
                                    }}
                                  >
                                    ✓ Applied
                                  </span>
                                )}
                              </div>

                              <p
                                className="text-base font-medium mb-3 truncate"
                                style={{
                                  color: "var(--color-text-secondary)",
                                  fontFamily: "var(--font-body)",
                                }}
                              >
                                {job.company.name}
                              </p>

                              {/* Job Tags */}
                              <div className="flex flex-wrap gap-2 mb-4">
                                {job.jobType && (
                                  <span
                                    className="px-3 py-1 text-sm rounded-full font-medium truncate max-w-[150px]"
                                    style={{
                                      backgroundColor:
                                        "var(--color-accent-light)",
                                      color: "var(--color-accent)",
                                      fontFamily: "var(--font-body)",
                                    }}
                                  >
                                    {job.jobType}
                                  </span>
                                )}
                                <span
                                  className="px-3 py-1 text-sm rounded-full font-medium truncate max-w-[150px]"
                                  style={{
                                    backgroundColor:
                                      "var(--color-primary-light)",
                                    color: "var(--color-primary)",
                                    fontFamily: "var(--font-body)",
                                  }}
                                >
                                  📍{" "}
                                  {Array.isArray(job.location)
                                    ? job.location.join(", ")
                                    : job.location}
                                </span>
                                {job.category && (
                                  <span
                                    className="px-3 py-1 text-sm rounded-full font-medium truncate max-w-[150px]"
                                    style={{
                                      backgroundColor:
                                        "var(--color-secondary-light)",
                                      color: "var(--color-secondary)",
                                      fontFamily: "var(--font-body)",
                                    }}
                                  >
                                    {job.category}
                                  </span>
                                )}
                              </div>

                              {/* Job Meta Info */}
                              <div
                                className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm"
                                style={{
                                  color: "var(--color-text-secondary)",
                                  fontFamily: "var(--font-body)",
                                }}
                              >
                                <div className="flex items-center space-x-2">
                                  <span className="text-lg">💰</span>
                                  <span className="font-medium truncate">
                                    {job.salary &&
                                    job.salary.min &&
                                    job.salary.max &&
                                    job.salary.currency
                                      ? `${job.salary.min} - ${job.salary.max} ${job.salary.currency}`
                                      : "Not specified"}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-lg">📈</span>
                                  <span className="truncate">
                                    {job.experienceLevel || "Not specified"}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-lg">📅</span>
                                  <span className="truncate">
                                    {job.createdAt
                                      ? new Date(
                                          job.createdAt
                                        ).toLocaleDateString()
                                      : "Not specified"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right Section - Action Button */}
                          <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-3 sm:gap-2 flex-shrink-0">
                            <div className="sm:hidden"></div>
                            <button
                              className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
                              style={{
                                backgroundColor: "var(--color-accent)",
                                color: "var(--color-white)",
                                fontFamily: "var(--font-body)",
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-[#E94560] text-white"
                    }`}
                  >
                    Previous
                  </button>

                  <div className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-[#E94560] text-white"
                    }`}
                  >
                    Next
                  </button>
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
