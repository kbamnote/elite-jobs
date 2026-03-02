import { useLocation } from "react-router-dom";

export function ResumeIcon() {
    const location = useLocation();

    // Hide icon when on /resumes page
    if (location.pathname === "/resumes") {
        return null;
    }

    return (
        <a href="/resumes" className="resume-icon-link">
            <div className="resume-icon fixed bottom-28 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-blue-600 transition duration-300">
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        x="4"
                        y="2"
                        width="16"
                        height="20"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <line x1="8" y1="7" x2="16" y2="7" stroke="currentColor" strokeWidth="2" />
                    <line x1="8" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="2" />
                    <line x1="8" y1="15" x2="13" y2="15" stroke="currentColor" strokeWidth="2" />
                    <path d="M15 14l4 4" stroke="currentColor" strokeWidth="2" />
                    <path d="M17 12v4h4" stroke="currentColor" strokeWidth="2" />
                </svg>
            </div>
        </a>
    );
};

export default ResumeIcon;