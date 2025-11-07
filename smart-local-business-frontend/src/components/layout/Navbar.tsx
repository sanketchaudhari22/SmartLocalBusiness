import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-surface border-b border-border shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-semibold text-primary-700 cursor-pointer hover:text-primary-800 transition-all"
        >
          Smart<span className="text-accent">Finder</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-medium text-text">
          <Link
            to="/"
            className="hover:text-primary-600 transition-all duration-200"
          >
            Home
          </Link>
          <Link
            to="/businesses"
            className="hover:text-primary-600 transition-all duration-200"
          >
            Businesses
          </Link>
          <Link
            to="/search"
            className="hover:text-primary-600 transition-all duration-200"
          >
            Search
          </Link>
          <Link
            to="/dashboard"
            className="hover:text-primary-600 transition-all duration-200"
          >
            Dashboard
          </Link>
        </div>

        {/* Right side buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="border border-primary-500 text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-all"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile menu */}
        <button
          className="md:hidden text-primary-600 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-border px-6 py-4 space-y-4 text-text">
          {["Home", "Businesses", "Search", "Dashboard", "Login", "Sign Up"].map(
            (label) => (
              <Link
                key={label}
                to={
                  label === "Home"
                    ? "/"
                    : label === "Sign Up"
                    ? "/register"
                    : `/${label.toLowerCase()}`
                }
                onClick={() => setMenuOpen(false)}
                className="block hover:text-primary-600 transition-all"
              >
                {label}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
};
