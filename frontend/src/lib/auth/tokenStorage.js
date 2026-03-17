import {
  clearAccessToken as clearInMemoryAccessToken,
  getAccessToken as getInMemoryAccessToken,
  setAccessToken as setInMemoryAccessToken,
} from "@/lib/auth/refreshHandler";
const logSafeMode = () => {
  if (typeof globalThis === "undefined") return;
  if (globalThis.__SEANEB_AUTH_SAFE_MODE_TOKEN_STORAGE_FE__) return;
  globalThis.__SEANEB_AUTH_SAFE_MODE_TOKEN_STORAGE_FE__ = true;
  console.info("[AUTH SAFE MODE] using shared auth layer");
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
  return "";
};

export const setRefreshToken = (token, options = {}) => {
  logSafeMode();
  void token;
  void options;
  console.warn("[AUTH SAFE MODE] refresh token is HTTP-only; client-side set is ignored.");
};

export const clearRefreshToken = (options = {}) => {
  logSafeMode();
  void options;
  console.warn("[AUTH SAFE MODE] refresh token is HTTP-only; client-side clear is ignored.");
};

