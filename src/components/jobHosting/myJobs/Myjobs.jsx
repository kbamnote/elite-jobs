import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobHostingSidebar from "../commonHost/jobHostingSidebar";
import { Briefcase, MapPin, Users, Trash2, UserCheck, IndianRupee } from "lucide-react";
import { getHosterJobs, deleteJob } from "../../../utils/Api";

const Badge = ({ children, variant = "default", className = "" }) => {
  const baseStyles = "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-200";

  const variantStyles = {
    default: "ring-1 ring-opacity-10",
    secondary: "bg-purple-50 text-purple-700 ring-1 ring-purple-600/10",
    outline: "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50",
  };

  return (
    <span 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={variant === 'default' ? { 
        backgroundColor: '#fef2f2', 
        color: 'var(--color-accent)',
        borderColor: 'var(--color-accent)'
      } : {}}
    >
      {children}
    </span>
  );
};

const MyJobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHosterJobs();
  }, []);

  const fetchHosterJobs = async () => {
    try {
      setLoading(true);
      const response = await getHosterJobs();
      if (response.data.success) {
        setJobs(response.data.data.jobs);
      } else {
        setError("Failed to fetch jobs");
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Error fetching jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewApplicants = (jobId) => {
    navigate(`/hosting/applicants/${jobId}`);
  };

  const setDeleteJobId = (jobId) => {
    setSelectedJob(jobId);
    setShowDeletePopup(true);
  };

  const handleDeleteJob = async () => {
    try {
      setDeleting(true);
      await deleteJob(selectedJob);
      // Remove the deleted job from the state
      setJobs(jobs.filter(job => job._id !== selectedJob));
      setShowDeletePopup(false);
      setSelectedJob(null);
    } catch (err) {
      console.error("Error deleting job:", err);
      setError("Failed to delete job. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  // Loading skeleton component
  const renderLoadingSkeleton = () => {
    return (
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="text-center px-2 mb-8">
          <div className="h-8 bg-[var(--color-border)] rounded w-64 mx-auto mb-2"></div>
          <div className="h-4 bg-[var(--color-border)] rounded w-80 mx-auto"></div>
        </div>

        {/* Job cards skeleton */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden border border-gray-200">
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-6 bg-[var(--color-border)] rounded w-3/4"></div>
                  <div className="h-6 w-20 bg-[var(--color-border)] rounded"></div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center">
                      <div className="h-5 w-5 bg-[var(--color-border)] rounded mr-2"></div>
                      <div className="h-4 bg-[var(--color-border)] rounded w-1/2"></div>
                    </div>
                  ))}
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-6 w-16 bg-[var(--color-border)] rounded"></div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className="h-10 flex-1 bg-[var(--color-border)] rounded"></div>
                  <div className="h-10 w-10 bg-[var(--color-border)] rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
        {/* Sidebar */}
        <div className="w-[10px] lg:w-1/4 h-screen fixed top-0 left-0">
          <JobHostingSidebar />
        </div>

        {/* Main content */}
        <main className="w-full lg:ml-72 xl:ml-80 p-3 sm:p-4 lg:p-6 xl:p-4 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            {renderLoadingSkeleton()}
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
        {/* Sidebar */}
        <div className="w-[10px] lg:w-1/4 h-screen fixed top-0 left-0">
          <JobHostingSidebar />
        </div>

        {/* Main content */}
        <main className="w-full lg:ml-72 xl:ml-80 p-3 sm:p-4 lg:p-6 xl:p-4 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            <header className="text-center px-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-600">My Job Listings</h1>
              <p className="text-gray-600 mt-2">Manage and track your posted job opportunities</p>
            </header>

            <div className="sm:p-6 p-2">
              <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <p style={{ color: 'var(--color-accent)' }}>{error}</p>
                <button 
                  onClick={fetchHosterJobs}
                  className="mt-4 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors duration-200"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Sidebar */}
      <div className="w-[10px] lg:w-1/4 h-screen fixed top-0 left-0">
        <JobHostingSidebar />
      </div>

      {/* Main content */}
      <main className="w-full lg:ml-72 xl:ml-80 p-3 sm:p-4 lg:p-6 xl:p-4 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          <header className="text-center px-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-600">My Job Listings</h1>
            <p className="text-gray-600 mt-2">Manage and track your posted job opportunities</p>
          </header>

          <div className="sm:p-6 p-2">
            {jobs.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-6 sm:p-12 text-center max-w-2xl mx-auto">
                <Briefcase className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6" style={{ color: 'var(--color-accent)' }} />
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">No Jobs Posted Yet</h2>
                <p className="text-gray-600 mb-6 sm:mb-8">Start creating job listings to find the perfect candidates.</p>
                <button
                  onClick={() => navigate('/hosting/post-job')}
                  className="text-white px-6 sm:px-8 py-3 rounded-lg hover:opacity-90 transition-colors duration-200"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  Post Your First Job
                </button>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  {jobs.map((job) => (
                    <div
                      key={job._id}
                      className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col h-full"
                    >
                      <div className="p-4 sm:p-6 flex flex-col flex-grow">
                        <div className="flex items-start justify-between mb-6">
                          <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                          <span className="ml-4 px-3 py-1 text-sm font-medium rounded-full" style={{ backgroundColor: '#fef2f2', color: 'var(--color-accent)' }}>
                            {job.jobType}
                          </span>
                        </div>

                        <div className="space-y-4 mb-8 flex-grow">
                          <div className="flex items-center text-gray-700">
                            <Briefcase className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                            <span className="font-medium">{job.company?.name || "N/A"}</span>
                          </div>

                          <div className="flex items-start text-gray-600">
                            <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                            <div className="ml-2">
                              {Array.isArray(job.location) ? (
                                job.location.map((loc, index) => (
                                  <span key={index}>
                                    {loc}
                                    {index < job.location.length - 1 && ", "}
                                  </span>
                                ))
                              ) : (
                                <span>{job.location || "Not specified"}</span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center text-gray-600">
                            <IndianRupee className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                            <span>{job.salary?.min} - {job.salary?.max} {job.salary?.currency}</span>
                          </div>

                          <div className="flex items-center text-gray-600">
                            <Users className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                            <span>{job.category}</span>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-6">
                            {job.skills?.map((skill, index) => (
                              <span 
                                key={index}
                                className="px-3 py-1 text-sm bg-gray-50 text-gray-700 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 pt-6 border-t border-gray-100 mt-auto">
                          <button
                            onClick={() => handleViewApplicants(job._id)}
                            className="flex-1 flex items-center justify-center gap-2 text-white px-6 py-2.5 rounded-lg hover:opacity-90 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
                            style={{ backgroundColor: 'var(--color-accent)' }}
                          >
                            <Users className="w-4 h-4" />
                            View Applicants 
                          </button>

                          <button
                            onClick={() => setDeleteJobId(job._id)}
                            className="p-2.5 hover:bg-opacity-10 rounded-lg transition-colors duration-200 border border-opacity-20"
                            style={{ 
                              color: 'var(--color-accent)', 
                              borderColor: 'var(--color-accent)',
                              backgroundColor: 'transparent'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#fef2f2'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Delete Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 max-w-md w-full mx-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Delete Job Listing</h2>
            <p className="text-gray-600 mb-6 sm:mb-8">Are you sure you want to delete this job listing? This action cannot be undone.</p>
            <div className="flex gap-3 sm:gap-4">
              <button
                onClick={handleDeleteJob}
                disabled={deleting}
                className="flex-1 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:opacity-90 transition-colors duration-200 font-medium"
                style={{ backgroundColor: 'var(--color-accent)' }}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
              <button
                onClick={() => setShowDeletePopup(false)}
                className="flex-1 bg-gray-100 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyJobs;