import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { LogIn, Sparkles } from "lucide-react";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#9b5de5] relative overflow-hidden px-4">
      {/* Floating gradient blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#ffc107] opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>

      {/* Login Card */}
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-lg shadow-2xl border border-purple-100 rounded-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <Sparkles className="w-10 h-10 text-[#ffc107] animate-pulse mx-auto mb-3" />
            <h2 className="text-3xl font-extrabold text-[#333]">
              Welcome Back 👋
            </h2>
            <p className="text-[#666] mt-2">
              Sign in to continue your SmartFinder journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium">
                {error}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
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

            <Button
              type="submit"
              className="w-full bg-[#667eea] hover:bg-[#5a55d6] text-white font-semibold shadow-md hover:shadow-lg transition-all"
              loading={loading}
            >
              <LogIn className="w-5 h-5 mr-2" />
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[#555]">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[#764ba2] hover:text-[#5a55d6] font-semibold"
            >
              Create one
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};
