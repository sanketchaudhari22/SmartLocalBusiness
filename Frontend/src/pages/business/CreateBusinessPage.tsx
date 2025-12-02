import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { businessApi, categoryApi } from '@/api';
import { CategoryDto, CreateBusinessDto } from '@/types';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { Alert } from '@/components/common/Alert';
import { Stepper } from '@/components/common/Stepper';
import { useAuthStore } from '@/store';
import { useUIStore } from '@/store';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const steps = [
  { title: 'Basic Info', description: 'Name & Category' },
  { title: 'Location', description: 'Address & Contact' },
  { title: 'Details', description: 'Hours & Description' }
];

export const CreateBusinessPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addToast } = useUIStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<CreateBusinessDto>({
    ownerId: user?.userId || 0,
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
    operatingHours: '',
    latitude: 0,
    longitude: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getAllCategories();
      setCategories(response.data);
    } catch (err: any) {
      setError('Failed to load categories');
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
    // Clear error for this field
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.businessName.trim()) {
          newErrors.businessName = 'Business name is required';
        }
        if (!formData.categoryId || formData.categoryId === 0) {
          newErrors.categoryId = 'Please select a category';
        }
        break;

      case 2:
        if (!formData.address.trim()) {
          newErrors.address = 'Address is required';
        }
        if (!formData.city.trim()) {
          newErrors.city = 'City is required';
        }
        if (!formData.state.trim()) {
          newErrors.state = 'State is required';
        }
        if (!formData.zipCode.trim()) {
          newErrors.zipCode = 'ZIP code is required';
        }
        if (!formData.phone.trim()) {
          newErrors.phone = 'Phone number is required';
        }
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Invalid email format';
        }
        break;

      case 3:
        if (!formData.description.trim()) {
          newErrors.description = 'Description is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(currentStep)) {
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await businessApi.createBusiness(formData);

      addToast({
        type: 'success',
        message: 'Business created successfully!'
      });

      navigate(`/businesses/${response.data.businessId}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create business');
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-h1 mb-2">Create New Business</h1>
        <p className="text-body text-neutral-600 mb-8">
          Fill in the details to list your business
        </p>

        <Stepper steps={steps} currentStep={currentStep} />

        {error && (
          <Alert type="error" onClose={() => setError('')} className="mb-6">
            {error}
          </Alert>
        )}

        <Card>
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-h3 mb-4">Basic Information</h2>

                <Input
                  label="Business Name"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  error={errors.businessName}
                  required
                  placeholder="Enter your business name"
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

                <div className="flex justify-end pt-4">
                  <Button type="button" onClick={handleNext}>
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Location & Contact */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-h3 mb-4">Location & Contact</h2>

                <Input
                  label="Street Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  error={errors.address}
                  required
                  placeholder="123 Main St"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    error={errors.city}
                    required
                    placeholder="City"
                  />

                  <Input
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    error={errors.state}
                    required
                    placeholder="State"
                  />

                  <Input
                    label="ZIP Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    error={errors.zipCode}
                    required
                    placeholder="12345"
                  />
                </div>

                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                  required
                  placeholder="(555) 123-4567"
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  required
                  placeholder="business@example.com"
                />

                <Input
                  label="Website (Optional)"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://www.yourbusiness.com"
                />

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="secondary" onClick={handlePrevious}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                  </Button>
                  <Button type="button" onClick={handleNext}>
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Details */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-h3 mb-4">Business Details</h2>

                <div>
                  <label className="label" htmlFor="description">
                    Description <span className="text-error-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                    className={`input-base ${errors.description ? 'input-error' : ''}`}
                    placeholder="Tell customers about your business..."
                    required
                  />
                  {errors.description && (
                    <p className="error-text">{errors.description}</p>
                  )}
                </div>

                <Input
                  label="Operating Hours (Optional)"
                  name="operatingHours"
                  value={formData.operatingHours}
                  onChange={handleInputChange}
                  placeholder="Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
                />

                <div className="bg-neutral-50 p-4 rounded-lg">
                  <p className="text-sm text-neutral-600">
                    <strong>Note:</strong> Your business will be reviewed before it appears
                    publicly. You'll receive a notification once it's approved.
                  </p>
                </div>

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="secondary" onClick={handlePrevious}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                  </Button>
                  <Button type="submit" isLoading={loading}>
                    Create Business
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};
