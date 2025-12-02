import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { businessApi, serviceApi, bookingApi } from '@/api';
import { BusinessDto, ServiceDto, CreateBookingDto } from '@/types';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { Alert } from '@/components/common/Alert';
import { useAuthStore } from '@/store';
import { useUIStore } from '@/store';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

export const CreateBookingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuthStore();
  const { addToast } = useUIStore();

  const [businesses, setBusinesses] = useState<BusinessDto[]>([]);
  const [services, setServices] = useState<ServiceDto[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<CreateBookingDto>({
    userId: user?.userId || 0,
    businessId: parseInt(searchParams.get('businessId') || '0'),
    serviceId: 0,
    bookingDate: '',
    bookingTime: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchBusinesses();
  }, []);

  useEffect(() => {
    if (formData.businessId) {
      fetchServicesForBusiness(formData.businessId);
      const business = businesses.find(b => b.businessId === formData.businessId);
      setSelectedBusiness(business || null);
    }
  }, [formData.businessId, businesses]);

  const fetchBusinesses = async () => {
    try {
      const response = await businessApi.getAllBusinesses();
      setBusinesses(response.data);
    } catch (err: any) {
      setError('Failed to load businesses');
    }
  };

  const fetchServicesForBusiness = async (businessId: number) => {
    try {
      const response = await serviceApi.getServicesByBusiness(businessId);
      setServices(response.data);
    } catch (err: any) {
      setServices([]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['businessId', 'serviceId'].includes(name) ? parseInt(value) : value
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.businessId) {
      newErrors.businessId = 'Please select a business';
    }
    if (!formData.bookingDate) {
      newErrors.bookingDate = 'Booking date is required';
    }
    if (!formData.bookingTime) {
      newErrors.bookingTime = 'Booking time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError('');

      const bookingData = {
        ...formData,
        serviceId: formData.serviceId || undefined
      };

      const response = await bookingApi.createBooking(bookingData);

      addToast({
        type: 'success',
        message: 'Booking created successfully!'
      });

      navigate(`/my-bookings`);
    } catch (err: any) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  // Get min date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container-custom py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-h1 mb-2">Book an Appointment</h1>
        <p className="text-body text-neutral-600 mb-8">
          Schedule your visit with a local business
        </p>

        {error && (
          <Alert type="error" onClose={() => setError('')} className="mb-6">
            {error}
          </Alert>
        )}

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Select
              label="Select Business"
              name="businessId"
              value={formData.businessId}
              onChange={handleInputChange}
              error={errors.businessId}
              required
            >
              <option value={0}>Choose a business</option>
              {businesses.map((business) => (
                <option key={business.businessId} value={business.businessId}>
                  {business.businessName} - {business.city}
                </option>
              ))}
            </Select>

            {selectedBusiness && (
              <div className="bg-neutral-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">{selectedBusiness.businessName}</h4>
                <p className="text-sm text-neutral-600 mb-2">
                  {selectedBusiness.address}, {selectedBusiness.city}
                </p>
                {selectedBusiness.phone && (
                  <p className="text-sm text-neutral-600">
                    Phone: {selectedBusiness.phone}
                  </p>
                )}
              </div>
            )}

            {services.length > 0 && (
              <Select
                label="Select Service (Optional)"
                name="serviceId"
                value={formData.serviceId}
                onChange={handleInputChange}
              >
                <option value={0}>No specific service</option>
                {services.map((service) => (
                  <option key={service.serviceId} value={service.serviceId}>
                    {service.serviceName}
                    {service.price ? ` - $${service.price.toFixed(2)}` : ''}
                  </option>
                ))}
              </Select>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Booking Date"
                name="bookingDate"
                type="date"
                value={formData.bookingDate}
                onChange={handleInputChange}
                error={errors.bookingDate}
                min={today}
                required
                icon={<Calendar className="w-5 h-5 text-neutral-400" />}
              />

              <Input
                label="Booking Time"
                name="bookingTime"
                type="time"
                value={formData.bookingTime}
                onChange={handleInputChange}
                error={errors.bookingTime}
                required
                icon={<Clock className="w-5 h-5 text-neutral-400" />}
              />
            </div>

            <div>
              <label className="label" htmlFor="notes">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
                className="input-base"
                placeholder="Any special requests or notes for the business..."
              />
            </div>

            <div className="bg-primary-50 p-4 rounded-lg">
              <h4 className="font-medium text-primary-900 mb-2">
                📋 Booking Summary
              </h4>
              <div className="space-y-1 text-sm text-primary-800">
                <p>
                  <strong>Business:</strong>{' '}
                  {selectedBusiness?.businessName || 'Not selected'}
                </p>
                {formData.bookingDate && (
                  <p>
                    <strong>Date:</strong> {formData.bookingDate}
                  </p>
                )}
                {formData.bookingTime && (
                  <p>
                    <strong>Time:</strong> {formData.bookingTime}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(-1)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={loading}
                className="flex-1"
              >
                Confirm Booking
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
