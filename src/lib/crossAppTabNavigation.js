"use client";

import { getAuthAppUrl } from "@/lib/authAppUrl";

const LISTING_TAB_NAME = "seaneb-listing-tab";
const AUTH_TAB_NAME = "seaneb-auth-tab";
const AUTH_LOGIN_PATH = "/auth/login";

const ensureWindowName = (name) => {
  if (typeof window === "undefined") return;
  if (!String(window.name || "").trim()) {
    window.name = name;
  }
};

const withReturnTo = (url) => {
  if (typeof window === "undefined") return url;

  const parsed = new URL(url, window.location.origin);
  if (!parsed.searchParams.get("returnTo")) {
    parsed.searchParams.set("returnTo", window.location.href);
  }
  return parsed.toString();
};

export const openAuthLoginTab = () => {
  if (typeof window === "undefined") return;

  ensureWindowName(LISTING_TAB_NAME);
  const targetUrl = withReturnTo(getAuthAppUrl(AUTH_LOGIN_PATH));

  if (window.name === AUTH_TAB_NAME) {
    window.location.assign(targetUrl);
    return;
  }

  const authWindow = window.open(targetUrl, AUTH_TAB_NAME);
  if (authWindow) {
    authWindow.focus();
    return;
  }

  window.location.assign(targetUrl);
};

