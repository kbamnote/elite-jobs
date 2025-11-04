import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecruiterSidebar from "../sidebar/RecruiterSidebar";
import { profile, updateProfile, updateCompanyLogo } from "../../../utils/Api";

const RecruiterProfileEdit = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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

  // Removed profile photo upload; only company logo can be updated

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("companyLogo", file);
    try {
      const response = await updateCompanyLogo(fd);
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
      navigate('/recruiter/profile');
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
        <RecruiterSidebar placement="top" />
        <div className="min-h-screen bg-gray-50">
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
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 lg:w-[670px] mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent mb-8">
                Edit Recruiter Profile
              </h2>

              {message && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg">{message}</div>}
              {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">{error}</div>}

              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6">
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
                      <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} disabled className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 bg-gray-100" />
                  </div>
                  <div>
                    <label htmlFor="profile.companyName" className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                    <input type="text" id="profile.companyName" name="profile.companyName" value={formData.profile.companyName} onChange={handleChange} required className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500" />
                  </div>
                  <div>
                    <label htmlFor="profile.companyPhone" className="block text-sm font-semibold text-gray-700 mb-2">Company Phone</label>
                    <input type="tel" id="profile.companyPhone" name="profile.companyPhone" value={formData.profile.companyPhone} onChange={handleChange} className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500" />
                  </div>
                  <div>
                    <label htmlFor="profile.companyEmail" className="block text-sm font-semibold text-gray-700 mb-2">Company Email</label>
                    <input type="email" id="profile.companyEmail" name="profile.companyEmail" value={formData.profile.companyEmail} onChange={handleChange} className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500" />
                  </div>
                  <div>
                    <label htmlFor="profile.phone" className="block text-sm font-semibold text-gray-700 mb-2">Personal Phone</label>
                    <input type="tel" id="profile.phone" name="profile.phone" value={formData.profile.phone} onChange={handleChange} className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500" />
                  </div>
                  <div>
                    <label htmlFor="profile.companyWebsite" className="block text-sm font-semibold text-gray-700 mb-2">Company Website</label>
                    <input type="url" id="profile.companyWebsite" name="profile.companyWebsite" value={formData.profile.companyWebsite} onChange={handleChange} className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500" />
                  </div>
                  <div>
                    <label htmlFor="profile.numberOfEmployees" className="block text-sm font-semibold text-gray-700 mb-2">Number of Employees</label>
                    <input type="number" id="profile.numberOfEmployees" name="profile.numberOfEmployees" value={formData.profile.numberOfEmployees} onChange={handleChange} className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500" />
                  </div>
                  <div>
                    <label htmlFor="profile.panCardNumber" className="block text-sm font-semibold text-gray-700 mb-2">PAN Card Number</label>
                    <input type="text" id="profile.panCardNumber" name="profile.panCardNumber" value={formData.profile.panCardNumber} onChange={handleChange} className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500" />
                  </div>
                  <div>
                    <label htmlFor="profile.gstNumber" className="block text sm font-semibold text-gray-700 mb-2">GST Number</label>
                    <input type="text" id="profile.gstNumber" name="profile.gstNumber" value={formData.profile.gstNumber} onChange={handleChange} className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500" />
                  </div>
                </div>

                <div>
                  <label htmlFor="profile.companyDescription" className="block text-sm font-semibold text-gray-700 mb-2">Company Description</label>
                  <textarea id="profile.companyDescription" name="profile.companyDescription" value={formData.profile.companyDescription} onChange={handleChange} rows={4} className="block w-full outline-teal-600 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500" />
                </div>

                <div className="flex gap-4">
                  <button type="button" onClick={fetchProfileData} className="bg-gray-400 text-white py-3 px-6 rounded-lg shadow-lg cursor-pointer transition-transform duration-200 ease-in-out hover:bg-gray-500">Reset</button>
                  <button 
                    type="submit" 
                    disabled={saving} 
                    className="py-3 px-6 rounded-lg shadow-lg transition-colors duration-200 hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-white)', fontFamily: 'var(--font-body)' }}
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

export default RecruiterProfileEdit;