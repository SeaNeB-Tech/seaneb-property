function toSeoSlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function getCountryTokens(country) {
  const raw = country?.raw || {};
  return new Set(
    [
      country?.slug,
      country?.name,
      raw?.country_slug,
      raw?.country_name,
      raw?.slug,
      raw?.name,
      raw?.code,
      raw?.iso2,
      raw?.iso_code,
    ]
      .map((token) => toSeoSlug(token))
      .filter(Boolean)
  );
}

function isIndiaAlias(value) {
  const token = toSeoSlug(value);
  return token === "in" || token === "india";
}

export function resolveCountryFromList(countries, requestedSlug = "in") {
  const list = Array.isArray(countries) ? countries : [];
  const normalizedRequest = toSeoSlug(requestedSlug || "in");

  if (!list.length) {
    return {
      requestedSlug: normalizedRequest || "in",
      apiSlug: normalizedRequest || "in",
      name: "",
      country: null,
    };
  }

  const exactMatch = list.find((country) => getCountryTokens(country).has(normalizedRequest));
  const indiaMatch = isIndiaAlias(normalizedRequest)
    ? list.find((country) => {
        const tokens = getCountryTokens(country);
        return tokens.has("in") || tokens.has("india");
      })
    : null;

  const selected = exactMatch || indiaMatch || list[0];
  const apiSlug = toSeoSlug(selected?.slug) || normalizedRequest || "in";
  const name = String(selected?.name || "").trim();

  return {
    requestedSlug: normalizedRequest || "in",
    apiSlug,
    name,
    country: selected,
  };
}

