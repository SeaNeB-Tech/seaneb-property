"use client";

import { ListingAuthProvider } from "@/lib/auth/AuthProvider";

export default function ListingAuthProviderClient({ children }) {
  return <ListingAuthProvider>{children}</ListingAuthProvider>;
}
