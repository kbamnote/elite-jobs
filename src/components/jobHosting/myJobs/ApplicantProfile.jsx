import React, { useState } from "react";
import { useParams } from "react-router-dom";
import JobHostingSidebar from "../commonHost/jobHostingSidebar";

const ApplicantProfile = () => {
  const { id } = useParams();
  
  // Static application data for design-only mode
  const [application, setApplication] = useState({
    shortListed: false,
    applicantId: {
      fullName: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phoneNumber: "+1 (555) 987-6543",
      gender: "Female",
      dateOfBirth: "1995-03-15",
      address: "456 Oak Avenue",
      city: "San Francisco",
      state: "California",
      country: "United States",
      pincode: "94102",
      eduDegree: "Bachelor of Science",
      eduSpecialisation: "Computer Science",
      eduInstitution: "Stanford University",
      eduStartYear: "2013-09-01",
      eduEndYear: "2017-06-01",
      expPosition: "Frontend Developer",
      expCompany: "Tech Solutions Inc.",
      expStartYear: "2017-07-01",
      expEndYear: "2023-12-01",
      skills: ["React", "JavaScript", "TypeScript", "Node.js", "CSS", "HTML"],
      projectUrl: "https://github.com/sarahjohnson/portfolio",
      summary: "Experienced frontend developer with 6+ years of experience in building responsive web applications using React and modern JavaScript frameworks. Passionate about creating user-friendly interfaces and optimizing performance."
    },
    jobId: {
      companyName: "Elite Tech Solutions",
      companyEmail: "hr@elitetech.com",
      companyURL: "https://www.elitetech.com"
    }
  });

  const handleShorlisted = () => {
    setApplication(prev => ({
      ...prev,
      shortListed: !prev.shortListed
    }));
  };

  const applicant = application.applicantId;
  const job = application.jobId;

  return (
    <div className="flex min-h-screen">
      <div className="lg:w-1/4 w-0 h-screen fixed">
        <JobHostingSidebar/>
      </div>
      <div className="ml-0 lg:ml-80 flex-1 min-h-screen bg-gray-100 p-2 lg:p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-2 lg:p-6">
          <div className="rounded-2xl bg-gradient-to-r from-teal-800 to-teal-500 px-6 py-5 w-full flex justify-between items-center">
            <h2 className="lg:text-3xl text-lg font-bold text-white">Applicant Details</h2>
            <button
              onClick={handleShorlisted}
              className={`cursor-pointer rounded-4xl bg-white text-black p-3 ${
                application.shortListed ? "bg-teal-500 text-black" : ""
              }`}
            >
              {application.shortListed ? "Shortlisted" : "Shortlist"}
            </button>
          </div>

          <div className="lg:p-6 p-2">
            <div className="bg-white rounded-2xl shadow-lg lg:p-6 p-2">
              {/* Job Details */}
              <div className="mb-8 bg-blue-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Applied Job Details
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <p className="text-gray-600">Company Name</p>
                    <p className="font-semibold">{job?.companyName || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Company Email</p>
                    <p className="font-semibold">
                      {job?.companyEmail || "N/A"}
                    </p>
                  </div>
                  {job?.companyURL && (
                    <div>
                      <p className="text-gray-600">Company Website</p>
                      <a
                        href={job.companyURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {job.companyURL}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Personal Information */}
              <div className="mb-8 bg-blue-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <p className="text-gray-600">Full Name</p>
                    <p className="font-semibold">
                      {applicant.fullName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-semibold">{applicant.email || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <p className="font-semibold">
                      {applicant.phoneNumber || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Gender</p>
                    <p className="font-semibold">{applicant.gender || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Date of Birth</p>
                    <p className="font-semibold">
                      {applicant.dateOfBirth
                        ? new Date(applicant.dateOfBirth).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="mb-8 bg-blue-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Address
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <p className="text-gray-600">Street</p>
                    <p className="font-semibold">
                      {applicant.address || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">City</p>
                    <p className="font-semibold">{applicant.city || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">State</p>
                    <p className="font-semibold">{applicant.state || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Country</p>
                    <p className="font-semibold">
                      {applicant.country || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Pincode</p>
                    <p className="font-semibold">
                      {applicant.pincode || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="mb-8 bg-blue-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Education
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <p className="text-gray-600">Degree</p>
                    <p className="font-semibold">
                      {applicant.eduDegree || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Specialization</p>
                    <p className="font-semibold">
                      {applicant.eduSpecialisation || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Institution</p>
                    <p className="font-semibold">
                      {applicant.eduInstitution || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Duration</p>
                    <p className="font-semibold">
                      {applicant.eduStartYear && applicant.eduEndYear
                        ? `${new Date(
                            applicant.eduStartYear
                          ).getFullYear()} - ${new Date(
                            applicant.eduEndYear
                          ).getFullYear()}`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="mb-8 bg-blue-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Experience
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <p className="text-gray-600">Position</p>
                    <p className="font-semibold">
                      {applicant.expPosition || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Company</p>
                    <p className="font-semibold">
                      {applicant.expCompany || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Duration</p>
                    <p className="font-semibold">
                      {applicant.expStartYear && applicant.expEndYear
                        ? `${new Date(
                            applicant.expStartYear
                          ).getFullYear()} - ${new Date(
                            applicant.expEndYear
                          ).getFullYear()}`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills & Links */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(applicant.skills) &&
                    applicant.skills.length > 0 ? (
                      applicant.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No skills listed</p>
                    )}
                  </div>
                </div>
                <div className="bg-indigo-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Links
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-600">Project URL</p>
                      {applicant.projectUrl ? (
                        <a
                          href={applicant.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {applicant.projectUrl}
                        </a>
                      ) : (
                        <p className="text-gray-500">No project URL provided</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="mt-8 bg-blue-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Summary
                </h3>
                <p className="text-gray-700">
                  {applicant.summary || "No summary provided"}
                </p>
              </div>

              {/* Application Status */}
              <div className="mt-8 bg-blue-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Application Status
                </h3>
                <p className="font-semibold text-green-600">
                  {application.shortListed ? "Shortlisted" : "Under Review"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfile;