// RESPONSES
export interface LoginResponse {
  message: string;
}
export interface RegisterResponse {
  email: string;
}
export interface ResetPasswordResponse {
  message: string;
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
export interface ResetPasswordData {
  email: string;
}
