import { create } from "zustand";
import { categoryApi } from "@/api";
import type { CategoryDto, CreateCategoryDto } from "@/types";

interface CategoryState {
  categories: CategoryDto[];
  selectedCategory: CategoryDto | null;
  loading: boolean;
  error: string | null;

  getAllCategories: () => Promise<void>;
  getCategoryById: (id: number) => Promise<void>;
  createCategory: (data: CreateCategoryDto) => Promise<void>;
  updateCategory: (id: number, data: CreateCategoryDto) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,

  getAllCategories: async () => {
    set({ loading: true });
    try {
      const res = await categoryApi.getAllCategories();
      set({ categories: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getCategoryById: async (id: number) => {
    set({ loading: true });
    try {
      const res = await categoryApi.getCategoryById(id);
      set({ selectedCategory: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  createCategory: async (data: CreateCategoryDto) => {
    set({ loading: true });
    try {
      const res = await categoryApi.createCategory(data);
      set((s) => ({
        categories: [...s.categories, res.data],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  updateCategory: async (id: number, data: CreateCategoryDto) => {
    set({ loading: true });
    try {
      const res = await categoryApi.updateCategory(id, data);
      set((s) => ({
        categories: s.categories.map((c) =>
          c.categoryId === id ? res.data : c
        ),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  deleteCategory: async (id: number) => {
    set({ loading: true });
    try {
      await categoryApi.deleteCategory(id);
      set((s) => ({
        categories: s.categories.filter((c) => c.categoryId !== id),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
