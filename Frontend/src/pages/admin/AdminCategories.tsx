import { useState, useEffect } from 'react';
import { CategoryManagement } from '@/components/admin/CategoryManagement';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { useCategories } from '@/hooks';

export const AdminCategories = () => {
  const {
    categories,
    loading,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
  } = useCategories();

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (data: { name: string; description?: string }) => {
    try {
      await createCategory(data);
      await fetchCategories();
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  const handleUpdateCategory = async (
    id: string,
    data: { name: string; description?: string }
  ) => {
    try {
      await updateCategory(id, data);
      await fetchCategories();
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id);
      await fetchCategories();
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-h2 text-neutral-900 mb-2">Category Management</h1>
          <p className="text-neutral-600">
            Manage business categories
          </p>
        </div>

        <CategoryManagement
          categories={categories}
          loading={loading}
          onCreateCategory={handleCreateCategory}
          onUpdateCategory={handleUpdateCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      </div>
    </AdminLayout>
  );
};
