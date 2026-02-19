"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MainNavbar from "@/components/ui/MainNavbar";
import styles from "@/styles/dynamic-pages.module.css";
import { getCountries, getCities, getStates } from "@/services/location.service";

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

export default function StatePage({ countrySlug = "in", stateSlug }) {
  const [countryName, setCountryName] = useState(toTitle(countrySlug));
  const [stateName, setStateName] = useState(toTitle(stateSlug));
  const [cities, setCities] = useState([]);
  const [stateSeoSlug, setStateSeoSlug] = useState(toSeoSlug(stateSlug));
  const [stateApiSlug, setStateApiSlug] = useState(String(stateSlug || "").toLowerCase());
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

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const [countries, states] = await Promise.all([
          getCountries(),
          getStates(normalizedCountrySlug),
        ]);

        if (!mounted) return;

        const selectedCountry = countries.find(
          (country) => country.slug === normalizedCountrySlug
        );
        const selectedState = states.find(
          (state) =>
            state.slug === normalizedStateSlug ||
            toSeoSlug(state.name) === normalizedStateSlug
        );
        const resolvedApiStateSlug = selectedState?.slug || normalizedStateSlug;
        const resolvedSeoStateSlug = toSeoSlug(selectedState?.name || normalizedStateSlug);
        const citiesData = await getCities(normalizedCountrySlug, resolvedApiStateSlug);

        if (!mounted) return;

        setCountryName(selectedCountry?.name || toTitle(normalizedCountrySlug));
        setStateName(selectedState?.name || toTitle(resolvedSeoStateSlug));
        setStateSeoSlug(resolvedSeoStateSlug);
        setStateApiSlug(resolvedApiStateSlug);
        setCities(citiesData);

        const isIndiaPath = normalizedCountrySlug === "in";
        const cleanPath = isIndiaPath
          ? `/in/${resolvedSeoStateSlug}`
          : `/in/${normalizedCountrySlug}/${resolvedSeoStateSlug}`;
        if (pathname && pathname !== cleanPath) {
          router.replace(cleanPath);
        }
      } catch (error) {
        if (!mounted) return;
        setCountryName(toTitle(normalizedCountrySlug));
        setStateName(toTitle(normalizedStateSlug));
        setStateSeoSlug(toSeoSlug(normalizedStateSlug));
        setStateApiSlug(normalizedStateSlug);
        setCities([]);
      }
    };

    if (normalizedStateSlug) {
      load();
    }

    return () => {
      mounted = false;
    };
  }, [normalizedCountrySlug, normalizedStateSlug, pathname, router]);

  return (
    <>
      <MainNavbar />

      <section className={styles.heroDarkFull}>
        <div className={styles.heroInner}>
          <p className={styles.breadcrumb}>Home / {countryName} / {stateName}</p>

          <h1 className={styles.heroTitle}>Properties in {stateName}</h1>

          <p className={styles.heroDesc}>
            Buy, rent and invest in verified properties across {stateName}.
          </p>
        </div>
      </section>

      <main className={styles.dynamicContainer}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Cities in {stateName}</h2>

          <div className={styles.pillGrid}>
            {cities.length === 0 ? (
              <p className={styles.sectionDesc}>No city data available right now.</p>
            ) : (
              cities.map((city) => (
                <Link
                  key={city.slug}
                  href={buildCityHref(normalizedCountrySlug, stateApiSlug, toSeoSlug(city.name || city.slug))}
                  className={styles.pill}
                >
                  {city.name}
                </Link>
              ))
            )}
          </div>
        </section>

        <section className={styles.sectionLight}>
          <h3 className={styles.sectionSubTitle}>Why Choose SeaNeB in {stateName}?</h3>

          <ul className={styles.list}>
            <li>Verified listings</li>
            <li>Trusted agents</li>
            <li>Smart area search</li>
            <li>Residential and commercial options</li>
          </ul>
        </section>

        <section className={styles.ctaBanner}>
          <div>
            <h3 className={styles.ctaTitle}>List Your Property in {stateName}</h3>

            <p className={styles.ctaDesc}>Reach verified buyers and renters on SeaNeB.</p>
          </div>

          <Link href="/partner" className={styles.ctaBtn}>
            Partner With Us
          </Link>
        </section>

        <div className={styles.backLink}>
          <Link href={normalizedCountrySlug === "in" ? "/in" : `/in/${normalizedCountrySlug}`}>
            Back to {countryName}
          </Link>
        </div>
      </main>
    </>
  );
}
