import axios from "axios";
import { API_BASE_URL } from "@/lib/core/apiBaseUrl";
import {
  ensureAccessToken as ensureAccessTokenInternal,
  getRefreshDiagnostics,
  refreshAccessToken,
  setAuthFailureHandler as setAuthFailureHandlerInternal,
  triggerAuthFailure,
} from "@/lib/auth/refreshHandler";
import {
  getAccessToken,
  clearAccessToken,
} from "@/lib/auth/tokenStorage";
import { openAuthLoginTab } from "@/lib/crossAppTabNavigation";

const REFRESH_ENDPOINT = "/auth/refresh";
const DEFAULT_PRODUCT_KEY = "property";
const LOGOUT_IN_PROGRESS_KEY = "seaneb_logout_in_progress";

axios.defaults.headers.common["x-product-key"] = DEFAULT_PRODUCT_KEY;
axios.defaults.withCredentials = true;

const redirectToLogin = () => {
  if (typeof window === "undefined") return;
  try {
    const inLogout = String(window.sessionStorage.getItem(LOGOUT_IN_PROGRESS_KEY) || "").trim();
    if (inLogout === "1") return;
  } catch {
    // ignore storage errors
  }
  openAuthLoginTab();
};

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "x-product-key": DEFAULT_PRODUCT_KEY,
  },
});

export const setAuthFailureHandler = (handler) => {
  setAuthFailureHandlerInternal(handler);
};

export const ensureAccessToken = async () => ensureAccessTokenInternal();

api.interceptors.request.use((config) => {
  config.withCredentials = true;
  config.headers = config.headers || {};
  config.headers["x-product-key"] = DEFAULT_PRODUCT_KEY;

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error?.config || {};
    const status = error?.response?.status;
    const requestUrl = String(original?.url || "");
    const isRefreshRequest = requestUrl.includes(REFRESH_ENDPOINT);
    const skipRefresh = original?.skipRefresh === true || original?.skipAuthRefresh === true;

    if (status !== 401 || original._retry || isRefreshRequest || skipRefresh) {
      return Promise.reject(error);
    }
    original._retry = true;

    try {
      await refreshAccessToken();
      original.headers = original.headers || {};
      original.withCredentials = true;
      return api(original);
    } catch {
      clearAccessToken();
      await triggerAuthFailure();
      const shouldRedirect =
        original?.requireAuth === true && original?.skipAuthRedirect !== true;
      if (shouldRedirect) {
        redirectToLogin();
      }
      return Promise.reject(error);
    }
  }
);

export default api;
export const getInMemoryAccessToken = () => getAccessToken();
export const clearInMemoryAccessToken = () => clearAccessToken();
export { refreshAccessToken };
export const getAuthDiagnostics = () => getRefreshDiagnostics();

if (typeof globalThis !== "undefined" && !globalThis.__SEANEB_AUTH_SAFE_MODE_AXIOS_CLIENT_FE__) {
  globalThis.__SEANEB_AUTH_SAFE_MODE_AXIOS_CLIENT_FE__ = true;
  console.info("[AUTH SAFE MODE] using shared auth layer");
}

