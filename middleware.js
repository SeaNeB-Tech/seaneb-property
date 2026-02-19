import { NextResponse } from "next/server";

const normalizeUrl = (value) => String(value || "").replace(/\/+$/, "");
const normalizeAuthAppUrl = (value) => {
  const normalized = normalizeUrl(value);
  if (!normalized) return normalized;
  try {
    const parsed = new URL(normalized);
    if (parsed.port === "3000" || parsed.port === "1001") {
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

const hasSessionCookie = (request) => {
  const cookies = request.cookies.getAll();
  return cookies.some((cookie) => {
    const name = String(cookie?.name || "").toLowerCase();
    if (!name) return false;
    return name === "access_token" || name.startsWith("access_token_");
  });
};

export function middleware(request) {
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
