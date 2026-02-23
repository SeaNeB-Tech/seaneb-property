import { notFound } from "next/navigation";
import Link from "next/link";
import blogsData from "@/data/navpages/blogs.json";
import { getSiteUrl } from "@/lib/siteUrl";

const toSlug = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

function getAllPosts() {
  const posts = Array.isArray(blogsData?.posts) ? blogsData.posts : [];
  const popular = Array.isArray(blogsData?.popular) ? blogsData.popular : [];
  const bySlug = new Map();

  [...posts, ...popular].forEach((post) => {
    const slug = toSlug(post?.title);
    if (!slug || bySlug.has(slug)) return;
    bySlug.set(slug, { ...post, slug });
  });

  return Array.from(bySlug.values());
}

export async function generateMetadata({ params }) {
  const resolved = await params;
  const slug = String(resolved?.slug || "");
  const post = getAllPosts().find((item) => item.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | SeaNeB Blogs`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | SeaNeB Blogs`,
      description: post.excerpt,
      type: "article",
      url: getSiteUrl(`/blogs/${post.slug}`),
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const resolved = await params;
  const slug = String(resolved?.slug || "");
  const post = getAllPosts().find((item) => item.slug === slug);

  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-slate-50">
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Link href="/blogs" className="text-sm font-semibold text-blue-700 hover:text-blue-900">
          Back to Blogs
        </Link>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
          {post.category}
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">{post.title}</h1>
        <p className="mt-2 text-sm text-slate-500">{post.readTime}</p>
        <div className="mt-8 space-y-4 text-base leading-7 text-slate-700">
          <p>{post.excerpt}</p>
          <p>
            SeaNeB editorial is expanding detailed guides. This article currently shows a short
            summary preview while full long-form content is being published.
          </p>
        </div>
      </article>
    </main>
  );
}
