import MarketingPageShell from "@/components/marketing/shared/MarketingPageShell";
import Image from "next/image";
import PropertySearchWidget from "@/components/marketing/home/PropertySearchWidget";
import { getHomePageData } from "@/lib/marketing/getMarketingPageData";
import { getSiteUrl } from "@/lib/siteUrl";
import { getCountries } from "@/services/location.service";
import Link from "next/link";

const PROPERTY_TYPE_CARDS = [
  { name: "Apartments", info: "2,400+ listings", icon: "\u25A4", tone: "text-sky-600" },
  { name: "Houses", info: "850+ listings", icon: "\u25B2", tone: "text-emerald-600" },
  { name: "Commercial", info: "1,200+ listings", icon: "\u25AC", tone: "text-amber-600" },
  { name: "Land", info: "500+ listings", icon: "\u25A8", tone: "text-cyan-600", featured: true },
];

export const metadata = {
  title: "SeaNeB Home | Verified Real Estate Discovery",
  description: "Search verified buy, rent, and commercial listings with SeaNeB's local-first real estate experience.",
  openGraph: {
    title: "SeaNeB Home | Verified Real Estate Discovery",
    description: "Find trusted listings, trending localities, and direct broker connections on SeaNeB.",
    type: "website",
    url: getSiteUrl("/home"),
  },
};

