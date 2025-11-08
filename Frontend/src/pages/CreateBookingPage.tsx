import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { bookingService, businessService } from "../services/api";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { Calendar, Clock, DollarSign, ArrowLeft, Sparkles } from "lucide-react";

export const CreateBookingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const businessId = searchParams.get("businessId");

  const [formData, setFormData] = useState({
    userId: 1,
    businessId: Number(businessId) || 0,
    serviceId: 1,
    bookingDate: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [business, setBusiness] = useState<any>(null);
  const [loadingBusiness, setLoadingBusiness] = useState(true);

  useEffect(() => {
    if (businessId) loadBusiness();
    else setLoadingBusiness(false);
  }, [businessId]);

  const loadBusiness = async () => {
    try {
      const response = await businessService.getById(Number(businessId));
      setBusiness(response.data.data);
    } catch (error) {
      console.error("Error loading business:", error);
    } finally {
      setLoadingBusiness(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.bookingDate) {
      setError("Please select a date and time!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await bookingService.create(formData);
      navigate("/dashboard?tab=bookings");
    } catch (err: any) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  // 🌀 Loading state
  if (loadingBusiness) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-yellow-400"></div>
      </div>
    );
  }

  // ⚠️ No business found
  if (!businessId || !business) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-[#f8f9fa] via-white to-[#f3f0ff] text-gray-700">
        <p className="text-xl font-semibold mb-4">
          Business not found or invalid link 😢
        </p>
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="border-[#667eea] text-[#667eea] hover:bg-[#ebe9ff]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Go Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-white to-[#f3f0ff] py-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#9b5de5] text-white py-16 relative shadow-lg overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#ffc107] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Sparkles className="w-10 h-10 text-[#ffc107] animate-pulse mx-auto mb-3" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
            Book Your Service
          </h1>
          <p className="text-purple-100 text-lg">
            at <span className="font-semibold">{business.businessName}</span>
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4">
        <Card className="shadow-card hover:shadow-hover transition-all border border-gray-100 bg-white">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-[#333]">
                Complete Your Booking
              </h2>
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

              {/* Date & Time */}
              <div>
                <label className="block text-sm font-semibold text-[#555] mb-2">
                  <Calendar className="inline w-4 h-4 mr-2 text-[#667eea]" />
                  Select Date & Time
                </label>
                <Input
                  type="datetime-local"
                  value={formData.bookingDate}
                  onChange={(e) =>
                    setFormData({ ...formData, bookingDate: e.target.value })
                  }
                  required
                />
              </div>

              {/* Service Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-[#555] mb-2">
                  <Clock className="inline w-4 h-4 mr-2 text-[#667eea]" />
                  Choose Service
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#667eea] outline-none text-[#333]"
                  value={formData.serviceId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      serviceId: Number(e.target.value),
                    })
                  }
                >
                  <option value="1">Haircut – $30</option>
                  <option value="2">Color Treatment – $80</option>
                  <option value="3">Styling – $50</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-[#555] mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#667eea] outline-none text-[#333]"
                  rows={4}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Any special requests or requirements?"
                />
              </div>

              {/* Amount */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="flex justify-between items-center">
                  <span className="text-[#555] font-semibold">Total Amount</span>
                  <span className="text-2xl font-bold text-[#764ba2]">
                    <DollarSign className="inline w-6 h-6 mr-1" />
                    30.00
                  </span>
                </div>
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
                  Confirm Booking
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};
