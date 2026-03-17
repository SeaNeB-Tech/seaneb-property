import Image from "next/image";
import Link from "next/link";

export default function CountriesShowcaseSection({
  isDark,
  countryList,
  getCountryHref,
  phoneCodeByName,
}) {
  const normalizedCountries = (countryList || [])
    .map((country) => {
      if (typeof country === "string") return { name: country };
      return country;
    })
    .filter((country) => country?.name);
  const primaryCountryName = String(normalizedCountries[0]?.name || "India").trim() || "India";
  const primaryCountryHref = normalizedCountries[0] ? getCountryHref(normalizedCountries[0]) : "/in";

  return (
    <section className={`py-20 sm:py-24 ${isDark ? "bg-[var(--home-country-bg-dark)]" : "bg-[var(--home-country-bg-light)]"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className={`text-3xl font-bold sm:text-4xl ${isDark ? "text-white" : "text-[var(--home-country-title-light)]"}`}>
              Available Location
            </h2>
            <p className={`mt-3 ${isDark ? "text-slate-400" : "text-[var(--home-country-text-light)]"}`}>
              {`Explore listings across ${primaryCountryName}.`}
            </p>
          </div>
          <Link
            href={primaryCountryHref}
            className={`flex items-center gap-1 text-sm font-semibold transition-all hover:gap-2 ${isDark ? "text-cyan-400 hover:text-cyan-300" : "text-blue-600 hover:text-blue-700"}`}
          >
            {`View ${primaryCountryName} locations `}<span aria-hidden="true">{"\u2192"}</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
          {normalizedCountries.map((country) => {
            const name = country.name;
            const info = phoneCodeByName.get(name) || {};
            const flag =
              country.flag ||
              country.flagUrl ||
              country.raw?.flag ||
              country.raw?.flag_url ||
              info.flag ||
              `/icons/${name.toLowerCase().replace(/[^a-z]/g, "")}.svg`;
            const href = getCountryHref(country);

            return (
              <Link
                key={`${country.slug || country.code || name}`}
                href={href}
                className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${isDark ? "bg-slate-900 border border-slate-800 text-slate-100 hover:border-cyan-500/50 hover:bg-slate-800 hover:shadow-lg hover:shadow-cyan-900/10" : "bg-[var(--home-country-card-light-bg)] border border-blue-200/90 text-[var(--home-country-card-text-light)] hover:border-blue-400 hover:bg-[var(--home-country-card-light-hover)] hover:shadow-lg hover:shadow-blue-200/70"}`}
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
