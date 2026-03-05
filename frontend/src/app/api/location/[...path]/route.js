import { NextResponse } from "next/server";
import { API_REMOTE_CANDIDATE_BASE_URLS } from "@/lib/core/apiBaseUrl";

const PRODUCT_KEY = String(process.env.NEXT_PUBLIC_PRODUCT_KEY || "property").trim() || "property";

const buildUrl = (baseUrl, pathSegments = [], search = "") => {
  const cleanBase = String(baseUrl || "").replace(/\/+$/, "");
  const cleanPath = (Array.isArray(pathSegments) ? pathSegments : [])
    .map((segment) => encodeURIComponent(String(segment || "")))
    .join("/");
  return `${cleanBase}/location/${cleanPath}${String(search || "")}`;
};

const readJsonSafely = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

export async function GET(request, { params }) {
  const pathSegments = Array.isArray(params?.path) ? params.path : [];
  const search = String(request.nextUrl.search || "");

  if (!pathSegments.length) {
    return NextResponse.json(
      { error: { code: "INVALID_LOCATION_PATH", message: "Location path is required" } },
      { status: 400 }
    );
  }

  if (!API_REMOTE_CANDIDATE_BASE_URLS.length) {
    return NextResponse.json(
      { error: { code: "API_BASE_URL_MISSING", message: "API base URL is not configured" } },
      { status: 500 }
    );
  }

  let lastStatus = 502;
  let lastPayload = {
    error: {
      code: "UPSTREAM_LOCATION_UNAVAILABLE",
      message: "Unable to reach location upstream",
    },
  };

  for (const baseUrl of API_REMOTE_CANDIDATE_BASE_URLS) {
    const targetUrl = buildUrl(baseUrl, pathSegments, search);
    try {
      const response = await fetch(targetUrl, {
        method: "GET",
        cache: "no-store",
        headers: {
          "x-product-key": PRODUCT_KEY,
          accept: "application/json",
        },
      });

      const payload = await readJsonSafely(response);
      lastStatus = Number(response.status || 502);
      lastPayload = payload || {
        error: {
          code: "UPSTREAM_LOCATION_INVALID_RESPONSE",
          message: "Location upstream returned a non-JSON response",
        },
      };

      if (response.ok) {
        return NextResponse.json(lastPayload, { status: 200 });
      }

      if (![404, 405, 500, 502, 503, 504].includes(lastStatus)) {
        return NextResponse.json(lastPayload, { status: lastStatus });
      }
    } catch {
      // Try next upstream candidate.
    }
  }

  return NextResponse.json(lastPayload, { status: lastStatus });
}

