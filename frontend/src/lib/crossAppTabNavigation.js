"use client";

import { openSsoAuthTab } from "@/lib/newTabSso";
import { getAuthAppUrl } from "@/lib/core/appUrls";
import { getAccessToken } from "@/lib/auth/tokenStorage";

const CROSS_TAB_LOGIN_SOURCE = "main-app";
const CROSS_TAB_REGISTER_SOURCE = "main-app-register";
const BUSINESS_REGISTER_PATH = "/auth/business-reg";
const DEFAULT_PRODUCT_KEY = String(process.env.NEXT_PUBLIC_PRODUCT_KEY || "property").trim() || "property";

const readBridgeTokenFromPayload = (payload = {}) => {
  const candidates = [
    payload,
    payload?.data,
    payload?.result,
    payload?.payload,
    payload?.session,
    payload?.tokens,
    payload?.token,
    payload?.data?.token,
    payload?.data?.tokens,
  ];

  for (const candidate of candidates) {
    if (!candidate || typeof candidate !== "object") continue;
    const token = String(
      candidate?.bridge_token ||
        candidate?.bridgeToken ||
        candidate?.sso_bridge_token ||
        candidate?.ssoBridgeToken ||
        ""
    ).trim();
    if (token) return token;
  }

  return "";
};

const mintBridgeToken = async () => {
  const endpoints = ["/api/auth/sso", "/api/v1/sso", "/api/sso"];
  const accessToken = String(getAccessToken() || "").trim();
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: {
          "content-type": "application/json",
          "x-product-key": DEFAULT_PRODUCT_KEY,
          ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({
          product_key: DEFAULT_PRODUCT_KEY,
          target_product_key: DEFAULT_PRODUCT_KEY,
        }),
      });

      if (!response.ok) {
        const status = Number(response.status || 0);
        if (status === 404 || status === 405) continue;
        continue;
      }

      const payload = await response.json().catch(() => ({}));
      const bridgeToken = readBridgeTokenFromPayload(payload);
      if (bridgeToken) return bridgeToken;
    } catch {
      // Try next endpoint.
    }
  }

  return "";
};

export function openBusinessRegisterFlow() {
  if (typeof window === "undefined") return;

  const authAppUrl = String(process.env.NEXT_PUBLIC_AUTH_APP_URL || "").trim();

  if (!authAppUrl) {
    console.warn("[cross-tab] NEXT_PUBLIC_AUTH_APP_URL is missing; cannot redirect to business register.");
    return;
  }

  const businessRegisterUrl = new URL(BUSINESS_REGISTER_PATH, authAppUrl);
  businessRegisterUrl.searchParams.set("source", CROSS_TAB_REGISTER_SOURCE);
  businessRegisterUrl.searchParams.set("returnTo", window.location.href);

  const opened = window.open(businessRegisterUrl.toString(), "_blank");
  if (opened && typeof opened.focus === "function") {
    opened.focus();
    return;
  }

  // Popup blocked: fallback to same-tab navigation.
  window.location.assign(businessRegisterUrl.toString());
}

export const openAuthLoginTab = () => {
  if (typeof window === "undefined") return false;

  const authBase = String(process.env.NEXT_PUBLIC_AUTH_APP_URL || "").trim();
  if (!authBase) {
    console.warn("[cross-tab] NEXT_PUBLIC_AUTH_APP_URL is missing; cannot open auth login tab.");
    return false;
  }

  const loginPath = "/auth/login";
  const opened = openSsoAuthTab(loginPath, { source: CROSS_TAB_LOGIN_SOURCE });
  if (!opened) {
    console.warn("[cross-tab] Failed to open auth login tab.");
    return false;
  }
  return true;
};

export const openAuthPathWithBridge = async (
  targetPath = "/dashboard",
  { fallbackUrl: _fallbackUrl = "" } = {}
) => {
  if (typeof window === "undefined") return false;

  const safePath = String(targetPath || "").trim().startsWith("/")
    ? String(targetPath || "").trim()
    : "/dashboard";

  const callbackUrl = new URL(getAuthAppUrl("/auth/sso/callback"), window.location.origin);
  callbackUrl.searchParams.set("source", safePath);

  const bridgeToken = await mintBridgeToken();
  if (bridgeToken) {
    callbackUrl.searchParams.set("bridge_token", bridgeToken);
    window.location.assign(callbackUrl.toString());
    return true;
  }

  // If bridge mint fails, avoid direct dashboard jump (it can loop to login).
  // Send user to auth login flow explicitly.
  const loginUrl = new URL(getAuthAppUrl("/auth/login"), window.location.origin);
  loginUrl.searchParams.set("source", "main-app");
  loginUrl.searchParams.set("returnTo", safePath);
  window.location.assign(loginUrl.toString());
  return true;
};
