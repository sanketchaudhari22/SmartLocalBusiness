import { Business } from '@/types';
import { BusinessList } from '../business/BusinessList';
import { Grid, List } from 'lucide-react';
import { Button } from '../common/Button';

interface SearchResultsProps {
  results: Business[];
  loading?: boolean;
  error?: string | null;
  totalResults?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

export const SearchResults = ({
  results,
  loading = false,
  error = null,
  totalResults = 0,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  viewMode = 'grid',
  onViewModeChange
}: SearchResultsProps) => {
  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          {!loading && !error && (
            <p className="text-neutral-700">
              {totalResults > 0 ? (
                <>
                  Found <span className="font-semibold">{totalResults}</span>{' '}
                  {totalResults === 1 ? 'business' : 'businesses'}
                </>
              ) : (
                'No businesses found'
              )}
            </p>
          )}
        </div>

        {/* View Mode Toggle */}
        {onViewModeChange && totalResults > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-600 mr-2">View:</span>
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              leftIcon={<Grid className="w-4 h-4" />}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              leftIcon={<List className="w-4 h-4" />}
            >
              List
            </Button>
          </div>
        )}
      </div>

      {/* Results List */}
      <BusinessList
        businesses={results}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        viewMode={viewMode}
      />
    </div>
  );
};
