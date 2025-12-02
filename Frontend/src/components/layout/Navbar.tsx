import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store';
import { LogOut, User, LayoutDashboard, Building2 } from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-h4 text-neutral-900">LocalBiz</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/businesses"
              className="text-neutral-700 hover:text-primary-500 font-medium transition"
            >
              Businesses
            </Link>
            <Link
              to="/search"
              className="text-neutral-700 hover:text-primary-500 font-medium transition"
            >
              Search
            </Link>
            {isAuthenticated && user?.userType === 'Owner' && (
              <Link
                to="/my-businesses"
                className="text-neutral-700 hover:text-primary-500 font-medium transition"
              >
                My Businesses
              </Link>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn-ghost">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 btn-ghost">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {user?.firstName || 'User'}
                    </span>
                  </button>
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-neutral-50 rounded-t-lg"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/my-bookings"
                      className="block px-4 py-2 hover:bg-neutral-50"
                    >
                      My Bookings
                    </Link>
                    {user?.userType === 'Owner' && (
                      <>
                        <Link
                          to="/my-businesses"
                          className="block px-4 py-2 hover:bg-neutral-50"
                        >
                          My Businesses
                        </Link>
                        <Link
                          to="/businesses/create"
                          className="block px-4 py-2 hover:bg-neutral-50"
                        >
                          Create Business
                        </Link>
                      </>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-error hover:bg-neutral-50 rounded-b-lg flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
