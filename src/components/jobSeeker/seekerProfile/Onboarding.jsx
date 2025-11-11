import React, { useState } from "react";
import { updateProfile, updateresumeSeeker, profile, allJobs, jobApply } from "../../../utils/Api";
import { useNavigate } from "react-router-dom";

const suggestedLocations = [
  "Bengaluru / Bangalore",
  "Hyderabad / Secunderabad, Telangana",
  "Pune",
  "Chennai",
  "Delhi",
  "Mumbai",
  "Kolkata",
  "Ahmedabad",
  "Noida",
  "Gurgaon",
  "Indore",
  "Nagpur",
  "Jaipur",
  "Surat",
  "Kochi"
];

const GENDER_OPTIONS = ["male", "female", "other"];

const NOTICE_PERIOD_OPTIONS = ['Immediate Joiner', 'Upto 1 week', 'Upto 1 month', 'Upto 2 month', 'Any'];

const EXPERIENCE_OPTIONS = ['Fresher', '0-1 year of experience', '1-2 year of experience', '2-4 year of experience', '5+ year of experience', '10+ year of experience'];

const CATEGORY_OPTIONS = ["IT & Networking", "Sales & Marketing", "Accounting", "Data Science", "Digital Marketing", "Human Resource", "Customer Service", "Project Manager", "Other"];

