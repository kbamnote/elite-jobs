import React, { useState, useEffect } from "react";
import { User, Mail, MapPin, FileText, Calendar, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import JobHostingSidebar from "../commonHost/jobHostingSidebar";
import { applicantDetail } from "../../../utils/Api";

const ViewApplicant = () => {
  const { jobId } = useParams();
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
      // Using applicantDetail which fetches /jobs/${jobId}/applications
      const response = await applicantDetail(jobId);
      if (response.data.success) {
        setApplicants(response.data.data);
      } else {
        setError("Failed to fetch applicants");
      }
    } catch (err) {
      console.error("Error fetching applicants:", err);
      setError("Error fetching applicants. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = (application) => {
    // Navigate to the applicant profile using both jobId and application ID
    navigate(`/hosting/applicant/${jobId}/${application._id}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
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
                className="flex items-center gap-2 text-teal-600 hover:text-teal-800"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-md lg:p-6 p-2 mb-8">
              <h1 className="lg:text-3xl text-xl lg:text-left text-center font-bold text-teal-600">
                Job Applicants
              </h1>
            </div>

            <div className="flex justify-center items-center h-64">
              <p className="text-lg text-gray-600">Loading applicants...</p>
            </div>
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
                className="flex items-center gap-2 text-teal-600 hover:text-teal-800"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-md lg:p-6 p-2 mb-8">
              <h1 className="lg:text-3xl text-xl lg:text-left text-center font-bold text-teal-600">
                Job Applicants
              </h1>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-red-500">{error}</p>
              <button 
                onClick={fetchApplicantDetails}
                className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-200"
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
              className="flex items-center gap-2 text-teal-600 hover:text-teal-800"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-md lg:p-6 p-2 mb-8">
            <h1 className="lg:text-3xl text-xl lg:text-left text-center font-bold text-teal-600">
              {viewMode === "all" ? "All Job Applicants" : `${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Applicants`}
            </h1>

            {/* Tab Navigation - Status based */}
            <div className="flex flex-wrap gap-4 mt-6">
              <button
                className={`px-4 py-2 font-semibold transition-all duration-200 rounded-lg ${
                  viewMode === "all"
                    ? "bg-teal-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setViewMode("all")}
              >
                All Applicants
              </button>
              <button
                className={`px-4 py-2 font-semibold transition-all duration-200 rounded-lg ${
                  viewMode === "pending"
                    ? "bg-teal-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setViewMode("pending")}
              >
                Pending
              </button>
              <button
                className={`px-4 py-2 font-semibold transition-all duration-200 rounded-lg ${
                  viewMode === "reviewed"
                    ? "bg-teal-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setViewMode("reviewed")}
              >
                Reviewed
              </button>
              <button
                className={`px-4 py-2 font-semibold transition-all duration-200 rounded-lg ${
                  viewMode === "interview"
                    ? "bg-teal-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setViewMode("interview")}
              >
                Interview
              </button>
              <button
                className={`px-4 py-2 font-semibold transition-all duration-200 rounded-lg ${
                  viewMode === "accepted"
                    ? "bg-teal-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setViewMode("accepted")}
              >
                Accepted
              </button>
              <button
                className={`px-4 py-2 font-semibold transition-all duration-200 rounded-lg ${
                  viewMode === "rejected"
                    ? "bg-teal-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
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
                        <div className="p-3 bg-teal-100 rounded-xl">
                          <User className="text-teal-600 w-6 h-6" />
                        </div>
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
                          <Mail className="w-5 h-5 text-teal-500" />
                          <span>
                            {application?.applicantId?.email || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                          <FileText className="w-5 h-5 text-teal-500" />
                          <span>
                            Applied on: {application?.appliedAt 
                              ? new Date(application.appliedAt).toLocaleDateString() 
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                          <MapPin className="w-5 h-5 text-teal-500" />
                          <span>Status: 
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
                          className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-all duration-200"
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