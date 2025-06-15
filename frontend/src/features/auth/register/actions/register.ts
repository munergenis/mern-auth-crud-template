import API from '@/api/apiClient';
import type { RegisterResponse, RegisterUser } from '../../interfaces/Auth';

export const register = async (data: RegisterUser) =>
  API.post<RegisterResponse>('/auth/register', data);
