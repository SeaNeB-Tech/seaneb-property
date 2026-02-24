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
const defaultSiteUrl = normalizeUrl(
  process.env.NEXT_PUBLIC_SITE_URL || "http://159.65.154.221:1001"
);
const defaultAuthUrl = normalizeUrl(
  process.env.NEXT_PUBLIC_AUTH_APP_URL || "http://159.65.154.221:1002"
);
const authAppBaseUrl = defaultAuthUrl;
const devApiUrl = process.env.NEXT_PUBLIC_DEV_URL || "";
const centralApiUrl = process.env.NEXT_PUBLIC_CENTRAL_URL || "";
const localApiFallbackUrl = "https://dev.seaneb.com/api/v1";
const nextEnv = String(process.env.NEXT_ENV || "").trim().toLowerCase();
const primaryApiUrl = nextEnv === "development" ? devApiUrl : centralApiUrl;
const secondaryApiUrl = nextEnv === "development" ? centralApiUrl : devApiUrl;
const envSelectedApiUrl = isUsableUrl(primaryApiUrl) ? primaryApiUrl : secondaryApiUrl;
const apiBaseUrl = (
  process.env.API_URL ||
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  envSelectedApiUrl
).replace(/\/+$/, "");
const safeApiBaseUrl = isUsableUrl(apiBaseUrl)
  ? apiBaseUrl
  : normalizeUrl(isUsableUrl(secondaryApiUrl) ? secondaryApiUrl : localApiFallbackUrl);
const apiHostname = new URL(safeApiBaseUrl).hostname;

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: normalizedBasePath,
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl,
    NEXT_PUBLIC_AUTH_APP_URL: process.env.NEXT_PUBLIC_AUTH_APP_URL || defaultAuthUrl,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      {
        protocol: "https",
        hostname: apiHostname,
      },
      {
        protocol: "https",
        hostname: "img.icons8.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/auth/:path*",
        destination: `${authAppBaseUrl}/auth/:path*`,
        permanent: false,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${safeApiBaseUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig; 
