/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";

/* ─── Load html2canvas + jsPDF from CDN ─── */
function loadScript(src) {
    return new Promise((resolve) => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
        const s = document.createElement("script");
        s.src = src; s.onload = resolve;
        document.head.appendChild(s);
    });
}
import {
    Camera, Download, Settings, Pencil,
    Mail, Phone, MapPin, Award, FileText,
    Briefcase, GraduationCap, Guitar, Globe,
    Home, BookOpen, IdCard, Folder, Puzzle,
    PenTool, Link2, RefreshCcw, Atom, Backpack,
    Bike, Eye, EyeOff, Plus, X, ChevronRight,
    Star, Trophy, Layers, Code,
} from "lucide-react";

/* ─── Google Fonts ─── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap";
document.head.appendChild(fontLink);

/* ─── Print CSS ─── */
const printStyle = document.createElement("style");
printStyle.textContent = `
  @media print {
    @page { size: A4; margin: 0; }
    body * { visibility: hidden !important; }
    .resume-print-area,
    .resume-print-area * { visibility: visible !important; }
    .resume-print-area {
      position: fixed !important;
      inset: 0 !important;
      width: 100vw !important;
      max-width: 100vw !important;
      box-shadow: none !important;
      border-radius: 0 !important;
      overflow: visible !important;
      z-index: 9999;
    }
  }
`;
document.head.appendChild(printStyle);

