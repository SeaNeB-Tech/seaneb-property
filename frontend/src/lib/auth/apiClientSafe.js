import { refreshAccessToken } from "@/lib/auth/refreshHandler";
import { getAccessToken } from "@/lib/auth/tokenStorage";
const logSafeMode = () => {
  if (typeof globalThis === "undefined") return;
  if (globalThis.__SEANEB_AUTH_SAFE_MODE_API_SAFE_FE__) return;
  globalThis.__SEANEB_AUTH_SAFE_MODE_API_SAFE_FE__ = true;
  console.info("[AUTH SAFE MODE] using shared auth layer");
};

export const isUsableAccessToken = (value) => {
  const token = String(value || "").trim();
  if (!token) return false;
  const lowered = token.toLowerCase();
  return !["cookie_session", "null", "undefined", "invalid", "sentinel"].includes(lowered);
};

export const attachAuthorizationHeader = (headers) => {
  const next = new Headers(headers || {});
  const accessToken = String(getAccessToken() || "").trim();
  if (isUsableAccessToken(accessToken)) {
    next.set("Authorization", `Bearer ${accessToken}`);
  }
  return next;
};

export const requestWithAuthSafeRetry = async ({
  makeRequest,
  retryOn401 = true,
  isRefreshRequest = false,
  refresh = refreshAccessToken,
  markRetried,
}) => {
  logSafeMode();
  const firstResponse = await makeRequest();
  if (!retryOn401 || isRefreshRequest || firstResponse?.status !== 401) {
    return firstResponse;
  }

  if (typeof markRetried === "function") {
    markRetried();
  }

  try {
    await refresh();
  } catch {
    return firstResponse;
  }

  return makeRequest();
};
