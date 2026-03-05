import MarketingPageShell from "@/components/marketing/shared/MarketingPageShell";
import Image from "next/image";
import PropertySearchWidget from "@/components/marketing/home/PropertySearchWidget";
import { getHomePageData } from "@/lib/marketing/getMarketingPageData";
import { getSiteUrl } from "@/lib/siteUrl";
import { getCountries } from "@/services/property.service";
import Link from "next/link";

const PROPERTY_TYPE_CARDS = [
  { name: "Apartments", info: "2,400+ listings", iconSrc: "/icons/apartment.svg" },
  { name: "Houses", info: "850+ listings", iconSrc: "/icons/house.svg" },
  { name: "Commercial", info: "1,200+ listings", iconSrc: "/icons/commercial.svg" },
  { name: "Land", info: "500+ listings", iconSrc: "/icons/land.svg", featured: true },
];

const HERO_VALUE_POINTS = [
  "Verification-first listing approach for safer discovery",
  "Hyperlocal search by city, zone, and locality",
  "Built for buyers, sellers, renters, investors, and contributors",
];

const CORE_AUDIENCE_SEGMENTS = [
  { title: "Buyers", copy: "Shortlist verified property options with stronger location and listing context." },
  { title: "Sellers", copy: "Publish clear, structured listings to attract serious search intent." },
  { title: "Renters", copy: "Compare rental homes with better transparency before committing." },
  { title: "Investors", copy: "Track local market movement and evaluate areas with practical clarity." },
  { title: "Contributors", copy: "Share verified area and project updates that improve market understanding." },
];

const PROPERTY_JOURNEY_SECTIONS = [
  {
    title: "Buy Property Safely in India",
    keywords: "buy property in India, verified property listings, safe property buying",
    benefits: [
      "Evaluate options with clearer listing details.",
      "Use locality filters to shortlist faster.",
      "Move ahead with trust-focused checkpoints.",
    ],
    explanation:
      "SeaNeB Realty helps buyers evaluate listings with clearer details, hyperlocal filters, and trust-focused decision checkpoints.",
  },
  {
    title: "Rent Homes with Transparency",
    keywords: "rent home in India, transparent rental listings, verified rental property",
    benefits: [
      "Compare homes with practical clarity.",
      "Review neighborhood context before deciding.",
      "Reduce avoidable surprises during move-in.",
    ],
    explanation:
      "Compare rental options using quality listing inputs, neighborhood context, and practical checks that reduce avoidable surprises.",
  },
  {
    title: "Explore New Projects and Investments",
    keywords: "new projects in India, property investment India, upcoming real estate projects",
    benefits: [
      "Track local growth signals area-wise.",
      "Review project context with better structure.",
      "Assess opportunities with stronger confidence.",
    ],
    explanation:
      "Use locality-aware discovery and contributor-led market updates to evaluate projects and investment opportunities with better context.",
  },
  {
    title: "Sell Property Faster",
    keywords: "sell property online India, post property free, find property buyers",
    benefits: [
      "Post structured listings for better visibility.",
      "Attract relevant search intent from your city.",
      "Improve lead quality with clearer listing inputs.",
    ],
    explanation:
      "Structured listing workflows improve discovery quality and help sellers reach users with active city and locality intent.",
  },
];

const HOW_IT_WORKS = {
  buyers: [
    "Search by city, locality, budget, and property type.",
    "Shortlist options with stronger verification and context cues.",
    "Connect directly and move ahead with better clarity.",
  ],
  sellers: [
    "Post your property with complete and transparent details.",
    "Improve listing quality with structured inputs.",
    "Receive focused discovery from relevant search audiences.",
  ],
  renters: [
    "Use rental filters by locality, budget, and home type.",
    "Compare listings for transparency and practical fit.",
    "Connect and proceed with reduced decision risk.",
  ],
};

