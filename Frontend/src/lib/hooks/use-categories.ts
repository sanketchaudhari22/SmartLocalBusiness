import { useQuery } from '@tanstack/react-query';
import { categoryApi } from '@/lib/api';

/**
 * Get all categories
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes (categories don't change often)
  });
}

/**
 * Get category by ID
 */
export function useCategory(id?: string) {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => categoryApi.getById(id!),
    enabled: !!id,
  });
}
