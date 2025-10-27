import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobHostingSidebar from "../commonHost/jobHostingSidebar";
import { Briefcase, MapPin, Users, Trash2, UserCheck } from "lucide-react";

const Badge = ({ children, variant = "default", className = "" }) => {
  const baseStyles = "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-200";

  const variantStyles = {
    default: "bg-teal-50 text-teal-700 ring-1 ring-teal-600/10",
    secondary: "bg-purple-50 text-purple-700 ring-1 ring-purple-600/10",
    outline: "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50",
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

const MyJobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const navigate = useNavigate();

  // Static data for design-only mode
  const jobs = [
    {
      _id: "1",
      title: "Senior Frontend Developer",
      companyName: "TechCorp Solutions",
      location: "San Francisco, CA",
      noOfOpeaning: 3,
      jobType: "Full-time",
      skills: ["React", "JavaScript", "TypeScript", "CSS", "Node.js"]
    },
    {
      _id: "2",
      title: "UX/UI Designer",
      companyName: "Design Studio Pro",
      location: "New York, NY",
      noOfOpeaning: 2,
      jobType: "Contract",
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"]
    },
    {
      _id: "3",
      title: "Backend Engineer",
      companyName: "DataFlow Inc",
      location: "Austin, TX",
      noOfOpeaning: 1,
      jobType: "Full-time",
      skills: ["Python", "Django", "PostgreSQL", "AWS", "Docker"]
    },
    {
      _id: "4",
      title: "Product Manager",
      companyName: "Innovation Labs",
      location: "Seattle, WA",
      noOfOpeaning: 1,
      jobType: "Full-time",
      skills: ["Product Strategy", "Agile", "Analytics", "Leadership", "Communication"]
    }
  ];

  const pagination = {
    page: 1,
    limit: 10,
    total: 4,
    totalPages: 1
  };

  const handleViewApplicants = (jobId) => {
    navigate(`/job/${jobId}/applicants`);
  };

  const handleDeleteJob = () => {
    // Simulate job deletion
    console.log("Job deleted:", selectedJob);
    setShowDeletePopup(false);
    setSelectedJob(null);
  };

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
                <Briefcase className="w-12 h-12 sm:w-16 sm:h-16 text-teal-600 mx-auto mb-4 sm:mb-6" />
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">No Jobs Posted Yet</h2>
                <p className="text-gray-600 mb-6 sm:mb-8">Start creating job listings to find the perfect candidates.</p>
                <button
                  onClick={() => navigate('/post-job')}
                  className="bg-teal-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors duration-200"
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
                          <span className="ml-4 px-3 py-1 text-sm font-medium bg-teal-50 text-teal-700 rounded-full">
                            {job.jobType}
                          </span>
                        </div>

                        <div className="space-y-4 mb-8 flex-grow">
                          <div className="flex items-center text-gray-700">
                            <Briefcase className="w-5 h-5 mr-3 text-teal-600" />
                            <span className="font-medium">{job.companyName}</span>
                          </div>

                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-5 h-5 mr-3 text-teal-600" />
                            <span>{job.location}</span>
                          </div>

                          <div className="flex items-center text-gray-600">
                            <Users className="w-5 h-5 mr-3 text-teal-600" />
                            <span>{job.noOfOpeaning} openings</span>
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
                            className="flex-1 flex items-center justify-center gap-2 bg-teal-600 text-white px-6 py-2.5 rounded-lg hover:bg-teal-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
                          >
                            <UserCheck className="w-5 h-5" />
                            View Applicants
                          </button>

                          <button
                            onClick={() => {
                              setSelectedJob(job._id);
                              setShowDeletePopup(true);
                            }}
                            className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 border border-red-200 hover:border-red-300"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {pagination.page < pagination.totalPages && (
                  <div className="mt-8 sm:mt-12 text-center">
                    <button
                      onClick={() => console.log("Load more clicked")}
                      className="bg-white text-teal-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg border border-teal-600 hover:bg-teal-50 transition-colors duration-200 font-medium"
                    >
                      Load More ({jobs.length} of {pagination.total})
                    </button>
                  </div>
                )}
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
                className="flex-1 bg-red-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
              >
                Delete
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