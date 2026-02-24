"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/ui/DashboardHeader";
import Sidebar from "@/components/ui/Sidebar";
import {
  DASHBOARD_MODE_BUSINESS,
  getDashboardMode,
  isBusinessRegistered,
} from "@/services/dashboardMode.service";

export default function AnalyticsPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isBusinessRegistered() || getDashboardMode() !== DASHBOARD_MODE_BUSINESS) {
      router.replace("/dashboard");
    }
  }, [router]);

  return (
    <>
      <DashboardHeader />
      <div className="flex min-h-[calc(100vh-4rem)] bg-gray-50">
        <Sidebar />
        <main className="flex-1 w-full lg:ml-64">
          <div className="p-6 md:p-8 lg:p-8">
            <div className="mx-auto max-w-7xl rounded-xl border border-slate-200 bg-white p-8 text-center">
              <p className="text-sm text-black/80">Features coming soon only.</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
