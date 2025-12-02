import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { businessApi, reviewApi, serviceApi } from '@/api';
import { BusinessDto, ReviewDto, ServiceDto } from '@/types';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Alert } from '@/components/common/Alert';
import { RatingStars } from '@/components/review/RatingStars';
import { ReviewCard } from '@/components/review/ReviewCard';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Star,
  Calendar,
  ArrowLeft
} from 'lucide-react';
import { useAuthStore } from '@/store';

export const BusinessDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  const [business, setBusiness] = useState<BusinessDto | null>(null);
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [services, setServices] = useState<ServiceDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBusinessDetails();
    }
  }, [id]);

  const fetchBusinessDetails = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError('');

      const businessId = parseInt(id);

      const [businessResponse, reviewsResponse, servicesResponse] = await Promise.all([
        businessApi.getBusinessById(businessId),
        reviewApi.getReviewsByBusiness(businessId),
        serviceApi.getServicesByBusiness(businessId)
      ]);

      setBusiness(businessResponse.data);
      setReviews(reviewsResponse.data);
      setServices(servicesResponse.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load business details');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/businesses/${id}` } });
      return;
    }
    navigate(`/bookings/create?businessId=${id}`);
  };

  const handleWriteReview = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/businesses/${id}` } });
      return;
    }
    navigate(`/reviews/create?businessId=${id}`);
  };

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="container-custom py-8">
        <Alert type="error">{error || 'Business not found'}</Alert>
        <Button onClick={() => navigate('/businesses')} className="mt-4">
          Back to Businesses
        </Button>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      {/* Business Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mb-6 flex items-center justify-center">
              <span className="text-6xl font-bold text-primary-600">
                {business.businessName.charAt(0)}
              </span>
            </div>

            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-h1 mb-2">{business.businessName}</h1>
                <span className="badge-info">{business.categoryName}</span>
              </div>
              {business.isActive ? (
                <span className="badge-success">Open</span>
              ) : (
                <span className="badge-error">Closed</span>
              )}
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                <RatingStars rating={business.rating || 0} />
                <span className="ml-2 text-lg font-semibold">
                  {business.rating?.toFixed(1) || '0.0'}
                </span>
                <span className="ml-1 text-neutral-600">
                  ({business.totalReviews || 0} reviews)
                </span>
              </div>
            </div>

            <p className="text-body text-neutral-700 mb-6">
              {business.description || 'No description available'}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="primary" onClick={handleBookNow} className="flex-1">
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </Button>
              <Button variant="secondary" onClick={handleWriteReview} className="flex-1">
                <Star className="w-5 h-5 mr-2" />
                Write Review
              </Button>
            </div>
          </Card>
        </div>

        {/* Contact & Location Info */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-h4 mb-4">Contact Information</h3>
            <div className="space-y-3">
              {business.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary-500" />
                  <a href={`tel:${business.phone}`} className="text-body hover:text-primary-500">
                    {business.phone}
                  </a>
                </div>
              )}
              {business.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary-500" />
                  <a href={`mailto:${business.email}`} className="text-body hover:text-primary-500">
                    {business.email}
                  </a>
                </div>
              )}
              {business.website && (
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-primary-500" />
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body hover:text-primary-500"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <h3 className="text-h4 mb-4">Location</h3>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-primary-500 mt-1" />
              <div>
                <p className="text-body">{business.address}</p>
                <p className="text-body">
                  {business.city}, {business.state} {business.zipCode}
                </p>
              </div>
            </div>
          </Card>

          {business.operatingHours && (
            <Card>
              <h3 className="text-h4 mb-4">Operating Hours</h3>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary-500 mt-1" />
                <p className="text-body">{business.operatingHours}</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Services */}
      {services.length > 0 && (
        <Card className="mb-8">
          <h2 className="text-h2 mb-6">Services Offered</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <div
                key={service.serviceId}
                className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors"
              >
                <h4 className="text-h5 mb-2">{service.serviceName}</h4>
                {service.description && (
                  <p className="text-sm text-neutral-600 mb-2">
                    {service.description}
                  </p>
                )}
                {service.price && (
                  <p className="text-lg font-semibold text-primary-600">
                    ${service.price.toFixed(2)}
                  </p>
                )}
                {service.duration && (
                  <p className="text-sm text-neutral-500">{service.duration} min</p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Reviews */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-h2">Customer Reviews</h2>
          <Button variant="secondary" onClick={handleWriteReview}>
            Write a Review
          </Button>
        </div>

        {reviews.length === 0 ? (
          <Card>
            <div className="text-center py-8">
              <Star className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-body text-neutral-600">
                No reviews yet. Be the first to review this business!
              </p>
            </div>
          </Card>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {displayedReviews.map((review) => (
                <ReviewCard key={review.reviewId} review={review} />
              ))}
            </div>

            {reviews.length > 3 && !showAllReviews && (
              <Button
                variant="secondary"
                onClick={() => setShowAllReviews(true)}
                className="w-full"
              >
                Show All {reviews.length} Reviews
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
