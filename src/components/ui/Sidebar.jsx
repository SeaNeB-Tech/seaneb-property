"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  DASHBOARD_MODE_USER,
  DASHBOARD_MODE_BUSINESS,
  getDashboardMode,
} from "@/services/dashboardMode.service";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [dashboardMode, setDashboardMode] = useState(DASHBOARD_MODE_USER);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setDashboardMode(getDashboardMode());
    });
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const isBusinessPath =
    pathname === "/dashboard/broker" ||
    pathname?.startsWith("/dashboard/listings") ||
    pathname?.startsWith("/dashboard/analytics");
  const isBusinessContext = isBusinessPath || dashboardMode === DASHBOARD_MODE_BUSINESS;

  const menuItems = useMemo(() => {
    if (isBusinessContext) {
      return [
        { label: "Business Home", href: "/dashboard/broker", icon: "BH" },
        { label: "Listings", href: "/dashboard/listings", icon: "LS" },
        { label: "Analytics", href: "/dashboard/analytics", icon: "AN" },
        { label: "Products", href: "/dashboard/products", icon: "PR" },
        { label: "Settings", href: "/dashboard/settings", icon: "ST" },
        { label: "Help", href: "/dashboard/help", icon: "HP" },
      ];
    }

    return [
      { label: "Dashboard", href: "/dashboard", icon: "DB" },
      { label: "Products", href: "/dashboard/products", icon: "PR" },
      { label: "Settings", href: "/dashboard/settings", icon: "ST" },
      { label: "Help", href: "/dashboard/help", icon: "HP" },
    ];
  }, [isBusinessContext]);

  const isActive = (href) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    if (href === "/dashboard/broker") return pathname === "/dashboard/broker";
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-16 z-50 block rounded-md bg-[#9E6200] p-2 text-[#FCFCF7] transition-colors hover:bg-[#7F4F00] lg:hidden"
        aria-label="Toggle sidebar"
      >
        {isOpen ? "X" : "|||"}
      </button>

      <aside
        className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 transform bg-gradient-to-b from-[#9E6200] to-[#613D00] text-[#FCFCF7] shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex h-full flex-col">
          <div className="hidden border-b border-[#B6841F]/60 px-6 py-8 lg:block">
            <h2 className="mb-1 text-2xl font-bold text-[#FCFCF7]">SeaNeB</h2>
            <p className="text-xs font-medium text-[#F3EBD6]">Real Estate Platform</p>
          </div>

          <ul className="flex-1 space-y-2 overflow-y-auto px-2 py-6">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "border-l-[3px] border-[#FCFCF7] bg-[#BF932A] text-black shadow-lg"
                      : "text-[#FCFCF7] hover:bg-[#7F4F00]/70"
                  }`}
                >
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FCFCF7]/20 text-[11px] font-bold tracking-wide text-[#FCFCF7]">
                    {item.icon}
                  </span>
                  <span className="truncate text-sm">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="space-y-4 border-t border-[#B6841F]/60 px-6 py-6">
            <div className="text-xs font-medium text-[#F3EBD6]">
              <p className="mb-1">SeaNeB Platform</p>
              <p className="text-[10px]">© 2026 All Rights Reserved</p>
            </div>
          </div>
        </nav>
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
}


