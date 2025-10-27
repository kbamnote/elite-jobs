import React from "react";
import { FaBriefcase, FaUsers, FaUserCheck } from "react-icons/fa";

const Statistics = ({ stats }) => {
  // Use static data if no stats provided
  const defaultStats = {
    totalJobs: 12,
    totalApplicants: 156,
    totalShortlisted: 23
  };

  const displayStats = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4 border border-gray-200">
        <div className="p-4 bg-teal-100 text-teal-600 rounded-full">
          <FaBriefcase size={24} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {displayStats.totalJobs}
          </h3>
          <p className="text-gray-500 text-sm">Total Jobs</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4 border border-gray-200">
        <div className="p-4 bg-teal-100 text-teal-600 rounded-full">
          <FaUsers size={24} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {displayStats.totalApplicants}
          </h3>
          <p className="text-gray-500 text-sm">Total Applicants</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4 border border-gray-200">
        <div className="p-4 bg-teal-100 text-teal-600 rounded-full">
          <FaUserCheck size={24} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {displayStats.totalShortlisted}
          </h3>
          <p className="text-gray-500 text-sm">Total Shortlisted</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;