/* ─── Globals ─── */
const SKILL_LEVELS = ["Beginner", "Amateur", "Competent", "Proficient", "Expert"];
const LANGUAGE_LEVELS = ["Basic", "Conversational", "Proficient", "Fluent", "Native / Bilingual"];
const ICONS = [Award, FileText, BookOpen, GraduationCap, Guitar, Globe, Home,
    Briefcase, IdCard, Folder, Puzzle, PenTool, Link2, RefreshCcw, Atom, Backpack, Bike, Code, Star, Layers];

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
export default function ResumeEditor() {
    /* ── personal ── */
    const [photo, setPhoto] = useState(null);
    const [form, setForm] = useState({ name: "", title: "", email: "", phone: "", location: "" });
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const pageRef = useRef(null);
    const [downloading, setDownloading] = useState(false);

    /* ── panels ── */
    const [activeSection, setActiveSection] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);

    /* ── sections ── */
    const [profileText, setProfileText] = useState("");
    const [educationList, setEducationList] = useState([]);
    const [experienceList, setExperienceList] = useState([]);
    const [skillsList, setSkillsList] = useState([]);
    const [languagesList, setLanguagesList] = useState([]);
    const [certificatesList, setCertificatesList] = useState([]);
    const [projectsList, setProjectsList] = useState([]);
    const [awards, setAwards] = useState([]);
    const [customSections, setCustomSections] = useState([]);

    /* ── editing indices ── */
    const [editEduIdx, setEditEduIdx] = useState(null);
    const [editExpIdx, setEditExpIdx] = useState(null);
    const [editSkillIdx, setEditSkillIdx] = useState(null);
    const [editLangIdx, setEditLangIdx] = useState(null);
    const [editCertIdx, setEditCertIdx] = useState(null);
    const [editProjIdx, setEditProjIdx] = useState(null);
    const [editAwardIdx, setEditAwardIdx] = useState(null);
    const [activeCustomIdx, setActiveCustomIdx] = useState(null);
    const [editCustomEntryIdx, setEditCustomEntryIdx] = useState(null);

    /* ── forms ── */
    const [eduForm, setEduForm] = useState({ degree: "", school: "", startDate: "", endDate: "", location: "", description: "" });
    const [expForm, setExpForm] = useState({ jobTitle: "", employer: "", startDate: "", endDate: "", location: "", description: "" });
    const [skillForm, setSkillForm] = useState({ skill: "", info: "", level: "Beginner", customLevelText: "Beginner" });
    const [langForm, setLangForm] = useState({ language: "", info: "", level: "Basic" });
    const [certForm, setCertForm] = useState({ certificate: "", info: "" });
    const [projForm, setProjForm] = useState({ title: "", subtitle: "", startDate: "", endDate: "", description: "" });
    const [awardForm, setAwardForm] = useState({ title: "", issuer: "", date: "", description: "" });
    const [customMeta, setCustomMeta] = useState({ icon: Puzzle, showIcon: true, heading: "", type: "list" });
    const [customEntryForm, setCustomEntryForm] = useState({ title: "", subtitle: "", startDate: "", endDate: "", location: "", description: "" });
    const [customizeLevel, setCustomizeLevel] = useState(false);
    const [showIconPicker, setShowIconPicker] = useState(false);

    const openEditor = (section) => { setOpenAdd(false); setActiveSection(section); };
    const closeEditor = () => { setActiveSection(null); };

    const handleExportPDF = async () => {
        if (!pageRef.current) return;
        setDownloading(true);
        try {
            await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
            await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");

            const canvas = await window.html2canvas(pageRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
                logging: false,
            });

            const imgData = canvas.toDataURL("image/jpeg", 0.95);
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

            const pageW = pdf.internal.pageSize.getWidth();
            const pageH = pdf.internal.pageSize.getHeight();
            const ratio = canvas.height / canvas.width;
            const imgH = pageW * ratio;

            // If content overflows one page, split across pages
            let yPos = 0;
            let remaining = imgH;
            while (remaining > 0) {
                pdf.addImage(imgData, "JPEG", 0, yPos, pageW, imgH);
                remaining -= pageH;
                if (remaining > 0) {
                    pdf.addPage();
                    yPos -= pageH;
                }
            }

            pdf.save(`${form.name || "Resume"}_CV.pdf`);
        } catch (err) {
            console.error("PDF export failed:", err);
            alert("Export failed. Please try again.");
        } finally {
            setDownloading(false);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setPhoto(reader.result);
        reader.readAsDataURL(file);
    };

    /* ── accent bar widths for skill levels ── */
    const levelWidth = { Beginner: "20%", Amateur: "40%", Competent: "60%", Proficient: "80%", Expert: "100%" };

    /* ════════════════════════════════════════
       RENDER
    ════════════════════════════════════════ */
    return (
        <div style={S.root}>
            {/* ── TOP NAV ── */}
            <div className="relative" style={S.Dnav}>
                <nav style={S.nav}>
                    <div style={S.navLeft}>
                        <span style={S.navLogo}>résumé</span>
                        <span style={S.navDot}>·</span>
                        <span style={S.navTitle}>CONTENT</span>
                    </div>
                    <div style={S.navRight}>
                        <button style={S.navBtn}><Settings size={15} /></button>
                        <button style={{ ...S.downloadBtn, opacity: downloading ? 0.7 : 1 }} onClick={handleExportPDF} disabled={downloading}>
                            <Download size={14} /> {downloading ? "Generating…" : "Download PDF"}
                        </button>
                    </div>
                </nav>
            </div>

            <div style={S.workspace}>
                {/* ══════ LEFT EDITOR PANEL ══════ */}
                <aside style={S.editor}>
                    <div style={S.editorInner}>

                        {/* ── Photo + Personal ── */}
                        <section style={S.personalCard}>
                            <label style={S.photoRing}>
                                {photo
                                    ? <img src={photo} alt="profile" style={S.photoImg} />
                                    : <div style={S.photoPlaceholder}><Camera size={22} color="#c08b8b" /><span style={S.photoHint}>Add photo</span></div>}
                                <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
                            </label>
                            <div style={S.personalFields}>
                                <Field label="Full Name" name="name" value={form.name} onChange={handleChange} big />
                                <Field label="Professional Title" name="title" value={form.title} onChange={handleChange} />
                                <div style={S.row}>
                                    <Field label="Email" name="email" value={form.email} onChange={handleChange} />
                                    <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} />
                                </div>
                                <Field label="Location" name="location" value={form.location} onChange={handleChange} />
                            </div>
                        </section>

                        {/* ── Sections List ── */}
                        <div style={S.sectionsList}>
                            {profileText && <SectionPill label="Profile Summary" onEdit={() => openEditor("profile")} />}
                            {educationList.map((e, i) => <SectionPill key={i} label={`Education: ${e.degree || "Untitled"}`} onEdit={() => { setEduForm(educationList[i]); setEditEduIdx(i); openEditor("education"); }} />)}
                            {experienceList.map((e, i) => <SectionPill key={i} label={`Experience: ${e.jobTitle || "Untitled"}`} onEdit={() => { setExpForm(experienceList[i]); setEditExpIdx(i); openEditor("experience"); }} />)}
                            {skillsList.map((s, i) => <SectionPill key={i} label={`Skill: ${s.skill || "Untitled"}`} onEdit={() => { setSkillForm(skillsList[i]); setEditSkillIdx(i); openEditor("skills"); }} />)}
                            {languagesList.map((l, i) => <SectionPill key={i} label={`Language: ${l.language || "Untitled"}`} onEdit={() => { setLangForm(languagesList[i]); setEditLangIdx(i); openEditor("languages"); }} />)}
                            {certificatesList.map((c, i) => <SectionPill key={i} label={`Certificate: ${c.certificate || "Untitled"}`} onEdit={() => { setCertForm(certificatesList[i]); setEditCertIdx(i); openEditor("certificates"); }} />)}
                            {projectsList.map((p, i) => <SectionPill key={i} label={`Project: ${p.title || "Untitled"}`} onEdit={() => { setProjForm(projectsList[i]); setEditProjIdx(i); openEditor("projects"); }} />)}
                            {awards.map((a, i) => <SectionPill key={i} label={`Award: ${a.title || "Untitled"}`} onEdit={() => { setAwardForm(awards[i]); setEditAwardIdx(i); openEditor("awards"); }} />)}
                            {customSections.map((cs, i) => <SectionPill key={i} label={`Custom: ${cs.heading || "Untitled"}`} onEdit={() => { setCustomMeta(cs); setActiveCustomIdx(i); openEditor("custom"); }} />)}
                        </div>

                        <button style={S.addBtn} onClick={() => setOpenAdd(true)}>
                            <Plus size={16} /> Add Section
                        </button>
                    </div>
                </aside>

                {/* ══════ RIGHT PREVIEW PANEL ══════ */}
                <main style={S.preview}>
                    <div ref={pageRef} style={S.page} className="resume-print-area">
                        {/* header stripe */}
                        <div style={S.pageHeader}>
                            <div style={S.pageHeaderLeft}>
                                {photo && <img src={photo} alt="" style={S.previewPhoto} />}
                                <div>
                                    <h1 style={S.previewName}>{form.name || "Your Name"}</h1>
                                    <p style={S.previewTitle}>{form.title}</p>
                                    <div style={S.contactRow}>
                                        {form.email && <span style={S.contactItem}><Mail size={10} style={{ marginRight: 4 }} />{form.email}</span>}
                                        {form.phone && <span style={S.contactItem}><Phone size={10} style={{ marginRight: 4 }} />{form.phone}</span>}
                                        {form.location && <span style={S.contactItem}><MapPin size={10} style={{ marginRight: 4 }} />{form.location}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={S.pageBody}>
                            {/* Profile */}
                            {profileText && (
                                <PreviewSection title="Profile">
                                    <p style={S.previewBody}>{profileText}</p>
                                </PreviewSection>
                            )}

                            {/* Education */}
                            {educationList.length > 0 && (
                                <PreviewSection title="Education">
                                    {educationList.map((e, i) => (
                                        <PreviewEntry key={i} title={e.degree} sub={e.school} date={`${e.startDate} – ${e.endDate}`} loc={e.location} desc={e.description} />
                                    ))}
                                </PreviewSection>
                            )}

                            {/* Experience */}
                            {experienceList.length > 0 && (
                                <PreviewSection title="Experience">
                                    {experienceList.map((e, i) => (
                                        <PreviewEntry key={i} title={e.jobTitle} sub={e.employer} date={`${e.startDate} – ${e.endDate}`} loc={e.location} desc={e.description} />
                                    ))}
                                </PreviewSection>
                            )}

                            {/* Skills */}
                            {skillsList.length > 0 && (
                                <PreviewSection title="Skills">
                                    <div style={S.skillsGrid}>
                                        {skillsList.map((s, i) => (
                                            <div key={i} style={S.skillItem}>
                                                <div style={S.skillTop}>
                                                    <span style={S.skillName}>{s.skill}</span>
                                                    <span style={S.skillLevel}>{s.customLevelText}</span>
                                                </div>
                                                <div style={S.skillBar}><div style={{ ...S.skillFill, width: levelWidth[s.level] || "60%" }} /></div>
                                                {s.info && <p style={S.skillInfo}>{s.info}</p>}
                                            </div>
                                        ))}
                                    </div>
                                </PreviewSection>
                            )}

                            {/* Languages */}
                            {languagesList.length > 0 && (
                                <PreviewSection title="Languages">
                                    <div style={S.langGrid}>
                                        {languagesList.map((l, i) => (
                                            <div key={i} style={S.langItem}>
                                                <span style={S.langName}>{l.language}</span>
                                                <span style={S.langLvl}>{l.level}</span>
                                                {l.info && <p style={S.skillInfo}>{l.info}</p>}
                                            </div>
                                        ))}
                                    </div>
                                </PreviewSection>
                            )}

                            {/* Certificates */}
                            {certificatesList.length > 0 && (
                                <PreviewSection title="Certificates">
                                    {certificatesList.map((c, i) => (
                                        <div key={i} style={S.certItem}>
                                            <span style={S.certName}>{c.certificate}</span>
                                            {c.info && <span style={S.certInfo}>{c.info}</span>}
                                        </div>
                                    ))}
                                </PreviewSection>
                            )}

                            {/* Projects */}
                            {projectsList.length > 0 && (
                                <PreviewSection title="Projects">
                                    {projectsList.map((p, i) => (
                                        <PreviewEntry key={i} title={p.title} sub={p.subtitle} date={`${p.startDate} – ${p.endDate}`} desc={p.description} />
                                    ))}
                                </PreviewSection>
                            )}

                            {/* Awards */}
                            {awards.length > 0 && (
                                <PreviewSection title="Awards">
                                    {awards.map((a, i) => (
                                        <PreviewEntry key={i} title={a.title} sub={a.issuer} date={a.date} desc={a.description} />
                                    ))}
                                </PreviewSection>
                            )}

                            {/* Custom */}
                            {customSections.map((cs, si) => (
                                <PreviewSection key={si} title={cs.heading} Icon={cs.showIcon && cs.icon ? cs.icon : null}>
                                    {cs.entries.map((entry, ei) => (
                                        <PreviewEntry key={ei} title={entry.title} sub={entry.subtitle} date={entry.startDate && `${entry.startDate} – ${entry.endDate}`} loc={entry.location} desc={entry.description} />
                                    ))}
                                </PreviewSection>
                            ))}
                        </div>
                    </div>
                </main>
            </div>

            {/* ══════════ ADD CONTENT MODAL ══════════ */}
            {openAdd && (
                <Modal onClose={() => setOpenAdd(false)}>
                    <h2 style={S.modalTitle}>Add a Section</h2>
                    <div style={S.addGrid}>
                        {[
                            { label: "Profile Summary", key: "profile" },
                            { label: "Education", key: "education" },
                            { label: "Experience", key: "experience" },
                            { label: "Skills", key: "skills" },
                            { label: "Languages", key: "languages" },
                            { label: "Certificates", key: "certificates" },
                            { label: "Projects", key: "projects" },
                            { label: "Awards", key: "awards" },
                            { label: "Custom Section", key: "custom" },
                        ].map(({ label, key }) => (
                            <button key={key} style={S.addCard} onClick={() => openEditor(key)}>
                                {label} <ChevronRight size={14} />
                            </button>
                        ))}
                    </div>
                </Modal>
            )}

            {/* ══════════ PROFILE EDITOR ══════════ */}
            {activeSection === "profile" && (
                <Modal onClose={closeEditor} title="Profile Summary">
                    <textarea value={profileText} onChange={(e) => setProfileText(e.target.value)}
                        placeholder="Write a compelling professional summary…"
                        style={S.textarea} />
                    <SaveBtn onClick={closeEditor} />
                </Modal>
            )}

            {/* ══════════ EDUCATION EDITOR ══════════ */}
            {activeSection === "education" && (
                <Modal onClose={() => { closeEditor(); setEditEduIdx(null); }} title={editEduIdx !== null ? "Edit Education" : "Add Education"}>
                    <div style={S.formGrid}>
                        <Field label="Degree / Program" value={eduForm.degree} onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })} />
                        <Field label="School / University" value={eduForm.school} onChange={(e) => setEduForm({ ...eduForm, school: e.target.value })} />
                        <Field label="Start Date" value={eduForm.startDate} onChange={(e) => setEduForm({ ...eduForm, startDate: e.target.value })} />
                        <Field label="End Date" value={eduForm.endDate} onChange={(e) => setEduForm({ ...eduForm, endDate: e.target.value })} />
                        <Field label="Location" value={eduForm.location} onChange={(e) => setEduForm({ ...eduForm, location: e.target.value })} />
                    </div>
                    <textarea value={eduForm.description} onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })}
                        placeholder="Description (achievements, coursework…)" style={S.textarea} />
                    <SaveBtn label={editEduIdx !== null ? "Update" : "Add"} onClick={() => {
                        if (editEduIdx !== null) { const u = [...educationList]; u[editEduIdx] = eduForm; setEducationList(u); }
                        else setEducationList([...educationList, eduForm]);
                        setEduForm({ degree: "", school: "", startDate: "", endDate: "", location: "", description: "" });
                        setEditEduIdx(null); closeEditor();
                    }} />
                </Modal>
            )}

            {/* ══════════ EXPERIENCE EDITOR ══════════ */}
            {activeSection === "experience" && (
                <Modal onClose={() => { closeEditor(); setEditExpIdx(null); }} title={editExpIdx !== null ? "Edit Experience" : "Add Experience"}>
                    <div style={S.formGrid}>
                        <Field label="Job Title" value={expForm.jobTitle} onChange={(e) => setExpForm({ ...expForm, jobTitle: e.target.value })} />
                        <Field label="Employer" value={expForm.employer} onChange={(e) => setExpForm({ ...expForm, employer: e.target.value })} />
                        <Field label="Start Date" value={expForm.startDate} onChange={(e) => setExpForm({ ...expForm, startDate: e.target.value })} />
                        <Field label="End Date" value={expForm.endDate} onChange={(e) => setExpForm({ ...expForm, endDate: e.target.value })} />
                        <Field label="Location" value={expForm.location} onChange={(e) => setExpForm({ ...expForm, location: e.target.value })} />
                    </div>
                    <textarea value={expForm.description} onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                        placeholder="Responsibilities, achievements, impact…" style={S.textarea} />
                    <SaveBtn label={editExpIdx !== null ? "Update" : "Add"} onClick={() => {
                        if (editExpIdx !== null) { const u = [...experienceList]; u[editExpIdx] = expForm; setExperienceList(u); }
                        else setExperienceList([...experienceList, expForm]);
                        setExpForm({ jobTitle: "", employer: "", startDate: "", endDate: "", location: "", description: "" });
                        setEditExpIdx(null); closeEditor();
                    }} />
                </Modal>
            )}

            {/* ══════════ SKILLS EDITOR ══════════ */}
            {activeSection === "skills" && (
                <Modal onClose={() => { closeEditor(); setEditSkillIdx(null); setCustomizeLevel(false); }} title={editSkillIdx !== null ? "Edit Skill" : "Add Skill"}>
                    <Field label="Skill Name" value={skillForm.skill} onChange={(e) => setSkillForm({ ...skillForm, skill: e.target.value })} />
                    <textarea value={skillForm.info} onChange={(e) => setSkillForm({ ...skillForm, info: e.target.value })}
                        placeholder="Sub-skills or details (e.g. React, Hooks, APIs)" style={{ ...S.textarea, height: 80 }} />
                    <label style={S.fieldLabel}>Skill Level</label>
                    <div style={S.levelBtns}>
                        {SKILL_LEVELS.map((l) => (
                            <button key={l} style={{ ...S.levelBtn, ...(skillForm.level === l ? S.levelBtnActive : {}) }}
                                onClick={() => setSkillForm({ ...skillForm, level: l, customLevelText: l })}>{l}</button>
                        ))}
                    </div>
                    <button style={S.customizeLink} onClick={() => setCustomizeLevel(!customizeLevel)}>✏ Customize label text</button>
                    {customizeLevel && (
                        <input value={skillForm.customLevelText} onChange={(e) => setSkillForm({ ...skillForm, customLevelText: e.target.value })}
                            style={S.input} placeholder="Custom level text" />
                    )}
                    <SaveBtn label={editSkillIdx !== null ? "Update" : "Add"} onClick={() => {
                        if (editSkillIdx !== null) { const u = [...skillsList]; u[editSkillIdx] = skillForm; setSkillsList(u); }
                        else setSkillsList([...skillsList, skillForm]);
                        setSkillForm({ skill: "", info: "", level: "Beginner", customLevelText: "Beginner" });
                        setEditSkillIdx(null); setCustomizeLevel(false); closeEditor();
                    }} />
                </Modal>
            )}

            {/* ══════════ LANGUAGES EDITOR ══════════ */}
            {activeSection === "languages" && (
                <Modal onClose={() => { closeEditor(); setEditLangIdx(null); }} title={editLangIdx !== null ? "Edit Language" : "Add Language"}>
                    <Field label="Language" value={langForm.language} onChange={(e) => setLangForm({ ...langForm, language: e.target.value })} />
                    <textarea value={langForm.info} onChange={(e) => setLangForm({ ...langForm, info: e.target.value })}
                        placeholder="Additional notes (optional)" style={{ ...S.textarea, height: 80 }} />
                    <label style={S.fieldLabel}>Proficiency</label>
                    <div style={S.levelBtns}>
                        {LANGUAGE_LEVELS.map((l) => (
                            <button key={l} style={{ ...S.levelBtn, ...(langForm.level === l ? S.levelBtnActive : {}) }}
                                onClick={() => setLangForm({ ...langForm, level: l })}>{l}</button>
                        ))}
                    </div>
                    <SaveBtn label={editLangIdx !== null ? "Update" : "Add"} onClick={() => {
                        if (editLangIdx !== null) { const u = [...languagesList]; u[editLangIdx] = langForm; setLanguagesList(u); }
                        else setLanguagesList([...languagesList, langForm]);
                        setLangForm({ language: "", info: "", level: "Basic" });
                        setEditLangIdx(null); closeEditor();
                    }} />
                </Modal>
            )}

            {/* ══════════ CERTIFICATES EDITOR ══════════ */}
            {activeSection === "certificates" && (
                <Modal onClose={() => { closeEditor(); setEditCertIdx(null); }} title={editCertIdx !== null ? "Edit Certificate" : "Add Certificate"}>
                    <Field label="Certificate Name" value={certForm.certificate} onChange={(e) => setCertForm({ ...certForm, certificate: e.target.value })} />
                    <textarea value={certForm.info} onChange={(e) => setCertForm({ ...certForm, info: e.target.value })}
                        placeholder="Issuer, year, score, etc." style={{ ...S.textarea, height: 80 }} />
                    <SaveBtn label={editCertIdx !== null ? "Update" : "Add"} onClick={() => {
                        if (editCertIdx !== null) { const u = [...certificatesList]; u[editCertIdx] = certForm; setCertificatesList(u); }
                        else setCertificatesList([...certificatesList, certForm]);
                        setCertForm({ certificate: "", info: "" });
                        setEditCertIdx(null); closeEditor();
                    }} />
                </Modal>
            )}

            {/* ══════════ PROJECTS EDITOR ══════════ */}
            {activeSection === "projects" && (
                <Modal onClose={() => { closeEditor(); setEditProjIdx(null); }} title={editProjIdx !== null ? "Edit Project" : "Add Project"}>
                    <div style={S.formGrid}>
                        <Field label="Project Title" value={projForm.title} onChange={(e) => setProjForm({ ...projForm, title: e.target.value })} />
                        <Field label="Subtitle / Role" value={projForm.subtitle} onChange={(e) => setProjForm({ ...projForm, subtitle: e.target.value })} />
                        <Field label="Start Date" type="month" value={projForm.startDate} onChange={(e) => setProjForm({ ...projForm, startDate: e.target.value })} />
                        <Field label="End Date" type="month" value={projForm.endDate} onChange={(e) => setProjForm({ ...projForm, endDate: e.target.value })} />
                    </div>
                    <textarea value={projForm.description} onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                        placeholder="Project description, technologies, outcomes…" style={S.textarea} />
                    <SaveBtn label={editProjIdx !== null ? "Update" : "Add"} onClick={() => {
                        if (editProjIdx !== null) { const u = [...projectsList]; u[editProjIdx] = projForm; setProjectsList(u); }
                        else setProjectsList([...projectsList, projForm]);
                        setProjForm({ title: "", subtitle: "", startDate: "", endDate: "", description: "" });
                        setEditProjIdx(null); closeEditor();
                    }} />
                </Modal>
            )}

            {/* ══════════ AWARDS EDITOR ══════════ */}
            {activeSection === "awards" && (
                <Modal onClose={() => { closeEditor(); setEditAwardIdx(null); }} title={editAwardIdx !== null ? "Edit Award" : "Add Award"}>
                    <div style={S.formGrid}>
                        <Field label="Award Title *" value={awardForm.title} onChange={(e) => setAwardForm({ ...awardForm, title: e.target.value })} />
                        <Field label="Issuer" value={awardForm.issuer} onChange={(e) => setAwardForm({ ...awardForm, issuer: e.target.value })} />
                        <Field label="Date" type="month" value={awardForm.date} onChange={(e) => setAwardForm({ ...awardForm, date: e.target.value })} />
                    </div>
                    <textarea value={awardForm.description} onChange={(e) => setAwardForm({ ...awardForm, description: e.target.value })}
                        placeholder="Award description…" style={{ ...S.textarea, height: 80 }} />
                    <SaveBtn label={editAwardIdx !== null ? "Update" : "Add"} onClick={() => {
                        if (!awardForm.title.trim()) return alert("Award title is required");
                        if (editAwardIdx !== null) { const u = [...awards]; u[editAwardIdx] = awardForm; setAwards(u); }
                        else setAwards([...awards, awardForm]);
                        setAwardForm({ title: "", issuer: "", date: "", description: "" });
                        setEditAwardIdx(null); closeEditor();
                    }} />
                </Modal>
            )}

            {/* ══════════ CUSTOM SECTION EDITOR ══════════ */}
            {activeSection === "custom" && (
                <Modal onClose={() => { closeEditor(); setActiveCustomIdx(null); setEditCustomEntryIdx(null); }} title={activeCustomIdx !== null ? "Edit Custom Section" : "New Custom Section"} wide>
                    {/* Meta */}
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-end", marginBottom: 16 }}>
                        <div style={{ position: "relative" }}>
                            <label style={S.fieldLabel}>Icon</label>
                            <button style={S.iconBtn} onClick={() => setShowIconPicker(!showIconPicker)}>
                                {customMeta.icon && <customMeta.icon size={20} />}
                            </button>
                            {showIconPicker && (
                                <div style={S.iconPicker}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                                        <span style={{ fontSize: 12, fontWeight: 600 }}>Show icon</span>
                                        <button onClick={() => setCustomMeta({ ...customMeta, showIcon: !customMeta.showIcon })}
                                            style={{ ...S.toggle, background: customMeta.showIcon ? "#c2344d" : "#ddd" }}>
                                            <span style={{ ...S.toggleDot, left: customMeta.showIcon ? "calc(100% - 18px)" : 3 }} />
                                        </button>
                                    </div>
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 6 }}>
                                        {ICONS.map((Icon, i) => (
                                            <button key={i} style={{ ...S.iconPickerBtn, ...(customMeta.icon === Icon ? S.iconPickerBtnActive : {}) }}
                                                onClick={() => { setCustomMeta({ ...customMeta, icon: Icon }); setShowIconPicker(false); }}>
                                                <Icon size={18} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div style={{ flex: 1 }}>
                            <Field label="Section Heading *" value={customMeta.heading} onChange={(e) => setCustomMeta({ ...customMeta, heading: e.target.value })} />
                        </div>
                    </div>

                    <div style={{ borderTop: "1px solid #f0ece8", paddingTop: 16, marginTop: 4 }}>
                        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#999", marginBottom: 12 }}>Entry Details</p>
                        <div style={S.formGrid}>
                            <Field label="Title" value={customEntryForm.title} onChange={(e) => setCustomEntryForm({ ...customEntryForm, title: e.target.value })} />
                            <Field label="Subtitle" value={customEntryForm.subtitle} onChange={(e) => setCustomEntryForm({ ...customEntryForm, subtitle: e.target.value })} />
                            <Field label="Start Date" type="month" value={customEntryForm.startDate} onChange={(e) => setCustomEntryForm({ ...customEntryForm, startDate: e.target.value })} />
                            <Field label="End Date" type="month" value={customEntryForm.endDate} onChange={(e) => setCustomEntryForm({ ...customEntryForm, endDate: e.target.value })} />
                            <Field label="Location" value={customEntryForm.location} onChange={(e) => setCustomEntryForm({ ...customEntryForm, location: e.target.value })} />
                        </div>
                        <textarea value={customEntryForm.description} onChange={(e) => setCustomEntryForm({ ...customEntryForm, description: e.target.value })}
                            placeholder="Description…" style={{ ...S.textarea, height: 80 }} />
                    </div>

                    <SaveBtn label="Save Section" onClick={() => {
                        if (!customMeta.heading.trim()) return alert("Section heading is required");
                        const updated = [...customSections];
                        if (activeCustomIdx !== null) {
                            updated[activeCustomIdx].entries.push(customEntryForm);
                        } else {
                            updated.push({ ...customMeta, entries: [customEntryForm] });
                        }
                        setCustomSections(updated);
                        setCustomEntryForm({ title: "", subtitle: "", startDate: "", endDate: "", location: "", description: "" });
                        setActiveCustomIdx(null); setEditCustomEntryIdx(null); closeEditor();
                    }} />
                </Modal>
            )}
        </div>
    );
}

/* ════════════════════════════════════════════
   SUB-COMPONENTS
════════════════════════════════════════════ */

function Modal({ children, onClose, title, wide }) {
    return (
        <div style={S.overlay}>
            <div style={{ ...S.modal, ...(wide ? { maxWidth: 680 } : {}) }}>
                <div style={S.modalHead}>
                    {title && <h2 style={S.modalTitle}>{title}</h2>}
                    <button style={S.closeBtn} onClick={onClose}><X size={16} /></button>
                </div>
                {children}
            </div>
        </div>
    );
}

function Field({ label, value, onChange, name, big, type = "text" }) {
    return (
        <div style={{ marginBottom: 12 }}>
            <label style={S.fieldLabel}>{label}</label>
            <input type={type} name={name} value={value} onChange={onChange}
                style={{ ...S.input, ...(big ? { fontSize: 15, fontWeight: 600 } : {}) }} />
        </div>
    );
}

function SaveBtn({ onClick, label = "Save" }) {
    return (
        <button style={S.saveBtn} onClick={onClick}>✓ {label}</button>
    );
}

function SectionPill({ label, onEdit }) {
    return (
        <div style={S.pill}>
            <span style={S.pillLabel}>{label}</span>
            <button style={S.pillEdit} onClick={onEdit}><Pencil size={13} /></button>
        </div>
    );
}

function PreviewSection({ title, children, Icon }) {
    return (
        <div style={S.previewSection}>
            <div style={S.previewSectionHead}>
                {Icon && <Icon size={13} style={{ marginRight: 6, opacity: 0.7 }} />}
                <span style={S.previewSectionTitle}>{title}</span>
            </div>
            <div style={S.previewSectionRule} />
            {children}
        </div>
    );
}

function PreviewEntry({ title, sub, date, loc, desc }) {
    return (
        <div style={S.previewEntry}>
            <div style={S.previewEntryHead}>
                <span style={S.previewEntryTitle}>{title}</span>
                {date && <span style={S.previewEntryDate}>{date}{loc ? ` · ${loc}` : ""}</span>}
            </div>
            {sub && <p style={S.previewEntrySub}>{sub}</p>}
            {desc && <p style={S.previewBody}>{desc}</p>}
        </div>
    );
}

/* ════════════════════════════════════════════
   STYLES
════════════════════════════════════════════ */
const S = {
    root: {
        fontFamily: "'DM Sans', sans-serif",
        background: "#f5f1ed",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
    },

    Dnav: {
        position: "relative",
        height: 45,
    },

    /* NAV */
    nav: {
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 28px", height: 54,
        background: "#1a1412",
        position: 'fixed', left: 0, top: 88, right: 0, zIndex: 100
    },
    navLeft: { display: "flex", alignItems: "center", gap: 10 },
    navLogo: { fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#e8ddd4", letterSpacing: 2, fontStyle: "italic" },
    navDot: { color: "#c2344d", fontSize: 22, lineHeight: 1 },
    navTitle: { fontSize: 13, color: "#8a7d74", fontWeight: 400 },
    navRight: { display: "flex", gap: 10, alignItems: "center" },
    navBtn: { background: "none", border: "1px solid #3a2e2a", borderRadius: 8, padding: "6px 10px", color: "#8a7d74", cursor: "pointer" },
    downloadBtn: {
        display: "flex", alignItems: "center", gap: 6,
        background: "#c2344d", color: "#fff",
        border: "none", borderRadius: 8, padding: "8px 16px",
        fontSize: 13, fontWeight: 600, cursor: "pointer",
    },

    /* WORKSPACE */
    workspace: { display: "flex", flex: 1, minHeight: 0, position: 'relative', top: 0 },

    /* EDITOR */
    editor: {
        width: 300, minWidth: 280,
        background: "#fff",
        borderRight: "1px solid #ede8e3",
        overflowY: "auto",
    },
    editorInner: { padding: "24px 20px" },

    /* PERSONAL CARD */
    personalCard: { marginBottom: 20 },
    photoRing: {
        display: "block", width: 80, height: 80, borderRadius: "50%",
        overflow: "hidden", cursor: "pointer", margin: "0 auto 16px",
        border: "2px dashed #e0d8d0",
    },
    photoImg: { width: "100%", height: "100%", objectFit: "cover" },
    photoPlaceholder: {
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        background: "#fdf9f6",
    },
    photoHint: { fontSize: 9, color: "#b09090", marginTop: 4, fontWeight: 500 },
    personalFields: {},
    row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },

    /* SECTION PILLS */
    sectionsList: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 },
    pill: {
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "#fdf9f6", border: "1px solid #ede8e3",
        borderRadius: 10, padding: "10px 12px",
    },
    pillLabel: { fontSize: 12, fontWeight: 500, color: "#4a3f38" },
    pillEdit: { background: "none", border: "none", cursor: "pointer", color: "#c2344d", padding: 2 },

    /* ADD BTN */
    addBtn: {
        width: "100%", padding: "12px 0",
        background: "linear-gradient(135deg, #c2344d, #e05a72)",
        color: "#fff", border: "none", borderRadius: 12,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13, fontWeight: 600, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
    },

    /* PREVIEW */
    preview: {
        flex: 1, overflowY: "auto",
        padding: "36px 48px",
        display: "flex", justifyContent: "center",
    },
    page: {
        background: "#fff",
        width: "100%", maxWidth: 740,
        boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
        borderRadius: 4,
        overflow: "hidden",
        alignSelf: "flex-start",
    },
    pageHeader: {
        background: "#1a1412",
        padding: "32px 36px",
        display: "flex", alignItems: "center",
    },
    pageHeaderLeft: { display: "flex", alignItems: "center", gap: 20 },
    previewPhoto: { width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: "2px solid #c2344d" },
    previewName: {
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 32, fontWeight: 600, color: "#f0e8e0",
        margin: 0, letterSpacing: 0.5,
    },
    previewTitle: { fontSize: 13, color: "#c2344d", fontWeight: 500, margin: "4px 0 8px", letterSpacing: 0.5 },
    contactRow: { display: "flex", flexWrap: "wrap", gap: "4px 16px" },
    contactItem: { fontSize: 10, color: "#8a7d74", display: "flex", alignItems: "center" },

    pageBody: { padding: "24px 36px 36px" },

    /* PREVIEW SECTIONS */
    previewSection: { marginBottom: 20 },
    previewSectionHead: { display: "flex", alignItems: "center" },
    previewSectionTitle: {
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 16, fontWeight: 600, letterSpacing: 1,
        textTransform: "uppercase", color: "#1a1412",
    },
    previewSectionRule: { height: 1, background: "#c2344d", marginBottom: 12, opacity: 0.5 },

    previewEntry: { marginBottom: 12, paddingLeft: 0 },
    previewEntryHead: { display: "flex", justifyContent: "space-between", alignItems: "baseline" },
    previewEntryTitle: { fontSize: 13, fontWeight: 700, color: "#1a1412" },
    previewEntryDate: { fontSize: 10, color: "#9a8a82" },
    previewEntrySub: { fontSize: 12, color: "#c2344d", fontWeight: 500, margin: "2px 0 4px" },
    previewBody: { fontSize: 11, color: "#5a4e47", lineHeight: 1.7, margin: "4px 0 0" },

    /* SKILLS / LANG */
    skillsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px" },
    skillItem: {},
    skillTop: { display: "flex", justifyContent: "space-between", marginBottom: 3 },
    skillName: { fontSize: 11, fontWeight: 600, color: "#1a1412" },
    skillLevel: { fontSize: 9, color: "#9a8a82", textTransform: "uppercase", letterSpacing: 0.8 },
    skillBar: { height: 3, background: "#ede8e3", borderRadius: 3, overflow: "hidden", marginBottom: 3 },
    skillFill: { height: "100%", background: "#c2344d", borderRadius: 3 },
    skillInfo: { fontSize: 10, color: "#7a6e68", margin: "2px 0 0", lineHeight: 1.5 },
    langGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px 12px" },
    langItem: {},
    langName: { fontSize: 11, fontWeight: 700, color: "#1a1412", display: "block" },
    langLvl: { fontSize: 10, color: "#c2344d", fontWeight: 500 },
    certItem: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 },
    certName: { fontSize: 12, fontWeight: 600, color: "#1a1412" },
    certInfo: { fontSize: 10, color: "#9a8a82" },

    /* MODALS */
    overlay: {
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(20,14,10,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
    },
    modal: {
        background: "#fff",
        borderRadius: 16,
        padding: "28px 28px 24px",
        width: "100%", maxWidth: 540,
        maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
    },
    modalHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
    modalTitle: {
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 22, fontWeight: 600, color: "#1a1412", margin: 0,
    },
    closeBtn: { background: "none", border: "none", cursor: "pointer", color: "#9a8a82", padding: 4 },

    /* FORM */
    formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" },
    fieldLabel: { display: "block", fontSize: 11, fontWeight: 600, color: "#7a6e68", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 5 },
    input: {
        width: "100%", padding: "10px 14px",
        border: "1.5px solid #ede8e3",
        borderRadius: 10, fontSize: 13, color: "#1a1412",
        fontFamily: "'DM Sans', sans-serif",
        background: "#fdf9f6",
        outline: "none", boxSizing: "border-box",
    },
    textarea: {
        width: "100%", padding: "12px 14px",
        border: "1.5px solid #ede8e3",
        borderRadius: 10, fontSize: 12, color: "#1a1412",
        fontFamily: "'DM Sans', sans-serif",
        background: "#fdf9f6", resize: "vertical",
        outline: "none", height: 110, boxSizing: "border-box",
        marginBottom: 8,
    },
    levelBtns: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 },
    levelBtn: {
        padding: "7px 14px", borderRadius: 8, fontSize: 11, fontWeight: 500,
        border: "1.5px solid #ede8e3", background: "#fdf9f6", cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
    },
    levelBtnActive: { background: "#c2344d", borderColor: "#c2344d", color: "#fff" },
    customizeLink: { background: "none", border: "none", fontSize: 12, color: "#c2344d", cursor: "pointer", padding: "0 0 10px", fontFamily: "'DM Sans', sans-serif" },
    saveBtn: {
        width: "100%", padding: "13px 0",
        background: "linear-gradient(135deg, #c2344d, #e05a72)",
        color: "#fff", border: "none", borderRadius: 12,
        fontSize: 14, fontWeight: 600, cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif", marginTop: 8,
    },

    /* ADD CONTENT MODAL */
    addGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
    addCard: {
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 16px",
        background: "#fdf9f6", border: "1.5px solid #ede8e3",
        borderRadius: 12, fontSize: 13, fontWeight: 500, color: "#1a1412",
        cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
    },

    /* ICON PICKER */
    iconBtn: {
        width: 50, height: 50, borderRadius: 12,
        background: "#fdf9f6", border: "1.5px solid #ede8e3",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
    },
    iconPicker: {
        position: "absolute", top: 60, left: 0, zIndex: 300,
        background: "#fff", borderRadius: 14, padding: 16,
        boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
        width: 220,
    },
    iconPickerBtn: {
        padding: 8, borderRadius: 8, background: "none", border: "none",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    },
    iconPickerBtnActive: { background: "#fde8ec", color: "#c2344d" },
    toggle: {
        width: 38, height: 22, borderRadius: 20, border: "none",
        cursor: "pointer", position: "relative",
    },
    toggleDot: {
        position: "absolute", top: 3, width: 16, height: 16,
        background: "#fff", borderRadius: "50%", transition: "left 0.2s",
    },
};