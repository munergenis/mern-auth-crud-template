// --- Imports ---
import axios, { type CreateAxiosDefaults } from 'axios';
import { queryClient } from '@/providers/query/config/queryClient';
import { navigate } from '@/shared/utils/navigation';

// --- Axios Configuration ---
const options: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

// --- API Clients ---
// Main API client for general requests
const API = axios.create(options);
// Separate client for refresh token requests to avoid interceptor loops
const REFRESH_API_CLIENT = axios.create(options);

// --- Interceptors ---
// REFRESH_API_CLIENT: Only unwraps the response data
REFRESH_API_CLIENT.interceptors.response.use((response) => response.data);

// API: Handles normal responses and errors, including token refresh logic
API.interceptors.response.use(
  // On success, unwrap the response data
  (response) => response.data,
  // On error, handle authentication and refresh logic
  async (error) => {
    if (!error) {
      // Unknown error, reject with status 500
      return Promise.reject({ status: 500 });
    }

    const status: number = (error.response && error.response.status) ?? 500;
    const data: Record<string, string> =
      (error.response && error.response.data) ?? {};

    // If access token is invalid, try to refresh it
    if (status === 401 && data?.errorCode === 'InvalidAccessToken') {
      try {
        // Attempt to refresh the access token
        await REFRESH_API_CLIENT.get('/auth/refresh');
        // Retry the original request with the new token
        return REFRESH_API_CLIENT(error.config);
      } catch (refreshError) {
        // Refresh failed: clear cache and redirect to login (unless already there)
        console.error(refreshError);
        queryClient.clear();
        if (window.location.pathname !== '/login') {
          navigate('/login', {
            state: { from: window.location.pathname },
          });
        }
      }
    }

    // For all other errors, reject with status and error data
    return Promise.reject({ status, ...data });
  }
);

// --- Exported API Client ---
export default API;
