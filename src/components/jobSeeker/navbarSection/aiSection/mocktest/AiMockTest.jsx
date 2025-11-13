import React, { useState } from "react";
import Header from "../../../commonSeeker/Header";
import Footer from "../../../commonSeeker/Footer";
import QuestionComponent from "./QuestionComponent";

const mockCategories = [
  "Software Engineering",
  "Data Science",
  "Product Management",
  "UI/UX Design",
  "DevOps",
  "Cybersecurity",
];

const sampleQuestions = [
  {
    question: "Which data structure uses LIFO order?",
    options: ["Queue", "Stack", "Heap", "Graph"],
    answer: "Stack",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style Syntax",
      "Computer Style System",
      "Cascaded Sheet Styles",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which HTTP method is idempotent?",
    options: ["POST", "PATCH", "PUT", "CONNECT"],
    answer: "PUT",
  },
];

const AiMockTest = () => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [questionCount, setQuestionCount] = useState(3);
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const startTest = () => {
    if (!category) return alert("Please select a category to start.");
    setStarted(true);
    setCurrentIndex(0);
    setAnswers({});
    setShowResult(false);
  };

  const handleSelect = (opt) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: opt }));
  };

  const nextQuestion = () => {
    if (currentIndex < sampleQuestions.length - 1) {
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
  };

  const score = Object.keys(answers).reduce((acc, key) => {
    const q = sampleQuestions[Number(key)];
    return acc + (answers[key] === q.answer ? 1 : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'var(--font-body)' }}>
 

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>AI Mock Test</h1>
            <p className="text-gray-600 mt-2" style={{ fontFamily: 'var(--font-body)' }}>Practice interview-style questions from various categories. Design-only; no backend.</p>
          </div>

          {!started && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-body)' }}>Difficulty</label>
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
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  {['Easy','Medium','Hard'].map((d)=> (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-body)' }}>Questions</label>
                <input
                  type="number"
                  min={1}
                  max={sampleQuestions.length}
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
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
                />
              </div>
            </div>
          )}

          {!started ? (
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
                  <QuestionComponent
                    index={currentIndex}
                    question={sampleQuestions[currentIndex].question}
                    options={sampleQuestions[currentIndex].options}
                    selectedOption={answers[currentIndex] || ""}
                    onSelect={handleSelect}
                  />

                  <div className="flex items-center justify-between">
                    <button 
                      onClick={resetTest} 
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Reset
                    </button>
                    <div className="space-x-3">
                      <button 
                        onClick={prevQuestion} 
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
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
                        {currentIndex < sampleQuestions.length - 1 ? "Next" : "Finish"}
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
                    Test Completed
                  </h2>
                  <p 
                    className="mt-2"
                    style={{ 
                      color: 'var(--color-accent)',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    Score: {score} / {Math.min(questionCount, sampleQuestions.length)}
                  </p>
                  <button 
                    onClick={resetTest} 
                    className="mt-4 px-6 py-3 text-white rounded-lg transition-colors"
                    style={{ 
                      backgroundColor: 'var(--color-accent)',
                      fontFamily: 'var(--font-body)'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-accent-dark)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-accent)'}
                  >
                    Try Again
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