"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DEAL_TYPES = ["Buy", "Rent", "Invest"];
const PROPERTY_TYPES = ["Apartment", "Villa", "Commercial", "Plot"];
const BUDGET_CHIPS = ["Under 50L", "50L - 1Cr", "1Cr - 2Cr", "Luxury"];

export default function NextSearchExperience({ isDark = true }) {
  const router = useRouter();
  const [dealType, setDealType] = useState(DEAL_TYPES[0]);
  const [propertyType, setPropertyType] = useState(PROPERTY_TYPES[0]);
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    const query = location.trim();
    if (query.length < 2) {
      setError("Please enter at least 2 characters for location.");
      return;
    }

    const params = new URLSearchParams();
    params.set("q", query);
    params.set("deal_type", dealType.toLowerCase());
    params.set("property_type", propertyType.toLowerCase());
    if (budget.trim()) params.set("budget", budget.trim());

    setError("");
    router.push(`/in?${params.toString()}`);
  };

  const panelClass = isDark ? "border-slate-700 bg-slate-900" : "border-blue-200 bg-[#eff5ff]/95";
  const mutedTextClass = isDark ? "text-slate-400" : "text-slate-600";
  const inputClass = isDark
    ? "border-slate-700 bg-slate-900/80 text-slate-100 placeholder:text-slate-500"
    : "border-blue-200 bg-[#f6f9ff] text-slate-900 placeholder:text-slate-400";

  return (
    <div className="w-full space-y-3">
      <div className={`rounded-2xl border p-4 sm:p-5 ${panelClass}`}>
        <div className="mb-2.5 text-left">
          <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${mutedTextClass}`}>Smart Search</p>
          <h3 className={`mt-1 text-lg font-extrabold sm:text-xl ${isDark ? "text-white" : "text-slate-900"}`}>Find your next property fast</h3>
        </div>

        <form onSubmit={handleSearch} className="space-y-3">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_130px]">
            <input
              value={location}
              onChange={(event) => {
                setLocation(event.target.value);
                if (error) setError("");
              }}
              placeholder="Search by city, area or landmark"
              className={`h-10 min-w-0 rounded-lg border px-3 text-sm font-medium outline-none transition focus:border-blue-500 ${inputClass}`}
            />
            <button
              type="submit"
              className={`h-10 w-full min-w-0 rounded-lg px-5 text-sm font-bold transition ${isDark ? "bg-slate-100 text-slate-900 hover:bg-white" : "bg-blue-700 text-white hover:bg-blue-800"}`}
            >
              Search
            </button>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <select
              value={dealType}
              onChange={(event) => setDealType(event.target.value)}
              className={`h-10 min-w-0 rounded-lg border px-3 text-sm font-medium outline-none transition focus:border-blue-500 ${inputClass}`}
            >
              {DEAL_TYPES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={propertyType}
              onChange={(event) => setPropertyType(event.target.value)}
              className={`h-10 min-w-0 rounded-lg border px-3 text-sm font-medium outline-none transition focus:border-blue-500 ${inputClass}`}
            >
              {PROPERTY_TYPES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
              className={`h-10 min-w-0 rounded-lg border px-3 text-sm font-medium outline-none transition focus:border-blue-500 ${inputClass}`}
            >
              <option value="">Budget</option>
              {BUDGET_CHIPS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <p className={`text-left text-xs ${error ? "text-rose-400" : mutedTextClass}`}>
            {error || "Select filters and search by city, area or landmark."}
          </p>
        </form>
      </div>
    </div>
  );
}
