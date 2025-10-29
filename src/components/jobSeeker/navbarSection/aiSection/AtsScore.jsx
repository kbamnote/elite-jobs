import React, { useState } from "react";
import Header from "../../commonSeeker/Header";
import Footer from "../../commonSeeker/Footer";
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
    setLoading(true);
    // Design-only: simulate analysis result
    setTimeout(() => {
      setResult({
        score: 78,
        feedback: [
          "Include strong keywords relevant to the job description",
          "Use **bullet points** to highlight accomplishments",
          "Add measurable impact (e.g., increased performance by **25%**)",
        ],
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Header />
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
                      <p className="text-6xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-body)' }}>{result.score}</p>
                      <p className="font-medium text-lg text-white/90" style={{ fontFamily: 'var(--font-body)' }}>
                        {result.score >= 80 ? "Outstanding Resume!" : "Room for Improvement"}
                      </p>
                    </div>
                  </div>

                  {result.feedback.length > 0 && (
                    <div className="flex-1 mt-6 overflow-hidden flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center" style={{ fontFamily: 'var(--font-body)' }}>
                        <Star className="w-5 h-5 mr-2" style={{ color: 'var(--color-accent)' }} />
                        Key Suggestions
                      </h3>
                      <div className="flex-1 overflow-y-auto pr-2">
                        <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                          <ul className="list-disc pl-6 space-y-3 text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>
                            {result.feedback.map((suggestion, index) => (
                              <li key={index} className="leading-relaxed">{suggestion}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
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
      <Footer />
    </>
  );
};

export default ATS_Score;