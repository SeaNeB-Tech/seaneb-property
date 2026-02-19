import Image from "next/image";

const PROPERTY_CATEGORIES = [
  { icon: "/icons/apartment.svg", label: "Apartments", count: "2,400+ listings" },
  { icon: "/icons/house.svg", label: "Houses", count: "850+ listings" },
  { icon: "/icons/commercial.svg", label: "Commercial", count: "1,200+ listings" },
  { icon: "/icons/land.svg", label: "Land", count: "500+ listings" },
];

export default function PropertyCategoriesSection({ isDark }) {
  return (
    <section className={`py-20 sm:py-24 ${isDark ? "bg-[#0e1628]" : "bg-[#dce9ff]"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-2xl text-center mx-auto">
          <h2 className={`text-3xl font-bold sm:text-4xl leading-tight ${isDark ? "text-white" : "text-[#12366f]"}`}>
            Browse by Property Type
          </h2>
          <p className={`mt-4 text-lg ${isDark ? "text-slate-400" : "text-[#2b4a7a]"}`}>
            Choose the format that fits your buying goals from our verified listings.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8">
          {PROPERTY_CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              className={`group relative overflow-hidden rounded-3xl p-6 text-center transition-all duration-300 hover:-translate-y-2 ${isDark ? "bg-slate-900 hover:bg-slate-800" : "border border-blue-200/80 bg-[#eaf2ff] hover:bg-[#dde9ff] hover:shadow-xl hover:shadow-blue-200/60"}`}
            >
              <div className={`mb-6 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-300 ${isDark ? "bg-slate-800 group-hover:bg-cyan-500/10" : "bg-[#f3f8ff] shadow-sm group-hover:bg-blue-200/70"}`}>
                <Image
                  src={cat.icon}
                  alt={cat.label}
                  width={44}
                  height={44}
                  className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className={`text-lg font-bold ${isDark ? "text-slate-100" : "text-[#173f7a]"}`}>{cat.label}</h3>
              <p className={`mt-1 text-xs font-medium ${isDark ? "text-slate-500" : "text-[#486896]"}`}>{cat.count}</p>
              <div className={`absolute bottom-0 left-0 h-1 w-full scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${isDark ? "bg-cyan-500" : "bg-blue-600"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
