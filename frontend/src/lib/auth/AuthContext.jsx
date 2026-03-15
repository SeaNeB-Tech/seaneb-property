"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { authApi, setAuthFailureHandler } from "@/lib/auth/apiClient";
import {
  getAccessToken,
  setAccessToken as setInMemoryAccessToken,
  clearAccessToken,
} from "@/lib/auth/tokenStorage";
import {
  refreshSession,
  logoutAndClearAuthSession,
  notifyAuthChanged,
  subscribeAuthState,
  AUTH_LOGOUT_STORAGE_KEY,
  clearAuthFailureArtifacts,
  shouldClearAuthOnError,
} from "@/services/auth.service";
import {
  setAuthUserAuthenticated,
  setAuthUserLoggedOut,
} from "@/services/user.service";

const AuthContext = createContext(null);
const AUTH_SSO_RESULT_KEY = "seaneb_sso_exchange_result";
const AUTH_SSO_MESSAGE_TYPE = "seaneb:sso:exchange";
const LOGIN_SUCCESS_MESSAGE_TYPE = "SEANEB_LOGIN_SUCCESS";
const LOGOUT_MESSAGE_TYPE = "SEANEB_LOGOUT";
const RETURN_HOME_MESSAGE_TYPE = "SEANEB_RETURN_HOME";
const BUSINESS_REGISTER_SUCCESS_MESSAGE_TYPE = "SEANEB_BUSINESS_REGISTER_SUCCESS";
const BUSINESS_REGISTER_LOCK_KEY = "seaneb_business_register_flow_lock_until";
const SSO_CALLBACK_PATH = "/auth/sso/callback";

const isSsoCallbackRoute = () => {
  if (typeof window === "undefined") return false;
  const path = String(window.location.pathname || "").trim();
  return path === SSO_CALLBACK_PATH;
};

const hasAuthHint = () => {
  const token = String(getAccessToken() || "").trim();
  return Boolean(token);
};

