import { useState } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Modal } from '../common/Modal';
import { DataTable, Column } from './DataTable';
import { Plus, Edit, Trash } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description?: string;
  businessCount?: number;
}

interface CategoryManagementProps {
  categories: Category[];
  loading?: boolean;
  onCreateCategory?: (data: { name: string; description?: string }) => Promise<void>;
  onUpdateCategory?: (id: string, data: { name: string; description?: string }) => Promise<void>;
  onDeleteCategory?: (id: string) => Promise<void>;
}

export const CategoryManagement = ({
  categories,
  loading = false,
  onCreateCategory,
  onUpdateCategory,
  onDeleteCategory
}: CategoryManagementProps) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleCreate = async () => {
    if (onCreateCategory && formData.name.trim()) {
      await onCreateCategory({
        name: formData.name.trim(),
        description: formData.description.trim() || undefined
      });
      setIsCreateModalOpen(false);
      setFormData({ name: '', description: '' });
    }
  };

  const handleEdit = async () => {
    if (onUpdateCategory && selectedCategory && formData.name.trim()) {
      await onUpdateCategory(selectedCategory.id, {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined
      });
      setIsEditModalOpen(false);
      setSelectedCategory(null);
      setFormData({ name: '', description: '' });
    }
  };

  const handleDelete = async (id: string) => {
    if (onDeleteCategory && confirm('Are you sure you want to delete this category?')) {
      await onDeleteCategory(id);
    }
  };

  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description || ''
    });
    setIsEditModalOpen(true);
  };

  const columns: Column<Category>[] = [
    {
      key: 'name',
      label: 'Category Name',
      sortable: true
    },
    {
      key: 'description',
      label: 'Description',
      render: (value) => value || '-'
    },
    {
      key: 'businessCount',
      label: 'Businesses',
      render: (value) => value || 0
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, category) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              openEditModal(category);
            }}
            leftIcon={<Edit className="w-4 h-4" />}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="error"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(category.id);
            }}
            leftIcon={<Trash className="w-4 h-4" />}
          >
            Delete
          </Button>
        </div>
      ),
      width: '200px'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-h4 text-neutral-900">
          Categories ({categories.length})
        </h3>
        {onCreateCategory && (
          <Button
            variant="primary"
            onClick={() => setIsCreateModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Category
          </Button>
        )}
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={categories}
        loading={loading}
        emptyMessage="No categories found"
      />

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setFormData({ name: '', description: '' });
        }}
        title="Create Category"
      >
        <div className="space-y-4">
          <Input
            label="Category Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter category name"
            required
          />
          <Input
            label="Description (Optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter description"
          />
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateModalOpen(false);
                setFormData({ name: '', description: '' });
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreate}>
              Create
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCategory(null);
          setFormData({ name: '', description: '' });
        }}
        title="Edit Category"
      >
        <div className="space-y-4">
          <Input
            label="Category Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter category name"
            required
          />
          <Input
            label="Description (Optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter description"
          />
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedCategory(null);
                setFormData({ name: '', description: '' });
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleEdit}>
              Update
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
