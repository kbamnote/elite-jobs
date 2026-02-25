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
    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const navigate = useNavigate();

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
                <div className="border-2 border-dashed border-gray-400 rounded-xl h-[360px] flex flex-col items-center justify-center text-gray-600 cursor-pointer hover:border-gray-600 transition">
                    <Plus size={40} />
                    <span className="mt-2 font-medium">New resume</span>
                </div>

                {/* Resume Card */}
                <div className="relative">
                    {/* Card */}
                    <div className="group relative bg-white rounded-xl h-[360px] shadow-sm overflow-hidden">
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                                onClick={() => navigate("/resumes/edit")}
                                className="flex items-center gap-2 font-semibold text-[#0f0b2d] hover:underline"
                            >
                                VIEW RESUME <ArrowRight size={18} />
                            </button>

                            <div className="my-10 w-24 h-[2px] bg-gray-300" />

                            <button className="flex items-center gap-2 text-sm font-semibold text-[#0f0b2d] hover:underline">
                                DUPLICATE <Copy size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-3 flex items-start justify-between relative">
                        <div>
                            <p className="font-semibold text-[#0f0b2d]">Resume 1</p>
                            <p className="text-sm text-gray-500">
                                edited 11 mins ago • A4
                            </p>
                        </div>

                        {/* 3-dot button */}
                        <button
                            ref={buttonRef}
                            onClick={() => setOpenMenu((prev) => !prev)}
                            className="p-2 rounded-md hover:bg-gray-200"
                        >
                            <MoreVertical size={18} />
                        </button>

                        {/* Dropdown Menu */}
                        {openMenu && (
                            <div
                                ref={menuRef}
                                className="absolute right-0 bottom-14 w-56 bg-white rounded-xl shadow-lg border z-50"
                            >
                                <MenuItem icon={<Pencil size={18} />} text="Edit title" />
                                <MenuItem icon={<Copy size={18} />} text="Duplicate" />
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
                                />
                                <MenuItem
                                    icon={<Trash2 size={18} />}
                                    text="Delete"
                                    danger
                                />
                            </div>
                        )}
                    </div>
                </div>
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