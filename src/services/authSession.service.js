import { getCookie, removeCookie } from "./cookie";
import api from "@/services/api";

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
  "business_name",
  "business_type",
  "business_location",
  "business_id",
  "branch_id",
  "user_email",
  "verified_email",
  "verified_business_email",
  "verified_mobile",
  "verified_business_mobile",
  "verified_pan",
  "verified_gstin",
  "mobile_verified",
  "otp_mobile",
  "otp_cc",
  "otp_context",
  "email_otp_until",
  "mobile_otp_until",
  "business_mobile_otp_until",
  "reg_form_draft",
];

const STORAGE_KEYS = [
  "access_token",
  "refresh_token",
  "csrf_token",
  "csrf-token",
  "XSRF-TOKEN",
  "xsrf-token",
  "session_start_time",
  "profile_completed",
];

const clearCookieVariants = (name) => {
  if (typeof document === "undefined") return;

  const key = encodeURIComponent(name);
  const expires = "Thu, 01 Jan 1970 00:00:00 GMT";
  const paths = ["/", "/api", "/api/v1"];
  const host = typeof window !== "undefined" ? String(window.location.hostname || "").trim() : "";
  const domains = ["", host, host ? `.${host}` : ""].filter(Boolean);

  paths.forEach((path) => {
    // Host-only cookie
    document.cookie = `${key}=; Expires=${expires}; Max-Age=0; Path=${path}`;

    // Domain-scoped cookies
    domains.forEach((domain) => {
      document.cookie = `${key}=; Expires=${expires}; Max-Age=0; Path=${path}; Domain=${domain}`;
    });
  });
};

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
  return Boolean(getCookie("access_token")) || hasCookieByPrefixes(["access_token"]);
};

export const clearAuthSessionCookies = () => {
  AUTH_COOKIE_KEYS.forEach((key) => {
    removeCookie(key);
    clearCookieVariants(key);
  });
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
  dynamicKeys.forEach((key) => {
    removeCookie(key);
    clearCookieVariants(key);
  });
  if (typeof window !== "undefined") {
    STORAGE_KEYS.forEach((key) => {
      try {
        window.localStorage.removeItem(key);
      } catch {}
      try {
        window.sessionStorage.removeItem(key);
      } catch {}
    });
  }
  notifyAuthChanged();
};

export const logoutAndClearAuthSession = async () => {
  clearAuthSessionCookies();
  try {
    await api.post("/auth/logout", {}, { withCredentials: true });
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
