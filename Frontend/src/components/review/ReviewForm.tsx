import { useState } from 'react';
import { Business } from '@/types';
import { RatingStars } from '../business/RatingStars';
import { Textarea } from '../common/Textarea';
import { Button } from '../common/Button';
import { Alert } from '../common/Alert';
import { Save, X, Star } from 'lucide-react';

interface ReviewFormProps {
  business: Business;
  initialRating?: number;
  initialComment?: string;
  onSubmit: (data: { rating: number; comment: string }) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
  error?: string | null;
  submitLabel?: string;
}

export const ReviewForm = ({
  business,
  initialRating = 0,
  initialComment = '',
  onSubmit,
  onCancel,
  loading = false,
  error = null,
  submitLabel = 'Submit Review'
}: ReviewFormProps) => {
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    if (!comment.trim()) {
      newErrors.comment = 'Please write a review';
    } else if (comment.trim().length < 10) {
      newErrors.comment = 'Review must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await onSubmit({ rating, comment: comment.trim() });
    } catch (err) {
      console.error('Review submission error:', err);
    }
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: '' }));
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    if (errors.comment) {
      setErrors(prev => ({ ...prev, comment: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert type="error" title="Error">
          {error}
        </Alert>
      )}

      {/* Business Info */}
      <div className="bg-primary-50 rounded-xl p-6 border border-primary-200">
        <h3 className="text-h4 text-neutral-900 mb-2">{business.name}</h3>
        <p className="text-sm text-neutral-600">{business.address}</p>
        {business.category && (
          <p className="text-sm text-primary-600 mt-2">{business.category}</p>
        )}
      </div>

      {/* Rating */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <label className="block text-sm font-medium text-neutral-900 mb-3">
          Your Rating <span className="text-error">*</span>
        </label>

        <div className="flex items-center gap-4">
          <RatingStars
            rating={rating}
            onChange={handleRatingChange}
            size="xl"
            interactive
          />
          {rating > 0 && (
            <span className="text-lg font-semibold text-neutral-900">
              {rating}.0
            </span>
          )}
        </div>

        {errors.rating && (
          <p className="text-sm text-error mt-2">{errors.rating}</p>
        )}

        {/* Rating descriptions */}
        <div className="mt-4 grid grid-cols-5 gap-2 text-xs text-center">
          <div className="text-neutral-600">
            <Star className="w-4 h-4 mx-auto mb-1 text-error" />
            <span>Poor</span>
          </div>
          <div className="text-neutral-600">
            <Star className="w-4 h-4 mx-auto mb-1 text-warning" />
            <span>Fair</span>
          </div>
          <div className="text-neutral-600">
            <Star className="w-4 h-4 mx-auto mb-1 text-warning" />
            <span>Good</span>
          </div>
          <div className="text-neutral-600">
            <Star className="w-4 h-4 mx-auto mb-1 text-success" />
            <span>Very Good</span>
          </div>
          <div className="text-neutral-600">
            <Star className="w-4 h-4 mx-auto mb-1 text-success" />
            <span>Excellent</span>
          </div>
        </div>
      </div>

      {/* Review Text */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <Textarea
          label="Your Review"
          name="comment"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Share your experience with this business..."
          rows={6}
          error={errors.comment}
          required
          helperText={`${comment.length} / 500 characters`}
          maxLength={500}
        />
      </div>

      {/* Guidelines */}
      <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
        <p className="text-sm font-medium text-neutral-900 mb-2">
          Review Guidelines:
        </p>
        <ul className="text-sm text-neutral-600 space-y-1 list-disc list-inside">
          <li>Be honest and fair in your review</li>
          <li>Focus on your personal experience</li>
          <li>Be respectful and constructive</li>
          <li>Avoid offensive language or personal attacks</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          leftIcon={<Save className="w-5 h-5" />}
        >
          {submitLabel}
        </Button>

        {onCancel && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onCancel}
            leftIcon={<X className="w-5 h-5" />}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};
