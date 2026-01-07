import { create } from 'zustand';
import { SearchParams } from '@/types';

interface SearchState {
  filters: SearchParams;
  recentSearches: string[];
  setFilters: (filters: Partial<SearchParams>) => void;
  clearFilters: () => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

const MAX_RECENT_SEARCHES = 10;

/**
 * Search filters and recent searches store
 */
export const useSearchStore = create<SearchState>((set) => ({
  filters: {
    query: '',
    categoryId: undefined,
    city: undefined,
    minRating: undefined,
    page: 1,
    pageSize: 12,
  },
  recentSearches: [],

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  clearFilters: () =>
    set({
      filters: {
        query: '',
        categoryId: undefined,
        city: undefined,
        minRating: undefined,
        page: 1,
        pageSize: 12,
      },
    }),

  addRecentSearch: (query) =>
    set((state) => {
      const trimmedQuery = query.trim();
      if (!trimmedQuery) return state;

      const filtered = state.recentSearches.filter((s) => s !== trimmedQuery);
      const updated = [trimmedQuery, ...filtered].slice(0, MAX_RECENT_SEARCHES);

      return { recentSearches: updated };
    }),

  clearRecentSearches: () => set({ recentSearches: [] }),
}));
