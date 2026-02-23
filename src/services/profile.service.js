import api from "./api";
import { setCookie } from "./cookie";
import { getDefaultProductKey } from "./product.service";
import { getInMemoryAccessToken } from "@/lib/api/client";

const resolveProductKey = () => getDefaultProductKey();

const toBool = (value) => {
  if (value === true) return true;
  if (value === false || value == null) return false;
  const normalized = String(value).trim().toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes";
};

export const getMyProfile = async () => {
  const accessToken = getInMemoryAccessToken();
  const headers = {
    "x-product-key": resolveProductKey(),
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const res = await api.get("/profile/me", { headers, skipAuthRedirect: true });
  return res?.data?.data || null;
};
export const hasBusinessFromProfile = (profile) => {
  const data = profile || {};

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

export const getProfileVerificationStatus = (profile) => {
  const data = profile || {};
  const seanebId = String(data.seaneb_id || data.seanebId || "").trim();
  const fullName = String(data.full_name || data.fullName || "").trim();

  const hasExplicitUserVerification =
    toBool(data.is_user_verified) ||
    toBool(data.user_verified) ||
    toBool(data.is_verified) ||
    toBool(data.verified) ||
    toBool(data.kyc_verified);

  return {
    seanebId,
    userVerified: hasExplicitUserVerification || Boolean(fullName && seanebId),
    businessVerified: hasBusinessFromProfile(data),
  };
};

export const syncBusinessRegistrationCookie = (profile) => {
  const hasBusiness = hasBusinessFromProfile(profile);
  setCookie("business_registered", hasBusiness ? "true" : "false", {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return hasBusiness;
};
