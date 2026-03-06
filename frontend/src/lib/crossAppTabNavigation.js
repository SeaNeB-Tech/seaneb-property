"use client";

import { openSsoAuthTab } from "@/lib/newTabSso";

const CROSS_TAB_LOGIN_SOURCE = "main-app";
const CROSS_TAB_REGISTER_SOURCE = "main-app-register";
const BUSINESS_REGISTER_PATH = "/auth/business-reg";

export function openBusinessRegisterFlow() {
  if (typeof window === "undefined") return;

  const authAppUrl = String(process.env.NEXT_PUBLIC_AUTH_APP_URL || "").trim();

  if (!authAppUrl) {
    console.warn("[cross-tab] NEXT_PUBLIC_AUTH_APP_URL is missing; cannot redirect to business register.");
    return;
  }

  const businessRegisterPath =
    `${BUSINESS_REGISTER_PATH}?source=${encodeURIComponent(CROSS_TAB_REGISTER_SOURCE)}`;
  const directBusinessRegisterUrl = `${authAppUrl}${businessRegisterPath}`;
  window.location.assign(directBusinessRegisterUrl);
}

export const openAuthLoginTab = () => {
  if (typeof window === "undefined") return false;

  const authBase = String(process.env.NEXT_PUBLIC_AUTH_APP_URL || "").trim();
  if (!authBase) {
    console.warn("[cross-tab] NEXT_PUBLIC_AUTH_APP_URL is missing; cannot open auth login tab.");
    return false;
  }

  const loginPath = `/auth/login?source=${encodeURIComponent(CROSS_TAB_LOGIN_SOURCE)}`;
  const opened = openSsoAuthTab(loginPath);
  if (!opened) {
    console.warn("[cross-tab] Failed to open auth login tab.");
    return false;
  }
  return true;
};
