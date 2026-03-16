import { NextResponse } from "next/server";
import { API_REMOTE_BASE_URL } from "@/lib/core/apiBaseUrl";
import {
  validateCookiePolicyRuntime,
  validateSetCookieHeadersRuntime,
} from "@/lib/auth/cookieRuntimeSafety";
import { ssoDebugLog } from "@/lib/observability/ssoDebug";
import { getCookieOptions, sanitizeCookieDomain } from "@/lib/auth/cookieOptions";

const PRODUCT_KEY =
  String(process.env.NEXT_PUBLIC_PRODUCT_KEY || "").trim() || "property";

const REFRESH_COOKIE_KEYS = [
  "refresh_token_property",
  "refresh_token",
  "refreshToken",
  "refreshToken_property",
  "property_refresh_token",
  "refreshtoken",
  "refreshtoken_property",
];
const ACCESS_COOKIE_KEYS = [
  "access_token",
  "accessToken",
  "token",
  "auth_session",
  "auth_session_property",
];
const CSRF_COOKIE_KEYS = [
  "csrf_token_property",
  "csrf_token",
  "csrfToken",
  "csrfToken_property",
  "property_csrf_token",
  "csrftoken",
  "csrf-token",
  "xsrf-token",
  "x-xsrf-token",
  "XSRF-TOKEN",
  "X-XSRF-TOKEN",
  "XSRF_TOKEN",
  "_csrf",
];
const CLEAR_AUTH_COOKIE_KEYS = Array.from(
  new Set([...REFRESH_COOKIE_KEYS, ...ACCESS_COOKIE_KEYS, ...CSRF_COOKIE_KEYS])
);

// --- Server-side refresh deduplication to prevent race conditions on hard refresh ---
const _refreshDedup = new Map();
const REFRESH_DEDUP_TTL_MS = 5000;
let _lastSuccessfulRefreshAt = 0;

const getRefreshFingerprint = (cookieHeader) => {
  for (const key of REFRESH_COOKIE_KEYS) {
    const val = getCookieValueFromHeader(cookieHeader, key);
    if (val && val.length > 8) return val.slice(-16);
  }
  return "";
};

// Periodic cleanup of stale dedup entries
if (typeof globalThis !== "undefined") {
  const _dedupCleanup = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of _refreshDedup) {
      if (now - (entry.completedAt || entry.startedAt || 0) > REFRESH_DEDUP_TTL_MS * 6) {
        _refreshDedup.delete(key);
      }
    }
  }, 60000);
  if (_dedupCleanup?.unref) _dedupCleanup.unref();
}

const isValidAuthorizationHeader = (value) => {
  const raw = String(value || "").trim();
  if (!raw) return false;
  if (!/^bearer\s+/i.test(raw)) return false;
  const token = raw.replace(/^bearer\s+/i, "").trim();
  if (!token) return false;
  const lowered = token.toLowerCase();
  return !["cookie_session", "null", "undefined", "invalid", "sentinel"].includes(lowered);
};
const IS_PRODUCTION = String(process.env.NODE_ENV || "").trim() === "production";
const COOKIE_DOMAIN = String(process.env.NEXT_PUBLIC_COOKIE_DOMAIN || "").trim() || (IS_PRODUCTION ? ".seaneb.com" : undefined);
const normalizeSameSite = (value) => {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "none") return "none";
  if (normalized === "lax") return "lax";
  if (normalized === "strict") return "strict";
  return "lax"; // Safe default: Lax works over HTTP; None requires Secure
};
// Cookie policy is now resolved per-request via getCookieOptions(request)
// to ensure SameSite and Secure are always consistent (Lax for HTTP, None+Secure for HTTPS).

