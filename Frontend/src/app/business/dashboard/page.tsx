'use client';

import { ProtectedRoute } from '@/components/common/protected-route';
import { Navbar } from '@/components/layout/navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth, useMyBusinesses } from '@/lib/hooks';
import { UserType } from '@/types';
import {
  Store,
  DollarSign,
  Users,
  Star,
  TrendingUp,
  Calendar,
  Plus,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

function BusinessDashboardContent() {
  const { user } = useAuth();
  const { data: businesses, isLoading } = useMyBusinesses(user?.userId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Business Dashboard</h1>
            <p className="text-muted-foreground">Manage your businesses and bookings</p>
          </div>
          <Button asChild>
            <Link href="/business/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Business
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Total Businesses</CardDescription>
                <Store className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-3xl">
                {isLoading ? '...' : businesses?.length || 0}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Monthly Revenue</CardDescription>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-3xl">{formatCurrency(0)}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Total Bookings</CardDescription>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-3xl">0</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Average Rating</CardDescription>
                <Star className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-3xl">0.0</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* My Businesses */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>My Businesses</CardTitle>
                <CardDescription>Manage your business listings</CardDescription>
              </div>
              <Button variant="outline" asChild>
                <Link href="/business/all">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : businesses && businesses.length > 0 ? (
              <div className="space-y-4">
                {businesses.map((business) => (
                  <div
                    key={business.businessId}
                    className="flex items-center justify-between p-6 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{business.businessName}</h3>
                        {business.isVerified && (
                          <Badge variant="success">Verified</Badge>
                        )}
                        {!business.isActive && (
                          <Badge variant="outline">Inactive</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {business.description || 'No description'}
                      </p>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{business.rating.toFixed(1)}</span>
                          <span className="text-muted-foreground">
                            ({business.totalReviews} reviews)
                          </span>
                        </div>
                        <div className="text-muted-foreground">
                          {business.city}, {business.state}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/business/edit/${business.businessId}`}>Edit</Link>
                      </Button>
                      <Button variant="default" size="sm" asChild>
                        <Link href={`/business/${business.businessId}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Store className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No businesses yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first business listing to get started
                </p>
                <Button asChild>
                  <Link href="/business/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Business
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest customer bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No recent bookings</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
              <CardDescription>Customer feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No reviews yet</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default function BusinessOwnerDashboard() {
  return (
    <ProtectedRoute allowedRoles={[UserType.BusinessOwner]}>
      <BusinessDashboardContent />
    </ProtectedRoute>
  );
}
