import MarketingPageShell from "@/components/marketing/shared/MarketingPageShell";
import SectionHeading from "@/components/marketing/shared/SectionHeading";
import ContactForm from "@/components/marketing/forms/ContactForm";
import { getContactPageData } from "@/lib/marketing/getMarketingPageData";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata = {
  title: "Contact SeaNeB | Support and Partnership Help",
  description: "Contact SeaNeB for product support, partner onboarding, and business inquiries.",
  openGraph: {
    title: "Contact SeaNeB | Support and Partnership Help",
    description: "Reach SeaNeB support, get onboarding help, and connect with our team.",
    type: "website",
    url: getSiteUrl("/contact"),
  },
};

export default async function ContactPage() {
  const data = await getContactPageData();

  return (
    <MarketingPageShell>
      <section className="bg-gradient-to-r from-amber-900 via-amber-800 to-orange-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">{data.hero.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{data.hero.title}</h1>
          <p className="mt-4 max-w-3xl text-sm text-indigo-100 sm:text-lg">{data.hero.description}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <ContactForm />

        <div className="space-y-6">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeading eyebrow="Map" title="Office Location" description="Google map placeholder for office navigation." />
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14736.248801680884!2d72.86721825599673!3d22.576776843166822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e514309e89803%3A0x7c377c890aec07e7!2sSeaNeB%20Technologies%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1772171146726!5m2!1sen!2sin"
                width="600"
                height="450"
                className="h-56 w-full md:h-72"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SeaNeB Technologies Office Location"
              />
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeading eyebrow="Office" title="Office Details" />
            <p className="mt-3 text-sm text-[#708090]">{data.office.address}</p>
            <p className="mt-2 text-sm text-[#708090]">{data.office.email}</p>
            <p className="mt-2 text-sm text-[#708090]">{data.office.phone}</p>
            <p className="mt-2 text-sm text-[#708090]">{data.office.hours}</p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="FAQ Preview" description="Answers to common support and onboarding questions." />
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          {data.faqPreview.map((item) => (
            <article key={item.question} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">{item.question}</h3>
              <p className="mt-2 text-sm text-[#708090]">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Support" title="Support Information" description="Choose the right support path for faster resolution." />
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          {data.support.map((item) => (
            <p key={item} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#708090] shadow-sm">
              {item}
            </p>
          ))}
        </div>
      </section>
    </MarketingPageShell>
  );
}
