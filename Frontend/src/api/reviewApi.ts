import { axiosInstance } from './axiosInstance';
import type { ReviewDto, AverageRatingResponse } from '@/types';

export const reviewApi = {
  // GET /api/review
  getAllReviews: async () => {
    return axiosInstance.get<ReviewDto[]>('/api/review');
  },

  // GET /api/review/{id}
  getReviewById: async (id: number) => {
    return axiosInstance.get<ReviewDto>(`/api/review/${id}`);
  },

  // GET /api/review/business/{businessId}
  getBusinessReviews: async (businessId: number) => {
    return axiosInstance.get<ReviewDto[]>(`/api/review/business/${businessId}`);
  },

  // GET /api/review/user/{userId}
  getUserReviews: async (userId: number) => {
    return axiosInstance.get<ReviewDto[]>(`/api/review/user/${userId}`);
  },

  // GET /api/review/business/{businessId}/average
  getAverageRating: async (businessId: number) => {
    return axiosInstance.get<AverageRatingResponse>(
      `/api/review/business/${businessId}/average`
    );
  },

  // POST /api/review
  addReview: async (data: ReviewDto) => {
    return axiosInstance.post<ReviewDto>('/api/review', data);
  },

  // PUT /api/review/{id}
  updateReview: async (id: number, data: ReviewDto) => {
    return axiosInstance.put<ReviewDto>(`/api/review/${id}`, data);
  },

  // DELETE /api/review/{id}
  deleteReview: async (id: number) => {
    return axiosInstance.delete(`/api/review/${id}`);
  },
};
