import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JobHostingSidebar from "../commonHost/jobHostingSidebar";
import { applicantDetailById, applicantStatus } from "../../utils/Api";
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, GraduationCap, Briefcase, Link, FileText, UserCircle } from "lucide-react";

const ApplicantProfile = () => {
  const { jobId, id: applicationId } = useParams(); // Changed from { jobId, applicationId } to { jobId, id: applicationId } to match the route parameter
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
      setError(null); // Clear any previous errors
      
      // Add a timeout to detect hanging requests
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 10000); // 10 second timeout
      });
      
      // Using applicantDetailById which fetches /jobs/${jobId}/applications/${applicationId}
      const response = await Promise.race([
        applicantDetailById(jobId, applicationId),
        timeoutPromise
      ]);
      
      if (response.data.success) {
        setApplication({
          ...response.data.data,
        });
      } else {
        setError("Failed to fetch applicant profile");
      }
    } catch (err) {
      if (err.message === 'Request timeout') {
        setError("Request timed out. Please try again later.");
      } else {
        setError("Error fetching applicant profile. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setStatusUpdating(true);
      console.log("Updating applicant status for application ID:", applicationId, "to status:", newStatus);
      // Using applicationId for the status update
      const response = await applicantStatus(applicationId, { status: newStatus });
      console.log("Status update response:", response);
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
      console.error("Error response:", err.response);
      setError("Error updating applicant status. Please try again later.");
    } finally {
      setStatusUpdating(false);
    }
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
        <div className="rounded-2xl px-6 py-5 w-full mb-6">
          <div className="h-8 bg-[var(--color-border)] rounded w-48"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Profile Header skeleton */}
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-[var(--color-border)]"></div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="h-8 bg-[var(--color-border)] rounded w-64 mx-auto md:mx-0 mb-4"></div>
                <div className="h-6 bg-[var(--color-border)] rounded w-48 mx-auto md:mx-0 mb-6"></div>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                  <div className="h-8 w-32 bg-[var(--color-border)] rounded"></div>
                  <div className="h-8 w-40 bg-[var(--color-border)] rounded"></div>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
                  <div className="h-6 bg-[var(--color-border)] rounded w-24"></div>
                  <div className="h-10 w-40 bg-[var(--color-border)] rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Sections skeleton */}
          {[...Array(5)].map((_, sectionIndex) => (
            <div key={sectionIndex} className="mb-8 bg-blue-50 p-6 rounded-xl">
              <div className="h-6 bg-[var(--color-border)] rounded w-40 mb-4"></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, itemIndex) => (
                  <div key={itemIndex}>
                    <div className="h-4 bg-[var(--color-border)] rounded w-20 mb-2"></div>
                    <div className="h-5 bg-[var(--color-border)] rounded w-32"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <div className="lg:w-1/4 w-0 h-screen fixed">
          <JobHostingSidebar/>
        </div>
        <div className="ml-0 lg:ml-80 flex-1 min-h-screen bg-gray-100 p-2 lg:p-8">
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-2 lg:p-6">
            {renderLoadingSkeleton()}
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
                className="flex items-center gap-2 hover:opacity-80"
                style={{ color: 'var(--color-accent)' }}
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            </div>
            
            <div className="rounded-2xl bg-gradient-to-r px-6 py-5 w-full flex justify-between items-center" style={{ background: 'linear-gradient(to right, #c73650, var(--color-accent))' }}>
              <h2 className="lg:text-3xl text-lg font-bold text-white">Applicant Details</h2>
            </div>

            <div className="lg:p-6 p-2">
              <div className="bg-white rounded-2xl shadow-lg lg:p-6 p-2">
                <div className="p-6 rounded-xl" style={{ backgroundColor: '#fef2f2' }}>
                  <p style={{ color: 'var(--color-accent)' }}>{error}</p>
                  <button
                    onClick={fetchApplicantProfile}
                    className="mt-4 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-200"
                    style={{ backgroundColor: 'var(--color-accent)' }}
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
                className="flex items-center gap-2 hover:opacity-80"
                style={{ color: 'var(--color-accent)' }}
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            </div>
            
            <div className="rounded-2xl bg-gradient-to-r px-6 py-5 w-full flex justify-between items-center" style={{ background: 'linear-gradient(to right, #c73650, var(--color-accent))' }}>
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
              className="flex items-center gap-2 hover:opacity-80"
              style={{ color: 'var(--color-accent)' }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>
          
          <div className="rounded-2xl bg-gradient-to-r px-6 py-5 w-full flex justify-between items-center" style={{ background: 'linear-gradient(to right, #c73650, var(--color-accent))' }}>
            <h2 className="lg:text-3xl text-lg font-bold text-white">Applicant Details</h2>
            {/* Remove the shortlist button */}
          </div>

          <div className="lg:p-6 p-2">
            <div className="bg-white rounded-2xl shadow-lg lg:p-6 p-2">
              {/* Profile Header with Photo */}
              <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Photo Section */}
                  <div className="flex-shrink-0">
                    {profile.photo ? (
                      <img 
                        src={profile.photo} 
                        alt={applicant.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full flex items-center justify-center border-4 border-white shadow-lg bg-white">
                        <UserCircle className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  {/* Profile Information */}
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{applicant.name || "N/A"}</h1>
                    <p className="text-gray-600 text-lg mb-4">{applicant.email || "N/A"}</p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                      <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                        <span className="font-medium">Status:</span>
                        <span className="font-bold">{application?.status || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">
                          Applied on: {application?.appliedAt 
                            ? new Date(application.appliedAt).toLocaleDateString() 
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                    
                    {/* Status Update Section */}
                    <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
                      <span className="font-medium text-gray-700">Update Status:</span>
                      <div className="flex items-center gap-2">
                        <select
                          value={application?.status || ""}
                          onChange={(e) => handleStatusChange(e.target.value)}
                          disabled={statusUpdating}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-gray-700"
                          style={{ '--tw-ring-color': 'var(--color-accent)' }}
                        >
                          <option value="">Select Status</option>
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </select>
                        {statusUpdating && (
                          <span className="text-gray-500 text-sm">Updating...</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="mb-8 bg-blue-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <User className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                    <div>
                      <p className="text-gray-600">Full Name</p>
                      <p className="font-semibold">
                        {applicant.name || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                    <div>
                      <p className="text-gray-600">Email</p>
                      <p className="font-semibold">{applicant.email || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                    <div>
                      <p className="text-gray-600">Phone</p>
                      <p className="font-semibold">
                        {profile.phone || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                    <div>
                      <p className="text-gray-600">Age</p>
                      <p className="font-semibold">{profile.age || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                    <div>
                      <p className="text-gray-600">Address</p>
                      <p className="font-semibold">{profile.address || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                    <div>
                      <p className="text-gray-600">Gender</p>
                      <p className="font-semibold">{profile.gender || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                    <div>
                      <p className="text-gray-600">Notice Period</p>
                      <p className="font-semibold">{profile.noticePeriod || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                    <div>
                      <p className="text-gray-600">Designation</p>
                      <p className="font-semibold">{profile.designation || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                    <div>
                      <p className="text-gray-600">Work Experience</p>
                      <p className="font-semibold">{profile.expInWork || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="mb-8 bg-blue-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
                  Education
                </h3>
                {profile.education && profile.education.length > 0 ? (
                  <div className="space-y-4">
                    {profile.education.map((edu, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                            <p className="font-semibold">{edu.field || "N/A"}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Start Date</p>
                            <p className="font-semibold">
                              {edu.startDate 
                                ? new Date(edu.startDate).toLocaleDateString() 
                                : "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">End Date</p>
                            <p className="font-semibold">
                              {edu.endDate 
                                ? new Date(edu.endDate).toLocaleDateString() 
                                : "N/A"}
                            </p>
                          </div>
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
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Briefcase className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
                  Experience
                </h3>
                {profile.experience && profile.experience.length > 0 ? (
                  <div className="space-y-4">
                    {profile.experience.map((exp, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <User className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(profile.skills) && profile.skills.length > 0 ? (
                      profile.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full"
                          style={{ backgroundColor: '#fef2f2', color: 'var(--color-accent)' }}
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
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Link className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
                    Links
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Link className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                      <div>
                        <p className="text-gray-600">LinkedIn</p>
                        {profile.linkedinUrl ? (
                          <a
                            href={profile.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-medium"
                          >
                            {profile.linkedinUrl}
                          </a>
                        ) : (
                          <p className="text-gray-500">No LinkedIn URL provided</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Link className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                      <div>
                        <p className="text-gray-600">GitHub</p>
                        {profile.githubUrl ? (
                          <a
                            href={profile.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-medium"
                          >
                            {profile.githubUrl}
                          </a>
                        ) : (
                          <p className="text-gray-500">No GitHub URL provided</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                      <div>
                        <p className="text-gray-600">Resume</p>
                        {profile.resume ? (
                          <a
                            href={profile.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-medium"
                          >
                            View Resume
                          </a>
                        ) : (
                          <p className="text-gray-500">No resume uploaded</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                      <div>
                        <p className="text-gray-600">Photo</p>
                        {profile.photo ? (
                          <a
                            href={profile.photo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-medium"
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
              </div>

              {/* Additional Information */}
              <div className="mt-8 bg-blue-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Additional Information
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <p className="text-gray-600">Highest Education</p>
                    <p className="font-semibold">{profile.highestEducation || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Preferred Category</p>
                    <p className="font-semibold">{profile.preferredCategory || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Preferred Location</p>
                    <p className="font-semibold">{profile.preferredLocation || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Salary Expectation</p>
                    <p className="font-semibold">{profile.salaryExpectation || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfile;