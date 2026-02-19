const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://property.seaneb.com";

export const SITE_URL = RAW_SITE_URL.replace(/\/+$/, "");

export const getSiteUrl = (path = "/") => {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${safePath}`;
};
