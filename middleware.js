import { NextResponse } from "next/server";

const normalizeUrl = (value) => String(value || "").replace(/\/+$/, "");

const AUTH_APP_BASE_URL = normalizeUrl(process.env.NEXT_PUBLIC_AUTH_APP_URL);
const PRODUCT_KEY = "property";
const AUTH_GATE_COOKIE_NAME = "seaneb_auth_gate";
const AUTH_GATE_TTL_SECONDS = 30;
const AUTH_GATE_COOKIE_PATH = String(process.env.NEXT_PUBLIC_COOKIE_PATH || "/").trim() || "/";
const AUTH_GATE_COOKIE_SAMESITE = String(process.env.NEXT_PUBLIC_COOKIE_SAMESITE || "Lax").trim() || "Lax";
const AUTH_GATE_COOKIE_DOMAIN = String(process.env.NEXT_PUBLIC_COOKIE_DOMAIN || "").trim();
const AUTH_GATE_SECRET = String(
  process.env.AUTH_GATE_SECRET || process.env.NEXTAUTH_SECRET || ""
).trim();
const REFRESH_COOKIE_KEYS = [
  "refresh_token_property",
  "refresh_token_auto",
  "refresh_token",
  "auth_session",
  "auth_session_property",
];
let authGateKeyPromise = null;

const hasAnyCookie = (request, names = []) =>
  names.some((name) => Boolean(String(request.cookies.get(name)?.value || "").trim()));

const hasSessionCookie = (request) => {
  const refreshToken = hasAnyCookie(request, REFRESH_COOKIE_KEYS);
  return Boolean(refreshToken);
};

const encodeBase64Url = (value) =>
  btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");

const decodeBase64Url = (value) => {
  const normalized = String(value || "").replace(/-/g, "+").replace(/_/g, "/");
  const pad = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return atob(`${normalized}${pad}`);
};

const getAuthGateKey = async () => {
  if (!AUTH_GATE_SECRET) return null;
  if (!authGateKeyPromise) {
    authGateKeyPromise = crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(AUTH_GATE_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
  }
  return authGateKeyPromise;
};

const signAuthGatePayload = async (payload) => {
  const key = await getAuthGateKey();
  if (!key) return "";
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(String(payload || ""))
  );
  const signatureText = String.fromCharCode(...new Uint8Array(signatureBuffer));
  return encodeBase64Url(signatureText);
};

const createAuthGateCookieValue = async () => {
  const expiresAt = Date.now() + AUTH_GATE_TTL_SECONDS * 1000;
  const signature = await signAuthGatePayload(expiresAt);
  if (!signature) return "";
  return `${expiresAt}.${signature}`;
};

const isAuthGateCookieValid = async (request) => {
  if (!AUTH_GATE_SECRET) return false;
  const cookieValue = String(request.cookies.get(AUTH_GATE_COOKIE_NAME)?.value || "").trim();
  if (!cookieValue) return false;

  const [expiresAtRaw, signature] = cookieValue.split(".");
  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now() || !signature) {
    return false;
  }

  try {
    const normalizedSignature = encodeBase64Url(decodeBase64Url(signature));
    const expectedSignature = await signAuthGatePayload(expiresAtRaw);
    return Boolean(expectedSignature) && normalizedSignature === expectedSignature;
  } catch {
    return false;
  }
};

const resolveCookieDomainForRequest = (request) => {
  const configuredDomain = AUTH_GATE_COOKIE_DOMAIN;
  if (!configuredDomain) return undefined;
  const host = String(request.nextUrl.hostname || "").toLowerCase();
  const isIpv4Loopback = /^127(?:\.\d{1,3}){3}$/.test(host);
  const isLoopbackHost = host === "localhost" || host === "::1" || isIpv4Loopback || host.endsWith(".local");
  if (isLoopbackHost) return undefined;
  return configuredDomain;
};

const setAuthGateCookie = async (response, request) => {
  if (!AUTH_GATE_SECRET) return;
  const value = await createAuthGateCookieValue();
  if (!value) return;

  const domain = resolveCookieDomainForRequest(request);
  response.cookies.set({
    name: AUTH_GATE_COOKIE_NAME,
    value,
    httpOnly: true,
    secure: request.nextUrl.protocol === "https:",
    sameSite: AUTH_GATE_COOKIE_SAMESITE.toLowerCase(),
    path: AUTH_GATE_COOKIE_PATH,
    ...(domain ? { domain } : {}),
    maxAge: AUTH_GATE_TTL_SECONDS,
  });
};

const clearAuthGateCookie = (response, request) => {
  const domain = resolveCookieDomainForRequest(request);
  response.cookies.set({
    name: AUTH_GATE_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: request.nextUrl.protocol === "https:",
    sameSite: AUTH_GATE_COOKIE_SAMESITE.toLowerCase(),
    path: AUTH_GATE_COOKIE_PATH,
    ...(domain ? { domain } : {}),
    maxAge: 0,
  });
};

const redirectToAuthLogin = (request) => {
  if (!AUTH_APP_BASE_URL) {
    return NextResponse.next();
  }

  const loginUrl = new URL(`${AUTH_APP_BASE_URL}/auth/login`);
  loginUrl.searchParams.set("returnTo", request.nextUrl.href);
  return NextResponse.redirect(loginUrl, { status: 307 });
};

const validateSessionViaRefresh = async (request) => {
  const cookieHeader = String(request.headers.get("cookie") || "").trim();
  if (!cookieHeader) return false;

  const csrfFromCookie = String(request.cookies.get("csrf_token_property")?.value || "").trim();
  const headers = new Headers();
  headers.set("content-type", "application/json");
  headers.set("x-product-key", PRODUCT_KEY);
  headers.set("cookie", cookieHeader);
  if (csrfFromCookie) headers.set("x-csrf-token", csrfFromCookie);

  try {
    const refreshUrl = new URL("/api/auth/refresh", request.nextUrl.origin);
    const response = await fetch(refreshUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ product_key: PRODUCT_KEY }),
      cache: "no-store",
    });

    return response.status === 200;
  } catch {
    return false;
  }
};

export async function middleware(request) {
  if (!hasSessionCookie(request)) {
    const response = redirectToAuthLogin(request);
    clearAuthGateCookie(response, request);
    return response;
  }

  const hasFreshAuthGate = await isAuthGateCookieValid(request);
  if (hasFreshAuthGate) {
    return NextResponse.next();
  }

  const hasValidSession = await validateSessionViaRefresh(request);
  if (hasValidSession) {
    const response = NextResponse.next();
    await setAuthGateCookie(response, request);
    return response;
  }

  const response = redirectToAuthLogin(request);
  clearAuthGateCookie(response, request);
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
