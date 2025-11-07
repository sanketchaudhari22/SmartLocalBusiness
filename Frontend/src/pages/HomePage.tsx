import { useState, useEffect } from 'react';
import { Search, MapPin, Star, TrendingUp, Sparkles } from 'lucide-react';
import { businessService } from '../services/api';
import type { Business } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [city, setCity] = useState('');
  const [featuredBusinesses, setFeaturedBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFeaturedBusinesses();
  }, []);

  const loadFeaturedBusinesses = async () => {
    try {
      const response = await businessService.getAll();
      setFeaturedBusinesses(response.data.data.slice(0, 6));
    } catch (error) {
      console.error('Error loading businesses:', error);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      navigate(`/search?term=${searchTerm}&city=${city}`);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'Restaurant', emoji: '🍽️', color: 'from-accent to-orange-500' },
    { name: 'Salon', emoji: '💇', color: 'from-primary-400 to-primary-600' },
    { name: 'Gym', emoji: '💪', color: 'from-secondary-400 to-secondary-600' },
    { name: 'Spa', emoji: '🧖', color: 'from-primary-300 to-secondary-500' },
    { name: 'Clinic', emoji: '🏥', color: 'from-secondary-300 to-secondary-700' },
    { name: 'Auto Repair', emoji: '🔧', color: 'from-accent to-primary-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-primary-50 text-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-700 text-white">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <Sparkles className="w-12 h-12 mx-auto text-accent animate-pulse mb-6" />
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-secondary-100">
            Discover Local Businesses
          </h1>
          <p className="text-lg md:text-xl mb-12 text-primary-100 max-w-3xl mx-auto leading-relaxed">
            Find trusted local providers. Book services instantly.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 hover:shadow-2xl transition-transform transform hover:scale-[1.02]">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="What are you looking for?"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full h-14 pl-12 pr-4 text-gray-900 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 outline-none transition-all text-lg"
                    />
                  </div>
                </div>
                <div className="md:col-span-4">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-14 pl-12 pr-4 text-gray-900 border border-gray-200 rounded-xl focus:ring-4 focus:ring-secondary-200 focus:border-secondary-500 outline-none transition-all text-lg"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    size="lg"
                    loading={loading}
                    className="w-full h-14 text-lg font-semibold bg-accent hover:bg-orange-600 text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
                  >
                    <Search className="w-5 h-5 mr-2" /> Search
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Featured Businesses */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold flex items-center text-gray-900">
              <TrendingUp className="w-7 h-7 mr-3 text-primary-600" />
              Featured Businesses
            </h2>
            <p className="text-gray-600 mt-2">Top-rated picks just for you</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/businesses')}
            className="shadow-md hover:shadow-lg border-primary-500 text-primary-600 hover:bg-primary-50"
          >
            View All
          </Button>
        </div>

        {/* Business Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBusinesses.map((business) => (
            <Card
              key={business.businessId}
              hover
              onClick={() => navigate(`/business/${business.businessId}`)}
              className="group overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center">
                  <span className="text-6xl">🏢</span>
                </div>
                {business.isVerified && (
                  <span className="absolute top-4 right-4 bg-secondary-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    ✓ Verified
                  </span>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition">
                  {business.businessName}
                </h3>
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-3">
                  {business.categoryName}
                </span>
                <p className="text-gray-600 mb-4 line-clamp-2">{business.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1 text-secondary-600" />
                    {business.city}, {business.state}
                  </div>
                  <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-900">{business.rating.toFixed(1)}</span>
                    <span className="text-gray-500 ml-1">({business.totalReviews})</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-gradient-to-br from-background to-primary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Popular Categories</h2>
          <p className="text-gray-600 text-lg mb-10">Explore top categories near you</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {categories.map((category) => (
              <Card
                key={category.name}
                hover
                onClick={() => navigate('/search')}
                className="group cursor-pointer hover:shadow-xl transition-all"
              >
                <div className="p-8 text-center">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-4xl shadow-md group-hover:scale-110 transition-transform`}>
                    {category.emoji}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition">
                    {category.name}
                  </h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-secondary-600 to-primary-700 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to grow your business?
          </h2>
          <p className="text-xl text-primary-50 mb-8">
            Join thousands of local businesses & connect with your customers today.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/register')}
            className="text-lg px-8 py-4 shadow-xl hover:shadow-2xl bg-accent text-white hover:bg-orange-600 transform hover:-translate-y-1 transition-all"
          >
            Get Started Today 🚀
          </Button>
        </div>
      </div>
    </div>
  );
};
