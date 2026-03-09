import { API_BASE_URL } from "@/lib/core/apiBaseUrl";
import { ssoDebugLog } from "@/lib/observability/ssoDebug";
import { createRefreshLock } from "@/lib/auth/refreshLock";

const ENV_PRODUCT_KEY = String(process.env.NEXT_PUBLIC_PRODUCT_KEY || "").trim();
const DEFAULT_PRODUCT_KEY = ENV_PRODUCT_KEY || "property";
const REFRESH_ENDPOINT = "/auth/refresh";
const CSRF_COOKIE_CANDIDATES = ["csrf_token_property"];
const TRANSIENT_STATUSES = new Set([429, 500, 502, 503, 504, 522, 524]);

let refreshPromise = null;
let lastRefreshStatus = "idle";
let lastRefreshAt = 0;
let lastRefreshHttpStatus = 0;
let lastRefreshError = "";
let authFailureHandler = null;
let authFailurePromise = null;
let inMemoryAccessToken = "";

const isUsableAccessToken = (value) => {
  const token = String(value || "").trim();
  if (!token) return false;
  const lowered = token.toLowerCase();
  return !["cookie_session", "null", "undefined", "invalid", "sentinel"].includes(lowered);
};

const normalizeBaseUrl = (value) => String(value || "").trim().replace(/\/+$/, "");
const RESOLVED_API_BASE_URL = normalizeBaseUrl(API_BASE_URL || "");

