import React, { useState, useEffect } from "react";
import Footer from "../../../commonSeeker/Footer";
import QuestionComponent from "./QuestionComponent";
import { getMockTestQuestions, profile } from "../../../../../utils/Api";
import Cookies from "js-cookie";

const mockCategories = [
  "Software Engineering",
  "Data Science",
  "Product Management",
  "UI/UX Design",
  "DevOps",
  "Cybersecurity",
  "Doctor",
  "Engineer",
  "Teacher",
  "Lawyer",
  "Accountant",
  "Marketing",
  "Sales",
  "HR",
  "Finance"
];

const AiMockTest = () => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Check if user is logged in and fetch their email
    const token = Cookies.get("token");
    if (token) {
      // Fetch user profile to get email
      const fetchUserProfile = async () => {
        try {
          const response = await profile();
          const userEmail = response.data.data.email;
          setEmail(userEmail);
        } catch (err) {
          console.error("Error fetching user profile:", err);
          // If profile fetch fails, user can still manually enter email
        }
      };
      fetchUserProfile();
    }
  }, []);

  const startTest = async () => {
    if (!category) {
      setError("Please select a category to start.");
      return;
    }
    if (!email) {
      setError("Please log in or enter your email to start.");
      return;
    }
    if (!subcategory) {
      setError("Please enter a sub-category to start.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Call the API to get questions
      const payload = {
        email: email,
        category: category,
        "sub category": subcategory
      };
      
      const response = await getMockTestQuestions(payload);
      
      // Extract questions from the response
      const extractedQuestions = response.questions || response[0]?.questions || [];
      setQuestions(extractedQuestions);
      
      if (extractedQuestions.length === 0) {
        setError("No questions found for the selected category. Please try another category.");
        setLoading(false);
        return;
      }
      
      setStarted(true);
      setCurrentIndex(0);
      setAnswers({});
      setShowResult(false);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to load questions. Please try again later.");
      setLoading(false);
    }
  };

  const handleSelect = (opt) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: opt }));
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setShowResult(true);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const resetTest = () => {
    setStarted(false);
    setCurrentIndex(0);
    setAnswers({});
    setShowResult(false);
    setQuestions([]);
    setSubcategory("");
    setError("");
    // Only clear email if it wasn't auto-populated from login
    // We'll reset to empty string only if user wasn't logged in initially
    // For simplicity, we'll just not clear email field
  };

  const calculateScore = () => {
    let correct = 0;
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const userAnswer = answers[i];
      // Check against either answer or correctOption field
      if (userAnswer && (userAnswer === question.answer || userAnswer === question.correctOption)) {
        correct++;
      }
    }
    return correct;
  };

  const score = calculateScore();

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'var(--font-body)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>AI Mock Test</h1>
            <p className="text-gray-600 mt-2" style={{ fontFamily: 'var(--font-body)' }}>Practice interview-style questions from various categories.</p>
          </div>

          {!started && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-body)' }}>Email</label>
                <div className="relative">
                  <input
                    type="email"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      backgroundColor: email ? '#f3f4f6' : 'white' // Light gray when auto-filled
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 0 0 2px var(--color-accent-light)';
                      e.target.style.borderColor = 'var(--color-accent)';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = 'none';
                      e.target.style.borderColor = '#d1d5db';
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    readOnly={!!email} // Make it read-only if email is auto-populated
                  />
                  {email && (
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 bg-white px-1">
                      Auto
                    </span>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-body)' }}>Category</label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  style={{ 
                    fontFamily: 'var(--font-body)'
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = '0 0 0 2px var(--color-accent-light)';
                    e.target.style.borderColor = 'var(--color-accent)';
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = '#d1d5db';
                  }}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select category</option>
                  {mockCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-body)' }}>Sub-Category</label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  style={{ 
                    fontFamily: 'var(--font-body)'
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = '0 0 0 2px var(--color-accent-light)';
                    e.target.style.borderColor = 'var(--color-accent)';
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = '#d1d5db';
                  }}
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  placeholder="Enter sub-category"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200" style={{ fontFamily: 'var(--font-body)' }}>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600">Loading questions...</span>
            </div>
          )}

          {!started && !loading ? (
            <div className="mt-6">
              <button
                onClick={startTest}
                className="px-6 py-3 text-white rounded-lg transition-colors font-medium"
                style={{ 
                  backgroundColor: 'var(--color-accent)',
                  fontFamily: 'var(--font-body)'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-accent-dark)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-accent)'}
              >
                Start Test
              </button>
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              {!showResult ? (
                <>
                  <div className="text-sm text-gray-500 mb-2">
                    Question {currentIndex + 1} of {questions.length}
                  </div>
                  
                  {questions.length > 0 && currentIndex < questions.length && (
                    <QuestionComponent
                      index={currentIndex}
                      question={questions[currentIndex].question}
                      options={Object.values(questions[currentIndex].options || {})}
                      selectedOption={answers[currentIndex] || ""}
                      onSelect={handleSelect}
                    />
                  )}

                  <div className="flex items-center justify-between">
                    <button 
                      onClick={resetTest} 
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Reset Test
                    </button>
                    <div className="space-x-3">
                      <button 
                        onClick={prevQuestion} 
                        disabled={currentIndex === 0}
                        className={`px-4 py-2 rounded-lg ${
                          currentIndex === 0 
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                            : 'text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        Prev
                      </button>
                      <button 
                        onClick={nextQuestion} 
                        className="px-4 py-2 text-white rounded-lg transition-colors"
                        style={{ 
                          backgroundColor: 'var(--color-accent)',
                          fontFamily: 'var(--font-body)'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-accent-dark)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-accent)'}
                      >
                        {currentIndex < questions.length - 1 ? "Next" : "Finish"}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div 
                  className="border rounded-xl p-6 text-center"
                  style={{ 
                    backgroundColor: 'var(--color-accent-light)',
                    borderColor: 'var(--color-accent-light)'
                  }}
                >
                  <h2 
                    className="text-xl font-bold"
                    style={{ 
                      color: 'var(--color-accent-dark)',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    Test Completed!
                  </h2>
                  <p 
                    className="mt-2 text-lg"
                    style={{ 
                      color: 'var(--color-accent)',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    Your Score: {score} / {questions.length}
                  </p>
                  <p 
                    className="mt-1 mb-4"
                    style={{ 
                      color: 'var(--color-accent)',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    ({Math.round((score / questions.length) * 100)}% correct)
                  </p>
                  
                  {/* Display answers and explanations */}
                  <div className="mt-6 text-left">
                    <h3 className="font-bold mb-3" style={{ fontFamily: 'var(--font-body)' }}>Review Your Answers:</h3>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {questions.map((question, index) => {
                        const userAnswer = answers[index];
                        const isCorrect = userAnswer && (userAnswer === question.answer || userAnswer === question.correctOption);
                        
                        return (
                          <div key={index} className="border-b pb-4 last:border-b-0">
                            <div className="flex items-start gap-2">
                              <span 
                                className="font-semibold"
                                style={{ 
                                  color: isCorrect ? 'green' : 'red',
                                  fontFamily: 'var(--font-body)'
                                }}
                              >
                                {index + 1}. {isCorrect ? '✓' : '✗'}
                              </span>
                              <div>
                                <p className="font-medium" style={{ fontFamily: 'var(--font-body)' }}>{question.question}</p>
                                <p className="text-sm mt-1">
                                  <span className="font-medium">Your answer:</span> {userAnswer || 'Not answered'}
                                  {userAnswer && !isCorrect && (
                                    <span className="block mt-1 text-green-600">
                                      <span className="font-medium">Correct answer:</span> {question.answer || question.correctOption}
                                    </span>
                                  )}
                                </p>
                                {question.explanation && (
                                  <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'var(--font-body)' }}>
                                    <span className="font-medium">Explanation:</span> {question.explanation}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <button 
                    onClick={resetTest} 
                    className="mt-6 px-6 py-3 text-white rounded-lg transition-colors"
                    style={{ 
                      backgroundColor: 'var(--color-accent)',
                      fontFamily: 'var(--font-body)'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-accent-dark)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-accent)'}
                  >
                    Take Another Test
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AiMockTest;