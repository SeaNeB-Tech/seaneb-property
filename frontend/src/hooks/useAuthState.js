"use client";

import { useListingAuth } from "@/hooks/auth/useListingAuth";

export function useAuthState() {
  const { status } = useListingAuth();
  return status === "authenticated";
}
