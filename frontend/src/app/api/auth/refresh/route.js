import { NextResponse } from "next/server";
import { API_REMOTE_BASE_URL } from "@/lib/core/apiBaseUrl";
import {
  validateCookiePolicyRuntime,
  validateSetCookieHeadersRuntime,
} from "@/lib/auth/cookieRuntimeSafety";
import { ssoDebugLog } from "@/lib/observability/ssoDebug";

const PRODUCT_KEY =
  String(process.env.NEXT_PUBLIC_PRODUCT_KEY || "").trim() || "property";

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
const CSRF_COOKIE_SECURE = process.env.NODE_ENV === "production";

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
  const upstreamUrl = `${API_REMOTE_BASE_URL}/auth/refresh`;
  ssoDebugLog("refresh.attempt", { route: "/api/auth/refresh" });

  const incomingCookie = String(request.headers.get("cookie") || "").trim();
  if (!hasRefreshCookie(incomingCookie)) {
    ssoDebugLog("refresh.failure", { route: "/api/auth/refresh", status: 401 });
    return NextResponse.json(
      {
        error: {
          code: "INVALID_REFRESH_TOKEN",
          message: "Invalid refresh session",
        },
      },
      { status: 401 }
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
        sameSite: COOKIE_SAME_SITE,
        secure: COOKIE_SECURE,
        path: "/",
        ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
      });
    }
    if (csrfToken) {
      response.cookies.set({
        name: "csrf_token_property",
        value: csrfToken,
        httpOnly: false,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
        path: "/",
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

  const invalidRefresh = [401, 403].includes(Number(upstreamResponse.status || 0));
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

