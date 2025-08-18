import { useAuthStore } from '@/stores/auth-store';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true
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
  (response) => {
    console.log("response came successfully")
    return response
  },
  async (error) => {
    console.log("error on response", error)
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        console.log("trying to refresh token")
        const { data } = await api.get(`${api.defaults.baseURL}/auth/refresh-token`)
        console.log("data from refreshing try:", data)
        const newAccessToken = data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); 
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        useAuthStore.getState().setIsAuthenticated(false);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;