import apiClient from './client';
import { Review, CreateReviewRequest, ApiResponse } from '@/types';

/**
 * Review API endpoints
 */
export const reviewApi = {
  /**
   * Get all reviews
   */
  getAll: async (): Promise<Review[]> => {
    const response = await apiClient.get<ApiResponse<Review[]>>('/review');
    return response.data.data || [];
  },

  /**
   * Get review by ID
   */
  getById: async (id: string): Promise<Review> => {
    const response = await apiClient.get<ApiResponse<Review>>(`/review/${id}`);
    return response.data.data;
  },

  /**
   * Get reviews for a business
   */
  getByBusiness: async (businessId: string): Promise<Review[]> => {
    const response = await apiClient.get<ApiResponse<Review[]>>(`/review/business/${businessId}`);
    return response.data.data || [];
  },

  /**
   * Get user's reviews
   */
  getUserReviews: async (userId: string): Promise<Review[]> => {
    const response = await apiClient.get<ApiResponse<Review[]>>(`/review/user/${userId}`);
    return response.data.data || [];
  },

  /**
   * Get average rating for a business
   */
  getAverageRating: async (businessId: string): Promise<number> => {
    const response = await apiClient.get<ApiResponse<number>>(`/review/business/${businessId}/average`);
    return response.data.data || 0;
  },

  /**
   * Create new review
   */
  create: async (data: CreateReviewRequest): Promise<Review> => {
    const response = await apiClient.post<ApiResponse<Review>>('/review', data);
    return response.data.data;
  },

  /**
   * Update review
   */
  update: async (id: string, data: Partial<CreateReviewRequest>): Promise<Review> => {
    const response = await apiClient.put<ApiResponse<Review>>(`/review/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete review
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/review/${id}`);
  },
};
