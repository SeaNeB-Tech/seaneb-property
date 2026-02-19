import { NextResponse } from "next/server";

const AUTH_APP_BASE_URL = (process.env.NEXT_PUBLIC_AUTH_APP_URL || "http://localhost:1002").replace(
  /\/+$/,
  ""
);
const IS_DEVELOPMENT = process.env.NODE_ENV !== "production";

const hasSessionCookie = (request) => {
  const cookies = request.cookies.getAll();
  return cookies.some((cookie) => {
    const name = String(cookie?.name || "").toLowerCase();
    if (!name) return false;
    return name === "access_token" || name === "refresh_token" || name.startsWith("access_token_") || name.startsWith("refresh_token_");
  });
};

export function middleware(request) {
  // In local multi-app dev (localhost:1002 + localhost:1001), auth cookies can be
  // scoped in ways that are available to /api refresh calls but not reliably visible
  // at page middleware time. Avoid hard redirect loops to auth app in dev.
  if (IS_DEVELOPMENT) {
    return NextResponse.next();
  }

  if (hasSessionCookie(request)) {
    return NextResponse.next();
  }

  const loginUrl = new URL(`${AUTH_APP_BASE_URL}/auth/login`);
  loginUrl.searchParams.set("returnTo", request.nextUrl.href);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
