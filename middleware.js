import { NextResponse } from "next/server";

const normalizeUrl = (value) => String(value || "").replace(/\/+$/, "");

const AUTH_APP_BASE_URL = normalizeUrl(
  process.env.NEXT_PUBLIC_AUTH_APP_URL || "http://localhost:3000"
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
