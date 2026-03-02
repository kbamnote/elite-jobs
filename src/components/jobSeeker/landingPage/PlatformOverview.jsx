import React from 'react';
import { User, Building, Binoculars } from 'lucide-react';

const PlatformOverview = () => {
  return (
    <div className="slide-container mx-auto max-w-7xl px-4 py-8 relative" style={{ width: '1280px', height: '720px', backgroundColor: 'var(--color-background)' }}>
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-bl-full z-0 opacity-50" style={{ backgroundColor: 'var(--color-accent-light)' }}></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-tr-full z-0 opacity-50" style={{ backgroundColor: 'var(--color-border)' }}></div>
      {/* Header Section */}
      <div className="w-full px-16 pt-12 pb-6 flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent-light)' }}>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></span>
          <p className="font-semibold text-xs tracking-wider uppercase" style={{ color: 'var(--color-primary)' }}>
            Platform Ecosystem
          </p>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Tailored Experiences for Every Role
        </h1>
        <p className="max-w-2xl text-lg" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
          Elite Jobs provides specialized dashboards and tools designed specifically for the unique needs of job seekers, employers, and recruiters.
        </p>
      </div>

      {/* Main Content: 3 Columns */}
      <div className="flex-1 w-full px-12 pb-12 flex gap-8 items-stretch justify-center">
       
        
        

        {/* Column 2: Job Hosters (Employers) */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col relative overflow-hidden transition-all hover:transform hover:-translate-y-1 hover:shadow-xl" style={{ fontFamily: 'var(--font-body)' }}>
          <div className="absolute top-0 left-0 w-full h-1.5" style={{ backgroundColor: 'var(--color-accent)' }}></div>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 hover:scale-110 transition-transform duration-300" style={{ backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
            <Building className="text-3xl" style={{ color: 'var(--color-accent)' }} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Job Hosters</h3>
          <p className="text-sm mb-6 border-b border-gray-100 pb-4" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
            Helping companies build great teams efficiently.
          </p>
          <div className="flex-1">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-1" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>Company Profile Management</p>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-1" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>Easy Job Posting Workflow</p>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-1" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>Candidate Management Dashboard</p>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-1" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>Document Verification System</p>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-1" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>Application Analytics</p>
              </li>
            </ul>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between font-semibold text-sm" style={{ color: 'var(--color-accent)' }}>
            <span>Key Goal</span>
            <span>Efficient Hiring</span>
          </div>
        </div>
        
        {/* Column 3: Recruiters */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col relative overflow-hidden transition-all hover:transform hover:-translate-y-1 hover:shadow-xl" style={{ fontFamily: 'var(--font-body)' }}>
          <div className="absolute top-0 left-0 w-full h-1.5" style={{ backgroundColor: 'var(--color-accent)' }}></div>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 hover:scale-110 transition-transform duration-300" style={{ backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
            <Binoculars className="text-3xl" style={{ color: 'var(--color-accent)' }} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Recruiters</h3>
          <p className="text-sm mb-6 border-b border-gray-100 pb-4" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
            Advanced tools for headhunters to scout top talent.
          </p>
          <div className="flex-1">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-1" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>Direct Candidate Search</p>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-1" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>Advanced Filtering (Skills, CTC)</p>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-1" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>Talent Pool Organization</p>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-1" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>Direct Messaging & Outreach</p>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-1" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>Resume Database Access</p>
              </li>
            </ul>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between font-semibold text-sm" style={{ color: 'var(--color-accent)' }}>
            <span>Key Goal</span>
            <span>Talent Scouting</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformOverview;