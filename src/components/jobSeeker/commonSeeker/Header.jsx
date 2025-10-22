import React, { useState, useEffect, useRef } from "react";
import { BriefcaseBusiness, ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isAIToolsOpen, setIsAIToolsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const toggleAIToolsDropdown = () => {
    setIsAIToolsOpen(!isAIToolsOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isAIToolsOpen) setIsAIToolsOpen(false);
  };

  const handleMobileNavigation = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-black text-white shadow-lg sticky top-0 z-10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <BriefcaseBusiness className="text-teal-500" />
            <h1 className="text-2xl font-bold">Elite Jobs</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/">
              <span className="hover:text-teal-400 transition-colors font-semibold">Home</span>
            </Link>
            <Link to="/jobs">
              <span className="hover:text-teal-400 transition-colors font-semibold">Jobs</span>
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleAIToolsDropdown}
                className="flex items-center space-x-2 font-semibold hover:text-teal-400 transition-colors"
              >
                <span>AI Tools</span>
                <ChevronDown size={16} />
              </button>
              {isAIToolsOpen && (
                <div className="absolute top-full left-0 mt-2 bg-gray-800 rounded-md shadow-lg w-48">
                  <ul className="py-2">
                    <Link to="/ats-score-checker">
                      <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">ATS Score Checker</li>
                    </Link>
                    <Link to="/ai-resume-builder">
                      <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">AI Resume Builder</li>
                    </Link>
                    <Link to="/mock">
                      <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">AI Mock Test</li>
                    </Link>
                  </ul>
                </div>
              )}
            </div>
            <Link to="/salaries">
              <span className="hover:text-teal-400 transition-colors font-semibold">Salaries</span>
            </Link>
            <Link to="/about">
              <span className="hover:text-teal-400 transition-colors font-semibold">About Us</span>
            </Link>
            <Link to="/contact">
              <span className="hover:text-teal-400 transition-colors font-semibold">Contact Us</span>
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/login">
              <button className="hover:text-teal-400 transition-colors px-4 py-2 cursor-pointer">
                Login
              </button>
            </Link>
            <Link to="/host-login">
              <button className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition-colors cursor-pointer">
                Job Hosting
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-gray-800 rounded transition-colors"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="lg:hidden mt-4 py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              <Link to="/">
                <span className="block py-2 hover:text-teal-400 transition-colors font-semibold">
                  Home
                </span>
              </Link>
              <Link to="/jobs">
                <span className="block py-2 hover:text-teal-400 transition-colors font-semibold">
                  Jobs
                </span>
              </Link>
              <div className="relative">
                <button
                  onClick={toggleAIToolsDropdown}
                  className="w-full text-left py-2 font-semibold hover:text-teal-400 transition-colors flex items-center justify-between"
                >
                  AI Tools
                  <ChevronDown size={16} />
                </button>
                {isAIToolsOpen && (
                  <ul className="ml-4 mt-2 space-y-2">
                    <Link to="/ats-score-checker" onClick={handleMobileNavigation}>
                      <li className="py-2 hover:text-teal-400 transition-colors">ATS Score Checker</li>
                    </Link>
                    <Link to="/ai-resume-builder" onClick={handleMobileNavigation}>
                      <li className="py-2 hover:text-teal-400 transition-colors">AI Resume Builder</li>
                    </Link>
                    <Link to="/mock" onClick={handleMobileNavigation}>
                      <li className="py-2 hover:text-teal-400 transition-colors">AI Mock Test</li>
                    </Link>
                  </ul>
                )}
              </div>
              <Link to="/salaries">
                <span className="block py-2 hover:text-teal-400 transition-colors font-semibold">
                  Salaries
                </span>
              </Link>
              <Link to="/about">
                <span className="block py-2 hover:text-teal-400 transition-colors font-semibold">
                  About Us
                </span>
              </Link>
              <Link to="/contact">
                <span className="block py-2 hover:text-teal-400 transition-colors font-semibold">
                  Contact Us
                </span>
              </Link>
              <div className="pt-4 border-t border-gray-800">
                <div className="flex flex-col space-y-4">
                  <Link to="/login">
                    <button className="hover:text-teal-400 transition-colors px-4 py-2 w-full cursor-pointer">
                      Login
                    </button>
                  </Link>
                  <Link to="/host-login">
                    <button className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition-colors w-full cursor-pointer">
                      Job Hosting
                    </button>
                  </Link>
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