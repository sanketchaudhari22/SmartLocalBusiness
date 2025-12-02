import { useState, useEffect } from 'react';
import { Business } from '@/types';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { Checkbox } from '../common/Checkbox';
import { Alert } from '../common/Alert';
import { Save, X } from 'lucide-react';

interface BusinessFormProps {
  initialData?: Partial<Business>;
  onSubmit: (data: Partial<Business>) => Promise<void>;
  onCancel?: () => void;
  categories?: Array<{ id: string; name: string }>;
  loading?: boolean;
  error?: string | null;
}

export const BusinessForm = ({
  initialData,
  onSubmit,
  onCancel,
  categories = [],
  loading = false,
  error = null
}: BusinessFormProps) => {
  const [formData, setFormData] = useState<Partial<Business>>({
    name: '',
    description: '',
    category: '',
    categoryId: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    imageUrl: '',
    isActive: true,
    ...initialData
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({ ...formData, ...initialData });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isActive: checked }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Business name is required';
    }

    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.categoryId?.trim()) {
      newErrors.categoryId = 'Category is required';
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.address?.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city?.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state?.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.zipCode?.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
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
      console.error('Form submission error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert type="error" title="Error">
          {error}
        </Alert>
      )}

      {/* Basic Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 space-y-4">
        <h3 className="text-h4 text-neutral-900 mb-4">Basic Information</h3>

        <Input
          label="Business Name"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          placeholder="Enter business name"
          error={errors.name}
          required
        />

        <Textarea
          label="Description"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          placeholder="Describe your business..."
          rows={4}
          error={errors.description}
          required
        />

        <Select
          label="Category"
          name="categoryId"
          value={formData.categoryId || ''}
          onChange={handleChange}
          options={categories.map(cat => ({
            value: cat.id,
            label: cat.name
          }))}
          placeholder="Select a category"
          error={errors.categoryId}
          required
        />

        <Input
          label="Image URL"
          name="imageUrl"
          value={formData.imageUrl || ''}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          error={errors.imageUrl}
        />
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 space-y-4">
        <h3 className="text-h4 text-neutral-900 mb-4">Contact Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone || ''}
            onChange={handleChange}
            placeholder="(123) 456-7890"
            error={errors.phone}
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email || ''}
            onChange={handleChange}
            placeholder="business@example.com"
            error={errors.email}
            required
          />
        </div>

        <Input
          label="Website (Optional)"
          name="website"
          type="url"
          value={formData.website || ''}
          onChange={handleChange}
          placeholder="https://www.yourbusiness.com"
          error={errors.website}
        />
      </div>

      {/* Location */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 space-y-4">
        <h3 className="text-h4 text-neutral-900 mb-4">Location</h3>

        <Input
          label="Street Address"
          name="address"
          value={formData.address || ''}
          onChange={handleChange}
          placeholder="123 Main Street"
          error={errors.address}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="City"
            name="city"
            value={formData.city || ''}
            onChange={handleChange}
            placeholder="City"
            error={errors.city}
            required
          />

          <Input
            label="State"
            name="state"
            value={formData.state || ''}
            onChange={handleChange}
            placeholder="State"
            error={errors.state}
            required
          />

          <Input
            label="ZIP Code"
            name="zipCode"
            value={formData.zipCode || ''}
            onChange={handleChange}
            placeholder="12345"
            error={errors.zipCode}
            required
          />
        </div>
      </div>

      {/* Status */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <Checkbox
          label="Business is active and accepting customers"
          checked={formData.isActive || false}
          onChange={handleCheckboxChange}
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
          {initialData?.id ? 'Update Business' : 'Create Business'}
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
