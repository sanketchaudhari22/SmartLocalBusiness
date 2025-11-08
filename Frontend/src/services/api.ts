import axios from "axios";
import type {
  User,
  Business,
  Booking,
  Review,
  SearchRequest,
  ApiResponse,
} from "../types";

// ✅ API Gateway base URL
const API_BASE = "http://localhost:5005";

// Axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// 🛡️ Add JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ❌ Handle unauthorized errors globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

//
// ======================= USER SERVICE =======================
//
export const userService = {
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    userType: string;
  }) => api.post<ApiResponse<User>>("/user/api/users/register", data),

  login: (data: { email: string; password: string }) =>
    api.post<ApiResponse<string>>("/user/api/users/login", data),

  getUser: (id: number) => api.get<ApiResponse<User>>(`/user/api/users/${id}`),

  updateUser: (id: number, data: Partial<User>) =>
    api.put<ApiResponse<User>>(`/user/api/users/${id}`, data),

  getCurrentUser: () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  },
};

//
// ======================= BUSINESS SERVICE =======================
//
export const businessService = {
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
  }) => api.post<ApiResponse<Business>>("/business/api/businesses", data),

  getAll: () => api.get<ApiResponse<Business[]>>("/business/api/businesses"),

  getById: (id: number) =>
    api.get<ApiResponse<Business>>(`/business/api/businesses/${id}`),

  update: (id: number, data: Partial<Business>) =>
    api.put<ApiResponse<Business>>(`/business/api/businesses/${id}`, data),

  delete: (id: number) =>
    api.delete<ApiResponse<boolean>>(`/business/api/businesses/${id}`),

  getByCategory: (categoryId: number) =>
    api.get<ApiResponse<Business[]>>(
      `/business/api/businesses/category/${categoryId}`
    ),

  getByUser: (userId: number) =>
    api.get<ApiResponse<Business[]>>(`/business/api/businesses/user/${userId}`),
};

//
// ======================= BOOKING SERVICE =======================
//
export const bookingService = {
  create: (data: {
    userId: number;
    businessId: number;
    serviceId: number;
    bookingDate: string;
    notes?: string;
  }) => api.post<ApiResponse<Booking>>("/booking/api/booking", data),

  getById: (id: number) =>
    api.get<ApiResponse<Booking>>(`/booking/api/booking/${id}`),

  getUserBookings: (userId: number) =>
    api.get<ApiResponse<Booking[]>>(`/booking/api/booking/user/${userId}`),

  getBusinessBookings: (businessId: number) =>
    api.get<ApiResponse<Booking[]>>(
      `/booking/api/booking/business/${businessId}`
    ),

  updateStatus: (id: number, status: string) =>
    api.put<ApiResponse<Booking>>(`/booking/api/booking/${id}/status`, {
      status,
    }),

  cancel: (id: number) =>
    api.delete<ApiResponse<boolean>>(`/booking/api/booking/${id}`),

  getUpcoming: (userId: number) =>
    api.get<ApiResponse<Booking[]>>(
      `/booking/api/booking/user/${userId}/upcoming`
    ),

  getHistory: (userId: number) =>
    api.get<ApiResponse<Booking[]>>(
      `/booking/api/booking/user/${userId}/history`
    ),
};

//
// ======================= REVIEW SERVICE =======================
//
export const reviewService = {
  getAll: () => api.get<ApiResponse<Review[]>>("/review/api/review"),

  getById: (id: number) =>
    api.get<ApiResponse<Review>>(`/review/api/review/${id}`),

  getByBusinessId: (businessId: number) =>
    api.get<ApiResponse<Review[]>>(
      `/review/api/review/business/${businessId}`
    ),

  getByUserId: (userId: number) =>
    api.get<ApiResponse<Review[]>>(`/review/api/review/user/${userId}`),

  create: (data: {
    businessId: number;
    userId: number;
    rating: number;
    reviewText?: string;
  }) => api.post<ApiResponse<Review>>("/review/api/review", data),

  update: (id: number, data: Partial<Review>) =>
    api.put<ApiResponse<Review>>(`/review/api/review/${id}`, data),

  delete: (id: number) =>
    api.delete<ApiResponse<null>>(`/review/api/review/${id}`),

  getAverageRating: (businessId: number) =>
    api.get<ApiResponse<{ averageRating: number; totalReviews: number }>>(
      `/review/api/review/business/${businessId}/average`
    ),
};

//
// ======================= CATEGORY SERVICE =======================
//
export const categoryService = {
  getAll: () =>
    api.get<
      ApiResponse<
        Array<{
          categoryId: number;
          categoryName: string;
          description?: string;
          iconUrl?: string;
          isActive: boolean;
        }>
      >
    >("/business/api/categories"),

  getById: (id: number) =>
    api.get<
      ApiResponse<{
        categoryId: number;
        categoryName: string;
        description?: string;
      }>
    >(`/business/api/categories/${id}`),
};

//
// ======================= SERVICE (Business Services) =======================
//
export const serviceService = {
  getByBusinessId: (businessId: number) =>
    api.get<
      ApiResponse<
        Array<{
          serviceId: number;
          serviceName: string;
          description?: string;
          price: number;
          businessId: number;
        }>
      >
    >(`/business/api/businesses/${businessId}/services`),

  create: (data: {
    serviceName: string;
    description?: string;
    price: number;
    businessId: number;
  }) => api.post("/business/api/services", data),

  update: (id: number, data: any) =>
    api.put(`/business/api/services/${id}`, data),

  delete: (id: number) => api.delete(`/business/api/services/${id}`),
};

//
// ======================= SEARCH SERVICE =======================
//
export const searchService = {
  search: (request: SearchRequest) =>
    api.post<
      ApiResponse<{
        items: Business[];
        totalCount: number;
        pageNumber: number;
        pageSize: number;
        totalPages: number;
      }>
    >("/search/api/search/search", request),

  getNearby: (
    latitude: number,
    longitude: number,
    radiusInKm = 10,
    categoryId?: number
  ) =>
    api.get<ApiResponse<Business[]>>("/search/api/search/nearby", {
      params: { latitude, longitude, radiusInKm, categoryId },
    }),

  quickSearch: (term: string) =>
    api.get<ApiResponse<Business[]>>("/search/api/search/quick", {
      params: { term, limit: 5 },
    }),
};

export default api;
