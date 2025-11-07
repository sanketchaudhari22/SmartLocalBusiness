import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { UserPlus, User, Building2, Sparkles } from 'lucide-react';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    userType: 'Customer',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(formData);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>

      <Card className="w-full max-w-2xl shadow-2xl bg-white/90 backdrop-blur-md border border-primary-100">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Sparkles className="w-10 h-10 text-accent animate-pulse" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
            <p className="text-gray-600 mt-2">Join <span className="text-primary-600 font-semibold">SmartFinder</span> today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
              <Input
                label="Last Name"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>

            <Input
              label="Email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'Customer' })}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    formData.userType === 'Customer'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <User className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                  <div className="font-medium">Customer</div>
                  <div className="text-xs text-gray-500">Book services</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'BusinessOwner' })}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    formData.userType === 'BusinessOwner'
                      ? 'border-secondary-600 bg-secondary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Building2 className="w-6 h-6 mx-auto mb-2 text-secondary-600" />
                  <div className="font-medium">Business</div>
                  <div className="text-xs text-gray-500">List your services</div>
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-accent hover:bg-orange-600 text-white" loading={loading}>
              <UserPlus className="w-5 h-5 mr-2" />
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};
