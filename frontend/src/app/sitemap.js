import blogsData from "@/data/navpages/blogs.json";
import { getSiteUrl } from "@/lib/siteUrl";

const toSlug = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

const getBlogSlugs = () => {
  const posts = Array.isArray(blogsData?.posts) ? blogsData.posts : [];
  const popular = Array.isArray(blogsData?.popular) ? blogsData.popular : [];
  const slugs = new Set();

  [...posts, ...popular].forEach((post) => {
    const slug = toSlug(post?.title);
    if (slug) slugs.add(slug);
  });

  return Array.from(slugs.values());
};

export default function sitemap() {
  const now = new Date();
  const publicRoutes = [
    "/",
    "/home",
    "/about",
    "/solution",
    "/partner",
    "/blogs",
    "/contact",
    "/privacy-policy",
    "/in",
  ];

  const staticEntries = publicRoutes.map((route) => ({
    url: getSiteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" || route === "/home" ? "daily" : "weekly",
    priority: route === "/" || route === "/home" ? 1 : 0.8,
  }));

  const blogEntries = getBlogSlugs().map((slug) => ({
    url: getSiteUrl(`/blogs/${slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
