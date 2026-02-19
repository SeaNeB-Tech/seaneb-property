const RAW_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://dev.seaneb.com/api/v1";

export const API_REMOTE_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, "");

// In browser, use Next.js rewrite proxy (/api -> remote base) to avoid CORS
// and keep token/cookie flow on same-origin requests.
export const API_BASE_URL =
  typeof window !== "undefined" ? "/api" : API_REMOTE_BASE_URL;
