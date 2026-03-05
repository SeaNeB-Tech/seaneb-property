import Image from "next/image";
import Link from "next/link";
import countries from "@/constants/countries.json";

const PROPERTY_CATEGORIES = [
  { icon: "/icons/apartment.svg", label: "Apartments", count: "2,400+ listings" },
  { icon: "/icons/house.svg", label: "Houses", count: "850+ listings" },
  { icon: "/icons/commercial.svg", label: "Commercial", count: "1,200+ listings" },
  { icon: "/icons/land.svg", label: "Land", count: "500+ listings" },
];

export default function PropertyCategoriesSection({ isDark }) {
  const india =
    (Array.isArray(countries)
      ? countries.find((country) => String(country?.name || "").trim().toLowerCase() === "india")
      : null) || null;
  const indiaName = String(india?.name || "India").trim() || "India";
  const indiaHref = String(india?.slug || "in").trim().toLowerCase() === "in" ? "/in" : "/in";
  const indiaFlag = String(india?.flag || "").trim();

  return (
    <section className={`py-20 sm:py-24 ${isDark ? "bg-[var(--home-download-bg-dark)]" : "bg-[var(--home-property-bg-light)]"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex justify-center">
          <Link
            href={indiaHref}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
              isDark
                ? "border-cyan-400/40 bg-slate-900 text-slate-100 hover:bg-slate-800"
                : "border-[#d8bd8b] bg-[#fff8ec] text-[#6d5220] hover:bg-[#f8edd8]"
            }`}
          >
            {indiaFlag ? (
              <Image
                src={indiaFlag}
                alt={`${indiaName} flag`}
                width={18}
                height={18}
                className="h-[14px] w-[18px] rounded-[2px] object-cover"
                unoptimized
              />
            ) : (
              <span className="h-2 w-2 rounded-full bg-[#c79a2b]" aria-hidden="true" />
            )}
            <span>{indiaName}</span>
          </Link>
        </div>

        <div className="mb-14 max-w-2xl text-center mx-auto">
          <h2 className={`text-3xl font-bold sm:text-4xl leading-tight ${isDark ? "text-white" : "text-[var(--home-property-title-light)]"}`}>
            Browse by Property Type
          </h2>
          <p className={`mt-4 text-lg ${isDark ? "text-slate-400" : "text-[var(--home-property-text-light)]"}`}>
            Choose the format that fits your buying goals from our verified listings.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8">
          {PROPERTY_CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              className={`group relative overflow-hidden rounded-3xl p-6 text-center transition-all duration-300 hover:-translate-y-2 ${isDark ? "bg-slate-900 hover:bg-slate-800" : "border border-blue-200/80 bg-[var(--home-property-card-light-bg)] hover:bg-[var(--home-property-card-light-hover)] hover:shadow-xl hover:shadow-blue-200/60"}`}
            >
              <div className={`mb-6 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-300 ${isDark ? "bg-slate-800 group-hover:bg-cyan-500/10" : "bg-[var(--home-property-icon-light-bg)] shadow-sm group-hover:bg-blue-200/70"}`}>
                <Image
                  src={cat.icon}
                  alt={cat.label}
                  width={44}
                  height={44}
                  className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className={`text-lg font-bold ${isDark ? "text-slate-100" : "text-[var(--home-property-name-light)]"}`}>{cat.label}</h3>
              <p className={`mt-1 text-xs font-medium ${isDark ? "text-slate-500" : "text-[var(--home-property-count-light)]"}`}>{cat.count}</p>
              <div className={`absolute bottom-0 left-0 h-1 w-full scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${isDark ? "bg-cyan-500" : "bg-blue-600"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
