import React from "react";
import { useNavigate } from "react-router-dom";
import JobHostingSidebar from "../commonHost/jobHostingSidebar";
import { Pencil } from "lucide-react";

const HostingProfileForm = () => {
  const navigate = useNavigate();

  // Static hoster data for design-only mode
  const hoster = {
    fullName: "John Smith",
    city: "New York",
    state: "New York",
    address: "123 Main Street",
    phoneNumber: "+1 (555) 123-4567",
    gender: "Male",
    pincode: "10001",
    country: "United States"
  };

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
              <p className="text-gray-500 text-sm mt-1">Web Developer</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-800">My Profile</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {[ 
                { label: "Full Name", value: hoster.fullName },
                { label: "City", value: hoster.city },
                { label: "State", value: hoster.state },
                { label: "Address", value: hoster.address },
                { label: "Phone Number", value: hoster.phoneNumber },
                { label: "Gender", value: hoster.gender },
                { label: "Pincode", value: hoster.pincode },
                { label: "Country", value: hoster.country },
              ].map(({ label, value }, index) => (
                <div key={index} className="p-2">
                  <p className="text-sm font-semibold text-gray-600">{label}</p>
                  <p className="text-sm sm:text-base font-medium text-gray-800">{value || "Not specified"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HostingProfileForm;