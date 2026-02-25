import React, { useState, useEffect } from "react";
import Header from "../commonSeeker/Header";
import Footer from "../commonSeeker/Footer";
import { appliedJobs } from "../../../utils/Api";
import { useNavigate } from "react-router-dom";

const ShowJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      setLoading(true);
      const response = await appliedJobs();
      setApplications(response.data.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch applications");
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDateString = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleViewJob = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  // Filter out applications with null jobId
  const validApplications = applications.filter(application => application.jobId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="h-8 bg-[var(--color-border)] rounded w-48 mb-6 animate-pulse"></div>
            
            {/* Applications list skeleton */}
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div 
                  key={index} 
                  className="border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="h-5 bg-[var(--color-border)] rounded w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-[var(--color-border)] rounded w-1/2 mb-2 animate-pulse"></div>
                    <div className="h-3 bg-[var(--color-border)] rounded w-40 animate-pulse"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-6 bg-[var(--color-border)] rounded-full w-20 animate-pulse"></div>
                    <div className="h-8 bg-[var(--color-border)] rounded-lg w-20 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">My Applications</h1>
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
              <button 
                onClick={fetchAppliedJobs}
                className="mt-4 px-4 py-2 btn-accent rounded-lg"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
    
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
     
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">My Applications</h1>

          {applications.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">You haven't applied for any jobs yet</p>
              <button
                onClick={() => navigate('/jobs')}
                className="mt-4 px-4 py-2 btn-accent rounded-lg"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Browse Jobs
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {validApplications.map((application) => (
                  <div 
                    key={application._id} 
                    className="border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{application.jobId.title || 'Unknown Job'}</h3>
                      <p className="text-gray-600">{application.jobId.company?.name || 'Unknown Company'}</p>
                      <p className="text-sm text-gray-500">
                        Applied on: {formatDateString(application.appliedAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span 
                        className={`px-3 py-1 rounded-full text-sm ${
                          application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          application.status === 'interview' ? 'bg-blue-100 text-blue-800' :
                          ''
                        }`}
                        style={
                          application.status !== 'accepted' && 
                          application.status !== 'rejected' && 
                          application.status !== 'interview' 
                            ? { 
                                backgroundColor: 'var(--color-accent-light)', 
                                color: 'var(--color-accent-dark)',
                                fontFamily: 'var(--font-body)'
                              } 
                            : { fontFamily: 'var(--font-body)' }
                        }
                      >
                        {application.status}
                      </span>
                      <button
                        onClick={() => handleViewJob(application.jobId._id)}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        View Job
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination removed - showing all applications */}
            </>
          )}
        </div>
      </div>
    
    </div>
  );
};

export default ShowJobs;