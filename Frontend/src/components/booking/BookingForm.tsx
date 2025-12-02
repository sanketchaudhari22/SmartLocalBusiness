import { useState, useEffect } from 'react';
import { Business, Service } from '@/types';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { Alert } from '../common/Alert';
import { Calendar, Clock, Save, X } from 'lucide-react';
import { formatDate } from '@/utils/formatters';

interface BookingFormProps {
  business: Business;
  services?: Service[];
  onSubmit: (data: {
    serviceId: string;
    bookingDate: string;
    bookingTime: string;
    notes?: string;
  }) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
  error?: string | null;
}

export const BookingForm = ({
  business,
  services = [],
  onSubmit,
  onCancel,
  loading = false,
  error = null
}: BookingFormProps) => {
  const [formData, setFormData] = useState({
    serviceId: '',
    bookingDate: '',
    bookingTime: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Get minimum date (today)
  const minDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (formData.serviceId && services) {
      const service = services.find(s => s.id === formData.serviceId);
      setSelectedService(service || null);
    }
  }, [formData.serviceId, services]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.serviceId) {
      newErrors.serviceId = 'Please select a service';
    }

    if (!formData.bookingDate) {
      newErrors.bookingDate = 'Please select a date';
    } else {
      const selectedDate = new Date(formData.bookingDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.bookingDate = 'Please select a future date';
      }
    }

    if (!formData.bookingTime) {
      newErrors.bookingTime = 'Please select a time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      console.error('Booking submission error:', err);
    }
  };

  // Generate time slots (9 AM - 6 PM, every 30 mins)
  const timeSlots = [];
  for (let hour = 9; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 18 && minute > 0) break;
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const displayTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      timeSlots.push({ value: time, label: displayTime });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert type="error" title="Error">
          {error}
        </Alert>
      )}

      {/* Business Info */}
      <div className="bg-primary-50 rounded-xl p-6 border border-primary-200">
        <h3 className="text-h4 text-neutral-900 mb-2">{business.name}</h3>
        <p className="text-sm text-neutral-600">{business.address}</p>
        {business.phone && (
          <p className="text-sm text-neutral-600 mt-1">{business.phone}</p>
        )}
      </div>

      {/* Service Selection */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 space-y-4">
        <h3 className="text-h4 text-neutral-900">Select Service</h3>

        <Select
          label="Service"
          name="serviceId"
          value={formData.serviceId}
          onChange={handleChange}
          options={services.map(service => ({
            value: service.id,
            label: `${service.name}${service.price ? ` - $${service.price}` : ''}`
          }))}
          placeholder="Choose a service"
          error={errors.serviceId}
          required
        />

        {selectedService && (
          <div className="bg-neutral-50 rounded-lg p-4">
            <p className="text-sm font-medium text-neutral-900 mb-2">
              Service Details
            </p>
            {selectedService.description && (
              <p className="text-sm text-neutral-600 mb-2">
                {selectedService.description}
              </p>
            )}
            <div className="flex items-center gap-4 text-sm text-neutral-600">
              {selectedService.duration && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedService.duration} minutes
                </span>
              )}
              {selectedService.price && (
                <span className="font-semibold text-primary-600">
                  ${selectedService.price}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Date and Time */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 space-y-4">
        <h3 className="text-h4 text-neutral-900">Select Date & Time</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Date"
            name="bookingDate"
            type="date"
            value={formData.bookingDate}
            onChange={handleChange}
            min={minDate}
            error={errors.bookingDate}
            leftIcon={<Calendar className="w-5 h-5" />}
            required
          />

          <Select
            label="Time"
            name="bookingTime"
            value={formData.bookingTime}
            onChange={handleChange}
            options={timeSlots}
            placeholder="Select time"
            error={errors.bookingTime}
            required
          />
        </div>
      </div>

      {/* Additional Notes */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <Textarea
          label="Additional Notes (Optional)"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any special requests or information..."
          rows={4}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          leftIcon={<Save className="w-5 h-5" />}
        >
          Confirm Booking
        </Button>

        {onCancel && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onCancel}
            leftIcon={<X className="w-5 h-5" />}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};
