"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import BrandLogo from "./BrandLogo";
import TempUserAvatar from "./TempUserAvatar";
import navbarLinks from "@/data/navbarLinks.json";
import { getCookie } from "@/services/cookie";
import { getAuthAppUrl } from "@/lib/authAppUrl";
import { logoutAndClearAuthSession } from "@/services/authSession.service";
import { useAuthState } from "@/hooks/useAuthState";

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
    ? "text-white after:absolute after:bottom-[-7px] after:left-1/2 after:h-[2px] after:w-10 after:-translate-x-1/2 after:rounded-full after:bg-amber-300 after:content-['']"
    : "text-slate-300 hover:text-white after:absolute after:bottom-[-7px] after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-amber-300 after:transition-all after:duration-200 after:content-[''] hover:after:w-8";

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
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const isHomeRoute = pathname === "/" || pathname === "/home";
  const isAuthenticated = useAuthState();
  const userEmail = getCookie("verified_email") || getCookie("user_email") || "";
  const userLabel = userEmail || "Guest User";
  const dashboardUrl = "/dashboard";
  const loginUrl = getAuthAppUrl("/auth/login");

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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

  const handleLogout = async () => {
    try {
      await logoutAndClearAuthSession();
    } finally {
      setIsProfileOpen(false);
    }
  };

  return (
    <header
      className={`top-0 z-50 border-b border-white/20 backdrop-blur-xl ${
        isHomeRoute ? "absolute left-0 right-0 bg-transparent" : "sticky bg-[#2a2419]/92"
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
              India
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
            href="#download"
            className="hidden rounded-full border border-amber-300/70 bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-200 sm:inline-block"
          >
            Get the App
          </Link>

          <button
            type="button"
            onClick={() => setIsProfileOpen((open) => !open)}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-2 py-1 text-white transition hover:border-white/35 hover:bg-white/10"
            aria-label="Profile menu"
          >
            <TempUserAvatar size="sm" />
            <span className="hidden pr-1 text-xs font-semibold sm:inline">
              {isAuthenticated ? "Account" : "Sign In"}
            </span>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-14 z-50 w-[min(92vw,21rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-[0_22px_50px_rgba(2,6,23,0.25)]">
              {isAuthenticated ? (
                <>
                  <div className="bg-gradient-to-r from-sky-50 to-indigo-50 px-5 py-4">
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
                      href={dashboardUrl}
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
                    href={loginUrl}
                    onClick={() => setIsProfileOpen(false)}
                    className="mt-3 block rounded-xl bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
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
            href="#download"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-3 block rounded-xl bg-amber-300 px-4 py-2 text-center text-sm font-semibold text-slate-950"
          >
            Get the App
          </Link>
        </div>
      )}
    </header>
  );
}

