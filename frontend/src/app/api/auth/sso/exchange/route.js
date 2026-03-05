import { NextResponse } from "next/server";
import { API_REMOTE_BASE_URL, API_REMOTE_FALLBACK_BASE_URL } from "@/lib/core/apiBaseUrl";
import { createHash } from "node:crypto";

const PRODUCT_KEY = String(process.env.NEXT_PUBLIC_PRODUCT_KEY || "property").trim() || "property";
const BRIDGE_REPLAY_CACHE_TTL_MS = 2 * 60_000;
const bridgeReplayCache = new Map();
const IS_PRODUCTION = String(process.env.NODE_ENV || "").trim() === "production";
const COOKIE_SECURE = IS_PRODUCTION;
const COOKIE_SAME_SITE = IS_PRODUCTION ? "none" : "lax";

const tokenDigest = (value) =>
  createHash("sha256").update(String(value || ""), "utf8").digest("hex");

const cleanupReplayCache = () => {
  const now = Date.now();
  for (const [digest, expiresAt] of bridgeReplayCache.entries()) {
    if (expiresAt <= now) {
      bridgeReplayCache.delete(digest);
    }
  }
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

  for (const cookie of splitCookies) {
    targetHeaders.append("set-cookie", cookie);
  }
};

const readAccessTokenFromPayload = (payload = {}, headers = null) => {
  const data = payload?.data || {};
  const tokenObj = data?.token || payload?.token || {};
  const headerAuth = String(
    headers?.get("authorization") ||
      headers?.get("Authorization") ||
      ""
  ).trim();
  const headerToken = /^bearer\s+/i.test(headerAuth)
    ? headerAuth.replace(/^bearer\s+/i, "").trim()
    : headerAuth;

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
      headerToken ||
      ""
  ).trim();
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

const readExpiresInFromPayload = (payload = {}) => {
  const data = payload?.data || {};
  const value = payload?.expiresIn ?? payload?.expires_in ?? data?.expiresIn ?? data?.expires_in;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
};

const buildUpstreamCandidates = () => {
  const bases = Array.from(
    new Set([API_REMOTE_BASE_URL, API_REMOTE_FALLBACK_BASE_URL].filter(Boolean))
  );

  const urls = [];
  for (const base of bases) {
    const normalized = String(base).trim().replace(/\/+$/, "");
    if (!normalized) continue;
    urls.push(`${normalized}/sso/exchange`);
    urls.push(`${normalized}/auth/sso/exchange`);
    urls.push(`${normalized}/v1/sso/exchange`);
  }

  return urls;
};

const tryExchangeUpstream = async ({ headers, body }) => {
  const candidates = buildUpstreamCandidates();
  if (!candidates.length) return null;

  let lastResponse = null;
  for (const upstreamUrl of candidates) {
    try {
      const response = await fetch(upstreamUrl, {
        method: "POST",
        headers,
        body,
        cache: "no-store",
      });
      lastResponse = response;
      const status = Number(response.status || 0);
      if (status !== 404 && status !== 405) {
        return response;
      }
    } catch {
      // try next candidate
    }
  }

  return lastResponse;
};

export async function POST(request) {
  cleanupReplayCache();
  let payload = {};
  try {
    payload = await request.json();
  } catch {
    payload = {};
  }

  const bridgeToken = String(
    payload?.bridge_token || payload?.bridgeToken || ""
  ).trim();

  if (!bridgeToken) {
    return NextResponse.json(
      {
        error: {
          code: "BRIDGE_TOKEN_REQUIRED",
          message: "bridge_token is required",
        },
      },
      { status: 400 }
    );
  }

  const digest = tokenDigest(bridgeToken);
  if (bridgeReplayCache.has(digest)) {
    return NextResponse.json(
      {
        error: {
          code: "BRIDGE_TOKEN_REPLAYED",
          message: "bridge_token already exchanged",
        },
      },
      { status: 409 }
    );
  }
  // Mark as in-flight to block concurrent replay attempts.
  bridgeReplayCache.set(digest, Date.now() + BRIDGE_REPLAY_CACHE_TTL_MS);

  const incomingCookie = String(request.headers.get("cookie") || "").trim();
  const headers = new Headers();
  headers.set("content-type", "application/json");
  headers.set("x-product-key", PRODUCT_KEY);
  if (incomingCookie) headers.set("cookie", incomingCookie);

  const body = JSON.stringify({
    bridge_token: bridgeToken,
    target_product_key: PRODUCT_KEY,
    product_key: PRODUCT_KEY,
  });

  const upstreamResponse = await tryExchangeUpstream({ headers, body });
  if (!upstreamResponse) {
    bridgeReplayCache.delete(digest);
    return NextResponse.json(
      {
        error: {
          code: "UPSTREAM_SSO_EXCHANGE_UNAVAILABLE",
          message: "Unable to reach SSO exchange upstream",
        },
      },
      { status: 502 }
    );
  }

  let upstreamPayload = {};
  try {
    upstreamPayload = await upstreamResponse.json();
  } catch {
    upstreamPayload = {};
  }

  const responseHeaders = new Headers();
  appendSetCookieHeaders(responseHeaders, upstreamResponse.headers);

  if (!upstreamResponse.ok) {
    bridgeReplayCache.delete(digest);
    const message = String(
      upstreamPayload?.error?.message || upstreamPayload?.message || "SSO exchange failed"
    ).trim();
    return NextResponse.json(
      {
        error: {
          code: String(upstreamPayload?.error?.code || upstreamPayload?.code || "SSO_EXCHANGE_FAILED"),
          message,
        },
      },
      {
        status: Number(upstreamResponse.status || 400),
        headers: responseHeaders,
      }
    );
  }

  const accessToken = readAccessTokenFromPayload(upstreamPayload, upstreamResponse.headers);
  const refreshToken = readRefreshTokenFromPayload(upstreamPayload);
  const csrfToken = readCsrfFromPayload(upstreamPayload, upstreamResponse.headers);
  const expiresIn = readExpiresInFromPayload(upstreamPayload);

  const response = NextResponse.json(
    {
      success: true,
      ...(accessToken ? { accessToken, access_token: accessToken } : {}),
    },
    {
      status: 200,
      headers: responseHeaders,
    }
  );

  if (accessToken) {
    response.cookies.set({
      name: "access_token",
      value: accessToken,
      httpOnly: true,
      sameSite: COOKIE_SAME_SITE,
      secure: COOKIE_SECURE,
      path: "/",
      ...(expiresIn != null ? { maxAge: Math.max(1, Math.floor(expiresIn)) } : {}),
    });
  }

  if (refreshToken) {
    response.cookies.set({
      name: "refresh_token_property",
      value: refreshToken,
      httpOnly: true,
      sameSite: COOKIE_SAME_SITE,
      secure: COOKIE_SECURE,
      path: "/",
    });
  }

  if (csrfToken) {
    response.cookies.set({
      name: "csrf_token_property",
      value: csrfToken,
      httpOnly: false,
      sameSite: "lax",
      secure: IS_PRODUCTION,
      path: "/",
    });
  }

  return response;
}
