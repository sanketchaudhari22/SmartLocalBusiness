import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { bookingService, businessService } from '../services/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Calendar, Clock, DollarSign } from 'lucide-react';

export const CreateBookingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const businessId = searchParams.get('businessId');

  const [formData, setFormData] = useState({
    userId: 1, // Get from auth context
    businessId: Number(businessId),
    serviceId: 1,
    bookingDate: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [business, setBusiness] = useState<any>(null);

  useEffect(() => {
    if (businessId) {
      loadBusiness();
    }
  }, [businessId]);

  const loadBusiness = async () => {
    try {
      const response = await businessService.getById(Number(businessId));
      setBusiness(response.data.data);
    } catch (error) {
      console.error('Error loading business:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await bookingService.create(formData);
      navigate('/dashboard?tab=bookings');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Card>
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Book a Service
            </h2>
            {business && (
              <p className="text-gray-600 mb-6">
                at <span className="font-semibold">{business.businessName}</span>
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  value={formData.serviceId}
                  onChange={(e) =>
                    setFormData({ ...formData, serviceId: Number(e.target.value) })
                  }
                >
                  <option value="1">Haircut - $30</option>
                  <option value="2">Color Treatment - $80</option>
                  <option value="3">Styling - $50</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  rows={4}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Any special requests or requirements?"
                />
              </div>

              <div className="bg-primary-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Total Amount</span>
                  <span className="text-2xl font-bold text-primary-600">
                    <DollarSign className="inline w-6 h-6" />
                    30.00
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" loading={loading} className="flex-1">
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