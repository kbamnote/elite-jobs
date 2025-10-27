import React, { useState, useEffect, useRef } from "react";
import { BriefcaseBusiness, ChevronDown, Menu, X, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  const [isAIToolsOpen, setIsAIToolsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const toggleAIToolsDropdown = () => {
    setIsAIToolsOpen(!isAIToolsOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isAIToolsOpen) setIsAIToolsOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Check authentication status
  const checkAuthStatus = () => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    setIsAuthenticated(!!token);
    setUserRole(role);
  };

  // Logout function
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    setIsAuthenticated(false);
    setUserRole(null);
    setIsProfileOpen(false);
    navigate("/");
  };

  const handleMobileNavigation = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    // Check authentication status on component mount
    checkAuthStatus();

    const handleClickOutside = (event) => {
      if (event.target.closest('a')) {
        return;
      }
      
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAIToolsOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Listen for authentication changes (e.g., after login/signup)
  useEffect(() => {
    const interval = setInterval(checkAuthStatus, 1000); // Check every second
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full bg-white text-gray-900 shadow-sm sticky top-0 z-10 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <BriefcaseBusiness className="text-teal-600" />
            <h1 className="text-2xl font-bold text-gray-900">Elite Jobs</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/">
              <span className="hover:text-teal-600 transition-colors font-medium text-gray-700">Home</span>
            </Link>
            <Link to="/jobs">
              <span className="hover:text-teal-600 transition-colors font-medium text-gray-700">Jobs</span>
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleAIToolsDropdown}
                className="flex items-center space-x-2 font-medium hover:text-teal-600 transition-colors text-gray-700"
              >
                <span>AI Tools</span>
                <ChevronDown size={16} />
              </button>
              {isAIToolsOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg w-48 border border-gray-100">
                  <ul className="py-2">
                    <Link to="/ats-score-checker">
                      <li className="px-4 py-2 hover:bg-teal-50 cursor-pointer text-gray-700 hover:text-teal-600 transition-colors">ATS Score Checker</li>
                    </Link>
                    <Link to="/ai-resume-builder">
                      <li className="px-4 py-2 hover:bg-teal-50 cursor-pointer text-gray-700 hover:text-teal-600 transition-colors">AI Resume Builder</li>
                    </Link>
                    <Link to="/mock">
                      <li className="px-4 py-2 hover:bg-teal-50 cursor-pointer text-gray-700 hover:text-teal-600 transition-colors">AI Mock Test</li>
                    </Link>
                  </ul>
                </div>
              )}
            </div>
            <Link to="/salaries">
              <span className="hover:text-teal-600 transition-colors font-medium text-gray-700">Salaries</span>
            </Link>
            <Link to="/about">
              <span className="hover:text-teal-600 transition-colors font-medium text-gray-700">About Us</span>
            </Link>
            <Link to="/contact">
              <span className="hover:text-teal-600 transition-colors font-medium text-gray-700">Contact Us</span>
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Job Hosting Button */}
                <Link to="/post-job">
                  <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium shadow-sm flex items-center space-x-2">
                    <BriefcaseBusiness size={18} />
                    <span>Post Job</span>
                  </button>
                </Link>
                
                {/* User Profile Dropdown */}
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    <User size={18} />
                    <span>Profile</span>
                    <ChevronDown size={16} className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                        My Profile
                      </Link>
                      <Link to="/my-jobs" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                        My Applications
                      </Link>
                      <hr className="my-2 border-gray-200" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium shadow-sm">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="lg:hidden mt-4 py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link to="/">
                <span className="block py-2 hover:text-teal-600 transition-colors font-medium text-gray-700">
                  Home
                </span>
              </Link>
              <Link to="/jobs">
                <span className="block py-2 hover:text-teal-600 transition-colors font-medium text-gray-700">
                  Jobs
                </span>
              </Link>
              <div className="relative">
                <button
                  onClick={toggleAIToolsDropdown}
                  className="w-full text-left py-2 font-medium hover:text-teal-600 transition-colors flex items-center justify-between text-gray-700"
                >
                  AI Tools
                  <ChevronDown size={16} />
                </button>
                {isAIToolsOpen && (
                  <ul className="ml-4 mt-2 space-y-2">
                    <Link to="/ats-score-checker" onClick={handleMobileNavigation}>
                      <li className="py-2 hover:text-teal-600 transition-colors text-gray-600">ATS Score Checker</li>
                    </Link>
                    <Link to="/ai-resume-builder" onClick={handleMobileNavigation}>
                      <li className="py-2 hover:text-teal-600 transition-colors text-gray-600">AI Resume Builder</li>
                    </Link>
                    <Link to="/mock" onClick={handleMobileNavigation}>
                      <li className="py-2 hover:text-teal-600 transition-colors text-gray-600">AI Mock Test</li>
                    </Link>
                  </ul>
                )}
              </div>
              <Link to="/salaries">
                <span className="block py-2 hover:text-teal-600 transition-colors font-medium text-gray-700">
                  Salaries
                </span>
              </Link>
              <Link to="/about">
                <span className="block py-2 hover:text-teal-600 transition-colors font-medium text-gray-700">
                  About Us
                </span>
              </Link>
              <Link to="/contact">
                <span className="block py-2 hover:text-teal-600 transition-colors font-medium text-gray-700">
                  Contact Us
                </span>
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex flex-col space-y-4">
                  {isAuthenticated ? (
                    <>
                      <Link to="/post-job">
                        <button className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium flex items-center justify-center space-x-2">
                          <BriefcaseBusiness size={18} />
                          <span>Post Job</span>
                        </button>
                      </Link>
                      <Link to="/profile">
                        <button className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center space-x-2">
                          <User size={18} />
                          <span>My Profile</span>
                        </button>
                      </Link>
                      <Link to="/my-jobs">
                        <button className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                          My Applications
                        </button>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors font-medium flex items-center justify-center space-x-2"
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <button className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                          Login
                        </button>
                      </Link>
                      <Link to="/signup">
                        <button className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium">
                          Sign Up
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;