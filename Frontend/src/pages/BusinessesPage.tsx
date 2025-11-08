import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { businessService } from "../services/api";
import type { Business } from "../types";
import { Star, MapPin, Check } from "lucide-react";

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
      <div className="flex justify-center items-center h-screen bg-white text-[#555]">
        <div className="animate-spin h-12 w-12 border-b-4 border-[#764ba2] rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#222]">
      {/* 🌈 Header Section */}
     <header className="relative text-center py-16 bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#9333ea] text-white shadow-md overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white opacity-10 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#fbbf24] opacity-10 blur-3xl rounded-full"></div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-white">
          Discover Local Businesses
        </h1>
        <p className="text-indigo-100 text-lg relative z-10">
          Find the perfect service provider near you ✨
        </p>
      </header>

      {/* 🏪 Business Cards Section */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#333]">
          Featured Listings
        </h2>

        {businesses.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No businesses found 😢</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {businesses.map((b) => {
              const emoji = emojiMap[b.categoryName] || emojiMap["Default"];

              return (
                <div
                  key={b.businessId}
                  onClick={() => navigate(`/business/${b.businessId}`)}
                  className="group bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  {/* 🖼️ Image or Emoji */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    {b.imageUrl ? (
                      <img
                        src={b.imageUrl}
                        alt={b.businessName}
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <span className="text-6xl">{emoji}</span>
                    )}

                    {b.isVerified && (
                      <span className="absolute top-3 right-3 bg-white/90 text-[#764ba2] text-xs font-semibold px-3 py-1 rounded-full shadow flex items-center gap-1">
                        <Check className="w-3 h-3 text-[#764ba2]" /> Verified
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <p className="uppercase text-xs font-semibold text-[#764ba2] mb-1">
                      {b.categoryName}
                    </p>
                    <h3 className="text-xl font-bold mb-2">{b.businessName}</h3>

                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 fill-[#ffc107] text-[#ffc107] mr-1" />
                      <span className="font-semibold">{b.rating.toFixed(1)}</span>
                      <span className="text-gray-500 text-sm ml-1">
                        ({b.totalReviews} reviews)
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {b.description}
                    </p>

                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1 text-[#764ba2]" />
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
