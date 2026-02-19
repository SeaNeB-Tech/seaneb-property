import Link from "next/link";

export default function FinalCtaSection({ isDark }) {
  return (
    <section className={`relative py-20 sm:py-28 ${isDark ? "bg-[#0e1628]" : "bg-gradient-to-br from-[#10386f] via-[#124c97] to-[#1f4fb8]"}`}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">Ready to Find Your Next Property?</h2>
        <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">
          Join thousands of users on SeaNeB and discover verified opportunities in your preferred location.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/dashboard" className={`w-full rounded-xl px-8 py-4 text-base font-bold shadow-lg transition-all hover:scale-105 sm:w-auto ${isDark ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/20" : "bg-[#f3f8ff] text-slate-900 hover:bg-blue-100 shadow-blue-200/50"}`}>
            Get Started Now
          </Link>
          <Link href="/about" className="w-full rounded-xl border border-blue-300/40 px-8 py-4 text-base font-bold text-white transition-all hover:bg-blue-900/35 sm:w-auto">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
