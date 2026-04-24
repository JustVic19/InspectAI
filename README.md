# InspectAI

Stop spending your evenings writing reports.

AI-assisted home inspection report generator. Inspector onboarding, checklist, and streaming report output — ported from the single-file prototype into Next.js (App Router).

## Setup

1. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

2. Set `ANTHROPIC_API_KEY` in `.env.local` (from [Anthropic Console](https://console.anthropic.com/)).

3. Install and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

Inspector profile and the last selected nav tab persist in **localStorage** (`inspectai:v1:*` keys) so refresh does not clear onboarding.

## Production stack

The full walkthrough (Clerk, Supabase, Stripe, Vercel, subscription checks, saving reports) lives in [docs/production-build.html](docs/production-build.html). The live app currently uses a **minimal** [`app/api/messages/route.ts`](app/api/messages/route.ts) proxy: streaming only, no auth or billing.

## Deploy (Vercel)

1. Push the repo and import the project in Vercel.
2. Add `ANTHROPIC_API_KEY` in Project → Settings → Environment Variables.
3. Deploy. Same-origin `/api/messages` keeps the API key off the client.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
