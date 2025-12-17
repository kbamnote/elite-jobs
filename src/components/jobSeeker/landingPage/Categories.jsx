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
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Number of categories to show initially
  const initialDisplayCount = {
    sm: 6,
    lg: 12
  };

  // Icon mapping for categories - only define icons for known categories
  // For unknown categories, a default icon will be used
  const iconMap = {
    "IT & NETWORKING": FaDesktop,
    "SALES & MARKETING": FaShoppingBag,
    "ACCOUNTING": FaWallet,
    "DATA SCIENCE": FaDatabase,
    "DIGITAL MARKETING": FaBuilding,
    "HUMAN RESOURCE": FaGraduationCap,
    "CUSTOMER SERVICE": FaHeadphones,
    "PROJECT MANAGER": FaBriefcase,
    "OTHER": FaQuestionCircle,
    "ARCHITECT": FaDraftingCompass,
    "ASSISTANT": FaUsers,
    "CLOUD COMPUTING": FaCloud,
    "CONTENT CREATOR": FaCamera,
    "DATA ANALYST": FaChartBar,
    "DELIVERY": FaTruck,
    "EDUCATION & TRAINING": FaBook,
    "FASHION": FaPalette,
    "FINANCE": FaDollarSign,
    "FIRE & SAFETY": FaShieldAlt,
    "GOVERNMENT OF NAGPUR": FaBuilding,
    "HEALTHCARE": FaStethoscope,
    "HELPER": FaUsers,
    "MANUFACTURING": FaIndustry,
    "MARKETING": FaBullhorn,
    "MEDIA & JOURNALISM": FaCamera,
    "OFFICE ADMINISTRATOR": FaBriefcase,
    "OFFICE BOY": FaUsers,
    "RETAIL & STORE": FaStore,
    "RIDER": FaMotorcycle,
    "SUPPLY CHAIN": FaTruck,
    "SUPPORT": FaHeadphones,
    "TECHNICIAN": FaWrench,
    "UI/UX DESIGNER": FaPalette,
    "VIDEO EDITING": FaVideo,
    "WAREHOUSE OPERATIONS": FaHome,
    "AUTOMOBILE": FaCar,
    "CONSTRUCTION": FaHammer,
    "SALES & MANAGEMENT": FaShoppingBag,
    "SALESFORCE": FaCloud,
    "TRAVEL": FaPlane
  };

  // Category groups for assigning icons to new categories based on keywords
  const categoryGroups = {
    technology: ["IT", "TECHNOLOGY", "SOFTWARE", "DEVELOPER", "PROGRAMMER", "CODING", "WEB", "MOBILE", "APP", "COMPUTER", "SYSTEM", "NETWORK"],
    sales: ["SALES", "SELLING", "BUSINESS", "COMMERCE", "RETAIL", "MARKETING", "ADVERTISING", "PROMOTION"],
    healthcare: ["HEALTH", "MEDICAL", "HOSPITAL", "CLINIC", "DOCTOR", "NURSE", "PATIENT", "CLINICAL"],
    finance: ["FINANCE", "ACCOUNTING", "BANKING", "MONEY", "PAYMENT", "LOAN", "INVESTMENT", "TAX"],
    education: ["EDUCATION", "TEACHING", "SCHOOL", "UNIVERSITY", "COLLEGE", "TRAINING", "LEARNING", "ACADEMIC"],
    construction: ["CONSTRUCTION", "BUILDING", "ARCHITECTURE", "ENGINEERING", "CIVIL", "STRUCTURE"],
    transportation: ["TRANSPORT", "DELIVERY", "DRIVER", "TRUCK", "LOGISTICS", "SHIPPING", "FREIGHT"],
    customerService: ["CUSTOMER", "SERVICE", "SUPPORT", "HELP", "CALL CENTER", "CLIENT"],
    humanResources: ["HR", "HUMAN RESOURCE", "RECRUITMENT", "HIRING", "STAFF", "EMPLOYEE", "PERSONNEL"],
    government: ["GOVERNMENT", "PUBLIC", "MUNICIPAL", "CITY", "STATE", "FEDERAL"],
    creative: ["DESIGN", "CREATIVE", "ART", "GRAPHIC", "VIDEO", "PHOTO", "CAMERA", "MEDIA", "JOURNALISM"],
    legal: ["LEGAL", "LAW", "ATTORNEY", "LAWYER", "COURT", "JUDGE", "PARALEGAL"],
    administration: ["ADMIN", "ADMINISTRATION", "OFFICE", "SECRETARY", "CLERK", "COORDINATOR"],
    manufacturing: ["MANUFACTURING", "FACTORY", "PRODUCTION", "ASSEMBLY", "INDUSTRIAL"],
    retail: ["RETAIL", "STORE", "SHOP", "MERCHANT", "SALES"],
    hospitality: ["HOSPITALITY", "HOTEL", "RESTAURANT", "FOOD", "BEVERAGE", "CATERING"],
    agriculture: ["AGRICULTURE", "FARMING", "FARM", "AGRICULTURAL", "CROP", "LIVESTOCK"],
    energy: ["ENERGY", "ELECTRIC", "POWER", "UTILITY", "OIL", "GAS", "RENEWABLE"],
    telecommunications: ["TELECOM", "COMMUNICATION", "NETWORK", "WIRELESS", "CELLULAR", "PHONE"],
    security: ["SECURITY", "SAFETY", "PROTECTION", "GUARD", "POLICE", "FIRE"],
    research: ["RESEARCH", "SCIENCE", "LABORATORY", "SCIENTIFIC", "ANALYST", "DATA"],
    quality: ["QUALITY", "QA", "TESTING", "INSPECTION", "COMPLIANCE", "AUDIT"],
    maintenance: ["MAINTENANCE", "REPAIR", "TECHNICIAN", "MECHANIC", "ELECTRICIAN", "PLUMBER"],
    projectManagement: ["PROJECT", "MANAGEMENT", "MANAGER", "COORDINATION", "PLANNING"],
    consulting: ["CONSULTING", "CONSULTANT", "ADVISORY", "STRATEGY", "ANALYSIS"]
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
    
    // Add resize event listener for responsive behavior
    const handleResize = () => {
      updateDisplayedCategories();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [categories, showAll]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await allCategories();
     
      // Sort categories by count in descending order
      const sortedCategories = response.data.data.sort((a, b) => b.count - a.count);
      
      // Convert category names to uppercase and remove duplicates
      const categoryMap = new Map();
      sortedCategories.forEach(cat => {
        const upperCaseCategory = cat.category.toUpperCase();
        // Only keep the entry with the highest count for duplicate categories
        if (!categoryMap.has(upperCaseCategory) || categoryMap.get(upperCaseCategory).count < cat.count) {
          categoryMap.set(upperCaseCategory, {
            ...cat,
            category: upperCaseCategory
          });
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
    if (showAll) {
      setDisplayedCategories(categories);
    } else {
      // Show initial count based on screen size
      const count = window.innerWidth >= 1024 ? initialDisplayCount.lg : initialDisplayCount.sm;
      setDisplayedCategories(categories.slice(0, count));
    }
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/jobs?category=${encodeURIComponent(categoryName)}`);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
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
              <div className="flex flex-col items-center text-center">
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
      {categories.length > displayedCategories.length && (
        <div className="text-center mt-12">
          <button
            onClick={toggleShowAll}
            className="px-6 py-3 btn-accent rounded-lg font-semibold"
            style={{ 
              fontFamily: 'var(--font-body)',
              transition: 'var(--transition-normal)'
            }}
          >
            {showAll ? 'Show Less' : 'View More Categories'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Categories;