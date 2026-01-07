import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { reviewApi } from '@/lib/api';
import { CreateReviewRequest } from '@/types';
import { toast } from 'sonner';

/**
 * Get reviews for a business
 */
export function useBusinessReviews(businessId?: string) {
  return useQuery({
    queryKey: ['reviews', 'business', businessId],
    queryFn: () => reviewApi.getByBusiness(businessId!),
    enabled: !!businessId,
  });
}

/**
 * Get user's reviews
 */
export function useUserReviews(userId?: string) {
  return useQuery({
    queryKey: ['reviews', 'user', userId],
    queryFn: () => reviewApi.getUserReviews(userId!),
    enabled: !!userId,
  });
}

/**
 * Create review mutation
 */
export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReviewRequest) => reviewApi.create(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', 'business', variables.businessId] });
      queryClient.invalidateQueries({ queryKey: ['business', variables.businessId] });
      toast.success('Review submitted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to submit review');
    },
  });
}

/**
 * Update review mutation
 */
export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateReviewRequest> }) =>
      reviewApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success('Review updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update review');
    },
  });
}

/**
 * Delete review mutation
 */
export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => reviewApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success('Review deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete review');
    },
  });
}
