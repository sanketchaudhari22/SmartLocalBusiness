/**
 * Application Configuration
 * Central configuration for all app-related settings
 */

export const APP_CONFIG = {
  // Application Info
  APP_NAME: 'Smart Local Business',
  APP_SHORT_NAME: 'LocalBiz',
  APP_DESCRIPTION: 'Find and book local services near you',
  APP_VERSION: '1.0.0',

  // Contact Info
  CONTACT: {
    EMAIL: 'info@localbiz.com',
    PHONE: '(123) 456-7890',
    ADDRESS: '123 Business St, Suite 100, City, State 12345'
  },

  // Social Media
  SOCIAL: {
    FACEBOOK: 'https://facebook.com/localbiz',
    TWITTER: 'https://twitter.com/localbiz',
    INSTAGRAM: 'https://instagram.com/localbiz',
    LINKEDIN: 'https://linkedin.com/company/localbiz'
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 12,
    PAGE_SIZE_OPTIONS: [12, 24, 48],
    MAX_PAGE_SIZE: 100
  },

  // Upload Limits
  UPLOAD: {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    MAX_IMAGES: 10
  },

  // Validation Rules
  VALIDATION: {
    PASSWORD: {
      MIN_LENGTH: 8,
      MAX_LENGTH: 128,
      REQUIRE_UPPERCASE: true,
      REQUIRE_LOWERCASE: true,
      REQUIRE_NUMBER: true,
      REQUIRE_SPECIAL: true
    },
    USERNAME: {
      MIN_LENGTH: 3,
      MAX_LENGTH: 30
    },
    BUSINESS_NAME: {
      MIN_LENGTH: 3,
      MAX_LENGTH: 100
    },
    REVIEW: {
      MIN_LENGTH: 10,
      MAX_LENGTH: 500
    }
  },

  // Date & Time
  DATE: {
    FORMAT: 'MMM dd, yyyy',
    TIME_FORMAT: 'HH:mm',
    DATETIME_FORMAT: 'MMM dd, yyyy HH:mm'
  },

  // Currency
  CURRENCY: {
    CODE: 'USD',
    SYMBOL: '$',
    DECIMAL_PLACES: 2
  },

  // Map Settings
  MAP: {
    DEFAULT_CENTER: {
      lat: 40.7128,
      lng: -74.0060
    },
    DEFAULT_ZOOM: 13,
    API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  },

  // Search Settings
  SEARCH: {
    DEBOUNCE_DELAY: 300,
    MIN_QUERY_LENGTH: 2,
    MAX_RECENT_SEARCHES: 5
  },

  // Booking Settings
  BOOKING: {
    MIN_ADVANCE_HOURS: 2,
    MAX_ADVANCE_DAYS: 90,
    CANCELLATION_HOURS: 24
  },

  // Rating Settings
  RATING: {
    MIN: 1,
    MAX: 5,
    STEP: 0.5
  },

  // Theme
  THEME: {
    DEFAULT: 'light',
    OPTIONS: ['light', 'dark', 'system']
  },

  // Features Flags
  FEATURES: {
    ENABLE_SOCIAL_LOGIN: false,
    ENABLE_CHAT: false,
    ENABLE_NOTIFICATIONS: true,
    ENABLE_ANALYTICS: true,
    ENABLE_DARK_MODE: true
  },

  // Routes
  ROUTES: {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    BUSINESSES: '/businesses',
    SEARCH: '/search',
    MY_BOOKINGS: '/my-bookings',
    MY_REVIEWS: '/my-reviews',
    MY_BUSINESSES: '/my-businesses',
    ADMIN: '/admin'
  },

  // Storage Keys
  STORAGE_KEYS: {
    AUTH_TOKEN: 'auth_token',
    USER_DATA: 'user_data',
    THEME: 'theme',
    LANGUAGE: 'language',
    RECENT_SEARCHES: 'recent_searches'
  }
};

export default APP_CONFIG;
