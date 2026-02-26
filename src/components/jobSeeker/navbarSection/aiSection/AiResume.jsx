import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AiResume = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        // Redirect to the new resume editor
        navigate('/resumes');
    }, [navigate]);
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Redirecting...</h1>
                <p className="text-gray-600">You are being redirected to the new Resume Editor</p>
            </div>
        </div>
    );
};

export default AiResume;