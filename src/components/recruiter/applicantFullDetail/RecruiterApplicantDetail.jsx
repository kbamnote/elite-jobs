import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecruiterSidebar from '../../recruiter/sidebar/RecruiterSidebar';
import { allapplicantById } from '../../../utils/Api';

const RecruiterApplicantDetail = () => {
  const { id } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchApplicantDetails();
    }
  }, [id]);

  const fetchApplicantDetails = async () => {
    try {
      setLoading(true);
      const response = await allapplicantById(id);
      setApplicant(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch applicant details');
      console.error('Error fetching applicant:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <RecruiterSidebar placement="top" />
        <div className="min-h-screen bg-gray-50">
          {/* Main content */}
          <main className="w-full pt-16 p-4 justify-center items-center flex min-h-screen overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
                <div className="text-center py-10">
                  <p>Loading applicant details...</p>
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
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
                <div className="text-center py-10">
                  <p className="text-red-500">{error}</p>
                  <button 
                    onClick={fetchApplicantDetails}
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

  if (!applicant) {
    return (
      <>
        <RecruiterSidebar placement="top" />
        <div className="min-h-screen bg-gray-50">
          {/* Main content */}
          <main className="w-full pt-16 p-4 justify-center items-center flex min-h-screen overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
                <div className="text-center py-10">
                  <p>Applicant not found</p>
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
        {/* Main content */}
        <main className="w-full pt-16 p-4 justify-center items-center flex min-h-screen overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent mb-8">
                Applicant Details
              </h2>
              
              {/* Profile Photo */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <img 
                    src={applicant.profile.photo || "https://placehold.co/150x150"} 
                    alt={applicant.name} 
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                    onError={(e) => { e.target.src = "https://placehold.co/150x150"; }}
                  />
                </div>
              </div>
              
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Full Name</h3>
                  <p className="text-gray-900">{applicant.name}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Email</h3>
                  <p className="text-gray-900">{applicant.email}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Role</h3>
                  <p className="text-gray-900 capitalize">{applicant.role}</p>
                </div>
                
                {applicant.profile.phone && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Phone</h3>
                    <p className="text-gray-900">{applicant.profile.phone}</p>
                  </div>
                )}
                
                {applicant.profile.address && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Address</h3>
                    <p className="text-gray-900">{applicant.profile.address}</p>
                  </div>
                )}
                
                {applicant.profile.age && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Age</h3>
                    <p className="text-gray-900">{applicant.profile.age}</p>
                  </div>
                )}
              </div>
              
              {/* Skills */}
              {applicant.profile.skills && applicant.profile.skills.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {applicant.profile.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{ 
                          backgroundColor: 'var(--color-accent-light)', 
                          color: 'var(--color-accent)'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Education */}
              {applicant.profile.education && applicant.profile.education.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Education</h3>
                  <div className="space-y-4">
                    {applicant.profile.education.map((edu, index) => (
                      <div key={index} className="border-l-4 border-teal-500 pl-4 py-1">
                        <h4 className="font-semibold text-lg">{edu.degree || 'Degree not specified'}</h4>
                        <p className="text-gray-700">{edu.institution || 'Institution not specified'}</p>
                        <p className="text-gray-600 text-sm">
                          {edu.startYear && edu.endYear 
                            ? `${edu.startYear} - ${edu.endYear}` 
                            : edu.startYear 
                              ? `Started: ${edu.startYear}` 
                              : 'Dates not specified'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Experience */}
              {applicant.profile.experience && applicant.profile.experience.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Experience</h3>
                  <div className="space-y-4">
                    {applicant.profile.experience.map((exp, index) => (
                      <div key={index} className="border-l-4 border-teal-500 pl-4 py-1">
                        <h4 className="font-semibold text-lg">{exp.title || 'Title not specified'}</h4>
                        <p className="text-gray-700">{exp.company || 'Company not specified'}</p>
                        <p className="text-gray-600 text-sm">
                          {exp.startDate && exp.endDate 
                            ? `${exp.startDate} - ${exp.endDate}` 
                            : exp.startDate 
                              ? `Started: ${exp.startDate}` 
                              : 'Dates not specified'}
                        </p>
                        {exp.description && (
                          <p className="text-gray-600 mt-2">{exp.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Resume */}
              {applicant.profile.resume && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Resume</h3>
                  <a 
                    href={applicant.profile.resume} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    View Resume
                  </a>
                </div>
              )}
              
              {/* Social Links */}
              {(applicant.profile.githubUrl || applicant.profile.linkedinUrl) && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Social Links</h3>
                  <div className="flex gap-4">
                    {applicant.profile.githubUrl && (
                      <a 
                        href={applicant.profile.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                    
                    {applicant.profile.linkedinUrl && (
                      <a 
                        href={applicant.profile.linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default RecruiterApplicantDetail;