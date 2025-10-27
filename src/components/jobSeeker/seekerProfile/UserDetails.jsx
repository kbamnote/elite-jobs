import React, { useState } from "react";
import Header from "../commonSeeker/Header";
import Footer from "../commonSeeker/Footer";

const UserDetails = () => {
  const [form, setForm] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1 555-123-4567",
    location: "San Francisco, CA",
    headline: "Frontend Developer",
    skills: "React, TypeScript, Tailwind, Node.js",
    summary: "Passionate developer building accessible, performant web apps.",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Profile saved (UI-only).");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Edit Profile</h1>
          {message && <div className="mb-4 text-teal-700">{message}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Name</label>
                <input name="name" value={form.name} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Location</label>
                <input name="location" value={form.location} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Headline</label>
              <input name="headline" value={form.headline} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Skills</label>
              <input name="skills" value={form.skills} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Summary</label>
              <textarea name="summary" value={form.summary} onChange={handleChange} rows={4} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
            </div>

            <div className="flex justify-end">
              <button type="submit" className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700">Save</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDetails;