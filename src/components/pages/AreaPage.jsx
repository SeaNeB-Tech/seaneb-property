"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MainNavbar from "@/components/ui/MainNavbar";
import BusinessListingPage from "./BusinessListingPage";
import { locationTw } from "./locationTailwindClasses";
import {
  getAreas,
  getBusinessesByArea,
  getCities,
  getCountries,
  getStates,
} from "@/services/location.service";

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

function buildCityHref(countrySlug, stateSlug, citySlug) {
  return countrySlug === "in" ? `/in/${citySlug}-${stateSlug}` : `/in/${countrySlug}/${citySlug}-${stateSlug}`;
}

export default function AreaPage({ countrySlug = "in", stateSlug, citySlug, areaSlug }) {
  const [countryName, setCountryName] = useState(toTitle(countrySlug));
  const [stateName, setStateName] = useState(toTitle(stateSlug));
  const [cityName, setCityName] = useState(toTitle(citySlug));
  const [areaName, setAreaName] = useState(toTitle(areaSlug));
  const [businesses, setBusinesses] = useState([]);
  const [stateSeoSlug, setStateSeoSlug] = useState(toSeoSlug(stateSlug));
  const [stateApiSlug, setStateApiSlug] = useState(String(stateSlug || "").toLowerCase());
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
  const normalizedAreaSlug = useMemo(
    () => String(areaSlug || "").toLowerCase(),
    [areaSlug]
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

        let selectedState = states.find(
          (item) =>
            item.slug === normalizedStateSlug ||
            toSeoSlug(item.name) === normalizedStateSlug
        );
        let resolvedApiStateSlug = selectedState?.slug || normalizedStateSlug;
        let resolvedSeoStateSlug = toSeoSlug(selectedState?.name || normalizedStateSlug);
        let cities = [];
        let selectedCity = null;

        if (resolvedApiStateSlug) {
          cities = await getCities(normalizedCountrySlug, resolvedApiStateSlug);
          selectedCity = cities.find(
            (item) =>
              item.slug === normalizedCitySlug ||
              toSeoSlug(item.name) === normalizedCitySlug
          );
        }

        if (!selectedCity) {
          for (const state of states) {
            const stateCities = await getCities(normalizedCountrySlug, state.slug);
            const match = stateCities.find(
              (item) =>
                item.slug === normalizedCitySlug ||
                toSeoSlug(item.name) === normalizedCitySlug
            );
            if (match) {
              selectedState = state;
              resolvedApiStateSlug = state.slug;
              resolvedSeoStateSlug = toSeoSlug(state.name || state.slug);
              cities = stateCities;
              selectedCity = match;
              break;
            }
          }
        }

        const resolvedApiCitySlug = selectedCity?.slug || normalizedCitySlug;
        const resolvedSeoCitySlug = toSeoSlug(selectedCity?.name || normalizedCitySlug);
        const areas = await getAreas(
          normalizedCountrySlug,
          resolvedApiStateSlug,
          resolvedApiCitySlug
        );
        const selectedArea = areas.find(
          (item) =>
            item.slug === normalizedAreaSlug ||
            toSeoSlug(item.name) === normalizedAreaSlug
        );
        const resolvedApiAreaSlug = selectedArea?.slug || normalizedAreaSlug;
        const resolvedSeoAreaSlug = toSeoSlug(selectedArea?.name || normalizedAreaSlug);
        const businessData = await getBusinessesByArea(
          normalizedCountrySlug,
          resolvedApiStateSlug,
          resolvedApiCitySlug,
          resolvedApiAreaSlug
        );

        if (!mounted) return;

        const selectedCountry = countries.find((item) => item.slug === normalizedCountrySlug);

        setCountryName(selectedCountry?.name || toTitle(normalizedCountrySlug));
        setStateName(selectedState?.name || toTitle(resolvedSeoStateSlug));
        setCityName(selectedCity?.name || toTitle(resolvedSeoCitySlug));
        setAreaName(selectedArea?.name || toTitle(resolvedSeoAreaSlug));
        setStateSeoSlug(resolvedSeoStateSlug);
        setStateApiSlug(resolvedApiStateSlug);
        setCitySeoSlug(resolvedSeoCitySlug);
        setBusinesses(businessData);

        const isIndiaPath = normalizedCountrySlug === "in";
        const cleanPath = isIndiaPath
          ? `/in/${resolvedSeoAreaSlug}-${resolvedSeoCitySlug}`
          : `/in/${normalizedCountrySlug}/${resolvedSeoAreaSlug}-${resolvedSeoCitySlug}`;
        if (pathname && pathname !== cleanPath) {
          router.replace(cleanPath);
        }
      } catch (error) {
        if (!mounted) return;
        setCountryName(toTitle(normalizedCountrySlug));
        setStateName(toTitle(normalizedStateSlug));
        setCityName(toTitle(normalizedCitySlug));
        setAreaName(toTitle(normalizedAreaSlug));
        setStateSeoSlug(toSeoSlug(normalizedStateSlug));
        setStateApiSlug(normalizedStateSlug);
        setCitySeoSlug(toSeoSlug(normalizedCitySlug));
        setBusinesses([]);
      }
    };

    if (normalizedCitySlug && normalizedAreaSlug) {
      load();
    }

    return () => {
      mounted = false;
    };
  }, [
    normalizedCountrySlug,
    normalizedStateSlug,
    normalizedCitySlug,
    normalizedAreaSlug,
    pathname,
    router,
  ]);

  return (
    <>
      <MainNavbar />

      <section className={locationTw.heroDarkFull}>
        <div className={locationTw.heroInner}>
          <p className={locationTw.breadcrumb}>
            Home / {countryName} / {stateName} / {cityName} / {areaName}
          </p>

          <h1 className={locationTw.heroTitle}>Properties in {areaName}</h1>

          <p className={locationTw.heroDesc}>
            Explore verified residential and commercial properties in {areaName}, {cityName}. Buy,
            rent, or invest confidently.
          </p>
        </div>
      </section>

      <main className={locationTw.dynamicContainer}>
        <section className={locationTw.sectionLight}>
          <h3 className={locationTw.sectionSubTitle}>Why Buy Property in {areaName}?</h3>

          <ul className={locationTw.list}>
            <li>Premium residential locality</li>
            <li>Excellent connectivity</li>
            <li>Trusted local agents</li>
            <li>Verified property listings</li>
          </ul>
        </section>

        <BusinessListingPage
          title={`Properties in ${areaName}`}
          subtitle={`Live listings from ${areaName}, ${cityName}`}
          businesses={businesses}
        />

        <section className={locationTw.ctaBanner}>
          <div>
            <h3 className={locationTw.ctaTitle}>List Your Property in {areaName}</h3>
            <p className={locationTw.ctaDesc}>Reach serious buyers and renters in {cityName}.</p>
          </div>

          <Link href="/partner" className={locationTw.ctaBtn}>
            Partner With Us
          </Link>
        </section>

        <div className={locationTw.backLinkWrap}>
          <Link className={locationTw.backLink} href={buildCityHref(normalizedCountrySlug, stateApiSlug, citySeoSlug)}>
            Back to {cityName}
          </Link>
        </div>
      </main>
    </>
  );
}
