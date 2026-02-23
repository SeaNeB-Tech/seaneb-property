"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/ui/DashboardHeader";
import Sidebar from "@/components/ui/Sidebar";
import {
  DASHBOARD_MODE_BUSINESS,
  getDashboardMode,
  isBusinessRegistered,
  setDashboardMode,
} from "@/services/dashboardMode.service";

export default function BrokerDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isBusinessRegistered()) {
      router.replace("/partner");
      return;
    }
    if (getDashboardMode() !== DASHBOARD_MODE_BUSINESS) {
      setDashboardMode(DASHBOARD_MODE_BUSINESS);
    }
  }, [router]);

  return (
    <>
      <DashboardHeader />
      <div className="flex min-h-[calc(100vh-4rem)] bg-gray-50">
        <Sidebar />
        <main className="flex-1 w-full lg:ml-64">
          <div className="p-6 md:p-8 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
              <section className="rounded-xl border border-slate-200 bg-white p-6">
                <h1 className="text-2xl font-bold text-black">Business Dashboard</h1>
                <p className="mt-1 text-sm text-black/80">
                  Manage broker operations, listings, and leads in business mode.
                </p>
              </section>
              <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card title="Mode" value="Business" />
                <Card title="Listings" value="Use Listings tab" />
                <Card title="Analytics" value="Use Analytics tab" />
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

function Card({ title, value }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-black/65">{title}</p>
      <p className="mt-2 text-lg font-bold text-black">{value}</p>
    </article>
  );
}
