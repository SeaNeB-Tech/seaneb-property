import { removeCookie } from "./cookie";
import api from "@/services/api";
import {
  clearInMemoryAccessToken,
  getInMemoryAccessToken,
  hasCsrfCookie,
} from "@/lib/api/client";
import { refreshAccessToken } from "@/services/api";

const AUTH_CHANGE_EVENT = "seaneb:auth-changed";
const COOKIE_CHANGE_EVENT = "property:cookie-change";
const UNAUTHORIZED_COOLDOWN_MS = 10_000;
const REFRESH_RETRY_COOLDOWN_MS = 15_000;
const AUTH_RELATED_COOKIE_KEYS = new Set([
  "csrf_token_property",
  "refresh_token_property",
  "access_token_property",
  "post_otp_verified",
  "business_registered",
]);

let authCheckPromise = null;
let lastUnauthorizedAt = 0;
let lastRefreshFailureAt = 0;

const verifyProfileSession = async () => {
  const res = await api.get("/profile/me", {
    withCredentials: true,
    skipAuthRedirect: true,
    requireAuth: false,
    skipRefresh: true,
  });
  return Number(res?.status || 0) === 200;
};

const verifyProfileSessionFallback = async () => {
  const res = await api.get("/profile/me", {
    withCredentials: true,
    skipAuthRedirect: true,
    requireAuth: false,
    skipRefresh: true,
  });
  return Number(res?.status || 0) === 200;
};

export const checkAuthenticatedSession = async ({ strict = false } = {}) => {
  const hasTokenInMemory = Boolean(getInMemoryAccessToken());
  const hasCsrfHint = hasCsrfCookie();

  // Public pages should avoid repeated network bursts after recent unauthorized response.
  // But if auth hints exist (fresh login/restore), do not suppress verification.
  if (
    !strict &&
    Date.now() - lastUnauthorizedAt < UNAUTHORIZED_COOLDOWN_MS
  ) {
    return false;
  }

  if (
    !strict &&
    !hasTokenInMemory &&
    Date.now() - lastRefreshFailureAt < REFRESH_RETRY_COOLDOWN_MS
  ) {
    return false;
  }

  if (authCheckPromise) return authCheckPromise;

  authCheckPromise = (async () => {
    try {
      const shouldAttemptRefresh = strict
        ? (hasTokenInMemory || hasCsrfHint)
        : (hasTokenInMemory || hasCsrfHint);

      // If token exists in memory, verify session first.
      if (hasTokenInMemory) {
        const ok = await verifyProfileSession();
        if (ok) {
          lastUnauthorizedAt = 0;
          return true;
        }
      }

      // If backend can validate session via profile/me, treat user as authenticated
      // even when access token is not yet restored in memory.
      try {
        const profileFallbackOk = await verifyProfileSessionFallback();
        if (profileFallbackOk) {
          lastUnauthorizedAt = 0;
          lastRefreshFailureAt = 0;
          return true;
        }
      } catch {
        // Continue to refresh flow.
      }

      // Attempt refresh only when auth hints exist.
      if (shouldAttemptRefresh) {
        try {
          await refreshAccessToken();
          lastRefreshFailureAt = 0;
        } catch (refreshError) {
          lastRefreshFailureAt = Date.now();
          throw refreshError;
        }
        const ok = await verifyProfileSession();
        if (ok) {
          lastUnauthorizedAt = 0;
          lastRefreshFailureAt = 0;
        }
        return ok;
      }

      // Public route with no auth hints: treat as logged out without refresh attempts.
      return false;
    } catch (err) {
      const status = Number(err?.response?.status || 0);
      if (status === 401 || status === 403) {
        lastUnauthorizedAt = Date.now();
      }
      return false;
    }
  })().finally(() => {
    authCheckPromise = null;
  });

  return authCheckPromise;
};

export const clearAuthSessionCookies = () => {
  clearInMemoryAccessToken();
  removeCookie("csrf_token_property");
  notifyAuthChanged();
};

export const logoutAndClearAuthSession = async () => {
  try {
    await api.post("/auth/logout", {}, { withCredentials: true, skipAuthRedirect: true });
  } catch {
    // Always clear local auth state even when server logout fails.
  } finally {
    clearAuthSessionCookies();
  }
};

export const notifyAuthChanged = () => {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  } catch {
    // Ignore event dispatch issues.
  }
};

export const subscribeAuthState = (callback) => {
  if (typeof window === "undefined") return () => {};

  const onFocus = () => callback();
  const onAuthChanged = () => callback();
  const onCookieChange = (event) => {
    const changedKey = String(event?.detail?.name || "").trim().toLowerCase();
    if (changedKey && !AUTH_RELATED_COOKIE_KEYS.has(changedKey)) return;
    callback();
  };

  window.addEventListener("focus", onFocus);
  window.addEventListener(COOKIE_CHANGE_EVENT, onCookieChange);
  window.addEventListener(AUTH_CHANGE_EVENT, onAuthChanged);

  return () => {
    window.removeEventListener("focus", onFocus);
    window.removeEventListener(COOKIE_CHANGE_EVENT, onCookieChange);
    window.removeEventListener(AUTH_CHANGE_EVENT, onAuthChanged);
  };
};
