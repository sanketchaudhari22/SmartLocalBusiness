import { axiosInstance } from './axiosInstance';
import type { ServiceDto, CreateServiceDto, UpdateServiceDto } from '@/types';

export const serviceApi = {
  // GET /api/services/{id}
  getServiceById: async (id: number) => {
    return axiosInstance.get<ServiceDto>(`/api/services/${id}`);
  },

  // GET /api/services/business/{businessId}
  getServicesByBusiness: async (businessId: number) => {
    return axiosInstance.get<ServiceDto[]>(`/api/services/business/${businessId}`);
  },

  // POST /api/services
  createService: async (data: CreateServiceDto) => {
    return axiosInstance.post<ServiceDto>('/api/services', data);
  },

  // PUT /api/services/{id}
  updateService: async (id: number, data: UpdateServiceDto) => {
    return axiosInstance.put<ServiceDto>(`/api/services/${id}`, data);
  },

  // DELETE /api/services/{id}
  deleteService: async (id: number) => {
    return axiosInstance.delete<boolean>(`/api/services/${id}`);
  },
};
