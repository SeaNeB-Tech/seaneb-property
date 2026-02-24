
import axios from "axios";
import { API_BASE_URL } from "@/lib/apiBaseUrl";
import { getAuthAppUrl } from "@/lib/authAppUrl";

const REFRESH_ENDPOINT = "/auth/refresh";
const DEFAULT_PRODUCT_KEY = "property";
const ACCESS_TOKEN_STORAGE_KEY = "access_token_property";

const readStoredAccessToken = () => {
  if (typeof window === "undefined") return "";
  try {
    return String(window.sessionStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) || "").trim();
  } catch {
    return "";
  }
};

let inMemoryAccessToken = readStoredAccessToken();
let refreshPromise = null;
let lastRefreshStatus = "idle";
let lastRefreshAt = 0;
let lastRefreshHttpStatus = 0;
let lastRefreshError = "";

const getCookie = (name) => {
  if (typeof document === "undefined") return "";
  const cookies = document.cookie ? document.cookie.split("; ") : [];
  for (const entry of cookies) {
    const idx = entry.indexOf("=");
    if (idx < 0) continue;
    const key = decodeURIComponent(entry.slice(0, idx));
    const value = decodeURIComponent(entry.slice(idx + 1));
    if (key === name) return value;
  }
  return "";
};

const getCsrfToken = () =>
  String(
    getCookie("csrf_token_property") || ""
  ).trim();

const getAccessToken = () => inMemoryAccessToken;

const getProductKey = () =>
  (getCookie("product_key") || DEFAULT_PRODUCT_KEY)
    .toLowerCase()
    .trim();

const setAccessToken = (token) => {
  const safeToken = String(token || "").trim();
  inMemoryAccessToken = safeToken;
  if (typeof window === "undefined") return;
  try {
    if (safeToken) {
      window.sessionStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, safeToken);
    } else {
      window.sessionStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    }
  } catch {
    // Ignore storage errors and keep in-memory token.
  }
};

const redirectToLogin = () => {
  if (typeof window === "undefined") return;
  const returnTo = encodeURIComponent(window.location.href);
  window.location.href = getAuthAppUrl(`/auth/login?returnTo=${returnTo}`);
};

const readToken = (res) => {
  const data = res?.data || {};
  return (
    data?.access_token ||
    data?.accessToken ||
    data?.data?.access_token ||
    data?.data?.accessToken ||
    data?.data?.token?.access_token ||
    data?.data?.token?.accessToken ||
    data?.result?.access_token ||
    data?.result?.accessToken ||
    data?.token ||
    data?.jwt ||
    ""
  );
};

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const performRefreshAccessToken = async () => {
  const productKey = getProductKey();
  const csrf = getCsrfToken();
  const existingAccessToken = getAccessToken();

  let lastError = null;
  const headers = {
    "x-product-key": productKey,
  };
  if (csrf) headers["x-csrf-token"] = csrf;
  if (existingAccessToken) headers.Authorization = `Bearer ${existingAccessToken}`;

  try {
    lastRefreshStatus = "pending";
    lastRefreshAt = Date.now();
    lastRefreshHttpStatus = 0;
    lastRefreshError = "";
    const res = await refreshClient.post(
      REFRESH_ENDPOINT,
      { product_key: productKey },
      {
        headers,
        // Ensure browser sends refresh token cookie with refresh request.
        withCredentials: true,
        credentials: "include",
      }
    );

    const token = readToken(res);
    if (!token) throw new Error("No access token from refresh");
    setAccessToken(token);
    lastRefreshStatus = "success";
    lastRefreshAt = Date.now();
    lastRefreshHttpStatus = Number(res?.status || 0);
    lastRefreshError = "";
    return true;
  } catch (err) {
    lastError = err;
    lastRefreshStatus = "failed";
    lastRefreshAt = Date.now();
    lastRefreshHttpStatus = Number(err?.response?.status || 0);
    lastRefreshError = String(
      err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        err?.message ||
        "Refresh failed"
    );
  }

  throw lastError || new Error("Refresh failed");
};

export const ensureAccessToken = async () => {
  return Boolean(getAccessToken());
};

export const hasCsrfCookie = () => Boolean(getCsrfToken());

export const refreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = performRefreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }
  await refreshPromise;
  return true;
};

api.interceptors.request.use((config) => {
  config.withCredentials = true;
  config.headers = config.headers || {};

  const csrf = getCsrfToken();
  const token = getAccessToken();
  const productKey = getProductKey();

  if (csrf) config.headers["x-csrf-token"] = csrf;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers["x-product-key"] = productKey;

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error?.config || {};
    const status = error?.response?.status;
    const isRefreshRequest = String(original?.url || "").includes(REFRESH_ENDPOINT);
    const hasAccessTokenHint = Boolean(getAccessToken());
    const hasCsrfHint = Boolean(getCsrfToken());
    const shouldAttemptRefresh =
      (original?.requireAuth === true || hasAccessTokenHint || hasCsrfHint);

    if (status !== 401 || original._retry || isRefreshRequest) {
      return Promise.reject(error);
    }
    if (!shouldAttemptRefresh) {
      return Promise.reject(error);
    }

    original._retry = true;

    try {
      await refreshAccessToken();
      return api(original);
    } catch {
      setAccessToken("");
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
export const clearInMemoryAccessToken = () => setAccessToken("");
export const getAuthDiagnostics = () => ({
  hasAccessTokenInMemory: Boolean(getAccessToken()),
  hasCsrfCookie: Boolean(getCsrfToken()),
  refreshInFlight: Boolean(refreshPromise),
  lastRefreshStatus,
  lastRefreshAt,
  lastRefreshHttpStatus,
  lastRefreshError,
});
