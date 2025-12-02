import { create } from "zustand";
import { reviewApi } from "@/api";
import type { ReviewDto } from "@/types";

interface ReviewState {
  reviews: ReviewDto[];
  selectedReview: ReviewDto | null;
  loading: boolean;
  error: string | null;

  getAllReviews: () => Promise<void>;
  getReviewById: (id: number) => Promise<void>;
  getBusinessReviews: (businessId: number) => Promise<void>;
  addReview: (data: ReviewDto) => Promise<void>;
  updateReview: (id: number, data: ReviewDto) => Promise<void>;
  deleteReview: (id: number) => Promise<void>;
}

export const useReviewStore = create<ReviewState>((set) => ({
  reviews: [],
  selectedReview: null,
  loading: false,
  error: null,

  getAllReviews: async () => {
    set({ loading: true });
    try {
      const res = await reviewApi.getAllReviews();
      set({ reviews: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getReviewById: async (id: number) => {
    set({ loading: true });
    try {
      const res = await reviewApi.getReviewById(id);
      set({ selectedReview: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getBusinessReviews: async (businessId: number) => {
    set({ loading: true });
    try {
      const res = await reviewApi.getBusinessReviews(businessId);
      set({ reviews: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  addReview: async (data: ReviewDto) => {
    set({ loading: true });
    try {
      const res = await reviewApi.addReview(data);
      set((s) => ({
        reviews: [...s.reviews, res.data],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  updateReview: async (id: number, data: ReviewDto) => {
    set({ loading: true });
    try {
      const res = await reviewApi.updateReview(id, data);
      set((s) => ({
        reviews: s.reviews.map((r) =>
          r.reviewId === id ? res.data : r
        ),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  deleteReview: async (id: number) => {
    set({ loading: true });
    try {
      await reviewApi.deleteReview(id);
      set((s) => ({
        reviews: s.reviews.filter((r) => r.reviewId !== id),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
