'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useCreateReview, useAuth } from '@/lib/hooks';
import { reviewSchema, type ReviewFormData } from '@/lib/validations';
import { Review } from '@/types';
import { formatDate, getInitials } from '@/lib/utils';
import { Star, Loader2, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface ReviewSectionProps {
  businessId: string;
  reviews: Review[];
}

function StarRating({
  rating,
  onRatingChange,
  readonly = false,
  size = 'md',
}: {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onRatingChange?.(star)}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
          disabled={readonly}
          className={`${readonly ? '' : 'cursor-pointer hover:scale-110 transition-transform'}`}
        >
          <Star
            className={`${sizeClasses[size]} ${
              star <= (hoverRating || rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="border-b last:border-b-0 py-4">
      <div className="flex items-start gap-4">
        <Avatar>
          <AvatarFallback className="bg-primary/10 text-primary">
            {review.user ? getInitials(`${review.user.firstName} ${review.user.lastName}`) : 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium">
              {review.user ? `${review.user.firstName} ${review.user.lastName}` : 'Anonymous'}
            </h4>
            <span className="text-sm text-muted-foreground">{formatDate(review.createdAt)}</span>
          </div>
          <StarRating rating={review.rating} readonly size="sm" />
          {review.reviewText && (
            <p className="text-muted-foreground mt-2">{review.reviewText}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function ReviewSection({ businessId, reviews }: ReviewSectionProps) {
  const { isAuthenticated, user } = useAuth();
  const { mutate: createReview, isPending } = useCreateReview();
  const [showForm, setShowForm] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      businessId,
      rating: 0,
    },
  });

  const onSubmit = (data: ReviewFormData) => {
    createReview(
      {
        businessId,
        rating: selectedRating,
        reviewText: data.reviewText,
      },
      {
        onSuccess: () => {
          reset();
          setSelectedRating(0);
          setShowForm(false);
        },
      }
    );
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Reviews</CardTitle>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2">
              <StarRating rating={Math.round(averageRating)} readonly size="sm" />
              <span className="text-sm text-muted-foreground">
                {averageRating.toFixed(1)} ({reviews.length} reviews)
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Write Review Section */}
        {isAuthenticated ? (
          !showForm ? (
            <Button variant="outline" className="w-full mb-6" onClick={() => setShowForm(true)}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Write a Review
            </Button>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mb-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-4">Share your experience</h4>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Your Rating</Label>
                  <StarRating
                    rating={selectedRating}
                    onRatingChange={setSelectedRating}
                    size="lg"
                  />
                  {selectedRating === 0 && (
                    <p className="text-sm text-destructive">Please select a rating</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reviewText">Your Review (Optional)</Label>
                  <Textarea
                    id="reviewText"
                    placeholder="Tell others about your experience..."
                    rows={4}
                    {...register('reviewText')}
                    disabled={isPending}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setSelectedRating(0);
                      reset();
                    }}
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isPending || selectedRating === 0}>
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Review'
                    )}
                  </Button>
                </div>
              </div>
            </form>
          )
        ) : (
          <div className="text-center py-4 mb-6 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground mb-2">Login to write a review</p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        )}

        {/* Reviews List */}
        {reviews.length > 0 ? (
          <div className="divide-y">
            {reviews.map((review) => (
              <ReviewCard key={review.reviewId} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No reviews yet. Be the first to review!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
