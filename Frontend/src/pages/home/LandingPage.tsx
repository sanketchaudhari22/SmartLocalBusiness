import { Link } from 'react-router-dom';
import { Search, MapPin, Star, TrendingUp } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <div className="container-custom py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Discover Local Businesses Near You
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Find, review, and book services from trusted local businesses in
              your community
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/register" className="btn-primary bg-white text-primary-600 hover:bg-neutral-50">
                Get Started
              </Link>
              <Link to="/businesses" className="btn-outline border-white text-white hover:bg-white/10">
                Browse Businesses
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container-custom section-padding">
        <h2 className="text-h2 text-center mb-12">Why Choose LocalBiz?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="text-h4 mb-2">Easy Search</h3>
            <p className="text-neutral-600">
              Find businesses by category, location, or service
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="text-h4 mb-2">Nearby Locations</h3>
            <p className="text-neutral-600">
              Discover businesses in your area with GPS-based search
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="text-h4 mb-2">Verified Reviews</h3>
            <p className="text-neutral-600">
              Read authentic reviews from real customers
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="text-h4 mb-2">Easy Booking</h3>
            <p className="text-neutral-600">
              Book appointments and services in just a few clicks
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-neutral-50 section-padding">
        <div className="container-custom text-center">
          <h2 className="text-h2 mb-4">Ready to Get Started?</h2>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users discovering and supporting local businesses
          </p>
          <Link to="/register" className="btn-primary">
            Create Your Account
          </Link>
        </div>
      </div>
    </div>
  );
};
