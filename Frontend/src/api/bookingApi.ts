import { axiosInstance } from './axiosInstance';
import type { BookingDto, CreateBookingDto, BookingStatus } from '@/types';

export const bookingApi = {
  // POST /api/booking
  createBooking: async (data: CreateBookingDto) => {
    return axiosInstance.post('/api/booking', data);
  },

  // GET /api/booking/{id}
  getBookingById: async (id: number) => {
    return axiosInstance.get<BookingDto>(`/api/booking/${id}`);
  },

  // GET /api/booking/user/{userId}
  getUserBookings: async (userId: number) => {
    return axiosInstance.get<BookingDto[]>(`/api/booking/user/${userId}`);
  },

  // GET /api/booking/business/{businessId}
  getBusinessBookings: async (businessId: number) => {
    return axiosInstance.get<BookingDto[]>(`/api/booking/business/${businessId}`);
  },

  // GET /api/booking/user/{userId}/upcoming
  getUpcomingBookings: async (userId: number) => {
    return axiosInstance.get<BookingDto[]>(`/api/booking/user/${userId}/upcoming`);
  },

  // GET /api/booking/user/{userId}/history
  getBookingHistory: async (userId: number) => {
    return axiosInstance.get<BookingDto[]>(`/api/booking/user/${userId}/history`);
  },

  // PUT /api/booking/{id}/status
  updateBookingStatus: async (id: number, status: BookingStatus) => {
    return axiosInstance.put<BookingDto>(`/api/booking/${id}/status`, { status });
  },

  // DELETE /api/booking/{id}
  cancelBooking: async (id: number) => {
    return axiosInstance.delete<boolean>(`/api/booking/${id}`);
  },
};
