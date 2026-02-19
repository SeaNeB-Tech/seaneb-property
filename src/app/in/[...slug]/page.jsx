import { notFound } from "next/navigation";

import CountryPage from "@/components/pages/CountryPage";
import StatePage from "@/components/pages/StatePage";
import CityPage from "@/components/pages/CityPage";
import AreaPage from "@/components/pages/AreaPage";
import { API_BASE_URL } from "@/lib/apiBaseUrl";

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

const API_BASE = API_BASE_URL;

function toSeoSlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

async function looksLikeIndiaState(slug) {
  try {
    const response = await fetch(`${API_BASE}/location/property/in/states`, {
      cache: "no-store",
    });
    const payload = await response.json();
    const states = Array.isArray(payload?.data) ? payload.data : [];

    return states.some((state) => {
      const stateSlug = String(state?.state_slug || state?.slug || "").toLowerCase();
      const stateSeo = toSeoSlug(state?.state_name || state?.name || stateSlug);
      return slug === stateSlug || slug === stateSeo;
    });
  } catch (error) {
    return false;
  }
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
  if (parts.length === 1) {
    const [one] = parts;
    if (one === "in") {
      return {
        title: "Properties in India | SeaNeB",
        description: "Browse states, cities, and area-level property listings across India.",
      };
    }

    const cityCodeMatch = one.match(/^(.*)-([a-z]{2})$/i);
    if (cityCodeMatch && INDIA_STATE_CODES.has(cityCodeMatch[2])) {
      return {
        title: `Properties in ${toTitle(cityCodeMatch[1])} | SeaNeB`,
        description: `Explore verified properties in ${toTitle(cityCodeMatch[1])}.`,
      };
    }

    if (one.includes("-")) {
      const splitAt = one.lastIndexOf("-");
      const areaPart = one.slice(0, splitAt);
      return {
        title: `Properties in ${toTitle(areaPart)} | SeaNeB`,
        description: `Discover listings and businesses in ${toTitle(areaPart)}.`,
      };
    }

    return {
      title: `Properties in ${toTitle(one)} | SeaNeB`,
      description: `Browse verified property listings in ${toTitle(one)}.`,
    };
  }

  return {
    title: "SeaNeB",
    description: "Discover properties by country, state, city, and area.",
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

    const cityCodeMatch = one.match(/^(.*)-([a-z]{2})$/i);
    if (cityCodeMatch && INDIA_STATE_CODES.has(cityCodeMatch[2])) {
      const citySlug = cityCodeMatch[1];
      const stateSlug = cityCodeMatch[2];
      return <CityPage countrySlug="in" stateSlug={stateSlug} citySlug={citySlug} />;
    }

    if (await looksLikeIndiaState(one)) {
      return <StatePage countrySlug="in" stateSlug={one} />;
    }

    if (one.includes("-")) {
      const splitAt = one.lastIndexOf("-");
      const areaSlug = one.slice(0, splitAt);
      const citySlug = one.slice(splitAt + 1);
      return <AreaPage countrySlug="in" citySlug={citySlug} areaSlug={areaSlug} />;
    }

    return <StatePage countrySlug="in" stateSlug={one} />;
  }

  return notFound();
}
