import Link from "next/link";
import MarketingPageShell from "@/components/marketing/shared/MarketingPageShell";
import { getSiteUrl } from "@/lib/siteUrl";

const FAQ_ITEMS = [
  {
    question: "What is SeaNeB Realty?",
    answer:
      "SeaNeB Realty is a hyperlocal real estate platform in India where users can buy, sell, rent, and explore verified property listings along with local real estate updates.",
  },
  {
    question: "Is SeaNeB Realty trustworthy?",
    answer:
      "SeaNeB Realty focuses on verified listings, RERA awareness, legal documentation guidance, and transparent communication between buyers and sellers to ensure trust.",
  },
  {
    question: "How does SeaNeB Realty work?",
    answer:
      "Users can search properties by city and locality, connect directly with owners or agents, and post their property listings. The platform also provides local real estate insights.",
  },
  {
    question: "Is it safe to buy property online in India?",
    answer:
      "Yes, buying property online is safe if you verify ownership documents, check RERA registration, review legal clearances, and avoid cash-only deals.",
  },
  {
    question: "How to check genuine property listings?",
    answer:
      "You should verify RERA registration, check title deed, confirm ownership documents, visit the property physically, and cross-check property tax receipts.",
    points: [
      "Verify RERA registration",
      "Check title deed",
      "Confirm ownership documents",
      "Visit the property physically",
      "Cross-check property tax receipts",
    ],
  },
  {
    question: "What documents are required to buy property in India?",
    answer:
      "Important documents include sale deed, title deed, encumbrance certificate, RERA registration, property tax receipts, and approved building plan.",
    points: [
      "Sale deed",
      "Title deed",
      "Encumbrance certificate",
      "RERA registration",
      "Property tax receipts",
      "Approved building plan",
    ],
  },
  {
    question: "How to avoid property fraud in India?",
    answer:
      "Avoid fraud by verifying ownership, checking legal approvals, avoiding advance payments without agreement, and consulting legal experts when needed.",
    points: [
      "Verify ownership",
      "Check legal approvals",
      "Avoid advance payments without agreement",
      "Consult legal experts when needed",
    ],
  },
  {
    question: "How much down payment is needed to buy a house?",
    answer:
      "Typically, banks finance 75 to 90 percent of property value. Buyers usually pay 10 to 25 percent as down payment depending on eligibility.",
  },
  {
    question: "What is a RERA approved project?",
    answer:
      "A RERA approved project is registered under the Real Estate Regulatory Authority, ensuring transparency and legal compliance.",
  },
  {
    question: "How can I sell property fast in India?",
    answer:
      "To sell property faster, price it correctly, use verified platforms, provide clear documentation, upload quality photos, and target local buyers.",
    points: [
      "Price it correctly",
      "Use verified platforms",
      "Provide clear documentation",
      "Upload quality photos",
      "Target local buyers",
    ],
  },
  {
    question: "Where can I post property online for free?",
    answer:
      "You can post your property on SeaNeB Realty and connect directly with genuine buyers.",
  },
  {
    question: "Is commercial real estate a good investment?",
    answer:
      "Commercial real estate can offer higher rental yield compared to residential property but may involve higher investment and market risks.",
  },
  {
    question: "How to verify land ownership in India?",
    answer:
      "You can verify land ownership by checking title deed, encumbrance certificate, local land records, and property tax receipts.",
    points: [
      "Title deed",
      "Encumbrance certificate",
      "Local land records",
      "Property tax receipts",
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export const metadata = {
  title: "SeaNeB Realty FAQs | Property Buying, Selling & Rental Questions",
  description:
    "Find answers to common real estate questions about buying, selling, renting & property investment in India.",
  alternates: {
    canonical: getSiteUrl("/faq"),
  },
  openGraph: {
    title: "SeaNeB Realty FAQs | Property Buying, Selling & Rental Questions",
    description:
      "Find trusted answers for property buying, selling, renting, RERA checks, and investment decisions in India.",
    type: "website",
    url: getSiteUrl("/faq"),
  },
};

export default function FaqPage() {
  return (
    <MarketingPageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="bg-gradient-to-r from-amber-900 via-amber-800 to-orange-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">Help Center</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">FAQs</h1>
          <p className="mt-4 max-w-3xl text-sm text-amber-100 sm:text-lg">
            Clear answers to common questions about buying, selling, renting, and investing in Indian real estate.
          </p>
          <Link
            href="/home"
            className="mt-6 inline-flex rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Back to Home
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => (
            <article key={item.question} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">{idx + 1}. {item.question}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#708090]">{item.answer}</p>
              {item.points?.length ? (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/home#search"
            className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Search Properties
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-slate-500"
          >
            Post Property
          </Link>
        </div>
      </section>
    </MarketingPageShell>
  );
}
