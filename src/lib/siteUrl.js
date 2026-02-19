const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://159.65.154.221:1001";

export const SITE_URL = RAW_SITE_URL.replace(/\/+$/, "");

export const getSiteUrl = (path = "/") => {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${safePath}`;
};
