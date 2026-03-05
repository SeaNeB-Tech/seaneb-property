import "../styles/globals.css"
import GlobalFooter from "@/components/ui/GlobalFooter"
import { SITE_URL } from "@/lib/siteUrl"
import { Noto_Sans } from "next/font/google"
import ListingAuthProviderClient from "@/components/providers/ListingAuthProviderClient"

const siteUrl = SITE_URL
const THEME_COLOR = "#BF932A"
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-sans",
})

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "SeaNeB - Find Your Perfect Property | Real Estate Platform",
  description: "Discover verified apartments, houses, and commercial properties in your area. List, buy, sell, and rent properties with India's trusted real estate marketplace. Connect with qualified sellers instantly.",
  keywords: "real estate, property listing, buy property, sell property, rent property, apartments, houses, commercial properties, India real estate",
  manifest: "/manifest.json",
  icons: {
    icon: "/logos/Fav.svg",
    apple: "/logos/Fav.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "SeaNeB - Find Your Perfect Property",
    description: "Discover verified apartments, houses, and commercial properties in your area.",
    siteName: "SeaNeB",
    images: [
      {
        url: "/logos/light-logo.svg",
        width: 1200,
        height: 630,
        alt: "SeaNeB - Real Estate Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SeaNeB - Find Your Perfect Property",
    description: "Discover verified apartments, houses, and commercial properties in your area.",
    creator: "@seaneb",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: THEME_COLOR,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="SeaNeB" />
        <meta name="msapplication-TileColor" content={THEME_COLOR} />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Manifest Link */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Icons */}
        <link rel="icon" href="/logos/Fav.svg" />
        <link rel="apple-touch-icon" href="/logos/Fav.svg" />
        <link rel="mask-icon" href="/logos/light-logo.svg" color={THEME_COLOR} />
      </head>
      <body className={`${notoSans.variable} min-h-screen bg-[var(--layout-body-bg)]`}>
        <ListingAuthProviderClient>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1">{children}</main>
            <GlobalFooter />
          </div>
        </ListingAuthProviderClient>
      </body>
    </html>
  )
}
