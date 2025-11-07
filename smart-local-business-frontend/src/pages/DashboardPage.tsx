import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { bookingService } from '../services/api';
import type { Booking } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Calendar, Clock, DollarSign, Sparkles } from 'lucide-react';

export const DashboardPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const activeTab = searchParams.get('tab') || 'bookings';

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const userId = 1; // Replace with logged-in user ID later
      const response = await bookingService.getUserBookings(userId);
      setBookings(response.data.data);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-secondary-100 text-secondary-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-primary-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-700 text-white py-16 relative overflow-hidden shadow-lg">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-10 h-10 text-accent animate-pulse" />
          </div>
          <h1 className="text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            My Dashboard
          </h1>
          <p className="text-primary-100 text-lg">
            Manage your bookings and track your activity 💼
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex gap-4 justify-center mb-10">
          <Button
            variant={activeTab === 'bookings' ? 'primary' : 'outline'}
            className={`rounded-full px-6 py-2 ${
              activeTab === 'bookings'
                ? 'bg-primary-600 text-white'
                : 'border-primary-500 text-primary-600 hover:bg-primary-50'
            }`}
            onClick={() => navigate('/dashboard?tab=bookings')}
          >
            My Bookings
          </Button>

          <Button
            variant={activeTab === 'reviews' ? 'primary' : 'outline'}
            className={`rounded-full px-6 py-2 ${
              activeTab === 'reviews'
                ? 'bg-secondary-600 text-white'
                : 'border-secondary-500 text-secondary-600 hover:bg-secondary-50'
            }`}
            onClick={() => navigate('/dashboard?tab=reviews')}
          >
            My Reviews
          </Button>
        </div>

        {/* Bookings */}
        {activeTab === 'bookings' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              My Bookings
            </h2>

            {loading ? (
              <div className="text-center py-16 text-gray-600">
                Loading your bookings...
              </div>
            ) : bookings.length === 0 ? (
              <Card className="shadow-card hover:shadow-lg transition-all">
                <div className="p-12 text-center">
                  <Calendar className="w-16 h-16 mx-auto text-primary-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No bookings yet
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Start exploring and book your first service ✨
                  </p>
                  <Button
                    onClick={() => navigate('/')}
                    className="bg-accent hover:bg-orange-600 text-white"
                  >
                    Explore Businesses
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map((booking) => (
                  <Card
                    key={booking.bookingId}
                    className="group shadow-card hover:shadow-xl transition-all bg-white"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            Booking #{booking.bookingId}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {booking.status === 'Pending' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-500 text-red-600 hover:bg-red-50"
                              onClick={async () => {
                                if (confirm('Cancel this booking?')) {
                                  await bookingService.cancel(booking.bookingId);
                                  loadBookings();
                                }
                              }}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-gray-700">
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 mr-2 text-primary-600" />
                          <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-medium">
                              {new Date(
                                booking.bookingDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <Clock className="w-5 h-5 mr-2 text-secondary-600" />
                          <div>
                            <p className="text-sm text-gray-500">Time</p>
                            <p className="font-medium">
                              {new Date(
                                booking.bookingDate
                              ).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 mr-2 text-accent" />
                          <div>
                            <p className="text-sm text-gray-500">Amount</p>
                            <p className="font-medium">
                              ${booking.totalAmount}
                            </p>
                          </div>
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="mt-4 p-3 bg-gradient-to-br from-gray-50 to-primary-50 rounded-lg border border-gray-100">
                          <p className="text-sm text-gray-700">
                            <strong>Notes:</strong> {booking.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
