// Business Types matching backend DTOs

export interface BusinessDto {
  businessId: number;
  userId: number;
  categoryId: number;
  businessName: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  email: string;
  website: string;
  rating: number;
  totalReviews: number;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  categoryName: string;

  // UI EXPECTED FIELDS
  phone?: string; // alias of phoneNumber
  operatingHours?: string;
  averageRating?: number;
}

export interface CreateBusinessDto {
  userId: number;
  categoryId: number;
  businessName: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
  phoneNumber: string;
  email: string;
  website: string;

  // UI fields
  operatingHours?: string;
}
