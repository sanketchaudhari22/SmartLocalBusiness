import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchService } from '../services/api';
import type { Business } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Search, MapPin, Star, Filter, Sparkles } from 'lucide-react';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('term') || '');
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    handleSearch();
  }, [currentPage]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await searchService.search({
        searchTerm,
        city,
        pageNumber: currentPage,
        pageSize: 12,
      });
      setBusinesses(response.data.data.items);
      setTotalCount(response.data.data.totalCount);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-primary-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-700 text-white py-12 shadow-md relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <div className="flex justify-center mb-3">
            <Sparkles className="w-10 h-10 text-accent animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-secondary-100">
            Find Local Businesses
          </h1>
          <p className="text-primary-100 text-lg">Search, discover, and connect instantly</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
          <Input
            placeholder="Search businesses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full md:w-64"
          />
          <Button onClick={handleSearch} loading={loading} className="bg-accent hover:bg-orange-600">
            <Search className="w-5 h-5" />
          </Button>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {totalCount} Results {searchTerm && `for "${searchTerm}"`}
          </h2>
          <Button variant="outline" size="sm" className="border-primary-500 text-primary-600 hover:bg-primary-50">
            <Filter className="w-4 h-4 mr-2" /> Filters
          </Button>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse p-6">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </Card>
            ))}
          </div>
        ) : businesses.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 mx-auto text-primary-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No results found
            </h3>
            <p className="text-gray-500">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businesses.map((business) => (
              <Card
                key={business.businessId}
                hover
                onClick={() => navigate(`/business/${business.businessId}`)}
                className="group cursor-pointer shadow-card hover:shadow-xl transition-all"
              >
                <div className="h-48 bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center">
                  <span className="text-6xl">🏢</span>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {business.businessName}
                    </h3>
                    {business.isVerified && (
                      <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full text-xs font-medium">
                        ✓ Verified
                      </span>
                    )}
                  </div>

                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full mb-3">
                    {business.categoryName}
                  </span>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {business.description}
                  </p>

                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-secondary-600" />
                      {business.city}, {business.state}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
                      {business.rating.toFixed(1)} ({business.totalReviews} reviews)
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalCount > 12 && (
          <div className="flex justify-center gap-2 mt-10">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="border-primary-500 text-primary-600"
            >
              Previous
            </Button>
            <span className="flex items-center px-4 text-gray-700">
              Page {currentPage} of {Math.ceil(totalCount / 12)}
            </span>
            <Button
              variant="outline"
              disabled={currentPage >= Math.ceil(totalCount / 12)}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="border-primary-500 text-primary-600"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
