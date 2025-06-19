import API from '@/api/apiClient';
import type {
  ForgotPasswordData,
  ForgotPasswordResponse,
} from '../../interfaces/Auth';

export const sendPasswordResetEmail = async (data: ForgotPasswordData) =>
  API.post<never, ForgotPasswordResponse>('/auth/password/forgot', data);
