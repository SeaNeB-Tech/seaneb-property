const ENV_AUTH_APP_URL = process.env.NEXT_PUBLIC_AUTH_APP_URL;
const PROD_AUTH_APP_URL = "http://localhost:3000";

const normalizeUrl = (value) => String(value || "").replace(/\/+$/, "");

// Keep SSR and CSR identical to avoid hydration mismatches in href values.
export const AUTH_APP_BASE_URL = normalizeUrl(ENV_AUTH_APP_URL) || PROD_AUTH_APP_URL;

export const getAuthAppUrl = (path = "/") => {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${AUTH_APP_BASE_URL}${safePath}`;
};
