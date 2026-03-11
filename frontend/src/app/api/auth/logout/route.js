import { NextResponse } from "next/server";
import { API_REMOTE_BASE_URL, API_REMOTE_FALLBACK_BASE_URL } from "@/lib/core/apiBaseUrl";
import { getCookieOptions } from "@/lib/auth/cookieOptions";

const normalizeProductKey = () =>
  String(process.env.NEXT_PUBLIC_PRODUCT_KEY || "property").trim() || "property";

const buildUpstreamCandidates = () => {
  const bases = Array.from(
    new Set([API_REMOTE_BASE_URL, API_REMOTE_FALLBACK_BASE_URL].filter(Boolean))
  );
  const urls = [];
  for (const base of bases) {
    const normalized = String(base).replace(/\/+$/, "");
    urls.push(`${normalized}/logout`);
    urls.push(`${normalized}/auth/logout`);
  }
  return urls;
};

const getCookieValueFromHeader = (cookieHeader, key) => {
  const source = String(cookieHeader || "");
  if (!source) return "";
  const parts = source.split("; ");
  for (const part of parts) {
    const idx = part.indexOf("=");
    if (idx < 0) continue;
    const name = part.slice(0, idx).trim();
    if (name !== key) continue;
    return part.slice(idx + 1).trim();
  }
  return "";
};

const resolveCsrfHeaderValue = (incomingHeader, cookieHeader) => {
  const fromHeader = String(incomingHeader || "").trim();
  if (fromHeader) return fromHeader;
  const fromCookieRaw =
    getCookieValueFromHeader(cookieHeader, "csrf_token_property");
  if (!fromCookieRaw) return "";
  try {
    return decodeURIComponent(fromCookieRaw);
  } catch {
    return fromCookieRaw;
  }
};

const appendSetCookieHeaders = (targetHeaders, upstreamHeaders) => {
  const getSetCookie = upstreamHeaders?.getSetCookie;
  if (typeof getSetCookie === "function") {
    const cookies = getSetCookie.call(upstreamHeaders) || [];
    for (const cookie of cookies) {
      if (!cookie) continue;
      targetHeaders.append("set-cookie", cookie);
    }
    return;
  }
  const combinedCookieHeader = String(upstreamHeaders.get("set-cookie") || "").trim();
  if (!combinedCookieHeader) return;
  const splitCookies = combinedCookieHeader
    .split(/,(?=\s*[!#$%&'*+\-.^_`|~0-9A-Za-z]+=)/g)
    .map((item) => item.trim())
    .filter(Boolean);
  if (splitCookies.length === 0) return;
  for (const cookie of splitCookies) {
    targetHeaders.append("set-cookie", cookie);
  }
};

const clearAuthCookies = (response, request) => {
  const cookieOptions = getCookieOptions(request);
  const common = {
    path: "/",
    maxAge: 0,
    sameSite: cookieOptions.sameSite,
    secure: cookieOptions.secure,
  };
  response.cookies.set({ name: "access_token", value: "", httpOnly: true, ...common });
  response.cookies.set({ name: "refresh_token_property", value: "", httpOnly: true, ...common });
  response.cookies.set({ name: "csrf_token_property", value: "", httpOnly: false, ...common });
};

export async function POST(request) {
  const incomingProductKey = normalizeProductKey();
  const incomingCookie = String(request.headers.get("cookie") || "").trim();
  const incomingCsrf = resolveCsrfHeaderValue(
    String(request.headers.get("x-csrf-token") || "").trim(),
    incomingCookie
  );

  let requestBody = "";
  try {
    requestBody = await request.text();
  } catch {
    requestBody = "";
  }

  const headers = new Headers();
  headers.set("content-type", "application/json");
  headers.set("x-product-key", incomingProductKey);
  if (incomingCsrf) headers.set("x-csrf-token", incomingCsrf);
  if (incomingCookie) headers.set("cookie", incomingCookie);

  const upstreamCandidates = buildUpstreamCandidates();
  if (!upstreamCandidates.length) {
    return NextResponse.json(
      {
        error: {
          code: "UPSTREAM_LOGOUT_UNAVAILABLE",
          message: "Auth logout upstream is not configured",
        },
      },
      { status: 502 }
    );
  }

  const body = (() => {
    if (!requestBody) return JSON.stringify({ product_key: incomingProductKey });
    try {
      const parsed = JSON.parse(requestBody);
      return JSON.stringify({
        ...(parsed && typeof parsed === "object" ? parsed : {}),
        product_key: incomingProductKey,
      });
    } catch {
      return JSON.stringify({ product_key: incomingProductKey });
    }
  })();

  let upstreamResponse = null;
  for (const upstreamUrl of upstreamCandidates) {
    try {
      const response = await fetch(upstreamUrl, {
        method: "POST",
        headers,
        body,
        cache: "no-store",
      });
      upstreamResponse = response;
      const status = Number(response.status || 0);
      if (status !== 404 && status !== 405) break;
    } catch {
      // Try next candidate
    }
  }

  if (!upstreamResponse) {
    return NextResponse.json(
      {
        error: {
          code: "UPSTREAM_LOGOUT_UNAVAILABLE",
          message: "Unable to reach auth logout upstream",
        },
      },
      { status: 502 }
    );
  }

  const responseHeaders = new Headers();
  const contentType = upstreamResponse.headers.get("content-type");
  if (contentType) responseHeaders.set("content-type", contentType);
  appendSetCookieHeaders(responseHeaders, upstreamResponse.headers);

  const payload = await upstreamResponse.text();
  const response = new NextResponse(payload, {
    status: upstreamResponse.status,
    headers: responseHeaders,
  });
  const status = Number(upstreamResponse.status || 0);
  if ((status >= 200 && status < 300) || status === 401 || status === 403) {
    clearAuthCookies(response, request);
  }
  return response;
}

