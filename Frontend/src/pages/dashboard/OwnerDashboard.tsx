import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useBusiness, useBooking } from '@/hooks';
import { StatCard } from '@/components/dashboard/StatCard';
import { Chart } from '@/components/dashboard/Chart';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Building2, Calendar, Star, TrendingUp, Plus, Settings } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export const OwnerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { businesses, fetchBusinesses, loading: businessLoading } = useBusiness();
  const { bookings, fetchBookings, loading: bookingsLoading } = useBooking();

  useEffect(() => {
    fetchBusinesses();
    fetchBookings();
  }, []);

  // Mock data for charts
  const bookingTrends = [
    { label: 'Mon', value: 12 },
    { label: 'Tue', value: 19 },
    { label: 'Wed', value: 15 },
    { label: 'Thu', value: 22 },
    { label: 'Fri', value: 28 },
    { label: 'Sat', value: 35 },
    { label: 'Sun', value: 18 }
  ];

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
  const averageRating = businesses.reduce((sum, b) => sum + (b.averageRating || 0), 0) / (businesses.length || 1);

  const quickActions = [
    {
      id: 'create-business',
      label: 'Add Business',
      icon: <Plus className="w-5 h-5" />,
      onClick: () => navigate('/businesses/create'),
      variant: 'primary' as const
    },
    {
      id: 'manage-businesses',
      label: 'Manage Businesses',
      icon: <Building2 className="w-5 h-5" />,
      onClick: () => navigate('/my-businesses'),
      variant: 'secondary' as const
    },
    {
      id: 'view-bookings',
      label: 'View Bookings',
      icon: <Calendar className="w-5 h-5" />,
      onClick: () => navigate('/my-bookings'),
      variant: 'secondary' as const
    }
  ];

  const recentActivity = bookings.slice(0, 5).map((booking) => ({
    id: booking.id,
    type: 'booking' as const,
    title: `New booking from ${booking.customerName}`,
    description: `For ${booking.serviceName} on ${new Date(booking.bookingDate).toLocaleDateString()}`,
    timestamp: booking.createdAt,
    icon: <Calendar className="w-4 h-4" />
  }));

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-h2 text-neutral-900 mb-2">
            Business Dashboard
          </h1>
          <p className="text-neutral-600">
            Manage your businesses and track performance
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="My Businesses"
            value={businesses.length}
            icon={<Building2 className="w-6 h-6" />}
            color="primary"
          />
          <StatCard
            title="Total Bookings"
            value={totalBookings}
            icon={<Calendar className="w-6 h-6" />}
            color="success"
            trend={{ value: 12, isPositive: true }}
            description="vs last week"
          />
          <StatCard
            title="Pending Bookings"
            value={pendingBookings}
            icon={<TrendingUp className="w-6 h-6" />}
            color="warning"
          />
          <StatCard
            title="Average Rating"
            value={averageRating.toFixed(1)}
            icon={<Star className="w-6 h-6" />}
            color="error"
          />
        </div>

        {/* Quick Actions */}
        <QuickActions actions={quickActions} columns={3} />

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Booking Trends */}
          <Chart
            title="Booking Trends (Last 7 Days)"
            data={bookingTrends}
            type="bar"
            icon={<Calendar className="w-5 h-5" />}
          />

          {/* Recent Activity */}
          <RecentActivity
            activities={recentActivity}
            maxItems={5}
            onViewAll={() => navigate('/my-bookings')}
          />
        </div>

        {/* Business List */}
        {!businessLoading && businesses.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center">
            <Building2 className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-h4 text-neutral-900 mb-2">
              No businesses yet
            </h3>
            <p className="text-neutral-600 mb-6">
              Get started by adding your first business
            </p>
            <button
              onClick={() => navigate('/businesses/create')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Your Business
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
