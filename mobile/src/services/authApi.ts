/**
 * Authentication API service
 */

import { apiClient } from './api';
import { User } from '@/types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
  first_name?: string;
  last_name?: string;
  location?: string;
}

export interface UpdateProfileRequest {
  first_name?: string;
  last_name?: string;
  location?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface PasswordResetRequest {
  email: string;
}

class AuthApi {
  /**
   * Register a new user account
   */
  async register(data: RegisterRequest): Promise<User> {
    return apiClient.post<User>('/api/v1/auth/register', data);
  }

  /**
   * Login with email and password
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/api/v1/auth/login', data);
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<User> {
    return apiClient.get<User>('/api/v1/auth/profile');
  }

  /**
   * Update user profile
   */
  async updateProfile(data: UpdateProfileRequest): Promise<User> {
    return apiClient.put<User>('/api/v1/auth/profile', data);
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/api/v1/auth/refresh');
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(data: PasswordResetRequest): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>('/api/v1/auth/password-reset', data);
  }

  /**
   * Logout user
   */
  async logout(): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>('/api/v1/auth/logout');
  }
}

export const authApi = new AuthApi();