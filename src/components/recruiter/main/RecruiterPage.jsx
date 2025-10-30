import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RecruiterSidebar from '../sidebar/RecruiterSidebar';
import { allapplicant } from '../../../utils/Api';

const RecruiterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Parse URL parameters for filters
  const urlParams = new URLSearchParams(location.search);
  const [filters, setFilters] = useState({
    age: urlParams.get('age') || '',
    ageMin: urlParams.get('ageMin') || '',
    ageMax: urlParams.get('ageMax') || '',
    gender: urlParams.get('gender') || '',
    designation: urlParams.get('designation') || '',
    preferredCategory: urlParams.get('preferredCategory') || '',
    expInWork: urlParams.get('expInWork') || '',
    highestEducation: urlParams.get('highestEducation') || '',
    salary: urlParams.get('salary') || '',
    salaryMin: urlParams.get('salaryMin') || '',
    salaryMax: urlParams.get('salaryMax') || '',
    page: urlParams.get('page') || '',
    limit: urlParams.get('limit') || ''
  });

  useEffect(() => {
    fetchApplicants();
  }, [location.search]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      // Prepare filter parameters for API call
      const filterParams = {};
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          filterParams[key] = filters[key];
        }
      });
      
      const response = await allapplicant(filterParams);
      setApplicants(response.data.data.applicants || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch applicants');
      console.error('Error fetching applicants:', err);
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

  const handleReset = () => {
    setFilters({
      age: '',
      ageMin: '',
      ageMax: '',
      gender: '',
      designation: '',
      preferredCategory: '',
      expInWork: '',
      highestEducation: '',
      salary: '',
      salaryMin: '',
      salaryMax: '',
      page: '',
      limit: ''
    });
    navigate('/recruiter/dashboard');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to RecruiterPage with filter parameters
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        queryParams.append(key, filters[key]);
      }
    });
    navigate(`/recruiter/dashboard?${queryParams.toString()}`);
  };

  const handleViewApplicant = (applicantId) => {
    navigate(`/recruiter/applicant-details/${applicantId}`);
  };

  // Reset all filters
  const resetFilters = () => {
    navigate('/recruiter/dashboard');
  };

  if (loading) {
    return (
      <>
        <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
          {/* Sidebar */}
          <div className="w-[10px] lg:w-1/4 h-screen fixed top-0 left-0">
            <RecruiterSidebar />
          </div>
          
          {/* Main content */}
          <main className="w-full lg:ml-80 xl:ml-80 p-4 justify-center items-center flex min-h-screen overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center py-10">
                <p>Loading applicants...</p>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
          {/* Sidebar */}
          <div className="w-[10px] lg:w-1/4 h-screen fixed top-0 left-0">
            <RecruiterSidebar />
          </div>
          
          {/* Main content */}
          <main className="w-full lg:ml-80 xl:ml-80 p-4 justify-center items-center flex min-h-screen overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center py-10">
                <p className="text-red-500">{error}</p>
                <button 
                  onClick={fetchApplicants}
                  className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Retry
                </button>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
        {/* Sidebar */}
        <div className="w-[10px] lg:w-1/4 h-screen fixed top-0 left-0">
          <RecruiterSidebar />
        </div>

        {/* Main content */}
        <main className="w-full lg:ml-80 xl:ml-80 p-4 min-h-screen overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                Applicant Dashboard
              </h1>
              <p className="text-lg" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                View and manage all job applicants
              </p>
            </div>

            {/* Filter Toggle Button */}
            <div className="mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>

            {/* Filter Form */}
            {showFilters && (
              <div className="mb-8 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Filter Applicants</h2>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Age Filter */}
                    <div>
                      <label htmlFor="age" className="block text-sm font-semibold text-gray-700 mb-2">
                        Exact Age
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={filters.age}
                        onChange={handleInputChange}
                        placeholder="e.g. 25"
                        className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>

                    {/* Age Min Filter */}
                    <div>
                      <label htmlFor="ageMin" className="block text-sm font-semibold text-gray-700 mb-2">
                        Minimum Age
                      </label>
                      <input
                        type="number"
                        id="ageMin"
                        name="ageMin"
                        value={filters.ageMin}
                        onChange={handleInputChange}
                        placeholder="e.g. 20"
                        className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>

                    {/* Age Max Filter */}
                    <div>
                      <label htmlFor="ageMax" className="block text-sm font-semibold text-gray-700 mb-2">
                        Maximum Age
                      </label>
                      <input
                        type="number"
                        id="ageMax"
                        name="ageMax"
                        value={filters.ageMax}
                        onChange={handleInputChange}
                        placeholder="e.g. 35"
                        className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>

                    {/* Gender Filter */}
                    <div>
                      <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 mb-2">
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={filters.gender}
                        onChange={handleInputChange}
                        className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="">All Genders</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Designation Filter */}
                    <div>
                      <label htmlFor="designation" className="block text-sm font-semibold text-gray-700 mb-2">
                        Designation
                      </label>
                      <input
                        type="text"
                        id="designation"
                        name="designation"
                        value={filters.designation}
                        onChange={handleInputChange}
                        placeholder="e.g. Software Engineer"
                        className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>

                    {/* Preferred Category Filter */}
                    <div>
                      <label htmlFor="preferredCategory" className="block text-sm font-semibold text-gray-700 mb-2">
                        Preferred Category
                      </label>
                      <select
                        id="preferredCategory"
                        name="preferredCategory"
                        value={filters.preferredCategory}
                        onChange={handleInputChange}
                        className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="">All Categories</option>
                        <option value="IT & Networking">IT & Networking</option>
                        <option value="Sales & Marketing">Sales & Marketing</option>
                        <option value="Accounting">Accounting</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Human Resource">Human Resource</option>
                        <option value="Customer Service">Customer Service</option>
                        <option value="Project Manager">Project Manager</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Experience Filter */}
                    <div>
                      <label htmlFor="expInWork" className="block text-sm font-semibold text-gray-700 mb-2">
                        Experience in Work
                      </label>
                      <select
                        id="expInWork"
                        name="expInWork"
                        value={filters.expInWork}
                        onChange={handleInputChange}
                        className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="">All Experience Levels</option>
                        <option value="Fresher">Fresher</option>
                        <option value="0-1 year of experience">0-1 year of experience</option>
                        <option value="1-2 year of experience">1-2 year of experience</option>
                        <option value="2-4 year of experience">2-4 year of experience</option>
                        <option value="5+ year of experience">5+ year of experience</option>
                        <option value="10+ year of experience">10+ year of experience</option>
                      </select>
                    </div>

                    {/* Highest Education Filter */}
                    <div>
                      <label htmlFor="highestEducation" className="block text-sm font-semibold text-gray-700 mb-2">
                        Highest Education
                      </label>
                      <select
                        id="highestEducation"
                        name="highestEducation"
                        value={filters.highestEducation}
                        onChange={handleInputChange}
                        className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="">All Education Levels</option>
                        <option value="High School (10th)">High School (10th)</option>
                        <option value="Higher Secondary (12th)">Higher Secondary (12th)</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Bachelor of Arts (BA)">Bachelor of Arts (BA)</option>
                        <option value="Bachelor of Science (BSc)">Bachelor of Science (BSc)</option>
                        <option value="Bachelor of Commerce (BCom)">Bachelor of Commerce (BCom)</option>
                        <option value="Bachelor of Technology (BTech)">Bachelor of Technology (BTech)</option>
                        <option value="Bachelor of Engineering (BE)">Bachelor of Engineering (BE)</option>
                        <option value="Bachelor of Computer Applications (BCA)">Bachelor of Computer Applications (BCA)</option>
                        <option value="Bachelor of Business Administration (BBA)">Bachelor of Business Administration (BBA)</option>
                        <option value="Master of Arts (MA)">Master of Arts (MA)</option>
                        <option value="Master of Science (MSc)">Master of Science (MSc)</option>
                        <option value="Master of Commerce (MCom)">Master of Commerce (MCom)</option>
                        <option value="Master of Technology (MTech)">Master of Technology (MTech)</option>
                        <option value="Master of Engineering (ME)">Master of Engineering (ME)</option>
                        <option value="Master of Computer Applications (MCA)">Master of Computer Applications (MCA)</option>
                        <option value="Master of Business Administration (MBA)">Master of Business Administration (MBA)</option>
                        <option value="PhD (Doctorate)">PhD (Doctorate)</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Salary Filter */}
                    <div>
                      <label htmlFor="salary" className="block text-sm font-semibold text-gray-700 mb-2">
                        Salary Expectation
                      </label>
                      <input
                        type="text"
                        id="salary"
                        name="salary"
                        value={filters.salary}
                        onChange={handleInputChange}
                        placeholder="e.g. 80000-90000 USD"
                        className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>

                    {/* Salary Min Filter */}
                    <div>
                      <label htmlFor="salaryMin" className="block text-sm font-semibold text-gray-700 mb-2">
                        Minimum Salary
                      </label>
                      <input
                        type="text"
                        id="salaryMin"
                        name="salaryMin"
                        value={filters.salaryMin}
                        onChange={handleInputChange}
                        placeholder="e.g. 50000"
                        className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>

                    {/* Salary Max Filter */}
                    <div>
                      <label htmlFor="salaryMax" className="block text-sm font-semibold text-gray-700 mb-2">
                        Maximum Salary
                      </label>
                      <input
                        type="text"
                        id="salaryMax"
                        name="salaryMax"
                        value={filters.salaryMax}
                        onChange={handleInputChange}
                        placeholder="e.g. 100000"
                        className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 pt-4">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Reset Filters
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg shadow-lg hover:from-teal-600 hover:to-teal-700 transition-all"
                    >
                      Apply Filters
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Filter Summary */}
            {location.search && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-1">Active Filters</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(filters).map(([key, value]) => {
                        if (value) {
                          return (
                            <span key={key} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {key}: {value}
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                  <button 
                    onClick={resetFilters}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}

            {/* Applicants Cards */}
            {applicants.length === 0 ? (
              <div className="rounded-xl border p-12 text-center" style={{ 
                backgroundColor: 'var(--color-white)', 
                boxShadow: 'var(--shadow-sm)', 
                borderColor: 'var(--color-border)' 
              }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                  <svg className="w-8 h-8" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                  {location.search ? 'No applicants match your filters' : 'No applicants found'}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                  {location.search ? 'Try adjusting your filters to see more results' : 'There are currently no applicants to display'}
                </p>
                {location.search && (
                  <button 
                    onClick={resetFilters}
                    className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {applicants.map((applicant) => (
                  <div 
                    key={applicant._id} 
                    className="rounded-xl border p-6 transition-all duration-300 hover:shadow-lg hover:border-opacity-60 cursor-pointer group"
                    style={{ 
                      backgroundColor: 'var(--color-white)', 
                      boxShadow: 'var(--shadow-sm)', 
                      borderColor: 'var(--color-border)' 
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      {/* Left Section - Applicant Info */}
                      <div className="flex items-start space-x-4 flex-1">
                        {/* Applicant Photo */}
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                          {applicant.profile.photo ? (
                            <img 
                              src={applicant.profile.photo} 
                              alt={applicant.name} 
                              className="w-10 h-10 rounded-lg object-cover"
                              onError={(e) => { e.target.src = 'https://placehold.co/60x60'; }}
                            />
                          ) : (
                            <span className="text-xl font-bold" style={{ color: 'var(--color-accent)' }}>
                              {applicant.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        
                        {/* Applicant Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-semibold group-hover:text-opacity-80 transition-all" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                              {applicant.name}
                            </h3>
                          </div>
                          
                          <p className="text-base font-medium mb-3" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                            {applicant.email}
                          </p>
                          
                          {/* Applicant Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-3 py-1 text-sm rounded-full font-medium" style={{ 
                              backgroundColor: 'var(--color-accent-light)', 
                              color: 'var(--color-accent)',
                              fontFamily: 'var(--font-body)'
                            }}>
                              {applicant.role}
                            </span>
                            {applicant.profile.skills && applicant.profile.skills.length > 0 && (
                              <span className="px-3 py-1 text-sm rounded-full font-medium" style={{ 
                                backgroundColor: 'var(--color-primary-light)', 
                                color: 'var(--color-primary)',
                                fontFamily: 'var(--font-body)'
                              }}>
                                {applicant.profile.skills.length} Skills
                              </span>
                            )}
                          </div>
                          
                          {/* Applicant Meta Info */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">🎓</span>
                              <span>
                                {applicant.profile.education && applicant.profile.education.length > 0 
                                  ? applicant.profile.education[0].degree || 'Education info' 
                                  : 'No education info'}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">💼</span>
                              <span>
                                {applicant.profile.experience && applicant.profile.experience.length > 0 
                                  ? applicant.profile.experience[0].position || 'Experience info' 
                                  : 'No experience info'}
                              </span>
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
                            handleViewApplicant(applicant._id);
                          }}
                        >
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default RecruiterPage;