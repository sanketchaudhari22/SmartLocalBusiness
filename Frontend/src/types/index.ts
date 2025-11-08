export interface User {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userType: string;
}

export interface Business {
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
  categoryName: string;
  createdAt: string;
  updatedAt: string;
    imageUrl?: string;
}

export interface Booking {
  bookingId: number;
  userId: number;
  businessId: number;
  serviceId: number;
  bookingDate: string;
  status: string;
  totalAmount: number;
  notes?: string;
}

export interface Review {
  reviewId: number;
  businessId: number;
  userId: number;
  rating: number;
  reviewText?: string;
  createdAt: string;
}

export interface SearchRequest {
  searchTerm?: string;
  city?: string;
  categoryId?: number;
  latitude?: number;
  longitude?: number;
  radiusInKm?: number;
  pageNumber: number;
  pageSize: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}