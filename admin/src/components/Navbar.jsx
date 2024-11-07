import React from "react";
import { assets } from "../assets/assets";

function Navbar({setToken}) {
  return (
    <div className="flex items-center justify-between py-4 px-6 bg-white shadow-md rounded-lg"> {/* Navbar styles */}
      <div className="flex flex-col items-start mr-6"> {/* Container for logo and text */}
        <img
          className="w-16 h-16 rounded-full object-cover mb-1" // Set a fixed size for the logo
          src={assets.logo1}
          alt="Logo"
        />
        <span className="text-xl font-bold text-gray-800">Admin Panel</span> 
      </div>
      <button onClick={()=>setToken('')} className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-full text-sm transition duration-300 ease-in-out transform hover:scale-105">Logout</button> {/* Stylish button */}
    </div>
  );
}

export default Navbar;