const SEO_LINKS = [
  { label: "Buy flats in Mumbai", href: "/in?q=buy+flats+in+mumbai" },
  { label: "2 BHK apartments in Pune", href: "/in?q=2+bhk+apartments+in+pune" },
  { label: "Rental homes in Bengaluru", href: "/in?q=rental+homes+in+bengaluru" },
  { label: "Commercial property in Hyderabad", href: "/in?q=commercial+property+in+hyderabad" },
  { label: "New launch projects in Noida", href: "/in?q=new+launch+projects+in+noida" },
  { label: "Plots for sale in Ahmedabad", href: "/in?q=plots+for+sale+in+ahmedabad" },
  { label: "Verified property listings in Delhi NCR", href: "/in?q=verified+property+listings+in+delhi+ncr" },
  { label: "Ready-to-move apartments in Gurgaon", href: "/in?q=ready+to+move+apartments+in+gurgaon" },
];

const FAQS = [
  {
    question: "What is RERA and why is it important?",
    answer:
      "RERA is a real estate regulatory framework in India. It improves accountability and helps users evaluate project legitimacy before committing.",
  },
  {
    question: "How can I verify a property listing online?",
    answer:
      "Check listing completeness, ownership clarity, documentation readiness, and project compliance context where available before making payments.",
  },
  {
    question: "How does SeaNeB Realty reduce online fraud risk?",
    answer:
      "SeaNeB Realty emphasizes verification-focused workflows, transparent listing inputs, and reporting pathways for suspicious or misleading entries.",
  },
  {
    question: "Can I post my property on SeaNeB Realty?",
    answer:
      "Yes. Owners and authorized representatives can post properties with structured details to improve quality visibility and response relevance.",
  },
  {
    question: "How does SeaNeB Realty support rental transparency?",
    answer:
      "Rental discovery is designed around clear listing details, locality context, and practical checks to help renters make better-informed decisions.",
  },
  {
    question: "Why is hyperlocal search important in India?",
    answer:
      "Real estate value and livability vary sharply by locality. Hyperlocal search improves accuracy by matching decisions to real neighborhood conditions.",
  },
];

