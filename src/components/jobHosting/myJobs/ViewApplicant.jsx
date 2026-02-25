import React, { useState, useEffect } from "react";
import { User, Mail, MapPin, FileText, Calendar, ArrowLeft, UserCircle } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import JobHostingSidebar from "../commonHost/jobHostingSidebar";
import { applicantDetail } from "../../../utils/Api";

const ViewApplicant = () => {
  const { id: jobId } = useParams(); // Changed from { jobId } to { id: jobId } to match the route parameter
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("all"); // Changed from shortlisted to status-based filtering
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (jobId) {
      fetchApplicantDetails();
    }
  }, [jobId]);

  const fetchApplicantDetails = async () => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      
      // Add a timeout to detect hanging requests
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 10000); // 10 second timeout
      });
      
      // Using applicantDetail which fetches /jobs/${jobId}/applications
      const response = await Promise.race([
        applicantDetail(jobId),
        timeoutPromise
      ]);
      
      if (response.data.success) {
        setApplicants(response.data.data);
      } else {
        setError("Failed to fetch applicants");
      }
    } catch (err) {
      if (err.message === 'Request timeout') {
        setError("Request timed out. Please try again later.");
      } else {
        setError("Error fetching applicants. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = (application) => {
    navigate(`/hosting/applicants/${jobId}/${application._id}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Loading skeleton component
  const renderLoadingSkeleton = () => {
    return (
      <div className="animate-pulse">
        {/* Back button skeleton */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-10 w-20 bg-[var(--color-border)] rounded"></div>
        </div>
        
        {/* Header skeleton */}
        <div className="bg-white rounded-xl shadow-md lg:p-6 p-2 mb-8">
          <div className="h-8 bg-[var(--color-border)] rounded w-48 mx-auto"></div>
          
          {/* Tab navigation skeleton */}
          <div className="flex flex-wrap gap-4 mt-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="h-8 w-24 bg-[var(--color-border)] rounded"></div>
            ))}
          </div>
        </div>
        
        {/* Applicant cards skeleton */}
        <div className="grid md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[var(--color-border)]"></div>
                <div>
                  <div className="h-6 bg-[var(--color-border)] rounded w-32 mb-2"></div>
                  <div className="h-4 bg-[var(--color-border)] rounded w-40"></div>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-5 w-5 bg-[var(--color-border)] rounded"></div>
                    <div className="h-4 bg-[var(--color-border)] rounded w-3/4"></div>
                  </div>
                ))}
              </div>
              
              <div className="h-10 bg-[var(--color-border)] rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <div className="lg:w-1/4 w-0 h-screen fixed">
          <JobHostingSidebar />
        </div>

        <div className="ml-0 lg:ml-80 flex-1 min-h-screen p-2 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {renderLoadingSkeleton()}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <div className="lg:w-1/4 w-0 h-screen fixed">
          <JobHostingSidebar />
        </div>

        <div className="ml-0 lg:ml-80 flex-1 min-h-screen p-2 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 hover:opacity-80"
                style={{ color: 'var(--color-accent)' }}
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-md lg:p-6 p-2 mb-8">
              <h1 className="lg:text-3xl text-xl lg:text-left text-center font-bold" style={{ color: 'var(--color-accent)' }}>
                Job Applicants
              </h1>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p style={{ color: 'var(--color-accent)' }}>{error}</p>
              <button 
                onClick={fetchApplicantDetails}
                className="mt-4 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-200"
                style={{ backgroundColor: 'var(--color-accent)' }}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Filter applicants based on view mode (status)
  const filteredApplicants = viewMode === "all" 
    ? applicants
    : applicants.filter(app => app.status === viewMode);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="lg:w-1/4 w-0 h-screen fixed">
        <JobHostingSidebar />
      </div>

      <div className="ml-0 lg:ml-80 flex-1 min-h-screen p-2 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Back button and Header Section */}
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 hover:opacity-80"
              style={{ color: 'var(--color-accent)' }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-md lg:p-6 p-2 mb-8">
            <h1 className="lg:text-3xl text-xl lg:text-left text-center font-bold" style={{ color: 'var(--color-accent)' }}>
              View Applicant
            </h1>

            {/* Tab Navigation - Status based */}
            <div className="flex flex-wrap gap-4 mt-6">
              <button
                className={`px-4 py-2 font-semibold transition-all duration-200 rounded-lg ${
                  viewMode === "all"
                    ? "text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                style={viewMode === "all" ? { backgroundColor: 'var(--color-accent)' } : {}}
                onClick={() => setViewMode("all")}
              >
                All Applicants
              </button>
              <button
                className={`px-4 py-2 font-semibold transition-all duration-200 rounded-lg ${
                  viewMode === "pending"
                    ? "text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                style={viewMode === "pending" ? { backgroundColor: 'var(--color-accent)' } : {}}
                onClick={() => setViewMode("pending")}
              >
                Pending
              </button>
              <button
                className={`px-4 py-2 font-semibold transition-all duration-200 rounded-lg ${
                  viewMode === "reviewed"
                    ? "text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                style={viewMode === "reviewed" ? { backgroundColor: 'var(--color-accent)' } : {}}
                onClick={() => setViewMode("reviewed")}
              >
                Reviewed
              </button>
              <button
                className={`px-4 py-2 font-semibold transition-all duration-200 rounded-lg ${
                  viewMode === "interview"
                    ? "text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                style={viewMode === "interview" ? { backgroundColor: 'var(--color-accent)' } : {}}
                onClick={() => setViewMode("interview")}
              >
                Interview
              </button>
              <button
                className={`px-4 py-2 font-semibold transition-all duration-200 rounded-lg ${
                  viewMode === "accepted"
                    ? "text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                style={viewMode === "accepted" ? { backgroundColor: 'var(--color-accent)' } : {}}
                onClick={() => setViewMode("accepted")}
              >
                Accepted
              </button>
              <button
                className={`px-4 py-2 font-semibold transition-all duration-200 rounded-lg ${
                  viewMode === "rejected"
                    ? "text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                style={viewMode === "rejected" ? { backgroundColor: 'var(--color-accent)' } : {}}
                onClick={() => setViewMode("rejected")}
              >
                Rejected
              </button>
            </div>
          </div>

          <div className="mt-6">
            {filteredApplicants.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <p className="text-lg text-gray-600">
                  {viewMode === "all"
                    ? "No applicants yet."
                    : `No ${viewMode} applicants found.`}
                </p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredApplicants.map((application) => (
                    <div
                      key={application._id}
                      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
                    >
                      <div className="flex items-center gap-4">
                        {/* Display photo or icon if photo is empty */}
                        {application?.applicantId?.profile?.photo ? (
                          <img 
                            src={application.applicantId.profile.photo} 
                            alt={application.applicantId.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                            <UserCircle className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />
                          </div>
                        )}
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {application?.applicantId?.name || "N/A"}
                          </h3>
                          <p className="text-gray-500">
                            {application?.applicantId?.email || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                       
                        
                        <div className="flex items-center gap-3 text-gray-600">
                          <Calendar className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                          <span>
                            Applied on: {application?.appliedAt 
                              ? new Date(application.appliedAt).toLocaleDateString() 
                              : "N/A"}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-gray-600">
                          <User className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                          <span>
                            Age: {application?.applicantId?.profile?.age || "N/A"}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-gray-600">
                          <User className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                          <span>
                            Gender: {application?.applicantId?.profile?.gender || "N/A"}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-gray-600">
                          <MapPin className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                          <span>
                            Status: 
                            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              {application?.status || "N/A"}
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* Spacer to push button to bottom */}
                      <div className="flex-grow"></div>

                      {/* View Profile button always at the bottom */}
                      <div className="mt-6">
                        <button
                          onClick={() => handleViewProfile(application)}
                          className="w-full px-4 py-2 text-white rounded-lg font-medium hover:opacity-90 transition-all duration-200"
                          style={{ backgroundColor: 'var(--color-accent)' }}
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicant;