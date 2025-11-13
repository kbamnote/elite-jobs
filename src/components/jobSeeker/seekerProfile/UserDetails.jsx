import React, { useState, useEffect } from "react";
import Header from "../commonSeeker/Header";
import Footer from "../commonSeeker/Footer";
import { profile, updateProfile } from "../../../utils/Api";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    age: "",
    gender: "",
    githubUrl: "",
    linkedinUrl: "",
    designation: "",
    noticePeriod: "",
    preferredLocation: "",
    expInWork: "",
    salaryExpectation: "",
    preferredCategory: "",
    highestEducation: "",
    skills: [],
    education: [],
    experience: [],
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await profile();
      const data = response.data.data;
      
      setFormData({
        name: data.name,
        email: data.email,
        phone: data.profile.phone || "",
        address: data.profile.address || "",
        age: data.profile.age || "",
        gender: data.profile.gender || "",
        githubUrl: data.profile.githubUrl || "",
        linkedinUrl: data.profile.linkedinUrl || "",
        designation: data.profile.designation || "",
        noticePeriod: data.profile.noticePeriod || "",
        preferredLocation: data.profile.preferredLocation || "",
        expInWork: data.profile.expInWork || "",
        salaryExpectation: data.profile.salaryExpectation || "",
        preferredCategory: data.profile.preferredCategory || "",
        highestEducation: data.profile.highestEducation || "",
        skills: data.profile.skills || [],
        education: data.profile.education && data.profile.education.length > 0 
          ? data.profile.education 
          : [{ degree: "", institution: "", field: "", startDate: "", endDate: "" }],
        experience: data.profile.experience && data.profile.experience.length > 0 
          ? data.profile.experience 
          : [{ position: "", company: "", startDate: "", endDate: "", description: "" }],
      });
      
      setError("");
    } catch (err) {
      setError("Failed to fetch profile data");
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value;
    // For display purposes, we'll update the input field value directly
    // But for the actual skills array, we parse it only when submitting
    setFormData((prev) => ({ ...prev, skills: value })); // Store raw string temporarily
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index][field] = value;
    setFormData(prev => ({ ...prev, education: updatedEducation }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index][field] = value;
    setFormData(prev => ({ ...prev, experience: updatedExperience }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { degree: "", institution: "", field: "", startDate: "", endDate: "" }]
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { position: "", company: "", startDate: "", endDate: "", description: "" }]
    }));
  };

  const removeEducation = (index) => {
    const updatedEducation = [...formData.education];
    updatedEducation.splice(index, 1);
    setFormData(prev => ({ ...prev, education: updatedEducation }));
  };

  const removeExperience = (index) => {
    const updatedExperience = [...formData.experience];
    updatedExperience.splice(index, 1);
    setFormData(prev => ({ ...prev, experience: updatedExperience }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    
    try {
      // Parse skills string into array for submission
      const skillsArray = typeof formData.skills === 'string' 
        ? formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
        : formData.skills;
      
      // Prepare data for API
      const updateData = {
        name: formData.name,
        profile: {
          phone: formData.phone,
          address: formData.address,
          age: formData.age,
          gender: formData.gender,
          githubUrl: formData.githubUrl,
          linkedinUrl: formData.linkedinUrl,
          designation: formData.designation,
          noticePeriod: formData.noticePeriod,
          preferredLocation: formData.preferredLocation,
          expInWork: formData.expInWork,
          salaryExpectation: formData.salaryExpectation,
          preferredCategory: formData.preferredCategory,
          highestEducation: formData.highestEducation,
          skills: skillsArray,
          education: formData.education.filter(edu => edu.degree || edu.institution), // Remove empty entries
          experience: formData.experience.filter(exp => exp.position || exp.company), // Remove empty entries
        }
      };
      
      await updateProfile(updateData);
      setMessage("Profile updated successfully!");
      
      // Redirect to profile page after successful update
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
      console.error("Error updating profile:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
       
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Edit Profile</h1>
            <div className="text-center py-10">
              <p>Loading profile...</p>
            </div>
          </div>
        </div>
    
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Edit Profile</h1>
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
              <button 
                onClick={fetchProfileData}
                className="btn-accent"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
   
      </div>
    );
  }

  // For display, if skills is an array, join it. If it's already a string, use it as is.
  const skillsDisplayValue = Array.isArray(formData.skills) 
    ? formData.skills.join(', ') 
    : formData.skills;

  return (
    <div className="min-h-screen bg-gray-50">
   
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Edit Profile</h1>
          
          {message && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg">{message}</div>}
          {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Name</label>
                <input 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                         style={{ fontFamily: 'var(--font-body)' }}
                         onFocus={(e) => {
                           e.target.style.outline = 'none';
                           e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                           e.target.style.borderColor = 'var(--color-accent)';
                         }}
                         onBlur={(e) => {
                           e.target.style.boxShadow = 'none';
                           e.target.style.borderColor = '#e5e7eb';
                         }}
                         placeholder="e.g., Software Engineer"
                       />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Email</label>
                <input 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  disabled 
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100"
                  style={{ fontFamily: 'var(--font-body)' }}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Phone</label>
                <input 
                   name="phone" 
                   value={formData.phone} 
                   onChange={handleChange} 
                   className="w-full border border-gray-200 rounded-lg px-3 py-2"
                   style={{ fontFamily: 'var(--font-body)' }}
                   onFocus={(e) => {
                     e.target.style.outline = 'none';
                     e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                     e.target.style.borderColor = 'var(--color-accent)';
                   }}
                   onBlur={(e) => {
                           e.target.style.boxShadow = 'none';
                           e.target.style.borderColor = '#e5e7eb';
                         }}
                         placeholder="e.g., Company Name"
                       />
                     </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Location</label>
                <input 
                   name="address" 
                   value={formData.address} 
                   onChange={handleChange} 
                   className="w-full border border-gray-200 rounded-lg px-3 py-2"
                   style={{ fontFamily: 'var(--font-body)' }}
                   onFocus={(e) => {
                     e.target.style.outline = 'none';
                     e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                     e.target.style.borderColor = 'var(--color-accent)';
                   }}
                   onBlur={(e) => {
                     e.target.style.boxShadow = 'none';
                     e.target.style.borderColor = '#e5e7eb';
                   }}
                 />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Age</label>
                <input 
                  name="age" 
                  type="number" 
                  value={formData.age} 
                  onChange={handleChange} 
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                  onFocus={(e) => {
                    e.target.style.outline = 'none';
                    e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                    e.target.style.borderColor = 'var(--color-accent)';
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = '#e5e7eb';
                  }}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                  onFocus={(e) => {
                    e.target.style.outline = 'none';
                    e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                    e.target.style.borderColor = 'var(--color-accent)';
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = '#e5e7eb';
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Designation</label>
                <input 
                  name="designation" 
                  value={formData.designation} 
                  onChange={handleChange} 
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                  onFocus={(e) => {
                    e.target.style.outline = 'none';
                    e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                    e.target.style.borderColor = 'var(--color-accent)';
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = '#e5e7eb';
                  }}
                  placeholder="e.g., Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Preferred Location</label>
                <input 
                  name="preferredLocation" 
                  value={formData.preferredLocation} 
                  onChange={handleChange} 
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                  onFocus={(e) => {
                    e.target.style.outline = 'none';
                    e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                    e.target.style.borderColor = 'var(--color-accent)';
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = '#e5e7eb';
                  }}
                  placeholder="e.g., New York, NY"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-gray-700 mb-2">GitHub URL</label>
                <input 
                  name="githubUrl" 
                  value={formData.githubUrl} 
                  onChange={handleChange} 
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                  onFocus={(e) => {
                    e.target.style.outline = 'none';
                    e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                    e.target.style.borderColor = 'var(--color-accent)';
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = '#e5e7eb';
                  }}
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">LinkedIn URL</label>
                <input 
                  name="linkedinUrl" 
                  value={formData.linkedinUrl} 
                  onChange={handleChange} 
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                  onFocus={(e) => {
                    e.target.style.outline = 'none';
                    e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                    e.target.style.borderColor = 'var(--color-accent)';
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = '#e5e7eb';
                  }}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Notice Period</label>
                <select
                  name="noticePeriod"
                  value={formData.noticePeriod}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                  onFocus={(e) => {
                    e.target.style.outline = 'none';
                    e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                    e.target.style.borderColor = 'var(--color-accent)';
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = '#e5e7eb';
                  }}
                >
                  <option value="">Select Notice Period</option>
                  <option value="Immediate Joiner">Immediate Joiner</option>
                  <option value="Upto 1 week">Up to 1 week</option>
                  <option value="Upto 1 month">Up to 1 month</option>
                  <option value="Upto 2 month">Up to 2 months</option>
                  <option value="Any">Any</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Experience Level</label>
                <select
                  name="expInWork"
                  value={formData.expInWork}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                  onFocus={(e) => {
                    e.target.style.outline = 'none';
                    e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                    e.target.style.borderColor = 'var(--color-accent)';
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = '#e5e7eb';
                  }}
                >
                  <option value="">Select Experience Level</option>
                  <option value="Fresher">Fresher</option>
                  <option value="0-1 year of experience">0-1 year of experience</option>
                  <option value="1-2 year of experience">1-2 year of experience</option>
                  <option value="2-4 year of experience">2-4 year of experience</option>
                  <option value="5+ year of experience">5+ year of experience</option>
                  <option value="10+ year of experience">10+ year of experience</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Salary Expectation</label>
                <input 
                  name="salaryExpectation" 
                  value={formData.salaryExpectation} 
                  onChange={handleChange} 
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                  onFocus={(e) => {
                    e.target.style.outline = 'none';
                    e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                    e.target.style.borderColor = 'var(--color-accent)';
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = '#e5e7eb';
                  }}
                  placeholder="e.g., 80000-90000 USD"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Preferred Category</label>
                <select
                  name="preferredCategory"
                  value={formData.preferredCategory}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                  onFocus={(e) => {
                    e.target.style.outline = 'none';
                    e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                    e.target.style.borderColor = 'var(--color-accent)';
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = '#e5e7eb';
                  }}
                >
                  <option value="">Select Category</option>
                  <option value="IT & Networking">IT & Networking</option>
                  <option value="Sales & Marketing">Sales & Marketing</option>
                  <option value="Accounting">Accounting</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Human Resource">Human Resource</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Highest Education</label>
              <select
                name="highestEducation"
                value={formData.highestEducation}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                style={{ fontFamily: 'var(--font-body)' }}
                onFocus={(e) => {
                  e.target.style.outline = 'none';
                  e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                  e.target.style.borderColor = 'var(--color-accent)';
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = 'none';
                  e.target.style.borderColor = '#e5e7eb';
                }}
              >
                <option value="">Select Highest Education</option>
                <option value="High School (10th)">High School (10th)</option>
                <option value="Higher Secondary (12th)">Higher Secondary (12th)</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor of Arts (BA)">Bachelor of Arts (BA)</option>
                <option value="Bachelor of Science (BSc)">Bachelor of Science (BSc)</option>
                <option value="Bachelor of Commerce (BCom)">Bachelor of Commerce (BCom)</option>
                <option value="Bachelor of Technology (BTech)">Bachelor of Technology (BTech)</option>
                <option value="Bachelor of Engineering (BE)">Bachelor of Engineering (BE)</option>
                <option value="Bachelor of Computer Applications (BCA)">Bachelor of Computer Applications (BCA)</option>
                <option value="Bachelor of Business Administration (BBA)">Bachelor of Business Administration (BBA)</option>
                <option value="Master of Arts (MA)">Master of Arts (MA)</option>
                <option value="Master of Science (MSc)">Master of Science (MSc)</option>
                <option value="Master of Commerce (MCom)">Master of Commerce (MCom)</option>
                <option value="Master of Technology (MTech)">Master of Technology (MTech)</option>
                <option value="Master of Engineering (ME)">Master of Engineering (ME)</option>
                <option value="Master of Computer Applications (MCA)">Master of Computer Applications (MCA)</option>
                <option value="Master of Business Administration (MBA)">Master of Business Administration (MBA)</option>
                <option value="PhD (Doctorate)">PhD (Doctorate)</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Skills (comma separated)</label>
              <input 
                name="skills" 
                value={skillsDisplayValue} 
                onChange={handleSkillsChange} 
                placeholder="e.g., React, JavaScript, CSS"
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                style={{ fontFamily: 'var(--font-body)' }}
                onFocus={(e) => {
                  e.target.style.outline = 'none';
                  e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                  e.target.style.borderColor = 'var(--color-accent)';
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = 'none';
                  e.target.style.borderColor = '#e5e7eb';
                }}
              />
              <p className="text-xs text-gray-500 mt-1">Type skills separated by commas (e.g., HTML, CSS, JavaScript)</p>
            </div>

            {/* Education Section */}
            <div className="border-t border-gray-200 pt-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Education</h2>
                <button
                  type="button"
                  onClick={addEducation}
                  className="px-3 py-1 btn-accent text-sm"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Add Education
                </button>
              </div>
              
              {formData.education.map((edu, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2"
                        style={{ fontFamily: 'var(--font-body)' }}
                        onFocus={(e) => {
                          e.target.style.outline = 'none';
                          e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                          e.target.style.borderColor = 'var(--color-accent)';
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = 'none';
                          e.target.style.borderColor = '#e5e7eb';
                        }}
                        placeholder="e.g., Bachelor of Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2"
                        style={{ fontFamily: 'var(--font-body)' }}
                        onFocus={(e) => {
                          e.target.style.outline = 'none';
                          e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                          e.target.style.borderColor = 'var(--color-accent)';
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = 'none';
                          e.target.style.borderColor = '#e5e7eb';
                        }}
                        placeholder="e.g., University Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Field of Study</label>
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2"
                        style={{ fontFamily: 'var(--font-body)' }}
                        onFocus={(e) => {
                          e.target.style.outline = 'none';
                          e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                          e.target.style.borderColor = 'var(--color-accent)';
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = 'none';
                          e.target.style.borderColor = '#e5e7eb';
                        }}
                        placeholder="e.g., Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={edu.startDate}
                        onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2"
                        style={{ fontFamily: 'var(--font-body)' }}
                        onFocus={(e) => {
                          e.target.style.outline = 'none';
                          e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                          e.target.style.borderColor = 'var(--color-accent)';
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = 'none';
                          e.target.style.borderColor = '#e5e7eb';
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">End Date</label>
                      <input
                        type="date"
                        value={edu.endDate}
                        onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2"
                        style={{ fontFamily: 'var(--font-body)' }}
                        onFocus={(e) => {
                          e.target.style.outline = 'none';
                          e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                          e.target.style.borderColor = 'var(--color-accent)';
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = 'none';
                          e.target.style.borderColor = '#e5e7eb';
                        }}
                        placeholder="Leave blank if currently studying"
                      />
                    </div>
                  </div>
                  {formData.education.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Work Experience Section */}
            <div className="border-t border-gray-200 pt-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
                <button
                  type="button"
                  onClick={addExperience}
                  className="px-3 py-1 btn-accent text-sm"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Add Experience
                </button>
              </div>
              
              {formData.experience.map((exp, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Position</label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2"
                        style={{ fontFamily: 'var(--font-body)' }}
                        onFocus={(e) => {
                          e.target.style.outline = 'none';
                          e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                          e.target.style.borderColor = 'var(--color-accent)';
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = 'none';
                          e.target.style.borderColor = '#e5e7eb';
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2"
                        style={{ fontFamily: 'var(--font-body)' }}
                        onFocus={(e) => {
                          e.target.style.outline = 'none';
                          e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                          e.target.style.borderColor = 'var(--color-accent)';
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = 'none';
                          e.target.style.borderColor = '#e5e7eb';
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={exp.startDate}
                        onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2"
                        style={{ fontFamily: 'var(--font-body)' }}
                        onFocus={(e) => {
                          e.target.style.outline = 'none';
                          e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                          e.target.style.borderColor = 'var(--color-accent)';
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = 'none';
                          e.target.style.borderColor = '#e5e7eb';
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">End Date</label>
                      <input
                        type="date"
                        value={exp.endDate}
                        onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2"
                        style={{ fontFamily: 'var(--font-body)' }}
                        onFocus={(e) => {
                          e.target.style.outline = 'none';
                          e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                          e.target.style.borderColor = 'var(--color-accent)';
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = 'none';
                          e.target.style.borderColor = '#e5e7eb';
                        }}
                        placeholder="Leave blank if currently working"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2"
                      style={{ fontFamily: 'var(--font-body)' }}
                      onFocus={(e) => {
                        e.target.style.outline = 'none';
                        e.target.style.boxShadow = '0 0 0 2px var(--color-accent)';
                        e.target.style.borderColor = 'var(--color-accent)';
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = 'none';
                        e.target.style.borderColor = '#e5e7eb';
                      }}
                      placeholder="Describe your responsibilities and achievements"
                    />
                  </div>
                  {formData.experience.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="mt-3 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={saving}
                className="px-6 py-3 btn-accent disabled:opacity-50"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
 
    </div>
  );
};

export default UserDetails;