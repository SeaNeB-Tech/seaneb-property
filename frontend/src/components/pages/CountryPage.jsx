"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import MainNavbar from "@/components/ui/MainNavbar";
import { getCountries, getStates } from "@/services/property.service";
import { locationTw } from "./locationTailwindClasses";
import { resolveCountryFromList } from "@/lib/location/resolveCountry";

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

function buildStateHref(countrySlug, stateSlug) {
  return countrySlug === "in" ? `/in/${stateSlug}` : `/in/${countrySlug}/${stateSlug}`;
}

export default function CountryPage({ countrySlug = "in" }) {
  const [states, setStates] = useState([]);
  const [countryName, setCountryName] = useState(toTitle(countrySlug));
  const [loading, setLoading] = useState(true);

  const normalizedCountrySlug = useMemo(
    () => String(countrySlug || "in").toLowerCase(),
    [countrySlug]
  );

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      try {
        const countries = await getCountries();
        const resolvedCountry = resolveCountryFromList(countries, normalizedCountrySlug);
        const statesData = await getStates(resolvedCountry.apiSlug);

        if (!mounted) return;

        setCountryName(resolvedCountry.name || toTitle(normalizedCountrySlug));
        setStates(statesData);
      } catch (error) {
        if (!mounted) return;
        setCountryName(toTitle(normalizedCountrySlug));
        setStates([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [normalizedCountrySlug]);

  return (
    <>
      <MainNavbar />

      <section className={locationTw.countryHero}>
        <div className={locationTw.countryHeroInner}>
          <p className={locationTw.breadcrumb}>
            <Link href="/home" className="hover:underline">Home</Link> /{" "}
            <Link href="/in" className="hover:underline">Countries</Link> / {countryName}
          </p>

          <h1 className={locationTw.countryHeroTitle}>Properties in {countryName}</h1>

          <p className={locationTw.countryHeroDesc}>
            Discover verified residential and commercial properties across {countryName}. Buy,
            rent, or invest with confidence on SeaNeB.
          </p>
        </div>
      </section>

      <section className={locationTw.countrySection}>
        <div className={locationTw.dynamicContainer}>
          <h2 className={locationTw.countrySectionTitle}>Browse States in {countryName}</h2>

          <p className={locationTw.countrySectionDesc}>Explore real estate opportunities by state</p>

          <div className={locationTw.countryGrid}>
            {!loading && states.length === 0 ? null : (
              states.map((state) => (
                <Link
                  key={state.slug}
                  href={buildStateHref(normalizedCountrySlug, toSeoSlug(state.name || state.slug))}
                  className={locationTw.countryCard}
                >
                  {state.name}
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <section className={locationTw.countryCta}>
        <div className={locationTw.countryCtaInner}>
          <h2 className={locationTw.countryCtaTitle}>Want to List Your Property in {countryName}?</h2>

          <p className={locationTw.countryCtaDesc}>
            Reach verified buyers and renters across the country.
          </p>

          <Link href="/partner" className={locationTw.countryCtaBtn}>
            Partner With SeaNeB
          </Link>
        </div>
      </section>
    </>
  );
}

