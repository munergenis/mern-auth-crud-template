import type { LoginUser, RegisterUser } from '@/features/auth/interfaces/User';
import API from './apiClient';

export const login = async (data: LoginUser) =>
  API.post<LoginUser>('/auth/login', data);

export const register = async (data: RegisterUser) =>
  API.post<RegisterUser>('/auth/register', data);
