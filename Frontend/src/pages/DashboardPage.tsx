import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { bookingService } from "../services/api";
import type { Booking } from "../types";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Calendar, Clock, DollarSign, Sparkles } from "lucide-react";

export const DashboardPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const activeTab = searchParams.get("tab") || "bookings";

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const userId = 1; // Replace with logged-in user ID later
      const response = await bookingService.getUserBookings(userId);
      setBookings(response.data.data);
    } catch (error) {
      console.error("Error loading bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-white to-[#f3f0ff]">
      {/* 🌈 Header */}
      <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white py-16 relative overflow-hidden shadow-md">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#ffc107] opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
        <Sparkles className="w-10 h-10 text-[#ffc107] animate-pulse mx-auto mb-4" />
        <h1 className="text-5xl font-extrabold mb-2 text-white">
          My Dashboard
        </h1>
        <p className="text-white/90 text-lg">
          Manage your bookings and keep track of your activity 💼
        </p>
      </div>

      </div>

      {/* 📊 Tabs & Content */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        {/* Tabs */}
        <div className="flex gap-4 justify-center mb-10">
          <Button
            variant={activeTab === "bookings" ? "primary" : "outline"}
            className={`rounded-full px-8 py-2 font-semibold transition-all ${
              activeTab === "bookings"
                ? "bg-[#667eea] text-white shadow-md hover:bg-[#5a55d6]"
                : "border-[#667eea] text-[#667eea] hover:bg-[#ebe9ff]"
            }`}
            onClick={() => navigate("/dashboard?tab=bookings")}
          >
            My Bookings
          </Button>

          <Button
            variant={activeTab === "reviews" ? "primary" : "outline"}
            className={`rounded-full px-8 py-2 font-semibold transition-all ${
              activeTab === "reviews"
                ? "bg-[#764ba2] text-white shadow-md hover:bg-[#6b63ce]"
                : "border-[#764ba2] text-[#764ba2] hover:bg-purple-50"
            }`}
            onClick={() => navigate("/dashboard?tab=reviews")}
          >
            My Reviews
          </Button>
        </div>

        {/* Bookings */}
        {activeTab === "bookings" && (
          <div>
            <h2 className="text-3xl font-bold text-[#333] mb-10 text-center">
              My Bookings
            </h2>

            {loading ? (
              <div className="text-center py-16 text-gray-600 text-lg">
                Loading your bookings...
              </div>
            ) : bookings.length === 0 ? (
              <Card className="shadow-card hover:shadow-hover transition-all bg-white">
                <div className="p-12 text-center">
                  <Calendar className="w-16 h-16 mx-auto text-[#667eea] mb-4" />
                  <h3 className="text-xl font-semibold text-[#333] mb-2">
                    No bookings yet
                  </h3>
                  <p className="text-[#666] mb-5">
                    Start exploring and book your first service ✨
                  </p>
                  <Button
                    onClick={() => navigate("/")}
                    className="bg-[#667eea] hover:bg-[#5a55d6] text-white px-6 py-2"
                  >
                    Explore Businesses
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {bookings.map((booking) => (
                  <Card
                    key={booking.bookingId}
                    className="group shadow-card hover:shadow-hover transition-all bg-white border border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-[#333] mb-1">
                            Booking #{booking.bookingId}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        {booking.status === "Pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-500 text-red-600 hover:bg-red-50"
                            onClick={async () => {
                              if (confirm("Cancel this booking?")) {
                                await bookingService.cancel(booking.bookingId);
                                loadBookings();
                              }
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-[#555]">
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 mr-2 text-[#667eea]" />
                          <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-medium">
                              {new Date(
                                booking.bookingDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <Clock className="w-5 h-5 mr-2 text-[#764ba2]" />
                          <div>
                            <p className="text-sm text-gray-500">Time</p>
                            <p className="font-medium">
                              {new Date(
                                booking.bookingDate
                              ).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 mr-2 text-[#ffc107]" />
                          <div>
                            <p className="text-sm text-gray-500">Amount</p>
                            <p className="font-medium">
                              ${booking.totalAmount}
                            </p>
                          </div>
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="mt-4 p-3 bg-gradient-to-br from-gray-50 to-purple-50 rounded-lg border border-gray-100">
                          <p className="text-sm text-[#444] leading-relaxed">
                            <strong>Notes:</strong> {booking.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Placeholder for Reviews Tab (coming soon) */}
        {activeTab === "reviews" && (
          <Card className="shadow-card hover:shadow-hover bg-white transition-all p-10 text-center">
            <Sparkles className="w-10 h-10 mx-auto mb-4 text-[#764ba2]" />
            <h3 className="text-2xl font-semibold text-[#333] mb-2">
              Reviews Dashboard Coming Soon 💬
            </h3>
            <p className="text-[#666]">
              You’ll soon be able to manage and edit your reviews here!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};
