import API from '@/api/apiClient';
import type {
  ResetPasswordData,
  ResetPasswordResponse,
} from '../../interfaces/Auth';

export const sendPasswordResetEmail = async (data: ResetPasswordData) =>
  API.post<ResetPasswordResponse>('/auth/password/forgot', data);
