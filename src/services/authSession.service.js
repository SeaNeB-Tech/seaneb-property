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

let authCheckPromise = null;
let lastUnauthorizedAt = 0;

const verifyProfileSession = async () => {
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
    Date.now() - lastUnauthorizedAt < UNAUTHORIZED_COOLDOWN_MS &&
    !hasTokenInMemory &&
    !hasCsrfHint
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

      // Attempt refresh only when auth hints exist.
      if (shouldAttemptRefresh) {
        await refreshAccessToken();
        const ok = await verifyProfileSession();
        if (ok) {
          lastUnauthorizedAt = 0;
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

  const listener = () => callback();
  window.addEventListener("focus", listener);
  window.addEventListener(COOKIE_CHANGE_EVENT, listener);
  window.addEventListener(AUTH_CHANGE_EVENT, listener);

  return () => {
    window.removeEventListener("focus", listener);
    window.removeEventListener(COOKIE_CHANGE_EVENT, listener);
    window.removeEventListener(AUTH_CHANGE_EVENT, listener);
  };
};
