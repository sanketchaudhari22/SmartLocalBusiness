import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { businessService } from '../services/api';
import type { Business } from '../types';
import { Card } from '../components/ui/Card';
import { MapPin, Star, Sparkles } from 'lucide-react';

export const BusinessesPage = () => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    try {
      const response = await businessService.getAll();
      setBusinesses(response.data.data);
    } catch (error) {
      console.error('Error loading businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-700 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-10 h-10 text-accent animate-pulse" />
          </div>
          <h1 className="text-5xl font-extrabold mb-3 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-secondary-100">
            Explore Local Businesses
          </h1>
          <p className="text-primary-100 text-lg">
            Discover and connect with {businesses.length} trusted local services near you ✨
          </p>
        </div>
      </div>

      {/* Businesses Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Featured Listings
        </h2>

        {businesses.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No businesses found at the moment. Please check back later.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businesses.map((business) => (
              <Card
                key={business.businessId}
                hover
                onClick={() => navigate(`/business/${business.businessId}`)}
                className="group cursor-pointer overflow-hidden shadow-card hover:shadow-xl transition-shadow duration-300"
              >
                {/* Banner Image or Placeholder */}
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center">
                    <span className="text-6xl">🏢</span>
                  </div>
                  {business.isVerified && (
                    <span className="absolute top-4 right-4 bg-secondary-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md flex items-center gap-1">
                      ✓ Verified
                    </span>
                  )}
                </div>

                {/* Business Info */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {business.businessName}
                    </h3>
                    <span className="inline-block px-4 py-1 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 text-sm font-medium rounded-full">
                      {business.categoryName}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {business.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-1 text-secondary-600" />
                      <span className="font-medium">
                        {business.city}, {business.state}
                      </span>
                    </div>
                    <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-gray-900">
                        {business.rating.toFixed(1)}
                      </span>
                      <span className="text-gray-500 ml-1">
                        ({business.totalReviews})
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
