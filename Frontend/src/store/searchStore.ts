import { create } from "zustand";
import { serviceApi } from "@/api";
import type { ServiceDto, CreateServiceDto, UpdateServiceDto } from "@/types";

interface ServiceState {
  services: ServiceDto[];
  selectedService: ServiceDto | null;
  loading: boolean;
  error: string | null;

  getServiceById: (id: number) => Promise<void>;
  getServicesByBusiness: (businessId: number) => Promise<void>;
  createService: (data: CreateServiceDto) => Promise<void>;
  updateService: (id: number, data: UpdateServiceDto) => Promise<void>;
  deleteService: (id: number) => Promise<void>;
}

export const useServiceStore = create<ServiceState>((set) => ({
  services: [],
  selectedService: null,
  loading: false,
  error: null,

  getServiceById: async (id: number) => {
    set({ loading: true });
    try {
      const res = await serviceApi.getServiceById(id);
      set({ selectedService: res.data, loading: false });
    } catch (err: any) {
      set({ loading: false, error: err.message });
    }
  },

  getServicesByBusiness: async (businessId: number) => {
    set({ loading: true });
    try {
      const res = await serviceApi.getServicesByBusiness(businessId);
      set({ services: res.data, loading: false });
    } catch (err: any) {
      set({ loading: false, error: err.message });
    }
  },

  createService: async (data: CreateServiceDto) => {
    set({ loading: true });
    try {
      const res = await serviceApi.createService(data);
      set((s) => ({
        services: [...s.services, res.data],
        loading: false,
      }));
    } catch (err: any) {
      set({ loading: false, error: err.message });
    }
  },

  updateService: async (id: number, data: UpdateServiceDto) => {
    set({ loading: true });
    try {
      const res = await serviceApi.updateService(id, data);
      set((s) => ({
        services: s.services.map((srv) =>
          srv.serviceId === id ? res.data : srv
        ),
        loading: false,
      }));
    } catch (err: any) {
      set({ loading: false, error: err.message });
    }
  },

  deleteService: async (id: number) => {
    set({ loading: true });
    try {
      await serviceApi.deleteService(id);
      set((s) => ({
        services: s.services.filter((srv) => srv.serviceId !== id),
        loading: false,
      }));
    } catch (err: any) {
      set({ loading: false, error: err.message });
    }
  },
}));
  