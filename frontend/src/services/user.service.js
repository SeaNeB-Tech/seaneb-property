import { setCookie } from "@/lib/core/cookies";

const listeners = new Set();

let authUserState = {
  status: "unauthenticated",
  profile: null,
};

const emit = () => {
  for (const listener of listeners) {
    try {
      listener(authUserState);
    } catch {
      // Ignore subscriber errors.
    }
  }
};

const toBool = (value) => {
  if (value === true) return true;
  if (value === false || value == null) return false;
  const normalized = String(value).trim().toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes";
};

const readProfilePayload = (response) => {
  const profile =
    response?.data?.profile ||
    response?.data?.user ||
    response?.data ||
    response?.profile ||
    response?.user ||
    response;

  return profile && typeof profile === "object" ? profile : null;
};

export const restoreProfileSession = async () => {
  const snapshot = authUserState;
  if (snapshot.status !== "authenticated") return null;
  return readProfilePayload(snapshot.profile);
};

export const getMyProfile = async () => restoreProfileSession();

export const hasBusinessFromProfile = (profile) => {
  const data = profile || {};

  if (toBool(data.is_business_registered)) return true;

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

export const getAuthUserStateSnapshot = () => authUserState;

export const setAuthUserRestoring = () => {
  authUserState = { status: "unauthenticated", profile: null };
  emit();
};

export const setAuthUserAuthenticated = (profile) => {
  authUserState = {
    status: "authenticated",
    profile: profile && typeof profile === "object" ? profile : null,
  };
  emit();
};

export const setAuthUserLoggedOut = () => {
  authUserState = { status: "unauthenticated", profile: null };
  emit();
};

export const subscribeAuthUserState = (listener) => {
  if (typeof listener !== "function") return () => {};
  listeners.add(listener);
  return () => listeners.delete(listener);
};
