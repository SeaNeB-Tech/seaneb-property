import BusinessDetail from "@/components/pages/BusinessDetail";
import { getSiteUrl } from "@/lib/siteUrl";

export async function generateMetadata({ params }) {
  const resolved = await params;
  const slugValue = resolved?.slug;
  const normalizedSlug = Array.isArray(slugValue) ? slugValue.join("-") : String(slugValue || "");
  const title = normalizedSlug
    ? `${normalizedSlug.replace(/[-_]/g, " ")} - Business Details | SeaNeB`
    : "Business Details - SeaNeB";
  
  return {
    title,
    description: "View detailed business information, reviews, and services on SeaNeB.",
    keywords: "business details, real estate business, services, reviews",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: getSiteUrl(`/${normalizedSlug}`),
    },
    openGraph: {
      title,
      description: "View detailed business information on SeaNeB.",
      type: "website",
      url: getSiteUrl(`/${normalizedSlug}`),
    },
  };
}

export default async function RootSlugPage({ params }) {
  const resolved = await params;
  let slug = resolved?.slug;
  if (!slug) return null;
  if (Array.isArray(slug)) slug = slug.join("-");

  return <BusinessDetail businessSlug={slug} />;
}
