'use client';

import { ProtectedRoute } from '@/components/common/protected-route';
import { Navbar } from '@/components/layout/navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth, useUpcomingBookings, useBookingHistory } from '@/lib/hooks';
import { UserType } from '@/types';
import { Calendar, Star, Clock, MapPin, Loader2 } from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';
import Link from 'next/link';

function DashboardContent() {
  const { user } = useAuth();
  const { data: upcomingBookings, isLoading: loadingUpcoming } = useUpcomingBookings(user?.userId);
  const { data: pastBookings, isLoading: loadingPast } = useBookingHistory(user?.userId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName}!</h1>
          <p className="text-muted-foreground">Manage your bookings and reviews</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Upcoming Bookings</CardDescription>
              <CardTitle className="text-3xl">
                {loadingUpcoming ? '...' : upcomingBookings?.length || 0}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Past Bookings</CardDescription>
              <CardTitle className="text-3xl">
                {loadingPast ? '...' : pastBookings?.length || 0}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Reviews Written</CardDescription>
              <CardTitle className="text-3xl">0</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Favorite Places</CardDescription>
              <CardTitle className="text-3xl">0</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Upcoming Bookings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Bookings</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/bookings">View All</Link>
                </Button>
              </div>
              <CardDescription>Your scheduled appointments</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingUpcoming ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : upcomingBookings && upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.slice(0, 3).map((booking) => (
                    <div key={booking.bookingId} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{booking.business?.businessName}</h4>
                        <p className="text-sm text-muted-foreground">{booking.service?.serviceName}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(booking.bookingDate)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {booking.service?.duration} min
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={booking.status === 'Confirmed' ? 'success' : 'warning'}>
                          {booking.status}
                        </Badge>
                        <p className="text-sm font-semibold mt-2">
                          {formatCurrency(booking.totalAmount)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground mb-4">No upcoming bookings</p>
                  <Button asChild>
                    <Link href="/search">Browse Services</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your booking history</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingPast ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : pastBookings && pastBookings.length > 0 ? (
                <div className="space-y-4">
                  {pastBookings.slice(0, 3).map((booking) => (
                    <div key={booking.bookingId} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{booking.business?.businessName}</h4>
                        <p className="text-sm text-muted-foreground">{booking.service?.serviceName}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm text-muted-foreground">
                            {formatDate(booking.bookingDate)}
                          </span>
                          {booking.status === 'Completed' && (
                            <Button variant="link" size="sm" className="h-auto p-0">
                              <Star className="h-4 w-4 mr-1" />
                              Write Review
                            </Button>
                          )}
                        </div>
                      </div>
                      <Badge variant={booking.status === 'Completed' ? 'success' : 'outline'}>
                        {booking.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No past bookings</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
            <CardDescription>Popular services in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground mb-4">
                Discover local businesses and services near you
              </p>
              <Button asChild>
                <Link href="/search">Explore Now</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default function CustomerDashboard() {
  return (
    <ProtectedRoute allowedRoles={[UserType.Customer]}>
      <DashboardContent />
    </ProtectedRoute>
  );
}