const EDUCATION_OPTIONS = [
  "High School (10th)",
  "Higher Secondary (12th)",
  "Diploma",
  "Bachelor of Arts (BA)",
  "Bachelor of Science (BSc)",
  "Bachelor of Commerce (BCom)",
  "Bachelor of Technology (BTech)",
  "Bachelor of Engineering (BE)",
  "Bachelor of Computer Applications (BCA)",
  "Bachelor of Business Administration (BBA)",
  "Master of Arts (MA)",
  "Master of Science (MSc)",
  "Master of Commerce (MCom)",
  "Master of Technology (MTech)",
  "Master of Engineering (ME)",
  "Master of Computer Applications (MCA)",
  "Master of Business Administration (MBA)",
  "PhD (Doctorate)",
  "Other"
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  // Resume upload state
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUploading, setResumeUploading] = useState(false);
  const [resumeUploadedUrl, setResumeUploadedUrl] = useState("");
  const [autoApplyEnabled, setAutoApplyEnabled] = useState(false);

  const [form, setForm] = useState({
    phone: "",
    address: "",
    highestEducation: "",
    skills: "",
    preferredLocations: [],
    // Additional professional details
    designation: "",
    expInWork: "",
    noticePeriod: "",
    salaryExpectation: "",
    githubUrl: "",
    linkedinUrl: "",
    age: "",
    gender: "",
    preferredCategory: ""
  });

  const progress = Math.round((step / totalSteps) * 100);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addLocation = (loc) => {
    if (!loc) return;
    setForm((prev) => {
      if (prev.preferredLocations.length >= 5 || prev.preferredLocations.includes(loc)) {
        return prev;
      }
      return { ...prev, preferredLocations: [...prev.preferredLocations, loc] };
    });
  };

  const removeLocation = (loc) => {
    setForm((prev) => ({
      ...prev,
      preferredLocations: prev.preferredLocations.filter((l) => l !== loc)
    }));
  };

  const [locationInput, setLocationInput] = useState("");

  const next = () => setStep((s) => Math.min(totalSteps, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const tryAutofillFromResume = async () => {
    try {
      const res = await profile();
      const p = res?.data?.data?.profile || {};
      setForm((prev) => ({
        ...prev,
        phone: prev.phone || p.phone || "",
        address: prev.address || p.address || "",
        highestEducation: prev.highestEducation || p.highestEducation || "",
        skills: prev.skills || (Array.isArray(p.skills) ? p.skills.join(", ") : ""),
        preferredLocations: prev.preferredLocations?.length ? prev.preferredLocations : (Array.isArray(p.preferredLocation) ? p.preferredLocation : [])
      }));
      if (p.skills || p.phone || p.address || p.highestEducation) {
        setInfo("Some fields were auto-filled from your resume.");
      }
    } catch (e) {
      // silent
    }
  };

  const handleResumeSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeFile(file);
    // Mirror user-profile behavior: upload immediately on file selection
    setResumeUploading(true);
    setError("");
    setInfo("");
    try {
      const formData = new FormData();
      formData.append("resume", file);
      const response = await updateresumeSeeker(formData);
      const url = response?.data?.data?.profile?.resume || "";
      setResumeUploadedUrl(url);
      setInfo("Resume updated successfully!");
      await tryAutofillFromResume();
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update resume");
    } finally {
      setResumeUploading(false);
    }
  };

  const uploadResume = async () => {
    if (!resumeFile) {
      setError("Please choose a resume file first.");
      return;
    }
    setResumeUploading(true);
    setError("");
    setInfo("");
    try {
      const fd = new FormData();
      fd.append("resume", resumeFile);
      const response = await updateresumeSeeker(fd);
      const url = response?.data?.data?.profile?.resume || "";
      setResumeUploadedUrl(url);
      setInfo("Resume uploaded successfully.");
      await tryAutofillFromResume();
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload resume");
    } finally {
      setResumeUploading(false);
    }
  };

  const autoApplyRecommended = async () => {
    try {
      const res = await allJobs();
      const jobs = res?.data?.data || res?.data || [];
      const skillSet = (form.skills || "").toLowerCase().split(",").map(s => s.trim()).filter(Boolean);
      const scored = jobs.map(j => {
        const tags = (j?.skills || []).map(s => String(s).toLowerCase());
        const overlap = skillSet.filter(s => tags.includes(s));
        return { job: j, score: overlap.length };
      }).sort((a,b) => b.score - a.score);

      const best = scored[0]?.job;
      if (!best || scored[0].score === 0) {
        setInfo("No strong matches found to auto-apply. You can continue manually.");
        return;
      }
      const applicationData = {
        name: "",
        email: "",
        phone: form.phone || "",
        address: form.address || "",
        experience: [],
        education: [],
        skills: skillSet
      };
      await jobApply(best._id, applicationData);
      setInfo(`Auto-applied to a recommended job: ${best.title}`);
    } catch (e) {
      setError(e.response?.data?.message || "Auto-apply failed");
    }
  };

  const submit = async () => {
    setError("");
    // Validate minimal required fields before submit
    if (!form.phone || !form.address || !form.highestEducation || !form.skills || form.preferredLocations.length === 0) {
      setError("Please complete all required fields.");
      return;
    }
    setSaving(true);
    try {
      const skillsArray = form.skills.split(",").map((s) => s.trim()).filter(Boolean);
      await updateProfile({
        profile: {
          phone: form.phone,
          address: form.address,
          highestEducation: form.highestEducation,
          skills: skillsArray,
          preferredLocation: form.preferredLocations,
          designation: form.designation,
          expInWork: form.expInWork,
          noticePeriod: form.noticePeriod,
          salaryExpectation: form.salaryExpectation,
          githubUrl: form.githubUrl,
          linkedinUrl: form.linkedinUrl,
          age: form.age,
          gender: form.gender,
          preferredCategory: form.preferredCategory
        }
      });
      navigate("/jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save details");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'var(--font-body)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Top controls: show Skip only on last step */}
        <div className="mb-6 flex items-center justify-end">
          {step === totalSteps && (
            <button
              className="px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-700"
              onClick={() => navigate('/jobs')}
            >
              Skip
            </button>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
          )}
          {info && (
            <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">{info}</div>
          )}

          {step === 1 && (
            <div className="text-center">
              <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">You are unique.</h1>
                <h2 className="text-xl text-gray-700 mb-6">Let your profile show it.</h2>
                <p className="text-sm text-gray-600 mb-6">Uploading resumes can result in more recruiter calls.</p>
                <div className="border-2 rounded-xl p-6 mb-6" style={{ borderColor: 'var(--color-accent)' }}>
                  <input id="resume-input" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleResumeSelect} />
                  <button type="button" onClick={() => document.getElementById('resume-input').click()} className="w-full px-6 py-3 rounded-lg font-medium" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text-white)' }} disabled={resumeUploading}>
                    {resumeFile ? `Selected: ${resumeFile.name}` : 'Continue with resume'}
                  </button>
                  <p className="mt-2 text-xs text-gray-500">Supported formats: .pdf, .doc, .docx</p>
                  <div className="mt-4 flex items-center justify-between">
                    <button type="button" onClick={uploadResume} className="px-5 py-2 btn-accent rounded-lg" disabled={resumeUploading}>
                      {resumeUploading ? 'Uploading…' : 'Upload & Auto-fill'}
                    </button>
                    <button type="button" onClick={() => setStep(2)} className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg" disabled={resumeUploading}>
                      Continue manually
                    </button>
                  </div>
                  <div className="mt-6 text-left">
                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" checked={autoApplyEnabled} onChange={(e) => setAutoApplyEnabled(e.target.checked)} />
                      Enable auto-apply to a recommended job (beta)
                    </label>
                    {autoApplyEnabled && (
                      <div className="mt-3">
                        <button type="button" onClick={autoApplyRecommended} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">Auto-apply now</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Education</h1>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Highest Education</label>
                  <select
                    name="highestEducation"
                    value={form.highestEducation}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  >
                    <option value="">Select Highest Education</option>
                    {EDUCATION_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Your contact details</h1>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Address</label>
                  <input
                    name="address"
                    type="text"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Your skills</h1>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Skills</label>
                  <input
                    name="skills"
                    type="text"
                    value={form.skills}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="e.g., React, Node.js, SQL (comma-separated)"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Which city do you want to work in?</h1>
              <p className="text-sm text-gray-600 mb-4">You can select max 5</p>

              <div className="mb-4">
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addLocation(locationInput.trim());
                      setLocationInput("");
                    }
                  }}
                  placeholder="Enter your preferred locations"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {suggestedLocations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => addLocation(loc)}
                    className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200"
                  >
                    {loc}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {form.preferredLocations.map((loc) => (
                  <span key={loc} className="px-3 py-1.5 rounded-full text-sm flex items-center" style={{ backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent-dark)' }}>
                    {loc}
                    <button className="ml-2 text-gray-500" onClick={() => removeLocation(loc)} aria-label="Remove">×</button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Professional details</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Designation / Current Title</label>
                  <input name="designation" type="text" value={form.designation} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Experience Level</label>
                  <select name="expInWork" value={form.expInWork} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2">
                    <option value="">Select Experience Level</option>
                    {EXPERIENCE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Notice Period</label>
                  <select name="noticePeriod" value={form.noticePeriod} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2">
                    <option value="">Select Notice Period</option>
                    {NOTICE_PERIOD_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Salary Expectation</label>
                  <input name="salaryExpectation" type="text" value={form.salaryExpectation} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2" placeholder="e.g., 6 LPA, 40k/month" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">GitHub URL</label>
                  <input name="githubUrl" type="url" value={form.githubUrl} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2" placeholder="https://github.com/username" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">LinkedIn URL</label>
                  <input name="linkedinUrl" type="url" value={form.linkedinUrl} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2" placeholder="https://linkedin.com/in/username" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Preferred Category</label>
                  <select name="preferredCategory" value={form.preferredCategory} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2">
                    <option value="">Select Preferred Category</option>
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Age</label>
                  <input name="age" type="number" value={form.age} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Gender</label>
                  <select name="gender" value={form.gender} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2">
                    <option value="">Select Gender</option>
                    {GENDER_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className={`mt-6 flex ${step === 1 ? 'justify-end' : 'justify-between'}`}>
            {step > 1 && (
              <button
                type="button"
                onClick={back}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
                disabled={saving}
              >
                Back
              </button>
            )}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={() => {
                  // Enforce mandatory validation per step before advancing
                  setError("");
                  if (step === 2) {
                    if (!form.highestEducation) { setError("Highest education is required."); return; }
                  } else if (step === 3) {
                    if (!form.phone || !form.address) { setError("Phone and address are required."); return; }
                  } else if (step === 4) {
                    if (!form.skills) { setError("Please add at least one skill."); return; }
                  } else if (step === 5) {
                    if (!form.preferredLocations || form.preferredLocations.length === 0) { setError("Select at least one preferred location."); return; }
                  }
                  next();
                }}
                className="px-5 py-2 btn-accent rounded-lg"
                disabled={saving}
              >
                Continue →
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                className="px-5 py-2 btn-accent rounded-lg"
                disabled={saving}
              >
                {saving ? "Saving..." : "Finish & Go to Jobs"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;