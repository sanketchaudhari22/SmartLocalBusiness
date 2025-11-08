import { useState, useEffect } from "react";
import { Search, MapPin, Star, Sparkles } from "lucide-react";
import { businessService } from "../services/api";
import type { Business } from "../types";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState("");
  const [businesses, setBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    loadFeaturedBusinesses();
  }, []);

  const loadFeaturedBusinesses = async () => {
    try {
      const res = await businessService.getAll();
      setBusinesses(res.data.data.slice(0, 6));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#333]">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#9b5de5] text-white py-28 text-center relative overflow-hidden">
        <Sparkles className="w-10 h-10 text-[#ffc107] animate-pulse mx-auto mb-4" />
        <h1 className="text-5xl md:text-6xl font-extrabold mb-3 text-white">
          Discover Local Services Near You 
        </h1>
        <p className="text-lg md:text-xl mb-10 text-white">
          Trusted local businesses you’ll love ✨
        </p>


        {/* Search Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/search?term=${searchTerm}&city=${city}`);
          }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden"
        >
          <div className="flex items-center px-4 w-full md:w-2/3">
            <Search className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full py-4 text-gray-700 outline-none"
            />
          </div>
          <div className="flex items-center px-4 w-full md:w-1/3 border-t md:border-t-0 md:border-l border-gray-200">
            <MapPin className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="w-full py-4 text-gray-700 outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-[#333] font-semibold px-8 py-4 transition-all w-full md:w-auto"
          >
            Search
          </button>
        </form>
      </section>

      {/* Featured Businesses */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold mb-10 text-center text-[#333]">
           Featured Businesses... 
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {businesses.map((biz) => (
            <div
              key={biz.businessId}
              onClick={() => navigate(`/business/${biz.businessId}`)}
              className="bg-white rounded-2xl shadow-card hover:shadow-2xl transition-transform hover:-translate-y-2 cursor-pointer overflow-hidden animate-fadeIn"
            >
              <div className="relative">
                <div className="h-48 w-full flex items-center justify-center text-7xl bg-gradient-to-br from-[#f8f9fa] to-[#f3f0ff]">
  {biz.imageUrl ? (
    <img
      src={biz.imageUrl}
      alt={biz.businessName}
      className="h-48 w-full object-cover"
    />
  ) : (
    <span>
      {biz.categoryName === "Restaurant"
        ? "🍕"
        : biz.categoryName === "Salon"
        ? "💇‍♀️"
        : biz.categoryName === "Automobile"
        ? "🔧"
        : biz.categoryName === "Fitness"
        ? "💪"
        : "🏢"}
    </span>
  )}
</div>

                {biz.isVerified && (
                  <span className="absolute top-4 right-4 bg-white text-[#764ba2] text-sm font-semibold px-3 py-1 rounded-full shadow">
                    ✓ Verified
                  </span>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-2xl font-bold mb-2">{biz.businessName}</h3>
                <p className="text-[#666] mb-3 line-clamp-2">{biz.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center text-[#666]">
                    <MapPin className="w-4 h-4 mr-1 text-[#764ba2]" />
                    {biz.city}, {biz.state}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-[#ffc107]" />
                    <span className="font-bold">{biz.rating.toFixed(1)}</span>
                    <span className="text-[#666] ml-1">
                      ({biz.totalReviews})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
