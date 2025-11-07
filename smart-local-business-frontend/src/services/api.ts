import axios from 'axios';
import type { 
  User, Business, Booking, Review, 
  SearchRequest, ApiResponse 
} from '../types';

const API_BASE = 'http://localhost:5005';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ========================================
// USER SERVICE API
// ========================================
export const userService = {
  // Register new user
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    userType: string;
  }) => api.post<ApiResponse<User>>('/user/api/users/register', data),

  // Login user
  login: (data: { email: string; password: string }) =>
    api.post<ApiResponse<string>>('/user/api/users/login', data),

  // Get user by ID
  getUser: (id: number) =>
    api.get<ApiResponse<User>>(`/user/api/users/${id}`),

  // Update user profile
  updateUser: (id: number, data: Partial<User>) =>
    api.put<ApiResponse<User>>(`/user/api/users/${id}`, data),

  // Get current user (from token)
  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      // Decode JWT token to get user info (simple decode, not verification)
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch {
      return null;
    }
  },
};

// ========================================
// BUSINESS SERVICE API
// ========================================
export const businessService = {
  // Create new business
  create: (data: {
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
  }) => api.post<ApiResponse<Business>>('/business/api/businesses', data),

  // Get all businesses
  getAll: () =>
    api.get<ApiResponse<Business[]>>('/business/api/businesses'),

  // Get business by ID
  getById: (id: number) =>
    api.get<ApiResponse<Business>>(`/business/api/businesses/${id}`),

  // Update business
  update: (id: number, data: Partial<Business>) =>
    api.put<ApiResponse<Business>>(`/business/api/businesses/${id}`, data),

  // Delete business
  delete: (id: number) =>
    api.delete<ApiResponse<boolean>>(`/business/api/businesses/${id}`),

  // Get businesses by category
  getByCategory: (categoryId: number) =>
    api.get<ApiResponse<Business[]>>(`/business/api/businesses/category/${categoryId}`),

  // Get businesses by user (owner)
  getByUser: (userId: number) =>
    api.get<ApiResponse<Business[]>>(`/business/api/businesses/user/${userId}`),
};

// ========================================
// SEARCH SERVICE API
// ========================================
export const searchService = {
  // Search businesses with filters
  search: (request: SearchRequest) =>
    api.post<ApiResponse<{ 
      items: Business[]; 
      totalCount: number;
      pageNumber: number;
      pageSize: number;
      totalPages: number;
    }>>('/search/api/search/search', request),

  // Get nearby businesses (location-based)
  getNearby: (
    latitude: number, 
    longitude: number, 
    radiusInKm: number = 10, 
    categoryId?: number
  ) =>
    api.get<ApiResponse<Business[]>>('/search/api/search/nearby', {
      params: { latitude, longitude, radiusInKm, categoryId },
    }),

  // Quick search (autocomplete)
  quickSearch: (term: string) =>
    api.get<ApiResponse<Business[]>>('/search/api/search/quick', {
      params: { term, limit: 5 },
    }),
};

// ========================================
// BOOKING SERVICE API
// ========================================
export const bookingService = {
  // Create new booking
  create: (data: {
    userId: number;
    businessId: number;
    serviceId: number;
    bookingDate: string;
    notes?: string;
  }) => api.post<ApiResponse<Booking>>('/booking/api/booking', data),

  // Get booking by ID
  getById: (id: number) =>
    api.get<ApiResponse<Booking>>(`/booking/api/booking/${id}`),

  // Get all bookings for a user
  getUserBookings: (userId: number) =>
    api.get<ApiResponse<Booking[]>>(`/booking/api/booking/user/${userId}`),

  // Get all bookings for a business
  getBusinessBookings: (businessId: number) =>
    api.get<ApiResponse<Booking[]>>(`/booking/api/booking/business/${businessId}`),

  // Update booking status
  updateStatus: (id: number, status: string) =>
    api.put<ApiResponse<Booking>>(`/booking/api/booking/${id}/status`, { status }),

  // Cancel booking
  cancel: (id: number) =>
    api.delete<ApiResponse<boolean>>(`/booking/api/booking/${id}`),

  // Get upcoming bookings
  getUpcoming: (userId: number) =>
    api.get<ApiResponse<Booking[]>>(`/booking/api/booking/user/${userId}/upcoming`),

  // Get booking history
  getHistory: (userId: number) =>
    api.get<ApiResponse<Booking[]>>(`/booking/api/booking/user/${userId}/history`),
};

// ========================================
// REVIEW SERVICE API
// ========================================
export const reviewService = {
  // Get all reviews
  getAll: () =>
    api.get<ApiResponse<Review[]>>('/review/api/review'),

  // Get review by ID
  getById: (id: number) =>
    api.get<ApiResponse<Review>>(`/review/api/review/${id}`),

  // Get reviews by business ID
  getByBusinessId: (businessId: number) =>
    api.get<ApiResponse<Review[]>>(`/review/api/review/business/${businessId}`),

  // Get reviews by user ID
  getByUserId: (userId: number) =>
    api.get<ApiResponse<Review[]>>(`/review/api/review/user/${userId}`),

  // Create new review
  create: (data: {
    businessId: number;
    userId: number;
    rating: number;
    reviewText?: string;
  }) => api.post<ApiResponse<Review>>('/review/api/review', data),

  // Update review
  update: (id: number, data: {
    reviewId: number;
    businessId: number;
    userId: number;
    rating: number;
    reviewText?: string;
  }) => api.put<ApiResponse<Review>>(`/review/api/review/${id}`, data),

  // Delete review
  delete: (id: number) =>
    api.delete<ApiResponse<null>>(`/review/api/review/${id}`),

  // Get average rating for business
  getAverageRating: (businessId: number) =>
    api.get<ApiResponse<{ averageRating: number; totalReviews: number }>>(
      `/review/api/review/business/${businessId}/average`
    ),
};

// ========================================
// CATEGORY SERVICE API (if you have one)
// ========================================
export const categoryService = {
  getAll: () =>
    api.get<ApiResponse<Array<{
      categoryId: number;
      categoryName: string;
      description?: string;
      iconUrl?: string;
      isActive: boolean;
    }>>>('/business/api/categories'),

  getById: (id: number) =>
    api.get<ApiResponse<{
      categoryId: number;
      categoryName: string;
      description?: string;
    }>>(`/business/api/categories/${id}`),
};

// ========================================
// SERVICE (Business Services) API
// ========================================
export const serviceService = {
  // Get services for a business
  getByBusinessId: (businessId: number) =>
    api.get<ApiResponse<Array<{
      serviceId: number;
      serviceName: string;
      description?: string;
      price: number;
      businessId: number;
    }>>>(`/business/api/businesses/${businessId}/services`),

  // Create new service
  create: (data: {
    serviceName: string;
    description?: string;
    price: number;
    businessId: number;
  }) => api.post('/business/api/services', data),

  // Update service
  update: (id: number, data: any) =>
    api.put(`/business/api/services/${id}`, data),

  // Delete service
  delete: (id: number) =>
    api.delete(`/business/api/services/${id}`),
};

export default api;