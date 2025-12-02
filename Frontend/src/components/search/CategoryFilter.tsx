import { Badge } from '../common/Badge';
import { FolderTree } from 'lucide-react';

interface CategoryFilterProps {
  categories: Array<{ id: string; name: string; count?: number }>;
  selectedCategory?: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory
}: CategoryFilterProps) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
      <h3 className="text-h4 text-neutral-900 mb-4 flex items-center gap-2">
        <FolderTree className="w-5 h-5 text-primary-600" />
        Categories
      </h3>

      <div className="space-y-2">
        {/* All Categories */}
        <button
          onClick={() => onSelectCategory('')}
          className={`
            w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors
            ${!selectedCategory
              ? 'bg-primary-50 text-primary-700 font-medium'
              : 'hover:bg-neutral-50 text-neutral-700'
            }
          `}
        >
          <span>All Categories</span>
          <Badge variant={!selectedCategory ? 'primary' : 'secondary'} size="sm">
            {categories.reduce((sum, cat) => sum + (cat.count || 0), 0)}
          </Badge>
        </button>

        {/* Individual Categories */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`
              w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors
              ${selectedCategory === category.id
                ? 'bg-primary-50 text-primary-700 font-medium'
                : 'hover:bg-neutral-50 text-neutral-700'
              }
            `}
          >
            <span className="text-left">{category.name}</span>
            {category.count !== undefined && (
              <Badge
                variant={selectedCategory === category.id ? 'primary' : 'secondary'}
                size="sm"
              >
                {category.count}
              </Badge>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
