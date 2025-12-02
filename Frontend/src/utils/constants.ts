/**
 * Application-wide constants
 */

export const APP_NAME = 'Smart Local Business';
export const APP_DESCRIPTION = 'Discover and book local services';

export const USER_TYPES = {
  CUSTOMER: 'Customer',
  OWNER: 'Owner',
  ADMIN: 'Admin'
} as const;

export const BOOKING_STATUS = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed'
} as const;

export const RATING_MAX = 5;
export const RATING_MIN = 1;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  PAGE_SIZE_OPTIONS: [12, 24, 48, 96]
} as const;

export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
  INPUT: 'yyyy-MM-dd'
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  BUSINESSES: '/businesses',
  BUSINESS_DETAIL: '/businesses/:id',
  CREATE_BUSINESS: '/businesses/create',
  EDIT_BUSINESS: '/businesses/:id/edit',
  MY_BUSINESSES: '/my-businesses',
  BOOKINGS: '/bookings',
  CREATE_BOOKING: '/bookings/create',
  MY_BOOKINGS: '/my-bookings',
  REVIEWS: '/reviews',
  CREATE_REVIEW: '/reviews/create',
  MY_REVIEWS: '/my-reviews',
  SEARCH: '/search',
  PROFILE: '/profile',
  EDIT_PROFILE: '/profile/edit'
} as const;

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
  THEME: 'theme'
} as const;

export const TOAST_DURATION = 5000; // 5 seconds
