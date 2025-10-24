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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
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
        const response = await allJobs();
        const jobsData = response.data.data.jobs;
        // Transform the API data to match the existing structure
        const transformedJobs = jobsData.map((job) => ({
          id: job._id,
          title: job.title,
          company: job.company.name,
          category: job.category || "Other",
          type: job.employmentType || "Full-time",
          salary: `${job.salary?.min || 0} - ${job.salary?.max || 0} ${job.salary?.currency || 'USD'}`,
          location: job.location,
          worktype: job.employmentType,
          experience: job.experienceLevel || "Not specified",
          logo: job.company.logo || job.postedBy?.profile?.companyLogo || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company.name)}&background=random`, // Use company logo if available
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
    navigate(
      `/jobs?title=${encodeURIComponent(
        job.title
      )}&company=${encodeURIComponent(job.company)}`
    );
  };

  if (loading) {
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
            <p className="text-gray-500">Loading jobs...</p>
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
            className="group flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors duration-200"
          >
            View all jobs
            <span className="transform group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </Link>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={32}
          slidesPerView={1}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 16 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
          }}
          className="pb-12"
        >
          {jobs.map((job) => (
            <SwiperSlide key={job.id}>
              <div
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col min-h-[25rem] p-8 hover:-translate-y-1 cursor-pointer"
                onClick={() => handleJobClick(job)}
              >
                <div className="flex items-start gap-6 relative">
                  <button
                    className="absolute right-0 top-0 text-gray-300 hover:text-teal-600 transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click when clicking bookmark
                    }}
                  ></button>
                  <div className="relative">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center">
                      <img
                        src={job.logo}
                        alt={job.company}
                        className="w-16 h-16 object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors duration-200">
                      {job.title}
                    </h3>
                    <p className="text-gray-500 text-base">{job.company}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-12 text-gray-600 text-base">
                  <div className="flex items-center gap-3">
                    <TbCategory className="w-5 h-5 text-teal-600" />
                    <span className="truncate">{job.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GiWallet className="w-5 h-5 text-teal-600" />
                    <span className="truncate">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-teal-600" />
                    <span className="truncate">{job.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Laptop className="w-5 h-5 text-teal-600" />
                    <span className="truncate">{job.worktype}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-5 h-5 text-teal-600" />
                    <span className="truncate">{job.experience}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-teal-600" />
                    <span className="truncate">{job.location}</span>
                  </div>
                </div>

                <div className="mt-auto pt-3">
                  <button
                    className="w-full px-8 py-4 text-base font-medium text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-all duration-200 shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJobClick(job);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RecentJobs;