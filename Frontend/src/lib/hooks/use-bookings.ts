import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { bookingApi } from '@/lib/api';
import { CreateBookingRequest, UpdateBookingStatusRequest } from '@/types';
import { toast } from 'sonner';

/**
 * Get booking by ID
 */
export function useBooking(id?: string) {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => bookingApi.getById(id!),
    enabled: !!id,
  });
}

/**
 * Get user's bookings
 */
export function useUserBookings(userId?: string) {
  return useQuery({
    queryKey: ['bookings', 'user', userId],
    queryFn: () => bookingApi.getUserBookings(userId!),
    enabled: !!userId,
  });
}

/**
 * Get user's upcoming bookings
 */
export function useUpcomingBookings(userId?: string) {
  return useQuery({
    queryKey: ['bookings', 'user', userId, 'upcoming'],
    queryFn: () => bookingApi.getUpcomingBookings(userId!),
    enabled: !!userId,
  });
}

/**
 * Get booking history
 */
export function useBookingHistory(userId?: string) {
  return useQuery({
    queryKey: ['bookings', 'user', userId, 'history'],
    queryFn: () => bookingApi.getBookingHistory(userId!),
    enabled: !!userId,
  });
}

/**
 * Get business bookings
 */
export function useBusinessBookings(businessId?: string) {
  return useQuery({
    queryKey: ['bookings', 'business', businessId],
    queryFn: () => bookingApi.getBusinessBookings(businessId!),
    enabled: !!businessId,
  });
}

/**
 * Create booking mutation
 */
export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBookingRequest) => bookingApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Booking created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create booking');
    },
  });
}

/**
 * Update booking status mutation
 */
export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBookingStatusRequest }) =>
      bookingApi.updateStatus(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['booking', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Booking status updated!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update booking status');
    },
  });
}

/**
 * Cancel booking mutation
 */
export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => bookingApi.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Booking cancelled successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to cancel booking');
    },
  });
}
