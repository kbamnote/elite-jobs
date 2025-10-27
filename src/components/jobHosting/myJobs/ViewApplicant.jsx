import React, { useState } from "react";
import { User, Mail, MapPin, Star } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import JobHostingSidebar from "../commonHost/jobHostingSidebar";

const ViewApplicant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("all");

  // Static data for design-only mode
  const staticApplicants = [
    {
      _id: "1",
      applicantId: {
        fullName: "John Smith",
        email: "john.smith@email.com",
        city: "San Francisco, CA",
        skills: ["React", "JavaScript", "TypeScript", "CSS"]
      },
      shortListed: true
    },
    {
      _id: "2",
      applicantId: {
        fullName: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        city: "New York, NY",
        skills: ["Node.js", "Express", "MongoDB", "Python"]
      },
      shortListed: false
    },
    {
      _id: "3",
      applicantId: {
        fullName: "Michael Chen",
        email: "michael.chen@email.com",
        city: "Seattle, WA",
        skills: ["Vue.js", "Angular", "PHP", "MySQL"]
      },
      shortListed: true
    },
    {
      _id: "4",
      applicantId: {
        fullName: "Emily Davis",
        email: "emily.davis@email.com",
        city: "Austin, TX",
        skills: ["React Native", "Flutter", "Swift", "Kotlin"]
      },
      shortListed: false
    },
    {
      _id: "5",
      applicantId: {
        fullName: "David Wilson",
        email: "david.wilson@email.com",
        city: "Los Angeles, CA",
        skills: ["AWS", "Docker", "Kubernetes", "DevOps"]
      },
      shortListed: true
    },
    {
      _id: "6",
      applicantId: {
        fullName: "Lisa Anderson",
        email: "lisa.anderson@email.com",
        city: "Chicago, IL",
        skills: ["UI/UX Design", "Figma", "Adobe XD", "Prototyping"]
      },
      shortListed: false
    }
  ];

  // Filter applicants based on view mode
  const applicants = viewMode === "shortlisted" 
    ? staticApplicants.filter(app => app.shortListed)
    : staticApplicants;

  const handleViewProfile = (application) => {
    navigate(`/applicant/${application._id}`, { state: { application } });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="lg:w-1/4 w-0 h-screen fixed">
        <JobHostingSidebar />
      </div>

      <div className="ml-0 lg:ml-80 flex-1 min-h-screen p-2 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-md lg:p-6 p-2 mb-8">
            <h1 className="lg:text-3xl text-xl lg:text-left text-center font-bold text-teal-600">
              {viewMode === "all" ? "Job Applicants" : "Shortlisted Applicants"}
            </h1>

            {/* Tab Navigation */}
            <div className="flex gap-6 mt-6">
              <button
                className={`px-4 py-3 font-semibold transition-all duration-200 ${
                  viewMode === "all"
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "text-gray-500 hover:text-teal-600 cursor-pointer"
                }`}
                onClick={() => setViewMode("all")}
              >
                All Applicants
              </button>
              <button
                className={`px-4 py-3 font-semibold transition-all duration-200 ${
                  viewMode === "shortlisted"
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "text-gray-500 hover:text-teal-600 cursor-pointer"
                }`}
                onClick={() => setViewMode("shortlisted")}
              >
                Shortlisted
              </button>
            </div>
          </div>

          <div className="mt-6">
            {applicants.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <p className="text-lg text-gray-600">
                  {viewMode === "shortlisted"
                    ? "No shortlisted applicants yet."
                    : "No applicants yet."}
                </p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  {applicants.map((application) => (
                    <div
                      key={application._id}
                      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-teal-100 rounded-xl">
                          <User className="text-teal-600 w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {application?.applicantId?.fullName || "N/A"}
                          </h3>
                          <p className="text-gray-500">
                            {application?.applicantId?.email || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-3 text-gray-600">
                          <Mail className="w-5 h-5 text-teal-500" />
                          <span>
                            {application?.applicantId?.email || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                          <MapPin className="w-5 h-5 text-teal-500" />
                          <span>{application?.applicantId?.city || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-600">
                          <Mail className="w-5 h-5 text-teal-500" />
                          <span>
                            {application?.applicantId?.skills?.join(", ") ||
                              "N/A"}
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="mt-6">
                        {application.shortListed ? (
                          <span className="px-4 py-2 bg-teal-50 text-teal-600 rounded-lg text-sm font-semibold inline-flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            Shortlisted
                          </span>
                        ) : (
                          <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-semibold">
                            Under Review
                          </span>
                        )}
                      </div>

                      {/* Spacer to push button to bottom */}
                      <div className="flex-grow"></div>

                      {/* View Profile button always at the bottom */}
                      <div className="mt-6">
                        <button
                          onClick={() => handleViewProfile(application)}
                          className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-all duration-200"
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Button - Static for design */}
                <div className="mt-8 text-center">
                  <button
                    onClick={() => console.log("Load more clicked")}
                    className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-all duration-200"
                  >
                    Load More
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicant;