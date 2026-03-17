const SESSION_HINT_TTL_MS = 2000;
const SESSION_HINT_NEGATIVE_TTL_MS = 300;
const SESSION_HINT_STORAGE_KEY = "seaneb:session_hint";

let cachedHint = null;
let inFlight = null;

// Hydrate from sessionStorage to survive hard refreshes within the same tab
if (typeof window !== "undefined") {
  try {
    const stored = window.sessionStorage.getItem(SESSION_HINT_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.value && parsed?.at && Date.now() - parsed.at < SESSION_HINT_TTL_MS) {
        cachedHint = { value: parsed.value, at: parsed.at, ttl: parsed.ttl || SESSION_HINT_TTL_MS };
      }
    }
  } catch {}
}
const DEFAULT_HINT = {
  success: false,
  hasRefreshSession: false,
  hasCsrfCookie: false,
};

export const clearSessionHintCache = () => {
  cachedHint = null;
  if (typeof window !== "undefined") {
    try { window.sessionStorage.removeItem(SESSION_HINT_STORAGE_KEY); } catch {}
  }
};

export const getSessionHint = async ({ force = false } = {}) => {
  if (typeof window === "undefined") {
    return { ...DEFAULT_HINT };
  }

  const now = Date.now();
  if (!force && cachedHint && now - cachedHint.at < cachedHint.ttl) {
    return cachedHint.value;
  }

  if (!force && inFlight) {
    return inFlight;
  }

  inFlight = (async () => {
    try {
      const response = await fetch("/api/auth/session", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const payload = await response.json().catch(() => ({}));
      const value = {
        success: Boolean(payload?.success ?? response.ok),
        hasRefreshSession: Boolean(payload?.hasRefreshSession),
        hasCsrfCookie: Boolean(payload?.hasCsrfCookie),
      };
      const ttl =
        value.hasRefreshSession || value.hasCsrfCookie
          ? SESSION_HINT_TTL_MS
          : SESSION_HINT_NEGATIVE_TTL_MS;
      cachedHint = { value, at: Date.now(), ttl };
      try { window.sessionStorage.setItem(SESSION_HINT_STORAGE_KEY, JSON.stringify(cachedHint)); } catch {}
      return value;
    } catch {
      const value = { ...DEFAULT_HINT };
      cachedHint = { value, at: Date.now(), ttl: SESSION_HINT_NEGATIVE_TTL_MS };
      return value;
    } finally {
      inFlight = null;
    }
  })();

  return inFlight;
};
