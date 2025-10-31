import React, { useState } from "react";
import JobHostingSidebar from "../commonHost/jobHostingSidebar";
import { createJob } from "../../../utils/Api";

const PostJob = () => {
  const [step, setStep] = useState(1);
  const [skillInput, setSkillInput] = useState("");
  const [requirementInput, setRequirementInput] = useState("");
  const [responsibilityInput, setResponsibilityInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "", // Full-time, Part-time
    interviewType: "", // Online, On-site
    workType: "", // Remote, On-site, Hybrid
    minEducation: "",
    salary: {
      min: "",
      max: "",
      currency: "USD"
    },
    requirements: [],
    responsibilities: [],
    skills: [],
    experienceLevel: "",
    applicationDeadline: "",
    category: "",
    noticePeriod: "" // Added noticePeriod field
  });

  const jobTypeOptions = ['Full-time', 'Part-time'];
  const interviewTypeOptions = ['Online', 'On-site'];
  const workTypeOptions = ['Remote', 'On-site', 'Hybrid'];
  const categoryOptions = ["IT & Networking", "Sales & Marketing", "Accounting", "Data Science", "Digital Marketing", "Human Resource", "Customer Service", "Project Manager", "Other"];
  const experienceLevelOptions = ['Fresher', '0-1 year of experience', '1-2 year of experience', '2-4 year of experience', '5+ year of experience'];
  const noticePeriodOptions = ['Immediate Joiner', 'Upto 1 week', 'Upto 1 month', 'Upto 2 month', 'Any']; // Added noticePeriod options

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested salary fields
    if (name.startsWith("salary.")) {
      const salaryField = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        salary: {
          ...prev.salary,
          [salaryField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSkillInputKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill();
    }
  };

  const addSkill = () => {
    const skill = skillInput.trim();
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleRequirementInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addRequirement();
    }
  };

  const addRequirement = () => {
    const requirement = requirementInput.trim();
    if (requirement && !formData.requirements.includes(requirement)) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, requirement]
      }));
      setRequirementInput("");
    } else if (requirement) {
      // Requirement already exists
      setError("This requirement already exists");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleRemoveRequirement = (reqToRemove) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter(req => req !== reqToRemove)
    }));
  };

  const handleResponsibilityInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addResponsibility();
    }
  };

  const addResponsibility = () => {
    const responsibility = responsibilityInput.trim();
    if (responsibility && !formData.responsibilities.includes(responsibility)) {
      setFormData(prev => ({
        ...prev,
        responsibilities: [...prev.responsibilities, responsibility]
      }));
      setResponsibilityInput("");
    } else if (responsibility) {
      // Responsibility already exists
      setError("This responsibility already exists");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleRemoveResponsibility = (respToRemove) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter(resp => resp !== respToRemove)
    }));
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    
    try {
      // Auto-add any remaining text in requirement and responsibility inputs
      let updatedFormData = { ...formData };
      
      if (requirementInput.trim()) {
        const newRequirement = requirementInput.trim();
        if (!updatedFormData.requirements.includes(newRequirement)) {
          updatedFormData = {
            ...updatedFormData,
            requirements: [...updatedFormData.requirements, newRequirement]
          };
        }
      }
      
      if (responsibilityInput.trim()) {
        const newResponsibility = responsibilityInput.trim();
        if (!updatedFormData.responsibilities.includes(newResponsibility)) {
          updatedFormData = {
            ...updatedFormData,
            responsibilities: [...updatedFormData.responsibilities, newResponsibility]
          };
        }
      }
      
      // Use the updated form data directly instead of relying on state
      const currentFormData = updatedFormData;
      
      // Log the noticePeriod value for debugging
      console.log("Notice Period Value:", currentFormData.noticePeriod);
      console.log("Notice Period Type:", typeof currentFormData.noticePeriod);
      console.log("Is Notice Period Empty:", currentFormData.noticePeriod === "");
      
      // Validate required fields
      const requiredFields = [
        { field: currentFormData.title, name: "Job Title" },
        { field: currentFormData.description, name: "Job Description" },
        { field: currentFormData.location, name: "Location" },
        { field: currentFormData.jobType, name: "Job Type" },
        { field: currentFormData.interviewType, name: "Interview Type" },
        { field: currentFormData.workType, name: "Work Type" },
        { field: currentFormData.minEducation, name: "Minimum Education" },
        { field: currentFormData.experienceLevel, name: "Experience Level" },
        { field: currentFormData.category, name: "Category" },
        { field: currentFormData.applicationDeadline, name: "Application Deadline" },
        { field: currentFormData.salary.min, name: "Minimum Salary" },
        { field: currentFormData.salary.max, name: "Maximum Salary" },
        { field: currentFormData.noticePeriod, name: "Notice Period" }
      ];
      
      const missingFields = requiredFields.filter(item => !item.field || item.field.toString().trim() === '');
      
      if (missingFields.length > 0) {
        const missingFieldNames = missingFields.map(item => item.name).join(', ');
        throw new Error(`Please fill all required fields: ${missingFieldNames}`);
      }
      
      // Validate that requirements and responsibilities are not empty
      if (currentFormData.requirements.length === 0) {
        throw new Error("Please add at least one job requirement");
      }
      
      if (currentFormData.responsibilities.length === 0) {
        throw new Error("Please add at least one job responsibility");
      }
      
      // Validate salary range
      const minSalary = parseInt(currentFormData.salary.min);
      const maxSalary = parseInt(currentFormData.salary.max);
      
      if (isNaN(minSalary) || isNaN(maxSalary) || minSalary <= 0 || maxSalary <= 0) {
        throw new Error("Salary values must be positive numbers");
      }
      
      if (minSalary >= maxSalary) {
        throw new Error("Maximum salary must be greater than minimum salary");
      }
      
      // Prepare data for API - match exact backend model
      const jobData = {
        title: currentFormData.title.trim(),
        description: currentFormData.description.trim(),
        location: currentFormData.location.trim(),
        jobType: currentFormData.jobType,
        interviewType: currentFormData.interviewType,
        workType: currentFormData.workType,
        minEducation: currentFormData.minEducation.trim(),
        salary: {
          min: minSalary,
          max: maxSalary,
          currency: currentFormData.salary.currency
        },
        requirements: currentFormData.requirements,
        responsibilities: currentFormData.responsibilities,
        skills: currentFormData.skills,
        experienceLevel: currentFormData.experienceLevel,
        applicationDeadline: currentFormData.applicationDeadline,
        category: currentFormData.category,
        noticePeriod: currentFormData.noticePeriod
        // Note: company info will be added by backend from user profile
      };
      
      console.log("Sending job data:", jobData);
      await createJob(jobData);
      setMessage("Job posted successfully!");
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        location: "",
        jobType: "",
        interviewType: "",
        workType: "",
        minEducation: "",
        salary: {
          min: "",
          max: "",
          currency: "USD"
        },
        requirements: [],
        responsibilities: [],
        skills: [],
        experienceLevel: "",
        applicationDeadline: "",
        category: "",
        noticePeriod: ""
      });
      
      // Reset input fields
      setSkillInput("");
      setRequirementInput("");
      setResponsibilityInput("");
      
      // Reset to first step
      setStep(1);
    } catch (err) {
      const errorMessage = err.message || "Failed to post job";
      setError(errorMessage);
      console.error("Error posting job:", err);
      // Don't log response data if it's a local validation error
      if (!errorMessage.includes("Please add at least one") && 
          !errorMessage.includes("Please fill all required fields") &&
          !errorMessage.includes("Salary values must be positive") &&
          !errorMessage.includes("Maximum salary must be greater")) {
        console.error("Response data:", err.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderJobDetailsForm = () => {
    // Check if all required fields in step 1 are filled
    const isStep1Valid = formData.title.trim() !== "" && 
                         formData.category !== "" && 
                         formData.jobType !== "" && 
                         formData.experienceLevel !== "" && 
                         formData.location.trim() !== "" && 
                         formData.applicationDeadline !== "" && 
                         formData.interviewType !== "" && 
                         formData.workType !== "" && 
                         formData.minEducation.trim() !== "";

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
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Type *
            </label>
            <select
              name="jobType"
              value={formData.jobType}
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
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
              style={{ 
                '--tw-ring-color': 'var(--color-accent)',
                '--tw-border-opacity': '1'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              placeholder="Enter job location"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Application Deadline *
            </label>
            <input
              type="date"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleInputChange}
              required
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
            Minimum Education *
          </label>
          <input
            type="text"
            name="minEducation"
            value={formData.minEducation}
            onChange={handleInputChange}
            required
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

  const renderRequirementsForm = () => {
    // Check if all required fields in step 2 are filled
    const isStep2Valid = formData.salary.min !== "" && 
                         formData.salary.max !== "" && 
                         !isNaN(formData.salary.min) && 
                         !isNaN(formData.salary.max) &&
                         parseInt(formData.salary.min) > 0 && 
                         parseInt(formData.salary.max) > 0 &&
                         parseInt(formData.salary.min) < parseInt(formData.salary.max) &&
                         formData.noticePeriod !== "" && 
                         formData.requirements.length > 0 && 
                         formData.responsibilities.length > 0 && 
                         formData.description.trim() !== "";

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Minimum Salary *
            </label>
            <input
              type="number"
              name="salary.min"
              value={formData.salary.min}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
              style={{ 
                '--tw-ring-color': 'var(--color-accent)',
                '--tw-border-opacity': '1'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              placeholder="Enter minimum salary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Maximum Salary *
            </label>
            <input
              type="number"
              name="salary.max"
              value={formData.salary.max}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
              style={{ 
                '--tw-ring-color': 'var(--color-accent)',
                '--tw-border-opacity': '1'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              placeholder="Enter maximum salary"
            />
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

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Notice Period *
          </label>
          <select
            name="noticePeriod"
            value={formData.noticePeriod}
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
            <option value="">Select Notice Period</option>
            {noticePeriodOptions.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>
        </div>

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

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Sidebar */}
      <div className="w-[10px] lg:w-1/4 h-screen fixed top-0 left-0 z-50">
        <JobHostingSidebar />
      </div>
      
      {/* Main Content */}
      <main className="w-full lg:ml-80 xl:ml-80 p-3 sm:p-4 lg:p-6 xl:p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a Job</h1>
              <div className="flex items-center space-x-4">
                <div className={`flex items-center ${step >= 1 ? 'text-gray-400' : 'text-gray-400'}`}
                     style={step >= 1 ? { color: 'var(--color-accent)' } : {}}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'text-white' : 'bg-gray-300'}`}
                       style={step >= 1 ? { backgroundColor: 'var(--color-accent)' } : {}}>
                    1
                  </div>
                  <span className="ml-2">Job Details</span>
                </div>
                <div className={`w-8 h-0.5 ${step >= 2 ? '' : 'bg-gray-300'}`}
                     style={step >= 2 ? { backgroundColor: 'var(--color-accent)' } : {}}></div>
                <div className={`flex items-center ${step >= 2 ? 'text-gray-400' : 'text-gray-400'}`}
                     style={step >= 2 ? { color: 'var(--color-accent)' } : {}}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'text-white' : 'bg-gray-300'}`}
                       style={step >= 2 ? { backgroundColor: 'var(--color-accent)' } : {}}>
                    2
                  </div>
                  <span className="ml-2">Requirements</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            {message && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg">{message}</div>}
            {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">{error}</div>}

            <form className="space-y-6" onSubmit={handlePostJob}>
              {step === 1 && renderJobDetailsForm()}
              {step === 2 && renderRequirementsForm()}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostJob;