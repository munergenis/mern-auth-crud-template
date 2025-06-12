import type { LoginUser } from '@/interfaces/User';
import API from './apiClient';

export const login = async (data: LoginUser) =>
  API.post<LoginUser>('/auth/login', data);
