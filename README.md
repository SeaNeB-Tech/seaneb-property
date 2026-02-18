This is the SeaNeB Property Listing app (public-facing).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment

Set these variables for production-safe cookie and service-worker behavior:

```env
NEXT_PUBLIC_SITE_URL=https://property.seaneb.com
NEXT_PUBLIC_COOKIE_DOMAIN=property.seaneb.com
NEXT_PUBLIC_COOKIE_PATH=/
NEXT_PUBLIC_COOKIE_SAMESITE=Lax
NEXT_PUBLIC_ENABLE_SW=false
NEXT_PUBLIC_SW_SCOPE=/
```

- Keep `NEXT_PUBLIC_ENABLE_SW=false` if another app is mounted on the same host.
- If service worker is required, use a non-overlapping scope.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploy Notes

- Domain: `property.seaneb.com`
- Keep this repo for listing/public pages only.
