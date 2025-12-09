import React from "react";

const JobDetailsForm = ({ 
  formData, 
  handleInputChange, 
  categoryOptions, 
  jobTypeOptions, 
  experienceLevelOptions,
  interviewTypeOptions,
  workTypeOptions,
  locationInput,
  setLocationInput,
  handleLocationInputKeyDown,
  addLocation,
  handleRemoveLocation,
  isStep1Valid,
  handleNext,
  categoriesLoading
}) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
            style={{ 
              '--tw-ring-color': 'var(--color-accent)',
              '--tw-border-opacity': '1'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            placeholder="Enter job title"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category *
          </label>
          {categoriesLoading ? (
            <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm bg-gray-100 animate-pulse">
              Loading categories...
            </div>
          ) : (
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
              style={{ 
                '--tw-ring-color': 'var(--color-accent)',
                '--tw-border-opacity': '1'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            >
              <option value="">Select Category</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Type
          </label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
            style={{ 
              '--tw-ring-color': 'var(--color-accent)',
              '--tw-border-opacity': '1'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          >
            <option value="">Select Job Type</option>
            {jobTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Experience Level *
          </label>
          <select
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
            style={{ 
              '--tw-ring-color': 'var(--color-accent)',
              '--tw-border-opacity': '1'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          >
            <option value="">Select Experience Level</option>
            {experienceLevelOptions.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Locations *
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              onKeyDown={handleLocationInputKeyDown}
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
              style={{ 
                '--tw-ring-color': 'var(--color-accent)',
                '--tw-border-opacity': '1'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              placeholder="Type a location and press Enter or comma to add"
            />
            <div className="mt-2 text-xs text-gray-500">
              Press Enter or comma (,) to add a location
            </div>
          </div>
          {formData.location.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.location.map((loc, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  style={{ backgroundColor: '#fef2f2', color: 'var(--color-accent)' }}
                >
                  {loc}
                  <button
                    type="button"
                    onClick={() => handleRemoveLocation(loc)}
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
            Application Deadline
          </label>
          <input
            type="date"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleInputChange}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Interview Type *
          </label>
          <select
            name="interviewType"
            value={formData.interviewType}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
            style={{ 
              '--tw-ring-color': 'var(--color-accent)',
              '--tw-border-opacity': '1'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          >
            <option value="">Select Interview Type</option>
            {interviewTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Work Type *
          </label>
          <select
            name="workType"
            value={formData.workType}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
            style={{ 
              '--tw-ring-color': 'var(--color-accent)',
              '--tw-border-opacity': '1'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          >
            <option value="">Select Work Type</option>
            {workTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Minimum Education
        </label>
        <input
          type="text"
          name="minEducation"
          value={formData.minEducation}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
          style={{ 
            '--tw-ring-color': 'var(--color-accent)',
            '--tw-border-opacity': '1'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          placeholder="Enter minimum education required"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          disabled={!isStep1Valid}
          className={`w-1/2 py-3 px-4 rounded-md font-semibold ${
            isStep1Valid 
              ? "text-white hover:opacity-90" 
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          style={isStep1Valid ? { backgroundColor: 'var(--color-accent)' } : {}}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default JobDetailsForm;