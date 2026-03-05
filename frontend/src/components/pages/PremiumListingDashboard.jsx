"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import BrandLogo from "@/components/ui/BrandLogo";

const PROPERTY_CATEGORIES = ["House", "Villa", "Apartment", "Guesthouse"];
const SEARCH_MODES = ["Buy", "Rent", "Sell"];

const PROPERTIES = [
  {
    id: 1,
    title: "Lakeview Modern Villa",
    price: "$1,280,000",
    beds: 4,
    baths: 3,
    sqft: 3210,
    location: "Madison Park, Seattle",
    image: "/assets/home/Gemini_Generated_Image_jnqk9ajnqk9ajnqk.png",
    agent: "Ari Collins",
    agentAvatar: "/logos/Fav.png",
  },
  {
    id: 2,
    title: "Downtown Smart Apartment",
    price: "$780,000",
    beds: 2,
    baths: 2,
    sqft: 1320,
    location: "Belltown, Seattle",
    image: "/assets/about/about-discovery.jpg",
    agent: "Lina Hayes",
    agentAvatar: "/logos/Fav.png",
  },
  {
    id: 3,
    title: "Hillside Family House",
    price: "$925,000",
    beds: 3,
    baths: 2,
    sqft: 2050,
    location: "Queen Anne, Seattle",
    image: "/assets/about/about-hero.jpg",
    agent: "Nolan Reed",
    agentAvatar: "/logos/Fav.png",
  },
  {
    id: 4,
    title: "Garden Guesthouse Suite",
    price: "$510,000",
    beds: 2,
    baths: 1,
    sqft: 980,
    location: "Ballard, Seattle",
    image: "/assets/about/about-team.jpg",
    agent: "Mila Hart",
    agentAvatar: "/logos/Fav.png",
  },
  {
    id: 5,
    title: "Waterfront Luxury Condo",
    price: "$1,050,000",
    beds: 3,
    baths: 2,
    sqft: 1880,
    location: "South Lake Union, Seattle",
    image: "/assets/about/about-trust.jpg",
    agent: "Drew Patel",
    agentAvatar: "/logos/Fav.png",
  },
  {
    id: 6,
    title: "West End Designer Loft",
    price: "$690,000",
    beds: 1,
    baths: 1,
    sqft: 840,
    location: "Capitol Hill, Seattle",
    image: "/assets/home/image.png",
    agent: "Eva Monroe",
    agentAvatar: "/logos/Fav.png",
  },
];

function IconBell(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true" {...props}>
      <path d="M15 18H5c1.2-1.1 2-2.9 2-5v-1a5 5 0 1 1 10 0v1c0 2.1.8 3.9 2 5h-4" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}

function IconMessage(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true" {...props}>
      <path d="M20 12a7 7 0 0 1-7 7H7l-3 3v-10a7 7 0 0 1 7-7h2a7 7 0 0 1 7 7Z" />
    </svg>
  );
}

function IconSearch(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function IconFilter(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true" {...props}>
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

function PropertyCard({ property }) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-[0_14px_34px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,23,42,0.12)]">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm">
          {property.location}
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{property.title}</h3>
            <p className="mt-1 text-sm text-slate-500">from</p>
          </div>
          <p className="text-lg font-bold text-slate-900">{property.price}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-slate-50 p-3 text-center text-sm text-slate-600">
          <div>
            <p className="font-semibold text-slate-800">{property.beds}</p>
            <p>Beds</p>
          </div>
          <div>
            <p className="font-semibold text-slate-800">{property.baths}</p>
            <p>Baths</p>
          </div>
          <div>
            <p className="font-semibold text-slate-800">{property.sqft}</p>
            <p>sqft</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image
              src={property.agentAvatar}
              alt={property.agent}
              width={30}
              height={30}
              className="h-[30px] w-[30px] rounded-full border border-slate-200 object-cover"
            />
            <span className="text-sm font-medium text-slate-700">{property.agent}</span>
          </div>

          <button className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800">
            View details
          </button>
        </div>
      </div>
    </article>
  );
}

