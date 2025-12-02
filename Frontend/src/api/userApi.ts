import { axiosInstance } from './axiosInstance';
import type { RegisterUserDto, LoginDto, UserDto } from '@/types';

export const userApi = {
  // POST /api/users/register
  register: async (data: RegisterUserDto) => {
    return axiosInstance.post('/api/users/register', data);
  },

  // POST /api/users/login
  login: async (credentials: LoginDto) => {
    return axiosInstance.post('/api/users/login', credentials);
  },

  // GET /api/users/{id}
  getUserById: async (id: number) => {
    return axiosInstance.get<UserDto>(`/api/users/${id}`);
  },

  // PUT /api/users/{id}
  updateUser: async (id: number, data: Partial<UserDto>) => {
    return axiosInstance.put<UserDto>(`/api/users/${id}`, data);
  },
};
