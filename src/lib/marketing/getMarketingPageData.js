import homeMock from "@/data/navpages/home.json";
import aboutMock from "@/data/navpages/about.json";
import solutionMock from "@/data/navpages/solution.json";
import blogsMock from "@/data/navpages/blogs.json";
import partnerMock from "@/data/navpages/partner.json";
import contactMock from "@/data/navpages/contact.json";
import { unstable_cache } from "next/cache";
import {
  fetchHomePageData,
  fetchAboutPageData,
  fetchSolutionPageData,
  fetchBlogsPageData,
  fetchPartnerPageData,
  fetchContactPageData,
} from "@/services/marketing.service";

const REVALIDATE_SECONDS = 300;

const createCachedLoader = (fetcher, cacheKey) =>
  unstable_cache(fetcher, [cacheKey], { revalidate: REVALIDATE_SECONDS });

const loadOrFallback = async (loader, fallback) => {
  try {
    return await loader();
  } catch {
    return fallback;
  }
};

const getCachedHomePageData = createCachedLoader(
  fetchHomePageData,
  "marketing-home-page"
);
const getCachedAboutPageData = createCachedLoader(
  fetchAboutPageData,
  "marketing-about-page"
);
const getCachedSolutionPageData = createCachedLoader(
  fetchSolutionPageData,
  "marketing-solution-page"
);
const getCachedBlogsPageData = createCachedLoader(
  fetchBlogsPageData,
  "marketing-blogs-page"
);
const getCachedPartnerPageData = createCachedLoader(
  fetchPartnerPageData,
  "marketing-partner-page"
);
const getCachedContactPageData = createCachedLoader(
  fetchContactPageData,
  "marketing-contact-page"
);

export async function getHomePageData() {
  return loadOrFallback(getCachedHomePageData, homeMock);
}

export async function getAboutPageData() {
  return loadOrFallback(getCachedAboutPageData, aboutMock);
}

export async function getSolutionPageData() {
  return loadOrFallback(getCachedSolutionPageData, solutionMock);
}

export async function getBlogsPageData() {
  return loadOrFallback(getCachedBlogsPageData, blogsMock);
}

export async function getPartnerPageData() {
  return loadOrFallback(getCachedPartnerPageData, partnerMock);
}

export async function getContactPageData() {
  return loadOrFallback(getCachedContactPageData, contactMock);
}
