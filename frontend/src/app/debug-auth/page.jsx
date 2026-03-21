"use client";

import { useEffect, useState } from "react";
import { getAuthDiagnostics, getInMemoryAccessToken, refreshAccessToken } from "@/lib/api/client";
import { API_BASE_URL } from "@/lib/core/apiBaseUrl";
const PRODUCT_KEY = String(process.env.NEXT_PUBLIC_PRODUCT_KEY || "").trim() || "property";

const DEBUG_AUTH_ENABLED = process.env.NODE_ENV === "development";

function readCookies() {
  try {
    const pairs = document.cookie ? document.cookie.split("; ") : [];
    return pairs.map((p) => {
      const i = p.indexOf("=");
      const k = i < 0 ? p : p.slice(0, i);
      const v = i < 0 ? "" : p.slice(i + 1);
      return { name: decodeURIComponent(k), value: decodeURIComponent(v) };
    });
  } catch {
    return [];
  }
}

export default function DebugAuthPage() {
  const [cookies, setCookies] = useState([]);
  const [sessionKeys, setSessionKeys] = useState([]);
  const [localKeys, setLocalKeys] = useState([]);
  const [profileResp, setProfileResp] = useState(null);
  const [refreshResp, setRefreshResp] = useState(null);
  const [authDiag, setAuthDiag] = useState(() => getAuthDiagnostics());
  const [error, setError] = useState("");

  const captureState = () => {
    setCookies(readCookies());
    try {
      setSessionKeys(
        Object.keys(window.sessionStorage || {}).map((k) => ({
          key: k,
          value: window.sessionStorage.getItem(k),
        }))
      );
      setLocalKeys(
        Object.keys(window.localStorage || {}).map((k) => ({
          key: k,
          value: window.localStorage.getItem(k),
        }))
      );
    } catch {
      setSessionKeys([]);
      setLocalKeys([]);
    }
    setAuthDiag(getAuthDiagnostics());
  };

  useEffect(() => {
    if (!DEBUG_AUTH_ENABLED) return undefined;
    const id = window.setTimeout(() => {
      captureState();
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const refreshView = () => {
    captureState();
    setProfileResp(null);
    setRefreshResp(null);
    setError("");
  };

  const checkProfile = async () => {
    setProfileResp(null);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: "include",
        headers: {
          "x-product-key": PRODUCT_KEY,
        },
      });
      const text = await res.text();
      setProfileResp({ status: res.status, body: text });
      setAuthDiag(getAuthDiagnostics());
    } catch (err) {
      setError(String(err?.message || err));
    }
  };

  const checkRefresh = async () => {
    setRefreshResp(null);
    setError("");
    try {
      await refreshAccessToken();
      const diag = getAuthDiagnostics();
      setAuthDiag(diag);
      setRefreshResp({
        status: diag?.lastRefreshHttpStatus || 200,
        body: JSON.stringify(diag, null, 2),
      });
    } catch (err) {
      const diag = getAuthDiagnostics();
      setAuthDiag(diag);
      setRefreshResp({
        status: Number(err?.response?.status || diag?.lastRefreshHttpStatus || 0),
        body: JSON.stringify(
          {
            message: err?.message || "refresh failed",
            serverMessage: err?.response?.data?.message || err?.response?.data?.error?.message || "",
            diagnostics: diag,
          },
          null,
          2
        ),
      });
    }
  };

  const clearVolatile = () => {
    try {
      for (const k of Object.keys(window.sessionStorage || {})) {
        if (String(k || "").startsWith("property:volatile:") || k.startsWith("property:volatile:")) {
          window.sessionStorage.removeItem(k);
        }
      }
      refreshView();
    } catch {}
  };

  const csrfCookie =
    cookies.find((c) => c.name === "csrf_token_property")?.value ||
    cookies.find((c) => c.name === "csrf_token")?.value ||
    cookies.find((c) => c.name === "csrfToken")?.value ||
    "";

  if (!DEBUG_AUTH_ENABLED) {
    return (
      <div style={{ padding: 24, fontFamily: "Inter, sans-serif" }}>
        Debug auth tools are disabled.
      </div>
    );
  }

  return (
    <div style={{ padding: 24, fontFamily: "Inter, sans-serif" }}>
      <h2>Auth Debug</h2>
      <p>Use this page to inspect cookies, sessionStorage, localStorage and test profile endpoint.</p>

      <div style={{ marginTop: 12 }}>
        <button onClick={refreshView} style={{ marginRight: 8 }}>Refresh</button>
        <button onClick={checkProfile} style={{ marginRight: 8 }}>Call /auth/me</button>
        <button onClick={checkRefresh} style={{ marginRight: 8 }}>Call /auth/refresh</button>
        <button onClick={clearVolatile} style={{ marginRight: 8 }}>Clear volatile session keys</button>
      </div>

      <section style={{ marginTop: 18 }}>
        <h3>Auth Diagnostics</h3>
        <div style={{ border: "1px solid #ddd", padding: 10, fontSize: 13 }}>
          <div><strong>Access Token (memory):</strong> {getInMemoryAccessToken() ? "present" : "missing"}</div>
          <div><strong>CSRF Cookie:</strong> {csrfCookie ? "present" : "missing"}</div>
          <div><strong>Refresh In Flight:</strong> {authDiag?.refreshInFlight ? "yes" : "no"}</div>
          <div><strong>Last Refresh Status:</strong> {authDiag?.lastRefreshStatus || "idle"}</div>
          <div><strong>Last Refresh HTTP:</strong> {authDiag?.lastRefreshHttpStatus || 0}</div>
          <div><strong>Last Refresh Error:</strong> {authDiag?.lastRefreshError || "-"}</div>
          <div><strong>Last Refresh At:</strong> {authDiag?.lastRefreshAt ? new Date(authDiag.lastRefreshAt).toLocaleString() : "-"}</div>
        </div>
      </section>

      <section style={{ marginTop: 18 }}>
        <h3>Cookies</h3>
        <div style={{ maxHeight: 220, overflow: "auto", border: "1px solid #ddd", padding: 8 }}>
          {cookies.length === 0 && <div>No cookies visible (HTTP-only cookies may be hidden)</div>}
          {cookies.map((c) => (
            <div key={c.name} style={{ fontSize: 13 }}>
              <strong>{c.name}:</strong> {c.value}
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 12 }}>
        <h3>Session Storage</h3>
        <div style={{ maxHeight: 180, overflow: "auto", border: "1px solid #ddd", padding: 8 }}>
          {sessionKeys.length === 0 && <div>Empty</div>}
          {sessionKeys.map((s) => (
            <div key={s.key} style={{ fontSize: 13 }}>
              <strong>{s.key}:</strong> {String(s.value).slice(0, 200)}
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 12 }}>
        <h3>Local Storage</h3>
        <div style={{ maxHeight: 180, overflow: "auto", border: "1px solid #ddd", padding: 8 }}>
          {localKeys.length === 0 && <div>Empty</div>}
          {localKeys.map((s) => (
            <div key={s.key} style={{ fontSize: 13 }}>
              <strong>{s.key}:</strong> {String(s.value).slice(0, 200)}
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 12 }}>
        <h3>Profile Endpoint</h3>
        {error && <div style={{ color: "#c00" }}>{error}</div>}
        {profileResp && (
          <div style={{ whiteSpace: "pre-wrap", border: "1px solid #ddd", padding: 8 }}>
            <div><strong>Status:</strong> {profileResp.status}</div>
            <div style={{ marginTop: 6 }}>{profileResp.body}</div>
          </div>
        )}
      </section>

      <section style={{ marginTop: 12 }}>
        <h3>Refresh Endpoint</h3>
        {refreshResp && (
          <div style={{ whiteSpace: "pre-wrap", border: "1px solid #ddd", padding: 8 }}>
            <div><strong>Status:</strong> {refreshResp.status}</div>
            <div style={{ marginTop: 6 }}>{refreshResp.body}</div>
          </div>
        )}
      </section>
    </div>
  );
}

