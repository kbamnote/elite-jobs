import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobHostingSidebar from "../commonHost/jobHostingSidebar";
import { Pencil } from "lucide-react";
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
        email: data.email
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
                className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
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
          {/* Edit Profile Button with Icon at Top-Right */}
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
            <button
              onClick={() => navigate("/profile-hoster")}
              className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white text-sm sm:text-base font-semibold py-1.5 sm:py-2 px-4 sm:px-6 rounded-lg shadow-md transition duration-200"
            >
              <Pencil size={16} className="sm:w-[18px]" />
              <span className="hidden sm:inline">Edit Profile</span>
            </button>
          </div>

          {/* Profile Image & Info */}
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-6 pt-8 sm:pt-0">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-4 border-teal-400 shadow-lg"
              />
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">{hoster.fullName}</h2>
              <p className="text-gray-500 text-sm mt-1">{hoster.companyName || "Company Representative"}</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-800">My Profile</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {[
                { label: "Full Name", value: hoster.fullName },
                { label: "Email", value: hoster.email },
                { label: "Company Name", value: hoster.companyName },
                { label: "Company Phone", value: hoster.companyPhone },
                { label: "Personal Phone", value: hoster.phone },
                { label: "Company Email", value: hoster.companyEmail },
                { label: "Company Website", value: hoster.companyWebsite },
                { label: "Number of Employees", value: hoster.numberOfEmployees },
                { label: "PAN Card Number", value: hoster.panCardNumber },
                { label: "GST Number", value: hoster.gstNumber },
              ].map(({ label, value }, index) => (
                <div key={index} className="p-2">
                  <p className="text-sm font-semibold text-gray-600">{label}</p>
                  <p className="text-sm sm:text-base font-medium text-gray-800">
                    {value || "Not specified"}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Company Description */}
            {hoster.companyDescription && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">Company Description</h3>
                <p className="text-gray-600 mt-2">
                  {hoster.companyDescription}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HostingProfileForm;