export default function PremiumListingDashboard() {
  const [activeCategory, setActiveCategory] = useState(PROPERTY_CATEGORIES[0]);
  const [activeMode, setActiveMode] = useState(SEARCH_MODES[0]);
  const [location, setLocation] = useState("Seattle, WA");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!userMenuRef.current) return;
      if (!userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const resultsText = useMemo(() => {
    return `${PROPERTIES.length} premium matches for ${activeMode.toLowerCase()}`;
  }, [activeMode]);

  return (
    <div className="min-h-screen bg-[#f5f7fb] px-4 pb-12 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <header className="sticky top-4 z-50 rounded-[28px] border border-white/70 bg-white/95 px-4 py-3 shadow-[0_20px_45px_rgba(15,23,42,0.10)] backdrop-blur sm:px-6">
          <div className="flex flex-wrap items-center gap-4 lg:flex-nowrap lg:justify-between">
            <Link href="/home" className="rounded-2xl p-1 transition hover:bg-slate-100">
              <BrandLogo
                size={42}
                titleClass="text-slate-900 text-xl font-bold"
                subtitleClass="text-slate-500 text-xs"
              />
            </Link>

            <nav className="order-3 flex w-full items-center gap-2 overflow-x-auto rounded-2xl bg-slate-100 p-1.5 lg:order-2 lg:w-auto lg:min-w-[430px] lg:justify-center">
              {PROPERTY_CATEGORIES.map((category) => {
                const active = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                      active
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </nav>

            <div className="order-2 ml-auto flex items-center gap-2 lg:order-3" ref={userMenuRef}>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                aria-label="Notifications"
              >
                <IconBell className="h-5 w-5" />
              </button>

              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                aria-label="Messages"
              >
                <IconMessage className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-2.5 py-1.5 text-white transition hover:bg-slate-800"
                aria-expanded={isUserMenuOpen}
                aria-haspopup="menu"
              >
                <Image
                  src="/logos/Fav.png"
                  alt="User"
                  width={30}
                  height={30}
                  className="rounded-full border border-white/35 object-cover"
                />
                <span className="hidden text-sm font-medium sm:inline">Devon</span>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] w-52 rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_18px_36px_rgba(15,23,42,0.16)]">
                  <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
                    Profile settings
                  </button>
                  <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
                    Saved homes
                  </button>
                  <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="mt-5 rounded-[28px] bg-white p-4 shadow-[0_18px_38px_rgba(15,23,42,0.08)] sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="inline-flex w-full rounded-2xl bg-slate-100 p-1 sm:w-auto">
              {SEARCH_MODES.map((mode) => {
                const active = activeMode === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setActiveMode(mode)}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {mode}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-1 items-center gap-2 rounded-2xl bg-slate-100 p-2">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl bg-white px-3 py-2.5 shadow-sm">
                <IconSearch className="h-4.5 w-4.5 shrink-0 text-slate-500" />
                <input
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="Search by city, neighborhood, ZIP"
                  className="w-full border-0 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>

              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white transition hover:bg-slate-800"
                aria-label="Open filters"
              >
                <IconFilter className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Seattle, WA Accommodation</h1>
            <p className="text-sm text-slate-500">{resultsText}</p>
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(340px,1fr)]">
          <div className="grid gap-5 sm:grid-cols-2">
            {PROPERTIES.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <aside className="xl:sticky xl:top-32 xl:self-start">
            <div className="overflow-hidden rounded-3xl bg-white p-3 shadow-[0_16px_36px_rgba(15,23,42,0.10)]">
              <div className="relative overflow-hidden rounded-2xl">
                <iframe
                  title="Seattle map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-122.4004%2C47.5733%2C-122.2850%2C47.6615&layer=mapnik"
                  className="h-[420px] w-full border-0"
                  loading="lazy"
                />

                <div className="pointer-events-none absolute inset-x-3 top-3 flex items-center justify-between">
                  <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                    Live map
                  </span>
                  <span className="rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    24 Pins
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
