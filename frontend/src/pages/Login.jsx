import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

function Login() {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success("Registered successfully!");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success("Logged in successfully!");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center w-full sm:max-w-lg m-auto min-h-[70vh]"> {/* Adjusted height */}
      {/* Welcome Image */}
      <img src={assets.welcome} alt="Welcome" className="w-full h-48 object-cover mb-6 rounded-lg" />

      {/* Login Form */}
      <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 gap-4 text-gray-500 px-6 py-8 bg-white shadow-lg rounded-lg">
        <div className="inline-flex items-center gap-2 mb-2 mt-1">
          <p className="text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        {currentState === "Sign Up" && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg"
            placeholder="Name"
            required
          />
        )}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg"
          placeholder="Email"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg"
          placeholder="Password"
          required
        />

        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot your password?</p>
          {currentState === "Login" ? (
            <p className="cursor-pointer" onClick={() => setCurrentState("Sign Up")}>
              Create account
            </p>
          ) : (
            <p className="cursor-pointer" onClick={() => setCurrentState("Login")}>
              Login Here
            </p>
          )}
        </div>
        <button type="submit" className="bg-black text-white font-semibold px-8 py-2 mt-4 rounded-lg shadow-lg hover:bg-gray-800 transition duration-200 ease-in-out">
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Login;
