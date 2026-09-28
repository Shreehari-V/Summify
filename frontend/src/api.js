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
  getStatus: (id) => api.get(`/lectures/${id}/status`),
  getTranscript: (id) => api.get(`/lectures/${id}/transcript`),
  getSummary: (id) => api.get(`/lectures/${id}/summary`),
  getKeywords: (id) => api.get(`/lectures/${id}/keywords`),
  getFlashcards: (id) => api.get(`/lectures/${id}/flashcards`),
  generateFlashcards: (id, count) =>
    api.post(`/lectures/${id}/generate-flashcards`, { count }, { timeout: 90000 }),
  retryProcessing: (id) => api.post(`/lectures/${id}/retry`),
  updateFlashcards: (id, cards) => api.put(`/lectures/${id}/flashcards`, { cards }),
  shareFlashcards: (id) => api.post(`/lectures/${id}/share`),
  getSharedFlashcards: (shareId) => api.get(`/lectures/shared/${shareId}`),
  deleteLecture: (id) => api.delete(`/lectures/${id}`),
  downloadFileUrl: (id) => `${API_BASE_URL}/lectures/${id}/file`,
};

// Admin Endpoints (Module 4)
export const adminAPI = {
  getStats: () => api.get("/admin/stats"),
  getUsers: (params) => api.get("/admin/users", { params }),
  createUser: (data) => api.post("/admin/users", data),
  updateUser: (id, data) => api.patch(`/admin/users/${id}`, data),
  toggleUserStatus: (id) => api.post(`/admin/users/${id}/toggle-status`),
};

export const healthAPI = {
  check: () => api.get("/health"),
};

export default api;
