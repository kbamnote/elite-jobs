import React, { useState } from "react";
import JobHostingSidebar from "../commonHost/jobHostingSidebar";

const PostJob = () => {
  const [step, setStep] = useState(1);
  const [skillInput, setSkillInput] = useState("");
  const [formData, setFormData] = useState({
    profileImg: null,
    fullName: "John Doe",
    title: "",
    experience: "",
    minEducation: "",
    companyName: "",
    numOfEmployee: "",
    companyURL: "",
    companyEmail: "",
    phoneNo: "",
    jobType: "",
    jobDescription: "",
    workType: "",
    interviewType: "",
    companyDescription: "",
    minPackage: "",
    maxPackage: "",
    skills: [],
    noOfOpeaning: "",
    location: "",
    subcategories: "",
    categoryTitle: "",
  });

  // Static categories for design-only mode
  const categories = [
    { _id: "1", title: "Technology" },
    { _id: "2", title: "Marketing" },
    { _id: "3", title: "Sales" },
    { _id: "4", title: "Design" },
    { _id: "5", title: "Finance" },
  ];

  const availableSubcategories = [
    { title: "Frontend Development" },
    { title: "Backend Development" },
    { title: "Full Stack Development" },
    { title: "Mobile Development" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === "file") {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else if (name === "skills") {
      setSkillInput(value);
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

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePostJob = (e) => {
    e.preventDefault();
    // Static implementation - just show success message
    alert("Job posted successfully! (Static mode)");
    console.log("Form data:", formData);
  };

  const renderCompanyForm = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            placeholder="Enter company name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Provider Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            placeholder="Enter your full name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Email
          </label>
          <input
            type="email"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            placeholder="Enter company email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            placeholder="Enter phone number"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company URL
        </label>
        <input
          type="url"
          name="companyURL"
          value={formData.companyURL}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          placeholder="Enter company website URL"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Employees
          </label>
          <input
            type="number"
            name="numOfEmployee"
            value={formData.numOfEmployee}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            placeholder="Enter employee count"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company Description
        </label>
        <textarea
          name="companyDescription"
          value={formData.companyDescription}
          onChange={handleInputChange}
          rows="5"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          placeholder="Describe your company"
        ></textarea>
      </div>

      <div className="w-full flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          className="w-1/3 bg-teal-500 text-white py-3 px-4 rounded-md hover:opacity-90 font-semibold"
        >
          Next
        </button>
      </div>
    </>
  );

  const renderJobDetailsForm = () => (
    <>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          Job Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          placeholder="Enter job title"
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          Number of Openings
        </label>
        <input
          type="number"
          name="noOfOpeaning"
          value={formData.noOfOpeaning}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          placeholder="Enter number of positions"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="categoryTitle"
            value={formData.categoryTitle}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {formData.categoryTitle && (
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Subcategory
            </label>
            <select
              name="subcategories"
              value={formData.subcategories}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            >
              <option value="">Select Subcategory</option>
              {availableSubcategories.map((subcat, index) => (
                <option key={index} value={subcat.title}>
                  {subcat.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          Job Type
        </label>
        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
        >
          <option value="">Select Job Type</option>
          <option value="Full-Time">Full Time</option>
          <option value="Part-Time">Part Time</option>
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          placeholder="Enter job location"
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handlePrevious}
          className="w-1/3 bg-gradient-to-r from-teal-700 to-teal-700 text-white py-3 px-4 rounded-md hover:opacity-90 font-semibold"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="w-1/2 bg-gradient-to-r from-teal-500 to-teal-500 text-white py-3 px-4 rounded-md hover:opacity-90 font-semibold"
        >
          Next
        </button>
      </div>
    </>
  );

  const renderRequirementsForm = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Minimum Package
          </label>
          <input
            type="text"
            name="minPackage"
            value={formData.minPackage}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            placeholder="Enter minimum package eg: 3LPA"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Maximum Package
          </label>
          <input
            type="text"
            name="maxPackage"
            value={formData.maxPackage}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            placeholder="Enter maximum package eg: 5LPA"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Interview Type
          </label>
          <select
            name="interviewType"
            value={formData.interviewType}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          >
            <option value="">Select Interview Type</option>
            <option value="Online">Online</option>
            <option value="Walk-In">Walk In</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Experience Level
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          >
            <option value="">Select experience level</option>
            <option value="Fresher">Fresher</option>
            <option value="1 to 3 years">1 to 3 years</option>
            <option value="3 to 5 years">3 to 5 years</option>
            <option value="more than 5 years">more than 5 years</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Work Type
          </label>
          <select
            name="workType"
            value={formData.workType}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          >
            <option value="">Select Work Type</option>
            <option value="Remote">Remote</option>
            <option value="OnSite">On-Site</option>
            <option value="Hybrid">Hybrid</option>
          </select>
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            placeholder="Enter minimum education required"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Required Skills
        </label>
        <div className="">
          <input
            type="text"
            name="skills"
            value={skillInput}
            onChange={handleInputChange}
            onKeyDown={handleSkillInputKeyDown}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
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
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-1 inline-flex items-center justify-center w-4 h-4 text-teal-400 hover:bg-teal-200 hover:text-teal-500 rounded-full"
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
          Job Description
        </label>
        <textarea
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleInputChange}
          rows="5"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          placeholder="Describe the job requirements and responsibilities"
        ></textarea>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handlePrevious}
          className="w-1/3 bg-gradient-to-r from-teal-700 to-teal-700 text-white py-3 px-4 rounded-md hover:opacity-90 font-semibold"
        >
          Previous
        </button>
        <button
          type="submit"
          onClick={handlePostJob}
          className="w-1/2 bg-gradient-to-r from-teal-500 to-teal-500 text-white py-3 px-4 rounded-md hover:opacity-90 font-semibold"
        >
          Submit
        </button>
      </div>
    </>
  );

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
                <div className={`flex items-center ${step >= 1 ? 'text-teal-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-300'}`}>
                    1
                  </div>
                  <span className="ml-2">Company Details</span>
                </div>
                <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-teal-600' : 'bg-gray-300'}`}></div>
                <div className={`flex items-center ${step >= 2 ? 'text-teal-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-300'}`}>
                    2
                  </div>
                  <span className="ml-2">Job Details</span>
                </div>
                <div className={`w-8 h-0.5 ${step >= 3 ? 'bg-teal-600' : 'bg-gray-300'}`}></div>
                <div className={`flex items-center ${step >= 3 ? 'text-teal-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-teal-600 text-white' : 'bg-gray-300'}`}>
                    3
                  </div>
                  <span className="ml-2">Requirements</span>
                </div>
              </div>
            </div>

            <form className="space-y-6">
              {step === 1 && renderCompanyForm()}
              {step === 2 && renderJobDetailsForm()}
              {step === 3 && renderRequirementsForm()}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostJob;