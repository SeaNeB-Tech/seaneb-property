"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

/**
 * Fully data-driven search module with an alternate visual design.
 * Functionality remains unchanged: tabs, dynamic options, filters drawer.
 * Optimized for performance with useMemo and smoother transitions.
 */
export default function PropertySearchWidget({ searchSection }) {
  const router = useRouter();

  // Memoize props to prevent unnecessary recalculations
  const tabs = useMemo(() => searchSection?.tabs || [], [searchSection]);
  const tabConfig = useMemo(() => searchSection?.tabConfig || {}, [searchSection]);
  const recentSearches = useMemo(() => searchSection?.recentSearches || ["View all searches"], [searchSection]);

  const firstTabKey = tabs[0]?.key || "buy";
  const [activeTab, setActiveTab] = useState(firstTabKey);

  // Memoize active configuration based on activeTab
  const activeConfig = useMemo(() => tabConfig[activeTab] || {}, [tabConfig, activeTab]);

  const modeOptions = useMemo(() => activeConfig.modeOptions || ["Buy", "Rent", "Lease"], [activeConfig]);
  const typeOptions = useMemo(() => activeConfig.typeOptions || ["All Properties"], [activeConfig]);
  const categoryOptions = useMemo(() => activeConfig.categoryOptions || [], [activeConfig]);

  const placeholder = useMemo(() =>
    String(activeConfig.placeholder || "").trim().length > 2
      ? activeConfig.placeholder
      : "Search by city, area, landmark, or project",
    [activeConfig]);

  const propertyTypes = useMemo(() => activeConfig.propertyTypes || [], [activeConfig]);
  const investmentOptions = useMemo(() => activeConfig.investmentOptions || [], [activeConfig]);
  const quickFilters = useMemo(() => activeConfig.quickFilters || ["Budget", "Area", "Posted By"], [activeConfig]);

  const tabTheme = useMemo(() => ({
    buy: { accent: "from-blue-600 to-cyan-600", chip: "border-blue-200 bg-blue-50 text-blue-700", focus: "focus:border-blue-500" },
    rent: { accent: "from-emerald-600 to-teal-600", chip: "border-emerald-200 bg-emerald-50 text-emerald-700", focus: "focus:border-emerald-500" },
    new_launch: { accent: "from-violet-600 to-fuchsia-600", chip: "border-violet-200 bg-violet-50 text-violet-700", focus: "focus:border-violet-500" },
    commercial: { accent: "from-amber-600 to-orange-600", chip: "border-amber-200 bg-amber-50 text-amber-700", focus: "focus:border-amber-500" },
    plots_land: { accent: "from-cyan-600 to-sky-600", chip: "border-cyan-200 bg-cyan-50 text-cyan-700", focus: "focus:border-cyan-500" },
    projects: { accent: "from-indigo-600 to-blue-600", chip: "border-indigo-200 bg-indigo-50 text-indigo-700", focus: "focus:border-indigo-500" },
    post_property: { accent: "from-rose-600 to-pink-600", chip: "border-rose-200 bg-rose-50 text-rose-700", focus: "focus:border-rose-500" },
  }), []);

  const currentTheme = tabTheme[activeTab] || tabTheme.buy;

  const [mode, setMode] = useState(modeOptions[0] || "");
  const [keyword, setKeyword] = useState("");
  const [propertyType, setPropertyType] = useState(typeOptions[0] || "");
  const [showFilters, setShowFilters] = useState(false);
  const [searchError, setSearchError] = useState("");

  function handleTabChange(nextTab) {
    if (activeTab === nextTab) return;
    setActiveTab(nextTab);
    const nextConfig = tabConfig[nextTab] || {};
    setMode(nextConfig.modeOptions?.[0] || "");
    setPropertyType(nextConfig.typeOptions?.[0] || "");
    // Keep filters open if user is exploring, or close? Let's keep interaction smooth by not auto-closing if they are just switching tabs
    setSearchError("");
  }

  function runSearch(rawKeyword) {
    const query = String(rawKeyword || "").trim();
    if (query.length < 2) {
      setSearchError("Enter at least 2 characters to search.");
      return;
    }

    const params = new URLSearchParams();
    params.set("q", query);
    if (activeTab) params.set("tab", activeTab);
    if (mode) params.set("mode", mode);
    if (propertyType) params.set("type", propertyType);

    setSearchError("");
    router.push(`/in?${params.toString()}`);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    runSearch(keyword);
  }

  const inputClass = `h-10 rounded-lg border border-slate-700/50 bg-slate-900/50 px-3 text-xs font-medium text-slate-100 outline-none transition-all duration-300 ${currentTheme.focus} focus:ring-1 focus:ring-offset-0 focus:ring-opacity-50 placeholder:text-slate-500 hover:bg-slate-900/80`;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800/60 bg-black shadow-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-cyan-900/10 hover:border-slate-700/80 max-w-2xl mx-auto">
      <div className={`bg-gradient-to-r ${currentTheme.accent} p-[1px] transition-all duration-500`}>
        <div className="rounded-[23px] bg-black px-3 py-2 sm:px-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-100/70 transition-colors duration-300">Property Search</p>
            <button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className={`rounded-full border px-3 py-1 text-[10px] font-semibold transition-all duration-300 ${showFilters ? currentTheme.chip : "border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-600 hover:text-white"
                }`}
            >
              {showFilters ? "Close" : "Filters"}
            </button>
          </div>

          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleTabChange(tab.key)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${activeTab === tab.key
                    ? `bg-gradient-to-r ${currentTheme.accent} text-white shadow-md shadow-black/20`
                    : "border border-slate-800 bg-slate-900/40 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }`}
              >
                <span>{tab.label}</span>
                {tab.badge ? (
                  <span className="ml-1.5 rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] font-bold text-white backdrop-blur-sm">{tab.badge}</span>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-black/40 px-3 py-4 sm:px-5">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 gap-2 md:grid-cols-[110px_130px_1fr_auto]">
          <div className="relative group">
            <select value={mode} onChange={(event) => setMode(event.target.value)} className={`${inputClass} w-full appearance-none cursor-pointer`}>
              {modeOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-slate-300 transition-colors">
              <svg width="8" height="5" viewBox="0 0 10 6" fill="currentColor"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>

          <div className="relative group">
            <select value={propertyType} onChange={(event) => setPropertyType(event.target.value)} className={`${inputClass} w-full appearance-none cursor-pointer`}>
              {typeOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-slate-300 transition-colors">
              <svg width="8" height="5" viewBox="0 0 10 6" fill="currentColor"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>

          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors duration-300 peer-focus:text-cyan-400">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21 21L16.65 16.65M18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <input
              value={keyword}
              onChange={(event) => {
                setKeyword(event.target.value);
                if (searchError) setSearchError("");
              }}
              placeholder={placeholder}
              className={`${inputClass} w-full pl-9 peer text-xs`}
            />
          </div>

          <button type="submit" className={`h-10 rounded-lg bg-gradient-to-r ${currentTheme.accent} px-5 text-xs font-bold text-white shadow-lg transition-all duration-300 hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98]`}>
            Search
          </button>
        </form>

        {searchError ? <p className="mt-2 ml-1 text-[10px] font-medium text-rose-400 animate-pulse">{searchError}</p> : null}

        {categoryOptions.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {categoryOptions.map((category, idx) => (
              <button
                key={category}
                type="button"
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-all duration-300 ${idx === 0 ? currentTheme.chip : "border border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-600">Recent:</span>
          {recentSearches.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => runSearch(item)}
              className="group flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/30 px-2.5 py-0.5 text-[10px] font-medium text-slate-400 transition-all duration-300 hover:border-slate-600 hover:bg-slate-800 hover:text-slate-200"
            >
              <span>{item}</span>
              <span className="opacity-0 -ml-1 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0">→</span>
            </button>
          ))}
        </div>
      </div>

      <div className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${showFilters ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="border-t border-slate-800/50 bg-slate-950/50 p-5 sm:p-6 backdrop-blur-sm">
          <div className="mb-5 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
              Smart Filters
            </h4>
            <button type="button" className="text-xs font-medium text-slate-500 transition-colors hover:text-rose-400">
              Reset all
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 transition-colors hover:border-slate-700">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Property Types</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {propertyTypes.map((item) => (
                  <label key={item} className="group inline-flex items-center gap-3 text-sm text-slate-400 cursor-pointer">
                    <div className="relative flex items-center">
                      <input type="checkbox" className="peer h-4 w-4 appearance-none rounded border border-slate-600 bg-slate-800 transition-all checked:border-cyan-500 checked:bg-cyan-500" />
                      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 transition-opacity peer-checked:opacity-100" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span className="transition-colors group-hover:text-slate-200">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 transition-colors hover:border-slate-700">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Investment</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {investmentOptions.map((item) => (
                  <label key={item} className="group inline-flex items-center gap-3 text-sm text-slate-400 cursor-pointer">
                    <div className="relative flex items-center">
                      <input type="checkbox" className="peer h-4 w-4 appearance-none rounded border border-slate-600 bg-slate-800 transition-all checked:border-cyan-500 checked:bg-cyan-500" />
                      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 transition-opacity peer-checked:opacity-100" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span className="transition-colors group-hover:text-slate-200">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 transition-colors hover:border-slate-700">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Range & Budget</p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {quickFilters.map((item) => (
                <div key={item} className="relative group">
                  <select className={`${inputClass} w-full appearance-none cursor-pointer text-xs`} defaultValue={item}>
                    <option>{item}</option>
                    <option>Any {item}</option>
                    <option>Popular {item}</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-slate-300 transition-colors">
                    <svg width="8" height="5" viewBox="0 0 10 6" fill="currentColor"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={() => setShowFilters(false)} className="rounded-xl px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors">
              Cancel
            </button>
            <button type="button" className={`rounded-xl bg-gradient-to-r ${currentTheme.accent} px-6 py-2.5 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95`}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
