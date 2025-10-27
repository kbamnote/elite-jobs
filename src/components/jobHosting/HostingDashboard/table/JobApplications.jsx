import React, { useState, useEffect } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Filter,
  User,
  Briefcase,
  Phone,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const JobApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasRealData] = useState(true); // Set to true for static data
  const [statusFilter, setStatusFilter] = useState("all");
  const [pagination] = useState({
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
    totalItems: 8,
    totalPages: 1,
  });

  // Static data for design-only mode
  const staticApplications = [
    {
      date: "Dec 15, 2024",
      company: "TechCorp Solutions",
      position: "Frontend Developer",
      type: "Full-time",
      contact: "+1 (555) 123-4567",
      status: "Shortlisted",
      applicantName: "John Smith",
      logo: "blue",
    },
    {
      date: "Dec 14, 2024",
      company: "Digital Innovations",
      position: "UI/UX Designer",
      type: "Part-time",
      contact: "+1 (555) 234-5678",
      status: "Under Review",
      applicantName: "Sarah Johnson",
      logo: "purple",
    },
    {
      date: "Dec 13, 2024",
      company: "Future Systems",
      position: "Backend Developer",
      type: "Full-time",
      contact: "+1 (555) 345-6789",
      status: "Shortlisted",
      applicantName: "Mike Davis",
      logo: "indigo",
    },
    {
      date: "Dec 12, 2024",
      company: "Global Tech",
      position: "Data Analyst",
      type: "Contract",
      contact: "+1 (555) 456-7890",
      status: "Under Review",
      applicantName: "Emily Wilson",
      logo: "emerald",
    },
    {
      date: "Dec 11, 2024",
      company: "Smart Solutions",
      position: "Product Manager",
      type: "Full-time",
      contact: "+1 (555) 567-8901",
      status: "Shortlisted",
      applicantName: "David Brown",
      logo: "amber",
    },
    {
      date: "Dec 10, 2024",
      company: "Innovation Labs",
      position: "DevOps Engineer",
      type: "Full-time",
      contact: "+1 (555) 678-9012",
      status: "Under Review",
      applicantName: "Lisa Garcia",
      logo: "teal",
    },
    {
      date: "Dec 9, 2024",
      company: "Creative Agency",
      position: "Graphic Designer",
      type: "Part-time",
      contact: "+1 (555) 789-0123",
      status: "Shortlisted",
      applicantName: "Alex Martinez",
      logo: "rose",
    },
    {
      date: "Dec 8, 2024",
      company: "Tech Startup",
      position: "Software Engineer",
      type: "Full-time",
      contact: "+1 (555) 890-1234",
      status: "Under Review",
      applicantName: "Jennifer Lee",
      logo: "cyan",
    },
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setApplications(staticApplications);
      setLoading(false);
    }, 1000);
  }, [statusFilter]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Shortlisted":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "Under Review":
        return "bg-amber-100 text-amber-700 border border-amber-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  const handlePageChange = (newPage) => {
    // Static pagination - no actual functionality needed
    console.log("Page change to:", newPage);
  };

  const PaginationControls = () => (
    <div className="flex items-center justify-between border-t border-teal-200 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={!pagination.hasPrevPage}
          className={` inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
            pagination.hasPrevPage
              ? "text-gray-700 hover:bg-gray-50"
              : "text-gray-300 cursor-not-allowed"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={!pagination.hasNextPage}
          className={` ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
            pagination.hasNextPage
              ? "text-gray-700 hover:bg-gray-50"
              : "text-gray-300 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(pagination.currentPage - 1) * 10 + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(pagination.currentPage * 10, pagination.totalItems)}
            </span>{" "}
            of <span className="font-medium">{pagination.totalItems}</span>{" "}
            results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                !pagination.hasPrevPage && "opacity-50 cursor-not-allowed"
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            {[...Array(pagination.totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => handlePageChange(idx + 1)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  pagination.currentPage === idx + 1
                    ? "z-10 bg-teal-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                !pagination.hasNextPage && "opacity-50 cursor-not-allowed"
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = 
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" ||
      (statusFilter === "shortlisted" && app.status === "Shortlisted") ||
      (statusFilter === "underReview" && app.status === "Under Review");
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse text-teal-600">
            Loading applications...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-md">
      <div className="p-6">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Job Applications
              </h2>
              {!hasRealData && (
                <p className="text-sm text-gray-500 mt-1">
                  Your actual applications will appear here once you receive
                  them.
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="all">All Applications</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="underReview">Under Review</option>
              </select>
              <div className=" w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search applications..."
                  className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full min-w-max">
            <thead className="bg-teal-50">
              <tr>
                {[
                  "Sr.No",
                  "Date",
                  "Company",
                  "Applicant",
                  "Position",
                  "Job Type",
                  "Contact",
                  "Status",
                ].map((header) => (
                  <th
                    key={header}
                    className="text-left py-4 px-4 text-sm font-medium text-teal-900 bg-teal-100 whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.map((app, index) => (
                <tr key={index} className="hover:bg-teal-50 transition-colors">
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {app.date}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="font-medium text-teal-800 lg:text-sm">
                          {app.company}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    {app.applicantName}
                  </td>

                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {app.position}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {app.type}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {app.contact}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusStyle(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredApplications.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No applications found matching your search.
              </p>
            </div>
          )}
        </div>

        {hasRealData && <PaginationControls />}
      </div>
    </div>
  );
};

export default JobApplications;