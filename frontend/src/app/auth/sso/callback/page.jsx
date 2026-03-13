"use client";

import { useEffect, useRef, useState } from "react";
import { ssoDebugLog } from "@/lib/observability/ssoDebug";
import { setAccessToken } from "@/lib/auth/tokenStorage";
import { getDeviceInfo } from "@/lib/deviceInfo";
import { clearAuthFailureArtifacts, shouldClearAuthOnError } from "@/services/auth.service";

const AUTH_SSO_RESULT_KEY = "seaneb_sso_exchange_result";
const AUTH_SSO_MESSAGE_TYPE = "seaneb:sso:exchange";

const resolveSafeSourcePath = (rawValue) => {
  const fallback = "/home";
  const source = String(rawValue || "").trim();
  if (!source) return fallback;
  try {
    const target = new URL(source, window.location.origin);
    if (target.origin !== window.location.origin) return fallback;
    return `${target.pathname}${target.search}${target.hash}` || fallback;
  } catch {
    return fallback;
  }
};

const publishSsoResult = ({ ok, source, error = "" }) => {
  const payload = {
    type: AUTH_SSO_MESSAGE_TYPE,
    ok: Boolean(ok),
    source: resolveSafeSourcePath(source),
    error: String(error || "").trim(),
    at: Date.now(),
  };

  try {
    window.localStorage.setItem(AUTH_SSO_RESULT_KEY, JSON.stringify(payload));
  } catch {
    // ignore storage errors
  }

  try {
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage(payload, window.location.origin);
    }
  } catch {
    // ignore postMessage errors
  }
};

const stripBridgeTokenFromCurrentUrl = () => {
  if (typeof window === "undefined") return;
  try {
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.delete("bridge_token");
    nextUrl.searchParams.delete("bridgeToken");
    const hashParams = new URLSearchParams(String(nextUrl.hash || "").replace(/^#/, ""));
    hashParams.delete("bridge_token");
    hashParams.delete("bridgeToken");
    const nextHash = hashParams.toString();
    nextUrl.hash = nextHash ? `#${nextHash}` : "";
    window.history.replaceState({}, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
  } catch {
    // ignore URL rewrite failures
  }
};

const readBridgePayloadFromCurrentUrl = () => {
  if (typeof window === "undefined") {
    return { bridgeToken: "", source: "" };
  }
  const url = new URL(window.location.href);
  const hashParams = new URLSearchParams(String(url.hash || "").replace(/^#/, ""));
  const queryParams = new URLSearchParams(String(url.search || "").replace(/^\?/, ""));
  const bridgeToken = String(
    hashParams.get("bridge_token") ||
      hashParams.get("bridgeToken") ||
      queryParams.get("bridge_token") ||
      queryParams.get("bridgeToken") ||
      ""
  ).trim();
  const source = String(queryParams.get("source") || "").trim();
  return { bridgeToken, source };
};

const runSsoExchange = async (bridgeToken) => {
  const deviceInfo = getDeviceInfo();
  ssoDebugLog("sso.exchange.start", { route: "/api/auth/sso/exchange" });
  const response = await fetch("/api/auth/sso/exchange", {
    method: "POST",
    credentials: "include",
    cache: "no-store",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      bridge_token: String(bridgeToken || "").trim(),
      device_id: deviceInfo.device_id,
      device_type: deviceInfo.device_type,
    }),
  });

  let payload = {};
  try {
    payload = await response.json();
  } catch {
    payload = {};
  }

  if (!response.ok) {
    if (shouldClearAuthOnError({ status: response.status, data: payload }, payload)) {
      clearAuthFailureArtifacts();
    }
    const status = Number(response.status || 0);
    const message = String(
      payload?.error?.message ||
        payload?.message ||
        `Bridge exchange failed (status ${status || "unknown"})`
    ).trim();
    const error = new Error(message);
    error.status = status;
    error.payload = payload;
    ssoDebugLog("sso.exchange.failure", {
      route: "/api/auth/sso/exchange",
      status: error.status,
      code: payload?.error?.code || payload?.code || "",
    });
    throw error;
  }
  ssoDebugLog("sso.exchange.success", { route: "/api/auth/sso/exchange", status: 200 });

  return payload;
};

const restoreListingSession = async ({ accessToken = "" } = {}) => {
  const headers = new Headers();
  const bearer = String(accessToken || "").trim();
  if (bearer) {
    headers.set("authorization", `Bearer ${bearer}`);
  }

  let response = await fetch("/api/auth/me", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
    headers,
  });

  if (response.ok) return true;

  if ([401, 403].includes(Number(response.status || 0))) {
    await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
      cache: "no-store",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({}),
    }).catch(() => null);

    response = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include",
      cache: "no-store",
      headers,
    });

    if (response.ok) return true;
  }

  throw new Error("Session restore failed");
};

