import React from 'react';

const CompanyLogos = () => {
  const logos = [
    { src: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg", alt: "Spotify" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png", alt: "Slack" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Adobe_Corporate_Logo.png", alt: "Adobe" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Asana_logo.svg", alt: "Asana" },
    { src: "https://seeklogo.com/images/L/linear-icon-logo-33DBE6F52A-seeklogo.com.png", alt: "Linear" }
  ];

  return (
    <section className="hidden md:block py-8 md:py-12 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-12 items-center justify-items-center">
          {logos.map((logo, index) => (
            <div 
              key={index} 
              className="w-full flex items-center justify-center hover:opacity-80 transition-opacity duration-200"
            >
              <img 
                src={logo.src} 
                alt={logo.alt}
                className="max-w-[120px] w-full h-auto object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-200"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyLogos;
