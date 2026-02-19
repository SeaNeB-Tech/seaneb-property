import api from "./api";
import { getCookie, setCookie } from "./cookie";
import { getDefaultProductKey } from "./pro.service";

const resolveProductKey = () => {
  const fromCookie = String(getCookie("product_key") || "").trim();
  if (fromCookie) return fromCookie;
  return getDefaultProductKey();
};

export const getMyProfile = async () => {
  const accessToken = getAccessTokenFromCookie();
  const headers = {
    "x-product-key": resolveProductKey(),
  };

  if (!accessToken) return null;

  headers.Authorization = `Bearer ${accessToken}`;

  const res = await api.get("/profile/me", { headers });
  return res?.data?.data || null;
};

export const getAccessTokenFromCookie = () => String(getCookie("access_token") || "").trim();

export const hasBusinessFromProfile = (profile) => {
  const data = profile || {};

  if (data.has_business === true || data.business_registered === true || data.is_business === true) {
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
