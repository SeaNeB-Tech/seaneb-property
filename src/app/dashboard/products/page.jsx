"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "@/components/ui/DashboardHeader";
import Sidebar from "@/components/ui/Sidebar";
import { getProducts } from "@/services/products.service";
import { ensureAccessToken } from "@/services/api";

export default function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      await ensureAccessToken();

      try {
        setError("");
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch {
        setError("Failed to load products from API.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

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
                  <h1 className="text-2xl font-bold text-slate-900">Products</h1>
                  <p className="mt-1 text-sm text-slate-600">
                    All available products from API.
                  </p>
                </div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                  {loading ? "Loading..." : `${products.length} items`}
                </span>
              </div>

              {loading && <p className="text-sm text-slate-600">Loading products...</p>}
              {!loading && error && <p className="text-sm text-rose-600">{error}</p>}
              {!loading && !error && products.length === 0 && (
                <p className="text-sm text-slate-600">No products found from API.</p>
              )}

              {!loading && !error && products.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-0 overflow-hidden rounded-lg border border-slate-200">
                    <thead>
                      <tr className="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-600">
                        <th className="px-4 py-3">Product ID</th>
                        <th className="px-4 py-3">Product Key</th>
                        <th className="px-4 py-3">Product Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => (
                        <tr key={String(product?.product_id || product?.id || index)} className="border-t border-slate-200 bg-white text-sm text-slate-800">
                          <td className="px-4 py-3">{product?.product_id || product?.id || "-"}</td>
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
