"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MainNavbar from "@/components/ui/MainNavbar";
import { getAreas, getCities, getCountries, getStates } from "@/services/location.service";

function toTitle(slug) {
  return String(slug || "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function toSeoSlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function buildAreaHref(countrySlug, stateSlug, citySlug, areaSlug) {
  return countrySlug === "in" ? `/in/${areaSlug}-${citySlug}` : `/in/${countrySlug}/${areaSlug}-${citySlug}`;
}

function buildStateHref(countrySlug, stateSlug) {
  return countrySlug === "in" ? `/in/${stateSlug}` : `/in/${countrySlug}/${stateSlug}`;
}

export default function CityPage({ countrySlug = "in", stateSlug, citySlug }) {
  const [countryName, setCountryName] = useState(toTitle(countrySlug));
  const [stateName, setStateName] = useState(toTitle(stateSlug));
  const [cityName, setCityName] = useState(toTitle(citySlug));
  const [areas, setAreas] = useState([]);
  const [stateSeoSlug, setStateSeoSlug] = useState(toSeoSlug(stateSlug));
  const [citySeoSlug, setCitySeoSlug] = useState(toSeoSlug(citySlug));
  const router = useRouter();
  const pathname = usePathname();

  const normalizedCountrySlug = useMemo(
    () => String(countrySlug || "in").toLowerCase(),
    [countrySlug]
  );
  const normalizedStateSlug = useMemo(
    () => String(stateSlug || "").toLowerCase(),
    [stateSlug]
  );
  const normalizedCitySlug = useMemo(
    () => String(citySlug || "").toLowerCase(),
    [citySlug]
  );

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const [countries, states] = await Promise.all([
          getCountries(),
          getStates(normalizedCountrySlug),
        ]);

        if (!mounted) return;

        const selectedState = states.find(
          (item) =>
            item.slug === normalizedStateSlug ||
            toSeoSlug(item.name) === normalizedStateSlug
        );
        const resolvedApiStateSlug = selectedState?.slug || normalizedStateSlug;
        const resolvedSeoStateSlug = toSeoSlug(selectedState?.name || normalizedStateSlug);
        const cities = await getCities(normalizedCountrySlug, resolvedApiStateSlug);
        const selectedCity = cities.find(
          (item) =>
            item.slug === normalizedCitySlug ||
            toSeoSlug(item.name) === normalizedCitySlug
        );
        const resolvedApiCitySlug = selectedCity?.slug || normalizedCitySlug;
        const resolvedSeoCitySlug = toSeoSlug(selectedCity?.name || normalizedCitySlug);
        const areaData = await getAreas(
          normalizedCountrySlug,
          resolvedApiStateSlug,
          resolvedApiCitySlug
        );

        if (!mounted) return;

        const selectedCountry = countries.find((item) => item.slug === normalizedCountrySlug);

        setCountryName(selectedCountry?.name || toTitle(normalizedCountrySlug));
        setStateName(selectedState?.name || toTitle(resolvedSeoStateSlug));
        setCityName(selectedCity?.name || toTitle(resolvedSeoCitySlug));
        setStateSeoSlug(resolvedSeoStateSlug);
        setCitySeoSlug(resolvedSeoCitySlug);
        setAreas(areaData);

        const isIndiaPath = normalizedCountrySlug === "in";
        const cleanPath = isIndiaPath
          ? `/in/${resolvedSeoCitySlug}-${resolvedApiStateSlug}`
          : `/in/${normalizedCountrySlug}/${resolvedSeoCitySlug}-${resolvedApiStateSlug}`;
        if (pathname && pathname !== cleanPath) {
          router.replace(cleanPath);
        }
      } catch (error) {
        if (!mounted) return;
        setCountryName(toTitle(normalizedCountrySlug));
        setStateName(toTitle(normalizedStateSlug));
        setCityName(toTitle(normalizedCitySlug));
        setStateSeoSlug(toSeoSlug(normalizedStateSlug));
        setCitySeoSlug(toSeoSlug(normalizedCitySlug));
        setAreas([]);
      }
    };

    if (normalizedStateSlug && normalizedCitySlug) {
      load();
    }

    return () => {
      mounted = false;
    };
  }, [normalizedCountrySlug, normalizedStateSlug, normalizedCitySlug, pathname, router]);

  return (
    <>
      <MainNavbar />

      <section className="dp-heroDarkFull">
        <div className="dp-heroInner">
          <p className="dp-breadcrumb">
            Home / {countryName} / {stateName} / {cityName}
          </p>

          <h1 className="dp-heroTitle">Properties in {cityName}</h1>

          <p className="dp-heroDesc">
            Explore verified residential and commercial properties across {cityName}. Buy, rent,
            or invest with confidence.
          </p>
        </div>
      </section>

      <main className="dp-dynamicContainer">
        <section className="dp-section">
          <h2 className="dp-sectionTitle">Areas in {cityName}</h2>

          <div className="dp-pillGrid">
            {areas.length === 0 ? (
              <p className="dp-sectionDesc">No area data available for this city.</p>
            ) : (
              areas.map((area) => (
                <Link
                  key={area.slug}
                  href={buildAreaHref(
                    normalizedCountrySlug,
                    stateSeoSlug,
                    citySeoSlug,
                    toSeoSlug(area.name || area.slug)
                  )}
                  className="dp-cityPill"
                >
                  {area.name}
                </Link>
              ))
            )}
          </div>
        </section>

        <section className="dp-sectionLight">
          <h3 className="dp-sectionSubTitle">Why Buy Property in {cityName}?</h3>

          <ul className="dp-list">
            <li>Verified listings only</li>
            <li>Trusted local agents</li>
            <li>Smart area-based search</li>
            <li>Residential and commercial options</li>
          </ul>
        </section>

        <section className="dp-cityCtaBanner">
          <div>
            <h3 className="dp-ctaTitle">List Your Property in {cityName}</h3>
            <p className="dp-ctaDesc">Reach verified buyers and renters in your city.</p>
          </div>

          <Link href="/partner" className="dp-ctaBtn">
            Partner With Us
          </Link>
        </section>

        <div className="dp-backLink">
          <Link href={buildStateHref(normalizedCountrySlug, stateSeoSlug)}>
            Back to {stateName}
          </Link>
        </div>
      </main>
    </>
  );
}
