import {
  clearAccessToken as clearInMemoryAccessToken,
  getAccessToken as getInMemoryAccessToken,
  setAccessToken as setInMemoryAccessToken,
} from "@/lib/auth/refreshHandler";
import { getCookie, removeCookie, setCookie } from "@/lib/auth/cookieManager";

const REFRESH_TOKEN_COOKIE_KEYS = ["refresh_token_property"];

const logSafeMode = () => {
  if (typeof globalThis === "undefined") return;
  if (globalThis.__SEANEB_AUTH_SAFE_MODE_TOKEN_STORAGE_FE__) return;
  globalThis.__SEANEB_AUTH_SAFE_MODE_TOKEN_STORAGE_FE__ = true;
  console.info("[AUTH SAFE MODE] using shared auth layer");
};

const readFirstCookie = (keys = []) => {
  for (const key of keys) {
    const value = String(getCookie(key) || "").trim();
    if (value) return value;
  }
  return "";
};

export const getAccessToken = () => {
  logSafeMode();
  return String(getInMemoryAccessToken() || "").trim();
};

export const setAccessToken = (token, options = {}) => {
  logSafeMode();
  void options;
  return setInMemoryAccessToken(token);
};

export const clearAccessToken = (options = {}) => {
  logSafeMode();
  void options;
  clearInMemoryAccessToken();
};

export const getRefreshToken = () => {
  logSafeMode();
  return readFirstCookie(REFRESH_TOKEN_COOKIE_KEYS);
};

export const setRefreshToken = (token, options = {}) => {
  logSafeMode();
  setCookie("refresh_token_property", token, options);
};

export const clearRefreshToken = (options = {}) => {
  logSafeMode();
  removeCookie("refresh_token_property", options);
};

