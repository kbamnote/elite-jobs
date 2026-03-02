import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AiResume = () => {
    const navigate = useNavigate();
    const [showInstructions, setShowInstructions] = useState(true);
    
    const handleStartEditing = () => {
        setShowInstructions(false);
        // Small delay to show the transition
        setTimeout(() => {
            navigate('/resumes');
        }, 300);
    };
    
    if (!showInstructions) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Loading Resume Editor...</h1>
                    <p className="text-gray-600">Preparing your AI-powered resume editing experience</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        AI Resume Builder
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Create a professional resume with AI assistance. Follow these steps to build your perfect resume.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Step 1 */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg mr-4">1</div>
                            <h2 className="text-xl font-bold text-gray-900">Create Your Profile</h2>
                        </div>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span>Fill in your personal information</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span>Add your professional summary</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span>Include your contact details</span>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Step 2 */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg mr-4">2</div>
                            <h2 className="text-xl font-bold text-gray-900">Add Work Experience</h2>
                        </div>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                <span>List your previous jobs</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                <span>Include job titles and dates</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                <span>Describe your responsibilities</span>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Step 3 */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-lg mr-4">3</div>
                            <h2 className="text-xl font-bold text-gray-900">Education & Skills</h2>
                        </div>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start">
                                <span className="text-purple-500 mr-2">•</span>
                                <span>Add your educational background</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-500 mr-2">•</span>
                                <span>List your technical skills</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-500 mr-2">•</span>
                                <span>Include certifications</span>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Step 4 */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg mr-4">4</div>
                            <h2 className="text-xl font-bold text-gray-900">AI Enhancement</h2>
                        </div>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start">
                                <span className="text-orange-500 mr-2">•</span>
                                <span>Use AI suggestions to improve content</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-orange-500 mr-2">•</span>
                                <span>Optimize for ATS compatibility</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-orange-500 mr-2">•</span>
                                <span>Preview and download your resume</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="bg-blue-50 rounded-2xl p-8 mb-8">
                    <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Important Tips
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-semibold text-blue-800 mb-2">Before You Start:</h4>
                            <ul className="space-y-1 text-blue-700 text-sm">
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2">✓</span>
                                    <span>Have your work history ready</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2">✓</span>
                                    <span>Prepare a list of your skills</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2">✓</span>
                                    <span>Think about your career goals</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-blue-800 mb-2">While Editing:</h4>
                            <ul className="space-y-1 text-blue-700 text-sm">
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2">✓</span>
                                    <span>Use action verbs in descriptions</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2">✓</span>
                                    <span>Quantify your achievements</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2">✓</span>
                                    <span>Keep it concise and professional</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="text-center">
                    <button
                        onClick={handleStartEditing}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center mx-auto"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Start Building Your Resume
                    </button>
                    <p className="text-gray-500 mt-4">Click above to begin creating your professional resume</p>
                </div>
            </div>
        </div>
    );
};

export default AiResume;