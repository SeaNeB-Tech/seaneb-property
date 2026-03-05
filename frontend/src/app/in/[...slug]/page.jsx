import { notFound } from "next/navigation";

import CountryPage from "@/components/pages/CountryPage";
import StatePage from "@/components/pages/StatePage";
import CityPage from "@/components/pages/CityPage";
import AreaPage from "@/components/pages/AreaPage";
import { API_BASE_URL, API_REMOTE_FALLBACK_BASE_URL } from "@/lib/core/apiBaseUrl";
import { getSiteUrl } from "@/lib/siteUrl";
import { resolveCountryFromList } from "@/lib/location/resolveCountry";

const INDIA_STATE_CODES = new Set([
  "an",
  "ap",
  "ar",
  "as",
  "br",
  "ch",
  "ct",
  "dd",
  "dl",
  "dn",
  "ga",
  "gj",
  "hp",
  "hr",
  "jh",
  "jk",
  "ka",
  "kl",
  "la",
  "ld",
  "mh",
  "ml",
  "mn",
  "mp",
  "mz",
  "nl",
  "or",
  "pb",
  "py",
  "rj",
  "sk",
  "tn",
  "tr",
  "ts",
  "uk",
  "up",
  "wb",
]);

const API_BASE_CANDIDATES = Array.from(
  new Set([API_BASE_URL, API_REMOTE_FALLBACK_BASE_URL].filter(Boolean))
);
const LOCATION_PRODUCT_KEY = "property";

function toSeoSlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function getList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.states)) return payload.states;
  if (Array.isArray(payload?.countries)) return payload.countries;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  return [];
}

function normalizeCountry(item) {
  const row = item || {};
  const slug = toSeoSlug(
    row.country_slug || row.slug || row.code || row.iso2 || row.iso_code || row.country_name || row.name
  );
  const name = String(row.country_name || row.name || row.label || row.title || slug || "").trim();
  return {
    slug,
    name,
    raw: row,
  };
}

async function resolveDefaultCountrySlug() {
  for (const apiBase of API_BASE_CANDIDATES) {
    try {
      const response = await fetch(`${apiBase}/location/${LOCATION_PRODUCT_KEY}/countries`, {
        cache: "no-store",
        credentials: "include",
      });
      if (!response.ok) continue;
      const payload = await response.json();
      const countries = getList(payload).map(normalizeCountry);
      const resolvedCountry = resolveCountryFromList(countries, "in");
      if (resolvedCountry?.apiSlug) return resolvedCountry.apiSlug;
    } catch {
      // Try secondary backend URL.
    }
  }

  return "in";
}

async function looksLikeIndiaState(slug) {
  const countrySlug = await resolveDefaultCountrySlug();

  for (const apiBase of API_BASE_CANDIDATES) {
    try {
      const response = await fetch(`${apiBase}/location/${LOCATION_PRODUCT_KEY}/${countrySlug}/states`, {
        cache: "no-store",
        credentials: "include",
      });
      if (!response.ok) continue;
      const payload = await response.json();
      const states = getList(payload);

      return states.some((state) => {
        const stateSlug = String(state?.state_slug || state?.slug || "").toLowerCase();
        const stateSeo = toSeoSlug(state?.state_name || state?.name || stateSlug);
        return slug === stateSlug || slug === stateSeo;
      });
    } catch {
      // Try secondary backend URL.
    }
  }

  return false;
}

async function resolveIndiaStateFromToken(token) {
  const normalizedToken = toSeoSlug(token);
  if (!normalizedToken) return null;
  const countrySlug = await resolveDefaultCountrySlug();

  for (const apiBase of API_BASE_CANDIDATES) {
    try {
      const response = await fetch(`${apiBase}/location/${LOCATION_PRODUCT_KEY}/${countrySlug}/states`, {
        cache: "no-store",
        credentials: "include",
      });
      if (!response.ok) continue;
      const payload = await response.json();
      const states = getList(payload);

      const match = states.find((state) => {
        const stateSlug = toSeoSlug(state?.state_slug || state?.slug || "");
        const stateSeo = toSeoSlug(state?.state_name || state?.name || "");
        return normalizedToken === stateSlug || normalizedToken === stateSeo;
      });

      if (!match) continue;
      return String(match?.state_slug || match?.slug || "").toLowerCase();
    } catch {
      // Try secondary backend URL.
    }
  }

  return null;
}

