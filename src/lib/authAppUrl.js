const ENV_AUTH_APP_URL = process.env.NEXT_PUBLIC_AUTH_APP_URL;
const PROD_AUTH_APP_URL = "http://159.65.154.221:1002";

const normalizeUrl = (value) => String(value || "").replace(/\/+$/, "");
const normalizeAuthPort = (value) => {
  const normalized = normalizeUrl(value);
  if (!normalized) return normalized;

  try {
    const parsed = new URL(normalized);
    // Keep backward compatibility with old auth/listing ports.
    if (parsed.port === "3000" || parsed.port === "1001") {
      parsed.port = "1002";
      return normalizeUrl(parsed.toString());
    }
  } catch {
    return normalized;
  }

  return normalized;
};

// Keep SSR and CSR identical to avoid hydration mismatches in href values.
export const AUTH_APP_BASE_URL = normalizeAuthPort(ENV_AUTH_APP_URL) || PROD_AUTH_APP_URL;

export const getAuthAppUrl = (path = "/") => {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${AUTH_APP_BASE_URL}${safePath}`;
};
