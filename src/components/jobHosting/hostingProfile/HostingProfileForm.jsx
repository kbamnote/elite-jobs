import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobHostingSidebar from "../commonHost/jobHostingSidebar";
import { profile } from "../../../utils/Api";
import { User, Mail, Phone, MapPin, Building, Calendar, Edit3, ArrowLeft } from 'lucide-react';

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
        photo: data.profile.photo,
        companyDocument: data.profile.companyDocument,
        createdAt: data.createdAt
      });
      
      setError("");
    } catch (err) {
      setError("Failed to fetch profile data");
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    navigate("/hosting/profile/edit");
  };

  const handleBack = () => {
    navigate("/hosting/dashboard");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Loading skeleton component
  const renderLoadingSkeleton = () => {
    return (
      <div className="animate-pulse">
        {/* Back button skeleton */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-10 w-32 bg-[var(--color-border)] rounded"></div>
        </div>
        
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[var(--color-border)]"></div>
              <div>
                <div className="h-6 bg-[var(--color-border)] rounded w-48 mb-2"></div>
                <div className="h-4 bg-[var(--color-border)] rounded w-32"></div>
              </div>
            </div>
            <div className="h-10 w-32 bg-[var(--color-border)] rounded"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="h-6 bg-[var(--color-border)] rounded w-40 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item}>
                    <div className="h-3 bg-[var(--color-border)] rounded w-16 mb-2"></div>
                    <div className="h-4 bg-[var(--color-border)] rounded w-32"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Company Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="h-6 bg-[var(--color-border)] rounded w-48 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item}>
                    <div className="h-3 bg-[var(--color-border)] rounded w-20 mb-2"></div>
                    <div className="h-4 bg-[var(--color-border)] rounded w-40"></div>
                  </div>
                ))}
                <div className="md:col-span-2">
                  <div className="h-3 bg-[var(--color-border)] rounded w-24 mb-2"></div>
                  <div className="h-4 bg-[var(--color-border)] rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="h-6 bg-[var(--color-border)] rounded w-40 mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-background-light)]">
                    <div className="w-5 h-5 bg-[var(--color-border)] rounded"></div>
                    <div className="h-4 bg-[var(--color-border)] rounded w-32"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Account Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="h-6 bg-[var(--color-border)] rounded w-32 mb-4"></div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-background-light)]">
                  <div className="w-5 h-5 bg-[var(--color-border)] rounded"></div>
                  <div className="h-4 bg-[var(--color-border)] rounded w-24"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
        {/* Sidebar - Fixed on Left */}
        <div className="w-full lg:w-1/4 h-auto lg:h-screen fixed lg:top-0 left-0 z-50">
          <JobHostingSidebar />
        </div>

        {/* Profile Container - Right Side & Centered */}
        <main className="w-full lg:ml-80 xl:ml-80 p-2 lg:p-8 flex justify-center items-center min-h-screen overflow-y-auto">
          <div className="max-w-6xl mx-auto w-full">
            {renderLoadingSkeleton()}
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
        <main className="w-full lg:ml-80 xl:ml-80 p-2 lg:p-8 flex justify-center items-center min-h-screen overflow-y-auto">
          <div className="max-w-6xl mx-auto w-full">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
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
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Sidebar - Fixed on Left */}
      <div className="w-full lg:w-1/4 h-auto lg:h-screen fixed lg:top-0 left-0 z-50">
        <JobHostingSidebar />
      </div>

      {/* Profile Container - Right Side & Centered */}
      <main className="w-full lg:ml-80 xl:ml-80 p-2 lg:p-8 flex justify-center items-center min-h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full">
          {/* Back button and Header Section */}
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 hover:opacity-80"
              style={{ color: 'var(--color-primary)' }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
          </div>

          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Profile Photo */}
                {hoster.photo ? (
                  <img 
                    src={hoster.photo} 
                    alt={hoster.fullName || 'Hoster'} 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">
                      {hoster.fullName?.charAt(0)?.toUpperCase() || 'H'}
                    </span>
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}>
                    {hoster.fullName || 'Hoster'}
                  </h1>
                  <p className="text-gray-600" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                    Member since {hoster.createdAt ? formatDate(hoster.createdAt) : 'Unknown'}
                  </p>
                </div>
              </div>
              <button 
                onClick={handleEditProfile}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
                style={{ 
                  backgroundColor: 'var(--color-primary)', 
                  color: 'var(--color-white)',
                  fontFamily: 'var(--font-body)'
                }}
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                  <User className="w-5 h-5" />
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Full Name</p>
                    <p className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                      {hoster.fullName || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Email</p>
                    <p className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                      {hoster.email || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Phone</p>
                    <p className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                      {hoster.phone || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                  <Building className="w-5 h-5" />
                  Company Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Company Name</p>
                    <p className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                      {hoster.companyName || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Company Website</p>
                    <p className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                      {hoster.companyWebsite || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Company Email</p>
                    <p className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                      {hoster.companyEmail || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Company Phone</p>
                    <p className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                      {hoster.companyPhone || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Number of Employees</p>
                    <p className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                      {hoster.numberOfEmployees || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>PAN Card Number</p>
                    <p className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                      {hoster.panCardNumber || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>GST Number</p>
                    <p className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                      {hoster.gstNumber || 'Not provided'}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Company Description</p>
                    <p className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                      {hoster.companyDescription || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Logo */}
              {hoster.companyLogo && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                    Company Logo
                  </h2>
                  <div className="flex justify-center">
                    <img 
                      src={hoster.companyLogo} 
                      alt="Company Logo" 
                      className="max-h-32 max-w-full object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Company Document */}
              {hoster.companyDocument && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                    Company Document
                  </h2>
                  <div className="flex justify-center">
                    <a 
                      href={Array.isArray(hoster.companyDocument) ? hoster.companyDocument[0] : hoster.companyDocument} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
                      style={{ 
                        backgroundColor: 'var(--color-primary)', 
                        color: 'var(--color-white)',
                        fontFamily: 'var(--font-body)'
                      }}
                    >
                      View Document
                    </a>
                  </div>
                </div>
              )}
              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                  Contact Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg" 
                    style={{ backgroundColor: 'var(--color-background-light)' }}>
                    <Mail className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                    <span style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>{hoster.email || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg" 
                    style={{ backgroundColor: 'var(--color-background-light)' }}>
                    <Phone className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                    <span style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>{hoster.phone || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg" 
                    style={{ backgroundColor: 'var(--color-background-light)' }}>
                    <Building className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                    <span style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>{hoster.companyName || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg" 
                    style={{ backgroundColor: 'var(--color-background-light)' }}>
                    <Calendar className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                    <span style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                      Member since {hoster.createdAt ? formatDate(hoster.createdAt) : 'Unknown'}
                    </span>
                  </div>
                </div>
              </div>

              

             
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HostingProfileForm;