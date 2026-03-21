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

`npm run dev` uses the port from `NEXT_PUBLIC_LISTING_URL` in `.env`.
Open the URL configured in `NEXT_PUBLIC_LISTING_URL` with your browser to see the result.

## Environment

Set these variables for production-safe cookie and service-worker behavior:

```env
NEXT_PUBLIC_LISTING_URL=https://your-app-domain
NEXT_PUBLIC_APP_URL=https://your-auth-domain
NEXT_ENV=development
NEXT_PUBLIC_DEV_URL=https://dev.seaneb.com
NEXT_PUBLIC_CENTRAL_URL=https://central-api.seaneb.com
NEXT_PUBLIC_PRODUCT_KEY=property
```

- Keep `NEXT_PUBLIC_ENABLE_SW=false` if another app is mounted on the same host.
- If service worker is required, use a non-overlapping scope.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploy Notes

- Domain: `property.seaneb.com`
- Keep this repo for listing/public pages only.
