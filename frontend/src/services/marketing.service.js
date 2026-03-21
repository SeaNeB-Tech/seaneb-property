import { API_REMOTE_BASE_URL, API_REMOTE_FALLBACK_BASE_URL } from "@/lib/core/apiBaseUrl";

const API_BASE = String(API_REMOTE_BASE_URL || API_REMOTE_FALLBACK_BASE_URL || "")
  .trim()
  .replace(/\/+$/, "");

async function fetchFromMarketingAPI(path) {
  if (!API_BASE) {
    throw new Error("Marketing API base URL is not configured");
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    credentials: "include",
    next: { revalidate: 300 },
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`);
  }

  return response.json();
}

export async function fetchHomePageData() {
  return fetchFromMarketingAPI("/marketing/home");
}

export async function fetchAboutPageData() {
  return fetchFromMarketingAPI("/marketing/about");
}

export async function fetchSolutionPageData() {
  return fetchFromMarketingAPI("/marketing/solution");
}

export async function fetchBlogsPageData() {
  return fetchFromMarketingAPI("/marketing/blogs");
}

export async function fetchPartnerPageData() {
  return fetchFromMarketingAPI("/marketing/partner");
}

export async function fetchContactPageData() {
  return fetchFromMarketingAPI("/marketing/contact");
}
