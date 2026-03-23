"use client";

import { getAuthAppUrl, getListingAppOrigin } from "@/lib/core/appUrls";
import { ssoDebugLog } from "@/lib/observability/ssoDebug";

const AUTH_LOGIN_PATH = "/auth/login";
const AUTH_SSO_SOURCE_KEY = "source";
const AUTH_TAB_NAME = "seaneb-auth-tab";
const AUTH_TAB_FLOW_PREFIX = `${AUTH_TAB_NAME}|flow=`;
const AUTH_TAB_LOCK_KEY = "seaneb_auth_tab_opening";
const AUTH_TAB_LOCK_TTL_MS = 2500;
let authTabRef = null;

const getAllowedOrigins = () => {
  const listingOrigin = getListingAppOrigin();
  const merged = listingOrigin ? [listingOrigin] : [];
  const parsed = [];
  for (const value of merged) {
    try {
      const url = new URL(value);
      if (!/^https?:$/i.test(url.protocol)) continue;
      parsed.push(url.origin);
    } catch {
      // ignore malformed origin
    }
  }
  if (typeof window !== "undefined") {
    parsed.push(window.location.origin);
  }
  return Array.from(new Set(parsed));
};

const isAllowedOrigin = (origin) => {
  const target = String(origin || "").trim();
  if (!target) return false;
  if (typeof window !== "undefined" && window.location.protocol === "https:") {
    try {
      const parsed = new URL(target);
      if (parsed.protocol !== "https:") return false;
    } catch {
      return false;
    }
  }
  const allowed = getAllowedOrigins();
  return allowed.includes(target);
};

const normalizeSourceUrl = (rawUrl) => {
  try {
    const parsed = new URL(String(rawUrl || ""), window.location.origin);
    if (!/^https?:$/i.test(parsed.protocol)) return window.location.origin;
    if (window.location.protocol === "https:" && parsed.protocol !== "https:") {
      return window.location.origin;
    }
    if (!isAllowedOrigin(parsed.origin)) return window.location.origin;
    // Avoid nested auth redirects in source payload.
    parsed.searchParams.delete("returnTo");
    parsed.searchParams.delete("bridge_token");
    parsed.searchParams.delete("bridgeToken");
    return parsed.toString();
  } catch {
    return window.location.origin;
  }
};

const buildPopupReturnUrl = () => {
  const callbackUrl = new URL("/auth/sso/callback", window.location.origin);
  if (!isAllowedOrigin(callbackUrl.origin)) {
    return "";
  }
  callbackUrl.searchParams.set(AUTH_SSO_SOURCE_KEY, normalizeSourceUrl(window.location.href));
  return callbackUrl.toString();
};

const buildAuthRequestContext = (path = AUTH_LOGIN_PATH, options = {}) => {
  const incomingSource = String(options?.source || "").trim().toLowerCase();
  const sourceFromPath = (() => {
    try {
      const parsedPath = new URL(String(path || AUTH_LOGIN_PATH), window.location.origin);
      return String(parsedPath.searchParams.get(AUTH_SSO_SOURCE_KEY) || "").trim().toLowerCase();
    } catch {
      return "";
    }
  })();
  const source = incomingSource || sourceFromPath || "main-app";
  const returnTo = buildPopupReturnUrl();
  if (!returnTo) return null;
  try {
    const returnToUrl = new URL(returnTo);
    if (!isAllowedOrigin(returnToUrl.origin)) return null;
  } catch {
    return null;
  }
  return { source, returnTo };
};

const encodeAuthFlowForWindowName = (value) => {
  try {
    const payload = JSON.stringify(value || {});
    return `${AUTH_TAB_FLOW_PREFIX}${window.btoa(unescape(encodeURIComponent(payload)))}`;
  } catch {
    return AUTH_TAB_NAME;
  }
};

const buildAuthUrl = (path = AUTH_LOGIN_PATH) => {
  const safePath = String(path || "").trim().startsWith("/")
    ? String(path || "").trim().split("?")[0]
    : AUTH_LOGIN_PATH;
  const target = new URL(getAuthAppUrl(safePath), window.location.origin);
  if (window.location.protocol === "https:" && target.protocol !== "https:") {
    return "";
  }
  return target.toString();
};

export const openSsoAuthTab = (path = AUTH_LOGIN_PATH, options = {}) => {
  if (typeof window === "undefined") return false;
  const now = Date.now();
  try {
    const lockUntil = Number(window.sessionStorage.getItem(AUTH_TAB_LOCK_KEY) || 0);
    if (lockUntil > now) return false;
    window.sessionStorage.setItem(AUTH_TAB_LOCK_KEY, String(now + AUTH_TAB_LOCK_TTL_MS));
  } catch {
    // ignore storage errors
  }

  if (authTabRef && !authTabRef.closed) {
    try {
      authTabRef.focus();
      return true;
    } catch {
      // continue and reopen below
    }
  }

  const authUrl = buildAuthUrl(path);
  const flowContext = buildAuthRequestContext(path, options);
  if (!authUrl || !flowContext) {
    ssoDebugLog("sso.login_tab.rejected", { reason: "invalid_origin_or_protocol" });
    return false;
  }
  const tabRef = window.open(authUrl, AUTH_TAB_NAME);
  if (tabRef && typeof tabRef.focus === "function") {
    try {
      tabRef.name = encodeAuthFlowForWindowName(flowContext);
    } catch {
      // ignore cross-window naming issues
    }
    authTabRef = tabRef;
    tabRef.focus();
    return true;
  }
  return false;
};

export const closeSsoAuthTab = () => {
  if (typeof window === "undefined") return false;
  if (!authTabRef || authTabRef.closed) return false;
  try {
    authTabRef.close();
  } catch {
    return false;
  }
  return Boolean(authTabRef.closed);
};
