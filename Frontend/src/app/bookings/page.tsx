'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/common/protected-route';
import { Navbar } from '@/components/layout/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth, useUpcomingBookings, useBookingHistory } from '@/lib/hooks';
import { UserType, Booking } from '@/types';
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  Loader2,
  Search,
  XCircle,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';
import { bookingApi } from '@/lib/api';

const statusConfig: Record<string, { variant: 'default' | 'success' | 'warning' | 'destructive' | 'outline'; icon: any }> = {
  Pending: { variant: 'warning', icon: AlertCircle },
  Confirmed: { variant: 'success', icon: CheckCircle },
  Completed: { variant: 'default', icon: CheckCircle },
  Cancelled: { variant: 'destructive', icon: XCircle },
};

function BookingsContent() {
  const { user } = useAuth();
  const { data: upcomingBookings, isLoading: loadingUpcoming, refetch: refetchUpcoming } = useUpcomingBookings(user?.userId);
  const { data: pastBookings, isLoading: loadingPast, refetch: refetchPast } = useBookingHistory(user?.userId);

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelBooking = async () => {
    if (!selectedBooking) return;

    setIsCancelling(true);
    try {
      await bookingApi.cancel(selectedBooking.bookingId);
      toast.success('Booking cancelled successfully');
      refetchUpcoming();
      refetchPast();
      setCancelDialogOpen(false);
      setSelectedBooking(null);
    } catch (error) {
      toast.error('Failed to cancel booking');
    } finally {
      setIsCancelling(false);
    }
  };

  const BookingCard = ({ booking, showActions = false }: { booking: Booking; showActions?: boolean }) => {
    const config = statusConfig[booking.status] || statusConfig.Pending;
    const StatusIcon = config.icon;

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <Link
                    href={`/business/${booking.businessId}`}
                    className="text-lg font-semibold hover:text-primary transition-colors"
                  >
                    {booking.business?.businessName || 'Business'}
                  </Link>
                  <p className="text-muted-foreground">{booking.service?.serviceName || 'Service'}</p>
                </div>
                <Badge variant={config.variant} className="flex items-center gap-1">
                  <StatusIcon className="h-3 w-3" />
                  {booking.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(booking.bookingDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.service?.duration || 60} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.business?.city || 'Location'}</span>
                </div>
                <div className="font-semibold text-primary">
                  {formatCurrency(booking.totalAmount)}
                </div>
              </div>

              {booking.notes && (
                <p className="mt-3 text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                  Note: {booking.notes}
                </p>
              )}
            </div>

            {showActions && (
              <div className="flex gap-2 md:flex-col">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/business/${booking.businessId}`}>View Business</Link>
                </Button>
                {booking.status === 'Pending' || booking.status === 'Confirmed' ? (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setSelectedBooking(booking);
                      setCancelDialogOpen(true);
                    }}
                  >
                    Cancel
                  </Button>
                ) : booking.status === 'Completed' ? (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/business/${booking.businessId}#reviews`}>
                      <Star className="h-4 w-4 mr-1" />
                      Review
                    </Link>
                  </Button>
                ) : null}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
            <p className="text-muted-foreground">View and manage your appointments</p>
          </div>
          <Button asChild>
            <Link href="/search">
              <Search className="mr-2 h-4 w-4" />
              Book New Service
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Upcoming
              {upcomingBookings && upcomingBookings.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {upcomingBookings.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Bookings */}
          <TabsContent value="upcoming">
            {loadingUpcoming ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : upcomingBookings && upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <BookingCard key={booking.bookingId} booking={booking} showActions />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-16 text-center">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No Upcoming Bookings</h3>
                  <p className="text-muted-foreground mb-6">
                    You don't have any scheduled appointments
                  </p>
                  <Button asChild>
                    <Link href="/search">Browse Services</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Booking History */}
          <TabsContent value="history">
            {loadingPast ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : pastBookings && pastBookings.length > 0 ? (
              <div className="space-y-4">
                {pastBookings.map((booking) => (
                  <BookingCard key={booking.bookingId} booking={booking} showActions />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-16 text-center">
                  <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No Booking History</h3>
                  <p className="text-muted-foreground">
                    Your completed bookings will appear here
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Cancel Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="py-4">
              <p className="font-medium">{selectedBooking.business?.businessName}</p>
              <p className="text-sm text-muted-foreground">{selectedBooking.service?.serviceName}</p>
              <p className="text-sm text-muted-foreground">{formatDate(selectedBooking.bookingDate)}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)} disabled={isCancelling}>
              Keep Booking
            </Button>
            <Button variant="destructive" onClick={handleCancelBooking} disabled={isCancelling}>
              {isCancelling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cancelling...
                </>
              ) : (
                'Cancel Booking'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function BookingsPage() {
  return (
    <ProtectedRoute allowedRoles={[UserType.Customer, UserType.BusinessOwner]}>
      <BookingsContent />
    </ProtectedRoute>
  );
}
