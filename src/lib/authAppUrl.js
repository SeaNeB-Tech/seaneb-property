const ENV_AUTH_APP_URL = process.env.NEXT_PUBLIC_AUTH_APP_URL;
const PROD_AUTH_APP_URL = "http://159.65.154.221:1002";
const LOCAL_AUTH_APP_URL = "http://localhost:1002";

const normalizeUrl = (value) => String(value || "").replace(/\/+$/, "");
const normalizeDevAuthUrl = (value) => {
  const normalized = normalizeUrl(value);
  if (!normalized || process.env.NODE_ENV !== "development") return normalized;

  try {
    const parsed = new URL(normalized);
    const isLocalHost = parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1";
    if (isLocalHost && parsed.port === "3000") {
      parsed.port = "1002";
      return normalizeUrl(parsed.toString());
    }
  } catch {
    return normalized;
  }

  return normalized;
};

const defaultAuthBaseUrl =
  process.env.NODE_ENV === "development" ? LOCAL_AUTH_APP_URL : PROD_AUTH_APP_URL;

// Keep SSR and CSR identical to avoid hydration mismatches in href values.
export const AUTH_APP_BASE_URL = normalizeDevAuthUrl(ENV_AUTH_APP_URL) || defaultAuthBaseUrl;

export const getAuthAppUrl = (path = "/") => {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${AUTH_APP_BASE_URL}${safePath}`;
};
