const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const normalizedBasePath =
  rawBasePath && rawBasePath !== "/"
    ? `/${rawBasePath.replace(/^\/+|\/+$/g, "")}`
    : "";
const authAppBaseUrl = (process.env.NEXT_PUBLIC_AUTH_APP_URL || "https://property.seaneb.app").replace(
  /\/+$/,
  ""
);
const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://central-api.seaneb.com/api/v1").replace(
  /\/+$/,
  ""
);
const apiHostname = new URL(apiBaseUrl).hostname;

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: normalizedBasePath,
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
    ],
  },
  async redirects() {
    return [
      {
        source: "/dashboard/:path*",
        destination: `${authAppBaseUrl}/dashboard/:path*`,
        permanent: false,
      },
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
        destination: `${apiBaseUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig; 
