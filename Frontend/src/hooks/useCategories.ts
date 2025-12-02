import { useEffect } from 'react';
import { useCategoryStore } from '@/store';

export const useCategories = () => {
  const {
    categories,
    selectedCategory,
    loading,
    error,
    fetchCategories,
    fetchCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    setSelectedCategory,
    clearError
  } = useCategoryStore();

  useEffect(() => {
    if (categories.length === 0 && !loading) {
      fetchCategories();
    }
  }, []);

  return {
    categories,
    selectedCategory,
    loading,
    error,
    fetchCategories,
    fetchCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    setSelectedCategory,
    clearError
  };
};
