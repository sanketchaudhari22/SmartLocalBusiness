import apiClient from './client';
import { Business, CreateBusinessRequest, ApiResponse } from '@/types';

/**
 * Business API endpoints
 */
export const businessApi = {
  /**
   * Get all businesses
   */
  getAll: async (): Promise<Business[]> => {
    const response = await apiClient.get<ApiResponse<Business[]>>('/businesses');
    return response.data.data || [];
  },

  /**
   * Get business by ID
   */
  getById: async (id: string): Promise<Business> => {
    const response = await apiClient.get<ApiResponse<Business>>(`/businesses/${id}`);
    return response.data.data;
  },

  /**
   * Get businesses by category
   */
  getByCategory: async (categoryId: string): Promise<Business[]> => {
    const response = await apiClient.get<ApiResponse<Business[]>>(`/businesses/category/${categoryId}`);
    return response.data.data || [];
  },

  /**
   * Get businesses for current user (dashboard)
   */
  getMyBusinesses: async (userId: string): Promise<Business[]> => {
    const response = await apiClient.get<ApiResponse<Business[]>>(`/businesses/user/${userId}`);
    return response.data.data || [];
  },

  /**
   * Create new business
   */
  create: async (data: CreateBusinessRequest): Promise<Business> => {
    const response = await apiClient.post<ApiResponse<Business>>('/businesses', data);
    return response.data.data;
  },

  /**
   * Update business
   */
  update: async (id: string, data: Partial<CreateBusinessRequest>): Promise<Business> => {
    const response = await apiClient.put<ApiResponse<Business>>(`/businesses/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete business
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/businesses/${id}`);
  },
};
