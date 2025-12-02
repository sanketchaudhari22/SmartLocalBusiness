/**
 * API Configuration
 * Central configuration for all API-related settings
 */

export const API_CONFIG = {
  // Base URL for API requests
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',

  // API Endpoints
  ENDPOINTS: {
    // Auth
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
      VERIFY_EMAIL: '/auth/verify-email'
    },

    // Users
    USERS: {
      BASE: '/users',
      PROFILE: '/users/profile',
      UPDATE_PROFILE: '/users/profile',
      CHANGE_PASSWORD: '/users/change-password'
    },

    // Businesses
    BUSINESSES: {
      BASE: '/businesses',
      SEARCH: '/businesses/search',
      BY_CATEGORY: '/businesses/category',
      MY_BUSINESSES: '/businesses/my',
      NEARBY: '/businesses/nearby'
    },

    // Bookings
    BOOKINGS: {
      BASE: '/bookings',
      MY_BOOKINGS: '/bookings/my',
      CANCEL: '/bookings/cancel',
      UPCOMING: '/bookings/upcoming',
      HISTORY: '/bookings/history'
    },

    // Reviews
    REVIEWS: {
      BASE: '/reviews',
      MY_REVIEWS: '/reviews/my',
      BY_BUSINESS: '/reviews/business'
    },

    // Categories
    CATEGORIES: {
      BASE: '/categories'
    },

    // Services
    SERVICES: {
      BASE: '/services',
      BY_BUSINESS: '/services/business'
    },

    // Search
    SEARCH: {
      BASE: '/search',
      SUGGESTIONS: '/search/suggestions'
    }
  },

  // Request timeout (in milliseconds)
  TIMEOUT: 30000,

  // Retry configuration
  RETRY: {
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000
  },

  // Headers
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

export default API_CONFIG;
