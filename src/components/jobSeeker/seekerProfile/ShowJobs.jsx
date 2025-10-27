import React, { useState } from "react";
import Header from "../commonSeeker/Header";
import Footer from "../commonSeeker/Footer";

const mockApplications = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechVerse Solutions",
    status: "Under Review",
    appliedOn: "2025-10-01",
  },
  {
    id: 2,
    title: "Data Analyst",
    company: "Data Insight Ltd.",
    status: "Interview Scheduled",
    appliedOn: "2025-09-24",
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "CloudOps Inc.",
    status: "Rejected",
    appliedOn: "2025-09-20",
  },
];

const ShowJobs = () => {
  const [page, setPage] = useState(1);
  const pageSize = 2;

  const start = (page - 1) * pageSize;
  const current = mockApplications.slice(start, start + pageSize);
  const totalPages = Math.ceil(mockApplications.length / pageSize);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">My Applications</h1>

          <div className="space-y-4">
            {current.map((app) => (
              <div key={app.id} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{app.title}</h3>
                  <p className="text-gray-600">{app.company}</p>
                  <p className="text-sm text-gray-500">Applied on: {app.appliedOn}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm bg-teal-100 text-teal-700">{app.status}</span>
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShowJobs;