import { useState, useEffect } from 'react';
import { businessApi, categoryApi } from '@/api';
import { BusinessDto, CategoryDto } from '@/types';
import { BusinessCard } from '@/components/business/BusinessCard';
import { Pagination } from '@/components/shared/Pagination';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { Alert } from '@/components/common/Alert';
import { Search, Grid, List, SlidersHorizontal } from 'lucide-react';

export const BusinessListPage = () => {
  const [businesses, setBusinesses] = useState<BusinessDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      const [businessesResponse, categoriesResponse] = await Promise.all([
        businessApi.getAllBusinesses(),
        categoryApi.getAllCategories()
      ]);

      setBusinesses(businessesResponse.data);
      setCategories(categoriesResponse.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load businesses');
    } finally {
      setLoading(false);
    }
  };

  // Filter businesses based on search and filters
  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch = business.businessName
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      business.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = !selectedCategory ||
      business.categoryId === parseInt(selectedCategory);

    const matchesCity = !selectedCity ||
      business.city.toLowerCase() === selectedCity.toLowerCase();

    return matchesSearch && matchesCategory && matchesCity;
  });

  // Get unique cities
  const cities = Array.from(new Set(businesses.map(b => b.city))).sort();

  // Pagination
  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBusinesses = filteredBusinesses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedCity('');
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-h1 mb-2">Discover Local Businesses</h1>
        <p className="text-body text-neutral-600">
          Find the best local services in your area
        </p>
      </div>

      {error && (
        <Alert type="error" onClose={() => setError('')} className="mb-6">
          {error}
        </Alert>
      )}

      {/* Search and View Toggle */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search businesses..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            icon={<Search className="w-5 h-5 text-neutral-400" />}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-outline flex items-center space-x-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>

          <div className="flex rounded-lg border border-neutral-300">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${
                viewMode === 'grid'
                  ? 'bg-primary-500 text-white'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${
                viewMode === 'list'
                  ? 'bg-primary-500 text-white'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-neutral-50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Category"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </Select>

            <Select
              label="City"
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Select>

            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="btn-secondary w-full"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-neutral-600">
          {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'business' : 'businesses'} found
        </p>
      </div>

      {/* Business List */}
      {filteredBusinesses.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-h3 mb-2">No businesses found</h3>
          <p className="text-body text-neutral-600 mb-4">
            Try adjusting your search or filters
          </p>
          <button onClick={clearFilters} className="btn-primary">
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {paginatedBusinesses.map((business) => (
              <BusinessCard key={business.businessId} business={business} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={filteredBusinesses.length}
            itemsPerPage={itemsPerPage}
          />
        </>
      )}
    </div>
  );
};