const toAbsoluteUrl = (path) => {
  const target = String(path || "").trim();
  if (!target) throw new Error("Missing request path");
  if (/^https?:\/\//i.test(target)) throw new Error("Absolute auth URLs are not allowed");
  if (!target.startsWith("/")) throw new Error(`Path must start with '/': ${target}`);
  return RESOLVED_API_BASE_URL ? `${RESOLVED_API_BASE_URL}${target}` : target;
};

const readCookie = (name) => {
  if (typeof document === "undefined") return "";
  const cookies = document.cookie ? document.cookie.split("; ") : [];
  for (const cookie of cookies) {
    const idx = cookie.indexOf("=");
    if (idx < 0) continue;
    const key = decodeURIComponent(cookie.slice(0, idx));
    if (key !== name) continue;
    return decodeURIComponent(cookie.slice(idx + 1));
  }
  return "";
};

const getCsrfToken = () => {
  for (const name of CSRF_COOKIE_CANDIDATES) {
    const value = String(readCookie(name) || "").trim();
    if (value) return value;
  }
  return "";
};

const readAccessTokenFromPayload = (payload = {}, headers = null) => {
  const data = payload?.data || {};
  const tokenObj = data?.token || payload?.token || {};
  const responseAuthHeader = String(
    headers?.get("authorization") ||
      headers?.get("Authorization") ||
      ""
  ).trim();
  const responseHeaderToken = /^bearer\s+/i.test(responseAuthHeader)
    ? responseAuthHeader.replace(/^bearer\s+/i, "").trim()
    : responseAuthHeader;
  const rawHeader = String(
    payload?.authorization ||
      payload?.Authorization ||
      data?.authorization ||
      data?.Authorization ||
      ""
  ).trim();
  const headerToken = /^bearer\s+/i.test(rawHeader)
    ? rawHeader.replace(/^bearer\s+/i, "").trim()
    : rawHeader;

  return String(
    payload?.accessToken ||
      payload?.access_token ||
      data?.accessToken ||
      data?.access_token ||
      tokenObj?.accessToken ||
      tokenObj?.access_token ||
      tokenObj?.token ||
      tokenObj?.jwt ||
      payload?.jwt ||
      data?.jwt ||
      headerToken ||
      responseHeaderToken ||
      ""
  ).trim();
};

const buildRefreshError = (message, status, payload = null) => {
  const error = new Error(String(message || "Refresh failed"));
  error.status = Number(status || 0);
  error.data = payload;
  return error;
};

const parseRefreshResponse = async (response) => {
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }
  return payload;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const doRefresh = async () => {
  lastRefreshStatus = "pending";
  lastRefreshAt = Date.now();
  lastRefreshHttpStatus = 0;
  lastRefreshError = "";
  ssoDebugLog("refresh.attempt", { route: "/auth/refresh" });

  const csrfToken = getCsrfToken();
  const doAttempt = async ({ includeCsrf = true } = {}) => {
    const headers = new Headers({
      "Content-Type": "application/json",
      "x-product-key": DEFAULT_PRODUCT_KEY,
    });
    if (includeCsrf && csrfToken) {
      headers.set("x-csrf-token", csrfToken);
    }

    const response = await fetch(toAbsoluteUrl(REFRESH_ENDPOINT), {
      method: "POST",
      headers,
      credentials: "include",
      cache: "no-store",
      body: JSON.stringify({ product_key: DEFAULT_PRODUCT_KEY }),
    });

    const payload = await parseRefreshResponse(response);
    return { response, payload };
  };

  let attempt = null;
  try {
    attempt = await doAttempt({ includeCsrf: true });
  } catch (networkError) {
    lastRefreshStatus = "failed";
    lastRefreshAt = Date.now();
    lastRefreshHttpStatus = 0;
    lastRefreshError = String(networkError?.message || "Refresh request failed");
    ssoDebugLog("refresh.failure", { route: "/auth/refresh", status: 0 });
    throw buildRefreshError(lastRefreshError, 0, null);
  }

  let { response, payload } = attempt;

  if ([401, 403].includes(Number(response.status || 0)) && csrfToken) {
    try {
      const retryWithoutCsrf = await doAttempt({ includeCsrf: false });
      response = retryWithoutCsrf.response;
      payload = retryWithoutCsrf.payload;
    } catch {
      // Keep the original auth error response.
    }
  }

  if (TRANSIENT_STATUSES.has(Number(response.status || 0))) {
    await sleep(200);
    try {
      const transientRetry = await doAttempt({ includeCsrf: false });
      response = transientRetry.response;
      payload = transientRetry.payload;
    } catch {
      // Keep the original transient error response.
    }
  }

  if (!response.ok) {
    const status = Number(response.status || 0);
    if (status === 401 || status === 403) {
      clearAccessToken();
    }
    lastRefreshStatus = "failed";
    lastRefreshAt = Date.now();
    lastRefreshHttpStatus = status;
    lastRefreshError = String(payload?.error?.message || payload?.message || "Refresh failed");
    ssoDebugLog("refresh.failure", { route: "/auth/refresh", status });
    throw buildRefreshError(lastRefreshError, response.status, payload);
  }

  const nextToken = readAccessTokenFromPayload(payload, response.headers);
  if (!nextToken) {
    // Cookie-session mode: backend refreshed session but does not expose bearer token.
    setAccessToken("");
    lastRefreshStatus = "success";
    lastRefreshAt = Date.now();
    lastRefreshHttpStatus = Number(response.status || 200);
    lastRefreshError = "";
    ssoDebugLog("refresh.success", {
      route: "/auth/refresh",
      status: Number(response.status || 200),
      hasAccessToken: false,
    });
    return "COOKIE_SESSION";
  }

  // Header-based auth flow: keep the token only in memory.
  setAccessToken(nextToken);
  lastRefreshStatus = "success";
  lastRefreshAt = Date.now();
  lastRefreshHttpStatus = Number(response.status || 200);
  lastRefreshError = "";
  ssoDebugLog("refresh.success", {
    route: "/auth/refresh",
    status: Number(response.status || 200),
    hasAccessToken: true,
  });
  return nextToken;
};

const _refreshLock = createRefreshLock(async () => doRefresh());

export const getAccessToken = () => String(inMemoryAccessToken || "").trim();

export const setAccessToken = (token) => {
  const safeToken = isUsableAccessToken(token) ? String(token || "").trim() : "";
  inMemoryAccessToken = safeToken;
  return safeToken;
};

export const clearAccessToken = () => {
  inMemoryAccessToken = "";
};

export const refreshAccessToken = async () => {
  refreshPromise = _refreshLock.run();
  try {
    return await refreshPromise;
  } finally {
    if (!_refreshLock.isRunning()) {
      refreshPromise = null;
    }
  }
};

export const ensureAccessToken = async () => {
  if (getAccessToken()) return true;
  try {
    await refreshAccessToken();
    return true;
  } catch {
    return false;
  }
};

export const setAuthFailureHandler = (handler) => {
  authFailureHandler = typeof handler === "function" ? handler : null;
};

export const triggerAuthFailure = async () => {
  if (typeof authFailureHandler !== "function") return;
  if (!authFailurePromise) {
    authFailurePromise = Promise.resolve()
      .then(() => authFailureHandler())
      .catch(() => {})
      .finally(() => {
        authFailurePromise = null;
      });
  }
  return authFailurePromise;
};

export const getRefreshDiagnostics = () => ({
  hasAccessTokenInMemory: Boolean(getAccessToken()),
  refreshInFlight: Boolean(refreshPromise),
  lastRefreshStatus,
  lastRefreshAt,
  lastRefreshHttpStatus,
  lastRefreshError,
});

