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
const toOrigin = (value) => {
  try {
    return new URL(normalizeUrl(value)).origin;
  } catch {
    return "";
  }
};
const appBaseUrl = normalizeUrl(process.env.NEXT_PUBLIC_LISTING_URL || "");
const authAppBaseUrl = normalizeUrl(process.env.NEXT_PUBLIC_APP_URL || "");
const directApiBaseUrl =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "";
const devApiUrl = process.env.NEXT_PUBLIC_DEV_URL || "";
const centralApiUrl = process.env.NEXT_PUBLIC_CENTRAL_URL || process.env.NEXT_PUBLIC_CENTRAL_API_URL || "";
const DEFAULT_FALLBACK_API_URL = "https://central-api.seaneb.com/api/v1";
const nextEnv = String(process.env.NEXT_ENV || "").trim().toLowerCase();
const apiBaseUrl = normalizeUrl(
  nextEnv === "development"
    ? devApiUrl || centralApiUrl || directApiBaseUrl
    : centralApiUrl || devApiUrl || directApiBaseUrl
);
const fallbackApiBaseUrl = normalizeUrl(
  nextEnv === "development"
    ? centralApiUrl || devApiUrl || directApiBaseUrl
    : devApiUrl || centralApiUrl || directApiBaseUrl
);
const safeApiBaseUrl = isUsableUrl(directApiBaseUrl)
  ? normalizeUrl(directApiBaseUrl)
  : isUsableUrl(apiBaseUrl)
    ? apiBaseUrl
    : isUsableUrl(fallbackApiBaseUrl)
      ? fallbackApiBaseUrl
      : DEFAULT_FALLBACK_API_URL;
const apiHostname = isUsableUrl(safeApiBaseUrl) ? new URL(safeApiBaseUrl).hostname : "";
const isProduction = process.env.NODE_ENV === "production";
const connectSrc = [
  "'self'",
  toOrigin(safeApiBaseUrl),
  toOrigin(appBaseUrl),
  toOrigin(authAppBaseUrl),
].filter(Boolean).join(" ");
const imgSrc = ["'self'", "data:", "blob:", "https://flagcdn.com", "https://img.icons8.com"].join(" ");
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "frame-src 'self' https://www.google.com https://maps.google.com",
  "object-src 'none'",
  `connect-src ${connectSrc}`,
  `img-src ${imgSrc}`,
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
].join("; ");
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "Content-Security-Policy", value: csp },
  ...(isProduction
    ? [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" }]
    : []),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  basePath: normalizedBasePath,
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || authAppBaseUrl,
    NEXT_PUBLIC_LISTING_URL: process.env.NEXT_PUBLIC_LISTING_URL || appBaseUrl,
    NEXT_PUBLIC_COOKIE_DOMAIN: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || (isProduction ? ".seaneb.com" : ""),
    NEXT_PUBLIC_COOKIE_SAMESITE: process.env.NEXT_PUBLIC_COOKIE_SAMESITE || "None",
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
  compiler: {
    removeConsole: isProduction ? { exclude: ["error", "warn"] } : false,
  },
  async redirects() {
    return [
      ...(authAppBaseUrl
        ? [
            {
              source: "/auth/login",
              destination: `${authAppBaseUrl}/auth/login`,
              permanent: false,
            },
            {
              source: "/auth/business-register",
              destination: `${authAppBaseUrl}/auth/business-register`,
              permanent: false,
            },
            {
              source: "/auth/business-reg",
              destination: `${authAppBaseUrl}/auth/business-reg`,
              permanent: false,
            },
            {
              source: "/auth/complete-profile",
              destination: `${authAppBaseUrl}/auth/complete-profile`,
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
        // Exclude paths with local route handlers (auth/*, v1/*, location/*)
        source: "/api/((?!auth|v1|location).*)",
        destination: `${safeApiBaseUrl}/$1`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig; 
