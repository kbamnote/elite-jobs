import { useState } from "react";
import Section from "./Section";
import Badge from "./Badge";

export default function Resume() {
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [step, setStep] = useState(1);

    const isPersonalInfoValid = () => {
        return (
            formData.name.trim() !== "" &&
            formData.email.trim() !== "" &&
            formData.phone.trim() !== "" &&
            formData.location.trim() !== "" &&
            formData.linkedin.trim() !== "" &&
            formData.portfolio.trim() !== "" &&
            formData.github.trim() !== ""
        );
    };




    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        portfolio: "",
        github: "",
        summary: "",
        technicalSkills: "",
        softSkills: "",
        languageSkills: "",
        projects: [{ name: "", description: "", technologies: "", link: "" }],
        workExperience: [{
            job_title: "",
            company: "",
            location: "",
            start_date: "",
            end_date: "",
            responsibilities: ""
        }],
        education: [{
            degree: "",
            institution: "",
            location: "",
            graduation_date: "",
            gpa: ""
        }],
        certifications: [""],
        achievements: [""]
    });

    // ================= COMMON HANDLER =================
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // ================= ARRAY HANDLERS =================
    const updateArrayField = (arrayName, index, field, value) => {
        const updated = [...formData[arrayName]];
        updated[index][field] = value;
        setFormData(prev => ({ ...prev, [arrayName]: updated }));
    };

    const addArrayItem = (arrayName, newItem) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: [...prev[arrayName], newItem]
        }));
    };

    const removeArrayItem = (arrayName, index) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: prev[arrayName].filter((_, i) => i !== index)
        }));
    };

    const updateSimpleArray = (arrayName, index, value) => {
        const updated = [...formData[arrayName]];
        updated[index] = value;
        setFormData(prev => ({ ...prev, [arrayName]: updated }));
    };

    // ================= SUBMIT =================
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const payload = {
            action: "generate",
            resume_data: {
                personal_info: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    location: formData.location,
                    linkedin: formData.linkedin,
                    portfolio: formData.portfolio,
                    github: formData.github
                },
                professional_summary: formData.summary,
                skills: {
                    technical: formData.technicalSkills.split(",").map(s => s.trim()).filter(Boolean),
                    soft: formData.softSkills.split(",").map(s => s.trim()).filter(Boolean),
                    languages: formData.languageSkills.split(",").map(s => s.trim()).filter(Boolean)
                },
                work_experience: formData.workExperience.map(w => ({
                    ...w,
                    responsibilities: w.responsibilities
                        ? w.responsibilities.split(",").map(r => r.trim()).filter(Boolean)
                        : []
                })),
                education: formData.education,
                projects: formData.projects.map(p => ({
                    ...p,
                    technologies: p.technologies
                        ? p.technologies.split(",").map(t => t.trim()).filter(Boolean)
                        : []
                })),
                certifications: formData.certifications.filter(Boolean),
                achievements: formData.achievements.filter(Boolean)
            }
        };

        try {
            const res = await fetch(
                "https://eliteassociate1.app.n8n.cloud/webhook/generate",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                }
            );

            if (!res.ok) throw new Error("Failed to generate resume");

            const data = await res.json();

            // 🔥 Transform backend structure
            const raw = data.resume_data;

            const transformed = {
                basics: raw.basics,
                summary: raw.summary,
                education: raw.education || [],
                projects: raw.projects || [],
                certifications: raw.certifications || [],
                achievements: raw.achievements || [],
                skills: {
                    technical: raw.skills?.find(s => s.category === "Technical")?.items || [],
                    soft: raw.skills?.find(s => s.category === "Soft")?.items || [],
                    languages: raw.skills?.find(s => s.category === "Languages")?.items || []
                },
                work_experience: raw.experience || []
            };

            setResume(transformed);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const isSummaryValid = () => {
        return formData.summary.trim().length >= 30;
    };

    const isEducationValid = () => {
        return formData.education.every(edu =>
            edu.degree.trim() !== "" &&
            edu.institution.trim() !== "" &&
            edu.location.trim() !== "" &&
            edu.graduation_date.trim() !== ""
        );
    };


    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">

            {/* ================= FORM ================= */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-6">
                <h2 className="text-2xl font-bold text-center">Create Resume</h2>

                {/* ================= STEP 1 - PERSONAL INFO ================= */}

                {step === 1 && (
                    <>
                        <h3 className="text-lg font-semibold mb-4">
                            Personal Informations
                        </h3>

                        <div className="space-y-3">

                            <input
                                name="name"
                                placeholder="Full Name"
                                className="input"
                                value={formData.name}
                                onChange={handleChange}
                            />

                            <input
                                name="email"
                                placeholder="Email"
                                className="input"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            <input
                                name="phone"
                                placeholder="Phone"
                                className="input"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                            <input
                                name="location"
                                placeholder="Location"
                                className="input"
                                value={formData.location}
                                onChange={handleChange}
                            />

                            <input
                                name="linkedin"
                                placeholder="LinkedIn URL"
                                className="input"
                                value={formData.linkedin}
                                onChange={handleChange}
                            />

                            <input
                                name="portfolio"
                                placeholder="Portfolio URL"
                                className="input"
                                value={formData.portfolio}
                                onChange={handleChange}
                            />

                            <input
                                name="github"
                                placeholder="GitHub URL"
                                className="input"
                                value={formData.github}
                                onChange={handleChange}
                            />

                        </div>

                        <button
                            type="button"
                            onClick={() => setStep(2)}
                            disabled={!isPersonalInfoValid()}
                            className={`w-full mt-5 py-2 rounded text-white 
                ${isPersonalInfoValid()
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-gray-400 cursor-not-allowed"}
            `}
                        >
                            Next
                        </button>
                    </>
                )}

                {/* ================= STEP 2 - PROFESSIONAL SUMMARY ================= */}

                {step === 2 && (
                    <>
                        <h3 className="text-lg font-semibold mb-4">
                            Professional Summary
                        </h3>

                        <textarea
                            name="summary"
                            placeholder="Write a short professional summary (Minimum 30 characters)"
                            className="input h-32"
                            value={formData.summary}
                            onChange={handleChange}
                        />

                        {/* Character Counter */}
                        <p className="text-sm text-gray-500 mt-1">
                            {formData.summary.length} characters
                        </p>

                        <div className="flex gap-4 mt-6">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Back
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep(3)}
                                disabled={!isSummaryValid()}
                                className={`px-4 py-2 rounded text-white
                    ${isSummaryValid()
                                        ? "bg-blue-600 hover:bg-blue-700"
                                        : "bg-gray-400 cursor-not-allowed"}
                `}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
                {/* ================= STEP 3 - SKILLS ================= */}
                {step === 3 && (
                    <>
                        <h3 className="text-lg font-semibold mb-4">
                            Skills
                        </h3>

                        <div className="space-y-4">

                            <input
                                name="technicalSkills"
                                placeholder="Technical Skills (comma separated)"
                                className="input"
                                value={formData.technicalSkills}
                                onChange={handleChange}
                            />

                            <input
                                name="softSkills"
                                placeholder="Soft Skills (comma separated)"
                                className="input"
                                value={formData.softSkills}
                                onChange={handleChange}
                            />

                            <input
                                name="languageSkills"
                                placeholder="Languages (comma separated)"
                                className="input"
                                value={formData.languageSkills}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="flex gap-4 mt-6">
                            <button
                                type="button"
                                onClick={() => setStep(2)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Back
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep(4)}
                                className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}



                {/* ================= STEP 4 - EDUCATION ================= */}
                {step === 4 && (
                    <>
                        <h3 className="text-lg font-semibold mb-4">
                            Education
                        </h3>

                        {formData.education.map((edu, i) => (
                            <div key={i} className="border p-4 rounded-lg space-y-3 bg-gray-50 mb-4">

                                <input
                                    placeholder="Degree"
                                    className="input"
                                    value={edu.degree}
                                    onChange={e => updateArrayField("education", i, "degree", e.target.value)}
                                />

                                <input
                                    placeholder="Institution"
                                    className="input"
                                    value={edu.institution}
                                    onChange={e => updateArrayField("education", i, "institution", e.target.value)}
                                />

                                <input
                                    placeholder="Location"
                                    className="input"
                                    value={edu.location}
                                    onChange={e => updateArrayField("education", i, "location", e.target.value)}
                                />

                                <input
                                    placeholder="Graduation Year"
                                    className="input"
                                    value={edu.graduation_date}
                                    onChange={e => updateArrayField("education", i, "graduation_date", e.target.value)}
                                />

                                <input
                                    placeholder="GPA (Optional)"
                                    className="input"
                                    value={edu.gpa}
                                    onChange={e => updateArrayField("education", i, "gpa", e.target.value)}
                                />

                                {formData.education.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem("education", i)}
                                        className="text-red-500 text-sm"
                                    >
                                        Remove Education
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() =>
                                addArrayItem("education", {
                                    degree: "",
                                    institution: "",
                                    location: "",
                                    graduation_date: "",
                                    gpa: ""
                                })
                            }
                            className="bg-gray-200 px-3 py-1 rounded"
                        >
                            + Add Education
                        </button>

                        <div className="flex gap-4 mt-6">
                            <button
                                type="button"
                                onClick={() => setStep(3)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Back
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep(5)}
                                disabled={!isEducationValid()}
                                className={`px-4 py-2 rounded text-white
                    ${isEducationValid()
                                        ? "bg-blue-600 hover:bg-blue-700"
                                        : "bg-gray-400 cursor-not-allowed"}
                `}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}


                {/* SUBMIT */}
                <button disabled={loading} className="btn-primary w-full">
                    {loading ? "Generating..." : "Generate Resume"}
                </button>

                {error && <p className="text-red-500 text-center">{error}</p>}
            </form>

            {/* ================= RESUME VIEW ================= */}
            {resume && (
                <div className="bg-white p-6 rounded-xl shadow space-y-6">

                    <Section title="Personal Information">
                        <p className="font-bold text-lg">{resume.basics?.name}</p>
                        <p>{resume.basics?.email}</p>
                        <p>{resume.basics?.phone}</p>
                        <p>{resume.basics?.location?.region}</p>
                    </Section>

                    <Section title="Professional Summary">
                        <p>{resume.summary}</p>
                    </Section>

                    <Section title="Technical Skills">
                        <div className="flex flex-wrap gap-2">
                            {resume.skills.technical.map((s, i) => <Badge key={i} text={s} />)}
                        </div>
                    </Section>

                    <Section title="Soft Skills">
                        <div className="flex flex-wrap gap-2">
                            {resume.skills.soft.map((s, i) => <Badge key={i} text={s} />)}
                        </div>
                    </Section>

                    <Section title="Languages">
                        <div className="flex flex-wrap gap-2">
                            {resume.skills.languages.map((s, i) => <Badge key={i} text={s} />)}
                        </div>
                    </Section>

                    <Section title="Education">
                        {resume.education.map((e, i) => (
                            <div key={i}>
                                <h3 className="font-semibold">{e.degree}</h3>
                                <p>{e.institution}</p>
                                <p className="text-sm text-gray-500">
                                    {e.location} | {e.graduation_date}
                                </p>
                            </div>
                        ))}
                    </Section>

                </div>
            )}
        </div>
    );
}
