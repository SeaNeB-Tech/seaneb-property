"use client";

import { useEffect, useState } from "react";
import { isAuthenticatedByCookies, subscribeAuthState } from "@/services/authSession.service";
import { ensureAccessToken } from "@/services/api";

export function useAuthState() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let active = true;

    const syncAuth = async () => {
      const cookieAuth = isAuthenticatedByCookies();
      if (cookieAuth) {
        if (active) setIsAuthenticated(true);
        return;
      }

      const refreshed = await ensureAccessToken();
      if (active) {
        setIsAuthenticated(Boolean(refreshed || isAuthenticatedByCookies()));
      }
    };

    void syncAuth();
    const unsubscribe = subscribeAuthState(() => {
      void syncAuth();
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return isAuthenticated;
}
