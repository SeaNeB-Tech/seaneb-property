"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import phoneCodes from "@/constants/phoneCodes.json";
import BrandLogo from "@/components/ui/BrandLogo";
import TempUserAvatar from "@/components/ui/TempUserAvatar";
import navbarLinks from "@/data/navbarLinks.json";
import { getCookie } from "@/lib/core/cookies";
import {
  DASHBOARD_MODE_BUSINESS,
  DASHBOARD_MODE_USER,
  getDashboardMode,
  isBusinessRegistered,
  setDashboardMode,
} from "@/services/property.service";
import {
  hasBusinessFromProfile,
} from "@/services/user.service";
import { guardDashboardNavigation } from "@/services/auth.service";
import NextSearchExperience from "@/components/marketing/home/NextSearchExperience";
import { getCountries } from "@/services/property.service";
import { openBusinessRegisterFlow, openAuthLoginTab } from "@/lib/crossAppTabNavigation";
import { useListingAuth } from "@/hooks/auth/useListingAuth";
import { getAuthAppUrl } from "@/lib/core/appUrls";

const PropertyCategoriesSection = dynamic(() => import("./home/PropertyCategoriesSection"));
const CountriesShowcaseSection = dynamic(() => import("./home/CountriesShowcaseSection"));
const DownloadSection = dynamic(() => import("./home/DownloadSection"));
const FinalCtaSection = dynamic(() => import("./home/FinalCtaSection"));

