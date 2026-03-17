import MarketingPageShell from "@/components/marketing/shared/MarketingPageShell";
import Image from "next/image";
import SectionHeading from "@/components/marketing/shared/SectionHeading";
import CTASection from "@/components/marketing/shared/CTASection";
import { getAboutPageData } from "@/lib/marketing/getMarketingPageData";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata = {
  title: "About SeaNeB Realty | Trusted Indian Property Platform",
  description:
    "Discover SeaNeB Realty, an Indian platform for verified listings, hyperlocal insights, and transparent property buying, selling, and renting.",
  openGraph: {
    title: "About SeaNeB Realty | Trusted Indian Property Platform",
    description:
      "Learn how SeaNeB Realty builds trust with verification-first listing standards and hyperlocal Indian real estate discovery.",
    type: "website",
    url: getSiteUrl("/about-us"),
  },
};

export default async function AboutPage() {
  const data = await getAboutPageData();
  const heroImage = "/images/about.png";
  const heroImageAlt = data?.hero?.imageAlt || "SeaNeB real estate showcase";
  const storyImage = data?.media?.storyImage || "/about-images/about-image-6.jpg";
  const storyImageAlt = data?.media?.storyImageAlt || "SeaNeB team collaboration";
  const trustImage = data?.media?.trustImage || "/about-images/about-image-2.jpg";
  const trustImageAlt = data?.media?.trustImageAlt || "Trusted property review process";
  const discoveryImage = data?.media?.discoveryImage || "/about-images/about-image-4.jpg";
  const discoveryImageAlt = data?.media?.discoveryImageAlt || "Property discovery experience";
  const marketImage = data?.media?.marketImage || "/about-images/about-image-5.jpg";
  const marketImageAlt = data?.media?.marketImageAlt || "Local market trend highlights";
  const verificationTiles = [
    { title: "TEAM AND OPERATIONS", image: storyImage, alt: storyImageAlt },
    { title: "QUALITY AND TRUST WORKFLOW", image: trustImage, alt: trustImageAlt },
    { title: "PROPERTY DISCOVERY", image: discoveryImage, alt: discoveryImageAlt },
    { title: "MARKET PULSE", image: marketImage, alt: marketImageAlt },
  ];
  const stats = Array.isArray(data?.stats) ? data.stats : [];
  const whoWeServe = Array.isArray(data?.whoWeServe) ? data.whoWeServe : [];
  const usps = Array.isArray(data?.usps) ? data.usps : [];
  const verification = Array.isArray(data?.verification) ? data.verification : [];

  return (
    <MarketingPageShell>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -right-24 bottom-4 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:px-8 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">{data.hero.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">{data.hero.title}</h1>
            <p className="mt-5 max-w-2xl text-sm text-slate-200 sm:text-lg">{data.hero.description}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-100 backdrop-blur">
                Verification First
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-100 backdrop-blur">
                Hyperlocal Insights
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-100 backdrop-blur">
                Trusted Discovery
              </span>
            </div>

            {!!stats.length && (
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {stats.slice(0, 3).map((item) => (
                  <article
                    key={`${item.label}-${item.value}`}
                    className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur"
                  >
                    <p className="text-xl font-bold text-white">{item.value}</p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-200">
                      {item.label}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[28px] border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.45)]">
              <div className="relative h-[280px] w-full sm:h-[360px]">
                <Image src={heroImage} alt={heroImageAlt} fill priority className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>

            <div className="absolute -bottom-5 left-4 rounded-2xl border border-white/15 bg-slate-900/80 px-4 py-3 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">Platform Promise</p>
              <p className="mt-1 text-sm font-semibold text-white">Verified. Local. Actionable.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 rounded-[28px] bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] lg:grid-cols-[1fr_0.92fr] lg:p-7">
          <article className="rounded-3xl bg-slate-50 p-6">
            <SectionHeading eyebrow="Brand Story" title="Why SeaNeB Realty Exists" description={data.story} />
          </article>
          <div className="relative h-64 overflow-hidden rounded-3xl sm:h-[320px]">
            <Image src={storyImage} alt={storyImageAlt} fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 py-3 sm:px-6 lg:grid-cols-2 lg:px-8">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_36px_rgba(15,23,42,0.06)]">
          <SectionHeading eyebrow="Mission" title="Our Mission" description={data.mission} />
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_36px_rgba(15,23,42,0.06)]">
          <SectionHeading eyebrow="Vision" title="Our Vision" description={data.vision} />
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Audience"
          title="Who We Serve"
          description="Built for core Indian real estate user groups, from first-time buyers to local market contributors."
        />
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {whoWeServe.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
            >
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-[#708090]">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="USPs"
          title="What Makes SeaNeB Realty Different"
          description="Clear operating differences designed for credibility, relevance, and decision quality."
        />
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {usps.map((item) => (
            <article
              key={item.heading}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
            >
              <h3 className="text-lg font-semibold text-slate-900">{item.heading}</h3>
              <p className="mt-2 text-sm text-[#708090]">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="min-w-0">
            <SectionHeading
              eyebrow="Verification"
              title="Trust and Verification Approach"
              description="Trust is built through standards, review logic, and transparent reporting controls."
            />
            <div className="mt-5 grid grid-cols-1 gap-3">
              {verification.map((item, idx) => (
                <article key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm">
                  <p className="text-sm leading-relaxed text-[#708090]">
                    <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-white">
                      {idx + 1}
                    </span>
                    {item}
                  </p>
                </article>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {verificationTiles.map((tile) => (
              <article
                key={tile.title}
                className="grid min-h-[180px] grid-cols-[minmax(0,156px)_minmax(140px,1fr)] items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <Image
                  src={tile.image}
                  alt={tile.alt}
                  width={220}
                  height={160}
                  className="h-32 w-full rounded-md object-cover"
                />
                <div className="min-w-[8.75rem]">
                  <h3 className="text-base font-semibold uppercase leading-[1.25] tracking-[0.02em] text-[#5f738b] [word-break:normal]">
                    {tile.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {!!stats.length && (
        <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="rounded-[28px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-6 shadow-[0_24px_50px_rgba(15,23,42,0.18)] sm:p-8">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {stats.map((item) => (
                <article key={`${item.label}-${item.value}`} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xl font-bold text-white sm:text-2xl">{item.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-200">
                    {item.label}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_36px_rgba(15,23,42,0.06)]">
            <SectionHeading
              eyebrow="Ecosystem"
              title="Community and Ecosystem Model"
              description={data.community}
            />
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_36px_rgba(15,23,42,0.06)]">
          <SectionHeading
            eyebrow="Commitment"
            title="Our Long-Term Commitment"
            description={data.commitment}
          />
          </article>
        </div>
      </section>

      <CTASection
        title={data.cta.title}
        description={data.cta.description}
        primary={data.cta.primary}
        secondary={data.cta.secondary}
      />
    </MarketingPageShell>
  );
}
