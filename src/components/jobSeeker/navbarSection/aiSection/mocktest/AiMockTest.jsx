import React, { useState, useEffect } from "react";
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
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);

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

  // Timer effect
  useEffect(() => {
    let interval = null;
    
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            // Auto submit when timer reaches 0
            handleAutoSubmit();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

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
      setTimeLeft(180); // Reset timer to 3 minutes
      setTimerActive(true); // Start the timer
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

  const handleAutoSubmit = () => {
    setTimerActive(false);
    setShowResult(true);
    // Show alert that time is up
    alert("⏰ Time's up! Your test has been automatically submitted.");
  };

  const resetTest = () => {
    setStarted(false);
    setCurrentIndex(0);
    setAnswers({});
    setShowResult(false);
    setQuestions([]);
    setSubcategory("");
    setError("");
    setTimeLeft(180);
    setTimerActive(false);
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
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-200">
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                    Preparing Your Mock Test
                  </h3>
                  <p className="text-gray-600 mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                    AI is generating personalized questions based on your selected category and sub-category.
                  </p>
                  
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Instructions
                    </h4>
                    <ul className="text-sm text-blue-700 text-left space-y-1">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Read each question carefully before answering</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Select the most appropriate answer from the options</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>You can navigate between questions using Prev/Next buttons</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Review your answers before submitting</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-center text-gray-500">
                    <svg className="animate-bounce w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    <span className="text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                      Please wait while we prepare your test...
                    </span>
                  </div>
                </div>
              </div>
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
                  {/* Timer Display */}
                  <div className="flex justify-between items-center mb-4 p-4 rounded-lg bg-red-50 border border-red-200">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-bold text-red-700" style={{ fontFamily: 'var(--font-body)' }}>
                        Time Remaining:
                      </span>
                    </div>
                    <div className={`text-2xl font-bold ${timeLeft <= 30 ? 'text-red-600 animate-pulse' : 'text-red-700'}`} style={{ fontFamily: 'var(--font-body)' }}>
                      {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </div>
                  </div>
                  
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
    </div>
  );
};

export default AiMockTest;