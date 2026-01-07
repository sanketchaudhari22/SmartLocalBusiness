import apiClient from './client';
import { Category, ApiResponse } from '@/types';

/**
 * Category API endpoints
 */
export const categoryApi = {
  /**
   * Get all categories
   */
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get<ApiResponse<Category[]>>('/categories');
    return response.data.data || [];
  },

  /**
   * Get category by ID
   */
  getById: async (id: string): Promise<Category> => {
    const response = await apiClient.get<ApiResponse<Category>>(`/categories/${id}`);
    return response.data.data;
  },

  /**
   * Get category statistics
   */
  getStats: async (id: string): Promise<any> => {
    const response = await apiClient.get<ApiResponse<any>>(`/categories/${id}/stats`);
    return response.data.data;
  },

  /**
   * Create category (Admin only)
   */
  create: async (data: Partial<Category>): Promise<Category> => {
    const response = await apiClient.post<ApiResponse<Category>>('/categories', data);
    return response.data.data;
  },

  /**
   * Update category (Admin only)
   */
  update: async (id: string, data: Partial<Category>): Promise<Category> => {
    const response = await apiClient.put<ApiResponse<Category>>(`/categories/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete category (Admin only)
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/categories/${id}`);
  },
};
