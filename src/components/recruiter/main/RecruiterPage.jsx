import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Filter } from 'lucide-react';
import RecruiterHeader from '../sidebar/RecruiterHeader';
import { allapplicant } from '../../utils/Api';

const RecruiterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false); // For mobile filter toggle
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalApplicants, setTotalApplicants] = useState(0);
  const itemsPerPage = 10;

  // Define filter options
  const EXPERIENCE_OPTIONS = [
    'Fresher', 
    '0-1 year of experience', 
    '1-2 year of experience', 
    '2-4 year of experience', 
    '5+ year of experience', 
    '10+ year of experience'
  ];

  const CATEGORY_OPTIONS = [
    "IT & Networking", 
    "Sales & Marketing", 
    "Accounting", 
    "Data Science", 
    "Digital Marketing", 
    "Human Resource", 
    "Customer Service", 
    "Project Manager", 
    "Other"
  ];

  const EDUCATION_OPTIONS = [
    "High School (10th)",
    "Higher Secondary (12th)",
    "Diploma",
    "Bachelor of Arts (BA)",
    "Bachelor of Science (BSc)",
    "Bachelor of Commerce (BCom)",
    "Bachelor of Technology (BTech)",
    "Bachelor of Engineering (BE)",
    "Bachelor of Computer Applications (BCA)",
    "Bachelor of Business Administration (BBA)",
    "Master of Arts (MA)",
    "Master of Science (MSc)",
    "Master of Commerce (MCom)",
    "Master of Technology (MTech)",
    "Master of Engineering (ME)",
    "Master of Computer Applications (MCA)",
    "Master of Business Administration (MBA)",
    "PhD (Doctorate)",
    "Other"
  ];

  // Parse URL parameters for filters
  const urlParams = new URLSearchParams(location.search);
  const [filters, setFilters] = useState({
    age: urlParams.get('age') || '',
    ageMin: urlParams.get('ageMin') || '',
    ageMax: urlParams.get('ageMax') || '',
    gender: urlParams.get('gender') || '',
    designation: urlParams.get('designation') || '',
    category: urlParams.get('category') || '',
    expInWork: urlParams.get('expInWork') || '',
    highestEducation: urlParams.get('highestEducation') || '',
    salary: urlParams.get('salary') || '',
    salaryMin: urlParams.get('salaryMin') || '',
    salaryMax: urlParams.get('salaryMax') || ''
  });

  // Store applied filters separately
  const [appliedFilters, setAppliedFilters] = useState({ ...filters });

  useEffect(() => {
    fetchApplicants(currentPage);
  }, [appliedFilters, currentPage]);

  const fetchApplicants = async (page = 1) => {
    try {
      setLoading(true);
      const filterParams = {
        page: page,
        limit: itemsPerPage
      };
      Object.keys(appliedFilters).forEach(key => {
        if (appliedFilters[key]) {
          filterParams[key] = appliedFilters[key];
        }
      });
      
      const response = await allapplicant(filterParams);
      // Extract applicants from the nested data structure
      const applicantsData = response.data.data.applicants || [];
      setApplicants(applicantsData);
      setTotalPages(response.data.data.totalPages || 1);
      setTotalApplicants(response.data.data.totalApplicants || applicantsData.length || 0);
      setError('');
    } catch (err) {
      console.error('Error fetching applicants:', err);
      setError('Failed to fetch applicants. Please try again.');
      setApplicants([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    setAppliedFilters({ ...filters });
    setCurrentPage(1); // Reset to first page when applying filters
    // Hide filters on mobile after applying
    if (window.innerWidth < 768) {
      setShowFilters(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      age: '',
      ageMin: '',
      ageMax: '',
      gender: '',
      designation: '',
      category: '',
      expInWork: '',
      highestEducation: '',
      salary: '',
      salaryMin: '',
      salaryMax: ''
    });
    setAppliedFilters({
      age: '',
      ageMin: '',
      ageMax: '',
      gender: '',
      designation: '',
      category: '',
      expInWork: '',
      highestEducation: '',
      salary: '',
      salaryMin: '',
      salaryMax: ''
    });
    setCurrentPage(1); // Reset to first page when resetting filters
    // Navigate to the base dashboard URL without filters
    navigate('/recruiter/dashboard', { replace: true });
    // Hide filters on mobile after resetting
    if (window.innerWidth < 768) {
      setShowFilters(false);
    }
  };

  const handleViewApplicant = (applicantId) => {
    navigate(`/recruiter/applicant-details/${applicantId}`);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Pagination Logic
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderLoadingSkeleton = () => {
    return (
      <div className="rounded-xl border animate-pulse" style={{ 
        backgroundColor: 'var(--color-white)', 
        borderColor: 'var(--color-border)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
      }}>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left">
                  <div className="h-4 bg-[var(--color-border)] rounded w-20"></div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="h-4 bg-[var(--color-border)] rounded w-16"></div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="h-4 bg-[var(--color-border)] rounded w-24"></div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="h-4 bg-[var(--color-border)] rounded w-20"></div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="h-4 bg-[var(--color-border)] rounded w-16"></div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="animate-pulse">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[var(--color-border)]"></div>
                      <div className="ml-4">
                        <div className="h-4 bg-[var(--color-border)] rounded w-24 mb-2"></div>
                        <div className="h-3 bg-[var(--color-border)] rounded w-32"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-[var(--color-border)] rounded w-12"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-[var(--color-border)] rounded w-32"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-[var(--color-border)] rounded w-28"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-8 bg-[var(--color-border)] rounded w-24"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <>
        <RecruiterHeader />
        <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-background)' }}>
          <div className="flex-1 p-8">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-error-light)' }}>
                  <svg className="w-8 h-8" style={{ color: 'var(--color-error)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p className="text-lg mb-4" style={{ color: 'var(--color-error)', fontFamily: 'var(--font-body)' }}>{error}</p>
                <button 
                  onClick={fetchApplicants}
                  className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
                  style={{ 
                    backgroundColor: 'var(--color-primary)', 
                    color: 'var(--color-white)',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <RecruiterHeader />
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-background)' }}>
        {/* Mobile Filter Toggle Button */}
        <div className="md:hidden p-4 bg-white border-b" style={{ borderColor: 'var(--color-border)' }}>
          <button 
            onClick={toggleFilters}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium"
            style={{ 
              backgroundColor: 'var(--color-primary)', 
              color: 'var(--color-white)',
              fontFamily: 'var(--font-body)'
            }}
          >
            <Filter className="w-5 h-5" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Main Content Area - responsive layout */}
        <div className="flex-1 flex flex-col md:flex-row">
          {/* Filter Sidebar - responsive for mobile/tablet */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-80 bg-white border-r border-gray-200 overflow-y-auto no-scrollbar`} style={{ 
            backgroundColor: 'var(--color-white)', 
            borderColor: 'var(--color-border)',
            boxShadow: '2px 0 10px rgba(0, 0, 0, 0.05)',
          }}>
            <div className="p-4 md:p-6">
              <div className="mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-bold mb-1 md:mb-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                  Filter Applicants
                </h2>
                <p className="text-xs md:text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                  Refine your search to find the perfect candidates
                </p>
              </div>

              {/* Apply and Reset Buttons - responsive layout */}
              <div className="flex gap-2 mb-4 md:mb-6">
                <button 
                  onClick={applyFilters}
                  className="flex-1 px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium text-sm md:text-base transition-all duration-200 hover:shadow-md"
                  style={{ 
                    backgroundColor: 'var(--color-primary)', 
                    color: 'var(--color-white)',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  Apply Filters
                </button>
                <button 
                  onClick={resetFilters}
                  className="flex-1 px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium text-sm md:text-base transition-all duration-200 hover:shadow-md"
                  style={{ 
                    backgroundColor: 'var(--color-accent)', 
                    color: 'var(--color-white)',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  Reset
                </button>
              </div>

              <div className="space-y-4 md:space-y-6">
                {/* Age Range Filter */}
                <div className="space-y-2 md:space-y-3">
                  <label className="block text-xs md:text-sm font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                    Age Range
                  </label>
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    <input
                      type="number"
                      name="ageMin"
                      placeholder="Min age"
                      value={filters.ageMin}
                      onChange={handleInputChange}
                      className="w-full px-2 py-2 md:px-3 md:py-2.5 border rounded-lg text-xs md:text-sm transition-all duration-200 focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
                      style={{ 
                        color: 'var(--color-text-primary)', 
                        fontFamily: 'var(--font-body)',
                        borderColor: 'var(--color-border)',
                        backgroundColor: 'var(--color-white)',
                        focusRingColor: 'var(--color-primary)'
                      }}
                    />
                    <input
                      type="number"
                      name="ageMax"
                      placeholder="Max age"
                      value={filters.ageMax}
                      onChange={handleInputChange}
                      className="w-full px-2 py-2 md:px-3 md:py-2.5 border rounded-lg text-xs md:text-sm transition-all duration-200 focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
                      style={{ 
                        color: 'var(--color-text-primary)', 
                        fontFamily: 'var(--font-body)',
                        borderColor: 'var(--color-border)',
                        backgroundColor: 'var(--color-white)',
                        focusRingColor: 'var(--color-primary)'
                      }}
                    />
                  </div>
                </div>

                {/* Gender Filter */}
                <div className="space-y-2 md:space-y-3">
                  <label className="block text-xs md:text-sm font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={filters.gender}
                    onChange={handleInputChange}
                    className="w-full px-2 py-2 md:px-3 md:py-2.5 border rounded-lg text-xs md:text-sm transition-all duration-200 focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
                    style={{ 
                      color: 'var(--color-text-primary)', 
                      fontFamily: 'var(--font-body)',
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-white)',
                      focusRingColor: 'var(--color-primary)'
                    }}
                  >
                    <option value="">All Genders</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Designation Filter */}
                <div className="space-y-2 md:space-y-3">
                  <label className="block text-xs md:text-sm font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    placeholder="Enter designation"
                    value={filters.designation}
                    onChange={handleInputChange}
                    className="w-full px-2 py-2 md:px-3 md:py-2.5 border rounded-lg text-xs md:text-sm transition-all duration-200 focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
                    style={{ 
                      color: 'var(--color-text-primary)', 
                      fontFamily: 'var(--font-body)',
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-white)',
                      focusRingColor: 'var(--color-primary)'
                    }}
                  />
                </div>

                {/* Category Filter */}
                <div className="space-y-2 md:space-y-3">
                  <label className="block text-xs md:text-sm font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                    Category
                  </label>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleInputChange}
                    className="w-full px-2 py-2 md:px-3 md:py-2.5 border rounded-lg text-xs md:text-sm transition-all duration-200 focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
                    style={{ 
                      color: 'var(--color-text-primary)', 
                      fontFamily: 'var(--font-body)',
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-white)',
                      focusRingColor: 'var(--color-primary)'
                    }}
                  >
                    <option value="">All Categories</option>
                    {CATEGORY_OPTIONS.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Experience Filter */}
                <div className="space-y-2 md:space-y-3">
                  <label className="block text-xs md:text-sm font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                    Experience
                  </label>
                  <select
                    name="expInWork"
                    value={filters.expInWork}
                    onChange={handleInputChange}
                    className="w-full px-2 py-2 md:px-3 md:py-2.5 border rounded-lg text-xs md:text-sm transition-all duration-200 focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
                    style={{ 
                      color: 'var(--color-text-primary)', 
                      fontFamily: 'var(--font-body)',
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-white)',
                      focusRingColor: 'var(--color-primary)'
                    }}
                  >
                    <option value="">Any Experience</option>
                    {EXPERIENCE_OPTIONS.map((experience, index) => (
                      <option key={index} value={experience}>{experience}</option>
                    ))}
                  </select>
                </div>

                {/* Education Filter */}
                <div className="space-y-2 md:space-y-3">
                  <label className="block text-xs md:text-sm font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                    Education
                  </label>
                  <select
                    name="highestEducation"
                    value={filters.highestEducation}
                    onChange={handleInputChange}
                    className="w-full px-2 py-2 md:px-3 md:py-2.5 border rounded-lg text-xs md:text-sm transition-all duration-200 focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
                    style={{ 
                      color: 'var(--color-text-primary)', 
                      fontFamily: 'var(--font-body)',
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-white)',
                      focusRingColor: 'var(--color-primary)'
                    }}
                  >
                    <option value="">Any Education</option>
                    {EDUCATION_OPTIONS.map((education, index) => (
                      <option key={index} value={education}>{education}</option>
                    ))}
                  </select>
                </div>

                {/* Salary Range Filter */}
                <div className="space-y-2 md:space-y-3">
                  <label className="block text-xs md:text-sm font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                    Salary Range
                  </label>
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    <input
                      type="number"
                      name="salaryMin"
                      placeholder="Min salary"
                      value={filters.salaryMin}
                      onChange={handleInputChange}
                      className="w-full px-2 py-2 md:px-3 md:py-2.5 border rounded-lg text-xs md:text-sm transition-all duration-200 focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
                      style={{ 
                        color: 'var(--color-text-primary)', 
                        fontFamily: 'var(--font-body)',
                        borderColor: 'var(--color-border)',
                        backgroundColor: 'var(--color-white)',
                        focusRingColor: 'var(--color-primary)'
                      }}
                    />
                    <input
                      type="number"
                      name="salaryMax"
                      placeholder="Max salary"
                      value={filters.salaryMax}
                      onChange={handleInputChange}
                      className="w-full px-2 py-2 md:px-3 md:py-2.5 border rounded-lg text-xs md:text-sm transition-all duration-200 focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
                      style={{ 
                        color: 'var(--color-text-primary)', 
                        
                        fontFamily: 'var(--font-body)',
                        borderColor: 'var(--color-border)',
                        backgroundColor: 'var(--color-white)',
                        focusRingColor: 'var(--color-primary)'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - responsive padding and layout */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-8">
              {/* Page Header - responsive layout */}
              <div className="mb-6 md:mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                      Student Applicants
                    </h1>
                    <p className="text-base md:text-lg" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                      {totalApplicants} {totalApplicants === 1 ? 'applicant' : 'applicants'} found
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                      {location.search && (
                        <button 
                          onClick={resetFilters}
                          className="px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:shadow-md"
                          style={{ 
                            backgroundColor: 'var(--color-accent)', 
                            color: 'var(--color-white)',
                            fontFamily: 'var(--font-body)'
                          }}
                        >
                          Clear All Filters
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Loading Skeleton or Content */}
              {loading ? (
                renderLoadingSkeleton()
              ) : applicants.length === 0 ? (
                <div className="rounded-xl border p-6 md:p-12 text-center" style={{ 
                  backgroundColor: 'var(--color-white)', 
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', 
                  borderColor: 'var(--color-border)' 
                }}>
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                    <svg className="w-8 h-8 md:w-10 md:h-10" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                    {location.search ? 'No students match your filters' : 'No student applicants found'}
                  </h3>
                  <p className="text-base md:text-lg mb-4 md:mb-6" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                    {location.search ? 'Try adjusting your filters to see more results' : 'There are currently no student applicants to display'}
                  </p>
                  {location.search && (
                    <button 
                      onClick={resetFilters}
                      className="px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium text-sm md:text-base transition-all duration-200 hover:shadow-md"
                      style={{ 
                        backgroundColor: 'var(--color-primary)', 
                        color: 'var(--color-white)',
                        fontFamily: 'var(--font-body)'
                      }}
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="rounded-xl border overflow-x-auto" style={{ 
                  backgroundColor: 'var(--color-white)', 
                  borderColor: 'var(--color-border)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
                }}>
                  <table className="min-w-full divide-y" style={{ borderColor: 'var(--color-border)' }}>
                    <thead>
                      <tr>
                        <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs md:text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-primary)', backgroundColor: 'var(--color-background-light)' }}>
                          Applicant
                        </th>
                        <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs md:text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-primary)', backgroundColor: 'var(--color-background-light)' }}>
                          Age
                        </th>
                        <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs md:text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-primary)', backgroundColor: 'var(--color-background-light)' }}>
                          Designation
                        </th>
                        <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs md:text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-primary)', backgroundColor: 'var(--color-background-light)' }}>
                          Category
                        </th>
                        <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs md:text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-primary)', backgroundColor: 'var(--color-background-light)' }}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-white)' }}>
                      {applicants.map((applicant) => (
                        <tr key={applicant._id} className="hover:bg-gray-50 transition-colors" style={{ transition: 'var(--transition-fast)' }}>
                          <td className="px-4 py-3 md:px-6 md:py-4">
                            <div className="flex items-center">
                              {/* Profile Photo or Icon */}
                              {applicant.profile?.photo ? (
                                <img 
                                  src={applicant.profile.photo} 
                                  alt={applicant.name || 'Applicant'} 
                                  className="flex-shrink-0 h-8 w-8 md:h-10 md:w-10 rounded-full object-cover"
                                />
                              ) : (
                                <div className="flex-shrink-0 h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <User className="text-gray-600" size={16} />
                                </div>
                              )}
                              <div className="ml-3 md:ml-4">
                                <div className="text-xs md:text-sm font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                                  {applicant.name || 'Unknown'}
                                </div>
                                <div className="text-xs" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                                  {applicant.email || 'No email provided'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 md:px-6 md:py-4">
                            <div className="text-xs md:text-sm" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                              {applicant.profile?.age || 'Not specified'}
                            </div>
                          </td>
                          <td className="px-4 py-3 md:px-6 md:py-4">
                            <div className="text-xs md:text-sm" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                              {applicant.profile?.designation || 'Not specified'}
                            </div>
                          </td>
                          <td className="px-4 py-3 md:px-6 md:py-4">
                            <div className="text-xs md:text-sm" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                              {applicant.profile?.preferredCategory || 'Not specified'}
                            </div>
                          </td>
                          <td className="px-4 py-3 md:px-6 md:py-4">
                            <button 
                              className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-medium text-xs md:text-sm transition-all duration-200 hover:shadow-md hover:opacity-90"
                              style={{ 
                                backgroundColor: 'var(--color-primary)', 
                                color: 'var(--color-white)',
                                fontFamily: 'var(--font-body)'
                              }}
                              onClick={() => handleViewApplicant(applicant._id)}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {/* Pagination Controls */}
                  {totalApplicants > itemsPerPage && (
                    <div className="px-6 py-4 flex items-center justify-between border-t" style={{ borderColor: 'var(--color-border)' }}>
                      <div className="flex-1 flex justify-between sm:hidden">
                        <button
                          onClick={() => paginate(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                        >
                          Next
                        </button>
                      </div>
                      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalApplicants)}</span> of{' '}
                            <span className="font-medium">{totalApplicants}</span> results
                          </p>
                        </div>
                        <div>
                          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button
                              onClick={() => paginate(Math.max(1, currentPage - 1))}
                              disabled={currentPage === 1}
                              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                            >
                              <span className="sr-only">Previous</span>
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </button>
                           
                            {[...Array(totalPages)].map((_, i) => (
                              <button
                                key={i + 1}
                                onClick={() => paginate(i + 1)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                  currentPage === i + 1
                                    ? 'z-10 bg-red-50 border-red-500 text-red-600'
                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                }`}
                                style={currentPage === i + 1 ? { backgroundColor: 'var(--color-primary-light)', borderColor: 'var(--color-primary)', color: 'var(--color-primary)' } : {}}
                              >
                                {i + 1}
                              </button>
                            ))}


                            <button
                              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                              disabled={currentPage === totalPages}
                              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                            >
                              <span className="sr-only">Next</span>
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </nav>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecruiterPage;