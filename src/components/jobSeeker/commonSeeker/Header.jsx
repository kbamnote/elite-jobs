import React, { useState, useEffect, useRef } from "react";
import { BriefcaseBusiness, ChevronDown, CircleUserRound, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../../assets/ejLogo.png'
import Cookies from "js-cookie";

const Header = () => {
  const [isAIToolsOpen, setIsAIToolsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userID");
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const toggleAIToolsDropdown = () => {
    setIsAIToolsOpen(!isAIToolsOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isAIToolsOpen) setIsAIToolsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close dropdowns if clicking on a link
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
    <header className="w-full shadow-lg sticky top-0 z-10 backdrop-blur-md bg-neutral-100" style={{ color: 'var(--color-text-white)' }}>
      <div className="max-w-7xl mx-auto px-3 py-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img src={Logo} alt="Elite Jobs Logo" className="h-12 w-auto md:h-18 md:w-auto" />
            <span className="text-blue-800 font-bold text-2xl">ELITE <span className="text-red-600">JOBS</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/">
              <span className="transition-colors font-semibold" style={{ fontFamily: 'var(--font-body)', transition: 'var(--transition-normal)', color: 'navy' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                onMouseLeave={(e) => e.target.style.color = 'navy'}>Home</span>
            </Link>
            <Link to="/jobs">
              <span className="transition-colors font-semibold" style={{ fontFamily: 'var(--font-body)', transition: 'var(--transition-normal)', color: 'navy' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                onMouseLeave={(e) => e.target.style.color = 'navy'}>Jobs</span>
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleAIToolsDropdown}
                className="flex items-center space-x-2 font-semibold transition-colors"
                style={{ fontFamily: 'var(--font-body)', transition: 'var(--transition-normal)', color: 'navy' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                onMouseLeave={(e) => e.target.style.color = 'navy'}
              >
                <span>AI Tools</span>
                <ChevronDown size={16} />
              </button>
              {isAIToolsOpen && (
                <div className="absolute top-full left-0 mt-2 rounded-md shadow-lg w-48" style={{ backgroundColor: 'var(--color-dark-secondary)', boxShadow: 'var(--shadow-lg)' }}>
                  <ul className="py-2">
                    <Link to="/ats-score-checker" onClick={() => setIsAIToolsOpen(false)}>
                      <li className="px-4 py-2 cursor-pointer transition-colors" style={{ transition: 'var(--transition-fast)' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-dark-primary)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>ATS Score Checker</li>
                    </Link>
                    <Link to="/resumes" onClick={() => setIsAIToolsOpen(false)}>
                      <li className="px-4 py-2 cursor-pointer transition-colors" style={{ transition: 'var(--transition-fast)' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-dark-primary)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>Resume Builder</li>
                    </Link>
                    <Link to="/mock" onClick={() => setIsAIToolsOpen(false)}>
                      <li className="px-4 py-2 cursor-pointer transition-colors" style={{ transition: 'var(--transition-fast)' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-dark-primary)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>AI Mock Test</li>
                    </Link>
                  </ul>
                </div>
              )}
            </div>
            <Link to="/services">
              <span className="transition-colors font-semibold" style={{ fontFamily: 'var(--font-body)', transition: 'var(--transition-normal)', color: 'navy' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                onMouseLeave={(e) => e.target.style.color = 'navy'}>Services</span>
            </Link>
            <Link to="/blog">
              <span className="transition-colors font-semibold" style={{ fontFamily: 'var(--font-body)', transition: 'var(--transition-normal)', color: 'navy' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                onMouseLeave={(e) => e.target.style.color = 'navy'}>Blogs</span>
            </Link>
            <Link to="/about">
              <span className="transition-colors font-semibold" style={{ fontFamily: 'var(--font-body)', transition: 'var(--transition-normal)', color: 'navy' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                onMouseLeave={(e) => e.target.style.color = 'navy'}>About Us</span>
            </Link>
            <Link to="/contact">
              <span className="transition-colors font-semibold" style={{ fontFamily: 'var(--font-body)', transition: 'var(--transition-normal)', color: 'navy' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                onMouseLeave={(e) => e.target.style.color = 'navy'}>Contact Us</span>
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded transition-colors w-full cursor-pointer btn-accent"
                >
                  Logout
                </button>
                <Link to="/profile">
                  <button className="px-4 py-2 rounded transition-colors w-full cursor-pointer btn-accent flex items-center justify-center space-x-1">
                    <span>User</span>
                    <CircleUserRound className="w-6 h-6" />
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="px-4 py-2 rounded transition-colors cursor-pointer btn-accent">
                    Login 
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded transition-colors"
            style={{ color: 'var(--color-text-primary)' }}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="lg:hidden mt-4 py-4" style={{ borderTop: `1px solid var(--color-dark-secondary)` }}>
            <nav className="flex flex-col space-y-4">
              <Link to="/">
                <span className="block py-2 transition-colors font-semibold" style={{ fontFamily: 'var(--font-body)', transition: 'var(--transition-normal)', color: 'navy' }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                  onMouseLeave={(e) => e.target.style.color = 'navy'}>
                  Home
                </span>
              </Link>
              <Link to="/jobs">
                <span className="block py-2 transition-colors font-semibold" style={{ fontFamily: 'var(--font-body)', transition: 'var(--transition-normal)', color: 'navy' }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                  onMouseLeave={(e) => e.target.style.color = 'navy'}>
                  Jobs
                </span>
              </Link>
              <div className="relative">
                <button
                  onClick={toggleAIToolsDropdown}
                  className="w-full text-left py-2 font-semibold transition-colors flex items-center justify-between"
                  style={{ fontFamily: 'var(--font-body)', transition: 'var(--transition-normal)', color: 'navy' }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                  onMouseLeave={(e) => e.target.style.color = 'navy'}
                >
                  AI Tools
                  <ChevronDown size={16} />
                </button>
                {isAIToolsOpen && (
                  <ul className="ml-4 mt-2 space-y-2">
                    <Link to="/ats-score-checker" onClick={() => {setIsAIToolsOpen(false); setIsMobileMenuOpen(false);}}>
                      <li className="py-2 transition-colors" style={{ transition: 'var(--transition-normal)', color: 'navy' }}
                          onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                          onMouseLeave={(e) => e.target.style.color = 'navy'}>ATS Score Checker</li>
                    </Link>
                    <Link to="/resumes" onClick={() => {setIsAIToolsOpen(false); setIsMobileMenuOpen(false);}}>
                      <li className="py-2 transition-colors" style={{ transition: 'var(--transition-normal)', color: 'navy' }}
                          onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                          onMouseLeave={(e) => e.target.style.color = 'navy'}>Elite Resume Builder</li>
                    </Link>
                    <Link to="/mock" onClick={() => {setIsAIToolsOpen(false); setIsMobileMenuOpen(false);}}>
                      <li className="py-2 transition-colors" style={{ transition: 'var(--transition-normal)', color: 'navy' }}
                          onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                          onMouseLeave={(e) => e.target.style.color = 'navy'}>AI Mock Test</li>
                    </Link>
                  </ul>
                )}
              </div>
              <Link to="/services">
                <span className="block py-2 transition-colors font-semibold" style={{ fontFamily: 'var(--font-body)', transition: 'var(--transition-normal)', color: 'navy' }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                  onMouseLeave={(e) => e.target.style.color = 'navy'}>
                  Services
                </span>
              </Link>
              <Link to="/blog">
                <span className="block py-2 transition-colors font-semibold" style={{ fontFamily: 'var(--font-body)', transition: 'var(--transition-normal)', color: 'navy' }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                  onMouseLeave={(e) => e.target.style.color = 'navy'}>
                  Blogs
                </span>
              </Link>
              <Link to="/about">
                <span className="block py-2 transition-colors font-semibold" style={{ fontFamily: 'var(--font-body)', transition: 'var(--transition-normal)', color: 'navy' }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                  onMouseLeave={(e) => e.target.style.color = 'navy'}>
                  About Us
                </span>
              </Link>
              <Link to="/contact">
                <span className="block py-2 transition-colors font-semibold" style={{ fontFamily: 'var(--font-body)', transition: 'var(--transition-normal)', color: 'navy' }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                  onMouseLeave={(e) => e.target.style.color = 'navy'}>
                  Contact Us
                </span>
              </Link>
              <div className="pt-4" style={{ borderTop: `1px solid var(--color-dark-secondary)` }}>
                {isLoggedIn ? (
                  <div className="flex flex-col space-y-4">
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 rounded transition-colors w-full cursor-pointer btn-accent"
                    >
                      Logout
                    </button>
                    <Link to="/user-profile">
                      <button className="px-4 py-2 rounded transition-colors w-full cursor-pointer btn-accent flex items-center justify-center space-x-1">
                        <span>User</span>
                        <CircleUserRound className="w-6 h-6" />
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-4">
                    <Link to="/login">
                      <button className="transition-colors px-4 py-2 w-full cursor-pointer" style={{ transition: 'var(--transition-normal)', color: 'navy' }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                        onMouseLeave={(e) => e.target.style.color = 'navy'}>
                        Login
                      </button>
                    </Link>
                    <Link to="/login?role=jobHoster">
                      <button className="px-4 py-2 rounded transition-colors w-full cursor-pointer btn-accent">
                        Job Hosting
                      </button>
                    </Link>
                    <Link to="/login?role=recruiter">
                      <button
                        className="px-4 py-2 rounded transition-all w-full cursor-pointer btn-accent border-2 font-medium"
                        style={{
                          color: 'var(--color-text-white)',
                          borderColor: 'var(--color-text-white)',
                          fontFamily: 'var(--font-body)',
                          transition: 'var(--transition-normal)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = 'var(--color-text-white)';
                          e.target.style.color = 'var(--color-primary)';
                          e.target.style.borderColor = 'var(--color-text-white)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'var(--color-accent)';
                          e.target.style.color = 'var(--color-text-white)';
                          e.target.style.borderColor = 'var(--color-text-white)';
                        }}
                      >
                        Job Recruiter
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;