import API from '@/api/apiClient';
import type { RegisterUser } from '../../interfaces/User';

export const register = async (data: RegisterUser) =>
  API.post<RegisterUser>('/auth/register', data);
