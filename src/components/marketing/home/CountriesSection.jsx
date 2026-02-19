import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/marketing/shared/SectionHeading";

/**
 * Renders countries returned by location APIs.
 */
export default function CountriesSection({ countries = [], title, description }) {
  if (!countries.length) return null;

  const getCountryHref = (country) => {
    const code = String(country?.code || "").toLowerCase();
    if (code === "in") return "/in";
    return code ? `/in/${code}` : "/in";
  };

  const sortedCountries = [...countries].sort((a, b) => {
    if (a.name === "India") return -1;
    if (b.name === "India") return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="India"
        title={title || "Available Location"}
        description={description || "Explore listings across India."}
      />

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {sortedCountries.map((country) => (
          <Link
            key={`${country.name}-${country.code}`}
            href={getCountryHref(country)}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50"
          >
            <Image
              src={country.flag}
              alt={`${country.name} flag`}
              width={28}
              height={20}
              className="h-5 w-7 rounded-[2px] object-cover"
            />
            <p className="truncate text-xs font-semibold text-slate-900">{country.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
