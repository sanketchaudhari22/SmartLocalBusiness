// Booking Types matching backend DTOs

export const BookingStatus = {
  Pending: 0,
  Confirmed: 1,
  Cancelled: 2,
  Completed: 3,
} as const;

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];

export interface BookingDto {
  bookingId: number;
  userId: number;
  businessId: number;
  serviceId: number;
  bookingDate: string;
  status: BookingStatus;
  totalAmount: number;
  notes?: string;

  // UI EXPECTED FIELDS
  bookingTime?: string;
  businessName?: string;
  serviceName?: string;
  customerName?: string;
  createdAt?: string;
  businessCity?: string;
}

export interface CreateBookingDto {
  userId: number;
  businessId: number;
  serviceId: number;
  bookingDate: string;
  notes?: string;

  // UI field (optional)
  bookingTime?: string;
}

export interface UpdateStatusRequest {
  status: BookingStatus;
}
