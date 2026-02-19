"use client";

import { useEffect, useState } from "react";
import { isAuthenticatedByCookies, subscribeAuthState } from "@/services/authSession.service";

export function useAuthState() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const syncAuth = () => setIsAuthenticated(isAuthenticatedByCookies());

    syncAuth();
    return subscribeAuthState(syncAuth);
  }, []);

  return isAuthenticated;
}
