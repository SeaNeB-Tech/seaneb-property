import api from "./api";
import { getDefaultProductKey } from "./product.service";

const CACHE_TTL_MS = 5 * 60 * 1000;
const locationApi = api;

const memoryCache = new Map();
const inflightRequests = new Map();
if (typeof window !== "undefined") {
  try {
    const legacyKeys = [];
    for (let i = 0; i < window.sessionStorage.length; i += 1) {
      const key = window.sessionStorage.key(i);
      if (String(key || "").startsWith("/location/")) {
        legacyKeys.push(key);
      }
    }
    legacyKeys.forEach((key) => window.sessionStorage.removeItem(key));
  } catch {
    // ignore storage cleanup errors
  }
}

const toText = (value) => String(value || "").trim();

const toSlug = (value) =>
  toText(value)
    .toLowerCase()
    .replace(/\s+/g, "-");

const toTitle = (value) =>
  toText(value)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const unique = (list) => Array.from(new Set(list.filter(Boolean)));

const canUseSessionStorage = () => false;

const toCacheRecord = (data) => ({ data, expiresAt: Date.now() + CACHE_TTL_MS });

const readSessionCache = (key) => {
  if (!canUseSessionStorage()) return null;

  try {
    const raw = window.sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.expiresAt || Date.now() > parsed.expiresAt) {
      window.sessionStorage.removeItem(key);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

const writeSessionCache = (key, record) => {
  if (!canUseSessionStorage()) return;
  try {
    window.sessionStorage.setItem(key, JSON.stringify(record));
  } catch {
    // Ignore storage quota errors.
  }
};

const getCachedData = (path) => {
  const mem = memoryCache.get(path);
  if (mem && Date.now() <= mem.expiresAt) return mem.data;

  const session = readSessionCache(path);
  if (session) {
    memoryCache.set(path, session);
    return session.data;
  }

  if (mem) memoryCache.delete(path);
  return null;
};

const setCachedData = (path, data) => {
  const record = toCacheRecord(data);
  memoryCache.set(path, record);
  writeSessionCache(path, record);
};

const getProductKeyCandidates = () => {
  const base = toText(getDefaultProductKey()) || "property";
  return unique([base]);
};

const normalizeList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.countries)) return payload.countries;
  if (Array.isArray(payload?.states)) return payload.states;
  if (Array.isArray(payload?.cities)) return payload.cities;
  if (Array.isArray(payload?.areas)) return payload.areas;
  if (Array.isArray(payload?.businesses)) return payload.businesses;
  return [];
};

const getTypedSlug = (row, type) => {
  if (type === "country") {
    return row.country_slug || row.slug || row.code || row.iso2 || row.iso_code;
  }

  if (type === "state") {
    return row.state_slug || row.slug;
  }

  if (type === "city") {
    return row.city_slug || row.slug;
  }

  if (type === "area") {
    return row.area_slug || row.slug;
  }

  return (
    row.slug ||
    row.country_slug ||
    row.state_slug ||
    row.city_slug ||
    row.area_slug ||
    row.code ||
    row.iso2 ||
    row.iso_code
  );
};

const getTypedName = (row, type) => {
  if (type === "country") return row.country_name || row.name || row.label || row.title;
  if (type === "state") return row.state_name || row.name || row.label || row.title;
  if (type === "city") return row.city_name || row.name || row.label || row.title;
  if (type === "area") return row.area_name || row.name || row.label || row.title;

  return (
    row.name ||
    row.country_name ||
    row.state_name ||
    row.city_name ||
    row.area_name ||
    row.title ||
    row.label
  );
};

const normalizeLocation = (item, type) => {
  const row = item || {};
  const slug = getTypedSlug(row, type);
  const name = getTypedName(row, type);

  const normalizedSlug = toSlug(slug || name);

  return {
    slug: normalizedSlug,
    name: toText(name) || toTitle(normalizedSlug),
    type,
    raw: row,
  };
};

const fetchLocationPath = async (path) => {
  const cached = getCachedData(path);
  if (cached) return cached;

  if (inflightRequests.has(path)) {
    return inflightRequests.get(path);
  }

  const requestPromise = locationApi
    .get(path, { timeout: 8000 })
    .then((response) => {
      const normalized = normalizeList(response?.data);
      setCachedData(path, normalized);
      return normalized;
    })
    .finally(() => {
      inflightRequests.delete(path);
    });

  inflightRequests.set(path, requestPromise);
  return requestPromise;
};

