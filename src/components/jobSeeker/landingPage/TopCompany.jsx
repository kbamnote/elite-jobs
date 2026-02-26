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
      <div className=" px-[10%] py-16" style={{background: 'linear-gradient(to bottom, var(--color-accent-light), white)'}}>
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
      
      {/* New Company Benefits Section */}
      <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--color-primary)' }}>Why Top Companies Choose Us</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2">Access to Talent</h4>
            <p className="text-gray-600">Connect with qualified candidates from our extensive database</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2">Fast Hiring</h4>
            <p className="text-gray-600">Reduce time-to-hire with our streamlined recruitment process</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2">Cost Effective</h4>
            <p className="text-gray-600">Save on recruitment costs with our competitive pricing</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2">Verified Quality</h4>
            <p className="text-gray-600">All candidates are pre-screened and verified for quality</p>
          </div>
        </div>
      </div>
      
      {/* New CTA for Employers */}
      <div className="mt-16 text-center bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-12 text-white">
        <h3 className="text-3xl font-bold mb-4">Looking to Hire Top Talent?</h3>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Join our network of leading companies and find the perfect candidates for your team</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
            Post a Job
          </button>
          <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-indigo-600 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopCompany;