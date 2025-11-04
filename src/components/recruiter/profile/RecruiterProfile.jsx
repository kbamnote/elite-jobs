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

  // Removed profile photo update in read-only view

  // Removed logo update handler in read-only view

  // Removed submit handler; view is read-only

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
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 lg:w-[670px] mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
                  Recruiter Profile
                </h2>
                <button
                  onClick={() => navigate('/recruiter/profile/edit')}
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-white)', fontFamily: 'var(--font-body)' }}
                >
                  Edit Profile
                </button>
              </div>

              {message && (
                <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg">{message}</div>
              )}
              {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">{error}</div>}

              <div className="grid grid-cols-1 gap-6 mb-8">
                <div className="flex flex-col items-center">
                  <img src={logoPreview || "https://placehold.co/150x150"} alt="Company Logo" className="w-32 h-32 rounded-lg object-contain border-4 border-gray-200" onError={(e) => { e.target.src = "https://placehold.co/150x150"; }} />
                  <span className="mt-2 text-sm text-gray-500">Company Logo</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Full Name</h3>
                  <p className="text-gray-900">{formData.name || '-'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Email</h3>
                  <p className="text-gray-900">{formData.email || '-'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Company Name</h3>
                  <p className="text-gray-900">{formData.profile.companyName || '-'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Company Phone</h3>
                  <p className="text-gray-900">{formData.profile.companyPhone || '-'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Company Email</h3>
                  <p className="text-gray-900">{formData.profile.companyEmail || '-'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Personal Phone</h3>
                  <p className="text-gray-900">{formData.profile.phone || '-'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Company Website</h3>
                  <p className="text-gray-900 break-words">{formData.profile.companyWebsite || '-'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Number of Employees</h3>
                  <p className="text-gray-900">{formData.profile.numberOfEmployees || '-'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">PAN Card Number</h3>
                  <p className="text-gray-900">{formData.profile.panCardNumber || '-'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">GST Number</h3>
                  <p className="text-gray-900">{formData.profile.gstNumber || '-'}</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Company Description</h3>
                <p className="text-gray-900 whitespace-pre-line">{formData.profile.companyDescription || '-'}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default RecruiterProfile;