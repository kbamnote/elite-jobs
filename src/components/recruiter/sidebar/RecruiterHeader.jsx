import React, { useState, useEffect, useRef } from "react";
import { BriefcaseBusiness, User, LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from '../../../assets/logos.png';
import Cookies from "js-cookie";
import { profile } from "../../../utils/Api";

const RecruiterHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [userName, setUserName] = useState("");
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const loadName = async () => {
      try {
        const res = await profile();
        const name = res?.data?.data?.name || "Recruiter";
        if (isMounted) setUserName(name);
      } catch (err) {
        console.error("Failed to load recruiter name:", err);
        if (isMounted) setUserName("Recruiter");
      }
    };
    loadName();
    return () => { isMounted = false; };
  }, []);

  const handleLogout = () => {
    // Remove token and role from cookies
    Cookies.remove("token");
    Cookies.remove("role");
    
    // Navigate to home page
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (userDropdown) setUserDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
        setUserDropdown(false);
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
          <Link to="/recruiter/dashboard" className="flex items-center space-x-2 flex-shrink-0">
            <img src={Logo} alt="Elite Jobs Logo" className="h-12 w-32 md:h-18 md:w-50" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/recruiter/dashboard">
              <span className="transition-colors font-semibold" style={{ fontFamily: 'var(--font-body)', transition: 'var(--transition-normal)', color: 'navy' }} 
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                    onMouseLeave={(e) => e.target.style.color = 'navy'}>Dashboard</span>
            </Link>
            <Link to="/recruiter/profile">
              <span className="transition-colors font-semibold" style={{ fontFamily: 'var(--font-body)', transition: 'var(--transition-normal)', color: 'navy' }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                    onMouseLeave={(e) => e.target.style.color = 'navy'}>My Profile</span>
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Link to="/recruiter/profile">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                  <User className="w-5 h-5" />
                </div>
              </Link>
              <span style={{ color: 'navy', fontWeight: 600, fontFamily: 'var(--font-body)' }}>{userName}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded transition-colors w-full cursor-pointer flex items-center justify-center space-x-1"
              style={{ 
                backgroundColor: 'var(--color-accent)', 
                color: 'white',
                fontFamily: 'var(--font-body)',
                transition: 'var(--transition-normal)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#d63851';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--color-accent)';
              }}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded transition-colors"
            style={{ color: 'var(--color-text-primary)' }}
            onClick={toggleMobileMenu}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-dark-secondary)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="lg:hidden mt-4 py-4" style={{ borderTop: `1px solid var(--color-dark-secondary)` }}>
            <nav className="flex flex-col space-y-4">
              <Link to="/recruiter/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="block py-2 transition-colors font-semibold" style={{ fontFamily: 'var(--font-body)', transition: 'var(--transition-normal)', color: 'navy' }}
                      onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                      onMouseLeave={(e) => e.target.style.color = 'navy'}>
                  Dashboard
                </span>
              </Link>
              <Link to="/recruiter/profile" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="block py-2 transition-colors font-semibold" style={{ fontFamily: 'var(--font-body)', transition: 'var(--transition-normal)', color: 'navy' }}
                      onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                      onMouseLeave={(e) => e.target.style.color = 'navy'}>
                  My Profile
                </span>
              </Link>
              <div className="pt-4" style={{ borderTop: `1px solid var(--color-dark-secondary)` }}>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <Link to="/recruiter/profile" onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                        <User className="w-5 h-5" />
                      </div>
                    </Link>
                    <span style={{ color: 'navy', fontWeight: 600, fontFamily: 'var(--font-body)' }}>{userName}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded transition-colors w-full cursor-pointer flex items-center justify-center space-x-1"
                    style={{ 
                      backgroundColor: 'var(--color-accent)', 
                      color: 'white',
                      fontFamily: 'var(--font-body)',
                      transition: 'var(--transition-normal)'
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default RecruiterHeader;