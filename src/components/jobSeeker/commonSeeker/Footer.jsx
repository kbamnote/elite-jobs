/**
 * Footer component containing company information, job categories, newsletter
 * subscription, copyright information, social media links, and legal links.
 *
 * @returns {JSX.Element} The Footer component.
 */

import React from "react";
import {
  Briefcase,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import Logo from '../../../assets/logos.jpg'

const Footer = () => {
  return (
    <footer className="w-full pt-16 pb-8 px-4 sm:px-10" style={{ backgroundColor: 'var(--color-dark-primary)', color: 'var(--color-text-white)' }}>
    {/* Main Footer Content - Two main sections in flex-row for larger screens */}
    <div className="flex flex-col lg:flex-row gap-2 mb-12">
      {/* First Main Section - Logo, Address and Links */}
      <div className="w-full lg:w-3/4">
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-8">
          {/* Logo and Description - Full width on small, 2/5 on medium, 1/3 on large */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <img src={Logo} alt="Elite Jobs Logo" className="h-26 w-auto" />
              
            </div>
            <p className="leading-relaxed text-sm sm:text-base" style={{ color: 'var(--color-text-light)', fontFamily: 'var(--font-body)' }}>
              The Elite Jobs is a powerful job search platform that helps job seekers find their dream job quickly and efficiently.
            </p>
          </div>

           {/* Address - Full width on small, 3/5 on medium, 1/3 on large  */}
           <div className="md:col-span-3 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-3 sm:mb-5" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>
              Address
            </h3>
            <p className="leading-relaxed text-sm sm:text-base" style={{ color: 'var(--color-text-light)', fontFamily: 'var(--font-body)' }}>
              <strong>HEAD OFFICE:</strong> 1st Floor Mohota Complex, Above State Bank Of India Katol Road, Chhaoni Rd, Nagpur, Maharashtra 440013
            </p>
            {/* <div className="h-3"></div>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              <strong>BRANCH OFFICE:</strong>The Iconic Corenthum, floor-25th sector-62, Noida UP- 201301
            </p> */}
          </div>
          
          {/* Links - Full width on small, 3/5 on medium, 1/3 on large */}
          <div className="md:col-span-2 lg:col-span-1 lg:pl-10">
            <h3 className="text-lg font-semibold mb-3 sm:mb-5" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>
              Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: "Home", link: "/" },
                { name: "Mocks", link: "/mock" },
                { name: "Jobs", link: "/jobs" },
                { name: "About", link: "/about" },
                { name: "Contact Us", link: "/contact" },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="transition duration-300 text-sm sm:text-base"
                    style={{ 
                      color: 'var(--color-text-light)', 
                      fontFamily: 'var(--font-body)',
                      transition: 'var(--transition-normal)'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--color-text-light)'}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          
          <div className="lg:hidden md:col-span-3 lg:mt-0">
        <h3 className="text-lg font-semibold mb-3 sm:mb-5" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>
          Newsletter
        </h3>
        <p className="mb-3 sm:mb-4 text-sm sm:text-base" style={{ color: 'var(--color-text-light)', fontFamily: 'var(--font-body)' }}>
          Subscribe to stay updated on the latest job opportunities.
        </p>
        <div className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full md:w-72 lg:w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)', 
              border: '1px solid rgba(255, 255, 255, 0.2)', 
              color: 'var(--color-text-white)',
              fontFamily: 'var(--font-body)',
              borderRadius: 'var(--border-radius-md)'
            }}
          />
          <button className="px-4 py-3 rounded-lg transition w-full md:w-72 lg:w-full btn-accent">
            Subscribe
          </button>
        </div>
      </div>
          
        </div>
      </div>
      
      {/* Second Main Section - Newsletter */}
      <div className="hidden lg:block lg:w-1/4 md:col-span-2 mt-8 lg:mt-0">
        <h3 className="text-lg font-semibold mb-3 sm:mb-5" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>
          Newsletter
        </h3>
        <p className="mb-3 sm:mb-4 text-sm sm:text-base" style={{ color: 'var(--color-text-light)', fontFamily: 'var(--font-body)' }}>
          Subscribe to stay updated on the latest job opportunities.
        </p>
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-56 md:w-72 lg:w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)', 
              border: '1px solid rgba(255, 255, 255, 0.2)', 
              color: 'var(--color-text-white)',
              fontFamily: 'var(--font-body)',
              borderRadius: 'var(--border-radius-md)'
            }}
          />
          <button className="px-4 py-3 rounded-lg transition w-56 md:w-72 lg:w-36 btn-accent">
            Subscribe
          </button>
        </div>
      </div>
    </div>
    
    {/* Bottom Bar */}
    <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <div className="text-xs sm:text-sm text-center md:text-left" style={{ color: 'var(--color-text-light)', fontFamily: 'var(--font-body)' }}>
        © {new Date().getFullYear()} Elite Jobs. All rights reserved.
      </div>
      {/* Social Icons */}
     <div className="flex space-x-4">
  {[
    { Icon: Facebook, url: "https://facebook.com/" },
    { Icon: Twitter, url: "https://twitter.com/" },
    { Icon: Linkedin, url: "https://linkedin.com/in/" },
    { Icon: Instagram, url: "https://www.instagram.com/udaa.nous?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" }
  ].map((item, index) => (
    <a
      key={index}
      href={item.url}
      className="transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
      style={{ 
        color: 'var(--color-text-light)',
        transition: 'var(--transition-normal)'
      }}
      onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
      onMouseLeave={(e) => e.target.style.color = 'var(--color-text-light)'}
      target="_blank"
      rel="noopener noreferrer"
    >
      <item.Icon className="w-5 h-5 sm:w-6 sm:h-6" />
    </a>
  ))}
</div>
    </div>
  </footer>
  );
};

export default Footer;