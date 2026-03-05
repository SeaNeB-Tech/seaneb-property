import { NextResponse } from "next/server";

const REFRESH_COOKIE_KEYS = [
  "refresh_token_property",
  "refresh_token",
  "refreshToken",
  "refreshToken_property",
  "property_refresh_token",
];

const hasAnyCookie = (request, names = []) =>
  names.some((name) => Boolean(String(request.cookies.get(name)?.value || "").trim()));

const hasSessionCookie = (request) => hasAnyCookie(request, REFRESH_COOKIE_KEYS);

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
