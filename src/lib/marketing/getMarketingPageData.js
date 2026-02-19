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

const HOME_CACHE_SECONDS = 300;

const getCachedHomePageData = unstable_cache(
  async () => fetchHomePageData(),
  ["marketing-home-page"],
  { revalidate: HOME_CACHE_SECONDS }
);

const getCachedAboutPageData = unstable_cache(
  async () => fetchAboutPageData(),
  ["marketing-about-page"],
  { revalidate: HOME_CACHE_SECONDS }
);

const getCachedSolutionPageData = unstable_cache(
  async () => fetchSolutionPageData(),
  ["marketing-solution-page"],
  { revalidate: HOME_CACHE_SECONDS }
);

const getCachedBlogsPageData = unstable_cache(
  async () => fetchBlogsPageData(),
  ["marketing-blogs-page"],
  { revalidate: HOME_CACHE_SECONDS }
);

const getCachedPartnerPageData = unstable_cache(
  async () => fetchPartnerPageData(),
  ["marketing-partner-page"],
  { revalidate: HOME_CACHE_SECONDS }
);

const getCachedContactPageData = unstable_cache(
  async () => fetchContactPageData(),
  ["marketing-contact-page"],
  { revalidate: HOME_CACHE_SECONDS }
);

/**
 * Fetches live API data and falls back to local mock JSON.
 */
export async function getHomePageData() {
  try {
    return await getCachedHomePageData();
  } catch {
    return homeMock;
  }
}

export async function getAboutPageData() {
  try {
    return await getCachedAboutPageData();
  } catch {
    return aboutMock;
  }
}

export async function getSolutionPageData() {
  try {
    return await getCachedSolutionPageData();
  } catch {
    return solutionMock;
  }
}

export async function getBlogsPageData() {
  try {
    return await getCachedBlogsPageData();
  } catch {
    return blogsMock;
  }
}

export async function getPartnerPageData() {
  try {
    return await getCachedPartnerPageData();
  } catch {
    return partnerMock;
  }
}

export async function getContactPageData() {
  try {
    return await getCachedContactPageData();
  } catch {
    return contactMock;
  }
}
