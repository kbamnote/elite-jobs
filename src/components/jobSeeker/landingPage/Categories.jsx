import React, { useState, useEffect } from "react";
import {
  MonitorCheck,
  DatabaseZap,
  ShoppingBag,
  UserSearch,
  WalletCards,
  Building2,
  GraduationCap,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { allCategories } from "../../../utils/Api";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Icon mapping for categories
  const iconMap = {
    "IT & Networking": MonitorCheck,
    "Sales & Marketing": ShoppingBag,
    "Data Science": DatabaseZap,
    "Customer Service": UserSearch,
    "Digital Marketing": Building2,
    "Human Resource": GraduationCap,
    "Project Manager": Wallet,
    "Accounting": WalletCards,
  };

  // Default icon for categories not in the map
  const defaultIcon = MonitorCheck;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await allCategories();
      setCategories(response.data.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch categories");
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/jobs?category=${encodeURIComponent(categoryName)}`);
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
        {categories.map((category) => {
          const IconComponent = iconMap[category.category] || defaultIcon;
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
    </div>
  );
};

export default Categories;