export function ListingAuthProvider({ children }) {
  const [status, setStatus] = useState("unauthenticated");
  const [user, setUser] = useState(null);
  const [accessToken, setAccessTokenState] = useState("");
  const [ssoError, setSsoError] = useState("");
  const [isReady, setIsReady] = useState(false);
  const sessionSyncInFlightRef = useRef(null);

  const resetUnauthenticated = useCallback(() => {
    setUser(null);
    setAccessTokenState("");
    setStatus("unauthenticated");
    setAuthUserLoggedOut();
    setIsReady(true);
    return false;
  }, []);

  const applyUserProfile = useCallback((profilePayload) => {
    const nextUser = profilePayload?.data || profilePayload?.user || profilePayload || null;
    if (!nextUser) {
      return resetUnauthenticated();
    }
    setAccessTokenState(String(getAccessToken() || "").trim());
    setUser(nextUser);
    setStatus("authenticated");
    setAuthUserAuthenticated(nextUser);
    return true;
  }, [resetUnauthenticated]);

  const restoreSession = useCallback(async ({ force = false } = {}) => {
    if (isSsoCallbackRoute()) {
      return false;
    }

    if (sessionSyncInFlightRef.current) {
      return sessionSyncInFlightRef.current;
    }

    const run = (async () => {
      try {
        const sessionHint = await authApi.session({ force }).catch(() => null);
        const hasRefreshSession = Boolean(sessionHint?.hasRefreshSession);

        const hasSessionSignal = hasRefreshSession || hasAuthHint();
        if (!hasSessionSignal) {
          return resetUnauthenticated();
        }

        if (hasRefreshSession && !String(getAccessToken() || "").trim()) {
          await refreshSession();
        }

        let profilePayload = null;
        try {
          profilePayload = await authApi.me({ retryOn401: false });
        } catch (error) {
          const status = Number(error?.status || 0);
          if (status !== 401 && status !== 403) throw error;

          if (!hasSessionSignal) {
            return resetUnauthenticated();
          }

          const refreshed = await refreshSession();
          if (!refreshed) {
            if (shouldClearAuthOnError(error)) {
              clearAuthFailureArtifacts();
            }
            return resetUnauthenticated();
          }

          profilePayload = await authApi.me({ retryOn401: false });
        }

        if (!profilePayload) {
          clearAuthFailureArtifacts();
          return resetUnauthenticated();
        }
        const applied = applyUserProfile(profilePayload);
        setIsReady(true);
        return applied;
      } catch {
        return resetUnauthenticated();
      }
    })().finally(() => {
      sessionSyncInFlightRef.current = null;
    });

    sessionSyncInFlightRef.current = run;
    return run;
  }, [applyUserProfile, resetUnauthenticated]);

  const applyAccessToken = useCallback((token) => {
    const safeToken = setInMemoryAccessToken(token);
    setAccessTokenState(String(safeToken || "").trim());
    if (safeToken) {
      // When a fresh token is injected (SSO/login), immediately hydrate profile state.
      void restoreSession({ force: true });
    }
    return safeToken;
  }, [restoreSession]);

  const logout = useCallback(async ({ redirect } = { redirect: true }) => {
    const loggedOut = await logoutAndClearAuthSession();
    if (!loggedOut) return;

    setUser(null);
    setAccessTokenState("");
    setStatus("unauthenticated");
    setSsoError("");
    setAuthUserLoggedOut();
    notifyAuthChanged();

    if (redirect && typeof window !== "undefined") {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    return subscribeAuthState(() => {
      void restoreSession();
    });
  }, [restoreSession]);

  useEffect(() => {
    if (typeof window === "undefined") return () => {};

    const allowedAuthOrigin = (() => {
      const configured = String(process.env.NEXT_PUBLIC_AUTH_ORIGIN || "").trim();
      if (configured) return configured;

      const authAppUrl = String(process.env.NEXT_PUBLIC_AUTH_APP_URL || "").trim();
      if (authAppUrl) {
        try {
          return new URL(authAppUrl).origin;
        } catch {
          // ignore invalid auth URL
        }
      }

      console.warn("[auth] Auth origin is missing; cross-tab listener disabled.");
      return "";
    })();

    const consumePopupSignal = () => {
      void restoreSession({ force: true });
      notifyAuthChanged();
    };

    const onStorage = (event) => {
      if (event.key === AUTH_LOGOUT_STORAGE_KEY) {
        clearAccessToken();
        void restoreSession({ force: true });
        return;
      }

      if (event.key !== AUTH_SSO_RESULT_KEY) return;
      const payload = (() => {
        try {
          return JSON.parse(String(event.newValue || "{}"));
        } catch {
          return {};
        }
      })();
      if (payload?.ok !== true) return;
      consumePopupSignal();
    };

    const onMessage = (event) => {
      const messageType = String(event?.data?.type || "");
      if (messageType === LOGIN_SUCCESS_MESSAGE_TYPE) {
        if (!allowedAuthOrigin || event.origin !== allowedAuthOrigin) return;
        const token = String(event?.data?.accessToken || "").trim();
        if (token) {
          applyAccessToken(token);
        } else {
          void restoreSession({ force: true });
        }
        notifyAuthChanged();
        return;
      }

      if (messageType === LOGOUT_MESSAGE_TYPE) {
        if (!allowedAuthOrigin || event.origin !== allowedAuthOrigin) return;
        clearAccessToken();
        void restoreSession({ force: true });
        notifyAuthChanged();
        return;
      }

      if (messageType === RETURN_HOME_MESSAGE_TYPE) {
        if (!allowedAuthOrigin || event.origin !== allowedAuthOrigin) return;
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
        return;
      }

      if (messageType === BUSINESS_REGISTER_SUCCESS_MESSAGE_TYPE) {
        console.log("[auth] Received cross-tab message:", event.data);
        if (!allowedAuthOrigin || event.origin !== allowedAuthOrigin) return;
        try {
          window.localStorage.removeItem(BUSINESS_REGISTER_LOCK_KEY);
        } catch {
          // ignore storage errors
        }
        console.log("[auth] Restoring session after business registration");
        void restoreSession({ force: true });
        notifyAuthChanged();
        if (typeof window !== "undefined") {
          const path = String(window.location.pathname || "").trim();
          if (path !== "/" && path !== "/home") {
            window.location.href = "/";
          }
        }
        return;
      }

      if (event.origin !== window.location.origin) return;
      if (messageType !== AUTH_SSO_MESSAGE_TYPE) return;
      if (event.data?.ok !== true) return;
      consumePopupSignal();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("message", onMessage);
    };
  }, [applyAccessToken, restoreSession]);

  useEffect(() => {
    void restoreSession({ force: true });
  }, [restoreSession]);

  useEffect(() => {
    setAuthFailureHandler(async () => {
      await logout({ redirect: false });
    });

    return () => {
      setAuthFailureHandler(null);
    };
  }, [logout]);

  const value = useMemo(
    () => ({
      user,
      accessToken,
      status,
      isReady,
      ssoError,
      isRestoring: false,
      isAuthenticated: status === "authenticated",
      restoreSession,
      retryBridgeSso: async () => false,
      logout,
      applyUserProfile,
      applyAccessToken,
      setSsoError,
    }),
    [user, accessToken, status, isReady, ssoError, restoreSession, logout, applyUserProfile, applyAccessToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useListingAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useListingAuth must be used within ListingAuthProvider");
  }
  return context;
};
