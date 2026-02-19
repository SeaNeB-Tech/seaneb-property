const ENV_AUTH_APP_URL = process.env.NEXT_PUBLIC_AUTH_APP_URL;
const PROD_AUTH_APP_URL = "https://property.seaneb.app";
const LOCAL_AUTH_APP_URL = "http://localhost:3002";

const normalizeUrl = (value) => String(value || "").replace(/\/+$/, "");

const defaultAuthBaseUrl =
  process.env.NODE_ENV === "development" ? LOCAL_AUTH_APP_URL : PROD_AUTH_APP_URL;

// Keep SSR and CSR identical to avoid hydration mismatches in href values.
export const AUTH_APP_BASE_URL = normalizeUrl(ENV_AUTH_APP_URL) || defaultAuthBaseUrl;

export const getAuthAppUrl = (path = "/") => {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${AUTH_APP_BASE_URL}${safePath}`;
};
