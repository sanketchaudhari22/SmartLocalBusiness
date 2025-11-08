import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { businessService } from "../services/api";
import type { Business } from "../types";
import { Star, MapPin, Check, Sparkles } from "lucide-react";

export const BusinessesPage = () => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  // 🟢 Emoji mapping by category
  const emojiMap: Record<string, string> = {
    Restaurant: "🍕",
    Salon: "💇‍♀️",
    Automobile: "🔧",
    Fitness: "🏋️‍♂️",
    Default: "🏢",
  };

  // 🌈 Gradient options for card headers
  const gradients = [
    "from-pink-500 to-rose-500",
    "from-blue-500 to-indigo-500",
    "from-green-400 to-emerald-500",
    "from-yellow-400 to-orange-500",
    "from-purple-500 to-violet-600",
    "from-cyan-400 to-blue-500",
  ];

  useEffect(() => {
    const loadBusinesses = async () => {
      try {
        const res = await businessService.getAll();
        setBusinesses(res.data.data);
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
      {/* 🌈 Header Section */}
      <section className="bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#9b5de5] text-white py-28 text-center relative overflow-hidden">
        <Sparkles className="w-10 h-10 text-[#ffc107] animate-pulse mx-auto mb-4" />
        <h1 className="text-5xl md:text-6xl font-extrabold mb-3 text-white">
          Discover Local Services Near You
        </h1>
        <p className="text-lg md:text-xl mb-10 text-white">
          Trusted local businesses you’ll love ✨
        </p>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white opacity-10 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#fbbf24] opacity-10 blur-3xl rounded-full"></div>
      </section>

      {/* 🏪 Business Cards Section */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#333]">
          Featured Listings
        </h2>

        {businesses.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No businesses found 😢
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {businesses.map((b, i) => {
              const gradient = gradients[i % gradients.length];
              const emoji = emojiMap[b.categoryName] || emojiMap["Default"];

              return (
                <div
                  key={b.businessId}
                  onClick={() => navigate(`/business/${b.businessId}`)}
                  className="group bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  {/* 🟣 Top Emoji Banner */}
                  <div
                    className={`h-40 flex items-center justify-center text-6xl bg-gradient-to-r ${gradient} relative`}
                  >
                    <span className="drop-shadow-md">{emoji}</span>
                    {b.isVerified && (
                      <span className="absolute top-3 right-3 bg-white/90 text-[#4F46E5] text-xs font-semibold px-3 py-1 rounded-full shadow flex items-center gap-1">
                        <Check className="w-3 h-3 text-[#4F46E5]" /> Verified
                      </span>
                    )}
                  </div>

                  {/* 📝 Info Section */}
                  <div className="p-5">
                    <p className="uppercase text-xs font-semibold text-[#6366f1] mb-1">
                      {b.categoryName}
                    </p>
                    <h3 className="text-xl font-bold mb-2">
                      {b.businessName}
                    </h3>

                    {/* ⭐ Ratings */}
                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24] mr-1" />
                      <span className="font-semibold">
                        {b.rating.toFixed(1)}
                      </span>
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
