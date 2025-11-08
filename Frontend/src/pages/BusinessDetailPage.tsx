import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { businessService, reviewService } from "../services/api";
import type { Business, Review } from "../types";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import {
  MapPin, Phone, Mail, Globe, Star, Calendar, ArrowLeft, Check, Sparkles,
} from "lucide-react";

export const BusinessDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<Business | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadBusiness();
      loadReviews();
    }
  }, [id]);

  const loadBusiness = async () => {
    try {
      const res = await businessService.getById(Number(id));
      setBusiness(res.data.data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const res = await reviewService.getByBusinessId(Number(id));
      setReviews(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#f8f9fa] via-white to-[#eee]">
        <div className="animate-spin h-12 w-12 rounded-full border-b-4 border-[#667eea]"></div>
      </div>
    );

  if (!business)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-[#f8f9fa] to-[#eee] text-gray-700">
        <p className="text-xl mb-4">Business not found 😢</p>
        <Button variant="outline" onClick={() => navigate(-1)} className="border-[#667eea] text-[#667eea] hover:bg-[#ebe9ff]">
          <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
        </Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white py-20 relative">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#ffc107] opacity-10 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white opacity-10 blur-3xl rounded-full"></div>

        <div className="relative text-center max-w-5xl mx-auto px-4">
          <Sparkles className="w-10 h-10 text-[#ffc107] animate-pulse mx-auto mb-4" />
          <h1 className="text-5xl font-extrabold mb-2">{business.businessName}</h1>
          <p className="text-purple-100 text-lg">Trusted {business.categoryName} service 🌟</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8 bg-white border border-gray-100 shadow-card">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-[#333]">{business.businessName}</h2>
                {business.isVerified && (
                  <span className="flex items-center gap-1 mt-2 px-3 py-1 bg-purple-100 text-[#764ba2] rounded-full text-sm">
                    <Check className="w-4 h-4" /> Verified
                  </span>
                )}
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end text-2xl text-[#333] font-bold">
                  <Star className="w-6 h-6 fill-[#ffc107]" /> {business.rating.toFixed(1)}
                </div>
                <p className="text-sm text-gray-500">{business.totalReviews} reviews</p>
              </div>
            </div>

            <p className="text-[#555] mb-6">{business.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#764ba2] mt-1" />
                <p>{business.address}, {business.city}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#667eea]" />
                <p>{business.phoneNumber}</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#667eea]" />
                <p>{business.email}</p>
              </div>
              {business.website && (
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-[#667eea]" />
                  <a href={business.website} target="_blank" rel="noreferrer" className="text-[#667eea] hover:underline">
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          </Card>

          {/* Reviews */}
          <Card className="p-8 bg-white border border-gray-100 shadow-card">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[#333]">
              <Star className="w-5 h-5 text-[#ffc107]" /> Customer Reviews
            </h3>

            {reviews.length === 0 ? (
              <p className="text-gray-500 text-center py-10">
                No reviews yet. Be the first to review ✨
              </p>
            ) : (
              reviews.map((r) => (
                <div key={r.reviewId} className="border-b border-gray-200 pb-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < r.rating ? "fill-[#ffc107]" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-[#555]">{r.reviewText}</p>
                </div>
              ))
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div>
          <Card className="p-6 sticky top-8 bg-white border border-gray-100 shadow-card">
            <h3 className="text-xl font-bold mb-4 text-[#333]">Book or Review</h3>
            <Button
              className="w-full mb-4 bg-[#764ba2] hover:bg-[#6b63ce] text-white"
              onClick={() => navigate(`/booking/create?businessId=${business.businessId}`)}
            >
              <Calendar className="w-4 h-4 mr-2" /> Make a Booking
            </Button>
            <Button
              variant="outline"
              className="w-full border-[#667eea] text-[#667eea] hover:bg-[#ebe9ff]"
              onClick={() => navigate(`/review/create?businessId=${business.businessId}`)}
            >
              <Star className="w-4 h-4 mr-2 text-[#ffc107]" /> Write a Review
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
