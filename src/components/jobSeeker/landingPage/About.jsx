import React from "react";

const About = () => {
  const stats = [
    {
      number: "12k+",
      title: "Clients Worldwide",
      description:
        "We have successfully built a global network of satisfied clients, expanding our reach across multiple countries and industries.",
    },
    {
      number: "20k+",
      title: "Active Resumes",
      description:
        "Thousands of job seekers trust our platform to keep their resumes updated and ready for new opportunities.",
    },
    {
      number: "18k+",
      title: "Partner Companies",
      description:
        "We collaborate with top-tier companies to offer diverse job opportunities across various industries.",
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-[10%] py-8 sm:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12 lg:mb-16 items-center">
          {/* Left side - Image *
          <div className="w-full lg:w-1/2">
            <div className="rounded-3xl overflow-hidden shadow-lg aspect-video">
              <img
                src="https://plus.unsplash.com/premium_photo-1727730015669-aac64afb50ad?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hero"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right side - Content *
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
              Good Life Begins With
              <span className="block mt-2">A Good Company</span>
            </h1>
            <p className="text-gray-600 mt-4 sm:mt-6 text-base sm:text-lg max-w-2xl lg:max-w-none mx-auto lg:mx-0">
              A good company provides more than just opportunities; it empowers
              individuals to reach their potential, fosters creativity, and
              encourages growth. By surrounding yourself with positive,
              like-minded people, you're not just building a career you're
              shaping a better future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8 justify-center lg:justify-start">
              <button className="btn-accent w-full sm:w-auto px-6 py-3 rounded-lg font-semibold shadow-md transition-all">
                Search Job
              </button>
              <button className="w-full sm:w-auto font-semibold transition-all" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-body)' }}>
                Learn more
              </button>
            </div>
          </div>
        </div> */}

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>
                {stat.number}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                {stat.title}
              </h3>
              <p className="text-gray-600 text-base sm:text-lg">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* New Mission & Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>Our Mission</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              To bridge the gap between talented professionals and innovative companies by providing a seamless, 
              transparent, and efficient job matching platform that empowers career growth for everyone.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-sm">Career Growth</span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-sm">Innovation</span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-sm">Transparency</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>Our Vision</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              To become the most trusted global platform for career opportunities, where every professional 
              finds their perfect match and every company discovers their ideal talent.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-sm">Global Reach</span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-sm">Trust</span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-sm">Excellence</span>
            </div>
          </div>
        </div>
        
        {/* New Features Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h3 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--color-primary)' }}>Why Choose Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#fef2f2] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#e94560]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Verified Opportunities</h4>
              <p className="text-gray-600">Every job is verified by our team to ensure authenticity and quality</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#fef2f2] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#e94560]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Fast Application</h4>
              <p className="text-gray-600">Apply to multiple jobs with one click using your profile</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#fef2f2] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#e94560]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">AI-Powered Matching</h4>
              <p className="text-gray-600">Smart recommendations based on your skills and preferences</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#fef2f2] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#e94560]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Community Support</h4>
              <p className="text-gray-600">Join our community of professionals and get career guidance</p>
            </div>
          </div>
        </div>
        
        {/* New CTA Section */}
        <div className="text-center bg-[#e94560] rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of professionals who found their dream jobs through our platform</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Create Free Account
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;