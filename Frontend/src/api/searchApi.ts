import { axiosInstance } from './axiosInstance';
import type { SearchRequest, PagedResult, BusinessDto } from '@/types';

export const searchApi = {
  // POST /api/search/search
  searchBusinesses: async (request: SearchRequest) => {
    return axiosInstance.post<PagedResult<BusinessDto>>('/api/search/search', request);
  },

  // GET /api/search/nearby
  getNearbyBusinesses: async (
    latitude: number,
    longitude: number,
    radiusInKm: number = 10,
    categoryId?: number
  ) => {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      radiusInKm: radiusInKm.toString(),
      ...(categoryId && { categoryId: categoryId.toString() }),
    });
    return axiosInstance.get<BusinessDto[]>(`/api/search/nearby?${params}`);
  },

  // GET /api/search/quick
  quickSearch: async (term: string, limit: number = 5) => {
    return axiosInstance.get<BusinessDto[]>(
      `/api/search/quick?term=${term}&limit=${limit}`
    );
  },
};
