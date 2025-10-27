import React, { useState, useEffect } from "react";
import Header from "../commonSeeker/Header";
import Footer from "../commonSeeker/Footer";
import { Link, useNavigate } from "react-router-dom";
import { profile, updateProfile, uploadFileSeeker, updatephotoSeeker, updateresumeSeeker, appliedJobs, accountDelete } from "../../../utils/Api";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [resumePreview, setResumePreview] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileData();
    fetchAppliedJobs();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await profile();
      setUserData(response.data.data);
      setPhotoPreview(response.data.data.profile.photo);
      setResumePreview(response.data.data.profile.resume);
      setError("");
    } catch (err) {
      setError("Failed to fetch profile data");
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      setApplicationsLoading(true);
      const response = await appliedJobs();
      setApplications(response.data.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch applied jobs");
      console.error("Error fetching applied jobs:", err);
    } finally {
      setApplicationsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await accountDelete();
        // Redirect to login or home page after deletion
        navigate("/");
      } catch (err) {
        setMessage("Failed to delete account: " + (err.response?.data?.message || "Unknown error"));
        console.error("Error deleting account:", err);
      }
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await updatephotoSeeker(formData);
      setUserData({
        ...userData,
        profile: {
          ...userData.profile,
          photo: response.data.data.profile.photo
        }
      });
      setPhotoPreview(response.data.data.profile.photo);
      setMessage("Profile photo updated successfully!");
    } catch (err) {
      setMessage("Failed to update profile photo: " + (err.response?.data?.message || "Unknown error"));
      console.error("Error updating photo:", err);
    }
  };

  const handleResumeChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await updateresumeSeeker(formData);
      setUserData({
        ...userData,
        profile: {
          ...userData.profile,
          resume: response.data.data.profile.resume
        }
      });
      setResumePreview(response.data.data.profile.resume);
      setMessage("Resume updated successfully!");
    } catch (err) {
      setMessage("Failed to update resume: " + (err.response?.data?.message || "Unknown error"));
      console.error("Error updating resume:", err);
    }
  };

  const formatDateString = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const calculateExperience = (experience) => {
    if (!experience || experience.length === 0) return "0 years";
    
    const latestJob = experience[0];
    const startDate = new Date(latestJob.startDate);
    const endDate = latestJob.endDate ? new Date(latestJob.endDate) : new Date();
    
    const diffTime = Math.abs(endDate - startDate);
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    
    return `${diffYears} ${diffYears === 1 ? 'year' : 'years'}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="text-center py-10">
              <p>Loading profile...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
              <button 
                onClick={fetchProfileData}
                className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Profile</h1>
            <div className="space-x-3">
              <Link to="/user-detail">
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">Edit Profile</button>
              </Link>
              <button 
                onClick={handleDelete} 
                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
              >
                Delete Account
              </button>
            </div>
          </div>

          {message && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg">{message}</div>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Profile Photo */}
            <div className="md:col-span-1">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img 
                    src={photoPreview || "https://placehold.co/150x150"} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                    onError={(e) => { e.target.src = "https://placehold.co/150x150"; }}
                  />
                </div>
                <label className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer">
                  Change Photo
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Profile Details */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{userData.name}</h2>
                <p className="text-gray-600">{userData.email}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{userData.profile.phone || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{userData.profile.address || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">{userData.profile.age || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-medium">{calculateExperience(userData.profile.experience)}</p>
                </div>
              </div>

              {/* Resume Upload */}
              <div className="pt-4">
                <p className="text-sm text-gray-500 mb-2">Resume</p>
                {userData.profile.resume ? (
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <a 
                      href={userData.profile.resume} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:text-teal-800 flex items-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      View Resume
                    </a>
                    <label className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
                      Change
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx" 
                        onChange={handleResumeChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <label className="flex items-center justify-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer py-3">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    Upload Resume
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      onChange={handleResumeChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
            {userData.profile.skills && userData.profile.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {userData.profile.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No skills added yet</p>
            )}
          </div>

          {/* Education */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Education</h3>
              <Link to="/user-detail" className="text-sm text-teal-600 hover:text-teal-800">
                Edit
              </Link>
            </div>
            {userData.profile.education && userData.profile.education.length > 0 ? (
              <div className="space-y-4">
                {userData.profile.education.map((edu, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">
                      {edu.field} • {formatDateString(edu.startDate)} - {edu.endDate ? formatDateString(edu.endDate) : 'Present'}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No education details added yet</p>
                <Link to="/user-detail" className="mt-2 inline-block text-teal-600 hover:text-teal-800">
                  Add Education
                </Link>
              </div>
            )}
          </div>

          {/* Work Experience */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
              <Link to="/user-detail" className="text-sm text-teal-600 hover:text-teal-800">
                Edit
              </Link>
            </div>
            {userData.profile.experience && userData.profile.experience.length > 0 ? (
              <div className="space-y-4">
                {userData.profile.experience.map((exp, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">{exp.position}</h4>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">
                      {formatDateString(exp.startDate)} - {exp.endDate ? formatDateString(exp.endDate) : 'Present'}
                    </p>
                    <p className="mt-2 text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No work experience added yet</p>
                <Link to="/user-detail" className="mt-2 inline-block text-teal-600 hover:text-teal-800">
                  Add Experience
                </Link>
              </div>
            )}
          </div>

          {/* Applied Jobs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">My Applications</h3>
              <Link to="/my-jobs" className="text-teal-600 hover:text-teal-800 text-sm">
                View All
              </Link>
            </div>
            
            {applicationsLoading ? (
              <p>Loading applications...</p>
            ) : applications.length > 0 ? (
              <div className="space-y-3">
                {applications.slice(0, 3).map((application) => (
                  <div 
                    key={application._id} 
                    className="border border-gray-100 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">{application.jobId.title}</h4>
                      <p className="text-gray-600">{application.jobId.company.name}</p>
                      <p className="text-sm text-gray-500">
                        Applied on: {formatDateString(application.appliedAt)}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                      {application.status}
                    </span>
                  </div>
                ))}
                {applications.length > 3 && (
                  <div className="text-center pt-2">
                    <Link to="/my-jobs" className="text-teal-600 hover:text-teal-800 text-sm">
                      View all {applications.length} applications
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">You haven't applied for any jobs yet</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;