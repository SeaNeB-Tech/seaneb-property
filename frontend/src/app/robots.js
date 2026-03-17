import { SITE_URL, isUsableUrl } from "@/lib/siteUrl";

export default function robots() {
  const hasSiteUrl = isUsableUrl(SITE_URL);
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/dashboard/*", "/auth", "/auth/*", "/login"],
    },
    ...(hasSiteUrl ? { sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL } : {}),
  };
}

