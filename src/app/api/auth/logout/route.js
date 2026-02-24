import { NextResponse } from "next/server";
import { API_REMOTE_BASE_URL } from "@/lib/apiBaseUrl";

const DEFAULT_PRODUCT_KEY = "property";

const appendSetCookieHeaders = (targetHeaders, upstreamHeaders) => {
  const getSetCookie = upstreamHeaders?.getSetCookie;
  if (typeof getSetCookie === "function") {
    const cookies = getSetCookie.call(upstreamHeaders) || [];
    for (const cookie of cookies) {
      if (cookie) targetHeaders.append("set-cookie", cookie);
    }
    return;
  }
  const singleCookie = upstreamHeaders.get("set-cookie");
  if (singleCookie) targetHeaders.append("set-cookie", singleCookie);
};

export async function POST(request) {
  const upstreamUrl = `${API_REMOTE_BASE_URL}/auth/logout`;
  const incomingProductKey = String(request.headers.get("x-product-key") || "").trim();
  const incomingCsrf = String(request.headers.get("x-csrf-token") || "").trim();
  const incomingCookie = String(request.headers.get("cookie") || "").trim();
  const incomingAuth = String(request.headers.get("authorization") || "").trim();

  let requestBody = "";
  try {
    requestBody = await request.text();
  } catch {
    requestBody = "";
  }

  const headers = new Headers();
  headers.set("content-type", "application/json");
  headers.set("x-product-key", incomingProductKey || DEFAULT_PRODUCT_KEY);
  if (incomingCsrf) headers.set("x-csrf-token", incomingCsrf);
  if (incomingCookie) headers.set("cookie", incomingCookie);
  if (incomingAuth) headers.set("authorization", incomingAuth);

  let upstreamResponse;
  try {
    upstreamResponse = await fetch(upstreamUrl, {
      method: "POST",
      headers,
      body: requestBody || JSON.stringify({ product_key: DEFAULT_PRODUCT_KEY }),
      cache: "no-store",
    });
  } catch {
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
  return new NextResponse(payload, {
    status: upstreamResponse.status,
    headers: responseHeaders,
  });
}