export default async function HomePage() {
  const data = await getHomePageData();
  const heroImage = data?.hero?.image || "/assets/home/home-hero.jpg";
  const heroImageAlt = data?.hero?.imageAlt || "Property discovery experience";
  const isHeroSvg = heroImage.endsWith(".svg");
  const isSquareHero = heroImage.includes("Gemini_Generated_Image_jnqk9ajnqk9ajnqk.png");
  const selectedCountries = Array.isArray(data.countriesSection?.countries)
    ? data.countriesSection.countries
    : [];
  const selectedSet = new Set(
    selectedCountries.map((countryName) => String(countryName || "").trim().toLowerCase())
  );

  let countriesToShow = selectedCountries.map((countryName) => ({
    name: countryName,
    code: String(countryName || "").trim().toLowerCase() === "india" ? "in" : "",
    flag: "/assets/countries/flags/in.png",
  }));

  try {
    const apiCountries = await getCountries();
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
        code,
        flag:
          country?.raw?.flag ||
          country?.raw?.flag_url ||
          (code ? `https://flagcdn.com/w40/${code}.png` : "/assets/countries/flags/in.png"),
      };
    });

    const filtered = selectedSet.size
      ? normalized.filter((country) => selectedSet.has(country.name.toLowerCase()))
      : normalized;

    if (filtered.length) {
      countriesToShow = filtered;
    }
  } catch {
    // Keep fallback countries when API call fails.
  }

  const primaryCountry = countriesToShow[0] || { name: "India", code: "in" };
  const primaryCountryName = String(primaryCountry?.name || "India").trim() || "India";
  const primaryCountryCode = String(primaryCountry?.code || "").trim().toLowerCase();
  const primaryCountryHref = primaryCountryCode && primaryCountryCode !== "in"
    ? `/in/${primaryCountryCode}`
    : "/in";

  return (
    <MarketingPageShell>
      <section className="relative min-h-[640px] overflow-hidden text-white">
        <Image
          src={heroImage}
          alt={heroImageAlt}
          fill
          priority
          fetchPriority="high"
          unoptimized={isHeroSvg}
          className="object-cover object-center"
          style={isSquareHero ? { objectPosition: "center 62%" } : undefined}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/58 to-black/74" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(191,147,42,0.26),transparent_58%)]" />
        <div className="absolute left-0 right-0 top-20 h-px bg-white/20" />
        <div className="relative mx-auto flex min-h-[640px] max-w-7xl items-center px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <div className="w-full text-center lg:text-center">
            <p className="mx-auto inline-flex rounded-full border border-amber-200/70 bg-amber-100/30 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-amber-50">
              Trusted Real Estate Discovery
            </p>
            <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-[56px] lg:leading-[1.05]">
              Find Verified Properties
              <span className="block">{`Across ${primaryCountryName}`}</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-100 sm:text-[15px]">
              {data.hero.description}
            </p>

            <div className="mx-auto mt-8 w-full max-w-[980px] rounded-[30px] border border-white/35 bg-white/12 p-3 shadow-2xl backdrop-blur-md sm:p-4">
              <PropertySearchWidget searchSection={data.searchSection} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f8f8] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold text-slate-900">Browse by Property Type</h2>
            <p className="mt-2 text-sm text-slate-600">
              Choose the format that fits your buying goals from our verified listings.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
            {PROPERTY_TYPE_CARDS.map((card) => (
              <article
                key={card.name}
                className={`rounded-3xl border border-[#d7bc7a] bg-[#f4ecd8] px-4 py-7 text-center transition hover:-translate-y-0.5 hover:bg-[#f1e4c9] ${
                  card.featured ? "border-blue-300 shadow-[0_14px_28px_rgba(59,130,246,0.2)]" : ""
                }`}
              >
                <span
                  className={`mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eaf0f9] text-sm shadow-sm ${card.tone}`}
                >
                  {card.icon}
                </span>
                <h3 className="text-base font-bold text-slate-900">{card.name}</h3>
                <p className="mt-1 text-xs font-medium text-slate-600">{card.info}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f8f8] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-5xl font-bold text-slate-900">Available Location</h2>
              <p className="mt-2 text-sm text-slate-600">{data.countriesSection?.description || `Explore listings across ${primaryCountryName}.`}</p>
            </div>
            <Link href={primaryCountryHref} className="hidden text-sm font-semibold text-slate-700 hover:text-slate-900 sm:inline-flex">
              {`View ${primaryCountryName} locations ->`}
            </Link>
          </div>

          <div className="mt-8 w-full max-w-[220px] rounded-2xl border border-[#d7bc7a] bg-[#f4ecd8] px-4 py-2.5">
            <Link href={primaryCountryHref} className="flex items-center gap-2">
              <Image
                src={countriesToShow[0]?.flag || "/assets/countries/flags/in.png"}
                alt={`${primaryCountryName} flag`}
                width={28}
                height={20}
                className="h-5 w-7 rounded-[3px] object-cover"
              />
              <span className="text-sm font-semibold text-slate-800">{primaryCountryName}</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="download" className="bg-[#f8f8f8] py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-[#2e2a20] via-[#201c16] to-[#2b251c] p-8 text-white shadow-[0_26px_46px_rgba(20,16,10,0.22)] sm:p-12">
            <div className="pointer-events-none absolute -left-24 -top-16 h-64 w-64 rounded-full bg-amber-300/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 right-2 h-72 w-72 rounded-full bg-blue-400/12 blur-3xl" />
            <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1.3fr_0.9fr]">
              <div>
                <p className="inline-flex rounded-full border border-white/20 bg-white/8 px-3 py-1 text-[11px] font-semibold text-slate-200">
                  Available on iOS & Android
                </p>
                <h3 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Get SeaNeB on Your Phone</h3>
                <p className="mt-3 max-w-xl text-sm text-slate-300">
                  Use the app to track listings, save favorites, and receive updates instantly anywhere, anytime.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Instant Alerts", "Saved Searches", "Verified Leads"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/20 bg-white/8 px-3 py-1 text-[11px] font-semibold text-slate-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mx-auto h-[260px] w-[170px] rotate-[9deg] rounded-[34px] border border-slate-300/40 bg-slate-950 p-2 shadow-[0_20px_40px_rgba(0,0,0,0.45)]">
                <div className="h-full w-full overflow-hidden rounded-[28px]">
                  <Image
                    src="/assets/home/image.png"
                    alt="SeaNeB mobile app preview"
                    width={440}
                    height={880}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#c8a14a] py-20 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">Ready to Find Your Next Property?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-amber-50/90">
            Join thousands of users on SeaNeB and discover verified opportunities in your preferred location.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-md transition hover:bg-slate-100"
            >
              Get Started Now
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-white/70 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </MarketingPageShell>
  );
}
