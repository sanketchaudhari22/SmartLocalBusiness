import apiClient from './client';
import { Service, CreateServiceRequest, ApiResponse } from '@/types';

/**
 * Service API endpoints
 */
export const serviceApi = {
  /**
   * Get service by ID
   */
  getById: async (id: string): Promise<Service> => {
    const response = await apiClient.get<ApiResponse<Service>>(`/services/${id}`);
    return response.data.data;
  },

  /**
   * Get services for a business
   */
  getByBusiness: async (businessId: string): Promise<Service[]> => {
    const response = await apiClient.get<ApiResponse<Service[]>>(`/services/business/${businessId}`);
    return response.data.data || [];
  },

  /**
   * Create new service
   */
  create: async (data: CreateServiceRequest): Promise<Service> => {
    const response = await apiClient.post<ApiResponse<Service>>('/services', data);
    return response.data.data;
  },

  /**
   * Update service
   */
  update: async (id: string, data: Partial<CreateServiceRequest>): Promise<Service> => {
    const response = await apiClient.put<ApiResponse<Service>>(`/services/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete service
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/services/${id}`);
  },
};
