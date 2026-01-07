import { z } from 'zod';

/**
 * Review form validation schema
 */
export const reviewSchema = z.object({
  businessId: z.string().min(1, 'Business is required'),
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  reviewText: z.string().max(500, 'Review text must be at most 500 characters').optional(),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
