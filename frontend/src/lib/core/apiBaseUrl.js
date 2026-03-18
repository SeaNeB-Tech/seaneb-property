const BACKEND_API_URL =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "";
const DEV_API_URL = process.env.NEXT_PUBLIC_DEV_URL || "";
const CENTRAL_API_URL =
  process.env.NEXT_PUBLIC_CENTRAL_URL ||
  process.env.NEXT_PUBLIC_CENTRAL_API_URL ||
  "";
const DEFAULT_FALLBACK_URL = "https://central-api.seaneb.com/api/v1";

const normalizeUrl = (value) => String(value || "").trim().replace(/\/+$/, "");
const normalizeApiUrl = (value) => {
  const raw = normalizeUrl(value);
  if (!raw) return "";
  try {
    const url = new URL(raw);
    const pathname = String(url.pathname || "").trim();
    if (!pathname || pathname === "/") {
      url.pathname = "/api/v1";
    }
    return normalizeUrl(url.toString());
  } catch {
    return raw;
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

const NEXT_ENV = String(process.env.NEXT_ENV || "").trim().toLowerCase();
const API_BASE = NEXT_ENV === "development"
  ? DEV_API_URL || CENTRAL_API_URL || BACKEND_API_URL
  : CENTRAL_API_URL || DEV_API_URL || BACKEND_API_URL;
const API_FALLBACK = NEXT_ENV === "development"
  ? CENTRAL_API_URL || DEV_API_URL || BACKEND_API_URL
  : DEV_API_URL || CENTRAL_API_URL || BACKEND_API_URL;

const pushUnique = (list, value) => {
  const normalized = normalizeApiUrl(value);
  if (!isUsableUrl(normalized)) return;
  if (!list.includes(normalized)) list.push(normalized);
};

const candidateBaseUrls = [];
pushUnique(candidateBaseUrls, BACKEND_API_URL);
pushUnique(candidateBaseUrls, API_BASE);
pushUnique(candidateBaseUrls, API_FALLBACK);
pushUnique(candidateBaseUrls, CENTRAL_API_URL);
pushUnique(candidateBaseUrls, DEV_API_URL);
pushUnique(candidateBaseUrls, process.env.NEXT_PUBLIC_API_BASE_URL);
pushUnique(candidateBaseUrls, process.env.NEXT_PUBLIC_CENTRAL_API_URL);
pushUnique(candidateBaseUrls, process.env.NEXT_PUBLIC_DEV_URL);

if (!candidateBaseUrls.length) {
  pushUnique(candidateBaseUrls, DEFAULT_FALLBACK_URL);
}

export const API_REMOTE_BASE_URL = candidateBaseUrls[0] || "";
export const API_REMOTE_FALLBACK_BASE_URL = candidateBaseUrls[1] || "";
export const API_REMOTE_CANDIDATE_BASE_URLS = candidateBaseUrls.slice();

export const API_BASE_URL = typeof window !== "undefined" ? "/api" : API_REMOTE_BASE_URL;
