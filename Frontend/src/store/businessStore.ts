import { create } from "zustand";
import { businessApi } from "@/api";
import type { BusinessDto, CreateBusinessDto } from "@/types";

interface BusinessState {
  businesses: BusinessDto[];
  selectedBusiness: BusinessDto | null;
  loading: boolean;
  error: string | null;

  getAllBusinesses: () => Promise<void>;
  getBusinessById: (id: number) => Promise<void>;
  createBusiness: (data: CreateBusinessDto) => Promise<void>;
  updateBusiness: (id: number, data: CreateBusinessDto) => Promise<void>;
  deleteBusiness: (id: number) => Promise<void>;
}

export const useBusinessStore = create<BusinessState>((set) => ({
  businesses: [],
  selectedBusiness: null,
  loading: false,
  error: null,

  getAllBusinesses: async () => {
    set({ loading: true });
    try {
      const res = await businessApi.getAllBusinesses();
      set({ businesses: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getBusinessById: async (id: number) => {
    set({ loading: true });
    try {
      const res = await businessApi.getBusinessById(id);
      set({ selectedBusiness: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  createBusiness: async (data: CreateBusinessDto) => {
    set({ loading: true });
    try {
      const res = await businessApi.createBusiness(data);
      set((s) => ({
        businesses: [...s.businesses, res.data],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  updateBusiness: async (id: number, data: CreateBusinessDto) => {
    set({ loading: true });
    try {
      const res = await businessApi.updateBusiness(id, data);
      set((s) => ({
        businesses: s.businesses.map((b) =>
          b.businessId === id ? res.data : b
        ),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  deleteBusiness: async (id: number) => {
    set({ loading: true });
    try {
      await businessApi.deleteBusiness(id);
      set((s) => ({
        businesses: s.businesses.filter((b) => b.businessId !== id),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
