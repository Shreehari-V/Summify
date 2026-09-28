// frontend/src/api.js

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Request Interceptor: Attach JWT Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("summify_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Global 401s or Errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If token expired or invalid, clear local storage
      const hadToken = localStorage.getItem("summify_token");
      if (hadToken && !error.config.url.includes("/auth/login") && !error.config.url.includes("/auth/register")) {
        localStorage.removeItem("summify_token");
        localStorage.removeItem("summify_user");
        window.dispatchEvent(new Event("auth-changed"));
      }
    }
    return Promise.reject(error);
  }
);

// Auth Endpoints
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/me"),
};

// Lectures Endpoints
export const lecturesAPI = {
  upload: (formData, onUploadProgress) =>
    api.post("/lectures/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress,
    }),
  getMyLectures: () => api.get("/lectures/my"),
  getLecture: (id) => api.get(`/lectures/${id}`),
  deleteLecture: (id) => api.delete(`/lectures/${id}`),
  downloadFileUrl: (id) => `${API_BASE_URL}/lectures/${id}/file`,
};

export const healthAPI = {
  check: () => api.get("/health"),
};

export default api;
