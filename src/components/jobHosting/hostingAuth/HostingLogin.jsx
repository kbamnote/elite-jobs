import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const HostingLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Static design-only mode - simulate login
    if (email && password) {
      setSuccess("Login successful! (Design-only mode)");
      setError(null);
      
      // Simulate navigation after a short delay
      setTimeout(() => {
        navigate("/hostingDashboard");
      }, 1500);
    } else {
      setError("Please fill in all fields.");
      setSuccess(null);
    }
  };

  // Handle Google login redirect for job hosters
  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth endpoint with jobHoster role
    window.location.href = `${import.meta.env.VITE_API_URL || 'https://elite-jobs-backend.onrender.com'}/auth/google?role=jobHoster`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-5xl">
        {/* Left section - hidden on mobile, visible on md and up */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-r from-teal-700 via-teal-700 to-teal-700 text-white flex-col justify-center items-center p-8 rounded-l-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            Welcome back!
          </h2>
          <p className="text-center text-base md:text-lg px-4">
            Welcome back! We are so happy to have you here. It's great to see
            you again. We hope you had a safe and enjoyable time away.
          </p>
        </div>

        {/* Right section - full width on mobile, half width on md and up */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Sign In
          </h2>
          <form
            onSubmit={handleLogin}
            className="space-y-4 max-w-md mx-auto w-full"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              <label htmlFor="showPassword" className="text-gray-700 text-sm">
                Show Password
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-700 hover:bg-teal-600 text-white py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-300 mt-6"
            >
              Sign in
            </button>
            {error && (
              <div className="text-red-500 text-sm mt-2 text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="text-teal-800 text-sm mt-2 text-center">
                {success}
              </div>
            )}
          </form>
          
          {/* Google Login Button */}
          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="mt-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span>Sign in with Google</span>
              </button>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm">
            No account yet?{" "}
            <Link
              to="/host-signup"
              className="text-teal-600 hover:text-teal-500"
            >
              Signup.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostingLogin;