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
  "csrf-token",
  "csrftoken",
  "xsrf-token",
  "x-xsrf-token",
  "XSRF-TOKEN",
  "X-XSRF-TOKEN",
  "XSRF_TOKEN",
  "_csrf",
];

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

const hasAnyCookie = (request, names = []) =>
  names.some((name) => Boolean(String(request.cookies.get(name)?.value || "").trim()));

const hasSessionCookie = (request) => hasAnyCookie(request, REFRESH_COOKIE_KEYS);
const hasCsrfCookie = (request) => hasAnyCookie(request, CSRF_COOKIE_KEYS);

// Throttle refresh attempts to prevent rapid-fire token consumption on multiple hard refreshes
let _lastMiddlewareRefreshAt = 0;
const MIDDLEWARE_REFRESH_THROTTLE_MS = 3000;

const getSetCookieLines = (headers) => {
  const getSetCookie = headers?.getSetCookie;
  if (typeof getSetCookie === "function") {
    return (getSetCookie.call(headers) || []).filter(Boolean);
  }
  const combined = String(headers?.get("set-cookie") || "").trim();
  if (!combined) return [];
  return combined
    .split(/,(?=\s*[!#$%&'*+\-.^_`|~0-9A-Za-z]+=)/g)
    .map((item) => item.trim())
    .filter(Boolean);
};

const getRequestProtocol = (request) => {
  const forwarded = String(request?.headers?.get("x-forwarded-proto") || "").trim().toLowerCase();
  if (forwarded) return forwarded;
  return String(request?.nextUrl?.protocol || "").replace(":", "").trim().toLowerCase();
};

const normalizeHost = (host) => String(host || "").trim().replace(/:\d+$/, "").toLowerCase();

const isLoopbackOrIp = (host) => {
  const value = normalizeHost(host);
  if (!value) return false;
  if (value === "localhost" || value === "::1" || /^127(?:\.\d{1,3}){3}$/.test(value)) return true;
  if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(value)) return true;
  return value.includes(":"); // IPv6
};

const rewriteSetCookieForMiddleware = (cookie, request) => {
  const isSecure = getRequestProtocol(request) === "https";
  const host = normalizeHost(
    request?.headers?.get("x-forwarded-host") || request?.headers?.get("host") || ""
  );

  const parts = String(cookie || "")
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);
  if (!parts.length) return cookie;

  const nameValue = parts[0];
  const attrs = [];
  let domain = "";
  let sameSite = "";
  let hasSecure = false;

  for (const attr of parts.slice(1)) {
    const [rawKey, ...rest] = attr.split("=");
    const key = String(rawKey || "").trim().toLowerCase();
    const value = rest.join("=").trim();

    if (key === "domain") { domain = value; continue; }
    if (key === "samesite") { sameSite = value; continue; }
    if (key === "secure") { hasSecure = true; continue; }
    attrs.push(attr);
  }

  // Drop domain on loopback/IP hosts
  if (domain && !isLoopbackOrIp(host)) {
    const safeDomain = domain.replace(/^\./, "").toLowerCase();
    if (host === safeDomain || host.endsWith(`.${safeDomain}`)) {
      attrs.push(`Domain=${domain}`);
    }
  }

  // Fix SameSite: None requires Secure; on plain HTTP use Lax
  let finalSameSite = sameSite;
  if (!isSecure && String(sameSite || "").toLowerCase() === "none") {
    finalSameSite = "Lax";
  }
  if (finalSameSite) {
    attrs.push(`SameSite=${finalSameSite}`);
  }

  if (isSecure && (hasSecure || String(finalSameSite || "").toLowerCase() === "none")) {
    attrs.push("Secure");
  }

  return [nameValue, ...attrs].join("; ");
};

const appendSetCookieHeaders = (targetResponse, sourceHeaders) => {
  for (const cookie of getSetCookieLines(sourceHeaders)) {
    targetResponse.headers.append("set-cookie", cookie);
  }
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

    const setCookies = getSetCookieLines(response.headers);

    if (response.ok) {
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
        setCookies,
      };
    }

    // If /api/auth/me returned non-200, it may have attempted refresh internally.
    // Return the setCookies so any refresh cookies are still forwarded to browser.
    return { authenticated: false, hasBusiness: false, setCookies };
  } catch {
    return { authenticated: false, hasBusiness: false, setCookies: [] };
  }
};

const tryRefreshSession = async (request) => {
  try {
    return await fetch(new URL("/api/auth/refresh", request.url), {
      method: "POST",
      headers: {
        cookie: String(request.headers.get("cookie") || ""),
        "x-product-key": String(process.env.NEXT_PUBLIC_PRODUCT_KEY || "property").trim() || "property",
      },
      cache: "no-store",
    });
  } catch {
    return null;
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
  const hasRefreshCookie = hasSessionCookie(request);
  const hasCsrfSessionHint = hasCsrfCookie(request);

  // Phase 1: Validate session with /api/auth/me (which attempts refresh internally)
  const sessionState = await getValidatedSessionState(request);
  let hasSession = sessionState.authenticated;
  const hasBusiness = sessionState.hasBusiness;
  let sessionSetCookies = sessionState.setCookies || [];

  // Phase 2: Refresh is already attempted inside /api/auth/me route handler.
  // An additional refresh attempt here would consume a single-use token,
  // causing the auth flow to break. We rely on /api/auth/me's internal refresh.

  // Phase 3: Build response
  let response = null;

  if (!hasSession) {
    response = redirectToAuthLogin(request);
  }

  if (!response && !hasBusiness) {
    const authAppBaseUrl = String(process.env.NEXT_PUBLIC_AUTH_APP_URL || "").trim().replace(/\/+$/, "");
    if (authAppBaseUrl) {
      const registerUrl = new URL(`${authAppBaseUrl}/auth/business-register`);
      registerUrl.searchParams.set("returnTo", request.nextUrl.href);
      response = NextResponse.redirect(registerUrl, { status: 307 });
    } else {
      const localRegisterUrl = new URL("/home", request.url);
      response = NextResponse.redirect(localRegisterUrl, { status: 307 });
    }
  }

  if (!response) {
    response = NextResponse.next();
  }

  // Phase 4: Propagate Set-Cookie headers from /api/auth/me response,
  // rewritten for the current request context (HTTP vs HTTPS, Domain matching)
  if (sessionSetCookies.length) {
    for (const cookie of sessionSetCookies) {
      response.headers.append("set-cookie", rewriteSetCookieForMiddleware(cookie, request));
    }
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
