import React, { useState, useEffect } from "react";
import Header from "../commonSeeker/Header";
import Footer from "../commonSeeker/Footer";
import { Link, useNavigate } from "react-router-dom";
import { profile, updateProfile, uploadFileSeeker, updatephotoSeeker, updateresumeSeeker, appliedJobs, accountDelete } from "../../../utils/Api";
import { 
  Edit, 
  Trash2, 
  Camera, 
  Phone, 
  MapPin, 
  Calendar, 
  FileText, 
  Briefcase, 
  BookOpen, 
  CheckCircle, 
  AlertTriangle, 
  Loader,
  Upload,
  Plus
} from "lucide-react";

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
      // Check if user already has a profile photo
      const response = await profile();
      const hasExistingPhoto = response.data.data.profile.photo;
      
      let result;
      if (hasExistingPhoto) {
        // Update existing photo
        result = await updatephotoSeeker(formData);
      } else {
        // Initial upload
        result = await uploadFileSeeker(formData);
      }

      setUserData({
        ...userData,
        profile: {
          ...userData.profile,
          photo: result.data.data.profile.photo
        }
      });
      setPhotoPreview(result.data.data.profile.photo);
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
      // Check if user already has a resume
      const response = await profile();
      const hasExistingResume = response.data.data.profile.resume;
      
      let result;
      if (hasExistingResume) {
        // Update existing resume
        result = await updateresumeSeeker(formData);
      } else {
        // Initial upload
        result = await uploadFileSeeker(formData);
      }

      setUserData({
        ...userData,
        profile: {
          ...userData.profile,
          resume: result.data.data.profile.resume
        }
      });
      setResumePreview(result.data.data.profile.resume);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="flex flex-col items-center justify-center">
              <Loader className="h-12 w-12 animate-spin text-gray-900 mb-4" />
              <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>Loading your profile...</p>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <p className="text-red-600 text-lg mb-6" style={{ fontFamily: 'var(--font-body)' }}>{error}</p>
              <button 
                onClick={fetchProfileData}
                className="px-6 py-2.5 btn-accent rounded-lg transition-all"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Try Again
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
                My Profile
              </h1>
              <p className="mt-1 text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                Manage your personal information and job applications
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/user-detail">
                <button 
                  className="px-5 py-2.5 btn-accent rounded-lg transition-all hover:shadow-md flex items-center"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              </Link>
              <button 
                onClick={handleDelete} 
                className="px-5 py-2.5 bg-white border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all flex items-center"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-start" style={{ fontFamily: 'var(--font-body)' }}>
            <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
            {message}
          </div>
        )}

        {/* Main Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          {/* Profile Header with Cover */}
          <div className="h-32 bg-[#3675AC]"></div>
          
          <div className="px-6 sm:px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16 sm:-mt-12">
              {/* Profile Photo */}
              <div className="relative group mb-4 sm:mb-0">
                <img 
                  src={photoPreview || "https://placehold.co/150x150"} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                  onError={(e) => { e.target.src = "https://placehold.co/150x150"; }}
                />
                <label className="absolute inset-0 flex items-center justify-center bg-opacity-0 group-hover:bg-opacity-50 rounded-2xl cursor-pointer transition-all">
                  <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Profile Info */}
              <div className="flex-1 sm:pb-4">
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
                  {userData.name}
                </h2>
                <p className="text-gray-600 mt-1" style={{ fontFamily: 'var(--font-body)' }}>
                  {userData.email}
                </p>
                
                {/* Quick Stats */}
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="w-5 h-5 mr-2" style={{ color: 'var(--color-accent)' }} />
                    {userData.profile.designation || "Not provided"}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FileText className="w-5 h-5 mr-2" style={{ color: 'var(--color-accent)' }} />
                    {applications.length} applications
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Phone className="w-5 h-5 mr-2 text-gray-400" />
                  <p className="text-xs text-gray-500 uppercase tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>Phone</p>
                </div>
                <p className="font-medium text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
                  {userData.profile.phone || "Not provided"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                  <p className="text-xs text-gray-500 uppercase tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>Location</p>
                </div>
                <p className="font-medium text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
                  {userData.profile.address || "Not provided"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                  <p className="text-xs text-gray-500 uppercase tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>Age</p>
                </div>
                <p className="font-medium text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
                  {userData.profile.age || "Not provided"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <FileText className="w-5 h-5 mr-2 text-gray-400" />
                  <p className="text-xs text-gray-500 uppercase tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>Resume</p>
                </div>
                {userData.profile.resume ? (
                  <div className="flex items-center space-x-4">
                    <a 
                      href={userData.profile.resume} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium hover:underline"
                      style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-body)' }}
                    >
                      View Document
                    </a>
                    <label className="font-medium cursor-pointer hover:underline" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-body)' }}>
                      Update
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx" 
                        onChange={handleResumeChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <label className="font-medium cursor-pointer hover:underline" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-body)' }}>
                    Upload Now
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
            
            {/* Additional Profile Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                  <p className="text-xs text-gray-500 uppercase tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>Gender</p>
                </div>
                <p className="font-medium text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
                  {userData.profile.gender || "Not provided"}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                  <p className="text-xs text-gray-500 uppercase tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>Preferred Location</p>
                </div>
                <p className="font-medium text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
                  {userData.profile.preferredLocation || "Not provided"}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Briefcase className="w-5 h-5 mr-2 text-gray-400" />
                  <p className="text-xs text-gray-500 uppercase tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>Experience Level</p>
                </div>
                <p className="font-medium text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
                  {userData.profile.expInWork || "Not provided"}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <BookOpen className="w-5 h-5 mr-2 text-gray-400" />
                  <p className="text-xs text-gray-500 uppercase tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>Highest Education</p>
                </div>
                <p className="font-medium text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
                  {userData.profile.highestEducation || "Not provided"}
                </p>
              </div>
            </div>
            
            {/* Salary and Notice Period */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="text-lg mr-2">💰</span>
                  <p className="text-xs text-gray-500 uppercase tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>Salary Expectation</p>
                </div>
                <p className="font-medium text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
                  {userData.profile.salaryExpectation || "Not provided"}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                  <p className="text-xs text-gray-500 uppercase tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>Notice Period</p>
                </div>
                <p className="font-medium text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
                  {userData.profile.noticePeriod || "Not provided"}
                </p>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="text-lg mr-2">🔗</span>
                  <p className="text-xs text-gray-500 uppercase tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>GitHub</p>
                </div>
                {userData.profile.githubUrl ? (
                  <a 
                    href={userData.profile.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:underline"
                    style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-body)' }}
                  >
                    View Profile
                  </a>
                ) : (
                  <p className="font-medium text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
                    Not provided
                  </p>
                )}
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="text-lg mr-2">🔗</span>
                  <p className="text-xs text-gray-500 uppercase tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>LinkedIn</p>
                </div>
                {userData.profile.linkedinUrl ? (
                  <a 
                    href={userData.profile.linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:underline"
                    style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-body)' }}
                  >
                    View Profile
                  </a>
                ) : (
                  <p className="font-medium text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
                    Not provided
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Skills, Education, Experience */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
                  Skills & Expertise
                </h3>
                <Link to="/user-detail">
                  <button className="text-sm px-3 py-1.5 rounded-lg hover:bg-gray-50" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-body)' }}>
                    Edit
                  </button>
                </Link>
              </div>
              {userData.profile.skills && userData.profile.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {userData.profile.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:shadow-md"
                      style={{ 
                        backgroundColor: 'var(--color-accent-light)', 
                        color: 'var(--color-accent-dark)',
                        fontFamily: 'var(--font-body)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <FileText className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-500 mb-2" style={{ fontFamily: 'var(--font-body)' }}>No skills added yet</p>
                  <Link to="/user-detail">
                    <button className="text-sm px-4 py-2 rounded-lg btn-accent inline-flex items-center" style={{ fontFamily: 'var(--font-body)' }}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Skills
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
                  Education
                </h3>
                <Link to="/user-detail">
                  <button className="text-sm px-3 py-1.5 rounded-lg hover:bg-gray-50" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-body)' }}>
                    Edit
                  </button>
                </Link>
              </div>
              {userData.profile.education && userData.profile.education.length > 0 ? (
                <div className="space-y-4">
                  {userData.profile.education.map((edu, index) => (
                    <div key={index} className="border-l-4 pl-4 py-2" style={{ borderColor: 'var(--color-accent)' }}>
                      <h4 className="font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
                        {edu.degree}
                      </h4>
                      <p className="text-gray-700 font-medium mt-1" style={{ fontFamily: 'var(--font-body)' }}>
                        {edu.institution}
                      </p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <span className="mr-3">{edu.field}</span>
                        <span>•</span>
                        <span className="ml-3">
                          {formatDateString(edu.startDate)} - {edu.endDate ? formatDateString(edu.endDate) : 'Present'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <BookOpen className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-500 mb-2" style={{ fontFamily: 'var(--font-body)' }}>No education details added yet</p>
                  <Link to="/user-detail">
                    <button className="text-sm px-4 py-2 rounded-lg btn-accent inline-flex items-center" style={{ fontFamily: 'var(--font-body)' }}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Education
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Work Experience Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
                  Work Experience
                </h3>
                <Link to="/user-detail">
                  <button className="text-sm px-3 py-1.5 rounded-lg hover:bg-gray-50" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-body)' }}>
                    Edit
                  </button>
                </Link>
              </div>
              {userData.profile.experience && userData.profile.experience.length > 0 ? (
                <div className="space-y-6">
                  {userData.profile.experience.map((exp, index) => (
                    <div key={index} className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-l-0 last:pb-0">
                      <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></div>
                      <h4 className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                        {exp.position}
                      </h4>
                      <p className="text-gray-700 font-medium mt-1" style={{ fontFamily: 'var(--font-body)' }}>
                        {exp.company}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDateString(exp.startDate)} - {exp.endDate ? formatDateString(exp.endDate) : 'Present'}
                      </p>
                      {exp.description && (
                        <p className="mt-3 text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <Briefcase className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-500 mb-2" style={{ fontFamily: 'var(--font-body)' }}>No work experience added yet</p>
                  <Link to="/user-detail">
                    <button className="text-sm px-4 py-2 rounded-lg btn-accent inline-flex items-center" style={{ fontFamily: 'var(--font-body)' }}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Experience
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Applications */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
                  Recent Applications
                </h3>
                <Link to="/my-jobs">
                  <button className="text-sm px-3 py-1.5 rounded-lg hover:bg-gray-50" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-body)' }}>
                    View All
                  </button>
                </Link>
              </div>
              
              {applicationsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader className="h-8 w-8 animate-spin text-gray-900" />
                </div>
              ) : applications.length > 0 ? (
                <div className="space-y-3">
                  {applications.slice(0, 5).map((application) => (
                    // Skip applications with null jobId
                    application.jobId ? (
                      <div 
                        key={application._id} 
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
                            {application.jobId.title || 'Unknown Job'}
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                            application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {application.status}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                          {application.jobId.company?.name || 'Unknown Company'}
                        </p>
                        <p className="text-xs text-gray-500">
                          Applied: {formatDateString(application.appliedAt)}
                        </p>
                      </div>
                    ) : null
                  ))}
                  {applications.length > 5 && (
                    <Link to="/my-jobs">
                      <button className="w-full mt-3 py-2 text-center text-sm rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-body)' }}>
                        View all {applications.length} applications
                      </button>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-16 h-16 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                    No applications yet
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Start applying for jobs to see them here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;