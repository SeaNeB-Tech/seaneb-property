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

export async function GET(request) {
  const upstreamUrl = `${API_REMOTE_BASE_URL}/profile/me`;
  const incomingProductKey = String(request.headers.get("x-product-key") || "").trim();
  const incomingCsrf = String(request.headers.get("x-csrf-token") || "").trim();
  const incomingCookie = String(request.headers.get("cookie") || "").trim();
  const incomingAuth = String(request.headers.get("authorization") || "").trim();

  const headers = new Headers();
  headers.set("x-product-key", incomingProductKey || DEFAULT_PRODUCT_KEY);
  if (incomingCsrf) headers.set("x-csrf-token", incomingCsrf);
  if (incomingCookie) headers.set("cookie", incomingCookie);
  if (incomingAuth) headers.set("authorization", incomingAuth);

  let upstreamResponse;
  try {
    upstreamResponse = await fetch(upstreamUrl, {
      method: "GET",
      headers,
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      {
        error: {
          code: "UPSTREAM_AUTH_ME_UNAVAILABLE",
          message: "Unable to reach auth me upstream",
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
