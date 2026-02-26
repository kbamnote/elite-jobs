import React from 'react';

const CompanyLogos = () => {
  const logos = [
     {
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tcs.svg",
    alt: "TCS"
  },
  {
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/slack.svg",
    alt: "Slack"
  },
     {
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobe.svg",
    alt: "Adobe"
  },
  {
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/asana.svg",
    alt: "Asana"
  },
  {
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linear.svg",
    alt: "Linear"
  },
  {
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg",
    alt: "Google"
  },
  {
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoft.svg",
    alt: "Microsoft"
  },

  {
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/accenture.svg",
    alt: "Accenture"
  }
  ];

  return (
    <section className="hidden md:block py-12" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
            Trusted by Leading Companies
          </h3>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
            Join thousands of professionals who have found their dream jobs at top companies
          </p>
        </div>
        
        <div className="grid md:grid-cols-5 lg:grid-cols-8 gap-8 items-center justify-items-center mb-12">
          {logos.map((logo, index) => (
            <div 
              key={index} 
              className="w-full flex items-center justify-center hover:opacity-80 transition-opacity duration-200 p-4"
            >
              <img 
                src={logo.src} 
                alt={logo.alt}
                className="max-w-[100px] w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
        
        {/* New Trust Badges Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="text-center" style={{ color: 'var(--color-text-primary)' }}>
            <div className="text-4xl font-bold mb-2">🏆</div>
            <h4 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
              Award Winning
            </h4>
            <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
              Recognized for excellence in job matching
            </p>
          </div>
          
          <div className="text-center" style={{ color: 'var(--color-text-primary)' }}>
            <div className="text-4xl font-bold mb-2">🔒</div>
            <h4 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
              Secure & Verified
            </h4>
            <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
              All jobs and companies are verified
            </p>
          </div>
          
          <div className="text-center" style={{ color: 'var(--color-text-primary)' }}>
            <div className="text-4xl font-bold mb-2">⚡</div>
            <h4 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
              Fast Results
            </h4>
            <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
              Get matched with opportunities quickly
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyLogos;
