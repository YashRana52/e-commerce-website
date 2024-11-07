import React from "react";
import { assets } from "../assets/assets";

function Navbar({ setToken }) {
  return (
    <div className="flex items-center justify-between py-4 px-6 shadow-md rounded-lg bg-transparent"> {/* Navbar with transparent background */}
      <div className="flex items-center mr-6"> {/* Container for logo */}
        <img
          className="h-auto w-auto object-cover" // Image displays at its original size
          src={assets.logo}
          alt="Logo"
        />
      </div>
      <button
        onClick={() => setToken('')}
        className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-full text-sm transition duration-300 ease-in-out transform hover:scale-105"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
