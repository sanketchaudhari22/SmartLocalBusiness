'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Footer } from '@/components/layout/footer';
import { useCategories, useBusinesses } from '@/lib/hooks';
import {
  Search,
  MapPin,
  Calendar,
  Star,
  TrendingUp,
  Shield,
  Utensils,
  Scissors,
  Car,
  Heart,
  Dumbbell,
  Home,
  Briefcase,
  Sparkles,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const categoryIcons: Record<string, any> = {
  Restaurant: Utensils,
  Salon: Scissors,
  'Auto Repair': Car,
  Healthcare: Heart,
  Fitness: Dumbbell,
  'Home Services': Home,
  Professional: Briefcase,
  Beauty: Sparkles,
};

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { data: categories, isLoading: loadingCategories } = useCategories();
  const { data: businesses, isLoading: loadingBusinesses } = useBusinesses();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Get top rated businesses
  const topBusinesses = businesses
    ?.filter((b) => b.isActive && b.rating >= 4)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Smart Local Business
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/search" className="text-sm font-medium hover:text-primary">
              Browse
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="/for-business" className="text-sm font-medium hover:text-primary">
              For Business
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Find & Book
              <span className="text-primary"> Local Services </span>
              Near You
            </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Connect with verified local businesses, read reviews, and book appointments
            instantly. Your one-stop platform for all local services.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for services, businesses..."
                  className="pl-10 h-12 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" size="lg" className="px-8">
                Search
              </Button>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {['Restaurants', 'Salons', 'Auto Repair', 'Healthcare', 'Fitness'].map((tag) => (
              <Button
                key={tag}
                variant="outline"
                size="sm"
                asChild
                className="rounded-full"
              >
                <Link href={`/search?q=${tag}`}>{tag}</Link>
              </Button>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to discover, compare, and book local services in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Find Nearby Businesses</CardTitle>
              <CardDescription>
                Discover local services based on your location with our smart search and
                filtering system.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Read Verified Reviews</CardTitle>
              <CardDescription>
                Make informed decisions with authentic reviews from real customers like you.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Book Instantly</CardTitle>
              <CardDescription>
                Schedule appointments in seconds. No phone calls, no waiting - just book and go.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Verified Providers</CardTitle>
              <CardDescription>
                All businesses are verified and vetted to ensure quality and reliability.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Best Prices</CardTitle>
              <CardDescription>
                Compare prices and services to find the best deals in your area.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Smart Search</CardTitle>
              <CardDescription>
                Advanced filters by category, rating, distance, and availability.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of service categories
          </p>
        </div>

        {loadingCategories ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : categories && categories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((category) => {
              const IconComponent = categoryIcons[category.categoryName] || Briefcase;
              return (
                <Link
                  key={category.categoryId}
                  href={`/search?category=${category.categoryId}`}
                  className="group"
                >
                  <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50 hover:-translate-y-1">
                    <CardContent className="pt-6 text-center">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-1">{category.categoryName}</h3>
                      {category.businessCount !== undefined && (
                        <p className="text-sm text-muted-foreground">
                          {category.businessCount} businesses
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Restaurants', 'Salons', 'Auto Repair', 'Healthcare', 'Fitness', 'Home Services', 'Professional', 'Beauty'].map((name, i) => {
              const IconComponent = categoryIcons[name] || Briefcase;
              return (
                <Link key={i} href={`/search?q=${name}`} className="group">
                  <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50 hover:-translate-y-1">
                    <CardContent className="pt-6 text-center">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="font-semibold">{name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/categories">
              View All Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Top Rated Businesses */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Top Rated Businesses</h2>
            <p className="text-lg text-muted-foreground">
              Discover highly rated local businesses
            </p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex">
            <Link href="/search">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {loadingBusinesses ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : topBusinesses && topBusinesses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topBusinesses.map((business) => (
              <Link key={business.businessId} href={`/business/${business.businessId}`}>
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{business.businessName}</CardTitle>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{business.rating.toFixed(1)}</span>
                          <span className="text-muted-foreground">
                            ({business.totalReviews} reviews)
                          </span>
                        </div>
                      </div>
                      {business.isVerified && (
                        <span className="bg-success/10 text-success text-xs px-2 py-1 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {business.description || 'No description available'}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {business.city}, {business.state}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No businesses available yet</p>
          </div>
        )}

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" asChild>
            <Link href="/search">
              View All Businesses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of satisfied customers who trust us to find the best local services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">Create Free Account</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
              <Link href="/for-business">List Your Business</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
