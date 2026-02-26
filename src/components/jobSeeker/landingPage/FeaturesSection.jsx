import { useNavigate } from 'react-router-dom';

const FeaturesSection = () => {
  const navigate = useNavigate();

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
          Elite Features for Your Career Success
        </h2>
        <p className="text-lg text-center mb-12 max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          Powerful tools designed to help you land your dream job faster
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Smart Job Matching */}
          <div className="card hover:scale-105 transition-all duration-300" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <div className="p-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                <svg className="w-8 h-8" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                Smart Job Matching
              </h3>
              <p className="text-gray-600 text-center mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                Our AI algorithm matches you with the perfect job opportunities based on your skills, experience, and preferences.
              </p>
              <button 
                className="w-full btn-accent py-3 rounded-xl font-semibold hover:-translate-y-0.5 transition-all duration-200"
                style={{ boxShadow: 'var(--shadow-md)' }}
                onClick={() => navigate('/jobs')}
              >
                Find Jobs
              </button>
            </div>
          </div>
          
          {/* Verified Employers */}
          <div className="card hover:scale-105 transition-all duration-300" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <div className="p-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                <svg className="w-8 h-8" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                Verified Employers
              </h3>
              <p className="text-gray-600 text-center mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                Connect with trusted companies and verified job opportunities. Every employer is pre-screened for your safety.
              </p>
              <button 
                className="w-full btn-accent py-3 rounded-xl font-semibold hover:-translate-y-0.5 transition-all duration-200"
                style={{ boxShadow: 'var(--shadow-md)' }}
                onClick={() => navigate('/companies')}
              >
                View Companies
              </button>
            </div>
          </div>
          
          {/* Fast Application */}
          <div className="card hover:scale-105 transition-all duration-300" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <div className="p-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                <svg className="w-8 h-8" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                One-Click Apply
              </h3>
              <p className="text-gray-600 text-center mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                Apply to multiple jobs instantly with your profile. Save time and increase your chances of getting hired.
              </p>
              <button 
                className="w-full btn-accent py-3 rounded-xl font-semibold hover:-translate-y-0.5 transition-all duration-200"
                style={{ boxShadow: 'var(--shadow-md)' }}
                onClick={() => navigate('/signup')}
              >
                Create Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;