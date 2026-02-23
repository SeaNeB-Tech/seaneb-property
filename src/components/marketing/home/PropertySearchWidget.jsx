"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function PropertySearchWidget({ searchSection }) {
  const router = useRouter();

  const tabs = useMemo(() => searchSection?.tabs || [], [searchSection]);
  const tabConfig = useMemo(() => searchSection?.tabConfig || {}, [searchSection]);
  const firstTabKey = tabs[0]?.key || "buy";
  const [activeTab, setActiveTab] = useState(firstTabKey);

  const activeConfig = useMemo(() => tabConfig[activeTab] || {}, [tabConfig, activeTab]);
  const modeOptions = useMemo(() => activeConfig.modeOptions || ["Buy", "Rent"], [activeConfig]);
  const typeOptions = useMemo(() => activeConfig.typeOptions || ["Apartment", "House"], [activeConfig]);
  const budgetOptions = useMemo(() => activeConfig.quickFilters || ["Budget"], [activeConfig]);
  const placeholder = useMemo(
    () =>
      String(activeConfig.placeholder || "").trim().length > 2
        ? activeConfig.placeholder
        : "Search by city, area or landmark",
    [activeConfig]
  );

  const [keyword, setKeyword] = useState("");
  const [mode, setMode] = useState(modeOptions[0] || "Buy");
  const [propertyType, setPropertyType] = useState(typeOptions[0] || "Apartment");
  const [budget, setBudget] = useState(budgetOptions[0] || "Budget");
  const [error, setError] = useState("");

  const runSearch = () => {
    const query = String(keyword || "").trim();
    if (query.length < 2) {
      setError("Select filters and search by city, area or landmark.");
      return;
    }

    const params = new URLSearchParams();
    params.set("q", query);
    params.set("tab", activeTab);
    params.set("mode", mode);
    params.set("type", propertyType);
    params.set("budget", budget);
    router.push(`/in?${params.toString()}`);
  };

  return (
    <div className="rounded-[24px] border border-white/80 bg-white/95 p-4 shadow-[0_22px_44px_rgba(15,10,6,0.28)] backdrop-blur-sm sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="rounded-full bg-[#f5ebd2] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#7b5a18]">
          Smart Search
        </p>
        <div className="flex flex-wrap gap-1.5">
          {tabs.slice(0, 4).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setActiveTab(tab.key);
                const nextConfig = tabConfig[tab.key] || {};
                setMode(nextConfig.modeOptions?.[0] || "Buy");
                setPropertyType(nextConfig.typeOptions?.[0] || "Apartment");
                setBudget(nextConfig.quickFilters?.[0] || "Budget");
              }}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                activeTab === tab.key
                  ? "bg-[#bf932a] text-white"
                  : "bg-[#f7f2e4] text-[#6b4a09] hover:bg-[#efdfbf]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <h3 className="mt-2 text-[33px] font-extrabold leading-tight text-slate-900">Find your next property fast</h3>

      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto]">
        <input
          value={keyword}
          onChange={(event) => {
            setKeyword(event.target.value);
            if (error) setError("");
          }}
          placeholder={placeholder}
          className="h-11 rounded-xl border border-[#cfd7e5] bg-[#f4f8ff] px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-[#bf932a]"
        />
        <button
          type="button"
          onClick={runSearch}
          className="h-11 rounded-xl bg-[#bf932a] px-8 text-sm font-bold text-white transition hover:bg-[#9e6200]"
        >
          Search
        </button>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <select
          value={mode}
          onChange={(event) => setMode(event.target.value)}
          className="h-11 rounded-xl border border-[#d4dae4] bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-[#bf932a]"
        >
          {modeOptions.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select
          value={propertyType}
          onChange={(event) => setPropertyType(event.target.value)}
          className="h-11 rounded-xl border border-[#d4dae4] bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-[#bf932a]"
        >
          {typeOptions.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select
          value={budget}
          onChange={(event) => setBudget(event.target.value)}
          className="h-11 rounded-xl border border-[#d4dae4] bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-[#bf932a]"
        >
          {budgetOptions.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      {error ? <p className="mt-2 text-xs font-medium text-[#9e6200]">{error}</p> : null}
      {!error ? (
        <p className="mt-2 text-xs font-medium text-slate-500">
          Select filters and search by city, area or landmark.
        </p>
      ) : null}
    </div>
  );
}
