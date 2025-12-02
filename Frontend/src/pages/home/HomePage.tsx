import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { SearchBar } from '@/components/search/SearchBar';
import { BusinessCard } from '@/components/business/BusinessCard';
import { Search, Building2, Calendar, Star, TrendingUp } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string, location: string) => {
    navigate(`/search?q=${query}&location=${location}`);
  };

  // Mock featured businesses
  const featuredBusinesses = [];

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Find Local Services',
      description: 'Discover trusted businesses in your area with our powerful search'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Easy Booking',
      description: 'Schedule appointments seamlessly with just a few clicks'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Read Reviews',
      description: 'Make informed decisions with authentic customer reviews'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Grow Your Business',
      description: 'List your business and reach more customers online'
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Find Local Businesses Near You
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Connect with trusted local services, book appointments, and support your community
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search for services, businesses..."
                locationPlaceholder="Enter your location"
                size="lg"
              />
            </div>

            {/* Quick Categories */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {['Restaurants', 'Salons', 'Plumbers', 'Electricians', 'Cleaners'].map((category) => (
                <button
                  key={category}
                  onClick={() => navigate(`/search?category=${category}`)}
                  className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-neutral-900 mb-4">Why Choose LocalBiz?</h2>
            <p className="text-lg text-neutral-600">
              Everything you need to find and book local services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-h4 text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA for Business Owners */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Building2 className="w-4 h-4" />
                For Business Owners
              </div>
              <h2 className="text-h2 text-neutral-900 mb-4">
                Grow Your Business Online
              </h2>
              <p className="text-lg text-neutral-600 mb-6">
                Join thousands of businesses reaching more customers through our platform.
                List your business, manage bookings, and build your reputation.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-neutral-700">
                  <div className="w-6 h-6 bg-success-100 text-success-600 rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  Free business listing
                </li>
                <li className="flex items-center gap-3 text-neutral-700">
                  <div className="w-6 h-6 bg-success-100 text-success-600 rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  Online booking management
                </li>
                <li className="flex items-center gap-3 text-neutral-700">
                  <div className="w-6 h-6 bg-success-100 text-success-600 rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  Customer reviews and ratings
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/businesses/create')}
                leftIcon={<Building2 className="w-5 h-5" />}
              >
                List Your Business
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/about')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Businesses', value: '10,000+' },
              { label: 'Happy Customers', value: '50,000+' },
              { label: 'Bookings Made', value: '100,000+' },
              { label: 'Average Rating', value: '4.8/5' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};
