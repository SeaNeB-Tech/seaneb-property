import Image from "next/image";

const DOWNLOAD_FEATURES = ["Instant Alerts", "Saved Searches", "Verified Leads"];

export default function DownloadSection({ isDark }) {
  return (
    <section id="download" className={`py-24 relative overflow-hidden ${isDark ? "bg-[#0e1628]" : "bg-[#d0e2ff]"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className={`relative grid grid-cols-1 gap-12 overflow-hidden rounded-[3rem] px-8 py-16 shadow-2xl lg:grid-cols-2 lg:px-16 lg:py-20 ${isDark ? "bg-gradient-to-br from-[#15233f] via-[#13233b] to-[#0e1a30] border border-slate-700" : "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"}`}>
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Available on iOS & Android
              </div>
              <h3 className="text-4xl font-bold leading-tight text-white sm:text-5xl">Get SeaNeB on Your Phone</h3>
              <p className="max-w-md text-lg leading-relaxed text-blue-100/90">
                Use the app to track listings, save favorites, and receive updates instantly anywhere, anytime.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {DOWNLOAD_FEATURES.map((item) => (
                <span key={item} className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
                  <svg className="h-3 w-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative h-[480px] w-[280px] rotate-[-6deg] transform transition-transform duration-700 hover:rotate-0">
              <div className={`absolute inset-0 rounded-[2.5rem] bg-[#0f1a2d] shadow-2xl border-[8px] ${isDark ? "border-slate-700" : "border-slate-900"}`}>
                <div className="absolute top-0 left-1/2 z-20 h-6 w-32 -translate-x-1/2 rounded-b-xl bg-[#0f1a2d]" />
                <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-slate-800">
                  <Image
                    src="/assets/propertyimages/image.png"
                    alt="SeaNeB mobile app preview"
                    fill
                    className="object-cover opacity-90"
                    sizes="280px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
