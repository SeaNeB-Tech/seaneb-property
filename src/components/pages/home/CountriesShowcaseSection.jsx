import Image from "next/image";
import Link from "next/link";

export default function CountriesShowcaseSection({
  isDark,
  countryList,
  getCountryHref,
  phoneCodeByName,
}) {
  return (
    <section className={`py-20 sm:py-24 ${isDark ? "bg-[#111c31]" : "bg-[#d4e4ff]"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className={`text-3xl font-bold sm:text-4xl ${isDark ? "text-white" : "text-[#12366f]"}`}>
              Available Location
            </h2>
            <p className={`mt-3 ${isDark ? "text-slate-400" : "text-[#2b4a7a]"}`}>
              Explore listings across India.
            </p>
          </div>
          <Link
            href="/in"
            className={`flex items-center gap-1 text-sm font-semibold transition-all hover:gap-2 ${isDark ? "text-cyan-400 hover:text-cyan-300" : "text-blue-600 hover:text-blue-700"}`}
          >
            View India locations <span aria-hidden="true">{"\u2192"}</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
          {countryList.map((name) => {
            const info = phoneCodeByName.get(name) || {};
            const flag = info.flag || `/icons/${name.toLowerCase().replace(/[^a-z]/g, "")}.svg`;
            const href = getCountryHref(name, flag);

            return (
              <Link
                key={name}
                href={href}
                className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${isDark ? "bg-slate-900 border border-slate-800 text-slate-100 hover:border-cyan-500/50 hover:bg-slate-800 hover:shadow-lg hover:shadow-cyan-900/10" : "bg-[#eaf2ff] border border-blue-200/90 text-[#173f7a] hover:border-blue-400 hover:bg-[#dce9ff] hover:shadow-lg hover:shadow-blue-200/70"}`}
              >
                <div className="relative h-8 w-10 shrink-0 overflow-hidden rounded-md shadow-sm">
                  <Image src={flag} alt={`${name} flag`} fill className="object-cover" />
                </div>
                <span className="font-semibold">{name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
