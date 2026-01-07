'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBusiness, useBusinessReviews } from '@/lib/hooks';
import { formatCurrency, formatDate, getInitials } from '@/lib/utils';
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  CheckCircle,
  Calendar,
  ArrowLeft,
  Loader2,
  ChevronRight,
} from 'lucide-react';
import { BookingModal } from '@/components/business/booking-modal';
import { ReviewSection } from '@/components/business/review-section';
import { Service } from '@/types';

export default function BusinessDetailPage() {
  const params = useParams();
  const businessId = params.id as string;

  const { data: business, isLoading } = useBusiness(businessId);
  const { data: reviews } = useBusinessReviews(businessId);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Business Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The business you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/search">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/80 text-sm mb-6">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/search" className="hover:text-white">
              Search
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{business.businessName}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl md:text-4xl font-bold">{business.businessName}</h1>
                {business.isVerified && (
                  <Badge className="bg-white/20 text-white border-white/30">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>

              {business.category && (
                <Badge variant="secondary" className="mb-4">
                  {business.category.categoryName}
                </Badge>
              )}

              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{business.rating.toFixed(1)}</span>
                  <span className="text-white/70">({business.totalReviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {business.city}, {business.state}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => {
                  if (business.services && business.services.length > 0) {
                    handleBookService(business.services[0]);
                  }
                }}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {business.description || 'No description available for this business.'}
                </p>
              </CardContent>
            </Card>

            {/* Services Section */}
            <Card>
              <CardHeader>
                <CardTitle>Services</CardTitle>
              </CardHeader>
              <CardContent>
                {business.services && business.services.length > 0 ? (
                  <div className="space-y-4">
                    {business.services.map((service) => (
                      <div
                        key={service.serviceId}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{service.serviceName}</h4>
                          {service.description && (
                            <p className="text-muted-foreground text-sm mt-1">
                              {service.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="font-semibold text-primary">
                              {formatCurrency(service.price)}
                            </span>
                            {service.duration > 0 && (
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                {service.duration} min
                              </span>
                            )}
                          </div>
                        </div>
                        <Button onClick={() => handleBookService(service)}>Book</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No services available at the moment.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <ReviewSection businessId={businessId} reviews={reviews || []} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      {business.address}
                      <br />
                      {business.city}, {business.state} {business.zipCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a
                      href={`tel:${business.phoneNumber}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {business.phoneNumber}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href={`mailto:${business.email}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {business.email}
                    </a>
                  </div>
                </div>

                {business.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Website</p>
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Map View</p>
                    <p className="text-xs">
                      {business.latitude.toFixed(4)}, {business.longitude.toFixed(4)}
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <a
                    href={`https://maps.google.com/?q=${business.latitude},${business.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{business.rating.toFixed(1)}</p>
                    <p className="text-sm text-muted-foreground">Rating</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{business.totalReviews}</p>
                    <p className="text-sm text-muted-foreground">Reviews</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      {selectedService && business && (
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => {
            setIsBookingOpen(false);
            setSelectedService(null);
          }}
          business={business}
          service={selectedService}
        />
      )}
    </div>
  );
}
