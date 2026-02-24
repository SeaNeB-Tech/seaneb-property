import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const portsConfigPath = path.resolve(__dirname, "..", "deployment-ports.json");

const readPortsConfig = () => {
  try {
    const raw = fs.readFileSync(portsConfigPath, "utf8");
    const parsed = JSON.parse(raw);
    return {
      host: String(parsed?.host || "localhost").trim(),
      listingPort: String(parsed?.listingPort || "8877").trim(),
      appPort: String(parsed?.appPort || "3000").trim(),
    };
  } catch {
    return { host: "localhost", listingPort: "8877", appPort: "3000" };
  }
};

const portsConfig = readPortsConfig();
const defaultSiteUrl = `http://${portsConfig.host}:${portsConfig.listingPort}`;
const defaultAuthUrl = `http://${portsConfig.host}:${portsConfig.appPort}`;

const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const normalizedBasePath =
  rawBasePath && rawBasePath !== "/"
    ? `/${rawBasePath.replace(/^\/+|\/+$/g, "")}`
    : "";
const normalizeUrl = (value) => String(value || "").replace(/\/+$/, "");
const authAppBaseUrl = normalizeUrl(
  process.env.NEXT_PUBLIC_AUTH_APP_URL || defaultAuthUrl
);
const devApiUrl =
  process.env.API_DEV_URL ||
  process.env.NEXT_PUBLIC_API_DEV_URL ||
  "https://dev.seaneb.com/api/v1";
const centralApiUrl =
  process.env.API_CENTRAL_URL ||
  process.env.NEXT_PUBLIC_API_CENTRAL_URL ||
  "https://central-api.seaneb.com/api/v1";
const envSelectedApiUrl = process.env.NODE_ENV === "development" ? devApiUrl : centralApiUrl;
const apiBaseUrl = (
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  envSelectedApiUrl
).replace(/\/+$/, "");
const apiHostname = new URL(apiBaseUrl).hostname;

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
        destination: `${apiBaseUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig; 
