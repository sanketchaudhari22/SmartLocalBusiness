import { ReviewDto } from '@/types';
import { Card } from '@/components/common/Card';
import { RatingStars } from './RatingStars';
import { User, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface ReviewCardProps {
  review: ReviewDto;
  showBusinessName?: boolean;
}

export const ReviewCard = ({ review, showBusinessName = false }: ReviewCardProps) => {
  return (
    <Card>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <User className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="font-medium text-neutral-900">
              {review.userName || 'Anonymous User'}
            </p>
            {showBusinessName && review.businessName && (
              <p className="text-sm text-neutral-600">{review.businessName}</p>
            )}
          </div>
        </div>
        <RatingStars rating={review.rating} size="sm" />
      </div>

      <p className="text-body text-neutral-700 mb-3">{review.comment}</p>

      <div className="flex items-center text-sm text-neutral-500">
        <Calendar className="w-4 h-4 mr-1" />
        {format(new Date(review.createdAt), 'MMM dd, yyyy')}
      </div>
    </Card>
  );
};