const appendSetCookieHeaders = (targetHeaders, upstreamHeaders) => {
  const getSetCookie = upstreamHeaders?.getSetCookie;
  if (typeof getSetCookie === "function") {
    const cookies = getSetCookie.call(upstreamHeaders) || [];
    for (const cookie of cookies) {
      if (!cookie) continue;
      targetHeaders.append("set-cookie", cookie);
    }
    return;
  }

  const combinedCookieHeader = String(upstreamHeaders.get("set-cookie") || "").trim();
  if (!combinedCookieHeader) return;

  // Fallback for runtimes where getSetCookie() is unavailable and multiple
  // Set-Cookie headers can arrive as a single comma-joined string.
  const splitCookies = combinedCookieHeader
    .split(/,(?=\s*[!#$%&'*+\-.^_`|~0-9A-Za-z]+=)/g)
    .map((item) => item.trim())
    .filter(Boolean);

  if (splitCookies.length === 0) return;
  for (const cookie of splitCookies) {
    targetHeaders.append("set-cookie", cookie);
  }
};

const getSetCookieList = (headers) => {
  const getSetCookie = headers?.getSetCookie;
  if (typeof getSetCookie === "function") {
    return (getSetCookie.call(headers) || []).filter(Boolean);
  }
  const combinedCookieHeader = String(headers?.get("set-cookie") || "").trim();
  if (!combinedCookieHeader) return [];
  return combinedCookieHeader
    .split(/,(?=\s*[!#$%&'*+\-.^_`|~0-9A-Za-z]+=)/g)
    .map((item) => item.trim())
    .filter(Boolean);
};

const readCookieValueFromSetCookieHeaders = (setCookieHeaders = [], candidateNames = []) => {
  const loweredCandidates = candidateNames
    .map((name) => normalizeCookieName(name))
    .filter(Boolean);
  for (const raw of setCookieHeaders) {
    const firstPair = String(raw || "").split(";")[0] || "";
    const idx = firstPair.indexOf("=");
    if (idx < 0) continue;
    const name = normalizeCookieName(firstPair.slice(0, idx));
    const value = firstPair.slice(idx + 1).trim();
    if (!name || !value) continue;
    if (!loweredCandidates.includes(name)) continue;
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }
  return "";
};

const normalizeCookieName = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^__(host|secure)-/i, "");

const getRequestHost = (request) =>
  String(request?.headers?.get?.("x-forwarded-host") || request?.headers?.get?.("host") || "")
    .trim();

const normalizeHost = (host) => String(host || "").trim().replace(/:\d+$/, "").toLowerCase();

const isIpHost = (host) => {
  const value = normalizeHost(host);
  if (!value) return false;
  if (value.includes(":")) return true; // IPv6
  return /^(?:\d{1,3}\.){3}\d{1,3}$/.test(value);
};

const isLoopbackHost = (host) => {
  const value = normalizeHost(host);
  return value === "localhost" || value === "::1" || /^127(?:\.\d{1,3}){3}$/.test(value);
};

const domainMatchesHost = (domain, host) => {
  const safeHost = normalizeHost(host);
  const safeDomain = String(domain || "").trim().replace(/^\./, "").toLowerCase();
  if (!safeHost || !safeDomain) return false;
  return safeHost === safeDomain || safeHost.endsWith(`.${safeDomain}`);
};

const normalizeSameSiteValue = (value) => {
  const raw = String(value || "").trim();
  const lowered = raw.toLowerCase();
  if (lowered === "none") return "None";
  if (lowered === "lax") return "Lax";
  if (lowered === "strict") return "Strict";
  return raw || "Lax";
};

const getClearCookieDomains = (request, cookieOptions) => {
  const domains = new Set([""]);
  const host = normalizeHost(getRequestHost(request));

  if (host && !isIpHost(host) && !isLoopbackHost(host)) {
    domains.add(host);
    const maybeParent = host.includes(".") ? `.${host.split(".").slice(-2).join(".")}` : "";
    if (maybeParent) domains.add(maybeParent);
  }

  const configuredDomain = sanitizeCookieDomain(process.env.NEXT_PUBLIC_COOKIE_DOMAIN || "");
  if (configuredDomain && domainMatchesHost(configuredDomain, host)) {
    domains.add(configuredDomain);
  }
  if (cookieOptions?.domain && domainMatchesHost(cookieOptions.domain, host)) {
    domains.add(cookieOptions.domain);
  }

  return Array.from(domains);
};

const buildExpiredCookieLine = (name, domain, cookieOptions) => {
  const safeName = String(name || "").trim();
  if (!safeName) return "";
  const sameSite = normalizeSameSiteValue(cookieOptions?.sameSite || "Lax");
  const secure = typeof cookieOptions?.secure === "boolean" ? cookieOptions.secure : false;
  const parts = [
    `${safeName}=`,
    "Path=/",
    "Max-Age=0",
    "Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    `SameSite=${sameSite}`,
  ];
  if (domain) parts.push(`Domain=${domain}`);
  if (secure) parts.push("Secure");
  return parts.join("; ");
};

const appendClearAuthCookies = (headers, request, cookieOptions) => {
  const domains = getClearCookieDomains(request, cookieOptions);
  for (const name of CLEAR_AUTH_COOKIE_KEYS) {
    for (const domain of domains) {
      const line = buildExpiredCookieLine(name, domain, cookieOptions);
      if (line) headers.append("set-cookie", line);
    }
  }
};

const hasAuthCookiesInHeader = (cookieHeader) => {
  const source = String(cookieHeader || "").trim();
  if (!source) return false;
  const allowed = new Set(CLEAR_AUTH_COOKIE_KEYS.map(normalizeCookieName));
  const parts = source.split("; ");
  for (const part of parts) {
    const idx = part.indexOf("=");
    if (idx < 0) continue;
    const name = normalizeCookieName(part.slice(0, idx));
    if (allowed.has(name)) return true;
  }
  return false;
};

const getCookieValueFromHeader = (cookieHeader, key) => {
  const source = String(cookieHeader || "");
  if (!source) return "";
  const target = normalizeCookieName(key);
  const parts = source.split("; ");
  for (const part of parts) {
    const idx = part.indexOf("=");
    if (idx < 0) continue;
    const name = part.slice(0, idx).trim();
    const normalizedName = normalizeCookieName(name);
    if (normalizedName !== target) continue;
    return part.slice(idx + 1).trim();
  }
  return "";
};

const hasRefreshCookie = (cookieHeader) => {
  const source = String(cookieHeader || "");
  if (!source) return false;
  const parts = source.split("; ");
  for (const part of parts) {
    const idx = part.indexOf("=");
    if (idx < 0) continue;
    const rawName = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (!value) continue;
    const name = normalizeCookieName(rawName);
    if (!name) continue;
    if (
      name === "refresh_token_property" ||
      name === "refresh_token" ||
      name === "refreshtoken" ||
      name === "refreshtoken_property" ||
      name === "property_refresh_token" ||
      name.startsWith("refresh_token") ||
      name.includes("refresh_token")
    ) {
      return true;
    }
  }
  return false;
};

const resolveCsrfHeaderValue = (incomingHeader, cookieHeader) => {
  const fromHeader = String(incomingHeader || "").trim();
  if (fromHeader) return fromHeader;

  for (const key of CSRF_COOKIE_KEYS) {
    const fromCookieRaw = getCookieValueFromHeader(cookieHeader, key);
    if (!fromCookieRaw) continue;
    try {
      return decodeURIComponent(fromCookieRaw);
    } catch {
      return fromCookieRaw;
    }
  }
  return "";
};

const readTokenFromPayload = (payload = {}, headers = null) => {
  const data = payload?.data || {};
  const tokenObj = data?.token || payload?.token || {};
  const headerAuth = String(
    headers?.get("authorization") ||
      headers?.get("Authorization") ||
      ""
  ).trim();
  const responseHeaderToken = /^bearer\s+/i.test(headerAuth)
    ? headerAuth.replace(/^bearer\s+/i, "").trim()
    : headerAuth;
  const rawHeader = String(
    payload?.authorization ||
      payload?.Authorization ||
      data?.authorization ||
      data?.Authorization ||
      ""
  ).trim();
  const payloadHeaderToken = /^bearer\s+/i.test(rawHeader)
    ? rawHeader.replace(/^bearer\s+/i, "").trim()
    : rawHeader;
  return String(
    payload?.accessToken ||
      payload?.access_token ||
      data?.accessToken ||
      data?.access_token ||
      tokenObj?.accessToken ||
      tokenObj?.access_token ||
      tokenObj?.token ||
      tokenObj?.jwt ||
      payload?.jwt ||
      data?.jwt ||
      payloadHeaderToken ||
      responseHeaderToken ||
      ""
  ).trim();
};

const readExpiresInFromPayload = (payload = {}) => {
  const data = payload?.data || {};
  const value = payload?.expiresIn ?? payload?.expires_in ?? data?.expiresIn ?? data?.expires_in;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
};

const readCsrfFromPayload = (payload = {}, headers = null) => {
  const data = payload?.data || {};
  const tokenObj = data?.token || payload?.token || {};
  const token = String(
    payload?.csrf_token_property ||
      data?.csrf_token_property ||
    payload?.csrfToken ||
      payload?.csrf_token ||
      data?.csrfToken ||
      data?.csrf_token ||
      tokenObj?.csrfToken ||
      tokenObj?.csrf_token ||
      headers?.get("x-csrf-token") ||
      headers?.get("csrf-token") ||
      headers?.get("x-xsrf-token") ||
      ""
  ).trim();
  return token;
};

const readRefreshTokenFromPayload = (payload = {}) => {
  const data = payload?.data || {};
  const tokenObj = data?.token || payload?.token || {};
  return String(
    payload?.refreshToken ||
      payload?.refresh_token ||
      data?.refreshToken ||
      data?.refresh_token ||
      tokenObj?.refreshToken ||
      tokenObj?.refresh_token ||
      ""
  ).trim();
};

export async function POST(request) {
  const cookieOptions = getCookieOptions(request);
  const upstreamUrl = `${API_REMOTE_BASE_URL}/auth/refresh`;
  ssoDebugLog("refresh.attempt", { route: "/api/auth/refresh" });

  const incomingCookie = String(request.headers.get("cookie") || "").trim();
  const hasAuthCookies = hasAuthCookiesInHeader(incomingCookie);
  const hasRefreshCookieInRequest = hasRefreshCookie(incomingCookie);
  if (!hasRefreshCookie(incomingCookie)) {
    ssoDebugLog("refresh.failure", { route: "/api/auth/refresh", status: 401 });
    const responseHeaders = new Headers();
    if (hasAuthCookies) {
      appendClearAuthCookies(responseHeaders, request, cookieOptions);
      validateSetCookieHeadersRuntime(responseHeaders);
    }
    return NextResponse.json(
      {
        error: {
          code: "INVALID_REFRESH_TOKEN",
          message: "Invalid refresh session",
        },
      },
      { status: 401, headers: responseHeaders }
    );
  }

  // --- Dedup: prevent concurrent refresh with the same token ---
  const fingerprint = getRefreshFingerprint(incomingCookie);
  if (fingerprint) {
    const existing = _refreshDedup.get(fingerprint);
    if (existing) {
      // Wait for in-flight request if it exists and isn't too old
      if (existing.promise && existing.startedAt && Date.now() - existing.startedAt < 30000) {
        try { await existing.promise; } catch {}
      }
      const entry = _refreshDedup.get(fingerprint);
      if (entry?.completedAt && Date.now() - entry.completedAt < REFRESH_DEDUP_TTL_MS && entry.ok) {
        ssoDebugLog("refresh.deduplicated", { route: "/api/auth/refresh" });
        return NextResponse.json(
          { success: true, deduplicated: true },
          { status: 200, headers: { "cache-control": "no-store" } }
        );
      }
    }
  }

  // Register this request as in-flight for dedup
  let _dedupResolve;
  if (fingerprint) {
    const _dedupPromise = new Promise((r) => { _dedupResolve = r; });
    _refreshDedup.set(fingerprint, { promise: _dedupPromise, resolve: _dedupResolve, startedAt: Date.now() });
  }
  const _completeDedup = (ok) => {
    if (!fingerprint) return;
    const entry = _refreshDedup.get(fingerprint);
    _refreshDedup.set(fingerprint, { completedAt: Date.now(), ok });
    entry?.resolve?.();
    if (ok) _lastSuccessfulRefreshAt = Date.now();
  };

  const incomingAuthorizationRaw = String(
    request.headers.get("authorization") || request.headers.get("Authorization") || ""
  ).trim();
  const incomingAuthorization = isValidAuthorizationHeader(incomingAuthorizationRaw)
    ? incomingAuthorizationRaw
    : "";
  const incomingCsrfHeader = String(
    request.headers.get("x-csrf-token") ||
      request.headers.get("x-xsrf-token") ||
      request.headers.get("csrf-token") ||
      ""
  ).trim();
  const incomingCsrf = resolveCsrfHeaderValue(incomingCsrfHeader, incomingCookie);

  let requestBody = "";
  try {
    requestBody = await request.text();
  } catch {
    requestBody = "";
  }

  let parsedBody = {};
  if (requestBody) {
    try {
      parsedBody = JSON.parse(requestBody) || {};
    } catch {
      parsedBody = {};
    }
  }
  const productKey = PRODUCT_KEY;

  let upstreamResponse = null;
  let networkError = null;
  const headers = new Headers();
  headers.set("content-type", "application/json");
  headers.set("x-product-key", productKey);
  if (incomingAuthorization) headers.set("authorization", incomingAuthorization);
  if (incomingCsrf) headers.set("x-csrf-token", incomingCsrf);
  if (incomingCookie) headers.set("cookie", incomingCookie);

  const body = JSON.stringify({
    ...(parsedBody && typeof parsedBody === "object" ? parsedBody : {}),
    product_key: productKey,
  });

  try {
    upstreamResponse = await fetch(upstreamUrl, {
      method: "POST",
      headers,
      body,
      cache: "no-store",
    });
  } catch (err) {
    networkError = err;
    upstreamResponse = null;
  }

  // CSRF may be stale; retry refresh once without CSRF before failing.
  if (
    upstreamResponse &&
    [401, 403].includes(Number(upstreamResponse.status || 0)) &&
    incomingCsrf
  ) {
    const noCsrfHeaders = new Headers(headers);
    noCsrfHeaders.delete("x-csrf-token");
    try {
      const noCsrfResponse = await fetch(upstreamUrl, {
        method: "POST",
        headers: noCsrfHeaders,
        body,
        cache: "no-store",
      });
      if (noCsrfResponse.ok) {
        upstreamResponse = noCsrfResponse;
      }
    } catch {
      // Keep original response if no-CSRF retry fails.
    }
  }

  if (!upstreamResponse) {
    _completeDedup(false);
    ssoDebugLog("refresh.failure", { route: "/api/auth/refresh", status: 502 });
    return NextResponse.json(
      {
        error: {
          code: "UPSTREAM_REFRESH_UNAVAILABLE",
          message: "Unable to reach auth refresh upstream",
          ...(networkError ? { details: "network_error" } : {}),
        },
      },
      { status: 502 }
    );
  }

  const responseHeaders = new Headers();
  const contentType = upstreamResponse.headers.get("content-type");
  if (contentType) responseHeaders.set("content-type", contentType);
  appendSetCookieHeaders(responseHeaders, upstreamResponse.headers);
  validateSetCookieHeadersRuntime(responseHeaders);

  let payloadText = "";
  try {
    payloadText = await upstreamResponse.text();
  } catch {
    payloadText = "";
  }

  let payloadJson = {};
  if (payloadText) {
    try {
      payloadJson = JSON.parse(payloadText);
    } catch {
      payloadJson = {};
    }
  }

  const expiresIn = readExpiresInFromPayload(payloadJson);
  const csrfToken = readCsrfFromPayload(payloadJson, upstreamResponse.headers);

  // Cookie-based auth: backend may set access token only via Set-Cookie.
  // Treat upstream 2xx as success even when token is not exposed in body.
  if (upstreamResponse.ok) {
    const accessToken = readTokenFromPayload(payloadJson, upstreamResponse.headers);
    const setCookies = getSetCookieList(responseHeaders);
    const refreshTokenFromPayload = readRefreshTokenFromPayload(payloadJson);
    const refreshTokenFromCookie = readCookieValueFromSetCookieHeaders(setCookies, [
      "refresh_token_property",
      "refresh_token",
      "refreshToken_property",
      "refreshToken",
      "property_refresh_token",
    ]);
    const csrfTokenFromCookie = readCookieValueFromSetCookieHeaders(setCookies, [
      "csrf_token_property",
      "csrf_token",
      "csrfToken",
      "csrfToken_property",
      "property_csrf_token",
      "csrf-token",
      "csrftoken",
      "xsrf-token",
      "x-xsrf-token",
      "XSRF-TOKEN",
      "X-XSRF-TOKEN",
      "XSRF_TOKEN",
      "_csrf",
    ]);
    const resolvedRefreshToken = refreshTokenFromPayload || refreshTokenFromCookie;
    const resolvedCsrfToken = csrfToken || csrfTokenFromCookie;
    const response = NextResponse.json(
      {
        ...(accessToken ? { accessToken } : {}),
        ...(accessToken ? { access_token: accessToken } : {}),
        ...(resolvedCsrfToken ? { csrfToken: resolvedCsrfToken } : {}),
        ...(expiresIn != null ? { expiresIn } : {}),
        success: true,
      },
      {
        status: 200,
        headers: responseHeaders,
      }
    );

    if (accessToken) {
      response.headers.set("authorization", `Bearer ${accessToken}`);
    }
    if (resolvedRefreshToken) {
      response.cookies.set({
        name: "refresh_token_property",
        value: resolvedRefreshToken,
        httpOnly: true,
        sameSite: cookieOptions.sameSite,
        secure: cookieOptions.secure,
        path: "/",
        ...(cookieOptions?.domain ? { domain: cookieOptions.domain } : {}),
      });
    }
    if (resolvedCsrfToken) {
      response.cookies.set({
        name: "csrf_token_property",
        value: resolvedCsrfToken,
        httpOnly: false,
        sameSite: cookieOptions.sameSite,
        secure: cookieOptions.secure,
        path: "/",
        ...(cookieOptions?.domain ? { domain: cookieOptions.domain } : {}),
      });
    }

    ssoDebugLog("refresh.success", {
      route: "/api/auth/refresh",
      status: 200,
      hasAccessToken: Boolean(accessToken),
    });
    _completeDedup(true);
    return response;
  }

  const status = Number(upstreamResponse.status || 0);
  const invalidRefresh = [401, 403].includes(status);
  // Guard: don't clear cookies if a recent refresh just succeeded (likely race condition)
  const isRecentSuccessfulRefresh = Date.now() - _lastSuccessfulRefreshAt < REFRESH_DEDUP_TTL_MS;
  const shouldClear = hasRefreshCookieInRequest && [401, 403, 404, 410].includes(status) && !isRecentSuccessfulRefresh;
  if (shouldClear) {
    appendClearAuthCookies(responseHeaders, request, cookieOptions);
    validateSetCookieHeadersRuntime(responseHeaders);
  }
  const upstreamErrorCode = String(
    payloadJson?.error?.code || payloadJson?.code || ""
  ).trim();
  const upstreamErrorMessage = String(
    payloadJson?.error?.message || payloadJson?.message || ""
  ).trim();
  ssoDebugLog("refresh.failure", {
    route: "/api/auth/refresh",
    status: invalidRefresh ? 401 : Number(upstreamResponse.status || 0),
  });
  _completeDedup(false);
  return NextResponse.json(
    {
      error: {
        code:
          upstreamErrorCode ||
          (invalidRefresh ? "INVALID_REFRESH_TOKEN" : "REFRESH_FAILED"),
        message:
          upstreamErrorMessage ||
          (invalidRefresh ? "Invalid refresh session" : "Refresh failed"),
      },
    },
    {
      status: invalidRefresh ? 401 : Number(upstreamResponse.status || 401),
      headers: responseHeaders,
    }
  );
}





