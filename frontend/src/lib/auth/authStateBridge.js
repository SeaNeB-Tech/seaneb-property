import { getAuthUserStateSnapshot } from "@/services/user.service";

const logSafeMode = () => {
  if (typeof globalThis === "undefined") return;
  if (globalThis.__SEANEB_AUTH_SAFE_MODE_STATE_BRIDGE_FE__) return;
  globalThis.__SEANEB_AUTH_SAFE_MODE_STATE_BRIDGE_FE__ = true;
  console.info("[AUTH SAFE MODE] using shared auth layer");
};

export const getCurrentUser = () => {
  logSafeMode();
  const snapshot = getAuthUserStateSnapshot();
  return snapshot?.profile || null;
};

export const isAuthenticated = () => {
  logSafeMode();
  const snapshot = getAuthUserStateSnapshot();
  return snapshot?.status === "authenticated";
};


