import { useState } from 'react';
import { Select } from '../common/Select';
import { Checkbox } from '../common/Checkbox';
import { Button } from '../common/Button';
import { Filter, X } from 'lucide-react';

interface SearchFiltersProps {
  categories?: Array<{ id: string; name: string }>;
  selectedCategory?: string;
  selectedRating?: string;
  isOpen?: boolean;
  onlyActive?: boolean;
  onApplyFilters: (filters: {
    category?: string;
    rating?: string;
    onlyActive?: boolean;
  }) => void;
  onResetFilters: () => void;
}

export const SearchFilters = ({
  categories = [],
  selectedCategory = '',
  selectedRating = '',
  isOpen: initialIsOpen = false,
  onlyActive: initialOnlyActive = false,
  onApplyFilters,
  onResetFilters
}: SearchFiltersProps) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [category, setCategory] = useState(selectedCategory);
  const [rating, setRating] = useState(selectedRating);
  const [onlyActive, setOnlyActive] = useState(initialOnlyActive);

  const ratingOptions = [
    { value: '', label: 'All Ratings' },
    { value: '4', label: '4+ Stars' },
    { value: '3', label: '3+ Stars' },
    { value: '2', label: '2+ Stars' },
    { value: '1', label: '1+ Stars' }
  ];

  const handleApply = () => {
    onApplyFilters({
      category: category || undefined,
      rating: rating || undefined,
      onlyActive
    });
  };

  const handleReset = () => {
    setCategory('');
    setRating('');
    setOnlyActive(false);
    onResetFilters();
  };

  const hasActiveFilters = category || rating || onlyActive;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200">
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-neutral-600" />
          <span className="font-semibold text-neutral-900">Filters</span>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full">
              Active
            </span>
          )}
        </div>
        <div className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </div>
      </button>

      {/* Filter Options */}
      {isOpen && (
        <div className="p-4 border-t border-neutral-200 space-y-4">
          {/* Category Filter */}
          {categories.length > 0 && (
            <div>
              <Select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={[
                  { value: '', label: 'All Categories' },
                  ...categories.map(cat => ({
                    value: cat.id,
                    label: cat.name
                  }))
                ]}
              />
            </div>
          )}

          {/* Rating Filter */}
          <div>
            <Select
              label="Minimum Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              options={ratingOptions}
            />
          </div>

          {/* Status Filter */}
          <div>
            <Checkbox
              label="Show only active businesses"
              checked={onlyActive}
              onChange={setOnlyActive}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="primary"
              onClick={handleApply}
              leftIcon={<Filter className="w-4 h-4" />}
              className="flex-1"
            >
              Apply Filters
            </Button>
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={handleReset}
                leftIcon={<X className="w-4 h-4" />}
              >
                Reset
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
