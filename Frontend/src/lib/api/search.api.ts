import apiClient from './client';
import { SearchParams, NearbySearchParams, SearchResult, Business, ApiResponse } from '@/types';

// Backend PagedResult format
interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Search API endpoints
 */
export const searchApi = {
  /**
   * Standard search with filters
   */
  search: async (params: SearchParams): Promise<SearchResult> => {
    const queryParams = new URLSearchParams();

    if (params.query) queryParams.append('query', params.query);
    if (params.categoryId) queryParams.append('categoryId', params.categoryId);
    if (params.city) queryParams.append('city', params.city);
    if (params.minRating) queryParams.append('minRating', params.minRating.toString());
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.pageSize) queryParams.append('pageSize', params.pageSize.toString());

    const response = await apiClient.get<ApiResponse<PagedResult<Business>>>(`/search?${queryParams.toString()}`);
    const result = response.data.data;

    // Map backend PagedResult to frontend SearchResult
    return {
      businesses: result?.items || [],
      totalCount: result?.totalCount || 0,
      page: result?.pageNumber || 1,
      pageSize: result?.pageSize || 10,
      totalPages: result?.totalPages || 0,
    };
  },

  /**
   * Search nearby businesses
   */
  searchNearby: async (params: NearbySearchParams): Promise<Business[]> => {
    const queryParams = new URLSearchParams({
      latitude: params.latitude.toString(),
      longitude: params.longitude.toString(),
    });

    if (params.radiusInKm) queryParams.append('radiusInKm', params.radiusInKm.toString());
    if (params.categoryId) queryParams.append('categoryId', params.categoryId);

    const response = await apiClient.get<ApiResponse<Business[]>>(`/search/nearby?${queryParams.toString()}`);
    return response.data.data || [];
  },

  /**
   * Quick search (autocomplete)
   */
  quickSearch: async (term: string, limit: number = 5): Promise<Business[]> => {
    const response = await apiClient.get<ApiResponse<Business[]>>(
      `/search/quick?term=${encodeURIComponent(term)}&limit=${limit}`
    );
    return response.data.data || [];
  },
};
