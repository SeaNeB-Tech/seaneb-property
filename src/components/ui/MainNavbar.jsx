"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import BrandLogo from "./BrandLogo";
import TempUserAvatar from "./TempUserAvatar";
import navbarLinks from "@/data/navbarLinks.json";
import { getCookie } from "@/services/cookie";
import { getAuthAppUrl } from "@/lib/authAppUrl";
import {
  isAuthenticatedByCookies,
  logoutAndClearAuthSession,
  subscribeAuthState,
} from "@/services/authSession.service";

function NavbarItem({ item }) {
  const isExternal = item.href.startsWith("http");
  const isAnchor = item.href.startsWith("#");
  const useAnchorTag = isExternal || item.download || isAnchor;

  if (useAnchorTag) {
    return (
      <a
        href={item.href}
        download={item.download ? true : undefined}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-sm font-medium hover:text-white transition"
      >
        {item.name}
      </a>
    );
  }

  return (
    <Link href={item.href} className="text-sm font-medium hover:text-white transition">
      {item.name}
    </Link>
  );
}

export default function MainNavbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isAuthenticated = useSyncExternalStore(
    subscribeAuthState,
    isAuthenticatedByCookies,
    () => false
  );
  const userEmail = getCookie("verified_email") || getCookie("user_email") || "";
  const userLabel = userEmail || "Guest User";
  const dashboardUrl = "/dashboard";
  const loginUrl = getAuthAppUrl("/auth/login");

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
    <header className="relative z-50 bg-black border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* ================= LEFT: LOGO + LOCATION ================= */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link
            href="/home"
            className="hover:opacity-90 transition"
          >
            <BrandLogo
              size={48}
              titleClass="text-white text-lg font-bold"
              subtitleClass="text-gray-400 text-xs"
              textWrapperClass="block"
              compact
            />
          </Link>

          {/* Location Pill */}
          <div className="hidden sm:flex items-center ml-4">
            <span className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow hover:bg-red-700 transition">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z"
                  fill="#fff"
                />
              </svg>
              Location
            </span>
          </div>
        </div>

        {/* ================= CENTER: NAV ================= */}
        <nav className="hidden lg:flex items-center gap-8 text-gray-300">
          {navbarLinks.map((item) => (
            <NavbarItem key={`${item.name}-${item.href}`} item={item} />
          ))}
        </nav>

        {/* ================= RIGHT: CTA ================= */}
        <div className="relative flex items-center gap-3" ref={dropdownRef}>
          <Link
            href="#download"
            className="hidden sm:inline-block bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
          >
            Get the App
          </Link>

          <button
            type="button"
            onClick={() => setIsProfileOpen((open) => !open)}
            className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900 px-2 py-1 text-white transition hover:border-gray-600 hover:bg-gray-800"
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
        </div>
      </div>
    </header>
  );
}

