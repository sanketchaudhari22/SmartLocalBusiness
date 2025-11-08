import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { reviewService } from "../services/api";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Star, Sparkles, ArrowLeft } from "lucide-react";

export const CreateReviewPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const businessId = searchParams.get("businessId");

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating before submitting ✨");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await reviewService.create({
        businessId: Number(businessId),
        userId: 1, // Replace with actual logged-in user
        rating,
        reviewText,
      });
      navigate(`/business/${businessId}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-white to-[#f3f0ff] py-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white py-14 mb-10 shadow-md relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#ffc107] opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Sparkles className="w-10 h-10 text-[#ffc107] animate-pulse mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold mb-2">Share Your Experience</h1>
          <p className="text-purple-100 text-lg">
            Your review helps others discover great local businesses 🌟
          </p>
        </div>
      </div>

      {/* Review Form */}
      <div className="max-w-2xl mx-auto px-4">
        <Card className="shadow-card hover:shadow-hover transition-all border border-gray-100 bg-white">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-[#333]">Write a Review</h2>
              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="border-[#667eea] text-[#667eea] hover:bg-[#ebe9ff]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Rating Section */}
              <div>
                <label className="block text-sm font-semibold text-[#555] mb-3">
                  Rate Your Experience
                </label>
                <div className="flex gap-3 justify-center md:justify-start">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-10 h-10 transition-transform transform hover:scale-110 ${
                          star <= (hoverRating || rating)
                            ? "fill-[#ffc107] text-[#ffc107]"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-sm font-semibold text-[#555] mb-2">
                  Your Review
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#667eea] focus:border-transparent outline-none text-[#333]"
                  rows={6}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share what you liked or didn’t like..."
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="flex-1 border-[#764ba2] text-[#764ba2] hover:bg-purple-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={loading}
                  className="flex-1 bg-[#667eea] hover:bg-[#5a55d6] text-white font-semibold"
                >
                  Submit Review
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};
