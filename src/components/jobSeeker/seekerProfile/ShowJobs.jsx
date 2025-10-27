import React, { useState, useEffect } from "react";
import Header from "../commonSeeker/Header";
import Footer from "../commonSeeker/Footer";
import { appliedJobs } from "../../../utils/Api";
import { useNavigate } from "react-router-dom";

const ShowJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;
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

  const start = (page - 1) * pageSize;
  const current = applications.slice(start, start + pageSize);
  const totalPages = Math.ceil(applications.length / pageSize);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">My Applications</h1>
            <div className="text-center py-10">
              <p>Loading applications...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">My Applications</h1>
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
              <button 
                onClick={fetchAppliedJobs}
                className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">My Applications</h1>

          {applications.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">You haven't applied for any jobs yet</p>
              <button
                onClick={() => navigate('/jobs')}
                className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Browse Jobs
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {current.map((application) => (
                  <div 
                    key={application._id} 
                    className="border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{application.jobId.title}</h3>
                      <p className="text-gray-600">{application.jobId.company.name}</p>
                      <p className="text-sm text-gray-500">
                        Applied on: {formatDateString(application.appliedAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        application.status === 'interview' ? 'bg-blue-100 text-blue-800' :
                        'bg-teal-100 text-teal-800'
                      }`}>
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

              <div className="flex items-center justify-between mt-6">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="text-gray-700">Page {page} of {totalPages}</span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShowJobs;