import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { reviewService } from '../services/api';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Star } from 'lucide-react';

export const CreateReviewPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const businessId = searchParams.get('businessId');

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await reviewService.create({
        businessId: Number(businessId),
        userId: 1, // Get from auth
        rating,
        reviewText,
      });
      navigate(`/business/${businessId}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Write a Review
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= (hoverRating || rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  rows={6}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience..."
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" loading={loading} className="flex-1">
                  Submit Review
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};
