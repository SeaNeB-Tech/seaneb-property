import axios from "axios";
import { getCookie, removeCookie, setCookie } from "./cookie";

const API_BASE = "https://dev.seaneb.com/api/v1";
const REFRESH_PATH = "/auth/refresh";
const PRODUCT_KEY_FALLBACK = "property";

const getAccessToken = () => String(getCookie("access_token") || "").trim();
const getRefreshToken = () => String(getCookie("refresh_token") || "").trim();
const getProductKey = () => String(getCookie("product_key") || PRODUCT_KEY_FALLBACK).trim();

const getCsrfToken = () =>
  String(
    getCookie("csrf_token") ||
      getCookie("csrf-token") ||
      getCookie("XSRF-TOKEN") ||
      getCookie("xsrf-token") ||
      getCookie("_csrf") ||
      ""
  ).trim();

const setAccessToken = (token) => {
  if (!token) return;
  setCookie("access_token", token, { maxAge: 15 * 60, path: "/" });
};

const setCsrfToken = (token) => {
  if (!token) return;
  const options = { maxAge: 6 * 60 * 60, path: "/" };
  setCookie("csrf_token", token, options);
  setCookie("csrf-token", token, options);
  setCookie("XSRF-TOKEN", token, options);
};

const clearSessionCookies = () => {
  [
    "access_token",
    "refresh_token",
    "csrf_token",
    "csrf-token",
    "XSRF-TOKEN",
    "xsrf-token",
    "_csrf",
  ].forEach((key) => removeCookie(key, { path: "/" }));
};

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const headers = config.headers || {};
  const accessToken = getAccessToken();
  const csrfToken = getCsrfToken();

  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  if (csrfToken) headers["x-csrf-token"] = csrfToken;

  config.headers = headers;
  return config;
});

let refreshPromise = null;

const refreshAccessToken = async () => {
  const csrfToken = getCsrfToken();
  if (!csrfToken) {
    throw new Error("Missing CSRF token for refresh");
  }

  const payload = {
    product_key: getProductKey() || PRODUCT_KEY_FALLBACK,
  };

  const refreshToken = getRefreshToken();
  if (refreshToken) payload.refresh_token = refreshToken;

  const response = await axios.post(`${API_BASE}${REFRESH_PATH}`, payload, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": csrfToken,
    },
  });

  const newAccessToken = String(response?.data?.access_token || "").trim();
  if (!newAccessToken) {
    throw new Error("Refresh succeeded without access token");
  }

  setAccessToken(newAccessToken);

  const newCsrfToken =
    response?.data?.csrf_token ||
    response?.headers?.["x-csrf-token"] ||
    response?.headers?.["csrf-token"];

  if (newCsrfToken) setCsrfToken(String(newCsrfToken));

  return newAccessToken;
};

api.interceptors.response.use(
  (res) => {
    const csrfFromResponse =
      res?.headers?.["x-csrf-token"] || res?.headers?.["csrf-token"] || res?.data?.csrf_token;
    if (csrfFromResponse) setCsrfToken(String(csrfFromResponse));
    return res;
  },
  async (error) => {
    const originalRequest = error?.config || {};
    const status = Number(error?.response?.status || 0);
    const requestUrl = String(originalRequest?.url || "");

    if (status !== 401 || originalRequest._retry || requestUrl.includes(REFRESH_PATH)) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      const newAccessToken = await refreshPromise;
      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      clearSessionCookies();
      return Promise.reject(refreshError);
    }
  }
);

export default api;
