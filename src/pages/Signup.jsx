//frontend/src/pages/Signup.jsx
import { useContext, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import bg from "../assets/bg.jpeg";
import illustration from "../assets/signup1.webp";

// Regex validations
const nameRegex = /^[a-zA-Z ]+$/;
const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const { name, email, password, confirm } = form;

    // 🔴 Basic validations
    if (!name || !email || !password || !confirm) {
      toast.error("Please fill all fields");
      return;
    }

    if (!nameRegex.test(name)) {
      toast.error("Name should contain only letters");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Enter a valid Gmail address");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    // 🟢 Call AuthContext signup
    try {
      await signup(name, email, password);

      toast.success("Signup successful. Please login");
      navigate("/login");

    } catch (err) {
      const msg = err?.response?.data?.message;

      if (msg === "User already exists") {
        toast.error("User already exists. Please login");
        setTimeout(() => navigate("/login"), 800);
      } else {
        toast.error(msg || "Signup failed. Try again");
      }
    }
  };

  
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Glass Card */}
      <div className="w-full max-w-4xl bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden border border-white/30">

        {/* LEFT – FORM */}
        <div className="p-8 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">Sign Up</h2>

          {/* Name */}
          <div className="flex items-center border-b border-white/60 mb-6 pb-2">
            <FaUser className="mr-3 opacity-80" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="bg-transparent w-full outline-none placeholder-white/70"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border-b border-white/60 mb-6 pb-2">
            <FaEnvelope className="mr-3 opacity-80" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent w-full outline-none placeholder-white/70"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border-b border-white/60 mb-6 pb-2">
            <FaLock className="mr-3 opacity-80" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="bg-transparent w-full outline-none placeholder-white/70"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border-b border-white/60 mb-8 pb-2">
            <FaLock className="mr-3 opacity-80" />
            <input
              type="password"
              name="confirm"
              placeholder="Confirm Password"
              value={form.confirm}
              onChange={handleChange}
              className="bg-transparent w-full outline-none placeholder-white/70"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleSignup}
            className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Create Account
          </button>

          {/* Login link */}
          <p className="text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline font-semibold">
              Login
            </Link>
          </p>
        </div>

        {/* RIGHT – IMAGE */}
        <div className="hidden md:flex items-center justify-center p-6">
          <img src={illustration} alt="signup" className="max-h-80" />
        </div>
      </div>
    </div>
  );
}