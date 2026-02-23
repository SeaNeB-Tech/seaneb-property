import { redirect } from "next/navigation";
import CountryPage from "@/components/pages/CountryPage";
import { API_BASE_URL } from "@/lib/apiBaseUrl";

const LOCATION_PRODUCT_KEYS = [
  "property",
];

const toSeoSlug = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

const getList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.states)) return payload.states;
  if (Array.isArray(payload?.cities)) return payload.cities;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.data?.cities)) return payload.data.cities;
  return [];
};

async function fetchJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store" });
  if (!response.ok) return null;
  return response.json();
}

async function resolveSearchRoute(rawQuery) {
  const query = String(rawQuery || "").trim();
  const normalized = toSeoSlug(query);
  if (!normalized) return "/in";
  if (normalized === "india" || normalized === "in") return "/in";

  for (const productKey of LOCATION_PRODUCT_KEYS) {
    try {
      const statesPayload = await fetchJson(`/location/${productKey}/in/states`);
      const states = getList(statesPayload);
      const matchingState = states.find((state) => {
        const stateSlug = toSeoSlug(state?.state_slug || state?.slug || "");
        const stateName = toSeoSlug(state?.state_name || state?.name || "");
        return normalized === stateSlug || normalized === stateName;
      });
      if (matchingState) {
        const stateSlug = toSeoSlug(
          matchingState?.state_slug || matchingState?.slug || matchingState?.state_name
        );
        if (stateSlug) return `/in/${stateSlug}`;
      }
    } catch {
      // Continue with city lookup.
    }
  }

  try {
    const cityPayload =
      (await fetchJson(`/cities?search=${encodeURIComponent(query)}&limit=10`)) ||
      (await fetchJson(`/autocomplete-cities?input=${encodeURIComponent(query)}`));
    const cities = getList(cityPayload);
    const exactCity = cities.find((city) => {
      const citySlug = toSeoSlug(city?.city_slug || city?.slug || city?.name || "");
      const cityName = toSeoSlug(city?.city_name || city?.name || "");
      return normalized === citySlug || normalized === cityName;
    });
    const prefixCity = cities.find((city) => {
      const citySlug = toSeoSlug(city?.city_slug || city?.slug || city?.name || "");
      const cityName = toSeoSlug(city?.city_name || city?.name || "");
      return citySlug.startsWith(normalized) || cityName.startsWith(normalized);
    });
    const matchingCity = exactCity || prefixCity || cities[0];

    if (matchingCity) {
      const citySlug = toSeoSlug(
        matchingCity?.city_slug || matchingCity?.slug || matchingCity?.city_name || matchingCity?.name
      );
      let stateSlug = toSeoSlug(
        matchingCity?.state_slug ||
          matchingCity?.state_code ||
          matchingCity?.state ||
          matchingCity?.state_name ||
          matchingCity?.state?.slug ||
          matchingCity?.state?.state_slug ||
          matchingCity?.state?.name
      );

      // Fallback: map state name token to a valid state slug.
      if (citySlug && !stateSlug) {
        for (const productKey of LOCATION_PRODUCT_KEYS) {
          try {
            const statesPayload = await fetchJson(`/location/${productKey}/in/states`);
            const states = getList(statesPayload);
            const matchedState = states.find((state) => {
              const stateToken = toSeoSlug(
                matchingCity?.state || matchingCity?.state_name || matchingCity?.state_code
              );
              const stateBySlug = toSeoSlug(state?.state_slug || state?.slug || "");
              const stateByName = toSeoSlug(state?.state_name || state?.name || "");
              return stateToken && (stateToken === stateBySlug || stateToken === stateByName);
            });
            if (matchedState) {
              stateSlug = toSeoSlug(matchedState?.state_slug || matchedState?.slug || matchedState?.state_name);
              break;
            }
          } catch {
            // Keep fallback behavior.
          }
        }
      }

      if (citySlug && stateSlug) return `/in/${citySlug}-${stateSlug}`;
    }
  } catch {
    // Fallback to /in.
  }

  return "/in";
}

export const metadata = {
  title: "Buy, Sell & Rent Properties in India - SeaNeB Real Estate",
  description:
    "Explore residential and commercial real estate listings across India with SeaNeB. Find apartments, houses, commercial spaces in major cities.",
  keywords:
    "properties in India, buy property India, sell property India, rent property, real estate listings",
  openGraph: {
    title: "Properties in India - SeaNeB",
    description: "Browse thousands of property listings across India.",
    type: "website",
  },
};

export default async function InPage({ searchParams }) {
  const resolved = await searchParams;
  const q = String(resolved?.q || "").trim();
  if (q.length >= 2) {
    const targetRoute = await resolveSearchRoute(q);
    redirect(targetRoute);
  }

  return <CountryPage countrySlug="in" />;
}


