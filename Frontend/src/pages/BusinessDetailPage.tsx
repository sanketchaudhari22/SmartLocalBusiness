import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { businessService, reviewService } from '../services/api';
import type { Business, Review } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  MapPin, Phone, Mail, Globe, Star, Calendar, 
  ArrowLeft, Check, Sparkles
} from 'lucide-react';

export const BusinessDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<Business | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadBusinessDetails();
      loadReviews();
    }
  }, [id]);

  const loadBusinessDetails = async () => {
    try {
      const response = await businessService.getById(Number(id));
      setBusiness(response.data.data);
    } catch (error) {
      console.error('Error loading business:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const response = await reviewService.getByBusinessId(Number(id));
      setReviews(response.data.data);
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-background via-white to-primary-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary-600"></div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-background to-primary-50 text-gray-700">
        <p className="text-xl font-semibold mb-4">Business not found 😢</p>
        <Button
          variant="outline"
          className="border-primary-500 text-primary-600 hover:bg-primary-50"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-primary-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-700 text-white py-16 relative overflow-hidden shadow-md">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-10 h-10 text-accent animate-pulse" />
          </div>
          <h1 className="text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-secondary-100">
            {business.businessName}
          </h1>
          <p className="text-primary-100 text-lg">
            Trusted local {business.categoryName.toLowerCase()} business 🌟
          </p>
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-card hover:shadow-xl transition-all border border-gray-100">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold text-gray-900">{business.businessName}</h2>
                    {business.isVerified && (
                      <span className="flex items-center gap-1 px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                        <Check className="w-4 h-4" /> Verified
                      </span>
                    )}
                  </div>
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    {business.categoryName}
                  </span>
                </div>

                <div className="text-right">
                  <div className="flex items-center justify-end text-2xl font-bold text-gray-900">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400 mr-1" />
                    {business.rating.toFixed(1)}
                  </div>
                  <p className="text-sm text-gray-500">{business.totalReviews} reviews</p>
                </div>
              </div>

              <p className="text-gray-700 text-lg mb-6 leading-relaxed">{business.description}</p>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex items-start gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-secondary-600 mt-1" />
                  <div>
                    <p className="font-semibold">{business.address}</p>
                    <p>{business.city}, {business.state} {business.zipCode}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-primary-600" />
                  <p>{business.phoneNumber}</p>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="w-5 h-5 text-primary-600" />
                  <p>{business.email}</p>
                </div>

                {business.website && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Globe className="w-5 h-5 text-primary-600" />
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 font-medium hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Reviews */}
          <Card className="shadow-card hover:shadow-xl border border-gray-100">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900">
                <Star className="w-5 h-5 text-yellow-400" /> Customer Reviews
              </h3>

              {reviews.length === 0 ? (
                <p className="text-gray-500 text-center py-10">
                  No reviews yet. Be the first to share your experience ✨
                </p>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.reviewId}
                      className="border-b border-gray-200 pb-4 last:border-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.reviewText}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8 shadow-card hover:shadow-lg border border-gray-100">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Book or Review</h3>
              <Button
                className="w-full mb-4 bg-accent hover:bg-orange-600 text-white transition-all"
                onClick={() =>
                  navigate(`/booking/create?businessId=${business.businessId}`)
                }
              >
                <Calendar className="w-4 h-4 mr-2" /> Make a Booking
              </Button>
              <Button
                variant="outline"
                className="w-full border-primary-500 text-primary-600 hover:bg-primary-50"
                onClick={() =>
                  navigate(`/review/create?businessId=${business.businessId}`)
                }
              >
                <Star className="w-4 h-4 mr-2 text-yellow-500" /> Write a Review
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
