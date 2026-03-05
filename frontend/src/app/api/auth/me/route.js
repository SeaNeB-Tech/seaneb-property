import { NextResponse } from "next/server";
import { API_REMOTE_BASE_URL } from "@/lib/core/apiBaseUrl";

const PRODUCT_KEY =
  String(process.env.NEXT_PUBLIC_PRODUCT_KEY || "").trim() || "property";
const normalizeProductKey = (value) =>
  String(value || "").trim() || PRODUCT_KEY;

const isValidAuthorizationHeader = (value) => {
  const raw = String(value || "").trim();
  if (!raw) return false;
  if (!/^bearer\s+/i.test(raw)) return false;
  const token = raw.replace(/^bearer\s+/i, "").trim();
  if (!token) return false;
  const lowered = token.toLowerCase();
  return !["cookie_session", "null", "undefined", "invalid", "sentinel"].includes(lowered);
};

const getCookieValueFromHeader = (cookieHeader, key) => {
  const source = String(cookieHeader || "");
  if (!source) return "";
  const parts = source.split("; ");
  for (const part of parts) {
    const idx = part.indexOf("=");
    if (idx < 0) continue;
    const name = part.slice(0, idx).trim();
    if (name !== key) continue;
    return part.slice(idx + 1).trim();
  }
  return "";
};

