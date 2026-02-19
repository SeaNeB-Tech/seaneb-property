import { getCookie, removeCookie } from "./cookie";

const AUTH_CHANGE_EVENT = "seaneb:auth-changed";

const AUTH_COOKIE_KEYS = [
  "access_token",
  "access_token_issued_time",
  "refresh_token",
  "csrf_token",
  "csrf-token",
  "XSRF-TOKEN",
  "XSRF_TOKEN",
  "xsrf-token",
  "_csrf",
  "profile_completed",
  "session_start_time",
  "dashboard_mode",
  "business_registered",
  "user_email",
  "verified_email",
];

const getCookieEntries = () => {
  if (typeof document === "undefined") return [];
  const pairs = document.cookie ? document.cookie.split("; ") : [];
  return pairs
    .map((pair) => {
      const idx = pair.indexOf("=");
      if (idx < 0) return null;
      const key = decodeURIComponent(pair.slice(0, idx));
      const value = decodeURIComponent(pair.slice(idx + 1));
      return { key, value };
    })
    .filter(Boolean);
};

const hasCookieByPrefixes = (prefixes = []) => {
  const entries = getCookieEntries();
  return entries.some(({ key, value }) => {
    if (!String(value || "").trim()) return false;
    const lower = String(key || "").toLowerCase();
    return prefixes.some((prefix) => lower === prefix || lower.startsWith(`${prefix}_`));
  });
};

export const isAuthenticatedByCookies = () => {
  const hasAccessToken = Boolean(getCookie("access_token")) || hasCookieByPrefixes(["access_token"]);
  const hasRefreshToken = Boolean(getCookie("refresh_token")) || hasCookieByPrefixes(["refresh_token"]);

  // Token presence determines session state. CSRF/profile flags alone are not auth state.
  return hasAccessToken || hasRefreshToken;
};

export const clearAuthSessionCookies = () => {
  AUTH_COOKIE_KEYS.forEach((key) => removeCookie(key));
  const dynamicKeys = getCookieEntries()
    .map(({ key }) => key)
    .filter((key) => {
      const lower = String(key || "").toLowerCase();
      return (
        lower.startsWith("access_token_") ||
        lower.startsWith("refresh_token_") ||
        lower.startsWith("csrf_token_") ||
        lower.startsWith("csrf-token_") ||
        lower.startsWith("xsrf-token_")
      );
    });
  dynamicKeys.forEach((key) => removeCookie(key));
  notifyAuthChanged();
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
  window.addEventListener("storage", listener);
  window.addEventListener("seaneb:cookie-change", listener);
  window.addEventListener(AUTH_CHANGE_EVENT, listener);

  return () => {
    window.removeEventListener("focus", listener);
    window.removeEventListener("storage", listener);
    window.removeEventListener("seaneb:cookie-change", listener);
    window.removeEventListener(AUTH_CHANGE_EVENT, listener);
  };
};
