import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store';
import {
  LayoutDashboard,
  Building2,
  Calendar,
  Star,
  User,
  Search,
  Settings,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar = ({ isOpen = true, onClose }: SidebarProps) => {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Businesses', href: '/businesses', icon: Building2 },
    { name: 'My Bookings', href: '/my-bookings', icon: Calendar },
    { name: 'My Reviews', href: '/my-reviews', icon: Star },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'Profile', href: '/profile', icon: User }
  ];

  const ownerNavigation = user?.userType === 'Owner'
    ? [{ name: 'My Businesses', href: '/my-businesses', icon: Building2 }]
    : [];

  const allNavigation = [...navigation, ...ownerNavigation];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white border-r border-neutral-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-2 px-6 py-4 border-b border-neutral-200">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-h4 text-neutral-900">LocalBiz</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {allNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                    ${
                      isActive(item.href)
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="px-4 py-4 border-t border-neutral-200">
            <div className="flex items-center space-x-3 px-4 py-2">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                if (onClose) onClose();
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 mt-2 rounded-lg text-error hover:bg-error-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
