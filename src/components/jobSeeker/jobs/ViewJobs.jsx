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
  const [error, setError] = useState('');
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [userApplications, setUserApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);

  useEffect(() => {
    fetchJobDetails();
    fetchUserProfile();
    fetchUserApplications();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const response = await jobsById(id);
      setJob(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch job details');
      console.error('Error fetching job:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      setProfileLoading(true);
      const response = await profile();
      setUserProfile(response.data.data);
      setProfileLoading(false);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setProfileLoading(false);
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

  const hasUserApplied = () => {
    if (applicationsLoading || !userApplications.length || !job) {
      return false;
    }
    
    return userApplications.some(application => 
      application.jobId && application.jobId._id === job._id
    );
  };

  const handleApply = async () => {
    // Check if user has a resume
    if (!userProfile?.profile?.resume) {
      setApplyError('Please upload your resume in your profile before applying for jobs.');
      return;
    }

    try {
      setApplying(true);
      setApplyError('');
      
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
      setApplySuccess(true);
      // Refresh applications after successful application
      fetchUserApplications();
    } catch (err) {
      setApplyError(err.response?.data?.message || 'Failed to apply for job');
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
        <div className="min-h-screen bg-gray-50 py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center py-10">
              <p>Loading job details...</p>
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
              <button 
                onClick={fetchJobDetails}
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

  const alreadyApplied = hasUserApplied();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <button 
            onClick={handleGoBack}
            className="mb-6 flex items-center text-teal-600 hover:text-teal-800"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Jobs
          </button>
          
          {applySuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 text-center">
              <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
              <p className="text-gray-600 mb-6">Your application has been successfully submitted.</p>
              <button
                onClick={handleGoBack}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Browse More Jobs
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Job Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-start">
                    <img 
                      src={job.company.logo || 'https://placehold.co/80x80'} 
                      alt={job.company.name} 
                      className="w-16 h-16 rounded-lg object-contain"
                      onError={(e) => { e.target.src = 'https://placehold.co/80x80'; }}
                    />
                    <div className="ml-4">
                      <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                      <p className="text-lg text-gray-600">{job.company.name}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm font-medium rounded-full">
                          {job.employmentType}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                          {job.experienceLevel}
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                          {job.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    {alreadyApplied ? (
                      <button
                        disabled
                        className="px-6 py-3 bg-gray-300 text-gray-600 rounded-lg font-medium cursor-not-allowed"
                      >
                        Already Applied
                      </button>
                    ) : (
                      <button
                        onClick={handleApply}
                        disabled={applying || profileLoading || applicationsLoading}
                        className={`px-6 py-3 rounded-lg font-medium ${
                          applying || profileLoading || applicationsLoading
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-teal-600 text-white hover:bg-teal-700'
                        }`}
                      >
                        {applying ? 'Applying...' : 'Apply for Job'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Job Details */}
              <div className="p-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{job.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Salary</p>
                      <p className="font-medium">
                        {job.salary 
                          ? `${job.salary.min} - ${job.salary.max} ${job.salary.currency}`
                          : 'Not specified'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Application Deadline</p>
                      <p className="font-medium">
                        {new Date(job.applicationDeadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Job Description */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
                  <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
                </div>
                
                {/* Requirements */}
                {job.requirements && job.requirements.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
                    <ul className="space-y-2">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Responsibilities */}
                {job.responsibilities && job.responsibilities.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Responsibilities</h2>
                    <ul className="space-y-2">
                      {job.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-gray-700">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Skills */}
                {job.skills && job.skills.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Required Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Company Info */}
                <div className="border-t border-gray-100 pt-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">About {job.company.name}</h2>
                  <p className="text-gray-700 mb-4">{job.company.description}</p>
                  {job.company.website && (
                    <a 
                      href={job.company.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-teal-600 hover:text-teal-800"
                    >
                      Visit Website
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                  )}
                </div>
                
                {/* Apply Button */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      {applyError && (
                        <p className="text-red-500 text-sm">{applyError}</p>
                      )}
                      {profileLoading && (
                        <p className="text-gray-500 text-sm">Checking your profile...</p>
                      )}
                      {!profileLoading && !userProfile?.profile?.resume && (
                        <p className="text-yellow-600 text-sm">
                          Please upload your resume in your profile to apply for jobs.
                        </p>
                      )}
                      {alreadyApplied && (
                        <p className="text-green-600 text-sm">
                          You have already applied for this job. Check your applications for status updates.
                        </p>
                      )}
                      {applicationsLoading && (
                        <p className="text-gray-500 text-sm">Checking application status...</p>
                      )}
                    </div>
                    {alreadyApplied ? (
                      <button
                        disabled
                        className="px-8 py-3 bg-gray-300 text-gray-600 rounded-lg font-medium cursor-not-allowed"
                      >
                        Already Applied
                      </button>
                    ) : (
                      <button
                        onClick={handleApply}
                        disabled={applying || profileLoading || applicationsLoading || (!profileLoading && !userProfile?.profile?.resume)}
                        className={`px-8 py-3 rounded-lg font-medium ${
                          applying || profileLoading || applicationsLoading || (!profileLoading && !userProfile?.profile?.resume)
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-teal-600 text-white hover:bg-teal-700'
                        }`}
                      >
                        {applying ? 'Applying...' : 'Apply for Job'}
                      </button>
                    )}
                  </div>
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