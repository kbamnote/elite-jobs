import React, { useState } from "react";
import Header from "../commonSeeker/Header";
import Footer from "../commonSeeker/Footer";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password || !confirmPassword) {
      setError("Please complete all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Design-only: simulate success
    setSuccess("Account created (UI-only).");
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'var(--font-body)' }}>
     
      <div className="max-w-md mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-body)' }}>Signup</h1>
          {error && <div className="mb-4 text-red-600" style={{ fontFamily: 'var(--font-body)' }}>{error}</div>}
          {success && <div className="mb-4" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-body)' }}>{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-body)' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                style={{ fontFamily: 'var(--font-body)' }}
                onFocus={(e) => {
                  e.target.style.boxShadow = '0 0 0 2px var(--color-accent-light)';
                  e.target.style.borderColor = 'var(--color-accent)';
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = 'none';
                  e.target.style.borderColor = '#d1d5db';
                }}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-body)' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                style={{ fontFamily: 'var(--font-body)' }}
                onFocus={(e) => {
                  e.target.style.boxShadow = '0 0 0 2px var(--color-accent-light)';
                  e.target.style.borderColor = 'var(--color-accent)';
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = 'none';
                  e.target.style.borderColor = '#d1d5db';
                }}
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-body)' }}>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                style={{ fontFamily: 'var(--font-body)' }}
                onFocus={(e) => {
                  e.target.style.boxShadow = '0 0 0 2px var(--color-accent-light)';
                  e.target.style.borderColor = 'var(--color-accent)';
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = 'none';
                  e.target.style.borderColor = '#d1d5db';
                }}
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 text-white rounded-lg transition-colors font-medium"
              style={{ 
                backgroundColor: 'var(--color-accent)',
                fontFamily: 'var(--font-body)'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-accent-dark)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-accent)'}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
     
    </div>
  );
};

export default Signup;