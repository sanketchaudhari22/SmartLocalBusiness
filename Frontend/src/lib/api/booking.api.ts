import apiClient from './client';
import { Booking, CreateBookingRequest, UpdateBookingStatusRequest, ApiResponse } from '@/types';

/**
 * Booking API endpoints
 */
export const bookingApi = {
  /**
   * Get booking by ID
   */
  getById: async (id: string): Promise<Booking> => {
    const response = await apiClient.get<ApiResponse<Booking>>(`/booking/${id}`);
    return response.data.data;
  },

  /**
   * Get user's bookings
   */
  getUserBookings: async (userId: string): Promise<Booking[]> => {
    const response = await apiClient.get<ApiResponse<Booking[]>>(`/booking/user/${userId}`);
    return response.data.data || [];
  },

  /**
   * Get business's bookings
   */
  getBusinessBookings: async (businessId: string): Promise<Booking[]> => {
    const response = await apiClient.get<ApiResponse<Booking[]>>(`/booking/business/${businessId}`);
    return response.data.data || [];
  },

  /**
   * Get user's upcoming bookings
   */
  getUpcomingBookings: async (userId: string): Promise<Booking[]> => {
    const response = await apiClient.get<ApiResponse<Booking[]>>(`/booking/user/${userId}/upcoming`);
    return response.data.data || [];
  },

  /**
   * Get user's booking history
   */
  getBookingHistory: async (userId: string): Promise<Booking[]> => {
    const response = await apiClient.get<ApiResponse<Booking[]>>(`/booking/user/${userId}/history`);
    return response.data.data || [];
  },

  /**
   * Create new booking
   */
  create: async (data: CreateBookingRequest): Promise<Booking> => {
    const response = await apiClient.post<ApiResponse<Booking>>('/booking', data);
    return response.data.data;
  },

  /**
   * Update booking status
   */
  updateStatus: async (
    id: string,
    data: UpdateBookingStatusRequest
  ): Promise<Booking> => {
    const response = await apiClient.put<ApiResponse<Booking>>(`/booking/${id}/status`, data);
    return response.data.data;
  },

  /**
   * Cancel booking
   */
  cancel: async (id: string): Promise<void> => {
    await apiClient.delete(`/booking/${id}`);
  },
};
