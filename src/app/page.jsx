import { getHomePageData } from "@/lib/marketing/getMarketingPageData";
import HomePage from "@/components/pages/HomePage";

export const metadata = {
  title: "SeaNeB | Find Your Perfect Property",
  description: "Search verified buy, rent, and commercial listings. Experience the future of real estate discovery.",
};

export default async function LandingPage() {
  const data = await getHomePageData();
  return <HomePage data={data} />;
}
