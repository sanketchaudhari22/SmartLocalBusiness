import { axiosInstance } from './axiosInstance';
import type { CategoryDto, CreateCategoryDto } from '@/types';

export const categoryApi = {
  // GET /api/categories
  getAllCategories: async () => {
    return axiosInstance.get<CategoryDto[]>('/api/categories');
  },

  // GET /api/categories/{id}
  getCategoryById: async (id: number) => {
    return axiosInstance.get<CategoryDto>(`/api/categories/${id}`);
  },

  // GET /api/categories/{id}/stats
  getCategoryStats: async (id: number) => {
    return axiosInstance.get(`/api/categories/${id}/stats`);
  },

  // POST /api/categories (Admin)
  createCategory: async (data: CreateCategoryDto) => {
    return axiosInstance.post<CategoryDto>('/api/categories', data);
  },

  // PUT /api/categories/{id} (Admin)
  updateCategory: async (id: number, data: CreateCategoryDto) => {
    return axiosInstance.put<CategoryDto>(`/api/categories/${id}`, data);
  },

  // DELETE /api/categories/{id} (Admin)
  deleteCategory: async (id: number) => {
    return axiosInstance.delete(`/api/categories/${id}`);
  },
};
