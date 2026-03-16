import { NextResponse } from "next/server";

const REFRESH_COOKIE_KEYS = [
  "refresh_token_property",
  "refresh_token",
  "refreshToken",
  "refreshToken_property",
  "property_refresh_token",
  "refreshtoken",
  "refreshtoken_property",
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
    const name = normalizeCookieName(part.slice(0, idx));
    if (name !== target) continue;
    return part.slice(idx + 1).trim();
  }
  return "";
};

const hasAnyRefreshCookie = (cookieHeader) => {
  for (const key of REFRESH_COOKIE_KEYS) {
    if (String(getCookieValueFromHeader(cookieHeader, key) || "").trim()) {
      return true;
    }
  }
  return false;
};

const hasAnyCsrfCookie = (cookieHeader) => {
  for (const key of CSRF_COOKIE_KEYS) {
    if (String(getCookieValueFromHeader(cookieHeader, key) || "").trim()) {
      return true;
    }
  }
  return false;
};

export async function GET(request) {
  const cookieHeader = String(request.headers.get("cookie") || "").trim();
  const hasRefreshSession = hasAnyRefreshCookie(cookieHeader);
  const hasCsrfCookie = hasAnyCsrfCookie(cookieHeader);

  return NextResponse.json(
    {
      success: true,
      hasRefreshSession,
      hasCsrfCookie,
    },
    {
      status: 200,
      headers: {
        "cache-control": "no-store",
      },
    }
  );
}

