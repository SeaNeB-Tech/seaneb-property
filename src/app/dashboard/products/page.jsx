"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/ui/DashboardHeader";
import Sidebar from "@/components/ui/Sidebar";
import { getProducts } from "@/services/products.service";
import { getAuthAppUrl } from "@/lib/authAppUrl";

export default function ProductsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setError("");
        const data = await getProducts();
        if (!active) return;
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        if (!active) return;
        setError("Failed to load products from API.");

        // Redirect to login only for auth failures, not for generic API/network errors.
        const status = Number(error?.response?.status || 0);
        if (typeof window !== "undefined" && (status === 401 || status === 403)) {
          const returnTo = encodeURIComponent(window.location.href);
          router.replace(getAuthAppUrl(`/auth/login?returnTo=${returnTo}`));
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [router]);

  return (
    <>
      <DashboardHeader />
      <div className="flex min-h-[calc(100vh-4rem)] bg-gray-50">
        <Sidebar />
        <main className="flex-1 w-full lg:ml-64">
          <div className="p-6 md:p-8 lg:p-8">
            <div className="mx-auto max-w-7xl rounded-xl border border-slate-200 bg-white p-6">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-black">Products</h1>
                  <p className="mt-1 text-sm text-black/80">
                    All available products from API.
                  </p>
                </div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-black/80">
                  {loading ? "Loading..." : `${products.length} items`}
                </span>
              </div>

              {loading && <p className="text-sm text-black/75">Loading products...</p>}
              {!loading && error && <p className="text-sm text-rose-600">{error}</p>}
              {!loading && !error && products.length === 0 && (
                <p className="text-sm text-black/75">No products found from API.</p>
              )}

              {!loading && !error && products.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-0 overflow-hidden rounded-lg border border-slate-200">
                    <thead>
                      <tr className="bg-slate-100 text-left text-xs uppercase tracking-wide text-black/70">
                        <th className="px-4 py-3">Product</th>
                        <th className="px-4 py-3">Product Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => (
                        <tr key={String(product?.product_id || product?.id || index)} className="border-t border-slate-200 bg-white text-sm text-black/85">
                          <td className="px-4 py-3">{product?.product_key || "-"}</td>
                          <td className="px-4 py-3">{product?.product_name || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
