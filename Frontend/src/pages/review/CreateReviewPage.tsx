import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { businessApi, reviewApi } from '@/api';
import { BusinessDto } from '@/types';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Select } from '@/components/common/Select';
import { Alert } from '@/components/common/Alert';
import { RatingStars } from '@/components/review/RatingStars';
import { useAuthStore } from '@/store';
import { useUIStore } from '@/store';
import { ArrowLeft, Star } from 'lucide-react';

export const CreateReviewPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuthStore();
  const { addToast } = useUIStore();

  const [businesses, setBusinesses] = useState<BusinessDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    userId: user?.userId || 0,
    businessId: parseInt(searchParams.get('businessId') || '0'),
    rating: 0,
    comment: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const response = await businessApi.getAllBusinesses();
      setBusinesses(response.data);
    } catch (err: any) {
      setError('Failed to load businesses');
    }
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
    setErrors((prev) => ({ ...prev, rating: '' }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'businessId' ? parseInt(value) : value
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.businessId) {
      newErrors.businessId = 'Please select a business';
    }
    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    if (!formData.comment.trim()) {
      newErrors.comment = 'Please write a review';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError('');

      await reviewApi.createReview(formData);

      addToast({
        type: 'success',
        message: 'Review submitted successfully!'
      });

      navigate(`/businesses/${formData.businessId}`);
    } catch (err: any) {
      setError(err.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  const selectedBusiness = businesses.find(b => b.businessId === formData.businessId);

  return (
    <div className="container-custom py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="max-w-2xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <Star className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-h1">Write a Review</h1>
            <p className="text-body text-neutral-600">
              Share your experience with others
            </p>
          </div>
        </div>

        {error && (
          <Alert type="error" onClose={() => setError('')} className="mb-6">
            {error}
          </Alert>
        )}

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Select
              label="Select Business"
              name="businessId"
              value={formData.businessId}
              onChange={handleInputChange}
              error={errors.businessId}
              required
            >
              <option value={0}>Choose a business to review</option>
              {businesses.map((business) => (
                <option key={business.businessId} value={business.businessId}>
                  {business.businessName} - {business.city}
                </option>
              ))}
            </Select>

            {selectedBusiness && (
              <div className="bg-neutral-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">{selectedBusiness.businessName}</h4>
                <p className="text-sm text-neutral-600">
                  {selectedBusiness.address}, {selectedBusiness.city}
                </p>
              </div>
            )}

            <div>
              <label className="label">
                Rating <span className="text-error-500">*</span>
              </label>
              <div className="flex items-center space-x-4">
                <RatingStars
                  rating={formData.rating}
                  size="lg"
                  interactive
                  onRatingChange={handleRatingChange}
                />
                <span className="text-sm text-neutral-600">
                  {formData.rating > 0 ? `${formData.rating} out of 5 stars` : 'Select your rating'}
                </span>
              </div>
              {errors.rating && (
                <p className="error-text mt-1">{errors.rating}</p>
              )}
            </div>

            <div>
              <label className="label" htmlFor="comment">
                Your Review <span className="text-error-500">*</span>
              </label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                rows={6}
                className={`input-base ${errors.comment ? 'input-error' : ''}`}
                placeholder="Tell others about your experience with this business..."
                required
              />
              {errors.comment && (
                <p className="error-text">{errors.comment}</p>
              )}
              <p className="text-sm text-neutral-500 mt-2">
                {formData.comment.length} characters
              </p>
            </div>

            <div className="bg-primary-50 p-4 rounded-lg">
              <h4 className="font-medium text-primary-900 mb-2">
                📝 Review Guidelines
              </h4>
              <ul className="space-y-1 text-sm text-primary-800">
                <li>• Be honest and fair in your review</li>
                <li>• Provide specific details about your experience</li>
                <li>• Keep your review relevant and respectful</li>
                <li>• Avoid including personal information</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(-1)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={loading}
                className="flex-1"
              >
                Submit Review
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
