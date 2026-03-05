// When NEXT_PUBLIC_APP_URL isn't provided, fall back to a reasonable default
// in development so that metadataBase and other features have a valid URL.
const DEFAULT_FALLBACK = process.env.NODE_ENV === "development"
  ? "http://localhost:3000"
  : "";
const RAW_SITE_URL = process.env.NEXT_PUBLIC_APP_URL || DEFAULT_FALLBACK;

export const SITE_URL = (RAW_SITE_URL || DEFAULT_FALLBACK).replace(/\/+$/, "");

export const getSiteUrl = (path = "/") => {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${safePath}`;
};
