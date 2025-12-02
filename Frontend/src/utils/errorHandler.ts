import axios, { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  errors?: Record<string, string[]>;
}

/**
 * Handles API errors and returns a user-friendly message
 */
export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;

    // Network error
    if (!axiosError.response) {
      return {
        message: 'Network error. Please check your internet connection.',
        status: 0,
        code: 'NETWORK_ERROR'
      };
    }

    // HTTP error
    const { status, data } = axiosError.response;

    switch (status) {
      case 400:
        return {
          message: data?.message || 'Bad request. Please check your input.',
          status,
          code: 'BAD_REQUEST',
          errors: data?.errors
        };

      case 401:
        return {
          message: data?.message || 'Authentication required. Please log in.',
          status,
          code: 'UNAUTHORIZED'
        };

      case 403:
        return {
          message: data?.message || 'You do not have permission to access this resource.',
          status,
          code: 'FORBIDDEN'
        };

      case 404:
        return {
          message: data?.message || 'The requested resource was not found.',
          status,
          code: 'NOT_FOUND'
        };

      case 409:
        return {
          message: data?.message || 'A conflict occurred. The resource may already exist.',
          status,
          code: 'CONFLICT'
        };

      case 422:
        return {
          message: data?.message || 'Validation failed. Please check your input.',
          status,
          code: 'VALIDATION_ERROR',
          errors: data?.errors
        };

      case 429:
        return {
          message: data?.message || 'Too many requests. Please try again later.',
          status,
          code: 'RATE_LIMIT'
        };

      case 500:
        return {
          message: data?.message || 'An internal server error occurred. Please try again later.',
          status,
          code: 'SERVER_ERROR'
        };

      case 503:
        return {
          message: data?.message || 'Service temporarily unavailable. Please try again later.',
          status,
          code: 'SERVICE_UNAVAILABLE'
        };

      default:
        return {
          message: data?.message || `An error occurred (${status}). Please try again.`,
          status,
          code: 'UNKNOWN_ERROR'
        };
    }
  }

  // Non-Axios error
  if (error instanceof Error) {
    return {
      message: error.message || 'An unexpected error occurred.',
      code: 'UNKNOWN_ERROR'
    };
  }

  // Unknown error
  return {
    message: 'An unexpected error occurred. Please try again.',
    code: 'UNKNOWN_ERROR'
  };
};

/**
 * Gets a user-friendly error message
 */
export const getErrorMessage = (error: unknown): string => {
  return handleApiError(error).message;
};

/**
 * Checks if an error is a network error
 */
export const isNetworkError = (error: unknown): boolean => {
  if (axios.isAxiosError(error)) {
    return !error.response;
  }
  return false;
};

/**
 * Checks if an error is an authentication error
 */
export const isAuthError = (error: unknown): boolean => {
  if (axios.isAxiosError(error)) {
    return error.response?.status === 401;
  }
  return false;
};

/**
 * Checks if an error is a validation error
 */
export const isValidationError = (error: unknown): boolean => {
  if (axios.isAxiosError(error)) {
    return error.response?.status === 422 || error.response?.status === 400;
  }
  return false;
};

/**
 * Gets validation errors from an API error
 */
export const getValidationErrors = (error: unknown): Record<string, string[]> => {
  const apiError = handleApiError(error);
  return apiError.errors || {};
};

/**
 * Logs an error to the console (in development) or to an error tracking service
 */
export const logError = (error: unknown, context?: string): void => {
  const apiError = handleApiError(error);

  if (import.meta.env.DEV) {
    console.error(`Error${context ? ` in ${context}` : ''}:`, apiError);
  } else {
    // In production, send to error tracking service (e.g., Sentry, LogRocket)
    // Example: Sentry.captureException(error);
  }
};

/**
 * Creates a custom error
 */
export class CustomError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message);
    this.name = 'CustomError';
  }
}

export default {
  handleApiError,
  getErrorMessage,
  isNetworkError,
  isAuthError,
  isValidationError,
  getValidationErrors,
  logError,
  CustomError
};
