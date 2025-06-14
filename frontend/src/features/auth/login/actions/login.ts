import API from '@/api/apiClient';
import type { LoginUser } from '../../interfaces/User';

export const login = async (data: LoginUser) =>
  API.post<LoginUser>('/auth/login', data);
