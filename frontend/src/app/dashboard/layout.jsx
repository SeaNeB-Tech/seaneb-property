"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  hasBusinessFromProfile,
  syncBusinessRegistrationCookie,
} from "@/services/user.service";
import { useListingAuth } from "@/lib/auth/AuthProvider";
import { openAuthLoginTab } from "@/lib/crossAppTabNavigation";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { status, user, isReady } = useListingAuth();
  const [routeReady, setRouteReady] = useState(false);

  useEffect(() => {
    let active = true;
    const safePath = String(pathname || "").trim();
    const isBusinessRoute =
      safePath === "/dashboard/broker" ||
      safePath.startsWith("/dashboard/listings") ||
      safePath.startsWith("/dashboard/analytics");

    const validate = async () => {
      if (!active) return;
      setRouteReady(false);

      if (!isReady) {
        return;
      }

      if (status !== "authenticated") {
        if (typeof window !== "undefined") {
          openAuthLoginTab();
          router.replace("/home");
        } else {
          router.replace("/home");
        }
        return;
      }

      if (!isBusinessRoute) {
        setRouteReady(true);
        return;
      }

      const isBrokerUser = Boolean(hasBusinessFromProfile(user || {}));
      syncBusinessRegistrationCookie(user || {});

      if (!active) return;
      if (isBrokerUser === false) {
        router.replace("/home");
        return;
      }

      setRouteReady(true);
    };

    void validate();

    return () => {
      active = false;
    };
  }, [isReady, pathname, router, status, user]);

  if (!routeReady) {
    return <div className="min-h-screen bg-[#f8f5ec]" aria-busy="true" />;
  }

  return children;
}