const requestLocation = async (pathFactory) => {
  const productKeys = getProductKeyCandidates();
  let lastError = null;

  for (const productKey of productKeys) {
    try {
      const path = pathFactory(productKey);
      const data = await fetchLocationPath(path);
      return { productKey, data };
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
};

const fetchLocationRawPath = async (path) => {
  const cached = getCachedData(path);
  if (cached) return cached;

  if (inflightRequests.has(path)) {
    return inflightRequests.get(path);
  }

  const requestPromise = locationApi
    .get(path, { timeout: 8000 })
    .then((response) => {
      const payload = response?.data ?? null;
      setCachedData(path, payload);
      return payload;
    })
    .finally(() => {
      inflightRequests.delete(path);
    });

  inflightRequests.set(path, requestPromise);
  return requestPromise;
};

const requestLocationRaw = async (pathFactory) => {
  const productKeys = getProductKeyCandidates();
  let lastError = null;

  for (const productKey of productKeys) {
    try {
      const path = pathFactory(productKey);
      const data = await fetchLocationRawPath(path);
      return { productKey, data };
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
};

export const getCountries = async () => {
  const result = await requestLocation((productKey) => `/location/${productKey}/countries`);
  return result.data.map((item) => normalizeLocation(item, "country"));
};

export const getStates = async (countrySlug) => {
  const country = toSlug(countrySlug);
  const result = await requestLocation(
    (productKey) => `/location/${productKey}/${country}/states`
  );
  return result.data.map((item) => normalizeLocation(item, "state"));
};

export const getCities = async (countrySlug, stateSlug) => {
  const country = toSlug(countrySlug);
  const state = toSlug(stateSlug);
  const result = await requestLocation(
    (productKey) => `/location/${productKey}/${country}/${state}/cities`
  );
  return result.data.map((item) => normalizeLocation(item, "city"));
};

export const getAreas = async (countrySlug, stateSlug, citySlug) => {
  const country = toSlug(countrySlug);
  const state = toSlug(stateSlug);
  const city = toSlug(citySlug);
  const result = await requestLocation(
    (productKey) => `/location/${productKey}/${country}/${state}/${city}/areas`
  );
  return result.data.map((item) => normalizeLocation(item, "area"));
};

const normalizeBusiness = (item) => {
  const row = item || {};
  const name =
    row.display_name ||
    row.business_name ||
    row.name ||
    row.title ||
    "Business";
  const slug = row.business_slug || row.slug || row.seaneb_id || toSlug(name);
  const areaName = row.area_name || row.area || "";
  const cityName = row.city_name || row.city || "";
  const location = row.address || [areaName, cityName].filter(Boolean).join(", ");

  const rawPrice =
    row.price ||
    row.min_price ||
    row.starting_price ||
    row.price_from ||
    row.price_to ||
    "";

  return {
    id: row.business_id || row.id || slug,
    title: toText(name),
    slug: toText(slug),
    location: toText(location),
    type: toText(row.business_type || row.category || row.type || "property"),
    price: toText(rawPrice),
    image:
      row.business_logo ||
      row.image ||
      row.cover_image ||
      row.logo ||
      row.thumbnail ||
      "/assets/propertyimages/image.png",
    raw: row,
  };
};

export const getBusinessesByArea = async (countrySlug, stateSlug, citySlug, areaSlug) => {
  const country = toSlug(countrySlug);
  const state = toSlug(stateSlug);
  const city = toSlug(citySlug);
  const area = toSlug(areaSlug);

  const result = await requestLocation(
    (productKey) => `/location/${productKey}/${country}/${state}/${city}/${area}/businesses`
  );

  return result.data.map(normalizeBusiness);
};

const normalizeBusinessDetailPayload = (payload) => {
  if (!payload) return null;
  if (payload?.data?.data) return payload.data.data;
  if (payload?.data) return payload.data;
  return payload;
};

export const getBusinessDetailsBySeanebId = async (seanebId) => {
  const id = toText(seanebId);
  if (!id) return null;

  const result = await requestLocationRaw(
    (productKey) => `/location/${productKey}/business/${encodeURIComponent(id)}`
  );

  const first = normalizeBusinessDetailPayload(result?.data);
  return first || null;
};


