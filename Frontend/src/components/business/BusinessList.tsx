import { BusinessCard } from './BusinessCard';
import { Pagination } from '../common/Pagination';
import { EmptyState } from '../shared/EmptyState';
import { Skeleton } from '../common/Skeleton';
import { Business } from '@/types';

interface BusinessListProps {
  businesses: Business[];
  loading?: boolean;
  error?: string | null;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  viewMode?: 'grid' | 'list';
}

export const BusinessList = ({
  businesses,
  loading = false,
  error = null,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  viewMode = 'grid'
}: BusinessListProps) => {
  if (loading) {
    return (
      <div className={`
        ${viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
        }
      `}>
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl p-6 space-y-4">
            <Skeleton variant="rectangular" className="h-48 w-full" />
            <Skeleton variant="text" className="h-6 w-3/4" />
            <Skeleton variant="text" className="h-4 w-1/2" />
            <Skeleton variant="text" className="h-4 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error-50 border border-error-200 rounded-lg p-4">
        <p className="text-error-700 text-sm">{error}</p>
      </div>
    );
  }

  if (!businesses || businesses.length === 0) {
    return (
      <EmptyState
        title="No businesses found"
        description="Try adjusting your filters or search criteria"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className={`
        ${viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
        }
      `}>
        {businesses.map((business) => (
          <BusinessCard
            key={business.id}
            business={business}
            viewMode={viewMode}
          />
        ))}
      </div>

      {totalPages > 1 && onPageChange && (
        <div className="flex justify-center mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};
