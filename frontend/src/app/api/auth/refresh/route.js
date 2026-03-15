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
  return "none";
};
const COOKIE_SAME_SITE = normalizeSameSite(process.env.NEXT_PUBLIC_COOKIE_SAMESITE);
const COOKIE_SECURE = IS_PRODUCTION;
const CSRF_COOKIE_SAME_SITE = "none";
const CSRF_COOKIE_SECURE = COOKIE_SECURE;

validateCookiePolicyRuntime({
  refreshSecure: COOKIE_SECURE,
  refreshSameSite: COOKIE_SAME_SITE,
  csrfSecure: CSRF_COOKIE_SECURE,
  csrfSameSite: CSRF_COOKIE_SAME_SITE,
});

const appendSetCookieHeaders = (targetHeaders, upstreamHeaders) => {
  const getSetCookie = upstreamHeaders?.getSetCookie;
  if (typeof getSetCookie === "function") {
    const cookies = getSetCookie.call(upstreamHeaders) || [];
    for (const cookie of cookies) {
      if (!cookie) continue;
      if (/^\s*access_token=/i.test(cookie)) continue;
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
    if (/^\s*access_token=/i.test(cookie)) continue;
    targetHeaders.append("set-cookie", cookie);
  }
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
  const sameSite = normalizeSameSiteValue(cookieOptions?.sameSite || (COOKIE_SECURE ? "None" : "Lax"));
  const secure = typeof cookieOptions?.secure === "boolean" ? cookieOptions.secure : COOKIE_SECURE;
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

  const fromCookieRaw =
    getCookieValueFromHeader(cookieHeader, "csrf_token_property");
  if (!fromCookieRaw) return "";
  try {
    return decodeURIComponent(fromCookieRaw);
  } catch {
    return fromCookieRaw;
  }
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
  const token = String(
    payload?.csrfToken ||
      payload?.csrf_token ||
      data?.csrfToken ||
      data?.csrf_token ||
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

  const incomingAuthorizationRaw = String(
    request.headers.get("authorization") || request.headers.get("Authorization") || ""
  ).trim();
  const incomingAuthorization = isValidAuthorizationHeader(incomingAuthorizationRaw)
    ? incomingAuthorizationRaw
    : "";
  const incomingCsrf = resolveCsrfHeaderValue(
    String(request.headers.get("x-csrf-token") || "").trim(),
    incomingCookie
  );

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
    const response = NextResponse.json(
      {
        ...(accessToken ? { accessToken } : {}),
        ...(accessToken ? { access_token: accessToken } : {}),
        ...(csrfToken ? { csrfToken } : {}),
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
    const refreshToken = readRefreshTokenFromPayload(payloadJson);
    if (refreshToken) {
      response.cookies.set({
        name: "refresh_token_property",
        value: refreshToken,
        httpOnly: true,
        sameSite: cookieOptions.sameSite,
        secure: cookieOptions.secure,
        path: "/",
        ...(cookieOptions?.domain ? { domain: cookieOptions.domain } : {}),
      });
    }
    if (csrfToken) {
      response.cookies.set({
        name: "csrf_token_property",
        value: csrfToken,
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
    response.cookies.delete("access_token");

    return response;
  }

  const status = Number(upstreamResponse.status || 0);
  const invalidRefresh = [401, 403].includes(status);
  const shouldClear = hasAuthCookies && [401, 403, 404, 410].includes(status);
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





