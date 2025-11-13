import React, { useState } from "react";
import Header from "../../commonSeeker/Header";
import Footer from "../../commonSeeker/Footer";

const AiResume = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    address: "",
    
    // Education
    education: [{ degree: "", institution: "", year: "", gpa: "" }],
    
    // Work Experience
    experience: [{ company: "", position: "", duration: "", description: "" }],
    
    // Skills
    skills: "",
  });

  const handleInputChange = (e, section, index = null) => {
    const { name, value } = e.target;
    
    if (section && index !== null) {
      setFormData(prev => ({
        ...prev,
        [section]: prev[section].map((item, i) => 
          i === index ? { ...item, [name]: value } : item
        )
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addSection = (section) => {
    const newItem = section === 'education' 
      ? { degree: "", institution: "", year: "", gpa: "" }
      : { company: "", position: "", duration: "", description: "" };
    
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeSection = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(4, prev + 1));
  const prevStep = () => setCurrentStep(prev => Math.max(1, prev - 1));

  const generateResume = () => {
    alert("Resume generation is disabled in UI-only mode. This would normally create a PDF.");
  };

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => handleInputChange(e)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2"
          style={{ fontFamily: 'var(--font-body)' }}
          onFocus={(e) => {
            e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
            e.target.style.borderColor = 'var(--color-accent)';
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = '';
            e.target.style.borderColor = '';
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleInputChange(e)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2"
          style={{ fontFamily: 'var(--font-body)' }}
          onFocus={(e) => {
            e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
            e.target.style.borderColor = 'var(--color-accent)';
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = '';
            e.target.style.borderColor = '';
          }}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => handleInputChange(e)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2"
          style={{ fontFamily: 'var(--font-body)' }}
          onFocus={(e) => {
            e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
            e.target.style.borderColor = 'var(--color-accent)';
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = '';
            e.target.style.borderColor = '';
          }}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={(e) => handleInputChange(e)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2"
          style={{ fontFamily: 'var(--font-body)' }}
          onFocus={(e) => {
            e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
            e.target.style.borderColor = 'var(--color-accent)';
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = '';
            e.target.style.borderColor = '';
          }}
        />
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Education</h2>
        <button
          onClick={() => addSection('education')}
          className="px-4 py-2 btn-accent text-white rounded-lg"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Add Education
        </button>
      </div>
      {formData.education.map((edu, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => handleInputChange(e, 'education', index)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
              style={{ fontFamily: 'var(--font-body)' }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                e.target.style.borderColor = 'var(--color-accent)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = '';
                e.target.style.borderColor = '';
              }}
            />
            <input
              type="text"
              name="institution"
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) => handleInputChange(e, 'education', index)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
              style={{ fontFamily: 'var(--font-body)' }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                e.target.style.borderColor = 'var(--color-accent)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = '';
                e.target.style.borderColor = '';
              }}
            />
            <input
              type="text"
              name="year"
              placeholder="Year"
              value={edu.year}
              onChange={(e) => handleInputChange(e, 'education', index)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
              style={{ fontFamily: 'var(--font-body)' }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                e.target.style.borderColor = 'var(--color-accent)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = '';
                e.target.style.borderColor = '';
              }}
            />
            <input
              type="text"
              name="gpa"
              placeholder="GPA"
              value={edu.gpa}
              onChange={(e) => handleInputChange(e, 'education', index)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
              style={{ fontFamily: 'var(--font-body)' }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                e.target.style.borderColor = 'var(--color-accent)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = '';
                e.target.style.borderColor = '';
              }}
            />
          </div>
          {formData.education.length > 1 && (
            <button
              onClick={() => removeSection('education', index)}
              className="mt-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
        <button
          onClick={() => addSection('experience')}
          className="px-4 py-2 btn-accent text-white rounded-lg"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Add Experience
        </button>
      </div>
      {formData.experience.map((exp, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => handleInputChange(e, 'experience', index)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
              style={{ fontFamily: 'var(--font-body)' }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                e.target.style.borderColor = 'var(--color-accent)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = '';
                e.target.style.borderColor = '';
              }}
            />
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={exp.position}
              onChange={(e) => handleInputChange(e, 'experience', index)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
              style={{ fontFamily: 'var(--font-body)' }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                e.target.style.borderColor = 'var(--color-accent)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = '';
                e.target.style.borderColor = '';
              }}
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={exp.duration}
              onChange={(e) => handleInputChange(e, 'experience', index)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
              style={{ fontFamily: 'var(--font-body)' }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                e.target.style.borderColor = 'var(--color-accent)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = '';
                e.target.style.borderColor = '';
              }}
            />
          </div>
          <textarea
            name="description"
            placeholder="Job Description"
            value={exp.description}
            onChange={(e) => handleInputChange(e, 'experience', index)}
            rows={3}
            className="w-full mt-4 border border-gray-200 rounded-lg px-3 py-2"
            style={{ fontFamily: 'var(--font-body)' }}
            onFocus={(e) => {
              e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
              e.target.style.borderColor = 'var(--color-accent)';
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = '';
              e.target.style.borderColor = '';
            }}
          />
          {formData.experience.length > 1 && (
            <button
              onClick={() => removeSection('experience', index)}
              className="mt-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
      <textarea
        name="skills"
        placeholder="Enter your skills separated by commas (e.g., React, Node.js, Python)"
        value={formData.skills}
        onChange={(e) => handleInputChange(e)}
        rows={4}
        className="w-full border border-gray-200 rounded-lg px-3 py-2"
        style={{ fontFamily: 'var(--font-body)' }}
        onFocus={(e) => {
          e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
          e.target.style.borderColor = 'var(--color-accent)';
        }}
        onBlur={(e) => {
          e.target.style.boxShadow = '';
          e.target.style.borderColor = '';
        }}
      />
    </div>
  );

  const renderPreview = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Resume Preview</h2>
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{formData.fullName || "Your Name"}</h1>
          <p className="text-gray-600">{formData.email} | {formData.phone}</p>
          <p className="text-gray-600">{formData.address}</p>
        </div>
        
        {formData.education.some(edu => edu.degree) && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Education</h3>
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-2">
                <p className="font-medium">{edu.degree} - {edu.institution}</p>
                <p className="text-gray-600">{edu.year} {edu.gpa && `| GPA: ${edu.gpa}`}</p>
              </div>
            ))}
          </div>
        )}
        
        {formData.experience.some(exp => exp.company) && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Experience</h3>
            {formData.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{exp.position} - {exp.company}</p>
                <p className="text-gray-600">{exp.duration}</p>
                <p className="text-gray-700 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        )}
        
        {formData.skills && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Skills</h3>
            <p className="text-gray-700">{formData.skills}</p>
          </div>
        )}
      </div>
      
      <button
        onClick={generateResume}
        className="w-full py-3 btn-accent text-white rounded-lg font-medium"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        Generate PDF Resume
      </button>
    </div>
  );

  const steps = [
    { number: 1, title: "Personal Info", component: renderPersonalInfo },
    { number: 2, title: "Education", component: renderEducation },
    { number: 3, title: "Experience", component: renderExperience },
    { number: 4, title: "Skills & Preview", component: currentStep === 4 ? renderPreview : renderSkills },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
  
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">AI Resume Builder</h1>
            <p className="text-gray-600">Create a professional resume in minutes. Design-only; no PDF generation.</p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.number 
                      ? 'text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}
                  style={currentStep >= step.number ? {
                    backgroundColor: 'var(--color-accent)',
                    fontFamily: 'var(--font-body)'
                  } : { fontFamily: 'var(--font-body)' }}
                >
                  {step.number}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>{step.title}</span>
                {index < steps.length - 1 && (
                  <div 
                    className={`w-12 h-0.5 mx-4 ${
                      currentStep > step.number ? '' : 'bg-gray-200'
                    }`}
                    style={currentStep > step.number ? { backgroundColor: 'var(--color-accent)' } : {}}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Current Step Content */}
          <div className="mb-8">
            {steps[currentStep - 1].component()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              disabled={currentStep === 4}
              className="px-6 py-2 btn-accent text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {currentStep === 4 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AiResume;