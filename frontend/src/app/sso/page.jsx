"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SsoPage() {
  const router = useRouter();

  useEffect(() => {
    // SSO flow is disabled. Keep route for backward compatibility.
    router.replace("/home");
  }, [router]);

  return null;
}
