import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png"; // Adjust the path as needed

const Navbar = () => {
  return (
    <div className="bg-yellow-500 p-4 flex justify-between items-center">
      {/* Logo on the left */}
      <div className="text-2xl text-white font-bold">Fleet Guardian</div>

      {/* Navigation buttons */}
      <div className="hidden md:flex gap-6">
        <Link to="/dashboard">
          <button className="text-white hover:bg-yellow-600 px-4 py-2 rounded-lg cursor-pointer">
            Home
          </button>
        </Link>
        <Link to="/MoreStatistics">
          <button className="text-white hover:bg-yellow-600 px-4 py-2 rounded-lg cursor-pointer">
            Statistics
          </button>
        </Link>
        <Link to="/aboutUs">
          <button className="text-white hover:bg-yellow-600 px-4 py-2 rounded-lg cursor-pointer">
            About Us
          </button>
        </Link>
        <Link to="/profile">
          <button className="text-white hover:bg-yellow-600 px-4 py-2 rounded-lg cursor-pointer">
            Profile
          </button>
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center">
        <button className="text-white text-2xl">☰</button>
      </div>

      {/* Logo on the right */}
      <Link to="/dashboard">
        <img
          src={logo}
          alt="Logo"
          className="w-12 h-12 rounded-full"
        />
      </Link>
    </div>
  );
};

export default Navbar;
