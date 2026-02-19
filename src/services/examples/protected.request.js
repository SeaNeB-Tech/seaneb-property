import api from "@/services/api";

export async function fetchProtectedProfile() {
  const { data } = await api.get("/profile/me");
  return data;
}
