import api, { ensureAccessToken } from "./api";
import { getCookie, setCookie } from "./cookie";
import { getDefaultProductKey } from "./pro.service";

const resolveProductKey = () => {
  const fromCookie = String(getCookie("product_key") || "").trim();
  if (fromCookie) return fromCookie;
  return getDefaultProductKey();
};

export const getMyProfile = async () => {
  await ensureAccessToken();
  const accessToken = getAccessTokenFromCookie();
  const headers = {
    "x-product-key": resolveProductKey(),
  };

  if (!accessToken) return null;

  headers.Authorization = `Bearer ${accessToken}`;

  const res = await api.get("/profile/me", { headers, skipAuthRedirect: true });
  return res?.data?.data || null;
};

const getCookieEntries = () => {
  if (typeof document === "undefined") return [];
  const entries = document.cookie ? document.cookie.split("; ") : [];
  return entries
    .map((entry) => {
      const idx = entry.indexOf("=");
      if (idx < 0) return null;
      return {
        key: decodeURIComponent(entry.slice(0, idx)).toLowerCase(),
        value: decodeURIComponent(entry.slice(idx + 1)),
      };
    })
    .filter(Boolean);
};

export const getAccessTokenFromCookie = () => {
  const direct = String(getCookie("access_token") || "").trim();
  if (direct) return direct;

  const prefixed = getCookieEntries().find(
    ({ key, value }) => (key === "access_token" || key.startsWith("access_token_")) && String(value || "").trim()
  );

  return String(prefixed?.value || "").trim();
};

export const hasBusinessFromProfile = (profile) => {
  const data = profile || {};
  const toBool = (value) => {
    if (value === true) return true;
    if (value === false || value == null) return false;
    const normalized = String(value).trim().toLowerCase();
    return normalized === "true" || normalized === "1" || normalized === "yes";
  };

  // Primary API contract
  if (toBool(data.is_business_registered)) return true;

  // Backward-compatible fallbacks
  if (
    toBool(data.has_business) ||
    toBool(data.business_registered) ||
    toBool(data.is_business)
  ) {
    return true;
  }

  if (typeof data.business_count === "number" && data.business_count > 0) return true;

  if (data.business_id || data.business_uuid || data.business_slug) return true;

  if (Array.isArray(data.businesses) && data.businesses.length > 0) return true;
  if (Array.isArray(data.user_businesses) && data.user_businesses.length > 0) return true;

  return false;
};

export const syncBusinessRegistrationCookie = (profile) => {
  const hasBusiness = hasBusinessFromProfile(profile);
  setCookie("business_registered", hasBusiness ? "true" : "false", {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return hasBusiness;
};
