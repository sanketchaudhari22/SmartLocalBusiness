// Enums
export enum UserType {
  Customer = 'Customer',
  BusinessOwner = 'BusinessOwner',
  Admin = 'Admin',
}

export enum BookingStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Cancelled = 'Cancelled',
  Completed = 'Completed',
}

// User Types
export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  userType: UserType;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  userType: UserType;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Category Types
export interface Category {
  categoryId: string;
  categoryName: string;
  description?: string;
  iconUrl?: string;
  isActive: boolean;
  createdAt: string;
  businessCount?: number;
}

// Business Types
export interface Business {
  businessId: string;
  userId: string;
  categoryId: string;
  businessName: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  email: string;
  website?: string;
  rating: number;
  totalReviews: number;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  services?: Service[];
  distance?: number; // For search results
}

export interface CreateBusinessRequest {
  categoryId: string;
  businessName: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
  phoneNumber: string;
  email: string;
  website?: string;
}

// Service Types
export interface Service {
  serviceId: string;
  businessId: string;
  serviceName: string;
  description?: string;
  price: number;
  duration: number; // in minutes
}

export interface CreateServiceRequest {
  businessId: string;
  serviceName: string;
  description?: string;
  price: number;
  duration: number;
}

// Booking Types
export interface Booking {
  bookingId: string;
  userId: string;
  businessId: string;
  serviceId: string;
  bookingDate: string;
  status: BookingStatus;
  totalAmount: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  business?: Business;
  service?: Service;
  user?: User;
}

export interface CreateBookingRequest {
  businessId: string;
  serviceId: string;
  bookingDate: string;
  notes?: string;
}

export interface UpdateBookingStatusRequest {
  status: BookingStatus;
}

// Review Types
export interface Review {
  reviewId: string;
  businessId: string;
  userId: string;
  rating: number;
  reviewText?: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface CreateReviewRequest {
  businessId: string;
  rating: number;
  reviewText?: string;
}

// Search Types
export interface SearchParams {
  query?: string;
  categoryId?: string;
  city?: string;
  minRating?: number;
  page?: number;
  pageSize?: number;
}

export interface NearbySearchParams {
  latitude: number;
  longitude: number;
  radiusInKm?: number;
  categoryId?: string;
}

export interface SearchResult {
  businesses: Business[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}

// Pagination Types
export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Dashboard Stats Types
export interface CustomerDashboardStats {
  totalBookings: number;
  upcomingBookings: number;
  completedBookings: number;
  reviewsWritten: number;
}

export interface BusinessOwnerDashboardStats {
  totalBookings: number;
  pendingBookings: number;
  monthlyRevenue: number;
  averageRating: number;
  totalReviews: number;
  recentBookings: Booking[];
}

export interface AdminDashboardStats {
  totalUsers: number;
  totalBusinesses: number;
  totalBookings: number;
  totalRevenue: number;
  pendingVerifications: number;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}
