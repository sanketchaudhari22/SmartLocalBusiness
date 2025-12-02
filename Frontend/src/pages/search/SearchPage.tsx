import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchApi, categoryApi } from '@/api';
import { BusinessDto, CategoryDto } from '@/types';
import { BusinessCard } from '@/components/business/BusinessCard';
import { Pagination } from '@/components/shared/Pagination';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { Alert } from '@/components/common/Alert';
import { Button } from '@/components/common/Button';
import { Search, MapPin, SlidersHorizontal, X } from 'lucide-react';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [businesses, setBusinesses] = useState<BusinessDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Search filters
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '');
  const [minRating, setMinRating] = useState(searchParams.get('rating') || '');
  const [showFilters, setShowFilters] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchTerm || selectedCategory || selectedCity) {
      performSearch();
    }
  }, [currentPage]);

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getAllCategories();
      setCategories(response.data);
    } catch (err: any) {
      console.error('Failed to load categories');
    }
  };

  const performSearch = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await searchApi.searchBusinesses({
        keyword: searchTerm,
        category: selectedCategory || undefined,
        city: selectedCity || undefined,
        minRating: minRating ? parseFloat(minRating) : undefined,
        pageNumber: currentPage,
        pageSize: pageSize
      });

      setBusinesses(response.data.items);
      setTotalCount(response.data.totalCount);

      // Update URL params
      const params: any = {};
      if (searchTerm) params.q = searchTerm;
      if (selectedCategory) params.category = selectedCategory;
      if (selectedCity) params.city = selectedCity;
      if (minRating) params.rating = minRating;
      setSearchParams(params);
    } catch (err: any) {
      setError(err.message || 'Search failed');
      setBusinesses([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    performSearch();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedCity('');
    setMinRating('');
    setCurrentPage(1);
    setSearchParams({});
    setBusinesses([]);
    setTotalCount(0);
  };

  const hasActiveFilters = searchTerm || selectedCategory || selectedCity || minRating;
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-h1 mb-2">Search Businesses</h1>
        <p className="text-body text-neutral-600">
          Find the perfect local service for your needs
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by name, description, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-5 h-5 text-neutral-400" />}
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="submit"
              variant="primary"
              isLoading={loading}
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </form>

      {error && (
        <Alert type="error" onClose={() => setError('')} className="mb-6">
          {error}
        </Alert>
      )}

      {/* Filters */}
      {showFilters && (
        <div className="bg-neutral-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-h4">Advanced Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </Select>

            <Input
              label="City"
              type="text"
              placeholder="Enter city name"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              icon={<MapPin className="w-5 h-5 text-neutral-400" />}
            />

            <Select
              label="Minimum Rating"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
            >
              <option value="">Any Rating</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
              <option value="1">1+ Stars</option>
            </Select>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              type="button"
              onClick={handleSearch}
              isLoading={loading}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}

      {/* Results */}
      {hasActiveFilters && (
        <>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-neutral-600">
              {totalCount} {totalCount === 1 ? 'business' : 'businesses'} found
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
          ) : businesses.length === 0 ? (
            <div className="text-center py-16 bg-neutral-50 rounded-lg">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-h3 mb-2">No results found</h3>
              <p className="text-body text-neutral-600 mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={clearFilters} variant="secondary">
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businesses.map((business) => (
                  <BusinessCard key={business.businessId} business={business} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  totalItems={totalCount}
                  itemsPerPage={pageSize}
                />
              )}
            </>
          )}
        </>
      )}

      {/* Initial State */}
      {!hasActiveFilters && !loading && (
        <div className="text-center py-16 bg-neutral-50 rounded-lg">
          <div className="text-6xl mb-4">🔎</div>
          <h3 className="text-h3 mb-2">Start Your Search</h3>
          <p className="text-body text-neutral-600 mb-4">
            Enter a search term or use filters to find businesses
          </p>
        </div>
      )}
    </div>
  );
};
