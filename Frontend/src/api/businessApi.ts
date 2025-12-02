import { axiosInstance } from './axiosInstance';
import type { BusinessDto, CreateBusinessDto } from '@/types';

export const businessApi = {
  // POST /api/businesses
  createBusiness: async (data: CreateBusinessDto) => {
    return axiosInstance.post('/api/businesses', data);
  },

  // GET /api/businesses
  getAllBusinesses: async () => {
    return axiosInstance.get<BusinessDto[]>('/api/businesses');
  },

  // GET /api/businesses/{id}
  getBusinessById: async (id: number) => {
    return axiosInstance.get<BusinessDto>(`/api/businesses/${id}`);
  },

  // PUT /api/businesses/{id}
  updateBusiness: async (id: number, data: CreateBusinessDto) => {
    return axiosInstance.put<BusinessDto>(`/api/businesses/${id}`, data);
  },

  // DELETE /api/businesses/{id}
  deleteBusiness: async (id: number) => {
    return axiosInstance.delete<boolean>(`/api/businesses/${id}`);
  },

  // GET /api/businesses/category/{categoryId}
  getBusinessesByCategory: async (categoryId: number) => {
    return axiosInstance.get<BusinessDto[]>(`/api/businesses/category/${categoryId}`);
  },

  // GET /api/businesses/user/{userId}
  getBusinessesByUser: async (userId: number) => {
    return axiosInstance.get<BusinessDto[]>(`/api/businesses/user/${userId}`);
  },
};
