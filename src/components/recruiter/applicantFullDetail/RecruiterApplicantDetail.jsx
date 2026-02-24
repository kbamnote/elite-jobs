import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, FileText, ArrowLeft } from 'lucide-react';
import RecruiterHeader from '../../recruiter/sidebar/RecruiterHeader';
import { allapplicantById } from '../../utils/Api';

const RecruiterApplicantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplicantDetails();
  }, [id]);

  const fetchApplicantDetails = async () => {
    try {
      setLoading(true);
      const response = await allapplicantById(id);
      // The applicant data is nested in response.data.data
      setApplicant(response.data.data);
      setError('');
    } catch (err) {
      console.error('Error fetching applicant details:', err);
      setError('Failed to fetch applicant details. Please try again.');
    } finally {
      setLoading(false);
    }
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

  const renderLoadingSkeleton = () => {
    return (
      <div className="bg-[var(--color-white)] p-6 rounded-xl shadow-lg">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="bg-[var(--color-background-light)] p-6 rounded-xl">
                <div className="h-6 bg-[var(--color-border)] rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-[var(--color-border)] rounded w-3/4"></div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[var(--color-background-light)] p-6 rounded-xl">
              <div className="h-6 bg-[var(--color-border)] rounded w-1/3 mb-4"></div>
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-4 bg-[var(--color-border)] rounded w-full mb-3"></div>
              ))}
            </div>
            <div className="bg-[var(--color-background-light)] p-6 rounded-xl">
              <div className="h-6 bg-[var(--color-border)] rounded w-1/3 mb-4"></div>
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-4 bg-[var(--color-border)] rounded w-full mb-3"></div>
              ))}
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
            {renderLoadingSkeleton()}
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <RecruiterHeader />
        <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-background)' }}>
          <div className="flex-1 p-8">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-error-light)' }}>
                  <svg className="w-8 h-8" style={{ color: 'var(--color-error)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p className="text-lg mb-4" style={{ color: 'var(--color-error)', fontFamily: 'var(--font-body)' }}>{error}</p>
                <button 
                  onClick={fetchApplicantDetails}
                  className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
                  style={{ 
                    backgroundColor: 'var(--color-primary)', 
                    color: 'var(--color-white)',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!applicant) {
    return (
      <>
        <RecruiterHeader />
        <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-background)' }}>
          <div className="flex-1 p-8">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                  <User className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />
                </div>
                <h3 className="text-2xl font-semibold mb-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                  Applicant Not Found
                </h3>
                <p className="text-lg mb-6" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                  The requested applicant details could not be found.
                </p>
                <button 
                  onClick={handleBack}
                  className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md flex items-center mx-auto"
                  style={{ 
                    backgroundColor: 'var(--color-primary)', 
                    color: 'var(--color-white)',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Extract profile data
  const profile = applicant.profile || {};

  return (
    <>
      <RecruiterHeader />
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="flex-1 p-2 sm:p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Back button and Header Section - responsive layout */}
            <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
              <button 
                onClick={handleBack}
                className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base hover:opacity-80"
                style={{ color: 'var(--color-primary)' }}
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                Back to Dashboard
              </button>
            </div>

            {/* Applicant Header - responsive padding and layout */}
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Profile Photo or Icon - responsive sizing */}
                  {profile.photo ? (
                    <img 
                      src={profile.photo} 
                      alt={applicant.name || 'Applicant'} 
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="text-xl sm:text-2xl text-gray-600" />
                    </div>
                  )}
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}>
                      {applicant.name || 'Unknown Applicant'}
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                      Applied on {formatDate(applicant.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid - responsive columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Main Content - responsive padding */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Personal Information */}
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Full Name</p>
                      <p className="font-medium text-sm sm:text-base" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        {applicant.name || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Email</p>
                      <p className="font-medium text-sm sm:text-base" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        {applicant.email || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Phone</p>
                      <p className="font-medium text-sm sm:text-base" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        {profile.phone || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Gender</p>
                      <p className="font-medium text-sm sm:text-base" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        {profile.gender ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) : 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Age</p>
                      <p className="font-medium text-sm sm:text-base" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        {profile.age || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Location</p>
                      <p className="font-medium text-sm sm:text-base" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        {profile.address || 'Not provided'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                    Professional Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Designation</p>
                      <p className="font-medium text-sm sm:text-base" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        {profile.designation || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Experience</p>
                      <p className="font-medium text-sm sm:text-base" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        {profile.expInWork || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Category</p>
                      <p className="font-medium text-sm sm:text-base" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        {profile.preferredCategory || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Expected Salary</p>
                      <p className="font-medium text-sm sm:text-base" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        {profile.salaryExpectation ? `₹${profile.salaryExpectation}` : 'Not provided'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                    Education
                  </h2>
                  <div>
                    <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Highest Education</p>
                    <p className="font-medium text-sm sm:text-base" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                      {profile.highestEducation || 'Not provided'}
                    </p>
                  </div>
                </div>

                {/* Skills */}
                {profile.skills && profile.skills.length > 0 && (
                  <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                      Skills
                    </h2>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {profile.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm"
                          style={{ 
                            backgroundColor: 'var(--color-background-light)', 
                            color: 'var(--color-text-primary)',
                            fontFamily: 'var(--font-body)'
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Information */}
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                    Additional Information
                  </h2>
                  <div>
                    <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>About</p>
                    <p className="font-medium text-sm sm:text-base" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                      {profile.about || 'No additional information provided'}
                    </p>
                  </div>
                  {profile.resume && (
                    <div className="mt-3 sm:mt-4">
                      <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Resume</p>
                      <a 
                        href={profile.resume} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block mt-1 sm:mt-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:shadow-md"
                        style={{ 
                          backgroundColor: 'var(--color-primary)', 
                          color: 'var(--color-white)',
                          fontFamily: 'var(--font-body)'
                        }}
                      >
                        View Resume
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar - responsive padding and layout */}
              <div className="space-y-4 sm:space-y-6">
                {/* Contact Information */}
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                    Contact Information
                  </h2>
                  <div className="space-y-2 sm:space-y-3">
                    <a href={`mailto:${applicant.email}`} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-colors" 
                      style={{ backgroundColor: 'var(--color-background-light)' }}>
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--color-primary)' }} />
                      <span className="text-sm sm:text-base" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>{applicant.email || 'Not provided'}</span>
                    </a>
                    <a href={`tel:${profile.phone}`} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-colors" 
                      style={{ backgroundColor: 'var(--color-background-light)' }}>
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--color-primary)' }} />
                      <span className="text-sm sm:text-base" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>{profile.phone || 'Not provided'}</span>
                    </a>
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg" 
                      style={{ backgroundColor: 'var(--color-background-light)' }}>
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--color-primary)' }} />
                      <span className="text-sm sm:text-base" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>{profile.address || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg" 
                      style={{ backgroundColor: 'var(--color-background-light)' }}>
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--color-primary)' }} />
                      <span className="text-sm sm:text-base" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                        Applied on {formatDate(applicant.createdAt)}
                      </span>
                    </div>
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

export default RecruiterApplicantDetail;