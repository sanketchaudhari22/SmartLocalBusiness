'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCategories, useSearch } from '@/lib/hooks';
import { useSearchStore } from '@/lib/stores';
import { Search, MapPin, Star, Loader2, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const { filters, setFilters } = useSearchStore();
  const { data: categories } = useCategories();
  const { data: searchResults, isLoading } = useSearch(filters);

  const [searchInput, setSearchInput] = useState(initialQuery);

  useEffect(() => {
    if (initialQuery) {
      setFilters({ query: initialQuery });
    }
  }, [initialQuery, setFilters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ query: searchInput, page: 1 });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Find Local Services</h1>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for services, businesses..."
                className="pl-10 h-12"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg">
              Search
            </Button>
          </form>

          {/* Filters */}
          <div className="flex gap-4 items-center">
            <Select
              value={filters.categoryId || 'all'}
              onValueChange={(value) => setFilters({ categoryId: value === 'all' ? undefined : value, page: 1 })}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.minRating?.toString() || 'all'}
              onValueChange={(value) =>
                setFilters({ minRating: value && value !== 'all' ? parseInt(value) : undefined, page: 1 })
              }
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Any Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Rating</SelectItem>
                <SelectItem value="4">4+ Stars</SelectItem>
                <SelectItem value="3">3+ Stars</SelectItem>
                <SelectItem value="2">2+ Stars</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div>
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : searchResults && searchResults.businesses.length > 0 ? (
            <>
              <p className="text-muted-foreground mb-6">
                Found {searchResults.totalCount} businesses
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.businesses.map((business) => (
                  <Link
                    key={business.businessId}
                    href={`/business/${business.businessId}`}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{business.businessName}</h3>
                            <div className="flex items-center gap-1 text-sm mb-2">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="font-medium">{business.rating.toFixed(1)}</span>
                              <span className="text-muted-foreground">
                                ({business.totalReviews})
                              </span>
                            </div>
                          </div>
                          {business.isVerified && <Badge variant="success">Verified</Badge>}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {business.description || 'No description available'}
                        </p>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>
                              {business.city}, {business.state}
                            </span>
                          </div>

                          {business.distance && (
                            <div className="text-muted-foreground">
                              <span className="font-medium">{business.distance} km</span> away
                            </div>
                          )}
                        </div>

                        <Button className="w-full mt-4" variant="outline">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {searchResults.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    disabled={filters.page === 1}
                    onClick={() => setFilters({ page: (filters.page || 1) - 1 })}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4">
                    Page {filters.page || 1} of {searchResults.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    disabled={filters.page === searchResults.totalPages}
                    onClick={() => setFilters({ page: (filters.page || 1) + 1 })}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters
              </p>
              <Button onClick={() => setFilters({ query: '', categoryId: undefined, minRating: undefined })}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
