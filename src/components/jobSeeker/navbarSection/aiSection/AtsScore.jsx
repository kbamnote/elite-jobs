import React, { useState } from "react";
import {
  ArrowUpCircle,
  FileText,
  CheckCircle,
  Star,
  Clock,
  AlertCircle,
  ChevronRight,
  Target,
  Award,
  TrendingUp,
  Wrench,
  BookOpen,
  BarChart3,
} from "lucide-react";

const ATS_Score = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please upload a resume!");
    
    const formData = new FormData();
    formData.append('resume_file', file);
    
    setLoading(true);
    try {
      // Log the file info for debugging
      console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);
      
      const response = await fetch('https://ats-score-calculator-production.up.railway.app/api/v1/ats-score/upload', {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header when using FormData - the browser sets it automatically
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API request failed with status ${response.status}. Details: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      // Transform API response to match UI expectations
      const transformedResult = {
        score: Math.round(data.overall_score),
        breakdown: data.breakdown || {},
        matchedKeywords: data.matched_keywords || [],
        missingKeywords: data.missing_keywords || [],
        detectedSkills: data.detected_skills || [],
        matchedSkills: data.matched_skills || [],
        recommendations: data.recommendations || [],
        recommendationsBySection: data.recommendations_by_section || {},
      };
      
      setResult(transformedResult);
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Error uploading resume: ' + error.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50" style={{ fontFamily: 'var(--font-body)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Optimize Your <span style={{ color: 'var(--color-accent)' }}>Resume</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get instant feedback on your resume's ATS compatibility and expert
              suggestions to improve your chances of landing your dream job.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300" style={{ borderColor: 'var(--color-accent-light)' }}>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                  <Target className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI Analysis</h3>
                  <p className="text-sm text-gray-500">Advanced resume scanning</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300" style={{ borderColor: 'var(--color-accent-light)' }}>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                  <Award className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Expert Insights</h3>
                  <p className="text-sm text-gray-500">Professional recommendations</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300" style={{ borderColor: 'var(--color-accent-light)' }}>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                  <Clock className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Quick Results</h3>
                  <p className="text-sm text-gray-500">Instant feedback</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <section className="bg-white rounded-3xl p-8 shadow-xl border hover:shadow-2xl transition-all duration-300 h-[600px] flex flex-col" style={{ borderColor: 'var(--color-accent-light)' }}>
              <div className="-mt-12 -mx-8 mb-8 p-6 rounded-t-3xl" style={{ background: 'linear-gradient(to bottom right, var(--color-accent), var(--color-accent-dark))' }}>
                <h2 className="text-2xl font-bold text-white text-center" style={{ fontFamily: 'var(--font-body)' }}>
                  Upload Your Resume
                </h2>
              </div>

              <div 
                className="flex-1 mt-4 border-3 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer bg-gradient-to-b from-white flex flex-col items-center justify-center"
                style={{ 
                  borderColor: 'var(--color-accent-light)',
                  backgroundColor: 'var(--color-accent-light)',
                  backgroundImage: 'linear-gradient(to bottom, white, rgba(var(--color-accent-rgb), 0.1))'
                }}
                onMouseEnter={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                onMouseLeave={(e) => e.target.style.borderColor = 'var(--color-accent-light)'}
              >
                <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="resume-input" />
                <div className="flex flex-col items-center space-y-4">
                  {file ? (
                    <>
                      <div className="p-4 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                        <FileText className="w-12 h-12" style={{ color: 'var(--color-accent)' }} />
                      </div>
                      <p className="text-lg font-medium text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>{file.name}</p>
                      <div className="flex items-center" style={{ color: 'var(--color-accent)' }}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <p className="text-sm" style={{ fontFamily: 'var(--font-body)' }}>File ready for analysis</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-4 rounded-full" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                        <ArrowUpCircle className="w-12 h-12 animate-bounce" style={{ color: 'var(--color-accent)' }} />
                      </div>
                      <p className="text-lg font-medium text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>Drop your resume here</p>
                      <div className="flex items-center" style={{ color: 'var(--color-accent)' }}>
                        <AlertCircle className="w-4 h-4 mr-2" />
                        <p className="text-sm" style={{ fontFamily: 'var(--font-body)' }}>PDF format, max 5MB</p>
                      </div>
                    </>
                  )}
                  <label 
                    htmlFor="resume-input" 
                    className="mt-6 px-8 py-3 text-white rounded-xl shadow-lg transition-all duration-300 font-medium flex items-center cursor-pointer"
                    style={{ 
                      backgroundColor: 'var(--color-accent)',
                      fontFamily: 'var(--font-body)'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-accent-dark)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-accent)'}
                  >
                    Select File
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </label>
                </div>
              </div>

              <button
                onClick={handleUpload}
                className="mt-6 w-full px-6 py-4 text-white rounded-xl shadow-lg transition-all duration-300 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: 'var(--color-accent)',
                  fontFamily: 'var(--font-body)'
                }}
                onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = 'var(--color-accent-dark)')}
                onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = 'var(--color-accent)')}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Analyzing Resume...</span>
                  </>
                ) : (
                  <span className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Start Analysis
                  </span>
                )}
              </button>
            </section>

            {/* Results Section */}
            <section className="bg-white rounded-3xl p-8 shadow-xl border hover:shadow-2xl transition-all duration-300 h-[600px] flex flex-col" style={{ borderColor: 'var(--color-accent-light)' }}>
              {result !== null ? (
                <div className="flex flex-col h-full">
                  <div className="-mt-12 -mx-8 p-8 rounded-t-3xl text-center shadow-lg relative overflow-hidden" style={{ background: 'linear-gradient(to bottom right, var(--color-accent), var(--color-accent-dark))' }}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
                    <div className="z-10">
                      <div className="flex items-center justify-center mb-2">
                        <div className="p-2 bg-white/20 rounded-full">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <p className="text-6xl font-bold text-black mb-1" style={{ fontFamily: 'var(--font-body)' }}>{result.score}</p>
                      <p className="font-medium text-lg text-black/90" style={{ fontFamily: 'var(--font-body)' }}>
                        {result.score >= 80 ? "Outstanding Resume!" : 
                         result.score >= 60 ? "Good Resume" : 
                         result.score >= 40 ? "Average Resume" : 
                         "Needs Improvement"}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 mt-6 overflow-hidden flex flex-col">
                    {/* Tabs for different views */}
                    <div className="flex border-b mb-4">
                      <button className="px-4 py-2 font-medium text-black hover:text-black border-b-2 border-blue-500 text-blue-600">
                        Overview
                      </button>
                    </div>
                    
                    {/* Score Breakdown */}
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-black mb-3 flex items-center" style={{ fontFamily: 'var(--font-body)' }}>
                        <BarChart3 className="w-5 h-5 mr-2" style={{ color: 'var(--color-accent)' }} />
                        Score Breakdown
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {result.breakdown ? Object.entries(result.breakdown).map(([key, value]) => (
                          <div key={key} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                            <p className="text-sm text-black capitalize">{key.replace('_', ' ')}</p>
                            <p className="font-bold text-black">{Math.round(value)}%</p>
                          </div>
                        )) : <p className="text-gray-600">Loading breakdown...</p>}
                      </div>
                    </div>
                    
                    {/* Keywords Analysis */}
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-black mb-3 flex items-center" style={{ fontFamily: 'var(--font-body)' }}>
                        <BookOpen className="w-5 h-5 mr-2" style={{ color: 'var(--color-accent)' }} />
                        Keywords Analysis
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-black mb-2">Matched Keywords ({result.matchedKeywords ? result.matchedKeywords.length : 0})</p>
                          <div className="max-h-24 overflow-y-auto p-3 rounded-lg" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                            <div className="flex flex-wrap gap-1">
                              {result.matchedKeywords ? result.matchedKeywords.slice(0, 10).map((keyword, index) => (
                                <span key={index} className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">{keyword}</span>
                              )) : <span className="text-gray-500 text-sm">Loading...</span>}
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-black mb-2">Missing Keywords ({result.missingKeywords ? result.missingKeywords.length : 0})</p>
                          <div className="max-h-24 overflow-y-auto p-3 rounded-lg" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                            <div className="flex flex-wrap gap-1">
                              {result.missingKeywords ? result.missingKeywords.slice(0, 10).map((keyword, index) => (
                                <span key={index} className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">{keyword}</span>
                              )) : <span className="text-gray-500 text-sm">Loading...</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Skills Analysis */}
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-black mb-3 flex items-center" style={{ fontFamily: 'var(--font-body)' }}>
                        <Wrench className="w-5 h-5 mr-2" style={{ color: 'var(--color-accent)' }} />
                        Skills Analysis
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-black mb-2">Detected Skills ({result.detectedSkills ? result.detectedSkills.length : 0})</p>
                          <div className="max-h-24 overflow-y-auto p-3 rounded-lg" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                            <div className="flex flex-wrap gap-1">
                              {result.detectedSkills ? result.detectedSkills.slice(0, 10).map((skill, index) => (
                                <span key={index} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{skill}</span>
                              )) : <span className="text-gray-500 text-sm">Loading...</span>}
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-black mb-2">Matched Skills ({result.matchedSkills ? result.matchedSkills.length : 0})</p>
                          <div className="max-h-24 overflow-y-auto p-3 rounded-lg" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                            <div className="flex flex-wrap gap-1">
                              {result.matchedSkills ? result.matchedSkills.slice(0, 10).map((skill, index) => (
                                <span key={index} className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">{skill}</span>
                              )) : <span className="text-gray-500 text-sm">Loading...</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Recommendations by Section */}
                    <div className="flex-1 overflow-y-auto pr-2">
                      <h3 className="text-xl font-bold text-black mb-4 flex items-center" style={{ fontFamily: 'var(--font-body)' }}>
                        <Star className="w-5 h-5 mr-2" style={{ color: 'var(--color-accent)' }} />
                        Recommendations by Section
                      </h3>
                      <div className="space-y-4">
                        {result.recommendationsBySection && Object.keys(result.recommendationsBySection).length > 0 ? (
                          Object.entries(result.recommendationsBySection).map(([section, recs], index) => (
                            <div key={index} className="rounded-lg p-4" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                              <h4 className="font-bold text-black mb-2">{section}</h4>
                              <ul className="list-disc pl-6 space-y-2 text-black">
                                {recs.map((rec, idx) => (
                                  <li key={idx} className="text-sm leading-relaxed text-black">{rec}</li>
                                ))}
                              </ul>
                            </div>
                          ))
                        ) : (
                          <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                            <h4 className="font-bold text-black mb-2">General Recommendations</h4>
                            <ul className="list-disc pl-6 space-y-2 text-black">
                              {result.recommendations && result.recommendations.slice(0, 5).map((rec, idx) => (
                                <li key={idx} className="text-sm leading-relaxed text-black">{rec}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="p-4 rounded-full mb-4" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                    <FileText className="w-10 h-10" style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <p className="text-gray-600 max-w-md" style={{ fontFamily: 'var(--font-body)' }}>
                    Upload your resume to see your ATS score and receive tailored suggestions to improve your chances.
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ATS_Score;