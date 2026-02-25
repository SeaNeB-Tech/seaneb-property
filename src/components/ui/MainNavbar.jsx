"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import BrandLogo from "./BrandLogo";
import TempUserAvatar from "./TempUserAvatar";
import navbarLinks from "@/data/navbarLinks.json";
import { getCookie } from "@/services/cookie";
import { getAuthAppUrl } from "@/lib/authAppUrl";
import { logoutAndClearAuthSession } from "@/services/authSession.service";
import { useAuthState } from "@/hooks/useAuthState";
import { getCountries } from "@/services/location.service";
import {
  getMyProfile,
  hasBusinessFromProfile,
  syncBusinessRegistrationCookie,
} from "@/services/profile.service";
import { openAuthLoginTab } from "@/lib/crossAppTabNavigation";

const hasBusinessCookieHint = () => {
  const registered = String(getCookie("business_registered") || "").trim().toLowerCase();
  if (registered === "true" || registered === "1" || registered === "yes") return true;
  if (String(getCookie("branch_id") || "").trim()) return true;
  if (String(getCookie("business_id") || "").trim()) return true;
  return false;
};

function isPathActive(pathname, href) {
  if (!href || href.startsWith("#") || href.startsWith("http")) return false;
  if (href === "/home") return pathname === "/" || pathname === "/home";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavbarItem({ item, isActive, onNavigate }) {
  const isExternal = item.href.startsWith("http");
  const isAnchor = item.href.startsWith("#");
  const useAnchorTag = isExternal || item.download || isAnchor;
  const baseClass =
    "relative px-3 py-1.5 text-base font-medium transition duration-200";
  const activeClass = isActive
    ? "text-white after:absolute after:bottom-[-7px] after:left-3 after:right-3 after:h-[2px] after:rounded-full after:bg-amber-300 after:content-['']"
    : "text-slate-300 hover:text-white after:absolute after:bottom-[-7px] after:left-3 after:right-3 after:h-[2px] after:origin-center after:scale-x-0 after:rounded-full after:bg-amber-300 after:transition-transform after:duration-200 after:content-[''] hover:after:scale-x-100";

  if (useAnchorTag) {
    return (
      <a
        href={item.href}
        download={item.download ? true : undefined}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={`${baseClass} ${activeClass}`}
        onClick={onNavigate}
      >
        {item.name}
      </a>
    );
  }

  return (
    <Link href={item.href} className={`${baseClass} ${activeClass}`} onClick={onNavigate}>
      {item.name}
    </Link>
  );
}

export default function MainNavbar() {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const isHomeRoute = pathname === "/" || pathname === "/home";
  const isAuthenticated = useAuthState();
  const [profile, setProfile] = useState(null);
  const [hasBusiness, setHasBusiness] = useState(() => hasBusinessCookieHint());
  const [countryBadgeName, setCountryBadgeName] = useState("");
  const fallbackEmail = getCookie("verified_email") || getCookie("user_email") || "";
  const fallbackSeaNebId = getCookie("seaneb_id") || "";
  const userEmail = profile?.email || fallbackEmail;
  const userName = profile?.full_name || profile?.first_name || userEmail || "User";
  const userSeaNebId = String(profile?.seaneb_id || fallbackSeaNebId || "").trim();
  const profilePhoto = String(profile?.profile_photo || "").trim();
  const profileUrl = "/dashboard/broker";
  const registerBusinessUrl = getAuthAppUrl("/auth/business-register");
  const loginUrl = getAuthAppUrl("/auth/login");
  const canShowAuthenticated = hydrated && isAuthenticated;
  const downloadSectionHref = "/home#download";

  const handleGetAppClick = (event) => {
    if (pathname === "/" || pathname === "/home") {
      event.preventDefault();
      const target = document.getElementById("download");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", "#download");
      }
      return;
    }
    router.push(downloadSectionHref);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      if (!hydrated || !isAuthenticated) {
        if (!active) return;
        setProfile(null);
        setHasBusiness(false);
        return;
      }

      try {
        const data = await getMyProfile();
        if (!active) return;
        setProfile(data || null);
        const business = hasBusinessFromProfile(data || {});
        setHasBusiness(business);
        syncBusinessRegistrationCookie(data || {});
      } catch {
        if (!active) return;
        setHasBusiness(hasBusinessCookieHint());
      }
    };

    void loadProfile();
    return () => {
      active = false;
    };
  }, [hydrated, isAuthenticated, pathname]);

  useEffect(() => {
    let active = true;

    const loadCountryBadge = async () => {
      try {
        const countries = await getCountries();
        if (!active) return;
        const firstName = String(countries?.[0]?.name || "").trim();
        setCountryBadgeName(firstName || "India");
      } catch {
        if (!active) return;
        setCountryBadgeName("India");
      }
    };

    void loadCountryBadge();
    return () => {
      active = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logoutAndClearAuthSession();
    } finally {
      setIsProfileOpen(false);
    }
  };

  const handleLoginClick = (event) => {
    event.preventDefault();
    setIsProfileOpen(false);
    openAuthLoginTab();
  };

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-[120] overflow-visible border-b border-white/20 backdrop-blur-xl ${
        isHomeRoute
          ? `${hasScrolled ? "bg-[#2a2419]/92 shadow-md" : "bg-transparent"}`
          : "bg-[#2a2419]/92 shadow-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link
            href="/home"
            className={`rounded-xl px-2 py-1 transition ${isHomeRoute ? "hover:bg-white/10" : "hover:bg-white/10"}`}
          >
            <BrandLogo
              size={48}
              titleClass="text-white text-lg font-bold"
              subtitleClass="text-amber-200/70 text-xs"
              textWrapperClass="block"
              compact
            />
          </Link>
          <div className="hidden sm:flex items-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/60 bg-amber-200/20 px-3 py-1 text-xs font-semibold text-amber-100">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
              {countryBadgeName || "India"}
            </span>
          </div>
        </div>

        <nav className="hidden items-center gap-2 lg:flex">
          {navbarLinks.map((item) => (
            <NavbarItem
              key={`${item.name}-${item.href}`}
              item={item}
              isActive={isPathActive(pathname, item.href)}
            />
          ))}
        </nav>

        <div className="relative flex items-center gap-3" ref={dropdownRef}>
          <Link
            href={downloadSectionHref}
            onClick={handleGetAppClick}
            className="hidden rounded-full border border-[#c79a2b] bg-[#c79a2b] px-4 py-2 text-sm font-semibold text-[#1b1304] transition hover:bg-[#d8ac3e] sm:inline-block"
          >
            Get the App
          </Link>

          <button
            type="button"
            onClick={() => setIsProfileOpen((open) => !open)}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-2 py-1 text-white transition hover:border-white/35 hover:bg-white/10"
            aria-label="Profile menu"
          >
            {profilePhoto ? (
              <span className="inline-flex h-8 w-8 overflow-hidden rounded-full border border-white/20 bg-white/15">
                <Image
                  src={profilePhoto}
                  alt={userName || "Profile"}
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              </span>
            ) : (
              <TempUserAvatar size="sm" />
            )}
            <span className="hidden pr-1 text-xs font-semibold sm:inline">
              {canShowAuthenticated ? "Account" : "Sign In"}
            </span>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-[calc(100%+0.6rem)] z-[100] max-h-[80vh] w-[min(92vw,22.5rem)] overflow-y-auto rounded-2xl border border-white/10 bg-[#0f1116] text-slate-100 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
              {canShowAuthenticated ? (
                <>
                  <div className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {profilePhoto ? (
                        <span className="inline-flex h-12 w-12 overflow-hidden rounded-full border border-white/20 bg-white/10">
                          <Image
                            src={profilePhoto}
                            alt={userName || "Profile"}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                            unoptimized
                          />
                        </span>
                      ) : (
                        <TempUserAvatar size="lg" />
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-[1.1rem] font-semibold text-white">{userName}</p>
                        <p className="truncate text-sm text-slate-300">
                          {userSeaNebId ? `SeaNeB ID: ${userSeaNebId}` : userEmail || "Signed in user"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 border-t border-white/10 px-4 py-4">
                    <Link
                      href={hasBusiness ? profileUrl : registerBusinessUrl}
                      onClick={() => setIsProfileOpen(false)}
                      className="flex min-h-[96px] flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center transition hover:border-white/20 hover:bg-white/[0.08]"
                    >
                      <span className="text-xl leading-none text-slate-200">{"\u25A6"}</span>
                      <span className="mt-3 text-[1.65rem] leading-none text-slate-300">
                        {"\u2192"}
                      </span>
                      <span className="mt-2 text-[1.05rem] font-semibold leading-tight text-white">
                        {hasBusiness ? "Switch to Business" : "Register Business"}
                      </span>
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex min-h-[96px] flex-col items-center justify-center rounded-xl border border-rose-500/35 bg-rose-950/40 px-3 py-3 text-center transition hover:border-rose-400/50 hover:bg-rose-900/50"
                    >
                      <span className="text-xl leading-none text-rose-200">{"\u21AA"}</span>
                      <span className="mt-3 text-[1.65rem] leading-none text-rose-200">
                        {"\u2192"}
                      </span>
                      <span className="mt-2 text-[1.05rem] font-semibold leading-tight text-rose-100">
                        Logout
                      </span>
                    </button>
                  </div>
                  <div className="border-t border-white/10 px-4 py-2 text-center text-sm font-medium text-slate-400">
                    SeaNeB Account
                  </div>
                </>
              ) : (
                <div className="p-4">
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                    <TempUserAvatar size="lg" />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white">Welcome to SeaNeB</p>
                      <p className="text-xs text-slate-400">Access your account to continue</p>
                    </div>
                  </div>
                  <Link
                    href={loginUrl}
                    onClick={handleLoginClick}
                    className="mt-3 block rounded-xl bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                  >
                    Sign In
                  </Link>
                  <p className="mt-2 text-center text-[11px] text-slate-500">
                    Temporary person logo is shown until user photo is added
                  </p>
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
            aria-label="Toggle menu"
          >
            <span className="text-lg leading-none">{isMobileMenuOpen ? "\u2715" : "\u2261"}</span>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-white/15 bg-slate-950/95 px-4 py-3 sm:px-6 lg:hidden">
          <nav className="grid grid-cols-2 gap-2">
            {navbarLinks.map((item) => (
              <NavbarItem
                key={`mobile-${item.name}-${item.href}`}
                item={item}
                isActive={isPathActive(pathname, item.href)}
                onNavigate={() => setIsMobileMenuOpen(false)}
              />
            ))}
          </nav>
          <Link
            href={downloadSectionHref}
            onClick={(event) => {
              setIsMobileMenuOpen(false);
              handleGetAppClick(event);
            }}
            className="mt-3 block rounded-xl border border-[#c79a2b] bg-[#c79a2b] px-4 py-2 text-center text-sm font-semibold text-[#1b1304] hover:bg-[#d8ac3e]"
          >
            Get the App
          </Link>
        </div>
      )}
    </header>
    {!isHomeRoute && <div className="h-[74px]" aria-hidden="true" />}
    </>
  );
}
