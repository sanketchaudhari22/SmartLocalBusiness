import { useQuery } from '@tanstack/react-query';
import { searchApi } from '@/lib/api';
import { SearchParams, NearbySearchParams } from '@/types';
import { useSearchStore } from '@/lib/stores';

/**
 * Search businesses hook
 */
export function useSearch(params?: SearchParams) {
  const { filters } = useSearchStore();
  const searchParams = params || filters;

  return useQuery({
    queryKey: ['search', searchParams],
    queryFn: () => searchApi.search(searchParams),
    enabled: !!(searchParams.query || searchParams.categoryId || searchParams.city),
  });
}

/**
 * Nearby search hook
 */
export function useNearbySearch(params?: NearbySearchParams) {
  return useQuery({
    queryKey: ['search', 'nearby', params],
    queryFn: () => searchApi.searchNearby(params!),
    enabled: !!(params?.latitude && params?.longitude),
  });
}

/**
 * Quick search (autocomplete) hook
 */
export function useQuickSearch(term: string, limit?: number) {
  return useQuery({
    queryKey: ['search', 'quick', term, limit],
    queryFn: () => searchApi.quickSearch(term, limit),
    enabled: term.length >= 2,
    staleTime: 30 * 1000, // 30 seconds
  });
}
