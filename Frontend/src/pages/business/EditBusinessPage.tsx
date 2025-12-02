import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { businessApi, categoryApi } from '@/api';
import { BusinessDto, CategoryDto } from '@/types';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { Alert } from '@/components/common/Alert';
import { Textarea } from '@/components/common/Textarea';
import { useUIStore } from '@/store';
import { ArrowLeft } from 'lucide-react';

export const EditBusinessPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useUIStore();

  const [business, setBusiness] = useState<BusinessDto | null>(null);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    businessName: '',
    categoryId: 0,
    description: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    website: '',
    operatingHours: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const [businessResponse, categoriesResponse] = await Promise.all([
        businessApi.getBusinessById(parseInt(id)),
        categoryApi.getAllCategories()
      ]);

      const businessData = businessResponse.data;
      setBusiness(businessData);
      setCategories(categoriesResponse.data);

      setFormData({
        businessName: businessData.businessName,
        categoryId: businessData.categoryId,
        description: businessData.description || '',
        address: businessData.address,
        city: businessData.city,
        state: businessData.state,
        zipCode: businessData.zipCode,
        phone: businessData.phone || '',
        email: businessData.email || '',
        website: businessData.website || '',
        operatingHours: businessData.operatingHours || ''
      });
    } catch (err: any) {
      setError(err.message || 'Failed to load business');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'categoryId' ? parseInt(value) : value
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !id) {
      return;
    }

    try {
      setSaving(true);
      setError('');

      await businessApi.updateBusiness(parseInt(id), formData);

      addToast({
        type: 'success',
        message: 'Business updated successfully!'
      });

      navigate(`/businesses/${id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to update business');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  if (error && !business) {
    return (
      <div className="container-custom py-8">
        <Alert type="error">{error}</Alert>
        <Button onClick={() => navigate(-1)} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-h1 mb-2">Edit Business</h1>
        <p className="text-body text-neutral-600 mb-8">
          Update your business information
        </p>

        {error && (
          <Alert type="error" onClose={() => setError('')} className="mb-6">
            {error}
          </Alert>
        )}

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-h3">Basic Information</h3>

              <Input
                label="Business Name"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                error={errors.businessName}
                required
              />

              <Select
                label="Category"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                error={errors.categoryId}
                required
              >
                <option value={0}>Select a category</option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </Select>

              <Textarea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe your business..."
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-h3">Location & Contact</h3>

              <Input
                label="Street Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                error={errors.address}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  error={errors.city}
                  required
                />

                <Input
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />

                <Input
                  label="ZIP Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <Input
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                required
              />

              <Input
                label="Website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://www.example.com"
              />

              <Input
                label="Operating Hours"
                name="operatingHours"
                value={formData.operatingHours}
                onChange={handleInputChange}
                placeholder="Mon-Fri: 9AM-6PM"
              />
            </div>

            <div className="flex gap-4 pt-4">
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
                isLoading={saving}
                className="flex-1"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
