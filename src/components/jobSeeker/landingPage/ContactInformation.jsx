import React from 'react';
import { Mail, Phone, MapPin, Headset, TrendingUp, Globe, IndianRupee } from 'lucide-react';

const ContactInformation = () => {
  return (
    <div className="slide-container mx-auto max-w-7xl px-4 py-8 relative" style={{ width: '1280px', height: '720px', backgroundColor: 'var(--color-background, #f8fafc)' }}>
     
      {/* Header Section */}
      <div className="px-16 pt-12 pb-6 z-10 w-full">
        <div className="flex items-center gap-3 mb-3">
          <span className="h-px w-12" style={{ backgroundColor: 'var(--color-primary, #3b82f6)' }}></span>
          <p className="font-bold uppercase tracking-widest text-sm" style={{ color: 'var(--color-primary, #3b82f6)', fontFamily: 'var(--font-heading, "Poppins", sans-serif)' }}>
            Get in Touch
          </p>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading, "Poppins", sans-serif)' }}>
          Start Your Journey with <span style={{ color: 'var(--color-primary, #3b82f6)' }}>Elite Jobs</span>
        </h1>
        <p className="max-w-2xl text-lg" style={{ color: 'var(--color-text-muted, #64748b)', fontFamily: 'var(--font-body, "Inter", sans-serif)' }}>
          Ready to transform your hiring process or find your dream job? Connect with us through our digital platforms or reach out directly.
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="flex-1 px-16 pb-12 z-10 flex gap-12 items-stretch">
        {/* Left Column: Domain & Platform Access */}
        <div className="w-5/12 flex flex-col gap-6">
          {/* Main Domain Card */}
          <div className="rounded-2xl p-8 flex-1 flex flex-col justify-between shadow-lg" 
               style={{ backgroundColor: 'var(--color-text-primary, #1e293b)', color: 'white' }}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold" 
                     style={{ backgroundColor: 'var(--color-primary, #3b82f6)' }}>E</div>
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading, "Poppins", sans-serif)' }}>Elite Jobs Platforms</h3>
              </div>

              <div className="space-y-4">
                {/* India Portal */}
                <div className="p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" 
                         style={{ backgroundColor: 'var(--color-primary, #3b82f6)' }}>
                      <IndianRupee className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-200 font-medium">India Portal</p>
                      <p className="text-lg font-bold text-white">eliteindiajobs.in</p>
                    </div>
                  </div>
                </div>

                {/* Global Portal */}
                <div className="p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" 
                         style={{ backgroundColor: 'var(--color-accent, #6366f1)' }}>
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm text-indigo-200 font-medium">Global Portal</p>
                      <p className="text-lg font-bold text-white">eliteindiajobs.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Details & Action */}
        <div className="w-7/12 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-6">
            {/* Sales Contact */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" 
                   style={{ backgroundColor: 'var(--color-accent-light, #eff6ff)', color: 'var(--color-primary, #3b82f6)' }}>
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">Sales & Partnerships</h4>
              <p className="text-sm text-gray-500 mb-3">For corporate demos and hiring plans.</p>
              <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--color-primary, #3b82f6)' }}>
                <Mail className="w-4 h-4" />
                info@eliteindiajobs.in
              </p>
            </div>

            {/* Support Contact */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" 
                   style={{ backgroundColor: 'var(--color-accent-light, #f5f3ff)', color: 'var(--color-accent, #8b5cf6)' }}>
                <Headset className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">Customer Support</h4>
              <p className="text-sm text-gray-500 mb-3">Assistance for job seekers & hosters.</p>
              <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--color-accent, #8b5cf6)' }}>
                <Mail className="w-4 h-4" />
                info@eliteindiajobs.in
              </p>
            </div>

            {/* Phone Contact */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" 
                   style={{ backgroundColor: 'var(--color-success-light, #f0fdf4)', color: 'var(--color-success, #10b981)' }}>
                <Phone className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">Helpline</h4>
              <p className="text-sm text-gray-500 mb-3">Mon-Fri, 9:00 AM - 6:00 PM IST</p>
              <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--color-success, #10b981)' }}>
                <Phone className="w-4 h-4" />
                +91-8855885807
              </p>
            </div>

            {/* Location */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" 
                   style={{ backgroundColor: 'var(--color-warning-light, #fff7ed)', color: 'var(--color-warning, #f97316)' }}>
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">Headquarters</h4>
              <p className="text-sm text-gray-500 mb-3">
                Elite Jobs Office, 1st Floor Mohota Complex, Above State Bank Of India, Katol Road, Chhaoni,
                Nagpur, Maharashtra 440013
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;