export default function HomePage({ data }) {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasBusiness, setHasBusiness] = useState(() => isBusinessRegistered());
  const [dashboardMode, setDashboardModeState] = useState(() => getDashboardMode());
  const profileDropdownRef = useRef(null);
  const isDark = false;

  const heroTitle = data?.hero?.title || "Find Properties Near You, Faster";
  const heroDescription =
    data?.hero?.description ||
    "Search verified apartments, houses, and commercial properties with one clean flow. Compare locations and connect quickly.";
  const heroImage = data?.hero?.image || "/assets/home/home-hero.jpg";
  const heroImageAlt = data?.hero?.imageAlt || "Real estate cityscape";
  const isSquareHero = heroImage.includes("Gemini_Generated_Image_jnqk9ajnqk9ajnqk.png");
  const requestedCountries = useMemo(() => {
    const selected = data?.countriesSection?.countries;
    if (!Array.isArray(selected)) return [];
    return selected
      .map((name) => String(name || "").trim())
      .filter(Boolean);
  }, [data?.countriesSection?.countries]);
  const [countryList, setCountryList] = useState([]);

  const { status: authStatus, user: profile, logout } = useListingAuth();
  const dashboardUrl = getAuthAppUrl("/dashboard");
  const businessDashboardUrl = getAuthAppUrl("/dashboard/broker");
  const canShowAuthenticated = hydrated && authStatus === "authenticated";
  const fallbackEmail = getCookie("verified_email") || getCookie("user_email") || "";
  const userEmail = profile?.email || fallbackEmail;
  const userLabel = profile?.full_name || userEmail || "Guest User";

  const phoneCodeByName = useMemo(() => {
    return new Map(phoneCodes.map((item) => [item.name, item]));
  }, []);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || authStatus !== "authenticated" || !profile) {
      setHasBusiness(false);
      setDashboardModeState(DASHBOARD_MODE_USER);
      return;
    }
    setHasBusiness(hasBusinessFromProfile(profile));
  }, [authStatus, hydrated, profile]);

  useEffect(() => {
    let active = true;

    const fallbackCountries = requestedCountries.length
      ? requestedCountries.map((name) => ({
          name,
          slug: name.toLowerCase() === "india" ? "in" : "",
        }))
      : [{ name: "India", slug: "in" }];

    const requestedSet = new Set(requestedCountries.map((name) => name.toLowerCase()));

    const loadCountries = async () => {
      try {
        const apiCountries = await getCountries();
        if (!active) return;

        const normalized = (apiCountries || []).map((country) => {
          const code = String(
            country?.slug ||
              country?.raw?.code ||
              country?.raw?.iso2 ||
              country?.raw?.iso_code ||
              ""
          )
            .trim()
            .toLowerCase();

          return {
            name: country?.name || "",
            slug: code,
            code,
            flag:
              country?.raw?.flag ||
              country?.raw?.flag_url ||
              (code ? `https://flagcdn.com/w40/${code}.png` : ""),
            raw: country?.raw || {},
          };
        });

        const filtered = requestedSet.size
          ? normalized.filter((country) => requestedSet.has(country.name.toLowerCase()))
          : normalized;

        setCountryList(filtered.length ? filtered : fallbackCountries);
      } catch {
        if (!active) return;
        setCountryList(fallbackCountries);
      }
    };

    loadCountries();

    return () => {
      active = false;
    };
  }, [requestedCountries]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (!profileDropdownRef.current) return;
      if (!profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    const onEscape = (event) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleInstall = useCallback(async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      setInstallPrompt(null);
      setCanInstall(false);
    }
  }, [installPrompt]);

  const getCountryHref = useCallback((country) => {
    const normalizedName = String(country?.name || "")
      .trim()
      .toLowerCase();
    if (normalizedName === "india") return "/in";
    const slug = String(country?.slug || country?.code || "")
      .trim()
      .toLowerCase();
    return slug ? `/in/${slug}` : "/in";
  }, []);

  const handleLogout = useCallback(async () => {
    if (typeof window !== "undefined" && !window.confirm("Are you sure you want to log out?")) {
      return;
    }
    try {
      await logout({ redirect: true });
    } finally {
      setHasBusiness(false);
      setDashboardModeState(DASHBOARD_MODE_USER);
      setIsProfileOpen(false);
    }
  }, [logout]);

  const handleBusinessAction = useCallback(() => {
    setIsProfileOpen(false);

    if (!hasBusiness) {
      openBusinessRegisterFlow();
      return;
    }

    void guardDashboardNavigation({
      onAuthenticated: () => {
        if (dashboardMode === DASHBOARD_MODE_BUSINESS) {
          setDashboardMode(DASHBOARD_MODE_USER);
          setDashboardModeState(DASHBOARD_MODE_USER);
          window.location.assign(dashboardUrl);
          return;
        }

        setDashboardMode(DASHBOARD_MODE_BUSINESS);
        setDashboardModeState(DASHBOARD_MODE_BUSINESS);
        window.location.assign(businessDashboardUrl);
      },
      onUnauthenticated: () => {
        openAuthLoginTab();
      },
    });
  }, [businessDashboardUrl, dashboardMode, dashboardUrl, hasBusiness]);

  const handleMyAccountClick = useCallback((event) => {
    event.preventDefault();
    setIsProfileOpen(false);
    void guardDashboardNavigation({
      onAuthenticated: () => {
        window.location.assign(dashboardUrl);
      },
      onUnauthenticated: () => {
        openAuthLoginTab();
      },
    });
  }, [dashboardUrl]);

  const handleLoginClick = useCallback((event) => {
    event.preventDefault();
    setIsProfileOpen(false);
    openAuthLoginTab();
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-[var(--home-page-bg-dark)] text-slate-100" : "bg-[var(--home-page-bg-light)] text-slate-900"}`}>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          hasScrolled
            ? "border-blue-200/90 bg-[var(--home-header-scrolled-bg)] shadow-md backdrop-blur-md"
            : "border-white/20 bg-transparent backdrop-blur-[2px]"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="transition-opacity hover:opacity-90" aria-label="SeaNeB Home">
            <BrandLogo
              size={40}
              titleClass={`text-xl font-bold tracking-tight ${hasScrolled ? "text-blue-900" : "text-white"}`}
              subtitleClass={`text-xs font-medium ${hasScrolled ? "text-blue-700/90" : "text-white/80"}`}
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
            {navbarLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  hasScrolled ? "text-blue-800 hover:text-blue-950" : "text-white/85 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="relative flex items-center gap-3" ref={profileDropdownRef}>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition lg:hidden ${
                hasScrolled
                  ? "border-blue-300 bg-white/80 text-blue-900 hover:bg-white"
                  : "border-white/35 bg-black/30 text-white hover:bg-black/45"
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {isMobileMenuOpen ? "\u2715" : "\u2630"}
            </button>

            {canInstall && (
              <button
                type="button"
                onClick={handleInstall}
                className={`hidden rounded-full border px-4 py-2 text-sm font-semibold transition-all hover:scale-105 active:scale-95 sm:inline-block ${
                  hasScrolled
                    ? "border-blue-300 bg-white/85 text-blue-900 hover:bg-white"
                    : "border-white/35 bg-black/30 text-white hover:bg-black/45"
                }`}
              >
                Install App
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsProfileOpen((open) => !open)}
              className={`inline-flex items-center gap-2 rounded-full border px-2 py-1 transition-all ${
                hasScrolled
                  ? "border-blue-300 bg-white/85 text-blue-900 hover:bg-white"
                  : "border-white/35 bg-black/30 text-white hover:bg-black/45"
              }`}
              aria-label="Open profile menu"
              aria-expanded={isProfileOpen}
              aria-controls="profile-menu"
            >
              <TempUserAvatar size="sm" />
              <span className="hidden pr-1 text-xs font-semibold sm:inline">
                {canShowAuthenticated ? "Account" : "Sign In"}
              </span>
            </button>

            {isProfileOpen && (
              <div
                id="profile-menu"
                role="menu"
                aria-label="Profile options"
                className="absolute right-0 top-14 z-50 w-[min(92vw,21rem)] overflow-hidden rounded-2xl border border-blue-200 bg-[var(--home-profile-menu-bg)] text-slate-900 shadow-[0_22px_50px_var(--home-profile-shadow)]"
              >
                {canShowAuthenticated ? (
                  <>
                    <div className="bg-gradient-to-r from-blue-100 to-indigo-100 px-5 py-4">
                      <div className="flex items-center gap-3">
                        <TempUserAvatar size="lg" />
                        <div className="min-w-0">
                          <p className="truncate text-base font-bold text-slate-900">{userLabel}</p>
                          <p className="truncate text-xs text-slate-500">{userEmail || "Signed in user"}</p>
                          <p
                            className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              hasBusiness
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {hasBusiness ? "Business: Active" : "Business: Not Registered"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <Link
                        href={dashboardUrl}
                        onClick={handleMyAccountClick}
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
                      >
                        <span>My Account</span>
                        <span className="text-slate-400">{"\u203A"}</span>
                      </Link>
                      <button
                        type="button"
                        onClick={handleBusinessAction}
                        className="mt-1 flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
                      >
                        <span>
                          {!hasBusiness
                            ? "Business Register"
                            : dashboardMode === DASHBOARD_MODE_BUSINESS
                              ? "Switch to User Dashboard"
                              : "Switch to Business Dashboard"}
                        </span>
                        <span className="text-indigo-300">{"\u203A"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="mt-1 flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                      >
                        <span>Sign Out</span>
                        <span className="text-rose-300">{"\u203A"}</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-4">
                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                      <TempUserAvatar size="lg" />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900">Welcome to SeaNeB</p>
                        <p className="text-xs text-slate-500">Access your account to continue</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleLoginClick}
                      className="mt-3 block w-full rounded-xl bg-blue-700 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-800"
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            id="mobile-nav"
            className={`border-t px-4 py-4 lg:hidden ${hasScrolled ? "border-blue-200 bg-[var(--home-header-scrolled-bg)]" : "border-white/20 bg-black/55"}`}
          >
            <div className="flex flex-col gap-2">
              {navbarLinks.map((link) => (
                <Link
                  key={`mobile-${link.name}`}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                    hasScrolled ? "text-blue-900 hover:bg-blue-100" : "text-white/90 hover:bg-black/40 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <section className="relative overflow-hidden">
        <Image
          src={heroImage}
          alt={heroImageAlt}
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center brightness-110 contrast-125 saturate-110"
          style={isSquareHero ? { objectPosition: "center 62%" } : undefined}
          sizes="100vw"
        />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/45 to-transparent" aria-hidden="true" />
        <div className={`absolute inset-0 ${isDark ? "bg-slate-900/14" : "bg-[var(--home-overlay-light)]"}`} aria-hidden="true" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 pb-7 pt-28 text-center sm:px-6 lg:px-8 lg:pb-8 lg:pt-32">
          <div className="flex w-full max-w-3xl flex-col items-center space-y-5 animate-slide-in-up">
            <div className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-wide uppercase transition-colors ${isDark ? "bg-slate-900 border border-slate-800 text-cyan-400" : "border border-blue-200 bg-blue-100/80 text-blue-700"}`}>
              <span className="relative flex h-2 w-2">
                <span className={`relative inline-flex h-2 w-2 rounded-full ${isDark ? "bg-cyan-500" : "bg-blue-500"}`}></span>
              </span>
              Trusted Real Estate Discovery
            </div>

            <h1 className="bg-gradient-to-r from-blue-700 via-sky-600 to-rose-500 bg-clip-text text-2xl font-extrabold leading-[1.15] tracking-tight text-transparent sm:text-3xl lg:text-4xl">
              {heroTitle}
            </h1>

            <p className={`max-w-xl text-sm leading-relaxed sm:text-base ${isDark ? "text-slate-400" : "text-slate-700"}`}>
              {heroDescription}
            </p>

            <Link
              href="/in"
              className="inline-flex items-center rounded-full border border-blue-200 bg-white/85 px-5 py-2 text-sm font-semibold text-blue-800 shadow-sm transition hover:bg-white"
            >
              Explore India
            </Link>
          </div>
        </div>

        <div className="relative -mt-3 px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-blue-200/60 shadow-sm">
            <div className="relative p-3 sm:p-4">
              <NextSearchExperience isDark={isDark} />
            </div>
          </div>
        </div>
      </section>

      <PropertyCategoriesSection isDark={isDark} />
      <CountriesShowcaseSection
        isDark={isDark}
        countryList={countryList}
        getCountryHref={getCountryHref}
        phoneCodeByName={phoneCodeByName}
      />
      <DownloadSection isDark={isDark} />
      <FinalCtaSection isDark={isDark} />
    </div>
  );
}

