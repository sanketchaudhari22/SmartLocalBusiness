import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingApi } from '@/api';
import { BookingDto } from '@/types';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Alert } from '@/components/common/Alert';
import { Tabs, Tab } from '@/components/common/Tabs';
import { BookingCard } from '@/components/booking/BookingCard';
import { useAuthStore } from '@/store';
import { useUIStore } from '@/store';
import { Calendar, Clock, Plus } from 'lucide-react';

export const MyBookingsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addToast } = useUIStore();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
  const [upcomingBookings, setUpcomingBookings] = useState<BookingDto[]>([]);
  const [historyBookings, setHistoryBookings] = useState<BookingDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    if (!user?.userId) return;

    try {
      setLoading(true);
      setError('');

      const [upcomingResponse, historyResponse] = await Promise.all([
        bookingApi.getUpcomingBookings(user.userId),
        bookingApi.getBookingHistory(user.userId)
      ]);

      setUpcomingBookings(upcomingResponse.data);
      setHistoryBookings(historyResponse.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: number) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      setCancellingId(bookingId);
      await bookingApi.cancelBooking(bookingId);

      // Remove from upcoming and add to history
      const cancelledBooking = upcomingBookings.find(b => b.bookingId === bookingId);
      if (cancelledBooking) {
        setUpcomingBookings(prev => prev.filter(b => b.bookingId !== bookingId));
        setHistoryBookings(prev => [
          { ...cancelledBooking, status: 'Cancelled' },
          ...prev
        ]);
      }

      addToast({
        type: 'success',
        message: 'Booking cancelled successfully'
      });
    } catch (err: any) {
      addToast({
        type: 'error',
        message: err.message || 'Failed to cancel booking'
      });
    } finally {
      setCancellingId(null);
    }
  };

  const tabs: Tab[] = [
    {
      id: 'upcoming',
      label: 'Upcoming',
      icon: <Calendar className="w-4 h-4" />,
      count: upcomingBookings.length
    },
    {
      id: 'history',
      label: 'History',
      icon: <Clock className="w-4 h-4" />,
      count: historyBookings.length
    }
  ];

  const displayedBookings = activeTab === 'upcoming' ? upcomingBookings : historyBookings;

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-h1 mb-2">My Bookings</h1>
          <p className="text-body text-neutral-600">
            View and manage your appointments
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate('/bookings/create')}
        >
          <Plus className="w-5 h-5 mr-2" />
          New Booking
        </Button>
      </div>

      {error && (
        <Alert type="error" onClose={() => setError('')} className="mb-6">
          {error}
        </Alert>
      )}

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={(id) => setActiveTab(id as 'upcoming' | 'history')}
        className="mb-6"
      />

      {displayedBookings.length === 0 ? (
        <Card>
          <div className="text-center py-16">
            <div className="text-6xl mb-4">
              {activeTab === 'upcoming' ? '📅' : '📋'}
            </div>
            <h3 className="text-h3 mb-2">
              No {activeTab === 'upcoming' ? 'upcoming' : 'past'} bookings
            </h3>
            <p className="text-body text-neutral-600 mb-6">
              {activeTab === 'upcoming'
                ? 'Book your first appointment with a local business'
                : 'Your booking history will appear here'}
            </p>
            {activeTab === 'upcoming' && (
              <Button
                variant="primary"
                onClick={() => navigate('/bookings/create')}
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Booking
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedBookings.map((booking) => (
            <BookingCard
              key={booking.bookingId}
              booking={booking}
              onCancel={activeTab === 'upcoming' ? handleCancelBooking : undefined}
              onView={(id) => navigate(`/bookings/${id}`)}
              isCancelling={cancellingId === booking.bookingId}
            />
          ))}
        </div>
      )}
    </div>
  );
};
