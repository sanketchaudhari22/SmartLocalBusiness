import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: string[];
  addFavorite: (businessId: string) => void;
  removeFavorite: (businessId: string) => void;
  toggleFavorite: (businessId: string) => void;
  isFavorite: (businessId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (businessId: string) => {
        set((state) => ({
          favorites: state.favorites.includes(businessId)
            ? state.favorites
            : [...state.favorites, businessId],
        }));
      },

      removeFavorite: (businessId: string) => {
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== businessId),
        }));
      },

      toggleFavorite: (businessId: string) => {
        const { favorites } = get();
        if (favorites.includes(businessId)) {
          get().removeFavorite(businessId);
        } else {
          get().addFavorite(businessId);
        }
      },

      isFavorite: (businessId: string) => {
        return get().favorites.includes(businessId);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);
