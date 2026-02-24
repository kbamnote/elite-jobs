import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Building, ArrowLeft, Upload } from 'lucide-react';
import RecruiterHeader from "../sidebar/RecruiterHeader";
import { profile, updateProfile, updateCompanyLogo, updatephotoCompany, updateCompanyDocs, uploadFileHoster } from "../../utils/Api";

const RecruiterProfileEdit = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profile: {
      phone: '',
      location: '',
      companyName: '',
      companyDescription: '',
      companyWebsite: '',
      companyEmail: '',
      companyPhone: '',
      numberOfEmployees: '',
      panCardNumber: '',
      gstNumber: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // For file previews
  const [photoPreview, setPhotoPreview] = useState('');
  const [logoPreview, setLogoPreview] = useState('');
  const [documentPreview, setDocumentPreview] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await profile();
      const data = response.data.data;
      
      setUserData({
        name: data.name || '',
        email: data.email || '',
        profile: {
          phone: data.profile?.phone || '',
          location: data.profile?.location || '',
          companyName: data.profile?.companyName || '',
          companyDescription: data.profile?.companyDescription || '',
          companyWebsite: data.profile?.companyWebsite || '',
          companyEmail: data.profile?.companyEmail || '',
          companyPhone: data.profile?.companyPhone || '',
          numberOfEmployees: data.profile?.numberOfEmployees || '',
          panCardNumber: data.profile?.panCardNumber || '',
          gstNumber: data.profile?.gstNumber || ''
        }
      });
      
      // Set previews
      setPhotoPreview(data.profile?.photo || '');
      setLogoPreview(data.profile?.companyLogo || '');
      setDocumentPreview(data.profile?.companyDocument || '');
      
      setError('');
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to fetch profile data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested profile fields
    if (name.startsWith("profile.")) {
      const profileField = name.split(".")[1];
      setUserData(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          [profileField]: value
        }
      }));
    } else {
      setUserData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle photo upload
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      // Check if user already has a profile photo
      const response = await profile();
      const hasExistingPhoto = response.data.data.profile?.photo;
      
      let result;
      if (hasExistingPhoto) {
        // Update existing photo
        result = await updatephotoCompany(formData);
      } else {
        // Initial upload
        result = await uploadFileHoster(formData);
      }

      setPhotoPreview(result.data.data.profile.photo);
      setSuccess('Profile photo updated successfully!');
    } catch (err) {
      setError('Failed to update profile photo: ' + (err.response?.data?.message || "Unknown error"));
      console.error("Error updating photo:", err);
    }
  };

  // Handle company logo upload
  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("companyLogo", file);

    try {
      // Check if user already has a company logo
      const response = await profile();
      const hasExistingLogo = response.data.data.profile?.companyLogo;
      
      let result;
      if (hasExistingLogo) {
        // Update existing logo
        result = await updateCompanyLogo(formData);
      } else {
        // Initial upload
        result = await uploadFileHoster(formData);
      }
      
      setLogoPreview(result.data.data.profile.companyLogo);
      setSuccess('Company logo updated successfully!');
    } catch (err) {
      setError('Failed to update company logo: ' + (err.response?.data?.message || "Unknown error"));
      console.error("Error updating logo:", err);
    }
  };

  // Handle company document upload
  const handleDocumentChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("companyDocument", file);

    try {
      // Check if user already has a company document
      const response = await profile();
      const hasExistingDocument = response.data.data.profile?.companyDocument && 
        (Array.isArray(response.data.data.profile.companyDocument) 
          ? response.data.data.profile.companyDocument.length > 0 
          : response.data.data.profile.companyDocument);
      
      let result;
      if (hasExistingDocument) {
        // Update existing document
        result = await updateCompanyDocs(formData);
      } else {
        // Initial upload
        result = await uploadFileHoster(formData);
      }
      
      // Handle the response correctly - companyDocument is returned as an array
      const documentUrl = Array.isArray(result.data.data.profile.companyDocument) 
        ? result.data.data.profile.companyDocument[0] 
        : result.data.data.profile.companyDocument;
      
      setDocumentPreview(documentUrl);
      setSuccess('Company document updated successfully!');
    } catch (err) {
      setError('Failed to update company document: ' + (err.response?.data?.message || "Unknown error"));
      console.error("Error updating document:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setSuccess('');
      setError('');
      
      // Prepare data for API
      const updateData = {
        name: userData.name,
        profile: {
          phone: userData.profile.phone,
          location: userData.profile.location,
          companyName: userData.profile.companyName,
          companyDescription: userData.profile.companyDescription,
          companyWebsite: userData.profile.companyWebsite,
          companyEmail: userData.profile.companyEmail,
          companyPhone: userData.profile.companyPhone,
          numberOfEmployees: userData.profile.numberOfEmployees,
          panCardNumber: userData.profile.panCardNumber,
          gstNumber: userData.profile.gstNumber
        }
      };
      
      await updateProfile(updateData);
      setSuccess('Profile updated successfully!');
      
      // Redirect to profile page after a short delay
      setTimeout(() => {
        navigate('/recruiter/profile');
      }, 1500);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    navigate('/recruiter/profile');
  };

  const renderLoadingSkeleton = () => {
    return (
      <div className="animate-pulse">
        {/* Back button skeleton */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-10 w-32 bg-[var(--color-border)] rounded"></div>
        </div>
        
        {/* Edit Profile Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="h-6 bg-[var(--color-border)] rounded w-32 mb-2"></div>
          <div className="h-4 bg-[var(--color-border)] rounded w-64"></div>
        </div>
        
        {/* Profile Edit Form */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <div className="h-6 bg-[var(--color-border)] rounded w-40 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item}>
                    <div className="h-3 bg-[var(--color-border)] rounded w-20 mb-2"></div>
                    <div className="h-10 bg-[var(--color-border)] rounded"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Company Information Section */}
            <div>
              <div className="h-6 bg-[var(--color-border)] rounded w-48 mb-4"></div>
              <div className="space-y-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item}>
                    <div className="h-3 bg-[var(--color-border)] rounded w-24 mb-2"></div>
                    <div className="h-10 bg-[var(--color-border)] rounded"></div>
                  </div>
                ))}
                <div>
                  <div className="h-3 bg-[var(--color-border)] rounded w-32 mb-2"></div>
                  <div className="h-20 bg-[var(--color-border)] rounded"></div>
                </div>
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="h-12 bg-[var(--color-border)] rounded flex-1"></div>
              <div className="h-12 bg-[var(--color-border)] rounded flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <>
        <RecruiterHeader />
        <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-background)' }}>
          <div className="flex-1 p-2 lg:p-8">
            <div className="max-w-4xl mx-auto">
              {renderLoadingSkeleton()}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <RecruiterHeader />
      <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="flex-1 p-2 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Back button and Header Section */}
            <div className="flex items-center gap-4 mb-6">
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 hover:opacity-80"
                style={{ color: 'var(--color-primary)' }}
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Profile
              </button>
            </div>

            {/* Edit Profile Header */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}>
                Edit Profile
              </h1>
              <p className="text-gray-600" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                Update your personal and company information
              </p>
            </div>

            {/* Profile Edit Form */}
            <div className="bg-white rounded-xl shadow-md p-6">
              {error && (
                <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-error-light)' }}>
                  <p className="text-red-700" style={{ color: 'var(--color-error)', fontFamily: 'var(--font-body)' }}>{error}</p>
                </div>
              )}
              
              {success && (
                <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-success-light)' }}>
                  <p className="text-green-700" style={{ color: 'var(--color-success)', fontFamily: 'var(--font-body)' }}>{success}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Photo, Company Logo, and Company Document */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
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
                    <label className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer flex items-center">
                      <Upload className="w-4 h-4 mr-2" />
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
                    <label className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer flex items-center">
                      <Upload className="w-4 h-4 mr-2" />
                      Change Logo
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  
                  {/* Company Document */}
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      {documentPreview ? (
                        <div className="w-32 h-32 rounded-lg border-4 border-gray-200 flex items-center justify-center bg-gray-100">
                          <span className="text-gray-600 text-sm text-center px-2">Company Document</span>
                        </div>
                      ) : (
                        <div className="w-32 h-32 rounded-lg border-4 border-gray-200 flex items-center justify-center bg-gray-100">
                          <span className="text-gray-400">No Document</span>
                        </div>
                      )}
                    </div>
                    <label className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer flex items-center">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Document
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx" 
                        onChange={handleDocumentChange}
                        className="hidden"
                      />
                    </label>
                    {documentPreview && (
                      <a 
                        href={documentPreview} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-2 text-sm text-blue-600 hover:underline"
                      >
                        View Document
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Personal Information Section */}
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                    <User className="w-5 h-5" />
                    Personal Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
                        style={{ 
                          borderColor: 'var(--color-border)', 
                          backgroundColor: 'var(--color-white)',
                          color: 'var(--color-text-primary)',
                          fontFamily: 'var(--font-body)',
                          focusRingColor: 'var(--color-primary)'
                        }}
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        disabled
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-opacity-50 transition-all duration-200 bg-gray-100"
                        style={{ 
                          borderColor: 'var(--color-border)', 
                          backgroundColor: 'var(--color-white)',
                          color: 'var(--color-text-primary)',
                          fontFamily: 'var(--font-body)',
                          focusRingColor: 'var(--color-primary)'
                        }}
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="profile.phone"
                        value={userData.profile.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
                        style={{ 
                          borderColor: 'var(--color-border)', 
                          backgroundColor: 'var(--color-white)',
                          color: 'var(--color-text-primary)',
                          fontFamily: 'var(--font-body)',
                          focusRingColor: 'var(--color-primary)'
                        }}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        Location
                      </label>
                      <input
                        type="text"
                        name="profile.location"
                        value={userData.profile.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
                        style={{ 
                          borderColor: 'var(--color-border)', 
                          backgroundColor: 'var(--color-white)',
                          color: 'var(--color-text-primary)',
                          fontFamily: 'var(--font-body)',
                          focusRingColor: 'var(--color-primary)'
                        }}
                        placeholder="Enter your location"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Company Information Section */}
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                    <Building className="w-5 h-5" />
                    Company Information
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="profile.companyName"
                          value={userData.profile.companyName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
                          style={{ 
                            borderColor: 'var(--color-border)', 
                            backgroundColor: 'var(--color-white)',
                            color: 'var(--color-text-primary)',
                            fontFamily: 'var(--font-body)',
                            focusRingColor: 'var(--color-primary)'
                          }}
                          placeholder="Enter your company name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                          Company Website
                        </label>
                        <input
                          type="url"
                          name="profile.companyWebsite"
                          value={userData.profile.companyWebsite}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
                          style={{ 
                            borderColor: 'var(--color-border)', 
                            backgroundColor: 'var(--color-white)',
                            color: 'var(--color-text-primary)',
                            fontFamily: 'var(--font-body)',
                            focusRingColor: 'var(--color-primary)'
                          }}
                          placeholder="https://example.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                          Company Email
                        </label>
                        <input
                          type="email"
                          name="profile.companyEmail"
                          value={userData.profile.companyEmail}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
                          style={{ 
                            borderColor: 'var(--color-border)', 
                            backgroundColor: 'var(--color-white)',
                            color: 'var(--color-text-primary)',
                            fontFamily: 'var(--font-body)',
                            focusRingColor: 'var(--color-primary)'
                          }}
                          placeholder="contact@company.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                          Company Phone
                        </label>
                        <input
                          type="tel"
                          name="profile.companyPhone"
                          value={userData.profile.companyPhone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
                          style={{ 
                            borderColor: 'var(--color-border)', 
                            backgroundColor: 'var(--color-white)',
                            color: 'var(--color-text-primary)',
                            fontFamily: 'var(--font-body)',
                            focusRingColor: 'var(--color-primary)'
                          }}
                          placeholder="+1234567890"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                          Number of Employees
                        </label>
                        <input
                          type="number"
                          name="profile.numberOfEmployees"
                          value={userData.profile.numberOfEmployees}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
                          style={{ 
                            borderColor: 'var(--color-border)', 
                            backgroundColor: 'var(--color-white)',
                            color: 'var(--color-text-primary)',
                            fontFamily: 'var(--font-body)',
                            focusRingColor: 'var(--color-primary)'
                          }}
                          placeholder="50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                          PAN Card Number
                        </label>
                        <input
                          type="text"
                          name="profile.panCardNumber"
                          value={userData.profile.panCardNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
                          style={{ 
                            borderColor: 'var(--color-border)', 
                            backgroundColor: 'var(--color-white)',
                            color: 'var(--color-text-primary)',
                            fontFamily: 'var(--font-body)',
                            focusRingColor: 'var(--color-primary)'
                          }}
                          placeholder="ABCDE1234F"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                          GST Number
                        </label>
                        <input
                          type="text"
                          name="profile.gstNumber"
                          value={userData.profile.gstNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
                          style={{ 
                            borderColor: 'var(--color-border)', 
                            backgroundColor: 'var(--color-white)',
                            color: 'var(--color-text-primary)',
                            fontFamily: 'var(--font-body)',
                            focusRingColor: 'var(--color-primary)'
                          }}
                          placeholder="22AAAAA0000A1Z5"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        Company Description
                      </label>
                      <textarea
                        name="profile.companyDescription"
                        value={userData.profile.companyDescription}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
                        style={{ 
                          borderColor: 'var(--color-border)', 
                          backgroundColor: 'var(--color-white)',
                          color: 'var(--color-text-primary)',
                          fontFamily: 'var(--font-body)',
                          focusRingColor: 'var(--color-primary)'
                        }}
                        placeholder="Describe your company"
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md flex-1"
                    style={{ 
                      backgroundColor: 'var(--color-background-light)', 
                      color: 'var(--color-text-primary)',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md flex-1 flex items-center justify-center"
                    style={{ 
                      backgroundColor: 'var(--color-primary)', 
                      color: 'var(--color-white)',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin mr-2" style={{ borderColor: 'var(--color-white)' }}></div>
                        Saving...
                      </>
                    ) : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecruiterProfileEdit;