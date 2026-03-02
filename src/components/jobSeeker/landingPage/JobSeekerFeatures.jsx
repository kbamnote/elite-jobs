import React from 'react';
import { CheckSquare, Bell, BookOpen, Headset, Briefcase, Bookmark, Zap } from 'lucide-react';

const JobSeekerFeatures = () => {
  return (
    <div className="slide-container mx-auto max-w-7xl px-4 py-8 relative" style={{ width: '1280px', height: '720px', backgroundColor: '#f8fafc' }}>
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50 z-0" style={{ backgroundColor: 'var(--color-accent-light, #dbeafe)' }}></div>
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-blue-100 z-0 opacity-50" style={{ borderColor: 'var(--color-accent-light, #dbeafe)' }}></div>

      {/* Header Section */}
      <div className="px-16 pt-12 pb-6 z-10 w-full">
        <div className="flex items-center gap-3 mb-3">
          <span className="h-px w-12" style={{ backgroundColor: 'var(--color-primary, #3b82f6)' }}></span>
          <p className="font-bold uppercase tracking-widest text-sm" style={{ color: 'var(--color-primary, #3b82f6)', fontFamily: 'var(--font-heading, "Poppins", sans-serif)' }}>
            Engagement & Management
          </p>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading, "Poppins", sans-serif)' }}>
          Tools to Manage Your <span style={{ color: 'var(--color-primary, #3b82f6)' }}>Career Growth</span>
        </h1>
        <p className="max-w-3xl text-lg" style={{ color: 'var(--color-text-muted, #64748b)', fontFamily: 'var(--font-body, "Inter", sans-serif)' }}>
          Beyond job search, Elite Jobs offers a suite of features to keep you organized, informed, and connected throughout your employment journey.
        </p>
      </div>

      {/* Main Content: 3 Column Grid */}
      <div className="flex-1 px-16 pb-8 z-10 flex gap-8 items-stretch">
        {/* Card 1: Application Tracking */}
        <div className="bg-white rounded-2xl p-8 flex-1 flex flex-col relative overflow-hidden transition-all hover:transform hover:-translate-y-1 hover:shadow-xl border border-gray-200" style={{ fontFamily: 'var(--font-body, "Inter", sans-serif)' }}>
          <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: 'var(--color-primary, #3b82f6)' }}></div>
          <div className="flex justify-between items-start mb-6">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-sm transition-transform duration-300 hover:scale-110 hover:rotate-5" 
                 style={{ backgroundColor: 'var(--color-accent-light, #eff6ff)', color: 'var(--color-primary, #3b82f6)' }}>
              <CheckSquare className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide" 
                 style={{ backgroundColor: 'var(--color-accent-light, #dbeafe)', color: 'var(--color-primary-dark, #2563eb)' }}>
              Profile
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading, "Poppins", sans-serif)' }}>Application Tracking</h3>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-muted, #64748b)' }}>
            View the status of every job you've applied for directly from your profile dashboard. No more guessing games.
          </p>

          {/* Visual Element: Mock Tracker */}
          <div className="mt-auto bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center text-gray-400">
                  <Briefcase className="w-3 h-3" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">Senior UX Designer</p>
                  <p className="text-[10px] text-gray-400">TechCorp Inc.</p>
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
              <div className="h-1.5 rounded-full w-2/3" style={{ backgroundColor: 'var(--color-success, #10b981)' }}></div>
            </div>
            <div className="flex justify-between text-[10px] font-medium text-gray-500">
              <span>Applied</span>
              <span style={{ color: 'var(--color-success, #10b981)' }}>Shortlisted</span>
              <span>Interview</span>
            </div>
          </div>
        </div>

        {/* Card 2: Saved Jobs & Alerts */}
        <div className="bg-white rounded-2xl p-8 flex-1 flex flex-col relative overflow-hidden transition-all hover:transform hover:-translate-y-1 hover:shadow-xl border border-gray-200" style={{ fontFamily: 'var(--font-body, "Inter", sans-serif)' }}>
          <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: 'var(--color-accent, #6366f1)' }}></div>
          <div className="flex justify-between items-start mb-6">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-sm transition-transform duration-300 hover:scale-110 hover:rotate-5" 
                 style={{ backgroundColor: 'var(--color-accent-light, #f0f9ff)', color: 'var(--color-accent, #6366f1)' }}>
              <Bell className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide" 
                 style={{ backgroundColor: 'var(--color-accent-light, #e0e7ff)', color: 'var(--color-accent-dark, #4f46e5)' }}>
              Discovery
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading, "Poppins", sans-serif)' }}>Saved Jobs & Alerts</h3>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-muted, #64748b)' }}>
            Bookmark interesting roles for later and set smart alerts to get notified instantly when matching jobs go live.
          </p>

          {/* Visual Element: List */}
          <div className="mt-auto space-y-3">
            <div className="flex items-center justify-between bg-white border border-gray-100 p-3 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <Bookmark className="w-3 h-3" style={{ color: 'var(--color-accent, #6366f1)' }} />
                <span className="text-xs font-semibold text-gray-700">Product Manager</span>
              </div>
              <span className="text-[10px] text-gray-400">Saved 2h ago</span>
            </div>
            <div className="flex items-center justify-between bg-indigo-50 border border-indigo-100 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3" style={{ color: 'var(--color-warning, #f59e0b)' }} />
                <span className="text-xs font-semibold text-gray-700">New Alert Match!</span>
              </div>
              <button className="text-[10px] px-2 py-1 rounded" style={{ backgroundColor: 'var(--color-accent, #6366f1)', color: 'white' }}>
                View
              </button>
            </div>
          </div>
        </div>

        {/* Card 3: Blogs & Resources */}
        <div className="bg-white rounded-2xl p-8 flex-1 flex flex-col relative overflow-hidden transition-all hover:transform hover:-translate-y-1 hover:shadow-xl border border-gray-200" style={{ fontFamily: 'var(--font-body, "Inter", sans-serif)' }}>
          <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: 'var(--color-warning, #f97316)' }}></div>
          <div className="flex justify-between items-start mb-6">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-sm transition-transform duration-300 hover:scale-110 hover:rotate-5" 
                 style={{ backgroundColor: 'var(--color-accent-light, #fff7ed)', color: 'var(--color-warning, #f97316)' }}>
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide" 
                 style={{ backgroundColor: 'var(--color-accent-light, #ffedd5)', color: 'var(--color-warning-dark, #ea580c)' }}>
              Learning
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading, "Poppins", sans-serif)' }}>Blogs & Insights</h3>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-muted, #64748b)' }}>
            Access a curated library of career tips, interview preparation guides, and industry trends to stay ahead.
          </p>

          {/* Visual Element: Article Cards */}
          <div className="mt-auto grid grid-cols-2 gap-2">
            <div className="bg-gray-50 p-2 rounded border border-gray-100">
              <div className="h-10 rounded mb-2 w-full" style={{ backgroundColor: 'var(--color-border, #e2e8f0)' }}></div>
              <div className="h-2 rounded w-3/4 mb-1" style={{ backgroundColor: 'var(--color-border, #e2e8f0)' }}></div>
              <div className="h-2 rounded w-1/2" style={{ backgroundColor: 'var(--color-border, #e2e8f0)' }}></div>
            </div>
            <div className="bg-gray-50 p-2 rounded border border-gray-100">
              <div className="h-10 rounded mb-2 w-full" style={{ backgroundColor: 'var(--color-border, #e2e8f0)' }}></div>
              <div className="h-2 rounded w-3/4 mb-1" style={{ backgroundColor: 'var(--color-border, #e2e8f0)' }}></div>
              <div className="h-2 rounded w-1/2" style={{ backgroundColor: 'var(--color-border, #e2e8f0)' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Feature: Contact Forms */}
      <div className="px-16 pb-12 z-10">
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-success-light, #f0fdf4)', color: 'var(--color-success, #16a34a)' }}>
              <Headset className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading, "Poppins", sans-serif)' }}>Need Assistance?</h4>
              <p className="text-sm" style={{ color: 'var(--color-text-muted, #64748b)' }}>Integrated contact forms allow you to reach support or recruiters directly for enquiries.</p>
            </div>
          </div>
          <button className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2" 
                  style={{ backgroundColor: 'var(--color-text-primary, #1e293b)', color: 'white' }}>
            <span>Contact Support</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerFeatures;