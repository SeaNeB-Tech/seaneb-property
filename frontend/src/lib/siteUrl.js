const RAW_SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "";

export const SITE_URL = RAW_SITE_URL.replace(/\/+$/, "");

export const isUsableUrl = (value) => {
  try {
    const url = new URL(String(value || "").trim());
    return Boolean(url.protocol && url.host);
  } catch {
    return false;
  }
};

export const getSiteUrl = (path = "/") => {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${safePath}`;
};
