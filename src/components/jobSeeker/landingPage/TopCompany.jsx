import React, { useEffect, useState } from "react";
import { MapPin, Briefcase, Clock, Star, ExternalLink } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import { TbCategory } from "react-icons/tb";
import { allJobs } from "../../../utils/Api";

const TopCompany = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await allJobs();
        const jobsData = response.data.data.jobs;
        
        // Filter jobs to only show verified jobs
        const verifiedJobs = jobsData.filter(job => job.verificationStatus === 'verified');
        
        // Extract unique companies from jobs
        const companyMap = new Map();
        
        verifiedJobs.forEach(job => {
          const companyId = job.postedBy._id;
          if (!companyMap.has(companyId)) {
            companyMap.set(companyId, {
              id: companyId,
              company: job.company.name,
              logo: job.company.logo || job.postedBy.profile.companyLogo || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company.name)}&background=random`,
              description: job.company.description || job.postedBy.profile.companyDescription || "No description available",
              website: job.company.website || job.postedBy.profile.companyWebsite || "#",
              jobsCount: 1,
              rating: 4.5, // Static rating for now
              location: job.location
            });
          } else {
            // Increment job count for existing company
            const company = companyMap.get(companyId);
            company.jobsCount += 1;
            companyMap.set(companyId, company);
          }
        });
        
        setCompanies(Array.from(companyMap.values()));
      } catch (err) {
        setError(err.message);
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Function to handle company click and navigate to Jobs page
  const handleCompanyClick = (companyName) => {
    navigate(`/jobs?title=${encodeURIComponent(companyName)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen px-[10%] lg:py-16" style={{background: 'linear-gradient(to bottom, var(--color-accent-light), white)'}}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Top Companies Hiring
          </h1>
          <p className="text-gray-600 text-lg">
            Discover opportunities at leading organizations worldwide.
          </p>
        </div>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading companies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen px-[10%] lg:py-16" style={{background: 'linear-gradient(to bottom, var(--color-accent-light), white)'}}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Top Companies Hiring
          </h1>
          <p className="text-gray-600 text-lg">
            Discover opportunities at leading organizations worldwide.
          </p>
        </div>
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">Error loading companies: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-[10%] lg:py-16" style={{background: 'linear-gradient(to bottom, var(--color-accent-light), white)'}}>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Top Companies Hiring
        </h1>
        <p className="text-gray-600 text-lg">
          Discover opportunities at leading organizations worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {companies.map((company) => (
          <div
            key={company.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group hover:-translate-y-1 cursor-pointer"
            onClick={() => handleCompanyClick(company.company)}
          >
            {/* Company header */}
            <div className="p-6" style={{background: 'linear-gradient(to right, var(--color-accent-light), var(--color-accent-light))'}}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-white p-2 shadow-sm">
                  <img
                    src={company.logo}
                    alt={company.company}
                    className="w-full h-full object-contain"
                    onError={(e) => { e.target.src = 'https://placehold.co/60x60'; }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {company.company}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < Math.floor(company.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Company details */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="mb-auto">
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {company.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Briefcase className="w-5 h-5 flex-shrink-0" style={{color: 'var(--color-accent)'}} />
                    <span>{company.jobsCount} Active Jobs</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 flex-shrink-0" style={{color: 'var(--color-accent)'}} />
                    <span>{company.location}</span>
                  </div>
                </div>
              </div>

              <button
                className="btn-accent w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 text-center block shadow-sm hover:shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCompanyClick(company.company);
                }}
              >
                View Jobs
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCompany;