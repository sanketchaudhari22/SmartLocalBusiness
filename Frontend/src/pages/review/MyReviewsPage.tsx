import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { reviewApi } from '@/api';
import { ReviewDto } from '@/types';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Alert } from '@/components/common/Alert';
import { ReviewCard } from '@/components/review/ReviewCard';
import { useAuthStore } from '@/store';
import { useUIStore } from '@/store';
import { Plus, Trash2 } from 'lucide-react';

export const MyReviewsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addToast } = useUIStore();

  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetchMyReviews();
  }, []);

  const fetchMyReviews = async () => {
    if (!user?.userId) return;

    try {
      setLoading(true);
      setError('');

      const response = await reviewApi.getReviewsByUser(user.userId);
      setReviews(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (!window.confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingId(reviewId);
      await reviewApi.deleteReview(reviewId);

      setReviews((prev) => prev.filter((r) => r.reviewId !== reviewId));

      addToast({
        type: 'success',
        message: 'Review deleted successfully'
      });
    } catch (err: any) {
      addToast({
        type: 'error',
        message: err.message || 'Failed to delete review'
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-h1 mb-2">My Reviews</h1>
          <p className="text-body text-neutral-600">
            Manage your reviews and ratings
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate('/reviews/create')}
        >
          <Plus className="w-5 h-5 mr-2" />
          Write Review
        </Button>
      </div>

      {error && (
        <Alert type="error" onClose={() => setError('')} className="mb-6">
          {error}
        </Alert>
      )}

      {reviews.length === 0 ? (
        <Card>
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-h3 mb-2">No reviews yet</h3>
            <p className="text-body text-neutral-600 mb-6">
              Share your experiences by writing your first review
            </p>
            <Button
              variant="primary"
              onClick={() => navigate('/reviews/create')}
            >
              <Plus className="w-5 h-5 mr-2" />
              Write Your First Review
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.reviewId} className="relative">
              <ReviewCard review={review} showBusinessName />
              <div className="absolute top-4 right-4">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteReview(review.reviewId)}
                  isLoading={deletingId === review.reviewId}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
