import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useBooking, useReview } from '@/hooks';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { BookingCard } from '@/components/booking/BookingCard';
import { Calendar, Star, Building2, Search, User } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bookings, fetchBookings, loading: bookingsLoading } = useBooking();
  const { reviews, fetchReviews, loading: reviewsLoading } = useReview();

  useEffect(() => {
    fetchBookings();
    fetchReviews();
  }, []);

  // Filter upcoming bookings
  const upcomingBookings = bookings.filter(
    (booking) =>
      booking.status === 'Confirmed' &&
      new Date(booking.bookingDate) >= new Date()
  );

  // Recent activity
  const recentActivity = [
    ...bookings.slice(0, 3).map((booking) => ({
      id: booking.id,
      type: 'booking' as const,
      title: `Booking at ${booking.businessName}`,
      description: `Scheduled for ${new Date(booking.bookingDate).toLocaleDateString()}`,
      timestamp: booking.createdAt,
      icon: <Calendar className="w-4 h-4" />
    })),
    ...reviews.slice(0, 2).map((review) => ({
      id: review.id,
      type: 'review' as const,
      title: `Review for ${review.businessName}`,
      description: `You rated ${review.rating} stars`,
      timestamp: review.createdAt,
      icon: <Star className="w-4 h-4" />
    }))
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const quickActions = [
    {
      id: 'search',
      label: 'Find Businesses',
      icon: <Search className="w-5 h-5" />,
      onClick: () => navigate('/search'),
      variant: 'primary' as const
    },
    {
      id: 'bookings',
      label: 'My Bookings',
      icon: <Calendar className="w-5 h-5" />,
      onClick: () => navigate('/my-bookings'),
      variant: 'secondary' as const
    },
    {
      id: 'reviews',
      label: 'My Reviews',
      icon: <Star className="w-5 h-5" />,
      onClick: () => navigate('/my-reviews'),
      variant: 'secondary' as const
    },
    {
      id: 'profile',
      label: 'Edit Profile',
      icon: <User className="w-5 h-5" />,
      onClick: () => navigate('/profile/edit'),
      variant: 'secondary' as const
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-h2 text-neutral-900 mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-neutral-600">
            Here's an overview of your bookings and activity
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Upcoming Bookings"
            value={upcomingBookings.length}
            icon={<Calendar className="w-6 h-6" />}
            color="primary"
          />
          <StatCard
            title="Total Bookings"
            value={bookings.length}
            icon={<Building2 className="w-6 h-6" />}
            color="success"
          />
          <StatCard
            title="Reviews Written"
            value={reviews.length}
            icon={<Star className="w-6 h-6" />}
            color="warning"
          />
        </div>

        {/* Quick Actions */}
        <QuickActions actions={quickActions} columns={4} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Bookings */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-h4 text-neutral-900">Upcoming Bookings</h3>
              {upcomingBookings.length > 0 && (
                <button
                  onClick={() => navigate('/my-bookings')}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  View All
                </button>
              )}
            </div>

            {bookingsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              </div>
            ) : upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.slice(0, 3).map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <p className="text-neutral-600 mb-4">No upcoming bookings</p>
                <button
                  onClick={() => navigate('/search')}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Find a business
                </button>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <RecentActivity activities={recentActivity} maxItems={5} />
        </div>
      </div>
    </DashboardLayout>
  );
};
