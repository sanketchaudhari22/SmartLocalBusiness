import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { UserPlus, User, Building2, Sparkles } from "lucide-react";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    userType: "Customer",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register(formData);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#9b5de5] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Floating glowing blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#ffc107] opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>

      <Card className="w-full max-w-2xl shadow-2xl bg-white/90 backdrop-blur-lg border border-purple-100 rounded-2xl">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Sparkles className="w-10 h-10 text-[#ffc107] animate-pulse mx-auto mb-3" />
            <h2 className="text-3xl font-extrabold text-[#333]">
              Create Your Account
            </h2>
            <p className="text-[#666] mt-2">
              Join{" "}
              <span className="text-[#764ba2] font-semibold">SmartFinder</span>{" "}
              today ✨
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium">
                {error}
              </div>
            )}

            {/* Name fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
              <Input
                label="Last Name"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
            </div>

            <Input
              label="Email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            {/* Account Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-[#444] mb-3">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, userType: "Customer" })
                  }
                  className={`p-4 border-2 rounded-xl transition-all text-center ${
                    formData.userType === "Customer"
                      ? "border-[#667eea] bg-[#eef2ff]"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <User className="w-6 h-6 mx-auto mb-2 text-[#667eea]" />
                  <div className="font-medium text-[#333]">Customer</div>
                  <div className="text-xs text-gray-500">
                    Book services & explore
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, userType: "BusinessOwner" })
                  }
                  className={`p-4 border-2 rounded-xl transition-all text-center ${
                    formData.userType === "BusinessOwner"
                      ? "border-[#764ba2] bg-[#f3e8ff]"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <Building2 className="w-6 h-6 mx-auto mb-2 text-[#764ba2]" />
                  <div className="font-medium text-[#333]">Business Owner</div>
                  <div className="text-xs text-gray-500">
                    List your business & grow
                  </div>
                </button>
              </div>
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              loading={loading}
              className="w-full bg-[#667eea] hover:bg-[#5a55d6] text-white font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <UserPlus className="w-5 h-5 mr-2" /> Create Account
            </Button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-[#555]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#764ba2] hover:text-[#5a55d6] font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};
