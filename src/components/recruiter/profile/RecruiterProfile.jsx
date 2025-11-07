import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RecruiterSidebar from "../sidebar/RecruiterSidebar";
import { profile } from "../../../utils/Api";

const RecruiterProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profile: {
      companyName: "",
      companyDescription: "",
      companyWebsite: "",
      companyEmail: "",
      numberOfEmployees: "",
      companyPhone: "",
      phone: "",
      panCardNumber: "",
      gstNumber: "",
    }
  });
  
  const [logoPreview, setLogoPreview] = useState("");
  const [documentPreview, setDocumentPreview] = useState("");
  const [photoPreview, setPhotoPreview] = useState(""); // Add profile photo

  useEffect(() => {
    fetchProfileData();
  }, []);

  // Show transient success message for 2s after returning from edit page
  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      // Clear navigation state so message doesn't persist on refresh/back
      navigate('/recruiter/profile', { replace: true, state: {} });
      const timer = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [location.state, navigate]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await profile();
      const data = response.data.data;
      
      setFormData({
        name: data.name,
        email: data.email,
        profile: {
          companyName: data.profile.companyName || "",
          companyDescription: data.profile.companyDescription || "",
          companyWebsite: data.profile.companyWebsite || "",
          companyEmail: data.profile.companyEmail || "",
          numberOfEmployees: data.profile.numberOfEmployees || "",
          companyPhone: data.profile.companyPhone || "",
          phone: data.profile.phone || "",
          panCardNumber: data.profile.panCardNumber || "",
          gstNumber: data.profile.gstNumber || "",
        }
      });
      
      setPhotoPreview(data.profile.photo || ""); // Set profile photo
      setLogoPreview(data.profile.companyLogo || "");
      setDocumentPreview(data.profile.companyDocument || "");
      setError("");
    } catch (err) {
      setError("Failed to fetch profile data");
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <RecruiterSidebar placement="top" />
        <div className="min-h-screen bg-gray-50">
          {/* Main content */}
          <main className="w-full pt-16 p-4 justify-center items-center flex min-h-screen overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 lg:w-[670px] mx-auto">
                <div className="text-center py-10">
                  <p>Loading profile...</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <RecruiterSidebar placement="top" />
        <div className="min-h-screen bg-gray-50">
          {/* Main content */}
          <main className="w-full pt-16 p-4 justify-center items-center flex min-h-screen overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 lg:w-[670px] mx-auto">
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
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <RecruiterSidebar placement="top" />
      <div className="min-h-screen bg-gray-50">
        <main className="w-full pt-16 p-4 justify-center items-center flex min-h-screen overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Header Section */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 sm:px-8 pt-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      My Profile
                    </h1>
                    <p className="mt-1 text-gray-600">
                      Manage your company information
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/recruiter/profile/edit')}
                    className="px-5 py-2.5 btn-accent rounded-lg transition-all hover:shadow-md"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>

              {message && (
                <div className="mx-6 sm:mx-8 mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
                  {message}
                </div>
              )}
              {error && <div className="mx-6 sm:mx-8 mb-6 p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>}

              {/* Main Profile Card */}
              <div className="px-6 sm:px-8 pb-8">
                {/* Profile Header with Cover */}
                <div className="h-32 bg-[#3675AC] rounded-t-2xl"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16 sm:-mt-12">
                  {/* Profile Photo */}
                  <div className="relative group mb-4 sm:mb-0">
                    <img 
                      src={photoPreview || "https://placehold.co/150x150"} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                      onError={(e) => { e.target.src = "https://placehold.co/150x150"; }}
                    />
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 sm:pb-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {formData.name}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {formData.email}
                    </p>
                    
                    {/* Company Info */}
                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-5 h-5 mr-2" style={{ color: 'var(--color-accent)' }}>
                          🏢
                        </span>
                        {formData.profile.companyName || "Not provided"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company Logo and Document */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-8">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="w-5 h-5 mr-2 text-gray-400">🏢</span>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Company Logo</p>
                    </div>
                    <div className="flex items-center">
                      {logoPreview ? (
                        <img 
                          src={logoPreview} 
                          alt="Company Logo" 
                          className="w-16 h-16 rounded-lg object-contain"
                          onError={(e) => { e.target.src = "https://placehold.co/150x150"; }}
                        />
                      ) : (
                        <span className="text-gray-500">Not provided</span>
                      )}
                    </div>
                  </div>

                  {/* Company Document */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="w-5 h-5 mr-2 text-gray-400">📄</span>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Company Document</p>
                    </div>
                    <div className="flex items-center">
                      {documentPreview ? (
                        <a 
                          href={documentPreview} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium hover:underline"
                          style={{ color: 'var(--color-accent)' }}
                        >
                          View Document
                        </a>
                      ) : (
                        <span className="text-gray-500">Not provided</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="w-5 h-5 mr-2 text-gray-400">📞</span>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Company Phone</p>
                    </div>
                    <p className="font-medium text-gray-900">
                      {formData.profile.companyPhone || "Not provided"}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="w-5 h-5 mr-2 text-gray-400">👤</span>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Personal Phone</p>
                    </div>
                    <p className="font-medium text-gray-900">
                      {formData.profile.phone || "Not provided"}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="w-5 h-5 mr-2 text-gray-400">✉️</span>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Company Email</p>
                    </div>
                    <p className="font-medium text-gray-900">
                      {formData.profile.companyEmail || "Not provided"}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="w-5 h-5 mr-2 text-gray-400">🌐</span>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Company Website</p>
                    </div>
                    <p className="font-medium text-gray-900 break-words">
                      {formData.profile.companyWebsite || "Not provided"}
                    </p>
                  </div>
                </div>
                
                {/* Additional Profile Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="w-5 h-5 mr-2 text-gray-400">👥</span>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Employees</p>
                    </div>
                    <p className="font-medium text-gray-900">
                      {formData.profile.numberOfEmployees || "Not provided"}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="w-5 h-5 mr-2 text-gray-400">💳</span>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">PAN Card</p>
                    </div>
                    <p className="font-medium text-gray-900">
                      {formData.profile.panCardNumber || "Not provided"}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="w-5 h-5 mr-2 text-gray-400">📜</span>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">GST Number</p>
                    </div>
                    <p className="font-medium text-gray-900">
                      {formData.profile.gstNumber || "Not provided"}
                    </p>
                  </div>
                </div>
                
                {/* Company Description */}
                <div className="mt-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="w-5 h-5 mr-2 text-gray-400">📝</span>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Company Description</p>
                    </div>
                    <p className="font-medium text-gray-900 whitespace-pre-line">
                      {formData.profile.companyDescription || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default RecruiterProfile;