const normalizeUrl = (value) => 
  String(value || "").trim().replace(/\/+$/, "");

const normalizeApiUrl = (value) => {
  const raw = normalizeUrl(value);
  if (!raw) return "";
  try {
    const url = new URL(raw);
    const path = String(url.pathname || "").replace(/\/+$/, "");
    if (!/\/api\/v1$/i.test(path)) {
      url.pathname = `${path}/api/v1`.replace(/\/+/g, "/");
    }
    return normalizeUrl(url.toString());
  } catch {
    return raw.endsWith("/api/v1") ? raw : `${raw}/api/v1`;
  }
};

const isUsableUrl = (value) => {
  try {
    const url = new URL(normalizeUrl(value));
    return Boolean(url.protocol && url.host);
  } catch {
    return false;
  }
};

//  All from ENV — no hardcoded values
const NEXT_ENV = String(
  process.env.NEXT_PUBLIC_ENV ||
  process.env.NEXT_ENV ||
  "development"
).trim().toLowerCase();

const BACKEND_API_URL = normalizeUrl(
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  ""
);

const DEV_API_URL = normalizeUrl(
  process.env.NEXT_PUBLIC_DEV_URL || ""
);

const API_BASE_ENV_URL = normalizeUrl(
  process.env.NEXT_PUBLIC_API_BASE_URL || ""
);

//  Fixed — trim to remove leading space from .env
const CENTRAL_API_URL = normalizeUrl(
  process.env.NEXT_PUBLIC_CENTRAL_URL ||
  process.env.NEXT_PUBLIC_CENTRAL_API_URL ||
  ""
);

//  Fixed — built from ENV, not hardcoded
const DEFAULT_FALLBACK_URL = normalizeApiUrl(
  CENTRAL_API_URL ||
  DEV_API_URL ||
  ""
);

const API_BASE = NEXT_ENV === "development"
  ? DEV_API_URL || API_BASE_ENV_URL || CENTRAL_API_URL || BACKEND_API_URL
  : CENTRAL_API_URL || API_BASE_ENV_URL || DEV_API_URL || BACKEND_API_URL;

const API_FALLBACK = NEXT_ENV === "development"
  ? API_BASE_ENV_URL || CENTRAL_API_URL || DEV_API_URL || BACKEND_API_URL
  : DEV_API_URL || BACKEND_API_URL || API_BASE_ENV_URL;

const pushUnique = (list, value) => {
  const normalized = normalizeApiUrl(value);
  if (!isUsableUrl(normalized)) return;
  if (!list.includes(normalized)) list.push(normalized);
};

const candidateBaseUrls = [];
pushUnique(candidateBaseUrls, BACKEND_API_URL);
pushUnique(candidateBaseUrls, API_BASE);
pushUnique(candidateBaseUrls, API_BASE_ENV_URL);
pushUnique(candidateBaseUrls, API_FALLBACK);
pushUnique(candidateBaseUrls, CENTRAL_API_URL);
pushUnique(candidateBaseUrls, DEV_API_URL);
//  Removed duplicate pushes

if (!candidateBaseUrls.length) {
  pushUnique(candidateBaseUrls, DEFAULT_FALLBACK_URL);
}

//  Warn if no URL found
if (!candidateBaseUrls.length && typeof window === "undefined") {
  console.warn("[apiBaseUrl] No valid API base URL found — check your .env file");
}

export const API_REMOTE_BASE_URL = candidateBaseUrls[0] || "";
export const API_REMOTE_FALLBACK_BASE_URL = candidateBaseUrls[1] || "";
export const API_REMOTE_CANDIDATE_BASE_URLS = candidateBaseUrls.slice();

//  Client uses local proxy, server uses remote URL
export const API_BASE_URL = 
  typeof window !== "undefined" 
    ? "/api" 
    : API_REMOTE_BASE_URL;