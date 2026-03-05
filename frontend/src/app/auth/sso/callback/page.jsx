"use client";

import { useEffect, useRef, useState } from "react";
import { ssoDebugLog } from "@/lib/observability/ssoDebug";
import { setAccessToken } from "@/lib/auth/tokenStorage";

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
    }),
  });

  let payload = {};
  try {
    payload = await response.json();
  } catch {
    payload = {};
  }

  if (!response.ok) {
    const message = String(
      payload?.error?.message || payload?.message || "Bridge exchange failed"
    ).trim();
    const error = new Error(message);
    error.status = Number(response.status || 0);
    ssoDebugLog("sso.exchange.failure", {
      route: "/api/auth/sso/exchange",
      status: error.status,
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
          window.close();
        } catch {
          // no-op
        }
        timerId = window.setTimeout(() => {
          setState("manual_close");
          setMessage("Authentication completed. You can close this tab.");
        }, 200);
        return;
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
      .catch((error) => {
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
          <button
            type="button"
            onClick={() => {
              try {
                window.close();
              } catch {
                // no-op
              }
            }}
            className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900"
          >
            Close Tab
          </button>
        ) : null}
      </div>
    </main>
  );
}
