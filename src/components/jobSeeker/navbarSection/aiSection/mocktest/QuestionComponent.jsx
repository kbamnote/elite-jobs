import React from "react";

const QuestionComponent = ({ index, question, options, selectedOption, onSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-semibold">
          {index + 1}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{question}</h3>
          <div className="space-y-3">
            {options.map((opt, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name={`q-${index}`}
                  value={opt}
                  checked={selectedOption === opt}
                  onChange={() => onSelect(opt)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                />
                <span className="text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionComponent;