import React from 'react';
import { Search, ListFilter, FileText, Send, Bell, ArrowRight } from 'lucide-react';

const JobSeekerJourneyPart2 = () => {
  const steps = [
    {
      id: 1,
      icon: <ListFilter className="w-6 h-6" />,
      title: "Browse Feeds",
      description: "Explore curated lists like \"Recent Jobs\" and \"Top Companies\" tailored to you.",
      status: "completed",
      features: [
        { color: "bg-indigo-200", width: "w-20" },
        { color: "bg-blue-200", width: "w-16" }
      ]
    },
    {
      id: 2,
      icon: <ListFilter className="w-6 h-6" />,
      title: "Smart Filters",
      description: "Narrow down by Role, Location, Experience, CTC, and Work Mode.",
      status: "completed",
      filters: [
        { text: "Remote", color: "blue" },
        { text: "₹15LPA+", color: "green" },
        { text: "Full-time", color: "purple" }
      ]
    },
    {
      id: 3,
      icon: <FileText className="w-6 h-6" />,
      title: "Job Insights",
      description: "Deep dive into detailed descriptions, requirements, and company culture.",
      status: "completed",
      progressBars: [
        { width: "full" },
        { width: "3/4" },
        { width: "1/2" }
      ]
    },
    {
      id: 4,
      icon: <Send className="w-6 h-6" />,
      title: "Easy Apply",
      description: "One-click application submission with instant confirmation.",
      status: "completed",
      apply: true
    }
  ];

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <Search className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-red-600 font-bold uppercase tracking-widest text-sm">
              Job Seeker Journey • Part 2
            </p>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
            Discovery & <span className="text-red-600">Application</span>
          </h2>
          
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
            From smart filtering to one-click applications, connecting talent with opportunity instantly.
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
            <div className="absolute top-8 left-0 w-full h-1 bg-red-500 rounded-full z-0 opacity-30"></div>

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
                      step.status === 'completed' || step.id === 4 ? 'bg-green-500' : 
                      step.status === 'in-progress' ? 'bg-red-500' : 'bg-gray-400'
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
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mt-auto">
                          {step.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 mb-2 last:mb-0 border-b border-gray-200 pb-1">
                              <div className={`w-4 h-4 rounded ${feature.color}`}></div>
                              <div className={`h-2 ${feature.width} bg-gray-200 rounded`}></div>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.filters && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {step.filters.map((filter, idx) => (
                            <span key={idx} className={`px-2 py-1 text-[10px] rounded-full border ${
                              filter.color === 'blue' ? 'bg-red-50 text-red-600 border-red-100' :
                              filter.color === 'green' ? 'bg-green-50 text-green-600 border-green-100' :
                              filter.color === 'purple' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                              'bg-gray-50 text-gray-600 border-gray-100'
                            }`}>
                              {filter.text}
                            </span>
                          ))}
                        </div>
                      )}

                      {step.progressBars && (
                        <div className="space-y-2 mt-auto">
                          {step.progressBars.map((bar, idx) => (
                            <div key={idx} className={`h-2 bg-gray-100 rounded w-${bar.width}`}></div>
                          ))}
                        </div>
                      )}

                      {step.apply && (
                        <div className="flex flex-col gap-2 mt-auto">
                          <div className="w-full bg-red-600 text-white text-xs py-2 rounded text-center font-medium">
                            Apply Now
                          </div>
                          <div className="flex items-center justify-center gap-1 text-[10px] text-green-600">
                            <i className="fas fa-check-circle"></i>
                            <span>Application Sent</span>
                          </div>
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
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Real-time Notifications</p>
              <p className="text-xs text-gray-500">Get instant alerts when your application status changes.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-xs uppercase tracking-wide">Next Step:</span>
            <span className="text-sm font-semibold text-gray-700">Engagement & Features</span>
            <ArrowRight className="w-4 h-4 text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerJourneyPart2;