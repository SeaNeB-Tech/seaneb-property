"use client";

import { useEffect, useState } from "react";
import { checkAuthenticatedSession, subscribeAuthState } from "@/services/authSession.service";
import { getCookie, removeCookie } from "@/services/cookie";
import { getInMemoryAccessToken, hasCsrfCookie } from "@/lib/api/client";

const POST_OTP_VERIFIED_COOKIE = "post_otp_verified";

const hasPostOtpVerifiedFlag = () => {
  const value = String(getCookie(POST_OTP_VERIFIED_COOKIE) || "").trim().toLowerCase();
  return value === "1" || value === "true" || value === "yes";
};

export function useAuthState() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const setAuthState = (nextValue) => {
      if (isMounted) setIsAuthenticated(nextValue);
    };

    const syncAuthState = async () => {
      try {
        const inPostOtpWindow = hasPostOtpVerifiedFlag();
        const shouldUseStrict = inPostOtpWindow;
        const attempts = shouldUseStrict ? 3 : 2;
        const retryDelayMs = 300;

        let authenticated = false;
        for (let i = 0; i < attempts; i += 1) {
          authenticated = await checkAuthenticatedSession({ strict: shouldUseStrict });
          if (authenticated) break;
          if (i < attempts - 1) {
            await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
          }
        }

        if (inPostOtpWindow) {
          removeCookie(POST_OTP_VERIFIED_COOKIE);
        }

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