const hasRefreshCookie = (cookieHeader) => {
  const keys = [
    "refresh_token_property",
    "refresh_token",
    "refreshToken",
    "refreshToken_property",
    "property_refresh_token",
  ];
  return keys.some((key) => Boolean(getCookieValueFromHeader(cookieHeader, key)));
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

const readCsrfFromPayload = (payload = {}, headers = null) => {
  const data = payload?.data || {};
  return String(
    payload?.csrfToken ||
      payload?.csrf_token ||
      data?.csrfToken ||
      data?.csrf_token ||
      headers?.get("x-csrf-token") ||
      headers?.get("csrf-token") ||
      headers?.get("x-xsrf-token") ||
      ""
  ).trim();
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

const mergeCookieHeaderWithSetCookie = (cookieHeader, setCookieHeaders = []) => {
  const cookieMap = new Map();
  const incoming = String(cookieHeader || "");
  if (incoming) {
    for (const part of incoming.split(";")) {
      const segment = String(part || "").trim();
      if (!segment) continue;
      const idx = segment.indexOf("=");
      if (idx < 0) continue;
      const name = segment.slice(0, idx).trim();
      const value = segment.slice(idx + 1).trim();
      if (!name) continue;
      cookieMap.set(name, value);
    }
  }

  for (const setCookie of setCookieHeaders) {
    const firstPair = String(setCookie || "").split(";")[0] || "";
    const idx = firstPair.indexOf("=");
    if (idx < 0) continue;
    const name = firstPair.slice(0, idx).trim();
    const value = firstPair.slice(idx + 1).trim();
    if (!name) continue;
    cookieMap.set(name, value);
  }

  return Array.from(cookieMap.entries())
    .map(([name, value]) => `${name}=${value}`)
    .join("; ");
};

export async function GET(request) {
  const upstreamCandidates = [
    `${API_REMOTE_BASE_URL}/profile/me`,
    `${API_REMOTE_BASE_URL}/auth/me`,
  ];
  const incomingProductKey = normalizeProductKey(
    request.headers.get("x-product-key") || request.headers.get("X-Product-Key") || PRODUCT_KEY
  );
  const incomingCookie = String(request.headers.get("cookie") || "").trim();
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

  const headers = new Headers();
  headers.set("x-product-key", incomingProductKey);
  if (incomingAuthorization) headers.set("authorization", incomingAuthorization);
  if (incomingCsrf) headers.set("x-csrf-token", incomingCsrf);
  if (incomingCookie) headers.set("cookie", incomingCookie);
  const cookieBufferHeaders = new Headers();

  let upstreamResponse = null;
  let networkError = null;
  let refreshAttempted = false;
  for (const upstreamUrl of upstreamCandidates) {
    try {
      let response = await fetch(upstreamUrl, {
        method: "GET",
        headers,
        cache: "no-store",
      });

      // If still unauthorized, attempt upstream refresh using refresh cookie and retry once.
      if (
        !refreshAttempted &&
        hasRefreshCookie(incomingCookie) &&
        [401, 403].includes(Number(response.status || 0))
      ) {
        refreshAttempted = true;
        const refreshHeaders = new Headers();
        refreshHeaders.set("content-type", "application/json");
        refreshHeaders.set("x-product-key", incomingProductKey);
        if (incomingAuthorization) refreshHeaders.set("authorization", incomingAuthorization);
        if (incomingCsrf) refreshHeaders.set("x-csrf-token", incomingCsrf);
        if (incomingCookie) refreshHeaders.set("cookie", incomingCookie);

        let refreshResponse = null;
        try {
          refreshResponse = await fetch(`${API_REMOTE_BASE_URL}/auth/refresh`, {
            method: "POST",
            headers: refreshHeaders,
            body: JSON.stringify({ product_key: incomingProductKey }),
            cache: "no-store",
          });
        } catch {
          refreshResponse = null;
        }

        // CSRF can be stale after cross-app auth hops; retry refresh once without CSRF.
        if (
          refreshResponse &&
          [401, 403].includes(Number(refreshResponse.status || 0)) &&
          incomingCsrf
        ) {
          const noCsrfHeaders = new Headers(refreshHeaders);
          noCsrfHeaders.delete("x-csrf-token");
          try {
            const noCsrfRefresh = await fetch(`${API_REMOTE_BASE_URL}/auth/refresh`, {
              method: "POST",
              headers: noCsrfHeaders,
              body: JSON.stringify({ product_key: incomingProductKey }),
              cache: "no-store",
            });
            if (noCsrfRefresh.ok) {
              refreshResponse = noCsrfRefresh;
            }
          } catch {
            // Keep original refresh response.
          }
        }

        if (refreshResponse) {
          appendSetCookieHeaders(cookieBufferHeaders, refreshResponse.headers);

          if (refreshResponse.ok) {
            let refreshPayload = {};
            try {
              refreshPayload = await refreshResponse.json();
            } catch {
              refreshPayload = {};
            }

            const refreshSetCookies = getSetCookieList(refreshResponse.headers);
            const refreshedCookieHeader = mergeCookieHeaderWithSetCookie(
              incomingCookie,
              refreshSetCookies
            );
            const refreshedCsrf =
              readCsrfFromPayload(refreshPayload, refreshResponse.headers) ||
              resolveCsrfHeaderValue("", refreshedCookieHeader) ||
              incomingCsrf;
            const refreshedAccessToken = readTokenFromPayload(refreshPayload, refreshResponse.headers);

            const retryHeaders = new Headers(headers);
            if (refreshedCsrf) retryHeaders.set("x-csrf-token", refreshedCsrf);
            if (refreshedAccessToken) retryHeaders.set("authorization", `Bearer ${refreshedAccessToken}`);
            if (refreshedCookieHeader) retryHeaders.set("cookie", refreshedCookieHeader);

            response = await fetch(upstreamUrl, {
              method: "GET",
              headers: retryHeaders,
              cache: "no-store",
            });
          }
        }
      }
      upstreamResponse = response;
      const status = Number(response.status || 0);
      if (status !== 404 && status !== 405) break;
    } catch (err) {
      networkError = err;
      upstreamResponse = null;
    }
  }

  if (!upstreamResponse) {
    return NextResponse.json(
      {
        error: {
          code: "UPSTREAM_AUTH_ME_UNAVAILABLE",
          message: "Unable to reach auth me upstream",
          ...(networkError ? { details: "network_error" } : {}),
        },
      },
      { status: 502 }
    );
  }

  const responseHeaders = new Headers();
  const contentType = upstreamResponse.headers.get("content-type");
  if (contentType) responseHeaders.set("content-type", contentType);
  appendSetCookieHeaders(responseHeaders, cookieBufferHeaders);
  appendSetCookieHeaders(responseHeaders, upstreamResponse.headers);

  const payload = await upstreamResponse.text();
  return new NextResponse(payload, {
    status: upstreamResponse.status,
    headers: responseHeaders,
  });
}

