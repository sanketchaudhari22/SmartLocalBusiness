import { useEffect } from 'react';
import { useBookingStore } from '@/store';

export const useBooking = (bookingId?: string) => {
  const {
    bookings,
    selectedBooking,
    loading,
    error,
    fetchBookings,
    fetchBookingById,
    createBooking,
    cancelBooking,
    setSelectedBooking,
    clearError
  } = useBookingStore();

  useEffect(() => {
    if (bookingId) {
      fetchBookingById(bookingId);
    }
  }, [bookingId, fetchBookingById]);

  return {
    bookings,
    selectedBooking,
    loading,
    error,
    fetchBookings,
    fetchBookingById,
    createBooking,
    cancelBooking,
    setSelectedBooking,
    clearError
  };
};
