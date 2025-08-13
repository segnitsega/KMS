import { useAuthStore } from '@/stores/auth-store';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    }, (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call refresh-token endpoint (uses HTTP-only cookie automatically)
        const { data } = await axios.post(`${api.defaults.baseURL}/auth/refresh-token`);
        const newAccessToken = data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Retry the original request
      } catch (refreshError) {
        // Refresh failed → force logout
        localStorage.removeItem("accessToken");
        useAuthStore.getState().setIsAuthenticated(false);
        window.location.href = '/login'; // Redirect to login
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;