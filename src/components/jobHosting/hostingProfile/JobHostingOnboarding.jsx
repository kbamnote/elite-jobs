import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profile, updateProfile, uploadFileHoster, updateCompanyLogo, updatephotoCompany, updateCompanyDocs } from "../../../utils/Api";

const JobHostingOnboarding = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [info, setInfo] = useState("");

  // File upload states
  const [logoFile, setLogoFile] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [logoUploading, setLogoUploading] = useState(false);
  const [documentUploading, setDocumentUploading] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [logoUploadedUrl, setLogoUploadedUrl] = useState("");
  const [documentUploadedUrl, setDocumentUploadedUrl] = useState("");
  const [photoUploadedUrl, setPhotoUploadedUrl] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profile: {
      companyName: "",
      companyDescription: "",
      companyWebsite: "",
      companyEmail: "",
      numberOfEmployees: "",
      companyPhone: "",
      phone: "",
      panCardNumber: "",
      gstNumber: "",
    },
  });

  const progress = Math.round((step / totalSteps) * 100);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await profile();
        const data = res?.data?.data || {};
        setFormData({
          name: data.name || "",
          email: data.email || "",
          profile: {
            companyName: data?.profile?.companyName || "",
            companyDescription: data?.profile?.companyDescription || "",
            companyWebsite: data?.profile?.companyWebsite || "",
            companyEmail: data?.profile?.companyEmail || "",
            numberOfEmployees: data?.profile?.numberOfEmployees || "",
            companyPhone: data?.profile?.companyPhone || "",
            phone: data?.profile?.phone || "",
            panCardNumber: data?.profile?.panCardNumber || "",
            gstNumber: data?.profile?.gstNumber || "",
          },
        });
        
        // Set existing file URLs if they exist
        if (data?.profile?.companyLogo) {
          setLogoUploadedUrl(data.profile.companyLogo);
        }
        if (data?.profile?.photo) {
          setPhotoUploadedUrl(data.profile.photo);
        }
        if (data?.profile?.companyDocument) {
          // Handle array or string
          const docUrl = Array.isArray(data.profile.companyDocument) 
            ? data.profile.companyDocument[0] 
            : data.profile.companyDocument;
          setDocumentUploadedUrl(docUrl);
        }
      } catch (err) {
        // Non-blocking; user can still fill details
        console.warn("Failed to prefill hoster profile:", err);
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("profile.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        profile: { ...prev.profile, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // File handling functions
  const handleLogoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
  };

  const handleDocumentSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDocumentFile(file);
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
  };

  const uploadLogo = async () => {
    if (!logoFile) {
      setError("Please choose a company logo file first.");
      return;
    }
    
    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(logoFile.type)) {
      setError("Please upload a valid image file (PNG, JPG, JPEG). WEBP is not supported.");
      return;
    }
    
    setLogoUploading(true);
    setError("");
    setInfo("");
    try {
      const formData = new FormData();
      formData.append("companyLogo", logoFile);
      const response = await uploadFileHoster(formData);
      const url = response?.data?.data?.profile?.companyLogo || "";
      setLogoUploadedUrl(url);
      setInfo("Company logo uploaded successfully!");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload company logo");
    } finally {
      setLogoUploading(false);
    }
  };

  const uploadDocument = async () => {
    if (!documentFile) {
      setError("Please choose a company document file first.");
      return;
    }
    
    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(documentFile.type)) {
      setError("Please upload a valid document file (PDF). Other formats are not supported.");
      return;
    }
    
    setDocumentUploading(true);
    setError("");
    setInfo("");
    try {
      const formData = new FormData();
      formData.append("companyDocument", documentFile);
      const response = await uploadFileHoster(formData);
      // Handle the response correctly - companyDocument is returned as an array
      const documentUrl = Array.isArray(response?.data?.data?.profile?.companyDocument) 
        ? response.data.data.profile.companyDocument[0] 
        : response.data.data.profile.companyDocument;
      setDocumentUploadedUrl(documentUrl);
      setInfo("Company document uploaded successfully!");
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload company document");
    } finally {
      setDocumentUploading(false);
    }
  };

  const uploadPhoto = async () => {
    if (!photoFile) {
      setError("Please choose a profile photo file first.");
      return;
    }
    
    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(photoFile.type)) {
      setError("Please upload a valid image file (PNG, JPG, JPEG). WEBP is not supported.");
      return;
    }
    
    setPhotoUploading(true);
    setError("");
    setInfo("");
    try {
      const formData = new FormData();
      formData.append("photo", photoFile);
      const response = await uploadFileHoster(formData);
      const url = response?.data?.data?.profile?.photo || "";
      setPhotoUploadedUrl(url);
      setInfo("Profile photo uploaded successfully!");
      setStep(4);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload profile photo");
    } finally {
      setPhotoUploading(false);
    }
  };

  const next = () => setStep((s) => Math.min(totalSteps, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  // Basic validators
  const isEmail = (v) => v && v.includes('@') && v.includes('.');
  const isPhone = (v) => v && /^\+?[1-9]\d{1,14}$/.test(v);
  const isPositiveInt = (v) => v && !isNaN(v) && parseInt(v) > 0;
  const isURL = (v) => v && (v.startsWith('http://') || v.startsWith('https://'));
  const isPAN = (v) => v && /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v);
  const isGST = (v) => v && /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(v);

  const getStepErrors = () => {
    const errs = [];
    
    if (step === 1) {
      if (!logoFile && !logoUploadedUrl) {
        errs.push("company logo");
      }
    } else if (step === 2) {
      if (!documentFile && !documentUploadedUrl) {
        errs.push("company document");
      }
    } else if (step === 3) {
      if (!photoFile && !photoUploadedUrl) {
        errs.push("profile photo");
      }
    } else if (step === 4) {
      if (!formData.name.trim()) {
        errs.push("full name");
      }
      if (!formData.email.trim() || !isEmail(formData.email)) {
        errs.push("valid email");
      }
      if (!formData.profile.phone.trim() || !isPhone(formData.profile.phone)) {
        errs.push("valid phone");
      }
    } else if (step === 5) {
      if (!formData.profile.companyName.trim()) {
        errs.push("company name");
      }
      if (!documentUploadedUrl) {
        errs.push("company document");
      }
      if (!formData.profile.panCardNumber.trim() || !isPAN(formData.profile.panCardNumber)) {
        errs.push("valid PAN card number");
      }
      if (!formData.profile.gstNumber.trim() || !isGST(formData.profile.gstNumber)) {
        errs.push("valid GST number");
      }
    }
    
    return errs;
  };

  const isStepValid = () => getStepErrors().length === 0;

  const validateStep = () => {
    const errs = getStepErrors();
    setError("");
    if (errs.length) {
      setError(`Please complete: ${errs.join(", ")}.`);
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(totalSteps, s + 1));
  };
  
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate all required fields before submission
    const step5Errors = [];
    if (!formData.profile.companyName.trim()) {
      step5Errors.push("company name");
    }
    if (!documentUploadedUrl) {
      step5Errors.push("company document");
    }
    if (!formData.profile.panCardNumber.trim() || !isPAN(formData.profile.panCardNumber)) {
      step5Errors.push("valid PAN card number");
    }
    if (!formData.profile.gstNumber.trim() || !isGST(formData.profile.gstNumber)) {
      step5Errors.push("valid GST number");
    }
    
    if (step5Errors.length > 0) {
      setError(`Please complete: ${step5Errors.join(", ")}.`);
      return;
    }
    
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const payload = {
        name: formData.name,
        profile: {
          companyName: formData.profile.companyName,
          companyDescription: formData.profile.companyDescription,
          companyWebsite: formData.profile.companyWebsite,
          companyEmail: formData.profile.companyEmail,
          numberOfEmployees: formData.profile.numberOfEmployees,
          companyPhone: formData.profile.companyPhone,
          phone: formData.profile.phone,
          panCardNumber: formData.profile.panCardNumber,
          gstNumber: formData.profile.gstNumber,
        },
      };
      await updateProfile(payload);
      setMessage("Details saved successfully!");
      // Navigate immediately without delay
      navigate("/hosting/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save details");
      console.error("Hoster onboarding save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'var(--font-body)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {step} of {totalSteps}</span>
            <span className="text-sm font-medium text-gray-700">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
          )}
          {message && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">{message}</div>
          )}
          {info && (
            <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">{info}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="text-center">
              <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome to Elite Jobs Hosting</h1>
                <h2 className="text-xl text-gray-700 mb-6">Let's get your company profile set up</h2>
                <p className="text-sm text-gray-600 mb-6">To get started, please upload your company logo. This will be displayed on your job postings.</p>
                <div className="border-2 rounded-xl p-6 mb-6" style={{ borderColor: 'var(--color-accent)' }}>
                  <input id="logo-input" type="file" accept="image/png,image/jpeg,image/jpg" className="hidden" onChange={handleLogoSelect} />
                  <button type="button" onClick={() => document.getElementById('logo-input').click()} className="w-full px-6 py-3 rounded-lg font-medium" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text-white)' }} disabled={logoUploading}>
                    {logoFile ? `Selected: ${logoFile.name}` : 'Choose Company Logo'}
                  </button>
                  <p className="mt-2 text-xs text-gray-500">Supported formats: PNG, JPG, JPEG (WEBP not supported)</p>
                  <div className="mt-4 flex items-center justify-between">
                    <button type="button" onClick={uploadLogo} className="px-5 py-2 btn-accent rounded-lg" disabled={logoUploading}>
                      {logoUploading ? 'Uploading…' : 'Upload Logo'}
                    </button>
                    <button type="button" onClick={() => setStep(2)} className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg" disabled={logoUploading}>
                      Skip for now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Company Documents</h1>
                <h2 className="text-xl text-gray-700 mb-6">Upload your company registration documents</h2>
                <p className="text-sm text-gray-600 mb-6">Please upload your company registration documents for verification purposes.</p>
                <div className="border-2 rounded-xl p-6 mb-6" style={{ borderColor: 'var(--color-accent)' }}>
                  <input id="document-input" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleDocumentSelect} />
                  <button type="button" onClick={() => document.getElementById('document-input').click()} className="w-full px-6 py-3 rounded-lg font-medium" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text-white)' }} disabled={documentUploading}>
                    {documentFile ? `Selected: ${documentFile.name}` : 'Choose Company Document'}
                  </button>
                  <p className="mt-2 text-xs text-gray-500">Supported formats: PDF, DOC, DOCX</p>
                  <div className="mt-4 flex items-center justify-between">
                    <button type="button" onClick={uploadDocument} className="px-5 py-2 btn-accent rounded-lg" disabled={documentUploading}>
                      {documentUploading ? 'Uploading…' : 'Upload Document'}
                    </button>
                    <button type="button" onClick={() => setStep(3)} className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg" disabled={documentUploading}>
                      Skip for now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Profile Photo</h1>
                <h2 className="text-xl text-gray-700 mb-6">Upload your profile photo</h2>
                <p className="text-sm text-gray-600 mb-6">Please upload a photo of yourself for your profile.</p>
                <div className="border-2 rounded-xl p-6 mb-6" style={{ borderColor: 'var(--color-accent)' }}>
                  <input id="photo-input" type="file" accept="image/png,image/jpeg,image/jpg" className="hidden" onChange={handlePhotoSelect} />
                  <button type="button" onClick={() => document.getElementById('photo-input').click()} className="w-full px-6 py-3 rounded-lg font-medium" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text-white)' }} disabled={photoUploading}>
                    {photoFile ? `Selected: ${photoFile.name}` : 'Choose Profile Photo'}
                  </button>
                  <p className="mt-2 text-xs text-gray-500">Supported formats: PNG, JPG, JPEG (WEBP not supported)</p>
                  <div className="mt-4 flex items-center justify-between">
                    <button type="button" onClick={uploadPhoto} className="px-5 py-2 btn-accent rounded-lg" disabled={photoUploading}>
                      {photoUploading ? 'Uploading…' : 'Upload Photo'}
                    </button>
                    <button type="button" onClick={() => setStep(4)} className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg" disabled={photoUploading}>
                      Skip for now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Personal Information</h1>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="e.g., John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="e.g., john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Personal Phone</label>
                  <input
                    name="profile.phone"
                    type="tel"
                    value={formData.profile.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="e.g., +91 9876543210"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Company Information</h1>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Company Name</label>
                  <input
                    name="profile.companyName"
                    type="text"
                    value={formData.profile.companyName}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="e.g., Tech Solutions Pvt Ltd"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Company Email</label>
                    <input
                      name="profile.companyEmail"
                      type="email"
                      value={formData.profile.companyEmail}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2"
                      placeholder="e.g., contact@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Company Phone</label>
                    <input
                      name="profile.companyPhone"
                      type="tel"
                      value={formData.profile.companyPhone}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2"
                      placeholder="e.g., +91 9876543210"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Number of Employees</label>
                    <input
                      name="profile.numberOfEmployees"
                      type="number"
                      value={formData.profile.numberOfEmployees}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2"
                      placeholder="e.g., 50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Company Website</label>
                    <input
                      name="profile.companyWebsite"
                      type="url"
                      value={formData.profile.companyWebsite}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2"
                      placeholder="e.g., https://company.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">PAN Card Number</label>
                    <input
                      name="profile.panCardNumber"
                      type="text"
                      value={formData.profile.panCardNumber}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2"
                      placeholder="e.g., ABCDE1234F"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">GST Number</label>
                    <input
                      name="profile.gstNumber"
                      type="text"
                      value={formData.profile.gstNumber}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2"
                      placeholder="e.g., 12ABCDE1234PZ"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Company Description</label>
                  <textarea
                    name="profile.companyDescription"
                    value={formData.profile.companyDescription}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                    rows="4"
                    placeholder="Tell us about your company, its mission, and what you do..."
                  />
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1 || saving}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
            >
              Back
            </button>
            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={saving || !isStepValid()}
                className="px-5 py-2 btn-accent rounded-lg"
              >
                Continue →
              </button>
            ) : (
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 btn-accent rounded-lg"
              >
                {saving ? "Saving..." : "Finish & Go to Profile"}
              </button>
            )}
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobHostingOnboarding;