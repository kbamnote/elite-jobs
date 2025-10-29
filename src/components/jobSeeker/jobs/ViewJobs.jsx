import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../commonSeeker/Header';
import Footer from '../commonSeeker/Footer';
import { jobsById, jobApply, profile, appliedJobs } from '../../../utils/Api';

const ViewJobs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userApplications, setUserApplications] = useState([]);

  useEffect(() => {
    if (id) {
      fetchJobDetails();
      fetchUserProfile();
      fetchUserApplications();
    } else {
      setError('No job ID provided');
      setLoading(false);
    }
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const response = await jobsById(id);
      setJob(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load job details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await profile();
      setUserProfile(response.data.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const fetchUserApplications = async () => {
    try {
      const response = await appliedJobs();
      setUserApplications(response.data.data);
    } catch (err) {
      console.error('Error fetching user applications:', err);
    }
  };

  const hasUserApplied = () => {
    if (!userApplications.length || !job) {
      return false;
    }
    
    return userApplications.some(application => 
      application.jobId && application.jobId._id === job._id
    );
  };

  const handleApply = async () => {
    try {
      setApplying(true);
      
      // Prepare application data from user profile
      const applicationData = {
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.profile.phone || '',
        address: userProfile.profile.address || '',
        experience: userProfile.profile.experience || [],
        education: userProfile.profile.education || [],
        skills: userProfile.profile.skills || []
      };

      await jobApply(id, applicationData);
      setApplicationSuccess(true);
      setApplied(true);
      // Refresh applications after successful application
      fetchUserApplications();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to apply for job');
      console.error('Error applying for job:', err);
    } finally {
      setApplying(false);
    }
  };

  const handleGoBack = () => {
    navigate('/jobs');
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--color-primary)' }}></div>
            <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>Loading job details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error && !job) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
          <div className="text-center max-w-md mx-auto p-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-error)' }}>
              <span className="text-white text-3xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}>
              Oops! Something went wrong
            </h2>
            <p className="mb-6" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-lg font-medium transition-all duration-300"
              style={{ 
                backgroundColor: 'var(--color-primary)', 
                color: 'var(--color-text-white)',
                fontFamily: 'var(--font-body)'
              }}
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
          <div className="text-center max-w-md mx-auto p-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-gray-200)' }}>
              <span className="text-4xl" style={{ color: 'var(--color-text-muted)' }}>📄</span>
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}>
              Job Not Found
            </h2>
            <p className="mb-6" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
              The job you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={handleGoBack}
              className="px-6 py-3 rounded-lg font-medium transition-all duration-300"
              style={{ 
                backgroundColor: 'var(--color-primary)', 
                color: 'var(--color-text-white)',
                fontFamily: 'var(--font-body)'
              }}
            >
              Browse Jobs
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const alreadyApplied = hasUserApplied();

  return (
    <>
      <Header />
      <div className="min-h-screen py-10" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={handleGoBack}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-md"
            style={{ 
              backgroundColor: 'var(--color-white)', 
              color: 'var(--color-primary)',
              border: '2px solid var(--color-primary)',
              fontFamily: 'var(--font-body)'
            }}
          >
            ← Back to Jobs
          </button>
          
          {applicationSuccess ? (
            <div className="mb-6 p-4 rounded-lg border-l-4" style={{ 
              backgroundColor: 'var(--color-success)', 
              borderColor: 'var(--color-success)',
              color: 'white'
            }}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <h3 className="font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                    Application Submitted Successfully!
                  </h3>
                  <p className="text-sm opacity-90" style={{ fontFamily: 'var(--font-body)' }}>
                    Your application has been sent to the employer. Good luck!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Job Header Card */}
                <div className="rounded-xl overflow-hidden" style={{ 
                  backgroundColor: 'var(--color-white)', 
                  boxShadow: 'var(--shadow-lg)' 
                }}>
                  <div className="p-8" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-dark-secondary) 100%)' }}>
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                      <div className="w-20 h-20 rounded-xl p-4 flex-shrink-0" style={{ backgroundColor: 'var(--color-white)', boxShadow: 'var(--shadow-md)' }}>
                        <img 
                          src={job.company.logo || 'https://placehold.co/80x80'} 
                          alt={job.company.name} 
                          className="w-full h-full object-contain"
                          onError={(e) => { e.target.src = 'https://placehold.co/80x80'; }}
                        />
                      </div>
                      <div className="flex-1">
                        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>
                          {job.title}
                        </h1>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xl text-white/90" style={{ fontFamily: 'var(--font-body)' }}>
                            {job.company.name}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-white/80">
                          <div className="flex items-center gap-2">
                            <span style={{ fontFamily: 'var(--font-body)' }}>📍 {job.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span style={{ fontFamily: 'var(--font-body)' }}>💼 {job.employmentType}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span style={{ fontFamily: 'var(--font-body)' }}>🏷️ {job.category}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Job Tags */}
                  <div className="p-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ 
                        backgroundColor: 'var(--color-accent)', 
                        color: 'var(--color-text-white)',
                        fontFamily: 'var(--font-body)'
                      }}>
                        {job.category}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ 
                        backgroundColor: 'var(--color-gray-100)', 
                        color: 'var(--color-text-secondary)',
                        fontFamily: 'var(--font-body)'
                      }}>
                        {job.employmentType}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ 
                        backgroundColor: 'var(--color-gray-100)', 
                        color: 'var(--color-text-secondary)',
                        fontFamily: 'var(--font-body)'
                      }}>
                        {job.experienceLevel}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Job Description */}
                <div className="rounded-xl p-8" style={{ 
                  backgroundColor: 'var(--color-white)', 
                  boxShadow: 'var(--shadow-lg)' 
                }}>
                  <h2 className="text-2xl font-bold mb-6" style={{ 
                    color: 'var(--color-text-primary)', 
                    fontFamily: 'var(--font-heading)' 
                  }}>
                    Job Description
                  </h2>
                  <div className="prose max-w-none" style={{ 
                    color: 'var(--color-text-secondary)', 
                    fontFamily: 'var(--font-body)',
                    lineHeight: '1.7'
                  }}>
                    <p className="whitespace-pre-line">{job.description}</p>
                  </div>
                </div>
                
                {/* Requirements */}
                {job.requirements && job.requirements.length > 0 && (
                  <div className="rounded-xl p-8" style={{ 
                    backgroundColor: 'var(--color-white)', 
                    boxShadow: 'var(--shadow-lg)' 
                  }}>
                    <h2 className="text-2xl font-bold mb-6" style={{ 
                      color: 'var(--color-text-primary)', 
                      fontFamily: 'var(--font-heading)' 
                    }}>
                      Requirements
                    </h2>
                    <ul className="space-y-4">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: 'var(--color-accent)' }}>
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                          <span style={{ 
                            color: 'var(--color-text-secondary)', 
                            fontFamily: 'var(--font-body)',
                            lineHeight: '1.6'
                          }}>
                            {req}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Responsibilities */}
                {job.responsibilities && job.responsibilities.length > 0 && (
                  <div className="rounded-xl p-8" style={{ 
                    backgroundColor: 'var(--color-white)', 
                    boxShadow: 'var(--shadow-lg)' 
                  }}>
                    <h2 className="text-2xl font-bold mb-6" style={{ 
                      color: 'var(--color-text-primary)', 
                      fontFamily: 'var(--font-heading)' 
                    }}>
                      Responsibilities
                    </h2>
                    <ul className="space-y-4">
                      {job.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: 'var(--color-primary)' }}>
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                          <span style={{ 
                            color: 'var(--color-text-secondary)', 
                            fontFamily: 'var(--font-body)',
                            lineHeight: '1.6'
                          }}>
                            {resp}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Skills */}
                {job.skills && job.skills.length > 0 && (
                  <div className="rounded-xl p-8" style={{ 
                    backgroundColor: 'var(--color-white)', 
                    boxShadow: 'var(--shadow-lg)' 
                  }}>
                    <h2 className="text-2xl font-bold mb-6" style={{ 
                      color: 'var(--color-text-primary)', 
                      fontFamily: 'var(--font-heading)' 
                    }}>
                      Required Skills
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {job.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                          style={{
                            backgroundColor: 'var(--color-gray-100)',
                            color: 'var(--color-text-secondary)',
                            fontFamily: 'var(--font-body)'
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Company Info */}
                <div className="rounded-xl p-8" style={{ 
                  backgroundColor: 'var(--color-white)', 
                  boxShadow: 'var(--shadow-lg)' 
                }}>
                  <h2 className="text-2xl font-bold mb-6" style={{ 
                    color: 'var(--color-text-primary)', 
                    fontFamily: 'var(--font-heading)' 
                  }}>
                    About {job.company.name}
                  </h2>
                  <p className="mb-6" style={{ 
                    color: 'var(--color-text-secondary)', 
                    fontFamily: 'var(--font-body)',
                    lineHeight: '1.7'
                  }}>
                    {job.company.description}
                  </p>
                  {job.company.website && (
                    <a 
                      href={job.company.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-md"
                      style={{
                        color: 'var(--color-primary)',
                        border: '2px solid var(--color-primary)',
                        fontFamily: 'var(--font-body)'
                      }}
                    >
                      Visit Website
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Quick Info Card */}
                <div className="rounded-xl p-6" style={{ 
                  backgroundColor: 'var(--color-white)', 
                  boxShadow: 'var(--shadow-lg)' 
                }}>
                  <h3 className="text-xl font-bold mb-6" style={{ 
                    color: 'var(--color-text-primary)', 
                    fontFamily: 'var(--font-heading)' 
                  }}>
                    Job Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-gray-100)' }}>
                        <span className="text-lg">📍</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>Location</p>
                        <p className="font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>{job.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-gray-100)' }}>
                        <span className="text-lg">💰</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>Salary</p>
                        <p className="font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                          {job.salary 
                            ? `${job.salary.min} - ${job.salary.max} ${job.salary.currency}`
                            : 'Not specified'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-gray-100)' }}>
                        <span className="text-lg">📅</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>Deadline</p>
                        <p className="font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                          {new Date(job.applicationDeadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Apply Card */}
                <div className="rounded-xl p-6" style={{ 
                  backgroundColor: 'var(--color-white)', 
                  boxShadow: 'var(--shadow-lg)' 
                }}>
                  <h3 className="text-xl font-bold mb-4" style={{ 
                    color: 'var(--color-text-primary)', 
                    fontFamily: 'var(--font-heading)' 
                  }}>
                    Apply for this Job
                  </h3>
                  
                  {error && (
                    <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-error)', color: 'white' }}>
                      <p className="text-sm" style={{ fontFamily: 'var(--font-body)' }}>{error}</p>
                    </div>
                  )}
                  
                  {alreadyApplied && (
                    <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-success)', color: 'white' }}>
                      <p className="text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                        You have already applied for this job. Check your applications for status updates.
                      </p>
                    </div>
                  )}
                  
                  {alreadyApplied ? (
                    <button
                      disabled
                      className="w-full px-6 py-3 rounded-lg font-medium cursor-not-allowed"
                      style={{
                        backgroundColor: 'var(--color-gray-300)',
                        color: 'var(--color-text-muted)',
                        fontFamily: 'var(--font-body)'
                      }}
                    >
                      Already Applied
                    </button>
                  ) : (
                    <button
                      onClick={handleApply}
                      disabled={applying}
                      className="w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                      style={{
                        backgroundColor: applying ? 'var(--color-gray-300)' : 'var(--color-primary)',
                        color: applying ? 'var(--color-text-muted)' : 'var(--color-text-white)',
                        fontFamily: 'var(--font-body)',
                        cursor: applying ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {applying ? 'Applying...' : 'Apply for Job'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewJobs;