import { z } from 'zod';

/**
 * Booking form validation schema
 */
export const bookingSchema = z.object({
  businessId: z.string().min(1, 'Business is required'),
  serviceId: z.string().min(1, 'Service is required'),
  bookingDate: z.string().min(1, 'Booking date is required'),
  bookingTime: z.string().min(1, 'Booking time is required'),
  notes: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
