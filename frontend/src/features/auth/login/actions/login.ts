import API from '@/api/apiClient';
import type { LoginResponse, LoginUser } from '../../interfaces/Auth';

export const login = async (data: LoginUser) =>
  API.post<never, LoginResponse>('/auth/login', data);
