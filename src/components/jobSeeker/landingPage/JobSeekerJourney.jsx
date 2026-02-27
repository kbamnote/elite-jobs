import React from 'react';
import { User, Shield, UserPen, Upload, Wand2, ArrowRight } from 'lucide-react';

const JobSeekerJourney = () => {
  const steps = [
    {
      id: 1,
      icon: <User className="w-6 h-6" />,
      title: "Sign Up / Login",
      description: "Multi-option access via Email, Mobile Number, or Social accounts.",
      status: "completed",
      features: [
        { icon: "fab fa-google text-red-500", name: "Google Login" },
        { icon: "fab fa-linkedin text-blue-700", name: "LinkedIn Login" }
      ]
    },
    {
      id: 2,
      icon: <Shield className="w-6 h-6" />,
      title: "Verify Identity",
      description: "Ensuring genuine profiles through OTP verification for email and mobile.",
      status: "completed",
      features: [
        { text: "Email Verified", status: "verified" },
        { text: "Mobile Verified", status: "verified" }
      ]
    },
    {
      id: 3,
      icon: <UserPen className="w-6 h-6" />,
      title: "Profile Wizard",
      description: "Guided onboarding to capture education, experience, and key skills.",
      status: "in-progress",
      progress: 70
    },
    {
      id: 4,
      icon: <Upload className="w-6 h-6" />,
      title: "Resume & Alerts",
      description: "Upload resume for parsing and set preferences for job recommendations.",
      status: "pending",
      upload: true
    }
  ];

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <User className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-red-600 font-bold uppercase tracking-widest text-sm">
              Job Seeker Journey • Part 1
            </p>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
            Authentication & <span className="text-red-600">Onboarding</span>
          </h2>
          
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
            A seamless, secure, and smart entry point for candidates to build their professional identity.
          </p>
        </div>

        {/* Timeline Section */}
        <div className="relative mb-16">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10 translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10 -translate-x-1/3 translate-y-1/3"></div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Connecting Line Base */}
            <div className="absolute top-8 left-0 w-full h-1 bg-gray-200 rounded-full z-0"></div>
            
            {/* Progress Line */}
            <div className="absolute top-8 left-0 w-[75%] h-1 bg-red-500 rounded-full z-0 opacity-30"></div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center group">
                  {/* Step Icon */}
                  <div className={`relative w-16 h-16 rounded-full flex items-center justify-center text-xl shadow-lg mb-6 z-10 transition-all duration-300 ${
                    step.status === 'completed' 
                      ? 'bg-white border-4 border-red-500 text-red-600 group-hover:bg-red-600 group-hover:text-white' 
                      : step.status === 'in-progress'
                      ? 'bg-red-500 border-4 border-red-500 text-white'
                      : 'bg-white border-4 border-gray-300 text-gray-400'
                  }`}>
                    {step.icon}
                    <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs text-white ${
                      step.status === 'completed' ? 'bg-green-500' : 
                      step.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-400'
                    }`}>
                      {step.id}
                    </div>
                  </div>

                  {/* Step Card */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm w-full transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col h-64">
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                      {step.title}
                    </h3>
                    <p className="text-sm mb-4 flex-grow" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
                      {step.description}
                    </p>

                    {/* Step Specific Content */}
                    <div className="mt-auto">
                      {step.features && (
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                          {step.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 mb-2 last:mb-0">
                              <i className={feature.icon}></i>
                              <span className="text-xs font-semibold text-gray-600">{feature.name}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.features && step.features.every(f => f.status === 'verified') && (
                        <div className="space-y-2 mt-3">
                          {step.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-green-50 px-3 py-2 rounded text-xs text-green-700 border border-green-100">
                              <span>{feature.text}</span>
                              <i className="fas fa-check-circle"></i>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.progress !== undefined && (
                        <div className="space-y-2">
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div 
                              className="bg-red-500 h-2 rounded-full transition-all duration-500" 
                              style={{ width: `${step.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-right text-red-600 font-semibold">{step.progress}% Completed</p>
                        </div>
                      )}

                      {step.upload && (
                        <div className="border-2 border-dashed border-red-200 rounded-lg bg-red-50 p-4 flex flex-col items-center justify-center text-center">
                          <Upload className="w-6 h-6 text-red-400 mb-2" />
                          <span className="text-xs text-red-600 font-medium">Upload CV</span>
                          <span className="text-[10px] text-gray-400">PDF, DOCX</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Feature Highlight */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
              <Wand2 className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Smart Resume Parser</p>
              <p className="text-xs text-gray-500">Automatically extracts skills and experience to auto-fill the profile.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-xs uppercase tracking-wide">Next Step:</span>
            <span className="text-sm font-semibold text-gray-700">Job Discovery & Filtering</span>
            <ArrowRight className="w-4 h-4 text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerJourney;