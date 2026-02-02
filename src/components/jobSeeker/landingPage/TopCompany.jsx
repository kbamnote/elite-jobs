import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAllCompanies } from "../../../utils/Api";

const TopCompany = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await getAllCompanies();
        
        if (response.data.success) {
          setCompanies(response.data.data);
        } else {
          setError("Failed to fetch companies");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Function to handle company click and navigate to Jobs page
  const handleViewJobs = (companyName) => {
    navigate(`/jobs?company=${encodeURIComponent(companyName)}`);
  };

  // Function to handle website visit
  const handleVisitWebsite = (websiteUrl, e) => {
    e.stopPropagation();
    if (websiteUrl && websiteUrl !== "#") {
      window.open(websiteUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen px-[10%] lg:py-16" style={{background: 'linear-gradient(to bottom, var(--color-accent-light), white)'}}>
        <div className="text-center mb-12">
          <div className="h-10 bg-[var(--color-border)] rounded w-80 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-[var(--color-border)] rounded w-96 mx-auto animate-pulse"></div>
        </div>
        
        {/* Company Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
            >
              {/* Company header skeleton */}
              <div className="p-6" style={{background: 'linear-gradient(to right, var(--color-accent-light), var(--color-accent-light))'}}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-[var(--color-border)] animate-pulse"></div>
                  <div>
                    <div className="h-6 bg-[var(--color-border)] rounded w-32 mb-2 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Company details skeleton */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-auto">
                  <div className="h-4 bg-[var(--color-border)] rounded w-full mb-2 animate-pulse"></div>
                  <div className="h-4 bg-[var(--color-border)] rounded w-5/6 mb-4 animate-pulse"></div>
                  <div className="h-4 bg-[var(--color-border)] rounded w-3/4 mb-4 animate-pulse"></div>
                </div>

                <div className="flex gap-3 mt-auto">
                  <div className="h-12 bg-[var(--color-border)] rounded-xl animate-pulse flex-1"></div>
                  <div className="h-12 bg-[var(--color-border)] rounded-xl animate-pulse flex-1"></div>
                </div>
              </div>
            </div>
          ))}
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

      {/* Grid of Companies */}
      {companies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.slice(0, 6).map((company, index) => ( // Show only first 6 companies
            <div
              key={`${company.companyName}-${index}`}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group hover:-translate-y-1 flex flex-col"
            >
              {/* Company header */}
              <div className="p-6" style={{background: 'linear-gradient(to right, var(--color-accent-light), var(--color-accent-light))'}}>
                <div className="grid items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white p-2 shadow-sm">
                    <img
                      src={company.companyInfo.logo || 'https://placehold.co/60x60'}
                      alt={company.companyName}
                      className="w-full h-full object-contain"
                      onError={(e) => { e.target.src = 'https://placehold.co/60x60'; }}
                    />
                  </div>
                  <div className="grid">
                    <h3 className="text-xl font-bold text-gray-900 truncate">
                      {company.companyName}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Company details */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {company.companyInfo.description || "No description available"}
                  </p>
                </div>

                <div className="flex gap-3 mt-auto">
                  <button
                    className="bg-[#E94560] text-white w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 text-center block shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                    onClick={() => handleViewJobs(company.companyName)}
                  >
                    Show Jobs
                  </button>
                  
                  <button
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                    onClick={(e) => handleVisitWebsite(company.companyInfo.website, e)}
                  >
                    <FaExternalLinkAlt size={14} />
                    Visit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No companies available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default TopCompany;