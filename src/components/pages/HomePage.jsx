"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import phoneCodes from "@/constants/phoneCodes.json";
import BrandLogo from "@/components/ui/BrandLogo";
import TempUserAvatar from "@/components/ui/TempUserAvatar";
import navbarLinks from "@/data/navbarLinks.json";
import { getCookie, removeCookie } from "@/services/cookie";
import { getAccessTokenFromCookie } from "@/services/profile.service";
import NextSearchExperience from "@/components/marketing/home/NextSearchExperience";

export default function HomePage({ data }) { // Accept data prop
  const [installPrompt, setInstallPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const isDark = false;
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  // Use data from prop or fallbacks
  const heroTitle = data?.hero?.title || "Find Properties Near You, Faster";
  const heroDescription = data?.hero?.description || "Search verified apartments, houses, and commercial properties with one clean flow. Compare locations and connect quickly.";
  const heroImage = data?.hero?.image || "/assets/home/home-hero.jpg";
  const heroImageAlt = data?.hero?.imageAlt || "Real estate cityscape";
  const isSquareHero = heroImage.includes("Gemini_Generated_Image_jnqk9ajnqk9ajnqk.png");
  const countryList = data?.countriesSection?.countries || ["India", "United States", "Australia", "Singapore"];

  const isAuthenticated = useSyncExternalStore(
    () => () => { },
    () => Boolean(getAccessTokenFromCookie()),
    () => false
  );
  const userEmail = getCookie("verified_email") || getCookie("user_email") || "";
  const userLabel = userEmail || "Guest User";

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

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      setInstallPrompt(null);
      setCanInstall(false);
    }
  };

  const navLinks = navbarLinks;

  const handleLogout = () => {
    const keys = [
      "access_token",
      "refresh_token",
      "profile_completed",
      "session_start_time",
      "user_email",
      "verified_email",
    ];

    for (const key of keys) {
      removeCookie(key);
    }

    setIsProfileOpen(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-[#0b1220] text-slate-100" : "bg-[#eef4ff] text-slate-900"}`}>
      {/* Header */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          hasScrolled
            ? "border-blue-200/90 bg-[#dbe8ff]/95 shadow-md backdrop-blur-md"
            : "border-white/20 bg-transparent backdrop-blur-[2px]"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/home" className="transition-opacity hover:opacity-90">
            <BrandLogo
              size={40}
              titleClass={`text-xl font-bold tracking-tight ${hasScrolled ? "text-blue-900" : "text-white"}`}
              subtitleClass={`text-xs font-medium ${hasScrolled ? "text-blue-700/90" : "text-white/80"}`}
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
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
            >
              {isMobileMenuOpen ? "✕" : "☰"}
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
              aria-label="Profile menu"
            >
              <TempUserAvatar size="sm" />
              <span className="hidden pr-1 text-xs font-semibold sm:inline">
                {isAuthenticated ? "Account" : "Sign In"}
              </span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-14 z-50 w-[21rem] overflow-hidden rounded-2xl border border-blue-200 bg-[#f4f8ff] text-slate-900 shadow-[0_22px_50px_rgba(2,6,23,0.20)]">
                {isAuthenticated ? (
                  <>
                    <div className="bg-gradient-to-r from-blue-100 to-indigo-100 px-5 py-4">
                      <div className="flex items-center gap-3">
                        <TempUserAvatar size="lg" />
                        <div className="min-w-0">
                          <p className="truncate text-base font-bold text-slate-900">{userLabel}</p>
                          <p className="truncate text-xs text-slate-500">{userEmail || "Signed in user"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
                      >
                        <span>My Account</span>
                        <span className="text-slate-400">{"\u203A"}</span>
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="mt-1 flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                      >
                        <span>Sign Out</span>
                        <span className="text-rose-300">{"\u203A"}</span>
                      </button>
                      <p className="px-3 pb-1 pt-2 text-[11px] font-medium text-slate-400">Temporary profile logo enabled</p>
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
                    <Link
                      href="/dashboard"
                      onClick={() => setIsProfileOpen(false)}
                      className="mt-3 block rounded-xl bg-blue-700 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-800"
                    >
                      Sign In
                    </Link>
                    <p className="mt-2 text-center text-[11px] text-slate-400">
                      Temporary person logo is shown until user photo is added
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className={`border-t px-4 py-4 lg:hidden ${hasScrolled ? "border-blue-200 bg-[#dbe8ff]/95" : "border-white/20 bg-black/55"}`}>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
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
        <div className={`absolute inset-0 ${isDark ? "bg-slate-900/14" : "bg-[#dbe8fb]/4"}`} aria-hidden="true" />
        <div className="absolute inset-0 border-b border-blue-100/70" aria-hidden="true" />

        {/* Hero Section */}
        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 pb-7 pt-28 sm:px-6 lg:px-8 lg:pb-8 lg:pt-32 text-center">
          <div className="flex w-full max-w-3xl flex-col items-center space-y-5 animate-slide-in-up">
            <div className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-wide uppercase transition-colors ${isDark ? "bg-slate-900 border border-slate-800 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.1)]" : "border border-blue-200 bg-blue-100/80 text-blue-700"}`}>
              <span className="relative flex h-2 w-2">
                <span className={`relative inline-flex h-2 w-2 rounded-full ${isDark ? "bg-cyan-500" : "bg-blue-500"}`}></span>
              </span>
              Trusted Real Estate Discovery
            </div>

            <h1 className="text-2xl font-extrabold leading-[1.15] tracking-tight sm:text-3xl lg:text-4xl">
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDark ? "from-white via-blue-100 to-indigo-200" : "from-slate-900 via-slate-800 to-slate-700"}`}>
                Find Properties <br />
              </span>
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDark ? "from-cyan-400 via-blue-500 to-indigo-500" : "from-blue-700 via-sky-600 to-rose-500"}`}>
                Near You, Faster
              </span>
            </h1>

            <p className={`max-w-xl text-sm leading-relaxed sm:text-base ${isDark ? "text-slate-400" : "text-slate-700"}`}>
              {heroDescription}
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="relative -mt-3 px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-blue-200/60 shadow-sm">
            <div className="relative p-3 sm:p-4">
              <NextSearchExperience isDark={isDark} />
            </div>
          </div>
        </div>
      </section>

      {/* Property Categories */}
      <section className={`py-20 sm:py-24 ${isDark ? "bg-[#0e1628]" : "bg-[#dce9ff]"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <h2 className={`text-3xl font-bold sm:text-4xl leading-tight ${isDark ? "text-white" : "text-[#12366f]"}`}>Browse by Property Type</h2>
            <p className={`mt-4 text-lg ${isDark ? "text-slate-400" : "text-[#2b4a7a]"}`}>Choose the format that fits your buying goals from our verified listings.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8">
            {[
              { icon: "/icons/apartment.svg", label: "Apartments", count: "2,400+ listings" },
              { icon: "/icons/house.svg", label: "Houses", count: "850+ listings" },
              { icon: "/icons/commercial.svg", label: "Commercial", count: "1,200+ listings" },
              { icon: "/icons/land.svg", label: "Land", count: "500+ listings" },
            ].map((cat) => (
              <button
                key={cat.label}
                className={`group relative overflow-hidden rounded-3xl p-6 text-center transition-all duration-300 hover:-translate-y-2 ${isDark ? "bg-slate-900 hover:bg-slate-800" : "border border-blue-200/80 bg-[#eaf2ff] hover:bg-[#dde9ff] hover:shadow-xl hover:shadow-blue-200/60"}`}
              >
                <div className={`mb-6 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-300 ${isDark ? "bg-slate-800 group-hover:bg-cyan-500/10" : "bg-[#f3f8ff] shadow-sm group-hover:bg-blue-200/70"}`}>
                  <Image
                    src={cat.icon}
                    alt={cat.label}
                    width={44}
                    height={44}
                    className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className={`text-lg font-bold ${isDark ? "text-slate-100" : "text-[#173f7a]"}`}>{cat.label}</h3>
                <p className={`mt-1 text-xs font-medium ${isDark ? "text-slate-500" : "text-[#486896]"}`}>{cat.count}</p>

                {/* Hover line */}
                <div className={`absolute bottom-0 left-0 h-1 w-full scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${isDark ? "bg-cyan-500" : "bg-blue-600"}`} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className={`py-20 sm:py-24 ${isDark ? "bg-[#111c31]" : "bg-[#d4e4ff]"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className={`text-3xl font-bold sm:text-4xl ${isDark ? "text-white" : "text-[#12366f]"}`}>Available Countries</h2>
              <p className={`mt-3 ${isDark ? "text-slate-400" : "text-[#2b4a7a]"}`}>Explore listings across multiple regions.</p>
            </div>
            <Link href="/locations" className={`text-sm font-semibold flex items-center gap-1 transition-all hover:gap-2 ${isDark ? "text-cyan-400 hover:text-cyan-300" : "text-blue-600 hover:text-blue-700"}`}>
              View all locations <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
            {countryList.map((name) => {
              const info = phoneCodes.find((p) => p.name === name) || {};
              const flag = info.flag || `/icons/${name.toLowerCase().replace(/[^a-z]/g, "")}.svg`;
              return (
                <button
                  key={name}
                  className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${isDark ? "bg-slate-900 border border-slate-800 text-slate-100 hover:border-cyan-500/50 hover:bg-slate-800 hover:shadow-lg hover:shadow-cyan-900/10" : "bg-[#eaf2ff] border border-blue-200/90 text-[#173f7a] hover:border-blue-400 hover:bg-[#dce9ff] hover:shadow-lg hover:shadow-blue-200/70"}`}
                >
                  <div className="h-8 w-10 shrink-0 overflow-hidden rounded-md relative shadow-sm">
                    <Image src={flag} alt={name} fill className="object-cover" />
                  </div>
                  <span className="font-semibold">{name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className={`py-24 relative overflow-hidden ${isDark ? "bg-[#0e1628]" : "bg-[#d0e2ff]"}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className={`relative grid grid-cols-1 gap-12 overflow-hidden rounded-[3rem] px-8 py-16 shadow-2xl lg:grid-cols-2 lg:px-16 lg:py-20 ${isDark ? "bg-gradient-to-br from-[#15233f] via-[#13233b] to-[#0e1a30] border border-slate-700" : "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"}`}>

            {/* Decorative circles */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

            <div className="flex flex-col justify-center space-y-8 relative z-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md border border-white/10">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Available on iOS & Android
                </div>
                <h3 className="text-4xl font-bold leading-tight text-white sm:text-5xl">Get SeaNeB <br /> on Your Phone</h3>
                <p className="max-w-md text-lg text-blue-100/90 leading-relaxed">
                  Use the app to track listings, save favorites, and receive updates instantly anywhere, anytime.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {["Instant Alerts", "Saved Searches", "Verified Leads"].map((item) => (
                  <span key={item} className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
                    <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative inline-flex items-center gap-3 rounded-xl px-6 py-3.5 text-sm font-bold transition-all hover:-translate-y-1 hover:shadow-xl active:translate-y-0 ${isDark ? "bg-cyan-500 text-black shadow-cyan-900/20 hover:bg-cyan-400" : "bg-[#f3f8ff] text-blue-700 shadow-blue-900/20 hover:bg-blue-100"}`}
                >
                  <span className="text-xl">{"\u25B6"}</span>
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-[10px] uppercase opacity-70">Get it on</span>
                    <span>Google Play</span>
                  </div>
                </a>
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 rounded-xl border border-white/30 bg-slate-900/35 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-slate-900/45 hover:shadow-xl active:translate-y-0"
                >
                  <span className="text-xl">{"\uF8FF"}</span>
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-[10px] uppercase opacity-70">Download on the</span>
                    <span>App Store</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="relative flex items-center justify-center lg:justify-end">
              {/* Phone Mockup Area */}
              <div className="relative h-[480px] w-[280px] rotate-[-6deg] transform transition-transform duration-700 hover:rotate-0">
                <div className={`absolute inset-0 rounded-[2.5rem] bg-[#0f1a2d] shadow-2xl border-[8px] ${isDark ? "border-slate-700" : "border-slate-900"}`} style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-[#0f1a2d] rounded-b-xl z-20" />

                  {/* Screen Content */}
                  <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-slate-800">
                    <Image
                      src="/assets/propertyimages/image.png"
                      alt="SeaNeB mobile app preview"
                      fill
                      className="object-cover opacity-90"
                      sizes="280px"
                    />

                    {/* Floating UI Elements on Phone Screen */}
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/90 backdrop-blur shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">Home</div>
                        <div className="flex-1">
                          <div className="h-2 w-24 bg-slate-200 rounded mb-1.5" />
                          <div className="h-1.5 w-16 bg-slate-200 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Notification Card */}
              <div className={`absolute -left-4 bottom-20 max-w-[220px] rounded-2xl border p-4 shadow-xl backdrop-blur-md animate-float ${isDark ? "border-slate-700 bg-slate-900/90 text-slate-200" : "border-white/50 bg-white/90 text-slate-800"}`}>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-lg">
                    M
                  </div>
                  <div>
                    <p className="font-bold text-sm">New Match Found</p>
                    <p className="mt-1 text-xs opacity-80">3 BHK in Ahmedabad just listed matching your criteria.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={`py-20 sm:py-28 relative ${isDark ? "bg-[#0e1628]" : "bg-gradient-to-br from-[#10386f] via-[#124c97] to-[#1f4fb8]"}`}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 relative z-10">
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Ready to Find Your Next Property?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Join thousands of users on SeaNeB and discover verified opportunities in your preferred location.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className={`w-full sm:w-auto rounded-xl px-8 py-4 text-base font-bold shadow-lg transition-all hover:scale-105 ${isDark ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/20" : "bg-[#f3f8ff] text-slate-900 hover:bg-blue-100 shadow-blue-200/50"}`}>
              Get Started Now
            </Link>
            <Link href="/about" className="w-full sm:w-auto rounded-xl px-8 py-4 text-base font-bold text-white border border-blue-300/40 hover:bg-blue-900/35 transition-all">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
