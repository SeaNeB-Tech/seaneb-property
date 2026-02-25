import MarketingPageShell from "@/components/marketing/shared/MarketingPageShell";
import Image from "next/image";
import SectionHeading from "@/components/marketing/shared/SectionHeading";
import StatsGrid from "@/components/marketing/shared/StatsGrid";
import CTASection from "@/components/marketing/shared/CTASection";
import { getAboutPageData } from "@/lib/marketing/getMarketingPageData";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata = {
  title: "About SeaNeB | Mission, Vision, and Trust",
  description: "Learn SeaNeB's mission, vision, verification model, and how we help users discover verified real estate opportunities.",
  openGraph: {
    title: "About SeaNeB | Mission, Vision, and Trust",
    description: "See how SeaNeB works from search to close with real-estate-first workflows.",
    type: "website",
    url: getSiteUrl("/about"),
  },
};

export default async function AboutPage() {
  const data = await getAboutPageData();
  const heroImage = data?.hero?.image || "/about-images/about-image-3.jpg";
  const heroImageAlt = data?.hero?.imageAlt || "SeaNeB real estate showcase";
  const storyImage = data?.media?.storyImage || "/about-images/about-image-6.jpg";
  const storyImageAlt = data?.media?.storyImageAlt || "SeaNeB team collaboration";
  const trustImage = data?.media?.trustImage || "/about-images/about-image-2.jpg";
  const trustImageAlt = data?.media?.trustImageAlt || "Trusted property review process";
  const discoveryImage = data?.media?.discoveryImage || "/about-images/about-image-4.jpg";
  const discoveryImageAlt = data?.media?.discoveryImageAlt || "Property discovery experience";
  const marketImage = data?.media?.marketImage || "/about-images/about-image-5.jpg";
  const marketImageAlt = data?.media?.marketImageAlt || "Local market trend highlights";

  return (
    <MarketingPageShell>
      <section className="bg-gradient-to-r from-amber-900 via-amber-800 to-orange-700 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-200">{data.hero.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{data.hero.title}</h1>
            <p className="mt-4 max-w-3xl text-sm text-rose-100 sm:text-lg">{data.hero.description}</p>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
            <div className="relative h-[260px] w-full sm:h-[320px]">
              <Image
                src={heroImage}
                alt={heroImageAlt}
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <p className="absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-slate-900">
              Verified. Local. Actionable.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
        <article className="rounded-2xl border border-rose-200 bg-white p-6 shadow-sm">
          <SectionHeading eyebrow="Mission" title="Our Mission" description={data.mission} />
        </article>
        <article className="rounded-2xl border border-rose-200 bg-white p-6 shadow-sm">
          <SectionHeading eyebrow="Vision" title="Our Vision" description={data.vision} />
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Workflow"
          title="How SeaNeB Works"
          description="A simple real-estate flow: Search, Connect, and Close."
        />
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {data.workflow.map((item, idx) => (
            <article key={item.step} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">Step {idx + 1}</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.step}</h3>
              <p className="mt-2 text-sm text-[#708090]">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Verification"
              title="How We Build Trust"
              description="Verification is embedded into listing quality and partner reliability."
            />
            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-1">
              {data.verification.map((item) => (
                <p key={item} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#708090] shadow-sm">
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <Image
                src={storyImage}
                alt={storyImageAlt}
                width={1200}
                height={900}
                className="h-36 w-full object-cover"
              />
              <p className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#708090]">Team and operations</p>
            </article>
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <Image
                src={trustImage}
                alt={trustImageAlt}
                width={1200}
                height={900}
                className="h-36 w-full object-cover"
              />
              <p className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#708090]">Quality and trust workflow</p>
            </article>
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <Image
                src={discoveryImage}
                alt={discoveryImageAlt}
                width={1200}
                height={900}
                className="h-36 w-full object-cover"
              />
              <p className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#708090]">Property discovery</p>
            </article>
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <Image
                src={marketImage}
                alt={marketImageAlt}
                width={1200}
                height={900}
                className="h-36 w-full object-cover"
              />
              <p className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#708090]">Market pulse</p>
            </article>
          </div>
        </div>
      </section>

      <StatsGrid stats={data.stats} />

      <section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Team"
          title="The Team Behind SeaNeB"
          description="Cross-functional teams focused on trust, quality, and growth."
        />
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {data.team.map((member) => (
            <article key={member.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
              <p className="mt-1 text-sm text-[#708090]">{member.role}</p>
              <p className="mt-3 text-sm text-[#708090]">{member.focus}</p>
            </article>
          ))}
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
