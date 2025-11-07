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

  useEffect(() => {
    fetchApplicants();
  }, [location.search]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        queryParams.set(key, filters[key]);
      }
    });
    navigate(`?${queryParams.toString()}`);
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
    navigate('/recruiter');
  };

  const handleViewApplicant = (applicantId) => {
    navigate(`/recruiter/applicant-details/${applicantId}`);
  };

  if (loading) {
    return (
      <>
        <RecruiterSidebar placement="top" />
        <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-background)' }}>
          <main className="flex-1 pt-16 p-8">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: 'var(--color-primary)' }}></div>
                <p className="text-lg" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Loading applicants...</p>
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
        <RecruiterSidebar placement="top" />
        <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-background)' }}>
          <main className="flex-1 pt-16 p-8">
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
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <RecruiterSidebar placement="top" />
      <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-background)' }}>
        {/* Main Content Area */}
        <div className="flex-1 pt-16">
          <div className="flex" style={{ height: 'calc(100vh - 64px)' }}>
            {/* Filter Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto no-scrollbar" style={{ 
              backgroundColor: 'var(--color-white)', 
              borderColor: 'var(--color-border)',
              boxShadow: '2px 0 10px rgba(0, 0, 0, 0.05)'
            }}>
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                    Filter Applicants
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                    Refine your search to find the perfect candidates
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Age Range Filter */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                      Age Range
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        name="ageMin"
                        placeholder="Min age"
                        value={filters.ageMin}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 border rounded-lg text-sm transition-all duration-200 focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
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
                        className="w-full px-3 py-2.5 border rounded-lg text-sm transition-all duration-200 focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
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
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={filters.gender}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 border rounded-lg text-sm transition-all duration-200 focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
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
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                      Designation
                    </label>
                    <input
                      type="text"
                      name="designation"
                      placeholder="e.g. Software Engineer"
                      value={filters.designation}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 border rounded-lg text-sm transition-all duration-200 focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
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
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                      Category
                    </label>
                    <select
                      name="category"
                      value={filters.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 border rounded-lg text-sm transition-all duration-200 focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
                      style={{ 
                        color: 'var(--color-text-primary)', 
                        fontFamily: 'var(--font-body)',
                        borderColor: 'var(--color-border)',
                        backgroundColor: 'var(--color-white)',
                        focusRingColor: 'var(--color-primary)'
                      }}
                    >
                      <option value="">All Categories</option>
                      <option value="technology">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                      <option value="marketing">Marketing</option>
                      <option value="sales">Sales</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Experience Filter */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                      Experience
                    </label>
                    <select
                      name="expInWork"
                      value={filters.expInWork}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 border rounded-lg text-sm transition-all duration-200 focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
                      style={{ 
                        color: 'var(--color-text-primary)', 
                        fontFamily: 'var(--font-body)',
                        borderColor: 'var(--color-border)',
                        backgroundColor: 'var(--color-white)',
                        focusRingColor: 'var(--color-primary)'
                      }}
                    >
                      <option value="">Any Experience</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                  </div>

                  {/* Education Filter */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                      Education
                    </label>
                    <select
                      name="highestEducation"
                      value={filters.highestEducation}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 border rounded-lg text-sm transition-all duration-200 focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
                      style={{ 
                        color: 'var(--color-text-primary)', 
                        fontFamily: 'var(--font-body)',
                        borderColor: 'var(--color-border)',
                        backgroundColor: 'var(--color-white)',
                        focusRingColor: 'var(--color-primary)'
                      }}
                    >
                      <option value="">Any Education</option>
                      <option value="high-school">High School</option>
                      <option value="bachelor">Bachelor's Degree</option>
                      <option value="master">Master's Degree</option>
                      <option value="phd">PhD</option>
                    </select>
                  </div>

                  {/* Salary Range Filter */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                      Salary Range
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        name="salaryMin"
                        placeholder="Min salary"
                        value={filters.salaryMin}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 border rounded-lg text-sm transition-all duration-200 focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
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
                        className="w-full px-3 py-2.5 border rounded-lg text-sm transition-all duration-200 focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
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

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="flex-1 px-4 py-2.5 border rounded-lg font-medium text-sm transition-all duration-200 hover:shadow-md hover:bg-gray-50"
                      style={{ 
                        borderColor: 'var(--color-border)', 
                        color: 'var(--color-text-secondary)',
                        backgroundColor: 'var(--color-white)',
                        fontFamily: 'var(--font-body)'
                      }}
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:shadow-md hover:opacity-90"
                      style={{ 
                        backgroundColor: 'var(--color-primary)', 
                        color: 'var(--color-white)',
                        fontFamily: 'var(--font-body)'
                      }}
                    >
                      Apply Filters
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-8">
                {/* Page Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                        Student Applicants
                      </h1>
                      <p className="text-lg" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                        {applicants.length} {applicants.length === 1 ? 'applicant' : 'applicants'} found
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                        Last updated: {new Date().toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active Filters Summary */}
                {Object.values(filters).some(value => value) && (
                  <div className="mb-6 p-4 rounded-xl border" style={{ 
                    backgroundColor: 'var(--color-accent-light)', 
                    borderColor: 'var(--color-accent)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                          Active Filters
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(filters).map(([key, value]) => {
                            if (value) {
                              return (
                                <span
                                  key={key}
                                  className="px-3 py-1 rounded-full text-xs font-medium"
                                  style={{ 
                                    backgroundColor: 'var(--color-primary)', 
                                    color: 'var(--color-white)',
                                    fontFamily: 'var(--font-body)'
                                  }}
                                >
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
                        className="px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200 hover:shadow-md"
                        style={{ 
                          backgroundColor: 'var(--color-white)', 
                          color: 'var(--color-primary)',
                          border: '1px solid var(--color-primary)',
                          fontFamily: 'var(--font-body)'
                        }}
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                )}

                {/* Applicants Results */}
                {applicants.length === 0 ? (
                  <div className="rounded-xl border p-12 text-center" style={{ 
                    backgroundColor: 'var(--color-white)', 
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', 
                    borderColor: 'var(--color-border)' 
                  }}>
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                      <svg className="w-10 h-10" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-3" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                      {location.search ? 'No students match your filters' : 'No student applicants found'}
                    </h3>
                    <p className="text-lg mb-6" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                      {location.search ? 'Try adjusting your filters to see more results' : 'There are currently no student applicants to display'}
                    </p>
                    {location.search && (
                      <button 
                        onClick={resetFilters}
                        className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
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
                  <div className="rounded-xl border" style={{ 
                    backgroundColor: 'var(--color-white)', 
                    borderColor: 'var(--color-border)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
                  }}>
                    <div className="overflow-x-auto">
                      <table className="min-w-full table-auto">
                        <thead>
                          <tr>
                            <th className="text-left px-6 py-3 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-heading)' }}>Name</th>
                            <th className="text-left px-6 py-3 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-heading)' }}>Age</th>
                            <th className="text-left px-6 py-3 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-heading)' }}>Gender</th>
                            <th className="text-left px-6 py-3 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-heading)' }}>Designation</th>
                            <th className="text-left px-6 py-3 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-heading)' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {applicants.map((applicant) => (
                            <tr key={applicant._id} className="border-t hover:bg-gray-50" style={{ borderColor: 'var(--color-border)' }}>
                              <td className="px-6 py-4" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                                {applicant.name || 'N/A'}
                              </td>
                              <td className="px-6 py-4" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                                {applicant.profile?.age || 'Not specified'}
                              </td>
                              <td className="px-6 py-4 capitalize" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                                {applicant.profile?.gender || 'Not specified'}
                              </td>
                              <td className="px-6 py-4" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                                {applicant.profile?.designation || 'Not specified'}
                              </td>
                              <td className="px-6 py-4">
                                <button 
                                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md hover:opacity-90"
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
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecruiterPage;