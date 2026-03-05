import { NextResponse } from "next/server";

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

  for (const cookie of splitCookies) {
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
  const list = [
    `${normalized}/v1/sso`,
    `${normalized}/auth/sso`,
    `${normalized}/sso`,
  ];
  return Array.from(new Set(list.filter(Boolean)));
};

export async function POST(req) {
  let body = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const apiBaseUrl = String(process.env.NEXT_PUBLIC_API_BASE_URL || "").trim().replace(/\/+$/, "");
  if (!apiBaseUrl) {
    return NextResponse.json(
      {
        error: {
          code: "API_BASE_URL_MISSING",
          message: "NEXT_PUBLIC_API_BASE_URL is not configured",
        },
      },
      { status: 500 }
    );
  }

  const productKey = String(process.env.NEXT_PUBLIC_PRODUCT_KEY || "").trim();
  const cookieHeader = req.headers.get("cookie") || "";
  const csrfToken = resolveCsrfHeaderValue(req.headers.get("x-csrf-token"), cookieHeader);
  const upstreamCandidates = buildUpstreamCandidates(apiBaseUrl);

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
