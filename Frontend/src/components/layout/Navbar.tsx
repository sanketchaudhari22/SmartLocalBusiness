import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: "🏠 Home", path: "/" },
    { label: "🏢 Businesses", path: "/businesses" },
    { label: "🔍 Search", path: "/search" },
    { label: "📅 Dashboard", path: "/dashboard" },
    { label: "🛎️ Booking", path: "/booking/create" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#667eea] via-[#6b63ce] to-[#764ba2] shadow-lg text-white backdrop-blur-xl transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-extrabold cursor-pointer flex items-center gap-2 hover:opacity-90 transition-all"
        >
          <Sparkles className="text-yellow-300 animate-pulse w-6 h-6" />
          <span>Smart</span>
          <span className="text-yellow-300">Finder</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-semibold">
          {navLinks.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              className="hover:text-yellow-300 transition duration-300"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="bg-white text-[#667eea] font-semibold px-5 py-2 rounded-xl shadow hover:bg-gray-100 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-yellow-400 text-[#333] font-semibold px-5 py-2 rounded-xl shadow hover:bg-yellow-500 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#6b63ce] border-t border-purple-400 px-6 py-5 space-y-4 animate-slideDown">
          {[...navLinks, { label: "Login", path: "/login" }, { label: "Sign Up", path: "/register" }].map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              onClick={() => setMenuOpen(false)}
              className="block text-lg font-medium hover:text-yellow-300 transition"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
