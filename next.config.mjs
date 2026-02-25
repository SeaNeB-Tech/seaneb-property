const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const normalizedBasePath =
  rawBasePath && rawBasePath !== "/"
    ? `/${rawBasePath.replace(/^\/+|\/+$/g, "")}`
    : "";
const normalizeUrl = (value) => String(value || "").replace(/\/+$/, "");
const isUsableUrl = (value) => {
  try {
    const url = new URL(normalizeUrl(value));
    return Boolean(url.protocol && url.host);
  } catch {
    return false;
  }
};
const appBaseUrl = normalizeUrl(process.env.NEXT_PUBLIC_APP_URL || "");
const authAppBaseUrl = normalizeUrl(process.env.NEXT_PUBLIC_AUTH_APP_URL || "");
const devApiUrl = process.env.NEXT_PUBLIC_DEV_URL || "";
const centralApiUrl = process.env.NEXT_PUBLIC_CENTRAL_URL || "";
const nextEnv = String(process.env.NEXT_ENV || "").trim().toLowerCase();
const apiBaseUrl = normalizeUrl(nextEnv === "development" ? devApiUrl : centralApiUrl);
const fallbackApiBaseUrl = normalizeUrl(nextEnv === "development" ? centralApiUrl : devApiUrl);
const safeApiBaseUrl = isUsableUrl(apiBaseUrl) ? apiBaseUrl : fallbackApiBaseUrl;
const apiHostname = isUsableUrl(safeApiBaseUrl) ? new URL(safeApiBaseUrl).hostname : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: normalizedBasePath,
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || appBaseUrl,
    NEXT_PUBLIC_AUTH_APP_URL: process.env.NEXT_PUBLIC_AUTH_APP_URL || authAppBaseUrl,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      ...(apiHostname
        ? [
            {
              protocol: "https",
              hostname: apiHostname,
            },
          ]
        : []),
      {
        protocol: "https",
        hostname: "img.icons8.com",
      },
    ],
  },
  async redirects() {
    return [
      ...(authAppBaseUrl
        ? [
            {
              source: "/auth/:path*",
              destination: `${authAppBaseUrl}/auth/:path*`,
              permanent: false,
            },
          ]
        : []),
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    if (!safeApiBaseUrl) return [];
    return [
      {
        source: "/api/:path*",
        destination: `${safeApiBaseUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig; 
