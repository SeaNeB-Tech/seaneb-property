"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import MainNavbar from "@/components/ui/MainNavbar";
import styles from "@/styles/dynamic-pages.module.css";
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

      <section className={styles.countryHero}>
        <div className={styles.countryHeroInner}>
          <p className={styles.countryBreadcrumb}>Home / Countries / {countryName}</p>

          <h1 className={styles.countryHeroTitle}>Properties in {countryName}</h1>

          <p className={styles.countryHeroDesc}>
            Discover verified residential and commercial properties across {countryName}. Buy,
            rent, or invest with confidence on SeaNeB.
          </p>
        </div>
      </section>

      <section className={styles.countrySection}>
        <div className={styles.dynamicContainer}>
          <h2 className={styles.countrySectionTitle}>Browse States in {countryName}</h2>

          <p className={styles.countrySectionDesc}>Explore real estate opportunities by state</p>

          <div className={styles.countryGrid}>
            {!loading && states.length === 0 ? (
              <p className={styles.sectionDesc}>No states available right now.</p>
            ) : (
              states.map((state) => (
                <Link
                  key={state.slug}
                  href={buildStateHref(normalizedCountrySlug, toSeoSlug(state.name || state.slug))}
                  className={styles.countryCard}
                >
                  {state.name}
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <section className={styles.countryCta}>
        <div className={styles.countryCtaInner}>
          <h2 className={styles.countryCtaTitle}>Want to List Your Property in {countryName}?</h2>

          <p className={styles.countryCtaDesc}>
            Reach verified buyers and renters across the country.
          </p>

          <Link href="/partner" className={styles.countryCtaBtn}>
            Partner With SeaNeB
          </Link>
        </div>
      </section>
    </>
  );
}
