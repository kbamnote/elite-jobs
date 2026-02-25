import React, { useState } from 'react';
import RecruiterHeader from '../sidebar/RecruiterHeader';

const AiCandidateRecommendation = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [candidates, setCandidates] = useState(null);
  const [error, setError] = useState('');
  const [showExample, setShowExample] = useState(false);

  // Example JD for guidance
  const exampleJD = `AI/ML Engineer with 4-7 years experience. Skills: Python, Machine Learning, Deep Learning, NLP. Frameworks: TensorFlow or PyTorch. Cloud: AWS or GCP. Location: Delhi NCR. Job mode: Onsite. Shift: Day. Notice period less than 45 days. Salary 15-22 LPA.`;

  const handleGetCandidates = async () => {
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

    setIsLoading(true);
    setError('');
    setCandidates(null);

    try {
      const response = await fetch('https://eliteassociate1.app.n8n.cloud/webhook/candidate/recommand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: jobDescription
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCandidates(data);
    } catch (err) {
      console.error('Error fetching candidates:', err);
      setError('Failed to fetch candidates. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = () => {
    setJobDescription(exampleJD);
    setShowExample(false);
  };

  return (
    <>
      <RecruiterHeader />
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="flex-1 p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}>
                AI Candidate Recommendation
              </h1>
              <p className="text-sm md:text-base mt-2" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                Get AI-powered candidate recommendations based on your job description
              </p>
            </div>

            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="mb-6">
                <label htmlFor="jobDescription" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                  Job Description
                </label>
                <textarea
                  id="jobDescription"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={6}
                  placeholder="Enter your job description here. Include role, required skills, experience, location, and other requirements..."
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-200"
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-input-bg)',
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-body)'
                  }}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowExample(!showExample)}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {showExample ? 'Hide Example' : 'Show Example Prompt'}
                </button>
                
                {showExample && (
                  <div className="mt-4 p-4 rounded-lg border bg-gray-50" style={{ borderColor: 'var(--color-border)' }}>
                    <h3 className="font-medium mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                      Example Job Description:
                    </h3>
                    <p className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>
                      {exampleJD}
                    </p>
                    <button
                      onClick={handleExampleClick}
                      className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Use This Example
                    </button>
                  </div>
                )}
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200" style={{ fontFamily: 'var(--font-body)' }}>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handleGetCandidates}
                disabled={isLoading}
                className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-white)',
                  fontFamily: 'var(--font-body)'
                }}
              >
                {isLoading ? 'Getting Recommendations...' : 'Get AI Recommendations'}
              </button>
            </div>

            {/* Results Section */}
            {candidates && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}>
                  Recommended Candidates
                </h2>
                
                {candidates[0]?.query_understanding && (
                  <div className="mb-6 p-4 rounded-lg bg-blue-50 border" style={{ borderColor: 'var(--color-border)' }}>
                    <h3 className="font-bold mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                      Query Understanding:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <strong style={{ color: 'var(--color-text-primary)' }}>Role:</strong>
                        <p style={{ color: 'var(--color-text-secondary)' }}>{candidates[0].query_understanding.role}</p>
                      </div>
                      <div>
                        <strong style={{ color: 'var(--color-text-primary)' }}>Experience Level:</strong>
                        <p style={{ color: 'var(--color-text-secondary)' }}>{candidates[0].query_understanding.experience_level}</p>
                      </div>
                      <div>
                        <strong style={{ color: 'var(--color-text-primary)' }}>Requested Count:</strong>
                        <p style={{ color: 'var(--color-text-secondary)' }}>{candidates[0].query_understanding.requested_count}</p>
                      </div>
                    </div>
                    
                    {candidates[0].query_understanding.must_have_skills && (
                      <div className="mt-3">
                        <strong style={{ color: 'var(--color-text-primary)' }}>Must Have Skills:</strong>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {candidates[0].query_understanding.must_have_skills.map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium" style={{ fontFamily: 'var(--font-body)' }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {candidates[0].query_understanding.nice_to_have_skills && (
                      <div className="mt-3">
                        <strong style={{ color: 'var(--color-text-primary)' }}>Nice to Have Skills:</strong>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {candidates[0].query_understanding.nice_to_have_skills.map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium" style={{ fontFamily: 'var(--font-body)' }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-4">
                  {candidates[0]?.results?.map((candidate) => (
                    <div key={candidate.candidate_id} className="border rounded-lg p-4 hover:shadow-md transition-shadow" style={{ borderColor: 'var(--color-border)' }}>
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                        <div className="flex items-center space-x-3 mb-2 md:mb-0">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                            <span className="text-sm font-bold">{candidate.candidate_name.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <div>
                            <h3 className="font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                              {candidate.candidate_name}
                            </h3>
                            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                              {candidate.title_or_role}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded" style={{ fontFamily: 'var(--font-body)' }}>
                            {candidate.experienceInYears}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded" style={{ fontFamily: 'var(--font-body)' }}>
                            {candidate.location}
                          </span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded" style={{ fontFamily: 'var(--font-body)' }}>
                            {candidate.jobMode}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <strong style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>Notice Period:</strong>
                          <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{candidate.noticePeriod}</p>
                        </div>
                        <div>
                          <strong style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>Match Score:</strong>
                          <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{(candidate.mongo_similarity_score * 100).toFixed(2)}%</p>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <strong style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>Skills:</strong>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {candidate.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <strong style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>Summary:</strong>
                        <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{candidate.summary}</p>
                      </div>
                      
                      {candidate.match_reasons && candidate.match_reasons.length > 0 && (
                        <div>
                          <strong style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>Match Reasons:</strong>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {candidate.match_reasons.map((reason, reasonIndex) => (
                              <span key={reasonIndex} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                                {reason}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AiCandidateRecommendation;