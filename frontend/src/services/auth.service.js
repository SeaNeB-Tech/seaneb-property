import { authApi, refreshSession } from "@/lib/auth/apiClient";
import { clearAccessToken } from "@/lib/auth/refreshHandler";
import { getAccessToken } from "@/lib/auth/tokenStorage";
import { getCookie, removeCookie } from "@/lib/core/cookies";
import { ssoDebugLog } from "@/lib/observability/ssoDebug";
import { getAuthUserStateSnapshot } from "@/services/user.service";

const AUTH_CHANGE_EVENT = "seaneb:auth-changed";
const LOGOUT_IN_PROGRESS_KEY = "seaneb_logout_in_progress";
export const AUTH_LOGOUT_STORAGE_KEY = "seaneb:auth-logout";

const CLIENT_SESSION_KEYS = [
  "post_otp_verified",
  "profile_completed",
  "business_registered",
  "business_id",
  "branch_id",
  "business_name",
  "business_type",
  "business_location",
  "verified_email",
  "user_email",
  "seaneb_id",
  "otp_cc",
  "otp_mobile",
  "otp_in_progress",
  "mobile_otp_until",
  "email_otp_until",
  "auth_return_to",
];

const removeStorageKey = (storage, key) => {
  try {
    storage.removeItem(key);
  } catch {
    // ignore storage errors
  }
};

const hasAuthHint = () => {
  const token = String(getAccessToken() || "").trim();
  if (token) return true;
  if (typeof document === "undefined") return false;
  return Boolean(
    String(getCookie("csrf_token_property") || "").trim() ||
      String(getCookie("refresh_token_property") || "").trim()
  );
};

export const clearClientSessionArtifacts = () => {
  clearAccessToken();

  for (const key of CLIENT_SESSION_KEYS) {
    removeCookie(key, { path: "/" });
  }

  if (typeof window === "undefined") return;

  const storageKeys = [
    ...CLIENT_SESSION_KEYS,
    ...CLIENT_SESSION_KEYS.map((key) => `property:volatile:${key}`),
  ];
  for (const key of storageKeys) {
    removeStorageKey(window.localStorage, key);
    removeStorageKey(window.sessionStorage, key);
  }
};

export const checkAuthenticatedSession = async () => {
  if (!hasAuthHint()) {
    return false;
  }

  try {
    await authApi.me({ retryOn401: false });
    notifyAuthChanged();
    return true;
  } catch (error) {
    const status = Number(error?.status || 0);
    if (status !== 401 && status !== 403) {
      return false;
    }
  }

  try {
    const refreshed = await refreshSession();
    if (!refreshed) return false;
  } catch {
    return false;
  }

  try {
    await authApi.me({ retryOn401: false });
    notifyAuthChanged();
    return true;
  } catch {
    return false;
  }
};

export const guardDashboardNavigation = async ({
  onAuthenticated,
  onUnauthenticated,
} = {}) => {
  const validationState = await validateSessionForDashboardNavigation();
  const isAuthenticated = validationState === true;
  if (isAuthenticated) {
    if (typeof onAuthenticated === "function") {
      await onAuthenticated();
    }
    return true;
  }

  if (typeof onUnauthenticated === "function") {
    await onUnauthenticated();
  }
  return false;
};

export const validateSessionForDashboardNavigation = async () => {
  const snapshot = getAuthUserStateSnapshot();
  const isLocallyAuthenticated = snapshot?.status === "authenticated";

  // Always validate with backend before dashboard navigation.
  // Local auth snapshot can be stale across tabs after registration/login/logout.
  const hasServerSession = await checkAuthenticatedSession();
  if (!hasServerSession && isLocallyAuthenticated) {
    notifyAuthChanged();
  }
  return hasServerSession;
};

export const clearAuthSessionCookies = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

const forceExpireCookie = (name, domain = "") => {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const base = `${encodeURIComponent(name)}=; path=/; max-age=0; SameSite=None`;
  document.cookie = `${base}${secure}`;
  if (domain) {
    document.cookie = `${base}; domain=${domain}${secure}`;
  }
};

const forceDeleteAuthCookies = () => {
  if (typeof window === "undefined") return;
  const configuredDomain = String(process.env.NEXT_PUBLIC_COOKIE_DOMAIN || "").trim();
  const host = String(window.location.hostname || "").toLowerCase();
  const maybeParentDomain = host.includes(".") ? `.${host.split(".").slice(-2).join(".")}` : "";
  const domains = Array.from(new Set(["", configuredDomain, maybeParentDomain].filter(Boolean)));
  const cookieNames = ["access_token", "refresh_token_property", "csrf_token_property"];

  for (const name of cookieNames) {
    for (const domain of domains) {
      forceExpireCookie(name, domain);
    }
  }
};

export const logoutAndClearAuthSession = async () => {
  ssoDebugLog("logout.initiated", { route: "/api/auth/logout" });
  if (typeof window !== "undefined") {
    try {
      window.sessionStorage.setItem(LOGOUT_IN_PROGRESS_KEY, "1");
    } catch {
      // ignore storage errors
    }
  }
  let canClearClientState = false;
  try {
    await authApi.logout();
    canClearClientState = true;
  } catch (error) {
    const status = Number(error?.status || 0);
    if (status === 401 || status === 403) {
      canClearClientState = true;
    } else {
      throw error;
    }
  } finally {
    if (canClearClientState) {
      forceDeleteAuthCookies();
      clearClientSessionArtifacts();
      clearAuthSessionCookies();
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(AUTH_LOGOUT_STORAGE_KEY, String(Date.now()));
        } catch {
          // ignore storage errors
        }
      }
      ssoDebugLog("logout.completed", { route: "/api/auth/logout" });
    }
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.removeItem(LOGOUT_IN_PROGRESS_KEY);
      } catch {
        // ignore storage errors
      }
    }
  }
  return canClearClientState;
};

export const notifyAuthChanged = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

export const subscribeAuthState = (callback) => {
  if (typeof window === "undefined") return () => {};
  const listener = () => callback();
  const onVisibility = () => {
    if (document.visibilityState === "visible") {
      callback();
    }
  };

  window.addEventListener(AUTH_CHANGE_EVENT, listener);
  window.addEventListener("focus", listener);
  window.addEventListener("visibilitychange", onVisibility);

  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, listener);
    window.removeEventListener("focus", listener);
    window.removeEventListener("visibilitychange", onVisibility);
  };
};

export {
  authApi,
  apiJson,
  apiRequest,
  refreshSession,
  refreshSessionAndGetProfile,
  setAuthFailureHandler,
} from "@/lib/auth/apiClient";
