// Search Types matching backend DTOs

export interface SearchRequest {
  keyword?: string;  // UI expected field
  searchTerm?: string;
  city?: string;
  categoryId?: number;
  latitude?: number;
  longitude?: number;
  radiusInKm?: number;
  minRating?: number;
  pageNumber: number;
  pageSize: number;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
