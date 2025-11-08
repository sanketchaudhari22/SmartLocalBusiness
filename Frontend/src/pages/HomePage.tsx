import { useState, useEffect } from "react";
import { Search, MapPin, Star, Sparkles, Check } from "lucide-react";
import { businessService } from "../services/api";
import type { Business } from "../types";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState("");
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  const emojiMap: Record<string, string> = {
    Restaurant: "🍕",
    Salon: "💇‍♀️",
    "Beauty Salon": "💅",
    Automobile: "🔧",
    "Auto Repair": "🚗",
    Fitness: "💪",
    "Fitness Center": "🏋️‍♂️",
    Gym: "🏋️",
    Spa: "🧖‍♀️",
    Dental: "🦷",
    Medical: "🏥",
    Veterinary: "🐾",
    Plumbing: "🔧",
    Electrical: "⚡",
    Cleaning: "🧹",
    Photography: "📸",
    Legal: "⚖️",
    Accounting: "💼",
    "Real Estate": "🏡",
    Education: "📚",
    Tutoring: "👨‍🏫",
    Pet: "🐕",
    "Pet Grooming": "🐶",
    Landscaping: "🌳",
    Catering: "🍽️",
    Bakery: "🧁",
    Coffee: "☕",
    "Coffee Shop": "☕",
    Bar: "🍺",
    Entertainment: "🎭",
    Hotel: "🏨",
    Travel: "✈️",
    Consulting: "💡",
    IT: "💻",
    Technology: "📱",
    Default: "🏢",
  };

  const getEmoji = (category: string) => emojiMap[category] || emojiMap["Default"];

  useEffect(() => {
    const loadBusinesses = async () => {
      try {
        const res = await businessService.getAll();
        setBusinesses(res.data.data.slice(0, 6));
      } catch (err) {
        console.error("Error loading businesses:", err);
      } finally {
        setLoading(false);
      }
    };
    loadBusinesses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white">
        <div className="animate-spin h-12 w-12 border-b-4 border-yellow-400 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f6ff] via-[#fdfdff] to-[#ffffff] text-[#222]">
      {/* 🌈 Hero Section */}
      <section className="bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#9b5de5] text-white py-28 text-center relative overflow-hidden">
        <Sparkles className="w-10 h-10 text-[#ffc107] animate-pulse mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-white">
          Discover Local Services Near You
        </h1>
        <p className="text-lg md:text-xl mb-10 font-medium text-white/90">
          Trusted local businesses you'll love ✨
        </p>

        {/* Search */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/search?term=${searchTerm}&city=${city}`);
          }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden font-medium"
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
            className="bg-yellow-400 hover:bg-yellow-500 text-[#333] font-semibold px-8 py-4 transition-all w-full md:w-auto tracking-wide"
          >
            Search
          </button>
        </form>

        {/* glowing circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white opacity-10 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#fbbf24] opacity-10 blur-3xl rounded-full"></div>
      </section>

      {/* 🏪 Featured Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#333]">
          Featured Businesses
        </h2>

        {businesses.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No featured businesses found 😢
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {businesses.map((b) => {
              const emoji = getEmoji(b.categoryName);
              return (
                <div
                  key={b.businessId}
                  onClick={() => navigate(`/business/${b.businessId}`)}
                  className="group bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  {/* Top Emoji Banner */}
                  <div className="h-40 flex items-center justify-center text-6xl bg-[#f9f9ff] relative">
                    <span className="drop-shadow-md">{emoji}</span>
                    {b.isVerified && (
                      <span className="absolute top-3 right-3 bg-white/90 text-[#4F46E5] text-xs font-semibold px-3 py-1 rounded-full shadow flex items-center gap-1">
                        <Check className="w-3 h-3 text-[#4F46E5]" /> Verified
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <p className="uppercase text-xs font-semibold text-[#6366f1] mb-1">
                      {b.categoryName}
                    </p>
                    <h3 className="text-xl font-bold mb-2">{b.businessName}</h3>

                    {/* ⭐ Ratings */}
                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24] mr-1" />
                      <span className="font-semibold">{b.rating.toFixed(1)}</span>
                      <span className="text-gray-500 text-sm ml-1">
                        ({b.totalReviews} reviews)
                      </span>
                    </div>

                    {/* 📜 Description */}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {b.description}
                    </p>

                    {/* 📍 Location */}
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1 text-[#7c3aed]" />
                      {b.city}, {b.state}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};