function toTitle(slug) {
  return String(slug || "")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function normalizeParts(slugParam) {
  if (!slugParam) return [];
  const list = Array.isArray(slugParam) ? slugParam : [slugParam];
  return list
    .map((item) => decodeURIComponent(String(item || "")).trim().toLowerCase())
    .filter(Boolean);
}

function getPageMeta(parts) {
  const canonicalPath = `/in/${parts.join("/")}`;

  if (parts.length === 1) {
    const [one] = parts;
    if (one === "in") {
      return {
        title: "Properties in India | SeaNeB",
        description: "Browse states, cities, and area-level property listings across India.",
        alternates: {
          canonical: getSiteUrl("/in"),
        },
        robots: {
          index: true,
          follow: true,
        },
      };
    }

    const cityCodeMatch = one.match(/^(.*)-([a-z]{2})$/i);
    if (cityCodeMatch && INDIA_STATE_CODES.has(cityCodeMatch[2])) {
      return {
        title: `Properties in ${toTitle(cityCodeMatch[1])} | SeaNeB`,
        description: `Explore verified properties in ${toTitle(cityCodeMatch[1])}.`,
        alternates: {
          canonical: getSiteUrl(canonicalPath),
        },
        robots: {
          index: true,
          follow: true,
        },
      };
    }

    if (one.includes("-")) {
      const splitAt = one.lastIndexOf("-");
      const areaPart = one.slice(0, splitAt);
      return {
        title: `Properties in ${toTitle(areaPart)} | SeaNeB`,
        description: `Discover listings and businesses in ${toTitle(areaPart)}.`,
        alternates: {
          canonical: getSiteUrl(canonicalPath),
        },
        robots: {
          index: true,
          follow: true,
        },
      };
    }

    return {
      title: `Properties in ${toTitle(one)} | SeaNeB`,
      description: `Browse verified property listings in ${toTitle(one)}.`,
      alternates: {
        canonical: getSiteUrl(canonicalPath),
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  }

  return {
    title: "SeaNeB",
    description: "Discover properties by country, state, city, and area.",
    alternates: {
      canonical: getSiteUrl(canonicalPath),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateMetadata({ params }) {
  const resolved = await params;
  const parts = normalizeParts(resolved?.slug);
  return getPageMeta(parts);
}

export default async function InSlugPage({ params }) {
  const resolved = await params;
  const parts = normalizeParts(resolved?.slug);

  if (parts.length === 0) return notFound();

  if (parts.length === 1) {
    const [one] = parts;

    if (one === "in") {
      return <CountryPage countrySlug="in" />;
    }

    const splitAt = one.lastIndexOf("-");
    if (splitAt > 0) {
      const left = one.slice(0, splitAt);
      const right = one.slice(splitAt + 1);

      const cityCodeMatch = one.match(/^(.*)-([a-z]{2})$/i);
      if (cityCodeMatch && INDIA_STATE_CODES.has(cityCodeMatch[2])) {
        const citySlug = cityCodeMatch[1];
        const stateSlug = cityCodeMatch[2];
        return <CityPage countrySlug="in" stateSlug={stateSlug} citySlug={citySlug} />;
      }

      const resolvedStateSlug = await resolveIndiaStateFromToken(right);
      if (resolvedStateSlug) {
        return <CityPage countrySlug="in" stateSlug={resolvedStateSlug} citySlug={left} />;
      }

      return <AreaPage countrySlug="in" citySlug={right} areaSlug={left} />;
    }

    if (await looksLikeIndiaState(one)) {
      return <StatePage countrySlug="in" stateSlug={one} />;
    }

    return <StatePage countrySlug="in" stateSlug={one} />;
  }

  return notFound();
}
