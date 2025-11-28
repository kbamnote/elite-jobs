import React from "react";
import { Link } from "react-router-dom";
import { Building, Handshake, BarChart3, Calendar } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Job Fairs",
      description: "Connect with top employers and explore career opportunities at our regular job fairs. Meet recruiters face-to-face, submit your resume, and get immediate feedback on your qualifications.",
      icon: <Building className="w-10 h-10" style={{ color: 'var(--color-accent)' }} />,
      features: [
        "Meet multiple employers in one location",
        "Real-time interview opportunities",
        "Career counseling sessions",
        "Networking with industry professionals"
      ]
    },
    {
      title: "CSR Projects",
      description: "Participate in corporate social responsibility initiatives that give back to the community while enhancing your professional skills and experience.",
      icon: <Handshake className="w-10 h-10" style={{ color: 'var(--color-accent)' }} />,
      features: [
        "Community development programs",
        "Environmental conservation projects",
        "Educational outreach initiatives",
        "Skills-based volunteering opportunities"
      ]
    },
    {
      title: "Survey Campaign",
      description: "Contribute to market research and earn rewards by participating in our survey campaigns. Your opinions help shape business strategies and product development.",
      icon: <BarChart3 className="w-10 h-10" style={{ color: 'var(--color-accent)' }} />,
      features: [
        "Paid survey participation",
        "Market research contributions",
        "Consumer behavior insights",
        "Flexible scheduling options"
      ]
    },
    {
      title: "Event Management",
      description: "Access professional event management services for your career development needs, from workshops to networking events.",
      icon: <Calendar className="w-10 h-10" style={{ color: 'var(--color-accent)' }} />,
      features: [
        "Career workshop organization",
        "Professional networking events",
        "Training session coordination",
        "Conference planning services"
      ]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="w-full h-60 bg-gray-900 text-white flex items-center justify-center">
        <h2 className="text-5xl font-bold" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>
          Our Services
        </h2>
      </section>

      {/* Services Introduction */}
      <section className="py-12 px-[10%]">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Comprehensive Career Support
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Explore our comprehensive range of services designed to enhance your career journey and professional development.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="p-6 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="mb-4 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{service.title}</h3>
              <p className="text-gray-600 mb-4 text-center">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-[10%] bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Advance Your Career?</h2>
            <p className="text-gray-600 mb-6">
              Our services are designed to support your career growth at every stage. Whether you're looking for job opportunities, 
              want to contribute to meaningful projects, or need professional development resources, we have something for you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/jobs" 
                className="px-6 py-3 btn-accent rounded-lg font-medium transition-colors duration-300"
              >
                Browse Jobs
              </Link>
              <Link 
                to="/contact" 
                className="px-6 py-3 btn-outline rounded-lg font-medium transition-colors duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center text-gray-500">
            Service Illustration
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;