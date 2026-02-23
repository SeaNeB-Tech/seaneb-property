"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuthenticatedSession } from "@/services/authSession.service";
import { getAuthAppUrl } from "@/lib/authAppUrl";
import { getCookie, removeCookie } from "@/services/cookie";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    const validate = async () => {
      if (!active) return;
      const postOtpVerified = String(getCookie("post_otp_verified") || "")
        .trim()
        .toLowerCase();
      const inPostOtpWindow =
        postOtpVerified === "1" || postOtpVerified === "true" || postOtpVerified === "yes";
      const attempts = inPostOtpWindow ? 12 : 3;
      const retryDelayMs = inPostOtpWindow ? 500 : 350;

      // Grace retries prevent immediate bounce after OTP verify redirect.
      let authenticated = false;
      for (let i = 0; i < attempts; i += 1) {
        authenticated = await checkAuthenticatedSession({ strict: true });
        if (authenticated) break;
        if (i < attempts - 1) {
          await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
        }
      }
      if (!active) return;

      if (!authenticated) {
        if (typeof window !== "undefined") {
          const returnTo = encodeURIComponent(window.location.href);
          router.replace(getAuthAppUrl(`/auth/login?returnTo=${returnTo}`));
          return;
        }
        router.replace(getAuthAppUrl("/auth/login"));
        return;
      }

      removeCookie("post_otp_verified");
      setReady(true);
    };

    void validate();

    return () => {
      active = false;
    };
  }, [router]);

  if (!ready) {
    return <div className="min-h-screen bg-[#f8f5ec]" aria-busy="true" />;
  }

  return children;
}
