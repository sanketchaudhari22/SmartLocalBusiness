import { create } from "zustand";
import { bookingApi } from "@/api";
import type { BookingDto, CreateBookingDto, BookingStatus } from "@/types";

interface BookingState {
  bookings: BookingDto[];
  selectedBooking: BookingDto | null;
  loading: boolean;
  error: string | null;

  // Actions
  getUserBookings: (userId: number) => Promise<void>;
  getBookingById: (id: number) => Promise<void>;
  createBooking: (data: CreateBookingDto) => Promise<void>;
  cancelBooking: (id: number) => Promise<void>;
  updateBookingStatus: (id: number, status: BookingStatus) => Promise<void>;
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  selectedBooking: null,
  loading: false,
  error: null,

  getUserBookings: async (userId: number) => {
    set({ loading: true });
    try {
      const res = await bookingApi.getUserBookings(userId);
      set({ bookings: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getBookingById: async (id: number) => {
    set({ loading: true });
    try {
      const res = await bookingApi.getBookingById(id);
      set({ selectedBooking: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  createBooking: async (data: CreateBookingDto) => {
    set({ loading: true });
    try {
      const res = await bookingApi.createBooking(data);
      set((s) => ({ bookings: [...s.bookings, res.data], loading: false }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  cancelBooking: async (id: number) => {
    set({ loading: true });
    try {
      await bookingApi.cancelBooking(id);
      set((s) => ({
        bookings: s.bookings.filter((b) => b.bookingId !== id),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  updateBookingStatus: async (id: number, status: BookingStatus) => {
    set({ loading: true });
    try {
      const res = await bookingApi.updateBookingStatus(id, status);
      set((s) => ({
        bookings: s.bookings.map((b) =>
          b.bookingId === id ? res.data : b
        ),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
