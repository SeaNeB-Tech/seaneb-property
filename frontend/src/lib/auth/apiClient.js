import { API_BASE_URL } from "@/lib/core/apiBaseUrl";
import {
  refreshAccessToken,
  setAuthFailureHandler,
  triggerAuthFailure,
  setAccessToken as setInMemoryAccessToken,
} from "@/lib/auth/refreshHandler";
import {
  clearAccessToken,
} from "@/lib/auth/tokenStorage";
import {
  attachAuthorizationHeader,
  requestWithAuthSafeRetry,
} from "@/lib/auth/apiClientSafe";

const normalizeBaseUrl = (value) => String(value || "").trim().replace(/\/+$/, "");
const RESOLVED_API_BASE_URL = normalizeBaseUrl(API_BASE_URL || "");
const DEFAULT_PRODUCT_KEY = String(process.env.NEXT_PUBLIC_PRODUCT_KEY || "property").trim() || "property";
const LOGOUT_PRODUCT_KEY = DEFAULT_PRODUCT_KEY;

const LOGIN_ENDPOINT = "/auth/login";
const REFRESH_ENDPOINT = "/auth/refresh";
const LOGOUT_ENDPOINT = "/auth/logout";
const ME_ENDPOINT = "/auth/me";

const toAbsoluteUrl = (path) => {
  const target = String(path || "").trim();
  if (!target) throw new Error("Missing request path");
  if (/^https?:\/\//i.test(target)) throw new Error("Absolute auth URLs are not allowed");
  if (!target.startsWith("/")) throw new Error(`Path must start with '/': ${target}`);
  return RESOLVED_API_BASE_URL ? `${RESOLVED_API_BASE_URL}${target}` : target;
};

const buildHeaders = ({ headers }) => {
  const next = attachAuthorizationHeader(headers);
  if (!next.has("Content-Type")) {
    next.set("Content-Type", "application/json");
  }

  next.set("x-product-key", DEFAULT_PRODUCT_KEY);

  return next;
};

const normalizeProfilePayload = (profilePayload) =>
  profilePayload?.data || profilePayload?.user || profilePayload || null;

export const refreshSession = async () => {
  try {
    await refreshAccessToken();
    return true;
  } catch {
    clearAccessToken();
    return false;
  }
};

export const refreshSessionAndGetProfile = async () => {
  const refreshed = await refreshSession();
  if (!refreshed) return null;
  const profile = await authApi.me({ retryOn401: false });
  return normalizeProfilePayload(profile);
};

export const apiRequest = async (path, options = {}, control = {}) => {
  const method = String(options.method || "GET").toUpperCase();
  const isRefreshRequest = String(path || "") === REFRESH_ENDPOINT;
  let hasRetried401 = control._retry === true;
  const retryOn401 = control.retryOn401 === true && !hasRetried401;

  const makeRequest = async () => {
    const headers = buildHeaders({ headers: options.headers });
    const response = await fetch(toAbsoluteUrl(path), {
      ...options,
      method,
      headers,
      credentials: "include",
      cache: options.cache || "no-store",
    });

    if (response.ok) {
      // If backend included an Authorization header with a bearer token,
      // hydrate it into our in-memory access token so subsequent requests
      // (and post-login redirects) work without an extra refresh.
      try {
        const authHdr = String(response.headers.get("authorization") || response.headers.get("Authorization") || "").trim();
        if (authHdr) {
          const token = /^Bearer\s+/i.test(authHdr) ? authHdr.replace(/^Bearer\s+/i, "").trim() : authHdr;
          if (token) {
            try {
              setInMemoryAccessToken(token);
            } catch (e) {
              // ignore token set failures
            }
          }
        }
      } catch (e) {
        // ignore header parsing errors
      }

      const cloned = response.clone();
      try {
        await cloned.json();
      } catch {
        // ignore non-json
      }
    }

    return response;
  };

  const response = await requestWithAuthSafeRetry({
    makeRequest,
    retryOn401,
    isRefreshRequest,
    refresh: refreshAccessToken,
    markRetried: () => {
      hasRetried401 = true;
    },
  });

  if (response.status !== 401 || !retryOn401 || isRefreshRequest) {
    return response;
  }

  const retryResponse = response;
  if (retryResponse.status === 401) {
    await triggerAuthFailure();
  }
  return retryResponse;
};

export const apiJson = async (path, options = {}, control = {}) => {
  const response = await apiRequest(path, options, control);
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const error = new Error(payload?.message || `HTTP ${response.status}`);
    error.status = response.status;
    error.data = payload;
    throw error;
  }

  return payload;
};

export const authApi = {
  login: (credentials) =>
    apiJson(
      LOGIN_ENDPOINT,
      {
        method: "POST",
        body: JSON.stringify({ ...(credentials || {}), product_key: DEFAULT_PRODUCT_KEY }),
      },
      { retryOn401: false }
    ),
  me: (control = {}) => apiJson(ME_ENDPOINT, { method: "GET" }, control),
  exchangeSso: async (bridgeToken) => {
    const response = await fetch("/api/auth/sso/exchange", {
      method: "POST",
      credentials: "include",
      cache: "no-store",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        bridge_token: String(bridgeToken || "").trim(),
        product_key: DEFAULT_PRODUCT_KEY,
      }),
    });

    let payload = {};
    try {
      payload = await response.json();
    } catch {
      payload = {};
    }

    if (!response.ok) {
      const error = new Error(
        payload?.error?.message || payload?.message || `HTTP ${response.status}`
      );
      error.status = Number(response.status || 0);
      error.data = payload;
      throw error;
    }

    return payload;
  },
  logout: async () => {
    const result = await apiJson(
      LOGOUT_ENDPOINT,
      {
        method: "POST",
        body: JSON.stringify({ product_key: LOGOUT_PRODUCT_KEY }),
      },
      { retryOn401: false }
    );
    clearAccessToken();
    return result;
  },
};

export { setAuthFailureHandler };

if (typeof globalThis !== "undefined" && !globalThis.__SEANEB_AUTH_SAFE_MODE_API_CLIENT_FE__) {
  globalThis.__SEANEB_AUTH_SAFE_MODE_API_CLIENT_FE__ = true;
  console.info("[AUTH SAFE MODE] using shared auth layer");
}

