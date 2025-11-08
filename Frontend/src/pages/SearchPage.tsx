import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { searchService } from "../services/api";
import type { Business } from "../types";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Search, MapPin, Star, Filter, Sparkles } from "lucide-react";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("term") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
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
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-white to-[#f3f0ff] text-[#333]">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#9b5de5] text-white py-16 relative overflow-hidden shadow-lg">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#ffc107] opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <Sparkles className="w-10 h-10 text-[#ffc107] animate-pulse mx-auto mb-3" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-white">
          Discover Local Businesses 
        </h1>
        <p className="text-white text-lg">
          Search, discover, and connect instantly ✨
        </p>
      </div>
    </div>


      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
          <Input
            placeholder="Search businesses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border-gray-300 shadow-sm focus:ring-2 focus:ring-[#667eea]"
          />
          <Input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full md:w-64 border-gray-300 shadow-sm focus:ring-2 focus:ring-[#764ba2]"
          />
          <Button
            onClick={handleSearch}
            loading={loading}
            className="bg-[#667eea] hover:bg-[#5a55d6] text-white px-6 shadow-md hover:shadow-lg transition-all"
          >
            <Search className="w-5 h-5 mr-1" /> Search
          </Button>
        </div>

        {/* Results Info */}
        <div className="flex flex-wrap items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">
            {totalCount > 0
              ? `${totalCount} Results${searchTerm ? ` for "${searchTerm}"` : ""}`
              : "No Results"}
          </h2>
          <Button
            variant="outline"
            size="sm"
            className="border-[#667eea] text-[#667eea] hover:bg-[#eef2ff]"
          >
            <Filter className="w-4 h-4 mr-2" /> Filters
          </Button>
        </div>

        {/* Search Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse p-6 bg-white">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </Card>
            ))}
          </div>
        ) : businesses.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 mx-auto text-[#667eea] mb-4" />
            <h3 className="text-xl font-semibold text-[#333] mb-2">
              No businesses found
            </h3>
            <p className="text-[#666]">
              Try changing your search or location filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businesses.map((business) => (
              <Card
                key={business.businessId}
                hover
                onClick={() => navigate(`/business/${business.businessId}`)}
                className="group cursor-pointer bg-white shadow-card hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="h-48 bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
                  <span className="text-6xl">🏢</span>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-[#333] group-hover:text-[#667eea] transition-colors">
                      {business.businessName}
                    </h3>
                    {business.isVerified && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                        ✓ Verified
                      </span>
                    )}
                  </div>

                  <span className="inline-block px-3 py-1 bg-[#eef2ff] text-[#667eea] text-sm rounded-full mb-3">
                    {business.categoryName}
                  </span>

                  <p className="text-[#666] mb-4 line-clamp-2 leading-relaxed">
                    {business.description}
                  </p>

                  <div className="space-y-2 text-sm text-[#555]">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-[#764ba2]" />
                      {business.city}, {business.state}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-2 text-[#ffc107] fill-[#ffc107]" />
                      {business.rating.toFixed(1)} ({business.totalReviews}{" "}
                      reviews)
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalCount > 12 && (
          <div className="flex justify-center gap-3 mt-12 items-center">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="border-[#667eea] text-[#667eea] hover:bg-[#eef2ff]"
            >
              Previous
            </Button>

            <span className="px-3 text-[#555] text-sm">
              Page {currentPage} of {Math.ceil(totalCount / 12)}
            </span>

            <Button
              variant="outline"
              disabled={currentPage >= Math.ceil(totalCount / 12)}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="border-[#667eea] text-[#667eea] hover:bg-[#eef2ff]"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
