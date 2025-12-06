import React, { useEffect, useState } from "react";
import {
  Bookmark,
  UserCheck,
  Clock,
  MapPin,
  Briefcase,
  Laptop,
  DollarSign,
} from "lucide-react";
import { GiWallet } from "react-icons/gi";
import { TbCategory } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { allJobs } from "../../../utils/Api";

const RecentJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        let allJobsData = [];
        let page = 1;
        let hasMore = true;
        
        // Fetch all jobs using pagination
        while (hasMore) {
          const response = await allJobs({ page, limit: 50 }); // Fetch 50 jobs per page
          
          if (response.data.data.jobs) {
            const newJobs = response.data.data.jobs;
            allJobsData = [...allJobsData, ...newJobs];
            
            // Check if there are more pages
            if (response.data.data.currentPage >= response.data.data.totalPages) {
              hasMore = false;
            } else {
              page++;
            }
          } else {
            hasMore = false;
          }
        }
        
        // Filter jobs to only show verified jobs
        const verifiedJobs = allJobsData.filter(job => 
          job.verificationStatus === 'verified'
        );
        
        // Transform the API data to match the existing structure
        const transformedJobs = verifiedJobs.map((job) => ({
          id: job._id,
          title: job.title,
          company: job.company?.name || job.postedBy?.profile?.companyName || "Unknown Company",
          category: job.category || "Other",
          type: job.jobType || "Full-time",
          salary: `${job.salary?.min || 0} - ${job.salary?.max || 0} ${job.salary?.currency || 'INR'}`,
          location: job.location,
          worktype: job.workType,
          experience: job.experienceLevel || "Not specified",
          logo: job.company?.logo || job.postedBy?.profile?.companyLogo || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company?.name || job.postedBy?.profile?.companyName || 'Company')}&background=random`,
          interviewType: job.interviewType,
          noticePeriod: job.noticePeriod,
          minEducation: job.minEducation
        }));
        setJobs(transformedJobs);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Function to handle job card click
  const handleJobClick = (job) => {
    navigate(`/jobs/${job.id}`);
  };

  if (loading) {
    return (
      <div className="w-full bg-gradient-to-b from-gray-50 to-white h-[70%]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <div className="h-8 bg-[var(--color-border)] rounded w-64 mb-2 animate-pulse"></div>
              <div className="h-4 bg-[var(--color-border)] rounded w-48 animate-pulse"></div>
            </div>
            <div className="h-4 bg-[var(--color-border)] rounded w-24 animate-pulse"></div>
          </div>
          
          {/* Job Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col min-h-[25rem] p-8"
              >
                <div className="flex items-start gap-6 relative">
                  <div className="w-20 h-20 rounded-xl bg-[var(--color-border)] animate-pulse flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="h-6 bg-[var(--color-border)] rounded w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-[var(--color-border)] rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-12">
                  {[...Array(6)].map((_, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-[var(--color-border)] rounded animate-pulse"></div>
                      <div className="h-4 bg-[var(--color-border)] rounded w-3/4 animate-pulse"></div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-3">
                  <div className="h-12 bg-[var(--color-border)] rounded-xl animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-gradient-to-b from-gray-50 to-white h-[70%]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Recent Job Openings
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Discover your next career opportunity
              </p>
            </div>
            <Link
              to="/jobs"
              className="group flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors duration-200"
            >
              View all jobs
              <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </Link>
          </div>
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">Error loading jobs: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white h-[70%]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Recent Job Openings
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Discover your next career opportunity
            </p>
          </div>
          <Link
            to="/jobs"
            className="group flex items-center gap-2 font-medium transition-colors duration-200"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-body)' }}
          >
            View all jobs
            <span className="transform group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </Link>
        </div>

        {/* Replaced Swiper with Grid */}
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.slice(0, 6).map((job) => ( // Show only first 6 jobs
              <div
                key={job.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col min-h-[25rem] p-8 hover:-translate-y-1 cursor-pointer"
                onClick={() => handleJobClick(job)}
              >
                <div className="flex items-start gap-6 relative">
                  <button
                    className="absolute right-0 top-0 text-gray-300 transition-colors duration-200"
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                    onMouseLeave={(e) => e.target.style.color = ''}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click when clicking bookmark
                    }}
                  ></button>
                  <div className="relative">
                    <div className="w-20 h-20 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, var(--color-accent-light), var(--color-accent-light))' }}>
                      <img
                        src={job.logo}
                        alt={job.company}
                        className="w-16 h-16 object-cover"
                        onError={(e) => { e.target.src = 'https://placehold.co/60x60'; }}
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 transition-colors duration-200" style={{ fontFamily: 'var(--font-heading)' }}>
                      {job.title}
                    </h3>
                    <p className="text-gray-500 text-base">{job.company}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-12 text-gray-600 text-base">
                  <div className="flex items-center gap-3">
                    <TbCategory className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                    <span className="truncate">{job.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GiWallet className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                    <span className="truncate">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                    <span className="truncate">{job.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Laptop className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                    <span className="truncate">{job.worktype}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                    <span className="truncate">{job.experience}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                    <span className="truncate">{job.location}</span>
                  </div>
                </div>

                <div className="mt-auto pt-3">
                  <button
                    className="btn-accent w-full px-8 py-4 text-base font-medium rounded-xl transition-all duration-200 shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJobClick(job);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No jobs available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentJobs;