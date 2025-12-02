import { useAuthStore } from '@/store';
import { Card } from '@/components/common/Card';
import { Calendar, Building2, Star, User } from 'lucide-react';

export const DashboardPage = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container-custom py-8">
        <h1 className="text-h1 text-neutral-900 mb-2">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-neutral-600 mb-8">
          Here's what's happening with your account
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Bookings</p>
                <p className="text-3xl font-bold mt-2">12</p>
              </div>
              <Calendar className="w-12 h-12 opacity-80" />
            </div>
          </Card>

          {user?.userType === 'Owner' && (
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">My Businesses</p>
                  <p className="text-3xl font-bold mt-2">3</p>
                </div>
                <Building2 className="w-12 h-12 opacity-80" />
              </div>
            </Card>
          )}

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Reviews Written</p>
                <p className="text-3xl font-bold mt-2">8</p>
              </div>
              <Star className="w-12 h-12 opacity-80" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Profile Views</p>
                <p className="text-3xl font-bold mt-2">156</p>
              </div>
              <User className="w-12 h-12 opacity-80" />
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-h3 mb-4">Recent Bookings</h2>
            <p className="text-neutral-500 text-sm">No recent bookings</p>
          </Card>

          <Card>
            <h2 className="text-h3 mb-4">Recommended for You</h2>
            <p className="text-neutral-500 text-sm">
              Discover businesses based on your preferences
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
