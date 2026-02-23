"use client";

import { useEffect, useState } from "react";
import { checkAuthenticatedSession, subscribeAuthState } from "@/services/authSession.service";

export function useAuthState() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const setAuthState = (nextValue) => {
      if (isMounted) setIsAuthenticated(nextValue);
    };

    const syncAuthState = async () => {
      try {
        const authenticated = await checkAuthenticatedSession();
        setAuthState(Boolean(authenticated));
      } catch {
        setAuthState(false);
      }
    };

    void syncAuthState();
    const unsubscribe = subscribeAuthState(() => {
      void syncAuthState();
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  return isAuthenticated;
}