export default function SsoCallbackPage() {
  const [state, setState] = useState("working");
  const [message, setMessage] = useState("Finalizing your login...");
  const hasHandledRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (hasHandledRef.current) return;
    hasHandledRef.current = true;

    const { bridgeToken, source: sourceRaw } = readBridgePayloadFromCurrentUrl();
    const source = resolveSafeSourcePath(sourceRaw);

    if (!bridgeToken) {
      publishSsoResult({
        ok: false,
        source,
        error: "bridge_token missing in callback URL",
      });
      window.location.replace(source);
      return;
    }
    let timerId = null;

    const completeSuccessFlow = () => {
      stripBridgeTokenFromCurrentUrl();
      publishSsoResult({ ok: true, source });
      if (window.opener && !window.opener.closed) {
        try {
          window.opener.location.href = source;
        } catch {
          // ignore opener navigation failures
        }
      }
      window.location.replace(source);
    };

    void runSsoExchange(bridgeToken)
      .then(async (payload) => {
        const exchangedAccessToken = String(
          payload?.accessToken || payload?.access_token || ""
        ).trim();
        if (exchangedAccessToken) {
          setAccessToken(exchangedAccessToken);
        }
        await restoreListingSession({ accessToken: exchangedAccessToken });
        completeSuccessFlow();
      })
      .catch(async (error) => {
        const status = Number(error?.status || 0);
        const code = String(error?.payload?.error?.code || error?.payload?.code || "").trim();
        const isReplay =
          status === 409 ||
          code === "BRIDGE_TOKEN_REPLAYED" ||
          /replay/i.test(String(error?.message || ""));

        const trySessionRestore = async () => {
          try {
            await restoreListingSession({ accessToken: "" });
            completeSuccessFlow();
            return true;
          } catch {
            return false;
          }
        };

        if (isReplay) {
          const restored = await trySessionRestore();
          if (restored) return;
        }

        const restored = await trySessionRestore();
        if (restored) return;

        const reason = String(error?.message || "Bridge exchange failed").trim();
        publishSsoResult({
          ok: false,
          source,
          error: reason,
        });
        setState("error");
        setMessage(`Login session could not be completed: ${reason}`);
      });

    return () => {
      if (timerId) window.clearTimeout(timerId);
    };
  }, []);

  if (state === "working") return null;

  return (
    <main className="min-h-screen bg-[#0f172a] px-6 py-10 text-white">
      <div className="mx-auto max-w-md rounded-xl border border-white/20 bg-white/10 p-6 text-center">
        <h1 className="text-lg font-semibold">
          {state === "error" ? "Authentication failed" : "Authentication complete"}
        </h1>
        <p className="mt-2 text-sm text-white/80">{message}</p>
        {state !== "working" ? (
          <p className="mt-4 text-xs text-white/60">
            You can close this tab manually if you opened login in a separate tab.
          </p>
        ) : null}
      </div>
    </main>
  );
}
