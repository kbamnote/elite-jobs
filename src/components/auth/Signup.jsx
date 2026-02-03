import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signup } from '../../utils/Api';
import Cookies from 'js-cookie';
import logo from '../../assets/ejLogo.png';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'jobSeeker'
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [flicker, setFlicker] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await signup(formData);
      const { token, user } = response.data.data;

      Cookies.set('token', token);
      Cookies.set('role', user.role);

      if (user.role === 'jobSeeker') navigate('/onboarding');
      else if (user.role === 'jobHoster') navigate('/hosting/onboarding');
      else navigate('/recruiter/onboarding');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${import.meta.env.VITE_API_URL ||
      'https://api.eliteindiajobs.com'
      }/auth/google`;
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const googleId = params.get('googleId');
    const email = params.get('email');
    const name = params.get('name');

    if (googleId && email && name) {
      navigate(
        `/google-role-selection?googleId=${googleId}&email=${email}&name=${name}`
      );
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      {/* LEFT FORM SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-16">
        <div className="w-full max-w-2xl">

          <div className="bg-white/80 animate-[infinite-pop_1.5s_ease-in-out_infinite] backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50">

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-slate-700 bg-clip-text text-transparent mb-4">
                Create Account
              </h2>
              <p className="text-lg text-gray-600 font-medium">
                Join India's elite job network
              </p>
            </div>
            <div className="animate-[pop-up-down_0.8s_ease-out] animate-[gentle-float_2.5s_ease-in-out_infinite]">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                    <span className="text-sm text-red-800 font-medium">{error}</span>
                  </div>
                )}

                {/* Name */}
                <input
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/50 border-b-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition-all"
                />

                {/* Email */}
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/50 border-b-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition-all"
                />

                {/* Password */}
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-12 bg-white/50 border-b-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    👁
                  </button>
                </div>

                {/* Role */}
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/50 border-b-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition-all"
                >
                  <option value="jobSeeker">Job Seeker</option>
                  <option value="jobHoster">Job Hoster</option>
                  <option value="recruiter">Recruiter</option>
                </select>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  {loading ? 'Signing up...' : 'Join Elite Network'}
                </button>
              </form>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google */}
            <button
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl bg-white border shadow hover:shadow-lg transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5"
                alt="google"
              />
              Continue with Google
            </button>

            <div className="lg:hidden flex mt-6 justify-center gap-2 items-center text-md text-blue-800">
              <span>Already have an account?</span>
              <a
                onClick={(e) => { e.preventDefault(); setFlicker(true); setTimeout(() => navigate('/login'), 600); }}
                className={`inline-flex items-center gap-2 hover:scale-105 transition-all duration-300 font-semibold ${flicker ? 'animate-flicker' : ''}`}
              >
                Sign in →
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT BRANDING SECTION */}
      <div className="hidden lg:flex w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-l from-[#E94560]/50 via-[#E94560]/30 to-transparent" />

        <div className="relative w-full flex flex-col items-center justify-center text-white px-10">

          {/* Logo Card */}
          <div className="mb-8">
            <a href="/" className='flex justify-center align-center'>
              <img src={logo} alt="Elite Jobs Logo" className="h-42 md:h-80 w-auto bg-white shadow-lg rounded-xl" />
            </a>
          </div>

          {/* Text */}
          <div className="text-center max-w-md">
            <h2 className="text-3xl font-bold leading-snug mb-4">
              Build Your Future,
              <br />Join the Elite Network
            </h2>

            <div className="flex justify-center gap-2 mt-6">
              <span className="w-8 h-2 bg-white rounded-full" />
              <span className="w-4 h-2 bg-white/50 rounded-full" />
              <span className="w-4 h-2 bg-white/50 rounded-full" />
            </div>

            <div className="mt-6 flex flex-col items-center gap-3 text-md font-semibold text-gray-500">
              <span>Already have an account?</span>
              <a
                onClick={(e) => { e.preventDefault(); setFlicker(true); setTimeout(() => navigate('/login'), 600); }}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:scale-105
               transition-all duration-300 font-semibold ${flicker ? 'animate-flicker' : ''}`}
              >
                Sign in →
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;
