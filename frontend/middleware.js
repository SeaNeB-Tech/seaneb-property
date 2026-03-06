import { NextResponse } from "next/server";

const toBool = (value) => {
  if (value === true) return true;
  if (value === false || value == null) return false;
  const normalized = String(value).trim().toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes";
};

const readProfilePayload = (payload) => {
  const profile =
    payload?.data?.profile ||
    payload?.data?.user ||
    payload?.data ||
    payload?.profile ||
    payload?.user ||
    payload;
  return profile && typeof profile === "object" ? profile : null;
};

const hasBusinessFromProfile = (profile) => {
  const data = profile || {};

  if (toBool(data.is_business_registered)) return true;
  if (toBool(data.has_business) || toBool(data.business_registered) || toBool(data.is_business)) {
    return true;
  }
  if (typeof data.business_count === "number" && data.business_count > 0) return true;

  if (
    data.business_id ||
    data.business_uuid ||
    data.branch_id ||
    data.branch_uuid ||
    data.broker_id ||
    data.company_id
  ) {
    return true;
  }

  if (Array.isArray(data.businesses) && data.businesses.length > 0) return true;
  if (Array.isArray(data.user_businesses) && data.user_businesses.length > 0) return true;
  if (Array.isArray(data.branches) && data.branches.length > 0) return true;
  if (Array.isArray(data.user_branches) && data.user_branches.length > 0) return true;

  return false;
};

const getValidatedSessionState = async (request) => {
  try {
    const response = await fetch(new URL("/api/auth/me", request.url), {
      method: "GET",
      headers: {
        cookie: String(request.headers.get("cookie") || ""),
        "x-product-key": String(process.env.NEXT_PUBLIC_PRODUCT_KEY || "property").trim() || "property",
      },
      cache: "no-store",
    });
    if (!response.ok) {
      return { authenticated: false, hasBusiness: false };
    }

    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    const profile = readProfilePayload(payload);
    return {
      authenticated: true,
      hasBusiness: hasBusinessFromProfile(profile || {}),
    };
  } catch {
    return { authenticated: false, hasBusiness: false };
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
  const sessionState = await getValidatedSessionState(request);
  const hasSession = sessionState.authenticated;

  if (!hasSession) {
    return redirectToAuthLogin(request);
  }

  if (!sessionState.hasBusiness) {
    const authAppBaseUrl = String(process.env.NEXT_PUBLIC_AUTH_APP_URL || "").trim().replace(/\/+$/, "");
    if (authAppBaseUrl) {
      const registerUrl = new URL(`${authAppBaseUrl}/auth/business-register`);
      registerUrl.searchParams.set("returnTo", request.nextUrl.href);
      return NextResponse.redirect(registerUrl, { status: 307 });
    }

    const localRegisterUrl = new URL("/home", request.url);
    return NextResponse.redirect(localRegisterUrl, { status: 307 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