export const metadata = {
  title: "SeaNeB Realty | Trusted Property Search in India",
  description:
    "Find verified properties in India with hyperlocal insights, transparent rentals, safer buying, and faster selling on SeaNeB Realty.",
  keywords: [
    "buy property in India",
    "verified property listings",
    "rent home in India",
    "transparent rental listings",
    "new projects in India",
    "property investment India",
    "sell property online India",
    "post property free",
  ],
  alternates: {
    canonical: getSiteUrl("/"),
  },
  openGraph: {
    title: "SeaNeB Realty | Trusted Property Search in India",
    description:
      "Discover verified listings, hyperlocal property intelligence, and trust-focused workflows for buyers, sellers, and renters in India.",
    type: "website",
    url: getSiteUrl("/"),
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

  let countriesToShow = [];

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

  const primaryCountry = countriesToShow[0] || null;
  const primaryCountryName = String(primaryCountry?.name || "India").trim() || "India";
  const primaryCountryCode = String(primaryCountry?.code || "").trim().toLowerCase();
  const primaryCountryHref = primaryCountryCode && primaryCountryCode !== "in"
    ? `/in/${primaryCountryCode}`
    : "/in";
  const appleStoreHref = String(data?.downloadAppSection?.appStoreHref || "https://apps.apple.com").trim();
  const androidStoreHref = String(data?.downloadAppSection?.playStoreHref || "https://play.google.com").trim();
  const indiaFromDb =
    (Array.isArray(countriesToShow)
      ? countriesToShow.find((country) => {
          const code = String(country?.code || "").trim().toLowerCase();
          const name = String(country?.name || "").trim().toLowerCase();
          return code === "in" || name === "india";
        })
      : null) || null;
  const indiaFlag = String(indiaFromDb?.flag || "").trim();
  const indiaName = String(indiaFromDb?.name || "").trim();
  const appPhonePreviewSrc = "/images/phone.png";

  return (
    <MarketingPageShell>
      <section id="search" className="relative min-h-[640px] scroll-mt-24 overflow-hidden text-white">
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
              SeaNeB Realty helps Indian users buy, rent, invest, and sell with transparent listings, hyperlocal discovery, and verification-aware workflows.
            </p>
            <ul className="mx-auto mt-5 grid max-w-3xl grid-cols-1 gap-2 text-left sm:grid-cols-3">
              {HERO_VALUE_POINTS.map((point) => (
                <li key={point} className="rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-xs text-slate-100">
                  {point}
                </li>
              ))}
            </ul>

            <div className="mx-auto mt-8 w-full max-w-[980px] rounded-[30px] border border-white/35 bg-white/12 p-3 shadow-2xl backdrop-blur-md sm:p-4">
              <PropertySearchWidget searchSection={data.searchSection} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f8f8] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">What SeaNeB Realty Does</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#708090] sm:text-base">
              SeaNeB Realty is an Indian real estate platform designed for trust and decision quality. We connect verified discovery workflows with city-wise and locality-wise relevance so users can act with clarity.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            {CORE_AUDIENCE_SEGMENTS.map((segment) => (
              <article key={segment.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900">{segment.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#708090]">{segment.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f8f8] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {indiaFromDb ? (
            <div className="-mt-10 mb-12 flex justify-center">
              <Link
                href="/in"
                className="inline-flex items-center gap-3 rounded-full border border-[#d8bd8b] bg-[#fff8ec] px-6 py-2.5 text-base font-semibold text-[#6d5220] shadow-sm transition hover:bg-[#f8edd8]"
              >
                {indiaFlag ? (
                  <Image
                    src={indiaFlag}
                    alt={`${indiaName} flag`}
                    width={24}
                    height={18}
                    className="h-[18px] w-[24px] rounded-[2px] object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="h-2.5 w-2.5 rounded-full bg-[#c79a2b]" aria-hidden="true" />
                )}
                <span>{indiaName}</span>
              </Link>
            </div>
          ) : (
            <div className="-mt-10 mb-12 text-center">
              <p className="text-sm font-semibold text-[#8a6a2f]">
                No country currently available
              </p>
            </div>
          )}

          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold text-slate-900">Browse by Property Type</h2>
            <p className="mt-2 text-sm text-[#708090]">
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
                  className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eaf0f9] text-sm shadow-sm"
                >
                  <Image
                    src={card.iconSrc}
                    alt={`${card.name} icon`}
                    width={22}
                    height={22}
                    className="h-5 w-5 object-contain"
                  />
                </span>
                <h3 className="text-base font-bold text-slate-900">{card.name}</h3>
                <p className="mt-1 text-xs font-medium text-[#708090]">{card.info}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f3f4f6] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Property Journey Sections</h2>
            <p className="mt-3 text-sm text-[#708090] sm:text-base">
              Content and flows are built around high-intent real estate use cases in India.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {PROPERTY_JOURNEY_SECTIONS.map((section) => (
              <article key={section.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">{section.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#708090]">{section.explanation}</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-700">
                  {section.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f8f8] py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Trust and Authority</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#708090]">
              SeaNeB Realty positions credibility as a process. Platform quality is shaped by verification standards, fraud awareness, and transparent listing behavior.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>Verification-aware listing standards</li>
              <li>Fraud risk awareness in key decision stages</li>
              <li>Content reporting pathway for suspicious entries</li>
              <li>Ecosystem model connecting users, sellers, and contributors</li>
            </ul>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">How It Works</h2>
            <div className="mt-4 grid grid-cols-1 gap-4">
              <div>
                <h3 className="text-base font-semibold text-slate-900">For Buyers</h3>
                <ol className="mt-2 space-y-1 text-sm text-[#708090]">
                  {HOW_IT_WORKS.buyers.map((step) => <li key={step}>{step}</li>)}
                </ol>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">For Sellers</h3>
                <ol className="mt-2 space-y-1 text-sm text-[#708090]">
                  {HOW_IT_WORKS.sellers.map((step) => <li key={step}>{step}</li>)}
                </ol>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">For Renters</h3>
                <ol className="mt-2 space-y-1 text-sm text-[#708090]">
                  {HOW_IT_WORKS.renters.map((step) => <li key={step}>{step}</li>)}
                </ol>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-[#f8f8f8] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl">Hyperlocal Advantage</h2>
              <p className="mt-2 max-w-3xl text-sm text-[#708090]">
                SeaNeB Realty prioritizes city-wise and locality-wise discovery because Indian real estate decisions are always local. Use market intelligence from areas that matter to your budget and goals.
              </p>
            </div>
            <Link href={primaryCountryHref} className="hidden text-sm font-semibold text-slate-700 hover:text-slate-900 sm:inline-flex">
              {`Explore ${primaryCountryName} localities ->`}
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-[#d7bc7a] bg-[#f4ecd8] p-5">
              <h3 className="text-base font-semibold text-slate-900">City and locality intelligence</h3>
              <p className="mt-2 text-sm text-[#708090]">
                Track market behavior at neighborhood level instead of relying only on city-wide averages.
              </p>
            </article>
            <article className="rounded-2xl border border-[#d7bc7a] bg-[#f4ecd8] p-5">
              <h3 className="text-base font-semibold text-slate-900">Location-first shortlisting</h3>
              <p className="mt-2 text-sm text-[#708090]">
                Focus on commute, area quality, and relevant listings for faster and more accurate decisions.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f4f6] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Popular Property Searches in India</h2>
          <p className="mt-3 text-sm text-[#708090] sm:text-base">
            Discover trending city-wise searches for buying, renting, and investing in verified properties across India.
          </p>
          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SEO_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-amber-300 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f8f8] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Frequently Asked Questions</h2>
            <Link
              href="/faq"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-500"
            >
              View all FAQs
            </Link>
          </div>
          <div className="mt-7 space-y-4">
            {FAQS.map((item) => (
              <article key={item.question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#708090]">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="download" className="scroll-mt-24 bg-[#f8f8f8] py-16">
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
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={appleStoreHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/18"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                      <path d="M16.33 12.12c.02 2.12 1.86 2.83 1.88 2.84-.02.05-.29.98-.96 1.94-.58.82-1.18 1.64-2.13 1.65-.93.02-1.23-.55-2.3-.55-1.08 0-1.4.53-2.27.57-.91.03-1.61-.91-2.2-1.73-1.2-1.73-2.12-4.88-.89-7.01.61-1.06 1.69-1.73 2.86-1.75.9-.02 1.74.6 2.3.6.56 0 1.61-.75 2.72-.64.47.02 1.79.19 2.64 1.45-.07.04-1.58.92-1.56 2.63Zm-2.24-5.16c.49-.59.82-1.42.73-2.24-.71.03-1.58.47-2.09 1.06-.46.53-.86 1.37-.75 2.18.79.06 1.61-.4 2.11-1Z" />
                    </svg>
                    Apple
                  </a>
                  <a
                    href={androidStoreHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/18"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                      <path d="M17.58 9.03 19.2 6.2a.75.75 0 1 0-1.3-.75l-1.66 2.87A9.8 9.8 0 0 0 12 7.38a9.8 9.8 0 0 0-4.25.94L6.1 5.45a.75.75 0 1 0-1.3.75l1.62 2.83A8.02 8.02 0 0 0 4 15.02c0 .54.44.98.98.98h14.05c.54 0 .97-.44.97-.98a8.02 8.02 0 0 0-2.42-5.99ZM8.96 12.7a.88.88 0 1 1 0-1.76.88.88 0 0 1 0 1.76Zm6.08 0a.88.88 0 1 1 0-1.76.88.88 0 0 1 0 1.76ZM7.2 17.25v3a.75.75 0 1 1-1.5 0v-3a.75.75 0 1 1 1.5 0Zm11.1 0v3a.75.75 0 1 1-1.5 0v-3a.75.75 0 1 1 1.5 0Z" />
                    </svg>
                    Android
                  </a>
                </div>
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

              <div className="relative mx-auto w-[230px] rotate-[8deg] sm:w-[250px]">
                <Image
                  src={appPhonePreviewSrc}
                  alt="SeaNeB app listing screen preview"
                  width={720}
                  height={1280}
                  className="h-auto w-full object-contain drop-shadow-[0_24px_38px_rgba(0,0,0,0.45)]"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#c8a14a] py-20 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">Take the Next Property Step with Confidence</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-amber-50/90">
            SeaNeB Realty is built for transparent discovery, verification-aware workflows, and locality-first decisions across Indian real estate.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/in"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-md transition hover:bg-slate-100"
            >
              Search Properties
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full border border-white/70 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Post Your Property
            </Link>
          </div>
        </div>
      </section>
    </MarketingPageShell>
  );
}


