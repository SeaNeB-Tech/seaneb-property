import { NextResponse } from "next/server";

const normalizeUrl = (value) => String(value || "").replace(/\/+$/, "");
const normalizeAuthAppUrl = (value) => {
  const normalized = normalizeUrl(value);
  if (!normalized) return normalized;
  try {
    const parsed = new URL(normalized);
    if (parsed.port === "3000" || parsed.port === "8877" || parsed.port === "1001") {
      parsed.port = "1002";
      return normalizeUrl(parsed.toString());
    }
  } catch {
    return normalized;
  }
  return normalized;
};

const AUTH_APP_BASE_URL = normalizeAuthAppUrl(
  process.env.NEXT_PUBLIC_AUTH_APP_URL || "http://159.65.154.221:1002"
);
const REFRESH_COOKIE_KEYS = [
  "refresh_token_property",
  "refresh_token_auto",
  "refresh_token",
  "auth_session",
  "auth_session_property",
  "csrf_token_property",
];

const hasAnyCookie = (request, names = []) =>
  names.some((name) => Boolean(String(request.cookies.get(name)?.value || "").trim()));

const hasSessionCookie = (request) => {
  const refreshToken = hasAnyCookie(request, REFRESH_COOKIE_KEYS);
  return Boolean(refreshToken);
};

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Dashboard auth is enforced client-side via /auth/me + refresh flow.
  // Edge cookie checks are unreliable when auth cookies are scoped to /api paths.
  if (pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  // Allow requests with valid session to proceed.
  if (hasSessionCookie(request)) {
    return NextResponse.next();
  }

  // Avoid redirect loop - check if already coming from auth app
  const referer = request.headers.get("referer") || "";
  const isFromAuthApp = referer.includes(normalizeUrl(AUTH_APP_BASE_URL));
  
  // If coming from auth app and still no session, likely auth failed - let it through
  if (isFromAuthApp) {
    return NextResponse.next();
  }

  // Redirect to login only once
  const loginUrl = new URL(`${AUTH_APP_BASE_URL}/auth/login`);
  loginUrl.searchParams.set("returnTo", request.nextUrl.href);
  return NextResponse.redirect(loginUrl, { status: 307 });
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
