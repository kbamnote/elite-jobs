import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobHostingSidebar from "../commonHost/jobHostingSidebar";
import { profile, updateProfile, updateCompanyLogo, updatephotoCompany, uploadFileHoster } from "../../../utils/Api";

const HostingProfileDetail = () => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
  
  const [photoPreview, setPhotoPreview] = useState("");
  const [logoPreview, setLogoPreview] = useState("");

  useEffect(() => {
    fetchProfileData();
  }, []);

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
      
      setPhotoPreview(data.profile.photo || "");
      setLogoPreview(data.profile.companyLogo || "");
      setError("");
    } catch (err) {
      setError("Failed to fetch profile data");
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested profile fields
    if (name.startsWith("profile.")) {
      const profileField = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          [profileField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await updatephotoCompany(formData);
      setPhotoPreview(response.data.data.profile.photo);
      setMessage("Profile photo updated successfully!");
    } catch (err) {
      setMessage("Failed to update profile photo: " + (err.response?.data?.message || "Unknown error"));
      console.error("Error updating photo:", err);
    }
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("companyLogo", file);

    try {
      const response = await updateCompanyLogo(formData);
      setLogoPreview(response.data.data.profile.companyLogo);
      setMessage("Company logo updated successfully!");
    } catch (err) {
      setMessage("Failed to update company logo: " + (err.response?.data?.message || "Unknown error"));
      console.error("Error updating logo:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    
    try {
      // Prepare data for API
      const updateData = {
        name: formData.name,
        profile: {
          companyName: formData.profile.companyName,
          companyDescription: formData.profile.companyDescription,
          companyWebsite: formData.profile.companyWebsite,
          companyEmail: formData.profile.companyEmail,
          numberOfEmployees: formData.profile.numberOfEmployees,
          companyPhone: formData.profile.companyPhone,
          phone: formData.profile.phone,
          panCardNumber: formData.profile.panCardNumber,
          gstNumber: formData.profile.gstNumber,
        }
      };
      
      await updateProfile(updateData);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
      console.error("Error updating profile:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
          {/* Sidebar */}
          <div className="w-[10px] lg:w-1/4 h-screen fixed top-0 left-0">
            <JobHostingSidebar />
          </div>
          
          {/* Main content */}
          <main className="w-full lg:ml-80 xl:ml-80 p-4 justify-center items-center flex min-h-screen overflow-y-auto">
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
        <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
          {/* Sidebar */}
          <div className="w-[10px] lg:w-1/4 h-screen fixed top-0 left-0">
            <JobHostingSidebar />
          </div>
          
          {/* Main content */}
          <main className="w-full lg:ml-80 xl:ml-80 p-4 justify-center items-center flex min-h-screen overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 lg:w-[670px] mx-auto">
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
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
        {/* Sidebar */}
        <div className="w-[10px] lg:w-1/4 h-screen fixed top-0 left-0">
          <JobHostingSidebar />
        </div>

        {/* Main content */}
        <main className="w-full lg:ml-80 xl:ml-80 p-4 justify-center items-center flex min-h-screen overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 lg:w-[670px] mx-auto">
              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-8">
                Hoster Details
              </h2>
              
              {/* Messages */}
              {message && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg">{message}</div>}
              {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">{error}</div>}

              {/* Form */}
              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Profile Photo and Company Logo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Profile Photo */}
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
                  
                  {/* Company Logo */}
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <img 
                        src={logoPreview || "https://placehold.co/150x150"} 
                        alt="Company Logo" 
                        className="w-32 h-32 rounded-lg object-contain border-4 border-gray-200"
                        onError={(e) => { e.target.src = "https://placehold.co/150x150"; }}
                      />
                    </div>
                    <label className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer">
                      Change Logo
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                
                {/* Grid Layout for Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="block w-full outline-red-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  {/* Email (Read-only) */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="block w-full outline-red-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500 bg-gray-100"
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label htmlFor="profile.companyName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="profile.companyName"
                      name="profile.companyName"
                      value={formData.profile.companyName}
                      onChange={handleChange}
                      required
                      className="block w-full outline-red-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  {/* Company Phone */}
                  <div>
                    <label htmlFor="profile.companyPhone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Phone
                    </label>
                    <input
                      type="tel"
                      id="profile.companyPhone"
                      name="profile.companyPhone"
                      value={formData.profile.companyPhone}
                      onChange={handleChange}
                      className="block w-full outline-red-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  {/* Company Email */}
                  <div>
                    <label htmlFor="profile.companyEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Email
                    </label>
                    <input
                      type="email"
                      id="profile.companyEmail"
                      name="profile.companyEmail"
                      value={formData.profile.companyEmail}
                      onChange={handleChange}
                      className="block w-full outline-red-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  {/* Personal Phone */}
                  <div>
                    <label htmlFor="profile.phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Personal Phone
                    </label>
                    <input
                      type="tel"
                      id="profile.phone"
                      name="profile.phone"
                      value={formData.profile.phone}
                      onChange={handleChange}
                      className="block w-full outline-red-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  {/* Company Website */}
                  <div>
                    <label htmlFor="profile.companyWebsite" className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Website
                    </label>
                    <input
                      type="url"
                      id="profile.companyWebsite"
                      name="profile.companyWebsite"
                      value={formData.profile.companyWebsite}
                      onChange={handleChange}
                      className="block w-full outline-red-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  {/* Number of Employees */}
                  <div>
                    <label htmlFor="profile.numberOfEmployees" className="block text-sm font-semibold text-gray-700 mb-2">
                      Number of Employees
                    </label>
                    <input
                      type="number"
                      id="profile.numberOfEmployees"
                      name="profile.numberOfEmployees"
                      value={formData.profile.numberOfEmployees}
                      onChange={handleChange}
                      className="block w-full outline-red-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  {/* PAN Card Number */}
                  <div>
                    <label htmlFor="profile.panCardNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                      PAN Card Number
                    </label>
                    <input
                      type="text"
                      id="profile.panCardNumber"
                      name="profile.panCardNumber"
                      value={formData.profile.panCardNumber}
                      onChange={handleChange}
                      className="block w-full outline-red-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  {/* GST Number */}
                  <div>
                    <label htmlFor="profile.gstNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                      GST Number
                    </label>
                    <input
                      type="text"
                      id="profile.gstNumber"
                      name="profile.gstNumber"
                      value={formData.profile.gstNumber}
                      onChange={handleChange}
                      className="block w-full outline-red-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
                
                {/* Company Description */}
                <div>
                  <label htmlFor="profile.companyDescription" className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Description
                  </label>
                  <textarea
                    id="profile.companyDescription"
                    name="profile.companyDescription"
                    value={formData.profile.companyDescription}
                    onChange={handleChange}
                    rows={4}
                    className="block w-full outline-red-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                {/* Submit & Reset Buttons */}
                <div className="flex gap-4">
                  {/* Reset Button */}
                  <button
                    type="button"
                    onClick={fetchProfileData}
                    className="bg-gray-400 text-white py-3 px-6 rounded-lg shadow-lg cursor-pointer transition-transform duration-200 ease-in-out hover:bg-gray-500"
                  >
                    Reset
                  </button>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-lg shadow-lg cursor-pointer transition-transform duration-200 ease-in-out hover:from-red-600 hover:to-red-700 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default HostingProfileDetail;