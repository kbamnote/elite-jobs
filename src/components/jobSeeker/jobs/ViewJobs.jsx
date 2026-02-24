/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../commonSeeker/Header';
import Footer from '../commonSeeker/Footer';
import { jobsById, jobApply, profile, appliedJobs } from '../../utils/Api';

// Utility function to properly handle image URLs
const getImageUrl = (url) => {
  if (!url) return 'https://placehold.co/80x80';

  // If it's already an absolute URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // If it's a relative path, prepend the base URL
  const baseUrl = import.meta.env.VITE_API_URL || "https://elite-jobs-backend.onrender.com";
  return `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;
};

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
        <div className="min-h-screen py-10" style={{ backgroundColor: 'var(--color-background)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button Skeleton */}
            <div className="mb-6 h-10 bg-[var(--color-border)] rounded-lg w-32 animate-pulse"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Skeleton */}
              <div className="lg:col-span-2 space-y-6">
                {/* Job Header Card Skeleton */}
                <div className="rounded-xl overflow-hidden" style={{
                  backgroundColor: 'var(--color-white)',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <div className="p-8" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-dark-secondary) 100%)' }}>
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                      <div className="w-20 h-20 rounded-xl bg-[var(--color-border)] animate-pulse flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="h-8 bg-[var(--color-border)] rounded w-3/4 mb-4 animate-pulse"></div>
                        <div className="h-6 bg-[var(--color-border)] rounded w-1/2 mb-4 animate-pulse"></div>
                        <div className="flex flex-wrap gap-4">
                          <div className="h-4 bg-[var(--color-border)] rounded w-24 animate-pulse"></div>
                          <div className="h-4 bg-[var(--color-border)] rounded w-20 animate-pulse"></div>
                          <div className="h-4 bg-[var(--color-border)] rounded w-28 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Job Tags Skeleton */}
                  <div className="p-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex flex-wrap gap-2">
                      <div className="h-6 bg-[var(--color-border)] rounded-full w-20 animate-pulse"></div>
                      <div className="h-6 bg-[var(--color-border)] rounded-full w-24 animate-pulse"></div>
                      <div className="h-6 bg-[var(--color-border)] rounded-full w-28 animate-pulse"></div>
                      <div className="h-6 bg-[var(--color-border)] rounded-full w-24 animate-pulse"></div>
                      <div className="h-6 bg-[var(--color-border)] rounded-full w-32 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Job Description Skeleton */}
                <div className="rounded-xl p-8" style={{
                  backgroundColor: 'var(--color-white)',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <div className="h-8 bg-[var(--color-border)] rounded w-1/3 mb-6 animate-pulse"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-[var(--color-border)] rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-[var(--color-border)] rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-[var(--color-border)] rounded w-4/5 animate-pulse"></div>
                    <div className="h-4 bg-[var(--color-border)] rounded w-3/4 animate-pulse"></div>
                  </div>
                </div>

                {/* Requirements Skeleton */}
                <div className="rounded-xl p-8" style={{
                  backgroundColor: 'var(--color-white)',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <div className="h-8 bg-[var(--color-border)] rounded w-1/3 mb-6 animate-pulse"></div>
                  <div className="space-y-4">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[var(--color-border)] animate-pulse flex-shrink-0 mt-0.5"></div>
                        <div className="h-4 bg-[var(--color-border)] rounded w-4/5 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Responsibilities Skeleton */}
                <div className="rounded-xl p-8" style={{
                  backgroundColor: 'var(--color-white)',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <div className="h-8 bg-[var(--color-border)] rounded w-1/3 mb-6 animate-pulse"></div>
                  <div className="space-y-4">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[var(--color-border)] animate-pulse flex-shrink-0 mt-0.5"></div>
                        <div className="h-4 bg-[var(--color-border)] rounded w-4/5 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills Skeleton */}
                <div className="rounded-xl p-8" style={{
                  backgroundColor: 'var(--color-white)',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <div className="h-8 bg-[var(--color-border)] rounded w-1/3 mb-6 animate-pulse"></div>
                  <div className="flex flex-wrap gap-3">
                    {[...Array(5)].map((_, index) => (
                      <div key={index} className="h-8 bg-[var(--color-border)] rounded-full w-20 animate-pulse"></div>
                    ))}
                  </div>
                </div>

                {/* Company Info Skeleton */}
                <div className="rounded-xl p-8" style={{
                  backgroundColor: 'var(--color-white)',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <div className="h-8 bg-[var(--color-border)] rounded w-1/3 mb-6 animate-pulse"></div>
                  <div className="space-y-3 mb-6">
                    <div className="h-4 bg-[var(--color-border)] rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-[var(--color-border)] rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-[var(--color-border)] rounded w-4/5 animate-pulse"></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="h-4 bg-[var(--color-border)] rounded w-20 animate-pulse"></div>
                      <div className="h-4 bg-[var(--color-border)] rounded w-16 animate-pulse"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 bg-[var(--color-border)] rounded w-20 animate-pulse"></div>
                      <div className="h-4 bg-[var(--color-border)] rounded w-24 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="h-10 bg-[var(--color-border)] rounded-lg w-32 animate-pulse"></div>
                </div>
              </div>

              {/* Sidebar Skeleton */}
              <div className="lg:col-span-1 space-y-6">
                {/* Quick Info Card Skeleton */}
                <div className="rounded-xl p-6" style={{
                  backgroundColor: 'var(--color-white)',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <div className="h-6 bg-[var(--color-border)] rounded w-1/3 mb-6 animate-pulse"></div>

                  <div className="space-y-4">
                    {[...Array(8)].map((_, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-border)] animate-pulse flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-[var(--color-border)] rounded w-1/3 mb-2 animate-pulse"></div>
                          <div className="h-4 bg-[var(--color-border)] rounded w-2/3 animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Apply Card Skeleton */}
                <div className="rounded-xl p-6" style={{
                  backgroundColor: 'var(--color-white)',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <div className="h-6 bg-[var(--color-border)] rounded w-1/3 mb-4 animate-pulse"></div>
                  <div className="h-12 bg-[var(--color-border)] rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error && !job) {
    return (
      <>
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
      </>
    );
  }

  if (!job) {
    return (
      <>
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
      </>
    );
  }

  const alreadyApplied = hasUserApplied();

  // Check if job has directLink (regardless of who posted it)
  const isDirectApplication = job?.directLink && job?.directLink.trim() !== "";

  // Function to handle direct application link
  const handleDirectApply = () => {
    // Check if user has uploaded a resume
    if (!userProfile?.profile?.resume) {
      setError('Please upload your resume before applying directly. Update your profile to add a resume.');
      return;
    }

    const directLink = job.directLink;

    // Check if it's an email address (contains @ or contains ! which is often used instead of @)
    if ((directLink.includes('@') || directLink.includes('!')) && !directLink.startsWith('http')) {
      // Replace ! with @ if it's used as a substitute for email
      const email = directLink.includes('!') ? directLink.replace('!', '@') : directLink;
      window.location.href = `mailto:${email}`;
    }
    // Check if it's an absolute URL
    else if (directLink.startsWith('http://') || directLink.startsWith('https://')) {
      window.open(directLink, '_blank');
    }
    // Check if it looks like a website (contains dots but no @)
    else if (directLink.includes('.') && !directLink.includes('@')) {
      const fullUrl = directLink.startsWith('www.') ? `https://${directLink}` : `https://${directLink}`;
      window.open(fullUrl, '_blank');
    }
    // For anything else, treat as email
    else {
      window.location.href = `mailto:${directLink}`;
    }
  };

  return (
    <>
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
                          src={getImageUrl(job.company.logo)}
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
                            <span style={{ fontFamily: 'var(--font-body)' }}>💼 {job.jobType}</span>
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
                        {job.jobType}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium" style={{
                        backgroundColor: 'var(--color-gray-100)',
                        color: 'var(--color-text-secondary)',
                        fontFamily: 'var(--font-body)'
                      }}>
                        {job.experienceLevel}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium" style={{
                        backgroundColor: 'var(--color-gray-100)',
                        color: 'var(--color-text-secondary)',
                        fontFamily: 'var(--font-body)'
                      }}>
                        {job.workType}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium" style={{
                        backgroundColor: 'var(--color-gray-100)',
                        color: 'var(--color-text-secondary)',
                        fontFamily: 'var(--font-body)'
                      }}>
                        {job.interviewType}
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {/* Only show employees info if it exists */}
                    {job.postedBy?.profile?.numberOfEmployees && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>Employees:</span>
                        <span style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                          {job.postedBy.profile.numberOfEmployees}
                        </span>
                      </div>
                    )}
                    {job.company?.website && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>Website:</span>
                        <a
                          href={job.company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {job.company.website}
                        </a>
                      </div>
                    )}
                  </div>
                  {job.company?.website && (
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

                    {/* Salary - only show if available */}
                    {job.salary && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-gray-100)' }}>
                          <span className="text-lg">💰</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>Salary</p>
                          <p className="font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                            {job.salary.min && job.salary.max && job.salary.currency
                              ? `${job.salary.min} - ${job.salary.max} ${job.salary.currency}`
                              : 'Not specified'}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Application Deadline - only show if available */}
                    {job.applicationDeadline && (
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
                    )}

                    {/* Minimum Education - only show if available */}
                    {job.minEducation && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-gray-100)' }}>
                          <span className="text-lg">🎓</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>Minimum Education</p>
                          <p className="font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                            {job.minEducation}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Notice Period - only show if available */}
                    {job.noticePeriod && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-gray-100)' }}>
                          <span className="text-lg">🕒</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>Notice Period</p>
                          <p className="font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                            {job.noticePeriod}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Work Type - only show if available */}
                    {job.workType && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-gray-100)' }}>
                          <span className="text-lg">💻</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>Work Type</p>
                          <p className="font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                            {job.workType}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Interview Type - only show if available */}
                    {job.interviewType && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-gray-100)' }}>
                          <span className="text-lg">🎤</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>Interview Type</p>
                          <p className="font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                            {job.interviewType}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Number of Openings - only show if available */}
                    {(job.numberOfOpenings || job.numberOfOpenings === 0) && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-gray-100)' }}>
                          <span className="text-lg">👥</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>Number of Openings</p>
                          <p className="font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                            {job.numberOfOpenings}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Year of Passing - only show if available */}
                    {job.yearOfPassing && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-gray-100)' }}>
                          <span className="text-lg">🎓</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>Year of Passing</p>
                          <p className="font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                            {job.yearOfPassing}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Walk-in Details (conditional) */}
                    {job.interviewType === 'Walk-in' && (
                      <>
                        {/* Walk-in Date - only show if available */}
                        {job.walkInDate && (
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-gray-100)' }}>
                              <span className="text-lg">🗓️</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>Walk-in Date</p>
                              <p className="font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                                {new Date(job.walkInDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Walk-in Time - only show if available */}
                        {job.walkInTime && (
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-gray-100)' }}>
                              <span className="text-lg">⏰</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>Walk-in Time</p>
                              <p className="font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                                {job.walkInTime}
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    )}
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
                    {isDirectApplication ? 'Apply Directly' : 'Apply for this Job'}
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
                    <>
                      {/* Show Apply for Job button for all jobs */}
                      <button
                        onClick={handleApply}
                        disabled={applying}
                        className="w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg mb-3"
                        style={{
                          backgroundColor: applying ? 'var(--color-gray-300)' : 'var(--color-primary)',
                          color: applying ? 'var(--color-text-muted)' : 'var(--color-text-white)',
                          fontFamily: 'var(--font-body)',
                          cursor: applying ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {applying ? 'Applying...' : 'Apply for Job'}
                      </button>

                      {/* Show Apply Direct button only when directLink exists */}
                      {isDirectApplication && (
                        <button
                          onClick={handleDirectApply}
                          className="w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                          style={{
                            backgroundColor: 'var(--color-accent)',
                            color: 'var(--color-text-white)',
                            fontFamily: 'var(--font-body)',
                            cursor: 'pointer'
                          }}
                        >
                          Apply Direct
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewJobs;