"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import MainNavbar from "@/components/ui/MainNavbar";
import { getCountries, getStates } from "@/services/location.service";

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
        const [countries, statesData] = await Promise.all([
          getCountries(),
          getStates(normalizedCountrySlug),
        ]);

        if (!mounted) return;

        const activeCountry = countries.find(
          (country) => country.slug === normalizedCountrySlug
        );

        setCountryName(activeCountry?.name || toTitle(normalizedCountrySlug));
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

      <section className="dp-countryHero">
        <div className="dp-countryHeroInner">
          <p className="dp-countryBreadcrumb">Home / Countries / {countryName}</p>

          <h1 className="dp-countryHeroTitle">Properties in {countryName}</h1>

          <p className="dp-countryHeroDesc">
            Discover verified residential and commercial properties across {countryName}. Buy,
            rent, or invest with confidence on SeaNeB.
          </p>
        </div>
      </section>

      <section className="dp-countrySection">
        <div className="dp-dynamicContainer">
          <h2 className="dp-countrySectionTitle">Browse States in {countryName}</h2>

          <p className="dp-countrySectionDesc">Explore real estate opportunities by state</p>

          <div className="dp-countryGrid">
            {!loading && states.length === 0 ? (
              <p className="dp-sectionDesc">No states available right now.</p>
            ) : (
              states.map((state) => (
                <Link
                  key={state.slug}
                  href={buildStateHref(normalizedCountrySlug, toSeoSlug(state.name || state.slug))}
                  className="dp-countryCard"
                >
                  {state.name}
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="dp-countryCta">
        <div className="dp-countryCtaInner">
          <h2 className="dp-countryCtaTitle">Want to List Your Property in {countryName}?</h2>

          <p className="dp-countryCtaDesc">
            Reach verified buyers and renters across the country.
          </p>

          <Link href="/partner" className="dp-countryCtaBtn">
            Partner With SeaNeB
          </Link>
        </div>
      </section>
    </>
  );
}
