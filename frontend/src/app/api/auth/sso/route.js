import { NextResponse } from "next/server";
import { API_REMOTE_BASE_URL, API_REMOTE_FALLBACK_BASE_URL } from "@/lib/core/apiBaseUrl";

const appendSetCookieHeaders = (targetHeaders, upstreamHeaders) => {
  const getSetCookie = upstreamHeaders?.getSetCookie;
  if (typeof getSetCookie === "function") {
    const cookies = getSetCookie.call(upstreamHeaders) || [];
    for (const cookie of cookies) {
      if (!cookie) continue;
      if (/^\s*access_token=/i.test(cookie)) continue;
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

  for (const cookie of splitCookies) {
    if (/^\s*access_token=/i.test(cookie)) continue;
    targetHeaders.append("set-cookie", cookie);
  }
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
  const fromCookieRaw = getCookieValueFromHeader(cookieHeader, "csrf_token_property");
  if (!fromCookieRaw) return "";
  try {
    return decodeURIComponent(fromCookieRaw);
  } catch {
    return fromCookieRaw;
  }
};

const buildUpstreamCandidates = (apiBaseUrl) => {
  const normalized = String(apiBaseUrl || "").trim().replace(/\/+$/, "");
  if (!normalized) return [];

  let hasApiV1 = false;
  let hasV1 = false;
  let origin = "";

  try {
    const parsed = new URL(normalized);
    origin = String(parsed.origin || "").trim().replace(/\/+$/, "");
    const path = String(parsed.pathname || "").replace(/\/+$/, "");
    hasApiV1 = /\/api\/v1$/i.test(path);
    hasV1 = /\/v1$/i.test(path);
  } catch {
    // Non-URL base; fall back to simple candidates.
  }

  const list = [
    `${normalized}/auth/sso`,
    `${normalized}/sso`,
  ];
  if (!hasApiV1 && !hasV1) {
    list.push(`${normalized}/v1/sso`);
  }

  if (origin) {
    list.push(`${origin}/api/v1/sso`);
    list.push(`${origin}/v1/sso`);
    list.push(`${origin}/auth/sso`);
    list.push(`${origin}/sso`);
  }

  return Array.from(new Set(list.filter(Boolean)));
};

export async function POST(req) {
  let body = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const baseCandidates = Array.from(
    new Set([API_REMOTE_BASE_URL, API_REMOTE_FALLBACK_BASE_URL].filter(Boolean))
  ).map((base) => String(base || "").trim().replace(/\/+$/, ""));
  if (baseCandidates.length === 0) {
    return NextResponse.json(
      {
        error: {
          code: "API_BASE_URL_MISSING",
          message: "API base URL is not configured",
        },
      },
      { status: 500 }
    );
  }

  const productKey = String(process.env.NEXT_PUBLIC_PRODUCT_KEY || "property").trim() || "property";
  const cookieHeader = req.headers.get("cookie") || "";
  const authorizationHeader = String(
    req.headers.get("authorization") || req.headers.get("Authorization") || ""
  ).trim();
  const csrfToken = resolveCsrfHeaderValue(req.headers.get("x-csrf-token"), cookieHeader);
  const upstreamCandidates = Array.from(
    new Set(baseCandidates.flatMap((base) => buildUpstreamCandidates(base)))
  );

  let lastStatus = 502;
  let lastPayload = {
    error: {
      code: "UPSTREAM_SSO_UNAVAILABLE",
      message: "Unable to reach SSO mint upstream",
    },
  };
  let lastHeaders = new Headers();

  for (const url of upstreamCandidates) {
    try {
      const upstream = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieHeader,
          ...(productKey ? { "x-product-key": productKey } : {}),
          ...(csrfToken ? { "x-csrf-token": csrfToken } : {}),
          ...(authorizationHeader ? { authorization: authorizationHeader } : {}),
        },
        body: JSON.stringify({
          ...body,
          ...(productKey ? { product_key: productKey } : {}),
        }),
        cache: "no-store",
      });

      const payload = await upstream.json().catch(() => ({}));
      const headers = new Headers();
      appendSetCookieHeaders(headers, upstream.headers);

      lastStatus = upstream.status;
      lastPayload = payload;
      lastHeaders = headers;

      if (upstream.ok || ![404, 405].includes(Number(upstream.status || 0))) {
        return NextResponse.json(payload, { status: upstream.status, headers });
      }
    } catch {
      // try next candidate
    }
  }

  return NextResponse.json(lastPayload, { status: lastStatus, headers: lastHeaders });
}
