import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LogOut,
  User,
  Users,
  Menu,
  X,
  BriefcaseBusiness,
  Briefcase,
  CalendarPlus,
} from "lucide-react";
import Cookies from "js-cookie";
import { profile } from "../../../utils/Api";

const RecruiterSidebar = ({ placement = 'side' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  
  // Dynamic user name from profile
  const [userName, setUserName] = useState("");

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

  const navItems = [
    {
      icon: (isActive) => <User className="w-5 h-5" style={{ color: isActive ? 'var(--color-text-white)' : 'var(--color-accent)' }} />,
      label: "My Profile",
      path: "/recruiter/profile",
    },
  
   
  ];

  if (placement === 'top') {
    return (
      <header
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          backgroundColor: 'var(--color-primary)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div className="flex items-center justify-between px-6 py-3">
          {/* Brand */}
          <Link to="/recruiter/dashboard" className="flex items-center">
            <BriefcaseBusiness className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
            <span className="ml-2 text-xl font-bold" style={{ color: 'var(--color-text-white)', fontFamily: 'var(--font-heading)' }}>Elite Jobs</span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/recruiter/dashboard" className="px-3 py-2 rounded-md"
              style={{
                color: 'var(--color-text-white)',
                backgroundColor: location.pathname === '/recruiter/dashboard' ? 'rgba(255,255,255,0.15)' : 'transparent',
                transition: 'var(--transition-normal)'
              }}
            >
              Dashboard
            </Link>
            {navItems.map((item, index) => (
              <Link key={index} to={item.path} className="px-3 py-2 rounded-md"
                style={{
                  color: 'var(--color-text-white)',
                  backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.15)' : 'transparent',
                  transition: 'var(--transition-normal)'
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Profile + Logout */}
          <div className="flex items-center space-x-3">
            <Link to="/recruiter/profile" className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                <User className="w-5 h-5" />
              </div>
              <span className="ml-2" style={{ color: 'var(--color-text-white)', fontFamily: 'var(--font-body)', fontWeight: 600 }}>{userName}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md"
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: 'var(--color-text-white)'
              }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(220, 38, 38, 0.3)'; setIsLogoutHovered(true); }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = 'rgba(255,255,255,0.15)'; setIsLogoutHovered(false); }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 block lg:hidden p-2 rounded"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-text-white)',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: 'var(--shadow-md)',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative inset-y-0 left-0 z-40 w-full sm:w-1/2 lg:w-80 p-6 transform transition-transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:flex flex-col h-screen`}
        style={{
          backgroundColor: 'var(--color-primary)',
          boxShadow: 'var(--shadow-lg)',
          borderRight: '1px solid var(--border-color)',
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center mb-6">
          <BriefcaseBusiness className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
          <span className="ml-2 text-2xl font-bold" style={{ color: 'var(--color-text-white)', fontFamily: 'var(--font-heading)' }}>Elite Jobs</span>
        </Link>

        {/* Profile Section */}
        <Link to="/recruiter/profile" className="flex items-center mb-6">
          <div className="relative">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
              <User className="w-8 h-8" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 rounded-full" style={{ borderColor: 'var(--color-primary)' }}></div>
          </div>
          <div className="ml-2">
            <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--color-text-white)', fontFamily: 'var(--font-body)' }}>{userName}</span>
           
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto">
          <div className="space-y-1">
            <Link to="/recruiter/dashboard" className="block">
              <div
                className="flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 16px',
                  marginBottom: '8px',
                  borderRadius: 'var(--border-radius)',
                  textDecoration: 'none',
                  color: 'var(--color-text-white)',
                  backgroundColor: location.pathname === "/recruiter/dashboard" ? 'var(--color-accent)' : 'transparent',
                  transition: 'all 0.3s ease',
                  fontFamily: 'var(--font-body)',
                  fontWeight: '500',
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== "/recruiter/dashboard") {
                    e.target.style.backgroundColor = 'rgba(220, 38, 38, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== "/recruiter/dashboard") {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Users className="w-5 h-5" style={{ color: location.pathname === "/recruiter/dashboard" ? 'var(--color-text-white)' : 'var(--color-accent)' }} />
                <span className="text-base">Dashboard</span>
              </div>
            </Link>

            {navItems.map((item, index) => (
              <Link to={item.path} key={index} className="block">
               <div
                 className="flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200"
                 style={{
                   display: 'flex',
                   alignItems: 'center',
                   padding: '12px 16px',
                   marginBottom: '8px',
                   borderRadius: 'var(--border-radius)',
                   textDecoration: 'none',
                   color: 'var(--color-text-white)',
                   backgroundColor: location.pathname === item.path ? 'var(--color-accent)' : 'transparent',
                   transition: 'all 0.3s ease',
                   fontFamily: 'var(--font-body)',
                   fontWeight: '500',
                 }}
                 onMouseEnter={(e) => {
                   if (location.pathname !== item.path) {
                     e.target.style.backgroundColor = 'rgba(220, 38, 38, 0.2)';
                   }
                 }}
                 onMouseLeave={(e) => {
                   if (location.pathname !== item.path) {
                     e.target.style.backgroundColor = 'transparent';
                   }
                 }}
               >
                 {item.icon(location.pathname === item.path)}
                 <span className="text-base">{item.label}</span>
               </div>
             </Link>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="mt-4">
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '12px 16px',
              marginTop: 'auto',
              borderRadius: 'var(--border-radius)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'var(--color-text-white)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'var(--font-body)',
              fontWeight: '500',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(220, 38, 38, 0.2)';
              setIsLogoutHovered(true);
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              setIsLogoutHovered(false);
            }}
          >
            <LogOut style={{ width: '20px', height: '20px', marginRight: '12px', color: isLogoutHovered ? 'var(--color-text-white)' : 'var(--color-accent)' }} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default RecruiterSidebar;