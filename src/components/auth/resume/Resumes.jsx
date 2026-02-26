import { useState, useRef, useEffect } from "react";
import {
    Plus,
    MoreVertical,
    Copy,
    ArrowRight,
    Pencil,
    Trash2,
    Languages,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Resumes() {
    const [openMenu, setOpenMenu] = useState(null); // Changed to track which menu is open
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const navigate = useNavigate();
    
    // Sample resume data
    const [resumes, setResumes] = useState([
        {
            id: 1,
            title: "Resume 1",
            lastEdited: "11 mins ago",
            size: "A4",
            created: new Date(),
        }
    ]);
    
    const [editingTitle, setEditingTitle] = useState(null);
    const [newTitle, setNewTitle] = useState("");

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target)
            ) {
                setOpenMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle creating a new resume
    const handleNewResume = () => {
        // Navigate to the resume editor to create a new resume
        navigate("/resumes/edit");
    };
    
    // Handle duplicating a resume
    const handleDuplicateResume = (resumeId) => {
        const resumeToDuplicate = resumes.find(r => r.id === resumeId);
        if (resumeToDuplicate) {
            const newResume = {
                ...resumeToDuplicate,
                id: Date.now(),
                title: `${resumeToDuplicate.title} (Copy)`,
                lastEdited: "Just now",
                created: new Date(),
            };
            setResumes([...resumes, newResume]);
        }
        setOpenMenu(null);
    };
    
    // Handle deleting a resume
    const handleDeleteResume = (resumeId) => {
        if (window.confirm("Are you sure you want to delete this resume?")) {
            setResumes(resumes.filter(r => r.id !== resumeId));
        }
        setOpenMenu(null);
    };
    
    // Handle renaming a resume
    const handleRenameResume = (resumeId) => {
        const resume = resumes.find(r => r.id === resumeId);
        if (resume) {
            setNewTitle(resume.title);
            setEditingTitle(resumeId);
        }
    };
    
    // Save the new title
    const saveNewTitle = (resumeId) => {
        setResumes(resumes.map(r => 
            r.id === resumeId ? {...r, title: newTitle, lastEdited: "Just now"} : r
        ));
        setEditingTitle(null);
        setNewTitle("");
    };
    
    // Handle AI translation (placeholder)
    const handleAItranslate = (resumeId) => {
        console.log(`Translating resume ${resumeId}`); // Use the parameter
        alert("AI Translation feature coming soon!");
        setOpenMenu(null);
    };
    
    // Open specific menu
    const openSpecificMenu = (resumeId) => {
        setOpenMenu(resumeId);
    };
    
    // Handle menu item clicks
    const handleMenuItemClick = (action, resumeId) => {
        switch(action) {
            case 'edit':
                handleRenameResume(resumeId);
                break;
            case 'duplicate':
                handleDuplicateResume(resumeId);
                break;
            case 'translate':
                handleAItranslate(resumeId);
                break;
            case 'delete':
                handleDeleteResume(resumeId);
                break;
            default:
                break;
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f5ef] px-10 py-12">
            {/* Header */}
            <h1 className="text-3xl font-bold text-[#0f0b2d]">My Resumes</h1>
            <p className="mt-2 text-gray-600">
                Your first resume is free forever. Need more than one resume?{" "}
                <span className="underline cursor-pointer font-medium">
                    Upgrade your plan
                </span>
            </p>

            {/* Resume Grid */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {/* New Resume */}
                <div 
                    className="border-2 border-dashed border-gray-400 rounded-xl h-[360px] flex flex-col items-center justify-center text-gray-600 cursor-pointer hover:border-gray-600 transition hover:bg-gray-50"
                    onClick={handleNewResume}
                >
                    <Plus size={40} />
                    <span className="mt-2 font-medium">New resume</span>
                </div>

                {/* Render resume cards */}
                {resumes.map((resume) => (
                    <div key={resume.id} className="relative">
                        {/* Card */}
                        <div className="group relative bg-white rounded-xl h-[360px] shadow-sm overflow-hidden">
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                    onClick={() => navigate(`/resumes/edit?id=${resume.id}`)}
                                    className="flex items-center gap-2 font-semibold text-[#0f0b2d] hover:underline"
                                >
                                    VIEW RESUME <ArrowRight size={18} />
                                </button>

                                <div className="my-10 w-24 h-[2px] bg-gray-300" />

                                <button 
                                    onClick={() => handleDuplicateResume(resume.id)}
                                    className="flex items-center gap-2 text-sm font-semibold text-[#0f0b2d] hover:underline"
                                >
                                    DUPLICATE <Copy size={16} />
                                </button>
                            </div>
                            
                            {/* Placeholder for resume preview - could be an actual preview */}
                            <div className="p-4 h-full flex flex-col justify-center items-center text-center">
                                <div className="w-16 h-20 border-2 border-gray-200 rounded-sm mb-3 flex items-center justify-center">
                                    <span className="text-xs text-gray-500">Resume Preview</span>
                                </div>
                                <p className="text-gray-700 font-medium truncate w-full">{resume.title}</p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-3 flex items-start justify-between relative">
                            {editingTitle === resume.id ? (
                                <div className="flex items-center gap-2 flex-1">
                                    <input
                                        type="text"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        onBlur={() => saveNewTitle(resume.id)}
                                        onKeyDown={(e) => e.key === 'Enter' && saveNewTitle(resume.id)}
                                        className="border border-gray-300 rounded px-2 py-1 text-sm flex-1"
                                        autoFocus
                                    />
                                    <button 
                                        onClick={() => saveNewTitle(resume.id)}
                                        className="text-green-600"
                                    >
                                        ✓
                                    </button>
                                </div>
                            ) : (
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-[#0f0b2d] truncate">{resume.title}</p>
                                    <p className="text-sm text-gray-500 truncate">
                                        edited {resume.lastEdited} • {resume.size}
                                    </p>
                                </div>
                            )}

                            {/* 3-dot button */}
                            <button
                                ref={buttonRef}
                                onClick={() => openSpecificMenu(resume.id)}
                                className="p-2 rounded-md hover:bg-gray-200"
                            >
                                <MoreVertical size={18} />
                            </button>

                            {/* Dropdown Menu */}
                            {openMenu === resume.id && (
                                <div
                                    ref={menuRef}
                                    className="absolute right-0 bottom-14 w-56 bg-white rounded-xl shadow-lg border z-50"
                                >
                                    <MenuItem 
                                        icon={<Pencil size={18} />} 
                                        text="Edit title" 
                                        onClick={() => handleMenuItemClick('edit', resume.id)}
                                    />
                                    <MenuItem 
                                        icon={<Copy size={18} />} 
                                        text="Duplicate" 
                                        onClick={() => handleMenuItemClick('duplicate', resume.id)}
                                    />
                                    <MenuItem
                                        icon={<Languages size={18} />}
                                        text={
                                            <span className="flex items-center gap-2">
                                                AI translate
                                                <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                                                    Beta
                                                </span>
                                            </span>
                                        }
                                        onClick={() => handleMenuItemClick('translate', resume.id)}
                                    />
                                    <MenuItem
                                        icon={<Trash2 size={18} />}
                                        text="Delete"
                                        danger
                                        onClick={() => handleMenuItemClick('delete', resume.id)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Resumes;

function MenuItem({ icon, text, danger }) {
    return (
        <button
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-gray-100 ${danger ? "text-red-600" : "text-gray-800"
                }`}
        >
            {icon}
            {text}
        </button>
    );
}