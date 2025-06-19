import API from '@/api/apiClient';
import type { VerifyEmailResponse } from '../../interfaces/Auth';

export const verifyEmail = async (verificationCode: string) =>
  API.get<never, VerifyEmailResponse>(`/auth/email/verify/${verificationCode}`);
