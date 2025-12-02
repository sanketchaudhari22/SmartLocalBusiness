import { useSearchStore } from '@/store';

export const useSearch = () => {
  const {
    results,
    query,
    filters,
    loading,
    error,
    totalResults,
    currentPage,
    totalPages,
    search,
    setQuery,
    setFilters,
    setPage,
    clearSearch,
    clearError
  } = useSearchStore();

  return {
    results,
    query,
    filters,
    loading,
    error,
    totalResults,
    currentPage,
    totalPages,
    search,
    setQuery,
    setFilters,
    setPage,
    clearSearch,
    clearError
  };
};
