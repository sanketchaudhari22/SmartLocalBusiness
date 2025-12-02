// User Types matching backend DTOs

export interface UserDto {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userType: string;

  // UI EXPECTED FIELDS
  phone?: string; // alias
  createdAt?: string;
}

export interface RegisterUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userType: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: string; // JWT token
}
