import { getCookie, removeCookie } from "./cookie";

const AUTH_CHANGE_EVENT = "seaneb:auth-changed";

const AUTH_COOKIE_KEYS = [
  "access_token",
  "refresh_token",
  "csrf_token",
  "csrf-token",
  "XSRF-TOKEN",
  "xsrf-token",
  "_csrf",
  "profile_completed",
  "session_start_time",
  "dashboard_mode",
  "business_registered",
  "user_email",
  "verified_email",
];

export const isAuthenticatedByCookies = () => {
  return (
    Boolean(getCookie("access_token")) ||
    Boolean(getCookie("session_start_time")) ||
    getCookie("profile_completed") === "true"
  );
};

export const clearAuthSessionCookies = () => {
  AUTH_COOKIE_KEYS.forEach((key) => removeCookie(key));
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
