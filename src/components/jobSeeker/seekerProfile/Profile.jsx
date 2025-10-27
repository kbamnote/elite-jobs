import React, { useState } from "react";
import Header from "../commonSeeker/Header";
import Footer from "../commonSeeker/Footer";
import { Link } from "react-router-dom";

const Profile = () => {
  const [message, setMessage] = useState("");

  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1 555-123-4567",
    location: "San Francisco, CA",
    experience: "3 years",
    skills: ["React", "Node.js", "TypeScript", "Tailwind"],
  };

  const handleDelete = () => {
    setMessage("Account deletion is disabled in UI-only mode.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Profile</h1>
            <div className="space-x-3">
              <Link to="/user-detail">
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">Edit Profile</button>
              </Link>
              <button onClick={handleDelete} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Delete Account</button>
            </div>
          </div>

          {message && <div className="mb-4 text-teal-700">{message}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-lg font-semibold text-gray-900">{user.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-semibold text-gray-900">{user.email}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-lg font-semibold text-gray-900">{user.phone}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Location</p>
              <p className="text-lg font-semibold text-gray-900">{user.location}</p>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <p className="text-sm text-gray-500">Experience</p>
              <p className="text-lg font-semibold text-gray-900">{user.experience}</p>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <p className="text-sm text-gray-500">Skills</p>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((s) => (
                  <span key={s} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">{s}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link to="/my-jobs">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">View My Applications</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;