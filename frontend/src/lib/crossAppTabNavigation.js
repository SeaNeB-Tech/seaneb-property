"use client";

import { openSsoAuthTab } from "@/lib/newTabSso";
import { getAuthAppUrl } from "@/lib/core/appUrls";
import { getAccessToken } from "@/lib/auth/tokenStorage";

const CROSS_TAB_LOGIN_SOURCE = "main-app";
const CROSS_TAB_REGISTER_SOURCE = "main-app-register";
// =============== FIX: Match actual business registration path ===============
const BUSINESS_REGISTER_PATH = "/auth/business-register"; // Changed from "/auth/business-reg"
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

// =============== FIX: Add error handling ===============
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
          // =============== FIX: Add Origin header for CORS ===============
          ...(typeof window !== "undefined" ? { "Origin": window.location.origin } : {}),
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
    } catch (error) {
      console.warn(`[cross-tab] Endpoint ${endpoint} failed:`, error.message);
      // Try next endpoint.
    }
  }

  return "";
};

export function openBusinessRegisterFlow() {
  if (typeof window === "undefined") return;

  const authAppUrl = String(process.env.NEXT_PUBLIC_APP_URL || "").trim();

  if (!authAppUrl) {
    console.warn("[cross-tab] NEXT_PUBLIC_APP_URL is missing; cannot redirect to business register.");
    return;
  }

  const businessRegisterUrl = new URL(BUSINESS_REGISTER_PATH, authAppUrl);
  businessRegisterUrl.searchParams.set("source", CROSS_TAB_REGISTER_SOURCE);
  businessRegisterUrl.searchParams.set("returnTo", window.location.href);
  businessRegisterUrl.searchParams.set("force", "1");
  
  // =============== FIX: Add product key to URL ===============
  businessRegisterUrl.searchParams.set("product_key", DEFAULT_PRODUCT_KEY);
  
  // Always navigate to business registration in the same tab to keep flow consistent.
  try {
    window.location.assign(businessRegisterUrl.toString());
  } catch (e) {
    // As a last resort, set location.href
    window.location.href = businessRegisterUrl.toString();
  }
}

export const openAuthLoginTab = () => {
  if (typeof window === "undefined") return false;

  const authBase = String(process.env.NEXT_PUBLIC_APP_URL || "").trim();
  if (!authBase) {
    console.warn("[cross-tab] NEXT_PUBLIC_APP_URL is missing; cannot open auth login tab.");
    return false;
  }

  // Try opening login in a separate auth tab (preferred). If popup blocked, fall back to same-tab navigation.
  try {
    const loginPath = "/auth/login";
    const opened = openSsoAuthTab(loginPath, { source: CROSS_TAB_LOGIN_SOURCE });
    if (opened) return true;

    // Popup/new-tab blocked: navigate in same tab as fallback.
    const loginUrl = new URL(getAuthAppUrl(loginPath), window.location.origin);
    loginUrl.searchParams.set("source", CROSS_TAB_LOGIN_SOURCE);
    loginUrl.searchParams.set("product_key", DEFAULT_PRODUCT_KEY);
    const returnTo = String(window.location.href || "").trim();
    if (returnTo) loginUrl.searchParams.set("returnTo", returnTo);
    window.location.assign(loginUrl.toString());
    return true;
  } catch (e) {
    console.warn("[cross-tab] Failed to open auth login tab and fallback navigation failed.", e);
    return false;
  }
};

// =============== FIX: Add error handling to openAuthPathWithBridge ===============
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
  callbackUrl.searchParams.set("product_key", DEFAULT_PRODUCT_KEY);

  try {
    const bridgeToken = await mintBridgeToken();
    if (bridgeToken) {
      callbackUrl.searchParams.set("bridge_token", bridgeToken);
      window.location.assign(callbackUrl.toString());
      return true;
    }
  } catch (error) {
    console.warn("[cross-tab] Bridge token minting failed:", error);
    // Fall through to login flow
  }

  // If bridge mint fails, avoid direct dashboard jump (it can loop to login).
  // Send user to auth login flow explicitly.
  const loginUrl = new URL(getAuthAppUrl("/auth/login"), window.location.origin);
  loginUrl.searchParams.set("source", "main-app");
  loginUrl.searchParams.set("returnTo", safePath);
  loginUrl.searchParams.set("product_key", DEFAULT_PRODUCT_KEY);
  window.location.assign(loginUrl.toString());
  return true;
};
