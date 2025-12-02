import { useEffect } from 'react';
import { useReviewStore } from '@/store';

export const useReview = (reviewId?: string, businessId?: string) => {
  const {
    reviews,
    selectedReview,
    loading,
    error,
    fetchReviews,
    fetchReviewById,
    createReview,
    updateReview,
    deleteReview,
    setSelectedReview,
    clearError
  } = useReviewStore();

  useEffect(() => {
    if (reviewId) {
      fetchReviewById(reviewId);
    } else if (businessId) {
      fetchReviews(businessId);
    }
  }, [reviewId, businessId, fetchReviewById, fetchReviews]);

  return {
    reviews,
    selectedReview,
    loading,
    error,
    fetchReviews,
    fetchReviewById,
    createReview,
    updateReview,
    deleteReview,
    setSelectedReview,
    clearError
  };
};
