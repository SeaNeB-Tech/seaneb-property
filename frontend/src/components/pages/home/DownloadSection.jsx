import Image from "next/image";

const DOWNLOAD_FEATURES = ["Instant Alerts", "Saved Searches", "Verified Leads"];
const IOS_APP_URL = "#";
const ANDROID_APP_URL = "#";
const STORE_BUTTON_CLASS =
  "inline-flex min-w-[190px] items-center justify-start gap-3 rounded-xl border border-white/25 bg-black/35 px-5 py-3 text-left text-white transition hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

function StoreButton({ href, ariaLabel, eyebrow, label, iconPath }) {
  const isPlaceholder = href === "#";

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target={isPlaceholder ? undefined : "_blank"}
      rel={isPlaceholder ? undefined : "noopener noreferrer"}
      className={`${STORE_BUTTON_CLASS} ${isPlaceholder ? "pointer-events-none opacity-70" : ""}`}
    >
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={iconPath} />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[10px] uppercase tracking-wide text-white/80">{eyebrow}</span>
        <span className="text-sm font-semibold">{label}</span>
      </span>
    </a>
  );
}

export default function DownloadSection({ isDark }) {
  return (
    <section
      id="download"
      className={`relative overflow-hidden py-16 sm:py-20 lg:py-24 ${isDark ? "bg-[var(--home-download-bg-dark)]" : "bg-[var(--home-download-bg-light)]"}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--overlay-white-18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-bg-download-radial),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`relative grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[2rem] px-5 py-8 shadow-2xl sm:rounded-[2.5rem] sm:px-8 sm:py-12 lg:grid-cols-2 lg:gap-14 lg:rounded-[3rem] lg:px-16 lg:py-16 ${isDark ? "border border-slate-700 bg-gradient-to-br from-[var(--home-download-grad-dark-from)] via-[var(--home-download-grad-dark-via)] to-[var(--home-download-grad-dark-to)]" : "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"}`}
        >
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-center space-y-6 text-center lg:text-left">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 self-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md lg:self-start">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Available on iOS & Android
              </div>
              <h3 className="text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                Find Properties Faster with the SeaNeB App
              </h3>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-blue-100/90 sm:text-base lg:mx-0 lg:text-lg">
                Use the app to track listings, save favorites, and receive updates instantly anywhere, anytime.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
              {DOWNLOAD_FEATURES.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  <svg className="h-3 w-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <StoreButton
                href={IOS_APP_URL}
                ariaLabel="Download SeaNeB on the App Store"
                eyebrow="Download on the"
                label="App Store"
                iconPath="M16.7 12.6c0-2.4 2-3.6 2.1-3.6-1.2-1.7-3-1.9-3.6-1.9-1.5-.2-3 1-3.8 1-.8 0-2-.9-3.2-.9-1.7 0-3.2 1-4 2.4-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.8 2.4 3.1 2.3 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.3.9-1.3 1.3-2.6 1.3-2.7 0 0-2.5-1-2.5-3.8Zm-2.4-7c.7-.8 1.2-2 1.1-3.1-1 .1-2.2.7-2.9 1.5-.7.8-1.3 2-1.2 3.1 1.1.1 2.2-.5 3-1.5Z"
              />
              <StoreButton
                href={ANDROID_APP_URL}
                ariaLabel="Get SeaNeB on Google Play"
                eyebrow="Get it on"
                label="Google Play"
                iconPath="M3.6 2.8a1.1 1.1 0 0 0-.6 1v16.4c0 .4.2.8.6 1.1l10-9.2-10-9.3Zm11.3 10.2 2.7-2.5-10-9.2 7.3 11.7Zm3.6 3.4 2.9-1.6c.8-.4.8-1.5 0-1.9L18.5 11l-2.9 2.7 2.9 2.7Zm-10.9 6.4 10-9.2-2.7-2.5-7.3 11.7Z"
              />
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative mx-auto h-[340px] w-[208px] sm:h-[400px] sm:w-[240px] lg:mx-0 lg:h-[460px] lg:w-[276px]">
              <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-white/10 blur-2xl" />
              <Image
                src="/images/phone.png"
                alt="SeaNeB mobile app preview"
                fill
                className="object-contain drop-shadow-[0_24px_38px_rgba(0,0,0,0.45)]"
                sizes="(max-width: 640px) 208px, (max-width: 1024px) 240px, 276px"
                unoptimized
              />
              <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-b from-white/10 via-transparent to-black/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
