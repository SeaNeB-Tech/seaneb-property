import { NextResponse } from "next/server";

const REFRESH_COOKIE_KEYS = [
  "refresh_token_property",
  "refresh_token",
  "refreshToken",
  "refreshToken_property",
  "property_refresh_token",
];

const ACCESS_COOKIE_KEYS = [
  "access_token",
  "accessToken",
  "auth_session",
];

const normalizeCookieName = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^__(host|secure)-/i, "");

const hasAnyExactCookie = (request, names = []) =>
  names.some((name) => Boolean(String(request.cookies.get(name)?.value || "").trim()));

const hasAnyPrefixedCookie = (request, prefixes = []) => {
  const cookies = request.cookies.getAll();
  if (!cookies.length) return false;
  return cookies.some((cookie) => {
    const name = normalizeCookieName(cookie?.name || "");
    const value = String(cookie?.value || "").trim();
    if (!name || !value) return false;
    return prefixes.some((prefix) => {
      const safePrefix = normalizeCookieName(prefix || "");
      if (!safePrefix) return false;
      return (
        name === safePrefix ||
        name.startsWith(`${safePrefix}_`) ||
        name.startsWith(safePrefix) ||
        name.includes(safePrefix)
      );
    });
  });
};

const hasSessionCookie = (request) =>
  hasAnyExactCookie(request, [...REFRESH_COOKIE_KEYS, ...ACCESS_COOKIE_KEYS]) ||
  hasAnyPrefixedCookie(request, [...REFRESH_COOKIE_KEYS, ...ACCESS_COOKIE_KEYS]);

const hasValidatedSession = async (request) => {
  try {
    const response = await fetch(new URL("/api/auth/me", request.url), {
      method: "GET",
      headers: {
        cookie: String(request.headers.get("cookie") || ""),
        "x-product-key": String(process.env.NEXT_PUBLIC_PRODUCT_KEY || "property").trim() || "property",
      },
      cache: "no-store",
    });
    return response.ok;
  } catch {
    return false;
  }
};

const redirectToAuthLogin = (request) => {
  const authAppBaseUrl = String(process.env.NEXT_PUBLIC_AUTH_APP_URL || "").trim().replace(/\/+$/, "");
  if (!authAppBaseUrl) {
    const fallbackLoginUrl = new URL("/auth/login", request.url);
    fallbackLoginUrl.searchParams.set("returnTo", request.nextUrl.href);
    return NextResponse.redirect(fallbackLoginUrl, { status: 307 });
  }

  const loginUrl = new URL(`${authAppBaseUrl}/auth/login`);
  loginUrl.searchParams.set("returnTo", request.nextUrl.href);
  return NextResponse.redirect(loginUrl, { status: 307 });
};

export async function middleware(request) {
  const hasSession = hasSessionCookie(request) || (await hasValidatedSession(request));
  if (!hasSession) {
    return redirectToAuthLogin(request);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
