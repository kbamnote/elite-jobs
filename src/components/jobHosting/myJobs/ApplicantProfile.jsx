import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JobHostingSidebar from "../commonHost/jobHostingSidebar";
import { applicantDetailById, applicantStatus } from "../../../utils/Api";
import { ArrowLeft } from "lucide-react";

const ApplicantProfile = () => {
  const { jobId, applicationId } = useParams(); // Now we have both jobId and applicationId
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    if (jobId && applicationId) {
      fetchApplicantProfile();
    }
  }, [jobId, applicationId]);

  const fetchApplicantProfile = async () => {
    try {
      setLoading(true);
      // Using applicantDetailById which fetches /jobs/${jobId}/applications/${applicationId}
      const response = await applicantDetailById(jobId, applicationId);
      if (response.data.success) {
        setApplication({
          ...response.data.data,
        });
      } else {
        setError("Failed to fetch applicant profile");
      }
    } catch (err) {
      console.error("Error fetching applicant profile:", err);
      setError("Error fetching applicant profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setStatusUpdating(true);
      // Using applicationId for the status update
      const response = await applicantStatus(applicationId, { status: newStatus });
      if (response.data.success) {
        setApplication(prev => ({
          ...prev,
          status: newStatus
        }));
      } else {
        setError("Failed to update applicant status");
      }
    } catch (err) {
      console.error("Error updating applicant status:", err);
      setError("Error updating applicant status. Please try again later.");
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <div className="lg:w-1/4 w-0 h-screen fixed">
          <JobHostingSidebar/>
        </div>
        <div className="ml-0 lg:ml-80 flex-1 min-h-screen bg-gray-100 p-2 lg:p-8">
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-2 lg:p-6">
            <div className="flex items-center gap-4 mb-6">
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-teal-600 hover:text-teal-800"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            </div>
            
            <div className="rounded-2xl bg-gradient-to-r from-teal-800 to-teal-500 px-6 py-5 w-full flex justify-between items-center">
              <h2 className="lg:text-3xl text-lg font-bold text-white">Applicant Details</h2>
            </div>

            <div className="lg:p-6 p-2">
              <div className="bg-white rounded-2xl shadow-lg lg:p-6 p-2">
                <div className="flex justify-center items-center h-64">
                  <p className="text-lg text-gray-600">Loading applicant profile...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen">
        <div className="lg:w-1/4 w-0 h-screen fixed">
          <JobHostingSidebar/>
        </div>
        <div className="ml-0 lg:ml-80 flex-1 min-h-screen bg-gray-100 p-2 lg:p-8">
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-2 lg:p-6">
            <div className="flex items-center gap-4 mb-6">
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-teal-600 hover:text-teal-800"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            </div>
            
            <div className="rounded-2xl bg-gradient-to-r from-teal-800 to-teal-500 px-6 py-5 w-full flex justify-between items-center">
              <h2 className="lg:text-3xl text-lg font-bold text-white">Applicant Details</h2>
            </div>

            <div className="lg:p-6 p-2">
              <div className="bg-white rounded-2xl shadow-lg lg:p-6 p-2">
                <div className="bg-red-50 p-6 rounded-xl">
                  <p className="text-red-500">{error}</p>
                  <button 
                    onClick={fetchApplicantProfile}
                    className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-200"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex min-h-screen">
        <div className="lg:w-1/4 w-0 h-screen fixed">
          <JobHostingSidebar/>
        </div>
        <div className="ml-0 lg:ml-80 flex-1 min-h-screen bg-gray-100 p-2 lg:p-8">
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-2 lg:p-6">
            <div className="flex items-center gap-4 mb-6">
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-teal-600 hover:text-teal-800"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            </div>
            
            <div className="rounded-2xl bg-gradient-to-r from-teal-800 to-teal-500 px-6 py-5 w-full flex justify-between items-center">
              <h2 className="lg:text-3xl text-lg font-bold text-white">Applicant Details</h2>
            </div>

            <div className="lg:p-6 p-2">
              <div className="bg-white rounded-2xl shadow-lg lg:p-6 p-2">
                <div className="bg-yellow-50 p-6 rounded-xl text-center">
                  <p className="text-yellow-700">No applicant data found</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const applicant = application.applicantId || {};
  const profile = applicant.profile || {};
  const job = application.jobId || {};

  // Status options for the dropdown
  const statusOptions = ['pending', 'reviewed', 'interview', 'accepted', 'rejected'];

  return (
    <div className="flex min-h-screen">
      <div className="lg:w-1/4 w-0 h-screen fixed">
        <JobHostingSidebar/>
      </div>
      <div className="ml-0 lg:ml-80 flex-1 min-h-screen bg-gray-100 p-2 lg:p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-2 lg:p-6">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-teal-600 hover:text-teal-800"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>
          
          <div className="rounded-2xl bg-gradient-to-r from-teal-800 to-teal-500 px-6 py-5 w-full flex justify-between items-center">
            <h2 className="lg:text-3xl text-lg font-bold text-white">Applicant Details</h2>
            {/* Remove the shortlist button */}
          </div>

          <div className="lg:p-6 p-2">
            <div className="bg-white rounded-2xl shadow-lg lg:p-6 p-2">
              {/* Job Details */}
              <div className="mb-8 bg-blue-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Applied Job Details
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <p className="text-gray-600">Job Title</p>
                    <p className="font-semibold">{job?.title || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Company Name</p>
                    <p className="font-semibold">{job?.company?.name || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Application Date</p>
                    <p className="font-semibold">
                      {application?.appliedAt 
                        ? new Date(application.appliedAt).toLocaleDateString() 
                        : "N/A"}
                    </p>
                  </div>
                  <div className="md:col-span-2 lg:col-span-3">
                    <p className="text-gray-600">Status</p>
                    <div className="flex flex-wrap gap-2 items-center mt-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                        {application?.status || "N/A"}
                      </span>
                      <select
                        value={application?.status || ""}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        disabled={statusUpdating}
                        className="ml-2 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">Update Status</option>
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                      {statusUpdating && (
                        <span className="ml-2 text-gray-500">Updating...</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="mb-8 bg-blue-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <p className="text-gray-600">Full Name</p>
                    <p className="font-semibold">
                      {applicant.name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-semibold">{applicant.email || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <p className="font-semibold">
                      {profile.phone || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Age</p>
                    <p className="font-semibold">{profile.age || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Address</p>
                    <p className="font-semibold">{profile.address || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="mb-8 bg-blue-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Education
                </h3>
                {profile.education && profile.education.length > 0 ? (
                  <div className="space-y-4">
                    {profile.education.map((edu, index) => (
                      <div key={index} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                          <p className="text-gray-600">Institution</p>
                          <p className="font-semibold">{edu.institution || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Degree</p>
                          <p className="font-semibold">{edu.degree || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Field of Study</p>
                          <p className="font-semibold">{edu.fieldOfStudy || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Start Year</p>
                          <p className="font-semibold">{edu.startYear || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">End Year</p>
                          <p className="font-semibold">{edu.endYear || "N/A"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No education information provided</p>
                )}
              </div>

              {/* Experience */}
              <div className="mb-8 bg-blue-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Experience
                </h3>
                {profile.experience && profile.experience.length > 0 ? (
                  <div className="space-y-4">
                    {profile.experience.map((exp, index) => (
                      <div key={index} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                          <p className="text-gray-600">Company</p>
                          <p className="font-semibold">{exp.company || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Position</p>
                          <p className="font-semibold">{exp.position || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Description</p>
                          <p className="font-semibold">{exp.description || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Start Date</p>
                          <p className="font-semibold">
                            {exp.startDate 
                              ? new Date(exp.startDate).toLocaleDateString() 
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">End Date</p>
                          <p className="font-semibold">
                            {exp.endDate 
                              ? new Date(exp.endDate).toLocaleDateString() 
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No experience information provided</p>
                )}
              </div>

              {/* Skills & Links */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(profile.skills) && profile.skills.length > 0 ? (
                      profile.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No skills listed</p>
                    )}
                  </div>
                </div>
                <div className="bg-indigo-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Links
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-600">LinkedIn</p>
                      {profile.linkedinUrl ? (
                        <a
                          href={profile.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {profile.linkedinUrl}
                        </a>
                      ) : (
                        <p className="text-gray-500">No LinkedIn URL provided</p>
                      )}
                    </div>
                    <div>
                      <p className="text-gray-600">GitHub</p>
                      {profile.githubUrl ? (
                        <a
                          href={profile.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {profile.githubUrl}
                        </a>
                      ) : (
                        <p className="text-gray-500">No GitHub URL provided</p>
                      )}
                    </div>
                    <div>
                      <p className="text-gray-600">Resume</p>
                      {profile.resume ? (
                        <a
                          href={profile.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Resume
                        </a>
                      ) : (
                        <p className="text-gray-500">No resume uploaded</p>
                      )}
                    </div>
                    <div>
                      <p className="text-gray-600">Photo</p>
                      {profile.photo ? (
                        <a
                          href={profile.photo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Photo
                        </a>
                      ) : (
                        <p className="text-gray-500">No photo uploaded</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Status */}
              <div className="mt-8 bg-blue-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Application Status
                </h3>
                <p className="font-semibold text-green-600">
                  {application?.status || "Under Review"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfile;