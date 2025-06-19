// RESPONSES
export interface LoginResponse {
  message: string;
}
export interface RegisterResponse {
  email: string;
}
export interface ForgotPasswordResponse {
  message: string;
}
export interface ResetPasswordResponse {
  message: string;
}
export interface LogoutResponse {
  message: string;
}
export interface User {
  createdAt: Date;
  email: string;
  updatedAt: Date;
  verified: boolean;
  _id: string;
}

// REQUESTS
export interface LoginUser {
  email: string;
  password: string;
}
export interface RegisterUser {
  email: string;
  password: string;
  confirmPassword: string;
}
export interface ForgotPasswordData {
  email: string;
}
export interface ResetPasswordData {
  password: string;
  verificationCode: string;
}
