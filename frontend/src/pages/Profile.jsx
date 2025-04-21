import React from "react";
import profile from "../assets/profile.jpeg"
import { useNavigate } from "react-router-dom";


const Profile = () => {
    const user = {
        name: "Guest",
        email: "anish@example.com",
        role: "Driver",
        joined: "January 2024",
        avatar: profile,
    };
    
    const navigate = useNavigate();
    return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 md:flex md:items-center transition-all duration-300 ease-in-out">
        {/* Left: Avatar */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start mb-6 md:mb-0">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-40 h-40 rounded-full border-4 border-yellow-300 shadow-lg transition-transform hover:scale-105"
          />
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-2/3 md:pl-10 text-center md:text-left">
          <h2 className="text-4xl font-bold text-yellow-600 mb-2">
            {user.name}
          </h2>
          <p className="text-gray-700 text-lg">{user.email}</p>
          <p className="text-gray-600 mt-2">Role: <span className="font-medium">{user.role}</span></p>
          <p className="text-gray-500 text-sm mt-1">Joined: {user.joined}</p>

          <div className="mt-6 flex justify-center md:justify-start gap-4">
            <button onClick={() => navigate('/auth')} className="px-6 py-2 cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl shadow-sm transition">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
