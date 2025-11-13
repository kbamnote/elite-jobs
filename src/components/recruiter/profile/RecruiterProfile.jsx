import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Building, Calendar, Edit3, ArrowLeft } from 'lucide-react';
import RecruiterHeader from "../sidebar/RecruiterHeader";
import { profile } from "../../../utils/Api";

const RecruiterProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await profile();
      setUserData(response.data.data);
      setError('');
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to fetch profile data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    navigate('/recruiter/profile/edit');
  };

  const handleBack = () => {
    navigate('/recruiter/dashboard');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Extract profile data
  const profileData = userData.profile || {};

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
      <>
        <RecruiterHeader />
        <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-background)' }}>
          <div className="flex-1 p-2 lg:p-8">
            <div className="max-w-6xl mx-auto">
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
          <div className="max-w-6xl mx-auto">
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
                  {profileData.photo ? (
                    <img 
                      src={profileData.photo} 
                      alt={userData.name || 'Recruiter'} 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-600">
                        {userData.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                  <div>
                    <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}>
                      {userData.name || 'Recruiter'}
                    </h1>
                    <p className="text-gray-600" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                      Member since {userData.createdAt ? formatDate(userData.createdAt) : 'Unknown'}
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
                        {userData.name || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Email</p>
                      <p className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        {userData.email || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Phone</p>
                      <p className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        {profileData.phone || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Location</p>
                      <p className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        {profileData.location || 'Not provided'}
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
                        {profileData.companyName || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Company Website</p>
                      <p className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        {profileData.companyWebsite || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Company Email</p>
                      <p className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        {profileData.companyEmail || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Company Phone</p>
                      <p className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        {profileData.companyPhone || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Number of Employees</p>
                      <p className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        {profileData.numberOfEmployees || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>PAN Card Number</p>
                      <p className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        {profileData.panCardNumber || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>GST Number</p>
                      <p className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        {profileData.gstNumber || 'Not provided'}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Company Description</p>
                      <p className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        {profileData.companyDescription || 'Not provided'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                    Contact Information
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg" 
                      style={{ backgroundColor: 'var(--color-background-light)' }}>
                      <Mail className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                      <span style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>{userData.email || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg" 
                      style={{ backgroundColor: 'var(--color-background-light)' }}>
                      <Phone className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                      <span style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>{profileData.phone || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg" 
                      style={{ backgroundColor: 'var(--color-background-light)' }}>
                      <MapPin className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                      <span style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>{profileData.location || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg" 
                      style={{ backgroundColor: 'var(--color-background-light)' }}>
                      <Calendar className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                      <span style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        Member since {userData.createdAt ? formatDate(userData.createdAt) : 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Company Logo */}
                {profileData.companyLogo && (
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                      Company Logo
                    </h2>
                    <div className="flex justify-center">
                      <img 
                        src={profileData.companyLogo} 
                        alt="Company Logo" 
                        className="max-h-32 max-w-full object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Company Document */}
                {profileData.companyDocument && (
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                      Company Document
                    </h2>
                    <div className="flex justify-center">
                      <a 
                        href={Array.isArray(profileData.companyDocument) ? profileData.companyDocument[0] : profileData.companyDocument} 
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

                {/* Account Actions */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                    Account Actions
                  </h2>
                  <div className="space-y-3">
                    <button 
                      onClick={handleEditProfile}
                      className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left"
                      style={{ backgroundColor: 'var(--color-background-light)' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-accent-light)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-background-light)'}
                    >
                      <Edit3 className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                      <span style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>Edit Profile</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecruiterProfile;