import API from '@/api/apiClient';
import type {
  ResetPasswordData,
  ResetPasswordResponse,
} from '../../interfaces/Auth';

export const resetPassword = (data: ResetPasswordData) =>
  API.post<ResetPasswordResponse>('/auth/password/reset', data);
