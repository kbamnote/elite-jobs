import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profile, updateProfile } from "../../../utils/Api";

const JobHostingOnboarding = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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

  // Basic validators
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isPhone = (v) => /^\+?[0-9\s\-]{7,15}$/.test(v);
  const isPositiveInt = (v) => /^\d+$/.test(v) && Number(v) > 0;
  const isURL = (v) => /^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i.test(v);
  const isPAN = (v) => /^[A-Z0-9]{10}$/.test((v || "").toUpperCase());
  const isGST = (v) => /^[A-Z0-9]{15}$/.test((v || "").toUpperCase());

  const getStepErrors = () => {
    const errs = [];
    const p = formData.profile;
    if (step === 1) {
      if (!formData.name || formData.name.trim().length < 2) errs.push("Full Name");
      if (!isEmail(formData.email)) errs.push("Valid Email");
      if (!isPhone(p.phone)) errs.push("Valid Personal Phone");
    } else if (step === 2) {
      if (!p.companyName) errs.push("Company Name");
      if (!isEmail(p.companyEmail)) errs.push("Valid Company Email");
      if (!isPhone(p.companyPhone)) errs.push("Valid Company Phone");
      if (!isPositiveInt(p.numberOfEmployees)) errs.push("Employees (positive number)");
      if (!isURL(p.companyWebsite)) errs.push("Company Website (valid URL)");
    } else if (step === 3) {
      if (!isPAN(p.panCardNumber)) errs.push("PAN (10 chars)");
      if (!isGST(p.gstNumber)) errs.push("GST (15 chars)");
      if (!p.companyDescription || p.companyDescription.trim().length < 10) errs.push("Company Description (min 10 chars)");
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
    setStep((s) => Math.min(3, s + 1));
  };
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
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
      setTimeout(() => navigate("/hosting/profile"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save details");
      console.error("Hoster onboarding save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 border" style={{ borderColor: 'var(--border-color)' }}>
        <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}>
          Job Hosting Onboarding
        </h1>

        {error && (
          <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-error-bg)', color: 'var(--color-error-text)', border: '1px solid var(--color-error-border)' }}>
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-success-bg)', color: 'var(--color-success-text)', border: '1px solid var(--color-success-border)' }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>Full Name</label>
                <input name="name" type="text" value={formData.name} onChange={handleChange}
                  className="w-full rounded-lg px-3 py-2 border focus:outline-none"
                  style={{ borderColor: 'var(--border-color)' }} />
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>Email</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange}
                  className="w-full rounded-lg px-3 py-2 border focus:outline-none"
                  style={{ borderColor: 'var(--border-color)' }} />
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>Personal Phone</label>
                <input name="profile.phone" type="tel" value={formData.profile.phone} onChange={handleChange}
                  className="w-full rounded-lg px-3 py-2 border focus:outline-none"
                  style={{ borderColor: 'var(--border-color)' }} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>Company Name</label>
                <input name="profile.companyName" type="text" value={formData.profile.companyName} onChange={handleChange}
                  className="w-full rounded-lg px-3 py-2 border focus:outline-none"
                  style={{ borderColor: 'var(--border-color)' }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>Company Email</label>
                  <input name="profile.companyEmail" type="email" value={formData.profile.companyEmail} onChange={handleChange}
                    className="w-full rounded-lg px-3 py-2 border focus:outline-none"
                    style={{ borderColor: 'var(--border-color)' }} />
                </div>
                <div>
                  <label className="block text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>Company Phone</label>
                  <input name="profile.companyPhone" type="tel" value={formData.profile.companyPhone} onChange={handleChange}
                    className="w-full rounded-lg px-3 py-2 border focus:outline-none"
                    style={{ borderColor: 'var(--border-color)' }} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>Employees</label>
                  <input name="profile.numberOfEmployees" type="number" value={formData.profile.numberOfEmployees} onChange={handleChange}
                    className="w-full rounded-lg px-3 py-2 border focus:outline-none"
                    style={{ borderColor: 'var(--border-color)' }} />
                </div>
                <div>
                  <label className="block text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>Company Website</label>
                  <input name="profile.companyWebsite" type="url" value={formData.profile.companyWebsite} onChange={handleChange}
                    className="w-full rounded-lg px-3 py-2 border focus:outline-none"
                    style={{ borderColor: 'var(--border-color)' }} />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>PAN Card Number</label>
                <input name="profile.panCardNumber" type="text" value={formData.profile.panCardNumber} onChange={handleChange}
                  className="w-full rounded-lg px-3 py-2 border focus:outline-none"
                  style={{ borderColor: 'var(--border-color)' }} />
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>GST Number</label>
                <input name="profile.gstNumber" type="text" value={formData.profile.gstNumber} onChange={handleChange}
                  className="w-full rounded-lg px-3 py-2 border focus:outline-none"
                  style={{ borderColor: 'var(--border-color)' }} />
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>Company Description</label>
                <textarea name="profile.companyDescription" value={formData.profile.companyDescription} onChange={handleChange}
                  className="w-full rounded-lg px-3 py-2 border focus:outline-none"
                  style={{ borderColor: 'var(--border-color)' }} rows={4} />
              </div>
            </div>
          )}

          <div className="mt-4 flex justify-between">
            <button type="button" onClick={prevStep} disabled={step === 1 || saving}
              className="px-4 py-2 rounded-lg" style={{ backgroundColor: 'var(--color-muted-bg)', color: 'var(--color-text-secondary)' }}>
              Back
            </button>
            {step < 3 ? (
              <button type="button" onClick={nextStep} disabled={saving || !isStepValid()}
                className="px-4 py-2 rounded-lg btn-accent">
                Next
              </button>
            ) : (
              <button type="submit" disabled={saving || !isStepValid()} className="px-4 py-2 rounded-lg btn-accent">
                {saving ? 'Saving...' : 'Finish'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobHostingOnboarding;