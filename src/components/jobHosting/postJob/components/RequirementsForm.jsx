import React from "react";

const RequirementsForm = ({ 
  formData, 
  handleInputChange,
  setFormData,
  skillInput,
  setSkillInput,
  handleSkillInputKeyDown,
  addSkill,
  handleRemoveSkill,
  requirementInput,
  setRequirementInput,
  handleRequirementInputKeyDown,
  addRequirement,
  handleRemoveRequirement,
  responsibilityInput,
  setResponsibilityInput,
  handleResponsibilityInputKeyDown,
  addResponsibility,
  handleRemoveResponsibility,
  isStep2Valid,
  handlePrevious,
  loading,
  handlePostJob
}) => {
  // Function to parse salary input (supports 10000, 10,000, 10k formats)
  const parseSalaryInput = (value) => {
    if (!value) return "";
    
    // Remove commas and 'k' suffix, then convert to number
    const cleanValue = value.toString()
      .replace(/,/g, '') // Remove commas
      .replace(/k$/i, '000') // Replace 'k' with '000'
      .trim();
    
    // Check if it's a valid number
    const numValue = parseInt(cleanValue, 10);
    return isNaN(numValue) ? "" : numValue.toString();
  };

  // Function to parse year of passing input (supports 2023, 2023-2025, 2023/2024/2025 formats)
  const parseYearOfPassingInput = (value) => {
    if (!value) return "";
    
    // Handle range formats (2023-2025 or 2023/2024/2025)
    if (value.includes('-') || value.includes('/')) {
      return value; // Keep range as is
    }
    
    // Handle single year
    const cleanValue = value.toString().trim();
    const yearValue = parseInt(cleanValue, 10);
    return isNaN(yearValue) ? "" : yearValue.toString();
  };

  // Custom handler for salary inputs
  const handleSalaryInputChange = (e) => {
    const { name, value } = e.target;
    const salaryField = name.split(".")[1];
    
    // Parse the value for form data storage
    const parsedValue = parseSalaryInput(value);
    
    // Update both display and parsed values in a single state update
    setFormData(prev => ({
      ...prev,
      salaryDisplay: {
        ...prev.salaryDisplay,
        [salaryField]: value
      },
      salary: {
        ...prev.salary,
        [salaryField]: parsedValue
      }
    }));
  };

  // Custom handler for year of passing input
  const handleYearOfPassingChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = parseYearOfPassingInput(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Minimum Salary
          </label>
          <input
            type="text"
            name="salary.min"
            value={formData.salaryDisplay.min}
            onChange={handleSalaryInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
            style={{ 
              '--tw-ring-color': 'var(--color-accent)',
              '--tw-border-opacity': '1'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            placeholder="e.g., 10000, 10,000, or 10k"
          />
          <div className="mt-1 text-xs text-gray-500">
            Enter as 10000, 10,000, or 10k
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Maximum Salary
          </label>
          <input
            type="text"
            name="salary.max"
            value={formData.salaryDisplay.max}
            onChange={handleSalaryInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
            style={{ 
              '--tw-ring-color': 'var(--color-accent)',
              '--tw-border-opacity': '1'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            placeholder="e.g., 20000, 20,000, or 20k"
          />
          <div className="mt-1 text-xs text-gray-500">
            Enter as 20000, 20,000, or 20k
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Currency
        </label>
        <select
          name="salary.currency"
          value={formData.salary.currency}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
          style={{ 
            '--tw-ring-color': 'var(--color-accent)',
            '--tw-border-opacity': '1'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="INR">INR</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Notice Period *
          </label>
          <select
            name="noticePeriod"
            value={formData.noticePeriod}
            onChange={(e) => setFormData(prev => ({ ...prev, noticePeriod: e.target.value }))}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
            style={{ 
              '--tw-ring-color': 'var(--color-accent)',
              '--tw-border-opacity': '1'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          >
            <option value="">Select Notice Period</option>
            <option value="Immediate Joiner">Immediate Joiner</option>
            <option value="Upto 1 week">Upto 1 week</option>
            <option value="Upto 1 month">Upto 1 month</option>
            <option value="Upto 2 month">Upto 2 month</option>
            <option value="Any">Any</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Openings
          </label>
          <input
            type="number"
            name="numberOfOpenings"
            value={formData.numberOfOpenings}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
            style={{ 
              '--tw-ring-color': 'var(--color-accent)',
              '--tw-border-opacity': '1'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            placeholder="Enter number of openings"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Year of Passing
          </label>
          <input
            type="text"
            name="yearOfPassing"
            value={formData.yearOfPassing}
            onChange={handleYearOfPassingChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
            style={{ 
              '--tw-ring-color': 'var(--color-accent)',
              '--tw-border-opacity': '1'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            placeholder="e.g., 2023, 2023-2025, or 2023/2024/2025"
          />
          <div className="mt-1 text-xs text-gray-500">
            Enter as 2023, 2023-2025, or 2023/2024/2025
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Shift
          </label>
          <select
            name="shift"
            value={formData.shift}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
            style={{ 
              '--tw-ring-color': 'var(--color-accent)',
              '--tw-border-opacity': '1'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          >
            <option value="">Select Shift</option>
            <option value="Day">Day</option>
            <option value="Night">Night</option>
          </select>
        </div>
      </div>
      
      {/* Conditional fields for Walk-in interview type */}
      {formData.interviewType === 'Walk-in' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Walk-in Date *
            </label>
            <input
              type="date"
              name="walkInDate"
              value={formData.walkInDate}
              onChange={handleInputChange}
              required={formData.interviewType === 'Walk-in'}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
              style={{ 
                '--tw-ring-color': 'var(--color-accent)',
                '--tw-border-opacity': '1'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Walk-in Time *
            </label>
            <input
              type="time"
              name="walkInTime"
              value={formData.walkInTime}
              onChange={handleInputChange}
              required={formData.interviewType === 'Walk-in'}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
              style={{ 
                '--tw-ring-color': 'var(--color-accent)',
                '--tw-border-opacity': '1'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Required Skills
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="skills"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillInputKeyDown}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
            style={{ 
              '--tw-ring-color': 'var(--color-accent)',
              '--tw-border-opacity': '1'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            placeholder="Type a skill and press Enter or comma to add"
          />
          <div className="mt-2 text-xs text-gray-500">
            Press Enter or comma (,) to add a skill
          </div>
        </div>
        {formData.skills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: '#fef2f2', color: 'var(--color-accent)' }}
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full"
                  style={{ 
                    color: 'var(--color-accent)', 
                    opacity: '0.6'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#fef2f2';
                    e.target.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.opacity = '0.6';
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Job Requirements *
        </label>
        <div className="mt-1">
          <input
            type="text"
            value={requirementInput}
            onChange={(e) => setRequirementInput(e.target.value)}
            onKeyDown={handleRequirementInputKeyDown}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
            style={{ 
              '--tw-ring-color': 'var(--color-accent)',
              '--tw-border-opacity': '1'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            placeholder="Enter a requirement and press Enter to add"
          />
          <div className="mt-2 text-xs text-gray-500">
            Press Enter to add a requirement (at least one required)
          </div>
          {formData.requirements.length === 0 && (
            <div className="mt-2">
              <div className="text-xs text-gray-400 mb-1">
                Example: "3+ years of experience in HR", "Bachelor's degree in Human Resources"
              </div>
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    requirements: [...prev.requirements, "Bachelor's degree in relevant field", "2+ years of HR experience"]
                  }));
                }}
                className="text-xs"
                style={{ color: 'var(--color-accent)' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                Add sample requirements
              </button>
            </div>
          )}
        </div>
        {formData.requirements.length > 0 ? (
          <div className="mt-2 space-y-2">
            {formData.requirements.map((req, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="text-sm">{req}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveRequirement(req)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-700 text-sm">
            Please add at least one requirement
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Job Responsibilities *
        </label>
        <div className="mt-1">
          <input
            type="text"
            value={responsibilityInput}
            onChange={(e) => setResponsibilityInput(e.target.value)}
            onKeyDown={handleResponsibilityInputKeyDown}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
            style={{ 
              '--tw-ring-color': 'var(--color-accent)',
              '--tw-border-opacity': '1'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            placeholder="Enter a responsibility and press Enter to add"
          />
          <div className="mt-2 text-xs text-gray-500">
            Press Enter to add a responsibility (at least one required)
          </div>
          {formData.responsibilities.length === 0 && (
            <div className="mt-2">
              <div className="text-xs text-gray-400 mb-1">
                Example: "Manage recruitment process", "Handle employee relations"
              </div>
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    responsibilities: [...prev.responsibilities, "Manage full recruitment cycle", "Coordinate with department heads for staffing needs"]
                  }));
                }}
                className="text-xs"
                style={{ color: 'var(--color-accent)' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                Add sample responsibilities
              </button>
            </div>
          )}
        </div>
        {formData.responsibilities.length > 0 ? (
          <div className="mt-2 space-y-2">
            {formData.responsibilities.map((resp, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="text-sm">{resp}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveResponsibility(resp)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-700 text-sm">
            Please add at least one responsibility
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Job Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows="5"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
          style={{ 
            '--tw-ring-color': 'var(--color-accent)',
            '--tw-border-opacity': '1'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          placeholder="Describe the job in detail"
        ></textarea>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handlePrevious}
          className="w-1/3 text-white py-3 px-4 rounded-md hover:opacity-90 font-semibold"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          Previous
        </button>
        <button
          type="submit"
          disabled={loading || !isStep2Valid}
          className={`w-1/2 py-3 px-4 rounded-md font-semibold ${
            !loading && isStep2Valid 
              ? "text-white hover:opacity-90" 
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          } ${loading ? "opacity-50" : ""}`}
          style={!loading && isStep2Valid ? { backgroundColor: 'var(--color-accent)' } : {}}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </div>
    </>
  );
};

export default RequirementsForm;