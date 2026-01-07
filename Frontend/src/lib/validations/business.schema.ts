import { z } from 'zod';

/**
 * Business form validation schema
 */
export const businessSchema = z.object({
  categoryId: z.string().min(1, 'Category is required'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  description: z.string().optional(),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'Valid zip code is required'),
  phoneNumber: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Invalid email address'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type BusinessFormData = z.infer<typeof businessSchema>;

/**
 * Service form validation schema
 */
export const serviceSchema = z.object({
  businessId: z.string().min(1, 'Business is required'),
  serviceName: z.string().min(2, 'Service name must be at least 2 characters'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be a positive number'),
  duration: z.number().min(1, 'Duration must be at least 1 minute'),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;
