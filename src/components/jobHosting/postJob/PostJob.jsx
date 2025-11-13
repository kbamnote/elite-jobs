import React, { useState } from "react";
import JobHostingSidebar from "../commonHost/jobHostingSidebar";
import { createJob } from "../../../utils/Api";
import JobDetailsForm from "./components/JobDetailsForm";
import RequirementsForm from "./components/RequirementsForm";

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
    location: [], // Changed to array for multiple locations
    jobType: "", // Full-time, Part-time
    interviewType: "", // Online, On-site, Walk-in
    workType: "", // Remote, On-site, Hybrid
    minEducation: "",
    salary: {
      min: "",
      max: "",
      currency: "INR" // Changed default to INR
    },
    // Add display values for salary inputs
    salaryDisplay: {
      min: "",
      max: ""
    },
    requirements: [],
    responsibilities: [],
    skills: [],
    experienceLevel: "",
    applicationDeadline: "",
    category: "",
    noticePeriod: "", // Required field
    numberOfOpenings: "", // New field
    yearOfPassing: "", // New field
    shift: "", // New field
    walkInDate: "", // Conditional field for Walk-in
    walkInTime: "" // Conditional field for Walk-in
  });

  const jobTypeOptions = ['Full-time', 'Part-time'];
  const interviewTypeOptions = ['Online', 'On-site', 'Walk-in'];
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

  // Handle multiple locations like skills
  const [locationInput, setLocationInput] = useState("");

  const handleLocationInputKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addLocation();
    }
  };

  const addLocation = () => {
    const location = locationInput.trim();
    if (location && !formData.location.includes(location)) {
      setFormData(prev => ({
        ...prev,
        location: [...prev.location, location]
      }));
      setLocationInput("");
    }
  };

  const handleRemoveLocation = (locationToRemove) => {
    setFormData(prev => ({
      ...prev,
      location: prev.location.filter(loc => loc !== locationToRemove)
    }));
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
      
      // Validate required fields
      const requiredFields = [
        { field: currentFormData.title, name: "Job Title" },
        { field: currentFormData.description, name: "Job Description" },
        { field: currentFormData.location.length > 0, name: "Location" }, // Check if location array has items
        { field: currentFormData.interviewType, name: "Interview Type" },
        { field: currentFormData.workType, name: "Work Type" },
        { field: currentFormData.experienceLevel, name: "Experience Level" },
        { field: currentFormData.category, name: "Category" },
        { field: currentFormData.noticePeriod, name: "Notice Period" }
      ];
      
      const missingFields = requiredFields.filter(item => !item.field || (typeof item.field === 'string' && item.field.toString().trim() === ''));
      
      if (missingFields.length > 0) {
        const missingFieldNames = missingFields.map(item => item.name).join(', ');
        throw new Error(`Please fill all required fields: ${missingFieldNames}`);
      }
      
      // Additional validation for Walk-in interview type
      if (currentFormData.interviewType === 'Walk-in') {
        if (!currentFormData.walkInDate) {
          throw new Error('Walk-in Date is required for Walk-in interview type');
        }
        if (!currentFormData.walkInTime) {
          throw new Error('Walk-in Time is required for Walk-in interview type');
        }
      }
      
      // Validate that requirements and responsibilities are not empty
      if (currentFormData.requirements.length === 0) {
        throw new Error("Please add at least one job requirement");
      }
      
      if (currentFormData.responsibilities.length === 0) {
        throw new Error("Please add at least one job responsibility");
      }
      
      // Function to parse salary input (supports 10000, 10,000, 10k formats)
      const parseSalaryInput = (value) => {
        if (!value) return undefined;
        
        // Remove commas and 'k' suffix, then convert to number
        const cleanValue = value.toString()
          .replace(/,/g, '') // Remove commas
          .replace(/k$/i, '000') // Replace 'k' with '000'
          .trim();
        
        // Check if it's a valid number
        const numValue = parseInt(cleanValue, 10);
        return isNaN(numValue) ? undefined : numValue;
      };
      
      // Function to parse year of passing input
      const parseYearOfPassingInput = (value) => {
        if (!value) return undefined;
        return value.toString().trim();
      };
      
      // Validate salary range if provided
      const minSalary = parseSalaryInput(currentFormData.salary.min);
      const maxSalary = parseSalaryInput(currentFormData.salary.max);
      
      if ((currentFormData.salary.min || currentFormData.salary.max)) {
        if ((minSalary === undefined && currentFormData.salary.min) || 
            (maxSalary === undefined && currentFormData.salary.max)) {
          throw new Error("Salary values must be valid numbers (e.g., 10000, 10,000, or 10k)");
        }
        
        if (minSalary !== undefined && maxSalary !== undefined) {
          if (minSalary <= 0 || maxSalary <= 0) {
            throw new Error("Salary values must be positive numbers");
          }
          
          if (minSalary >= maxSalary) {
            throw new Error("Maximum salary must be greater than minimum salary");
          }
        }
      }
      
      // Prepare data for API - match exact backend model
      const jobData = {
        title: currentFormData.title.trim(),
        description: currentFormData.description.trim(),
        location: currentFormData.location, // Now an array
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
        noticePeriod: currentFormData.noticePeriod,
        // New fields
        numberOfOpenings: currentFormData.numberOfOpenings ? parseInt(currentFormData.numberOfOpenings) : undefined,
        yearOfPassing: parseYearOfPassingInput(currentFormData.yearOfPassing),
        shift: currentFormData.shift || undefined,
        // Conditional fields for Walk-in
        ...(currentFormData.interviewType === 'Walk-in' && {
          walkInDate: currentFormData.walkInDate,
          walkInTime: currentFormData.walkInTime
        })
        // Note: company info will be added by backend from user profile
      };
      
      console.log("Sending job data:", jobData);
      await createJob(jobData);
      setMessage("Job posted successfully!");
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        location: [],
        jobType: "",
        interviewType: "",
        workType: "",
        minEducation: "",
        salary: {
          min: "",
          max: "",
          currency: "INR"
        },
        salaryDisplay: {
          min: "",
          max: ""
        },
        requirements: [],
        responsibilities: [],
        skills: [],
        experienceLevel: "",
        applicationDeadline: "",
        category: "",
        noticePeriod: "",
        numberOfOpenings: "",
        yearOfPassing: "",
        shift: "",
        walkInDate: "",
        walkInTime: ""
      });
      
      // Reset input fields
      setSkillInput("");
      setRequirementInput("");
      setResponsibilityInput("");
      setLocationInput("");
      
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
          !errorMessage.includes("Maximum salary must be greater") &&
          !errorMessage.includes("Salary values must be valid numbers")) {
        console.error("Response data:", err.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderJobDetailsForm = () => {
    // Check if all required fields in step 1 are filled
    // Based on backend schema, required fields are: title, category, interviewType, workType, experienceLevel, noticePeriod
    const isStep1Valid = formData.title.trim() !== "" && 
                         formData.category !== "" && 
                         formData.interviewType !== "" && 
                         formData.workType !== "" && 
                         formData.experienceLevel !== "" && 
                         formData.location.length > 0; // Check if location array has items

    return (
      <JobDetailsForm 
        formData={formData}
        handleInputChange={handleInputChange}
        categoryOptions={categoryOptions}
        jobTypeOptions={jobTypeOptions}
        experienceLevelOptions={experienceLevelOptions}
        interviewTypeOptions={interviewTypeOptions}
        workTypeOptions={workTypeOptions}
        locationInput={locationInput}
        setLocationInput={setLocationInput}
        handleLocationInputKeyDown={handleLocationInputKeyDown}
        addLocation={addLocation}
        handleRemoveLocation={handleRemoveLocation}
        isStep1Valid={isStep1Valid}
        handleNext={handleNext}
      />
    );
  };

  const renderRequirementsForm = () => {
    // Check if all required fields in step 2 are filled
    // Based on backend schema, required fields are: description, requirements, responsibilities, noticePeriod
    const isStep2Valid = formData.description.trim() !== "" && 
                         formData.requirements.length > 0 && 
                         formData.responsibilities.length > 0 && 
                         formData.noticePeriod !== "";

    return (
      <RequirementsForm
        formData={formData}
        handleInputChange={handleInputChange}
        setFormData={setFormData}
        skillInput={skillInput}
        setSkillInput={setSkillInput}
        handleSkillInputKeyDown={handleSkillInputKeyDown}
        addSkill={addSkill}
        handleRemoveSkill={handleRemoveSkill}
        requirementInput={requirementInput}
        setRequirementInput={setRequirementInput}
        handleRequirementInputKeyDown={handleRequirementInputKeyDown}
        addRequirement={addRequirement}
        handleRemoveRequirement={handleRemoveRequirement}
        responsibilityInput={responsibilityInput}
        setResponsibilityInput={setResponsibilityInput}
        handleResponsibilityInputKeyDown={handleResponsibilityInputKeyDown}
        addResponsibility={addResponsibility}
        handleRemoveResponsibility={handleRemoveResponsibility}
        isStep2Valid={isStep2Valid}
        handlePrevious={handlePrevious}
        loading={loading}
        handlePostJob={handlePostJob}
      />
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