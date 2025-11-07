import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobHostingSidebar from "../commonHost/jobHostingSidebar";
import { profile } from "../../../utils/Api";

const HostingProfileForm = () => {
  const navigate = useNavigate();
  const [hoster, setHoster] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await profile();
      const data = response.data.data;
      
      // Map API data to component structure
      setHoster({
        fullName: data.name,
        companyName: data.profile.companyName,
        companyDescription: data.profile.companyDescription,
        companyWebsite: data.profile.companyWebsite,
        companyEmail: data.profile.companyEmail,
        numberOfEmployees: data.profile.numberOfEmployees,
        companyPhone: data.profile.companyPhone,
        phone: data.profile.phone,
        panCardNumber: data.profile.panCardNumber,
        gstNumber: data.profile.gstNumber,
        email: data.email,
        companyLogo: data.profile.companyLogo,
        photo: data.profile.photo, // Add profile photo
        companyDocument: data.profile.companyDocument // Add company document
      });
      
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
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
        {/* Sidebar - Fixed on Left */}
        <div className="w-full lg:w-1/4 h-auto lg:h-screen fixed lg:top-0 left-0 z-50">
          <JobHostingSidebar />
        </div>

        {/* Profile Container - Right Side & Centered */}
        <main className="w-full lg:ml-80 xl:ml-80 p-4 flex justify-center items-center min-h-screen overflow-y-auto">
          <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl overflow-hidden p-4 sm:p-6 md:p-8 border border-gray-200 relative">
            <div className="text-center py-10">
              <p>Loading profile...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
        {/* Sidebar - Fixed on Left */}
        <div className="w-full lg:w-1/4 h-auto lg:h-screen fixed lg:top-0 left-0 z-50">
          <JobHostingSidebar />
        </div>

        {/* Profile Container - Right Side & Centered */}
        <main className="w-full lg:ml-80 xl:ml-80 p-4 flex justify-center items-center min-h-screen overflow-y-auto">
          <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl overflow-hidden p-4 sm:p-6 md:p-8 border border-gray-200 relative">
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
              <button 
                onClick={fetchProfileData}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Sidebar - Fixed on Left */}
      <div className="w-full lg:w-1/4 h-auto lg:h-screen fixed lg:top-0 left-0 z-50">
        <JobHostingSidebar />
      </div>

      {/* Profile Container - Right Side & Centered */}
      <main className="w-full lg:ml-80 xl:ml-80 p-4 flex justify-center items-center min-h-screen overflow-y-auto">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl overflow-hidden p-4 sm:p-6 md:p-8 border border-gray-200 relative">
          {/* Edit Profile Button */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              My Profile
            </h2>
            <button
              onClick={() => navigate("/hosting/profile/edit")}
              className="px-5 py-2.5 btn-accent rounded-lg transition-all hover:shadow-md"
            >
              Edit Profile
            </button>
          </div>

          {/* Profile Header with Cover */}
          <div className="h-32 bg-[#3675AC] rounded-t-2xl"></div>
          
          <div className="px-6 sm:px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16 sm:-mt-12">
              {/* Profile Photo */}
              <div className="relative group mb-4 sm:mb-0">
                <img 
                  src={hoster.photo || "https://placehold.co/150x150"} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                  onError={(e) => { e.target.src = "https://placehold.co/150x150"; }}
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1 sm:pb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {hoster.fullName}
                </h2>
                <p className="text-gray-600 mt-1">
                  {hoster.email}
                </p>
                
                {/* Company Info */}
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-5 h-5 mr-2" style={{ color: 'var(--color-accent)' }}>
                      🏢
                    </span>
                    {hoster.companyName || "Not provided"}
                  </div>
                </div>
              </div>
            </div>

            {/* Company Logo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="w-5 h-5 mr-2 text-gray-400">🏢</span>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Company Logo</p>
                </div>
                <div className="flex items-center">
                  {hoster.companyLogo ? (
                    <img 
                      src={hoster.companyLogo} 
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
                  {hoster.companyDocument ? (
                    <a 
                      href={hoster.companyDocument} 
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
                  {hoster.companyPhone || "Not provided"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="w-5 h-5 mr-2 text-gray-400">👤</span>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Personal Phone</p>
                </div>
                <p className="font-medium text-gray-900">
                  {hoster.phone || "Not provided"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="w-5 h-5 mr-2 text-gray-400">✉️</span>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Company Email</p>
                </div>
                <p className="font-medium text-gray-900">
                  {hoster.companyEmail || "Not provided"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="w-5 h-5 mr-2 text-gray-400">🌐</span>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Company Website</p>
                </div>
                <p className="font-medium text-gray-900">
                  {hoster.companyWebsite || "Not provided"}
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
                  {hoster.numberOfEmployees || "Not provided"}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="w-5 h-5 mr-2 text-gray-400">💳</span>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">PAN Card</p>
                </div>
                <p className="font-medium text-gray-900">
                  {hoster.panCardNumber || "Not provided"}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="w-5 h-5 mr-2 text-gray-400">📜</span>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">GST Number</p>
                </div>
                <p className="font-medium text-gray-900">
                  {hoster.gstNumber || "Not provided"}
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
                  {hoster.companyDescription || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HostingProfileForm;