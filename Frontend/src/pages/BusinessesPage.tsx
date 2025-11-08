import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { businessService } from "../services/api";
import type { Business } from "../types";
import { Star, MapPin, Check, Sparkles } from "lucide-react";

export const BusinessesPage = () => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  // 🟢 Emoji map (same as HomePage)
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
      <section className="bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#9b5de5] text-white py-24 text-center relative overflow-hidden">
        <Sparkles className="w-8 h-8 text-[#ffc107] animate-pulse mx-auto mb-3" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-white">
          Find Trusted Services Around You
        </h1>
        <p className="text-base md:text-lg mb-10 text-white">
          Connecting you with verified and reliable local businesses ✨
        </p>

        {/* Glowing blur circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white opacity-10 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#fbbf24] opacity-10 blur-3xl rounded-full"></div>
      </section>

      {/* 🏪 Business Cards Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#333]">
          Featured Businesses
        </h2>

        {businesses.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No businesses found 😢
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
                  {/* 🟣 Emoji Banner */}
                  <div className="h-40 flex items-center justify-center text-6xl bg-[#f9f9ff] relative">
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
