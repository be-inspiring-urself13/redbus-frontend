//frontend/src/components/Navbar.jsx
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaBars,
  FaUserCircle,
  FaList,
  FaQuestionCircle,
} from "react-icons/fa";
import logo from "../assets/Logo.png";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast("You're logged out", {
      icon: "👋🏻",
    });
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 z-50">
      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* LEFT – LOGO */}
        <div className="flex items-center gap-8">
          <Link to="/">
            <img src={logo} alt="redbus" className="h-14" />
          </Link>

          {/* DESKTOP TAB */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/buses")}
              className="text-red-600 font-semibold border-b-2 border-red-600 pb-1 cursor-pointer"
            >
              Bus Tickets
            </button>

          </div>
        </div>

        {/* RIGHT – DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            to="/bookings"
            className="flex items-center gap-2 hover:text-red-600"
          >
            <FaList size={18} />
            Bookings
          </Link>

          <Link
            to="/help"
            className="flex items-center gap-2 hover:text-red-600"
          >
            <FaQuestionCircle size={18} />
            Help
          </Link>

          {/* LOGIN / LOGOUT */}
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 hover:text-red-600"
            >
              <FaUserCircle size={18} />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 hover:text-red-600"
            >
              <FaUserCircle size={18} />
              Account
            </Link>
          )}
        </div>

        {/* MOBILE MENU ICON */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(true)}>
            <FaBars size={22} />
          </button>
        </div>
      </div>

      {/* MOBILE BACKDROP */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* MOBILE SLIDE MENU */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white z-50 transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-5">
          <button
            className="mb-6 text-right w-full text-xl"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>

          <div className="flex flex-col gap-5 text-sm font-medium">
            <span className="text-red-600 font-semibold">Bus Tickets</span>

            <Link to="/bookings" onClick={() => setMenuOpen(false)}>
              Bookings
            </Link>

            <Link to="/help" onClick={() => setMenuOpen(false)}>
              Help
            </Link>

            {/* MOBILE LOGIN / LOGOUT */}
            {user ? (
              <button
                onClick={handleLogout}
                className="text-left text-red-600"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Account
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

