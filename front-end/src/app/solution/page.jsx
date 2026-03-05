import MarketingPageShell from "@/components/marketing/shared/MarketingPageShell";
import Image from "next/image";
import SectionHeading from "@/components/marketing/shared/SectionHeading";
import CTASection from "@/components/marketing/shared/CTASection";
import { getSolutionPageData } from "@/lib/marketing/getMarketingPageData";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata = {
  title: "SeaNeB Solutions | Smarter Real Estate Workflows",
  description: "Discover how SeaNeB solves traditional real estate problems with smart search, alerts, and verified listing workflows.",
  openGraph: {
    title: "SeaNeB Solutions | Smarter Real Estate Workflows",
    description: "Explore SeaNeB's feature stack for brokers, builders, agents, and seekers.",
    type: "website",
    url: getSiteUrl("/solution"),
  },
};

export default async function SolutionPage() {
  const data = await getSolutionPageData();
  const heroImage = "/images/solution.png";
  const heroImageAlt = data?.hero?.imageAlt || "SeaNeB solution workflow showcase";
  const problems = Array.isArray(data?.problems) ? data.problems : [];
  const solutions = Array.isArray(data?.solutions) ? data.solutions : [];
  const features = Array.isArray(data?.features) ? data.features : [];
  const workflow = Array.isArray(data?.workflow) ? data.workflow : [];
  const benefits = Array.isArray(data?.benefits) ? data.benefits : [];

  return (
    <MarketingPageShell>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-900 to-teal-900 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-8 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">{data.hero.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{data.hero.title}</h1>
            <p className="mt-4 max-w-3xl text-sm text-slate-200 sm:text-lg">{data.hero.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide backdrop-blur">
                Search Intelligence
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide backdrop-blur">
                Lead Automation
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide backdrop-blur">
                Verified Flow
              </span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[28px] border border-white/20 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
            <div className="relative h-[260px] w-full sm:h-[320px]">
              <Image src={heroImage} alt={heroImageAlt} fill priority className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <p className="absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-slate-900">
              Data. Workflow. Growth.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
        <article className="rounded-3xl border border-rose-200 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
          <SectionHeading eyebrow="Pain Points" title="Traditional Real Estate Problems" />
          <ul className="mt-4 space-y-2">
            {problems.map((item) => (
              <li key={item} className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-900">
                {item}
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
          <SectionHeading eyebrow="SeaNeB Approach" title="How SeaNeB Solves It" />
          <ul className="mt-4 space-y-2">
            {solutions.map((item) => (
              <li key={item} className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Core Features"
          title="Feature Highlights"
          description="Built for practical, high-intent property discovery and conversion."
        />
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_14px_32px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(15,23,42,0.09)]"
            >
              <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-[#708090]">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Workflow"
          title="App Workflow"
          description="A repeatable flow from listing to lead conversion."
        />
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {workflow.map((item, index) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(15,23,42,0.08)]"
            >
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                {index + 1}
              </span>
              <p className="text-sm text-[#708090]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Benefits"
          title="Business and User Benefits"
          description="SeaNeB improves speed, quality, and trust across the property lifecycle."
        />
        <div className="mt-5 rounded-[28px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-5 shadow-[0_20px_44px_rgba(15,23,42,0.16)] sm:p-6">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {benefits.map((item) => (
              <p key={item} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-slate-100 backdrop-blur">
                {item}
              </p>
            ))}
          </div>
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
