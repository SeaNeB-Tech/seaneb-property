import api from "./api";
import { setCookie } from "./cookie";
import { getDefaultProductKey } from "./product.service";
import { getInMemoryAccessToken, hasCsrfCookie } from "@/lib/api/client";
import { refreshAccessToken } from "@/services/api";

const resolveProductKey = () => getDefaultProductKey();

const toBool = (value) => {
  if (value === true) return true;
  if (value === false || value == null) return false;
  const normalized = String(value).trim().toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes";
};

export const getMyProfile = async () => {
  let accessToken = getInMemoryAccessToken();
  if (!accessToken) {
    // Avoid refresh attempts for guests on public pages.
    if (!hasCsrfCookie()) {
      throw new Error("Missing auth hints for profile request");
    }
    try {
      await refreshAccessToken();
      accessToken = getInMemoryAccessToken();
    } catch {
      // Keep request attempt below; caller handles unauthorized state.
    }
  }

  if (!accessToken) {
    throw new Error("Missing access token for profile request");
  }

  const headers = {
    "x-product-key": resolveProductKey(),
    Authorization: `Bearer ${accessToken}`,
  };

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

  if (
    data.business_id ||
    data.business_uuid ||
    data.business_slug ||
    data.branch_id ||
    data.branch_uuid ||
    data.branch_slug ||
    data.broker_id ||
    data.company_id
  ) {
    return true;
  }

  if (Array.isArray(data.businesses) && data.businesses.length > 0) return true;
  if (Array.isArray(data.user_businesses) && data.user_businesses.length > 0) return true;
  if (Array.isArray(data.branches) && data.branches.length > 0) return true;
  if (Array.isArray(data.user_branches) && data.user_branches.length > 0) return true;
  if (Array.isArray(data.branch_list) && data.branch_list.length > 0) return true;

  if (data.business && typeof data.business === "object") {
    if (
      data.business.id ||
      data.business.business_id ||
      data.business.uuid ||
      data.business.branch_id
    ) {
      return true;
    }
  }

  if (data.branch && typeof data.branch === "object") {
    if (
      data.branch.id ||
      data.branch.branch_id ||
      data.branch.uuid ||
      data.branch.business_id
    ) {
      return true;
    }
  }

  const roleHint = String(
    data.role || data.user_role || data.user_type || data.account_type || ""
  )
    .trim()
    .toLowerCase();
  if (
    roleHint.includes("broker") ||
    roleHint.includes("business") ||
    roleHint.includes("builder") ||
    roleHint.includes("agent")
  ) {
    return true;
  }

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
