"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardHeader from "@/components/ui/DashboardHeader";
import Sidebar from "@/components/ui/Sidebar";
import { getProducts } from "@/services/products.service";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadProducts = async () => {
      try {
        setError("");
        const data = await getProducts();
        if (!active) return;

        if (Array.isArray(data) && data.length === 0) {
          // Empty list can be valid. Keep UI as-is.
          setProducts([]);
          return;
        }

        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!active) return;
        setError("Unable to load products right now.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <DashboardHeader />
      <div className="flex min-h-[calc(100vh-4rem)] bg-gray-50">
        <Sidebar />
        <main className="flex-1 w-full lg:ml-64">
          <div className="p-6 md:p-8 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
              <section className="rounded-xl border border-slate-200 bg-white p-6">
                <h1 className="text-2xl font-bold text-black">Dashboard</h1>
                <p className="mt-1 text-sm text-black/80">
                  Manage your account, product access, and dashboard modules from here.
                </p>
              </section>

              <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <StatCard title="Session" value="Active" subtitle="Authenticated on this device" />
                <StatCard
                  title="Products"
                  value={loading ? "..." : String(products.length)}
                  subtitle="Available from API"
                />
                <StatCard title="Profile" value="Ready" subtitle="Use top-right profile menu" />
              </section>

              <section className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-lg font-semibold text-black">Products From API</h2>
                  <Link
                    href="/dashboard/products"
                    className="rounded-lg border border-blue-600 bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Open Products
                  </Link>
                </div>

                {loading && <p className="mt-4 text-sm text-black/75">Loading products...</p>}
                {!loading && error && <p className="mt-4 text-sm text-rose-600">{error}</p>}
                {!loading && !error && products.length === 0 && (
                  <p className="mt-4 text-sm text-black/75">No products returned by API.</p>
                )}

                {!loading && !error && products.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product, index) => (
                      <article
                        key={String(product?.product_id || product?.id || product?.product_key || index)}
                        className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                      >
                        <p className="text-sm font-semibold text-black">
                          {product?.product_name || "Unnamed Product"}
                        </p>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

function StatCard({ title, value, subtitle }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-black/65">{title}</p>
      <p className="mt-2 text-2xl font-bold text-black">{value}</p>
      <p className="mt-1 text-xs text-black/75">{subtitle}</p>
    </article>
  );
}
