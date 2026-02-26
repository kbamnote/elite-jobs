import React, { useState, useEffect } from "react";
import { 
  FaDesktop, 
  FaDatabase, 
  FaShoppingBag, 
  FaWallet, 
  FaBuilding, 
  FaGraduationCap, 
  FaUsers, 
  FaTruck, 
  FaWrench, 
  FaCamera, 
  FaStethoscope, 
  FaChartBar, 
  FaStore, 
  FaShieldAlt, 
  FaPalette, 
  FaHammer, 
  FaCar, 
  FaBook, 
  FaHeadphones, 
  FaIndustry, 
  FaHome, 
  FaPlane, 
  FaBriefcase, 
  FaBullhorn, 
  FaCloud, 
  FaDraftingCompass, 
  FaVideo,  
  FaDollarSign, 
  FaQuestionCircle,
  FaMotorcycle,
  // Adding missing icons
  FaBolt,
  FaGavel,
  FaSeedling,
  FaMobileAlt,
  FaMicroscope,
  FaCheck
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { allCategories } from "../../../utils/Api";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12); // Start with 12 categories
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Icon mapping for categories - only define icons for known categories
  // For unknown categories, a default icon will be used
  const iconMap = {
    "IT & Networking": FaDesktop,
    "Sales & Marketing": FaShoppingBag,
    "Accounting": FaWallet,
    "Data Science": FaDatabase,
    "Digital Marketing": FaBuilding,
    "Human Resource": FaGraduationCap,
    "Customer Service": FaHeadphones,
    "Project Manager": FaBriefcase,
    "Other": FaQuestionCircle,
    "Architect": FaDraftingCompass,
    "Assistant": FaUsers,
    "Cloud Computing": FaCloud,
    "Content Creator": FaCamera,
    "Data Analyst": FaChartBar,
    "Delivery": FaTruck,
    "Education & Training": FaBook,
    "Fashion": FaPalette,
    "Finance": FaDollarSign,
    "Fire & Safety": FaShieldAlt,
    "Government of Nagpur": FaBuilding,
    "Healthcare": FaStethoscope,
    "Helper": FaUsers,
    "Manufacturing": FaIndustry,
    "Marketing": FaBullhorn,
    "Media & Journalism": FaCamera,
    "Office Administrator": FaBriefcase,
    "Office Boy": FaUsers,
    "Retail & Store": FaStore,
    "Rider": FaMotorcycle,
    "Supply Chain": FaTruck,
    "Support": FaHeadphones,
    "Technician": FaWrench,
    "UI/UX Designer": FaPalette,
    "Video Editing": FaVideo,
    "Warehouse Operations": FaHome,
    "Automobile": FaCar,
    "Construction": FaHammer,
    "Sales & Management": FaShoppingBag,
    "Salesforce": FaCloud,
    "Travel": FaPlane
  };

  // Category groups for assigning icons to new categories based on keywords
  const categoryGroups = {
    technology: ["IT", "Technology", "Software", "Developer", "Programmer", "Coding", "Web", "Mobile", "App", "Computer", "System", "Network"],
    sales: ["Sales", "Selling", "Business", "Commerce", "Retail", "Marketing", "Advertising", "Promotion"],
    healthcare: ["Health", "Medical", "Hospital", "Clinic", "Doctor", "Nurse", "Patient", "Clinical"],
    finance: ["Finance", "Accounting", "Banking", "Money", "Payment", "Loan", "Investment", "Tax"],
    education: ["Education", "Teaching", "School", "University", "College", "Training", "Learning", "Academic"],
    construction: ["Construction", "Building", "Architecture", "Engineering", "Civil", "Structure"],
    transportation: ["Transport", "Delivery", "Driver", "Truck", "Logistics", "Shipping", "Freight"],
    customerService: ["Customer", "Service", "Support", "Help", "Call Center", "Client"],
    humanResources: ["HR", "Human Resource", "Recruitment", "Hiring", "Staff", "Employee", "Personnel"],
    government: ["Government", "Public", "Municipal", "City", "State", "Federal"],
    creative: ["Design", "Creative", "Art", "Graphic", "Video", "Photo", "Camera", "Media", "Journalism"],
    legal: ["Legal", "Law", "Attorney", "Lawyer", "Court", "Judge", "Paralegal"],
    administration: ["Admin", "Administration", "Office", "Secretary", "Clerk", "Coordinator"],
    manufacturing: ["Manufacturing", "Factory", "Production", "Assembly", "Industrial"],
    retail: ["Retail", "Store", "Shop", "Merchant", "Sales"],
    hospitality: ["Hospitality", "Hotel", "Restaurant", "Food", "Beverage", "Catering"],
    agriculture: ["Agriculture", "Farming", "Farm", "Agricultural", "Crop", "Livestock"],
    energy: ["Energy", "Electric", "Power", "Utility", "Oil", "Gas", "Renewable"],
    telecommunications: ["Telecom", "Communication", "Network", "Wireless", "Cellular", "Phone"],
    security: ["Security", "Safety", "Protection", "Guard", "Police", "Fire"],
    research: ["Research", "Science", "Laboratory", "Scientific", "Analyst", "Data"],
    quality: ["Quality", "QA", "Testing", "Inspection", "Compliance", "Audit"],
    maintenance: ["Maintenance", "Repair", "Technician", "Mechanic", "Electrician", "Plumber"],
    projectManagement: ["Project", "Management", "Manager", "Coordination", "Planning"],
    consulting: ["Consulting", "Consultant", "Advisory", "Strategy", "Analysis"]
  };

  // Default icon for categories not in the map
  const defaultIcon = FaDesktop;

  // Function to assign icons to categories based on keywords
  const getIconForCategory = (categoryName) => {
    // First check if we have a specific icon for this category
    if (iconMap[categoryName]) {
      return iconMap[categoryName];
    }

    // If not, try to match based on keywords
    const categoryUpper = categoryName.toUpperCase();
    
    // Check each group of keywords
    for (const [group, keywords] of Object.entries(categoryGroups)) {
      if (keywords.some(keyword => categoryUpper.includes(keyword))) {
        // Return appropriate icon based on group
        switch (group) {
          case 'technology': 
            return typeof FaDesktop !== 'undefined' ? FaDesktop : defaultIcon;
          case 'sales': 
            return typeof FaShoppingBag !== 'undefined' ? FaShoppingBag : defaultIcon;
          case 'healthcare': 
            return typeof FaStethoscope !== 'undefined' ? FaStethoscope : defaultIcon;
          case 'finance': 
            return typeof FaDollarSign !== 'undefined' ? FaDollarSign : defaultIcon;
          case 'education': 
            return typeof FaBook !== 'undefined' ? FaBook : defaultIcon;
          case 'construction': 
            return typeof FaHammer !== 'undefined' ? FaHammer : defaultIcon;
          case 'transportation': 
            return typeof FaTruck !== 'undefined' ? FaTruck : defaultIcon;
          case 'customerService': 
            return typeof FaHeadphones !== 'undefined' ? FaHeadphones : defaultIcon;
          case 'humanResources': 
            return typeof FaGraduationCap !== 'undefined' ? FaGraduationCap : defaultIcon;
          case 'government': 
            return typeof FaBuilding !== 'undefined' ? FaBuilding : defaultIcon;
          case 'creative': 
            return typeof FaCamera !== 'undefined' ? FaCamera : defaultIcon;
          case 'legal': 
            return typeof FaGavel !== 'undefined' ? FaGavel : defaultIcon;
          case 'administration': 
            return typeof FaBriefcase !== 'undefined' ? FaBriefcase : defaultIcon;
          case 'manufacturing': 
            return typeof FaIndustry !== 'undefined' ? FaIndustry : defaultIcon;
          case 'retail': 
            return typeof FaStore !== 'undefined' ? FaStore : defaultIcon;
          case 'hospitality': 
            return typeof FaUsers !== 'undefined' ? FaUsers : defaultIcon;
          case 'agriculture': 
            return typeof FaSeedling !== 'undefined' ? FaSeedling : defaultIcon;
          case 'energy': 
            return typeof FaBolt !== 'undefined' ? FaBolt : defaultIcon;
          case 'telecommunications': 
            return typeof FaMobileAlt !== 'undefined' ? FaMobileAlt : defaultIcon;
          case 'security': 
            return typeof FaShieldAlt !== 'undefined' ? FaShieldAlt : defaultIcon;
          case 'research': 
            return typeof FaMicroscope !== 'undefined' ? FaMicroscope : defaultIcon;
          case 'quality': 
            return typeof FaCheck !== 'undefined' ? FaCheck : defaultIcon;
          case 'maintenance': 
            return typeof FaWrench !== 'undefined' ? FaWrench : defaultIcon;
          case 'projectManagement': 
            return typeof FaBriefcase !== 'undefined' ? FaBriefcase : defaultIcon;
          case 'consulting': 
            return typeof FaChartBar !== 'undefined' ? FaChartBar : defaultIcon;
          default: 
            return defaultIcon;
        }
      }
    }
    
    // If no match found, return default icon
    return defaultIcon;
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    updateDisplayedCategories();
  }, [categories, visibleCount]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await allCategories();
     
      // Sort categories by count in descending order
      const sortedCategories = response.data.data.sort((a, b) => b.count - a.count);
      
      // Remove duplicate categories (case-insensitive comparison) but preserve original case
      const categoryMap = new Map();
      sortedCategories.forEach(cat => {
        const lowerCaseCategory = cat.category.toLowerCase();
        // Only keep the entry with the highest count for duplicate categories
        if (!categoryMap.has(lowerCaseCategory) || categoryMap.get(lowerCaseCategory).count < cat.count) {
          categoryMap.set(lowerCaseCategory, cat);
        }
      });
      
      const uniqueCategories = Array.from(categoryMap.values());
      
      setCategories(uniqueCategories);
      setError("");
    } catch (err) {
      setError("Failed to fetch categories");
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateDisplayedCategories = () => {
    setDisplayedCategories(categories.slice(0, visibleCount));
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/jobs?category=${encodeURIComponent(categoryName)}`);
  };

  const handleViewMore = () => {
    setVisibleCount(prevCount => prevCount + 12);
  };

  const handleViewLess = () => {
    setVisibleCount(prevCount => Math.max(12, prevCount - 12));
  };

  if (loading) {
    return (
      <div className="min-h-screen px-[10%] lg:py-16" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4" style={{ 
            color: 'var(--color-primary)', 
            fontFamily: 'var(--font-heading)' 
          }}>
            Browse by Category
          </h1>
          <p className="text-lg" style={{ 
            color: 'var(--color-text-secondary)', 
            fontFamily: 'var(--font-body)' 
          }}>
            Find your dream job in your preferred industry.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="card cursor-pointer transform hover:scale-105 animate-pulse"
              style={{ transition: 'var(--transition-normal)' }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 flex items-center justify-center rounded-full mb-5 bg-gray-200"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen px-[10%] lg:py-16" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4" style={{ 
            color: 'var(--color-primary)', 
            fontFamily: 'var(--font-heading)' 
          }}>
            Browse by Category
          </h1>
          <p className="text-lg" style={{ 
            color: 'var(--color-text-secondary)', 
            fontFamily: 'var(--font-body)' 
          }}>
            Find your dream job in your preferred industry.
          </p>
        </div>
        <div className="text-center py-10">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={fetchCategories}
            className="mt-4 px-4 py-2 btn-accent rounded-lg"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-[10%] lg:py-16" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4" style={{ 
          color: 'var(--color-primary)', 
          fontFamily: 'var(--font-heading)' 
        }}>
          Browse by Category
        </h1>
        <p className="text-lg" style={{ 
          color: 'var(--color-text-secondary)', 
          fontFamily: 'var(--font-body)' 
        }}>
          Find your dream job in your preferred industry.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayedCategories.map((category) => {
          const IconComponent = getIconForCategory(category.category);
          return (
            <div
              key={category.category}
              onClick={() => handleCategoryClick(category.category)}
              className="card cursor-pointer transform hover:scale-105"
              style={{ transition: 'var(--transition-normal)' }}
            >
              <div className="flex flex-col items-center text-center p-3">
                <div className="w-14 h-14 flex items-center justify-center rounded-full mb-5" style={{ 
                  backgroundColor: 'var(--color-accent-light)', 
                  boxShadow: 'var(--shadow-md)' 
                }}>
                  <IconComponent className="w-7 h-7" style={{ color: 'var(--color-accent)' }} />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ 
                  color: 'var(--color-primary)', 
                  fontFamily: 'var(--font-heading)' 
                }}>
                  {category.category}
                </h3>
                <span className="px-3 py-1 rounded-full text-sm" style={{ 
                  color: 'var(--color-accent)', 
                  backgroundColor: 'var(--color-accent-light)',
                  fontFamily: 'var(--font-body)'
                }}>
                  {category.count} {category.count === 1 ? 'job' : 'jobs'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {categories.length > 12 && (
        <div className="text-center mt-12 flex justify-center gap-4">
          {visibleCount > 12 && (
            <button
              onClick={handleViewLess}
              className="px-6 py-3 btn-accent rounded-lg font-semibold"
              style={{ 
                fontFamily: 'var(--font-body)',
                transition: 'var(--transition-normal)'
              }}
            >
              View Less
            </button>
          )}
          {categories.length > visibleCount && (
            <button
              onClick={handleViewMore}
              className="px-6 py-3 btn-accent rounded-lg font-semibold"
              style={{ 
                fontFamily: 'var(--font-body)',
                transition: 'var(--transition-normal)'
              }}
            >
              View More
            </button>
          )}
        </div>
      )}
      
      {/* New Popular Categories Section */}
      <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
        <h3 className="text-3xl font-bold text-center mb-8" style={{ color: 'var(--color-primary)' }}>Popular Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: "Technology", icon: "💻", jobs: "15,200+" },
            { name: "Healthcare", icon: "🏥", jobs: "8,900+" },
            { name: "Finance", icon: "💰", jobs: "6,700+" },
            { name: "Marketing", icon: "📢", jobs: "5,400+" },
            { name: "Education", icon: "📚", jobs: "4,800+" },
            { name: "Sales", icon: "📈", jobs: "7,300+" }
          ].map((category, index) => (
            <div 
              key={index}
              className="bg-white p-4 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/jobs?category=${encodeURIComponent(category.name)}`)}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <h4 className="font-semibold text-gray-800 mb-1">{category.name}</h4>
              <p className="text-sm text-gray-600">{category.jobs} jobs</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* New Career Advice Section */}
      <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold text-center mb-8" style={{ color: 'var(--color-primary)' }}>Career Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2">High Demand Roles</h4>
            <p className="text-gray-600">Discover which skills are most sought after in today's job market</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2">Salary Insights</h4>
            <p className="text-gray-600">Get accurate salary data for different roles and experience levels</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2">Growth Opportunities</h4>
            <p className="text-gray-600">Explore career paths with the highest potential for advancement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;