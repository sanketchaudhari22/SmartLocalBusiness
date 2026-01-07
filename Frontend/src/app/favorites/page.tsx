'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/common/protected-route';
import { Navbar } from '@/components/layout/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFavoritesStore } from '@/lib/stores/favorites.store';
import { businessApi } from '@/lib/api';
import { Business, UserType } from '@/types';
import {
  Heart,
  MapPin,
  Star,
  Loader2,
  Search,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';

function FavoritesContent() {
  const { favorites, removeFavorite, clearFavorites } = useFavoritesStore();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favorites.length === 0) {
        setBusinesses([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const businessPromises = favorites.map((id) =>
          businessApi.getById(id).catch(() => null)
        );
        const results = await Promise.all(businessPromises);
        setBusinesses(results.filter((b): b is Business => b !== null));
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  const handleRemove = (businessId: string, businessName: string) => {
    removeFavorite(businessId);
    toast.success(`${businessName} removed from favorites`);
  };

  const handleClearAll = () => {
    clearFavorites();
    toast.success('All favorites cleared');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Favorites</h1>
            <p className="text-muted-foreground">
              {favorites.length} saved {favorites.length === 1 ? 'business' : 'businesses'}
            </p>
          </div>
          {favorites.length > 0 && (
            <Button variant="outline" onClick={handleClearAll}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : businesses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <Card key={business.businessId} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Link
                        href={`/business/${business.businessId}`}
                        className="font-semibold text-lg hover:text-primary transition-colors"
                      >
                        {business.businessName}
                      </Link>
                      <div className="flex items-center gap-1 text-sm mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{business.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground">
                          ({business.totalReviews} reviews)
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleRemove(business.businessId, business.businessName)}
                    >
                      <Heart className="h-5 w-5 fill-current" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {business.description || 'No description available'}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>{business.city}, {business.state}</span>
                  </div>

                  {business.isVerified && (
                    <Badge variant="success" className="mb-4">Verified</Badge>
                  )}

                  <Button className="w-full" variant="outline" asChild>
                    <Link href={`/business/${business.businessId}`}>
                      View Details
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-16 text-center">
              <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No Favorites Yet</h3>
              <p className="text-muted-foreground mb-6">
                Start exploring and save businesses you love
              </p>
              <Button asChild>
                <Link href="/search">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Businesses
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

export default function FavoritesPage() {
  return (
    <ProtectedRoute allowedRoles={[UserType.Customer, UserType.BusinessOwner, UserType.Admin]}>
      <FavoritesContent />
    </ProtectedRoute>
  );
}
