import api from "./api";
import { getCookie } from "./cookie";
import { getDefaultProductKey } from "./pro.service";

const resolveProductKey = () => {
  const fromCookie = String(getCookie("product_key") || "").trim();
  if (fromCookie) return fromCookie;
  return getDefaultProductKey();
};

export const getMyProfile = async () => {
  const accessToken = getAccessTokenFromCookie();
  const headers = {
    "x-product-key": resolveProductKey(),
  };

  if (!accessToken) return null;

  headers.Authorization = `Bearer ${accessToken}`;

  const res = await api.get("/profile/me", { headers });
  return res?.data?.data || null;
};

export const getAccessTokenFromCookie = () => String(getCookie("access_token") || "").trim();
