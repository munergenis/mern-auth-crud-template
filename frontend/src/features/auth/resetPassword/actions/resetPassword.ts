import API from '@/api/apiClient';
import type {
  ResetPasswordData,
  ResetPasswordResponse,
} from '../../interfaces/Auth';

export const resetPassword = async (data: ResetPasswordData) =>
  API.post<never, ResetPasswordResponse>('/auth/password/reset', data);
