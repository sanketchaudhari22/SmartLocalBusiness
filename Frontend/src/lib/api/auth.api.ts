import apiClient from './client';
import { AuthResponse, LoginRequest, RegisterRequest, User, ApiResponse } from '@/types';

/**
 * Authentication API endpoints
 */
export const authApi = {
  /**
   * Login user
   */
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/users/login', credentials);
    return response.data.data;
  },

  /**
   * Register new user
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/users/register', data);
    return response.data.data;
  },

  /**
   * Get current user profile
   */
  getProfile: async (userId: string): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${userId}`);
    return response.data.data;
  },

  /**
   * Update user profile
   */
  updateProfile: async (userId: string, data: Partial<User>): Promise<User> => {
    const response = await apiClient.put<ApiResponse<User>>(`/users/${userId}`, data);
    return response.data.data;
  },

  /**
   * Logout user (client-side)
   */
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },
};
