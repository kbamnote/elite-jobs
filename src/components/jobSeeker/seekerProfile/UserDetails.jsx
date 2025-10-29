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
        <Header />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Edit Profile</h1>
            <div className="text-center py-10">
              <p>Loading profile...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Edit Profile</h1>
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
              <button 
                onClick={fetchUserData}
                className="btn-accent"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // For display, if skills is an array, join it. If it's already a string, use it as is.
  const skillsDisplayValue = Array.isArray(formData.skills) 
    ? formData.skills.join(', ') 
    : formData.skills;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
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
      <Footer />
    </div>
  );
};

export default UserDetails;