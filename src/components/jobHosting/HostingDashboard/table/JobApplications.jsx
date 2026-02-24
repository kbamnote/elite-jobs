import React, { useState, useEffect } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight, User } from "lucide-react";
import { getHosterJobs, applicantDetail } from "../../../utils/Api";
import { useNavigate } from "react-router-dom";

const JobApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHosterJobs();
  }, []);

  const fetchHosterJobs = async () => {
    try {
      setJobsLoading(true);
      const response = await getHosterJobs();
      if (response.data.success) {
        setJobs(response.data.data.jobs);
        // Fetch applications for each job
        await fetchAllApplications(response.data.data.jobs);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setJobsLoading(false);
    }
  };

  const fetchAllApplications = async (jobsList) => {
    try {
      setLoading(true);
      const allApplications = [];
      
      // Fetch applications for each job
      for (const job of jobsList) {
        try {
          const response = await applicantDetail(job._id);
          if (response.data.success) {
            // Add job info to each application
            response.data.data.forEach(app => {
              allApplications.push({
                ...app,
                jobId: job._id,
                jobTitle: job.title,
                company: job.company?.name || "N/A"
              });
            });
          }
        } catch (err) {
          console.error(`Error fetching applications for job ${job._id}:`, err);
        }
      }
      
      setApplications(allApplications);
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "rejected":
        return "bg-red-100 text-red-700 border border-red-200";
      case "interview":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "reviewed":
        return "bg-amber-100 text-amber-700 border border-amber-200";
      case "pending":
        return "bg-gray-100 text-gray-600 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  const handleViewApplicant = (application) => {
    navigate(`/hosting/applicants/${application.jobId}/${application._id}`);
  };

  const handlePageChange = (newPage) => {
    // For now, we're not implementing pagination
    console.log("Page change to:", newPage);
  };

  const PaginationControls = () => (
    <div className="flex items-center justify-between border-t px-4 py-3 sm:px-6" style={{ borderColor: 'var(--color-border)' }}>
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => handlePageChange(1)}
          disabled={true}
          className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-gray-300 cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(2)}
          disabled={true}
          className="ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-gray-300 cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">1</span>{" "}
            to{" "}
            <span className="font-medium">{applications.length}</span>{" "}
            of <span className="font-medium">{applications.length}</span>{" "}
            results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => handlePageChange(1)}
              disabled={true}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 opacity-50 cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold z-10 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ 
                backgroundColor: 'var(--color-accent)', 
                focusVisibleOutlineColor: 'var(--color-accent)' 
              }}
            >
              1
            </button>
            <button
              onClick={() => handlePageChange(2)}
              disabled={true}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 opacity-50 cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = 
      (app.applicantId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicantId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = 
      statusFilter === "all" || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading || jobsLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse" style={{ color: 'var(--color-primary)' }}>
            Loading applications...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-md">
      <div className="p-6">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Job Applications
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{
                  '--focus-ring-color': 'var(--color-accent)',
                  '--focus-border-color': 'var(--color-accent)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--color-accent)';
                  e.target.style.boxShadow = `0 0 0 2px rgba(220, 38, 38, 0.2)`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '';
                  e.target.style.boxShadow = '';
                }}
              >
                <option value="all">All Applications</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="interview">Interview</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
              <div className=" w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search applications..."
                  className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-accent)';
                    e.target.style.boxShadow = `0 0 0 2px rgba(220, 38, 38, 0.2)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '';
                    e.target.style.boxShadow = '';
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full min-w-max">
            <thead style={{ backgroundColor: 'rgba(220, 38, 38, 0.05)' }}>
              <tr>
                {[
                  "Photo",
                  "Date",
                  "Applicant Name",
                  "Email",
                  "Phone No.",
                  "Position",
                  "Resume",
                  "Status",
                ].map((header) => (
                  <th
                    key={header}
                    className="text-left py-4 px-4 text-sm font-medium whitespace-nowrap"
                    style={{ 
                      color: 'var(--color-primary)',
                      backgroundColor: 'rgba(220, 38, 38, 0.05)'
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.map((app, index) => (
                <tr 
                  key={app._id} 
                  className="transition-colors cursor-pointer"
                  onClick={() => handleViewApplicant(app)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '';
                  }}
                >
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {app.applicantId?.profile?.photo ? (
                      <img 
                        src={app.applicantId.profile.photo} 
                        alt={app.applicantId.name} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}>
                        <User className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {app.applicantId?.name || "N/A"}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {app.applicantId?.email || "N/A"}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {app.applicantId?.profile?.phone || "N/A"}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {app.jobTitle || "N/A"}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {app.applicantId?.profile?.resume ? (
                      <a 
                        href={app.applicantId.profile.resume} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="underline"
                        style={{ color: 'var(--color-accent)' }}
                        onMouseEnter={(e) => {
                          e.target.style.color = 'var(--color-primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = 'var(--color-accent)';
                        }}
                      >
                        View Resume
                      </a>
                    ) : (
                      "No Resume"
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusStyle(
                        app.status
                      )}`}
                    >
                      {app.status || "N/A"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredApplications.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No applications found matching your search.
              </p>
            </div>
          )}
        </div>

        <PaginationControls />
      </div>
    </div>
  );
};

export default JobApplications;