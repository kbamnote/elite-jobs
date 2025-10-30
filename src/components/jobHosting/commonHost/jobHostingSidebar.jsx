import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LogOut,
  User,
  Briefcase,
  Menu,
  X,
  Users,
  BriefcaseBusiness,
  CalendarPlus,
} from "lucide-react";
import Cookies from "js-cookie";

const JobHostingSidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  
  // Static user name for design-only mode
  const userName = "John Doe";

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
      path: "/hosting/profile",
    },
    {
      icon: (isActive) => <Briefcase className="w-5 h-5" style={{ color: isActive ? 'var(--color-text-white)' : 'var(--color-accent)' }} />,
      label: "My Jobs",
      path: "/hosting/my-jobs",
    },
    {
      icon: (isActive) => <CalendarPlus className="w-5 h-5" style={{ color: isActive ? 'var(--color-text-white)' : 'var(--color-accent)' }} />,
      label: "Post Job",
      path: "/hosting/post-job",
    },
  ];

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
        <Link to="/hosting/profile" className="flex items-center mb-6">
          <div className="relative">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
              <User className="w-8 h-8" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 rounded-full" style={{ borderColor: 'var(--color-primary)' }}></div>
          </div>
          <div className="ml-2">
            <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--color-text-white)', fontFamily: 'var(--font-body)' }}>John Doe</span>
           
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto">
          <div className="space-y-1">
            <Link to="/dashboard" className="block">
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
                  backgroundColor: location.pathname === "/dashboard" ? 'var(--color-accent)' : 'transparent',
                  transition: 'all 0.3s ease',
                  fontFamily: 'var(--font-body)',
                  fontWeight: '500',
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== "/dashboard") {
                    e.target.style.backgroundColor = 'rgba(220, 38, 38, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== "/dashboard") {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Users className="w-5 h-5" style={{ color: location.pathname === "/dashboard" ? 'var(--color-text-white)' : 'var(--color-accent)' }} />
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

export default JobHostingSidebar;