import { Review } from '@/types';
import { ReviewCard } from './ReviewCard';
import { EmptyState } from '../shared/EmptyState';
import { Skeleton } from '../common/Skeleton';
import { Star } from 'lucide-react';
import { Pagination } from '../common/Pagination';

interface ReviewListProps {
  reviews: Review[];
  loading?: boolean;
  error?: string | null;
  onDelete?: (reviewId: string) => Promise<void>;
  onEdit?: (review: Review) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  showActions?: boolean;
}

export const ReviewList = ({
  reviews,
  loading = false,
  error = null,
  onDelete,
  onEdit,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showActions = false
}: ReviewListProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl p-6 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <Skeleton variant="text" className="h-5 w-32" />
                <Skeleton variant="text" className="h-4 w-24" />
              </div>
              <Skeleton variant="text" className="h-4 w-20" />
            </div>
            <Skeleton variant="text" className="h-16 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error-50 border border-error-200 rounded-lg p-4">
        <p className="text-error-700 text-sm">{error}</p>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <EmptyState
        icon={<Star className="w-12 h-12" />}
        title="No reviews yet"
        description="Be the first to leave a review!"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onDelete={showActions ? onDelete : undefined}
            onEdit={showActions ? onEdit : undefined}
          />
        ))}
      </div>

      {totalPages > 1 && onPageChange && (
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};
