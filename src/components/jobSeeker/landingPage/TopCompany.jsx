import React from "react";
import { MapPin, Briefcase, Clock, Star, ExternalLink } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import { TbCategory } from "react-icons/tb";

const TopCompany = () => {
  const navigate = useNavigate();

  const popularJobs = [
    
      {
        company: "Google",
        logo: "https://www.pngmart.com/files/22/Google-PNG-Pic.png",
        position: "Senior Software Engineer",
        location: "Mountain View, CA",
        jobType: "Full-time",
        salary: "12 LPA - 30 LPA",
        category: "Human Resource",
        applyUrl: "https://careers.google.com",
        rating: 4.8,
        reviewCount: 12453,
        workType: "Hybrid",
        experience: "3 to 5 years",
        description:
          "Join our innovative team to build next-generation search technologies that help billions of users worldwide.",
        benefits: [
          "Flexible work hours",
          "Comprehensive health benefits",
          "Professional development",
          "Stock options",
        ],
      },
      {
        company: "Amazon",
        logo: "https://pngteam.com/images/amazon-logo-png-2400x2001_abf78dd4_transparent_202878.png.png",
        position: "Product Manager",
        location: "Seattle, WA",
        jobType: "Full-time",
        salary: "10 LPA - 25 LPA",
        category: "Data Science",
        applyUrl: "https://amazon.jobs",
        rating: 4.6,
      
        workType: "OnSite",
        experience: "more than 5 years",
        description:
          "Drive the strategy and execution of customer-centric products that revolutionize e-commerce experience.",
        benefits: [
          "Remote work options",
          "401(k) matching",
          "Relocation assistance",
          "Career advancement",
        ],
      },
      {
        company: "Microsoft",
        logo: "https://www.freepnglogos.com/uploads/microsoft-windows-logo-png-images-30.png",
        position: "Cloud Solutions Architect",
        location: "Redmond, WA",
        jobType: "Full-time",
        salary: "14 LPA - 40 LPA",
        category: "Data Science",
        applyUrl: "https://careers.microsoft.com",
        rating: 4.7,
        
        workType: "Remote",
        experience: "3 to 5 years",
        description:
          "Help enterprise customers design and implement cutting-edge solutions using Microsoft's Azure cloud platform.",
        benefits: [
          "Work-life balance",
          "Generous PTO",
          "Training allowance",
          "Health & wellness programs",
        ],
      },
      {
        company: "Apple",
        logo: "https://www.pngall.com/wp-content/uploads/11/Apple-Logo-PNG-HD-Image.png",
        position: "iOS Developer",
        location: "Cupertino, CA",
        jobType: "Full-time",
        salary: "13 LPA - 16 LPA",
        category: "Data Science",
        applyUrl: "https://apple.com/careers",
        rating: 4.9,
        
        workType: "OnSite",
        experience: "1 to 3 years",
        description: "Join Apple to work on cutting-edge iOS applications and contribute to our growing ecosystem.",
        benefits: [
          "Employee stock purchase plan",
          "Wellness and fitness reimbursement",
          "Advanced training programs",
          "Flexible work schedules",
        ],
      },
      {
        company: "Meta",
        logo: "https://www.buscopng.com/wp-content/uploads/Meta-logo-6cbf608d.png",
        position: "AR/VR Engineer",
        location: "Menlo Park, CA, USA",
        jobType: "Full-time",
        salary: "11 LPA - 15 LPA",
        category: "IT & Networking",
        applyUrl: "https://meta.com/careers",
        rating: 4.5,
       
        workType: "Hybrid",
        experience: "3 to 5 years",
        description:
          "Develop and optimize AR/VR applications that power the future of virtual interactions at Meta.",
        benefits: [
          "Health and wellness benefits",
          "Remote-friendly policies",
          "Stock options",
          "Professional development programs",
        ],
      },
      {
        company: "Netflix",
        logo: "https://i.pinimg.com/originals/56/51/14/5651147964cb73f605089b47df4fe70f.png",
        position: "Senior Backend Engineer",
        location: "Los Gatos, CA, USA",
        jobType: "Full-time",
        salary: "11 LPA - 15 LPA",
        category: "Data Science",
        applyUrl: "https://netflix.com/careers",
        rating: 4.7,
       
        workType: "Remote",
        experience: "more than 5 years",
        description:
          "Build and optimize scalable backend systems that support Netflix's global content delivery.",
        benefits: [
          "Unlimited vacation policy",
          "Free Netflix subscription",
          "Health insurance coverage",
          "Employee wellness programs",
        ],
      },
    
    
  ];

  // Function to handle company click and navigate to Jobs page
  const handleCompanyClick = (companyName) => {
    navigate(`/jobs?title=${encodeURIComponent(companyName)}`);
  };

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
        {popularJobs.map((job, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group hover:-translate-y-1"
          >
            {/* Company header */}
            <div className="p-6" style={{background: 'linear-gradient(to right, var(--color-accent-light), var(--color-accent-light))'}}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-white p-2 shadow-sm">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {job.company}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < Math.floor(job.rating)
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

            {/* Job details */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="mb-auto">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  {job.position}
                </h4>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <TbCategory className="w-5 h-5 flex-shrink-0" style={{color: 'var(--color-accent)'}} />
                    <span>{job.category}</span>
                  </div>
                 
                  <div className="flex items-center gap-3 text-gray-600">
                    <Briefcase className="w-5 h-5 flex-shrink-0" style={{color: 'var(--color-accent)'}} />
                    <span>{job.jobType}</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 flex-shrink-0" style={{color: 'var(--color-accent)'}} />
                    <span>{job.location}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl mb-6" style={{backgroundColor: 'var(--color-accent-light)'}}>
                  <p className="font-medium mb-1" style={{color: 'var(--color-accent)', fontFamily: 'var(--font-heading)'}}>
                    Compensation
                  </p>
                  <p className="text-gray-700 font-semibold">{job.salary}</p>
                </div>
              </div>

              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 text-center block shadow-sm hover:shadow-md"
                onClick={(e) => e.stopPropagation()}
              >
                Apply Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCompany;
