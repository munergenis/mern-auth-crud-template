import API from '@/api/apiClient';
import type { LogoutResponse } from '../interfaces/Auth';

export const logout = async () => API.get<LogoutResponse>('/auth/logout');
