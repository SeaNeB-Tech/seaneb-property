// src/main/client.js
import axios from "axios";
import { API_BASE_URL } from "@/lib/core/apiBaseUrl";
import {
  getAccessToken,
  clearAccessToken,
} from "@/lib/auth/tokenStorage";

const DEFAULT_PRODUCT_KEY = "property";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "x-product-key": DEFAULT_PRODUCT_KEY,
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  config.withCredentials = true;
  config.headers = config.headers || {};
  config.headers["x-product-key"] = DEFAULT_PRODUCT_KEY;
  
  // Add auth token if available
  const token = getAccessToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  
  return config;
});

// Response interceptor for token refresh
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error?.config || {};
    const status = error?.response?.status;
    
    // Only handle 401 errors once
    if (status !== 401 || original._retry) {
      return Promise.reject(error);
    }
    
    original._retry = true;
    
    try {
      // Call your actual refresh endpoint
      const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "x-product-key": DEFAULT_PRODUCT_KEY,
        },
        body: JSON.stringify({ product_key: DEFAULT_PRODUCT_KEY }),
      });
      
      if (!refreshResponse.ok) {
        throw new Error("Refresh failed");
      }
      
      const data = await refreshResponse.json();
      
      // If your API returns a new token, store it
      if (data?.access_token) {
        // You need to implement setAccessToken
        // setAccessToken(data.access_token);
      }
      
      // Retry original request
      return api(original);
    } catch (refreshError) {
      clearAccessToken();
      // Redirect to login if needed
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
      return Promise.reject(error);
    }
  }
);

export default api;
export const getInMemoryAccessToken = () => getAccessToken();
export const clearInMemoryAccessToken = () => clearAccessToken();