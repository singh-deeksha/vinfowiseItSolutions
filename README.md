# Vinfowise IT Solutions Website

React + Tailwind recreation of the public Vinfowise site, with reusable pages, centralized content, portfolio filters, careers, insights, privacy, terms, and VINI customer onboarding. Configure the Supabase backend below before enabling persistent customer records or the admin inbox.

## Logo

Original, custom vector logos are included at:

```text
public/vinfowise-logo.svg
public/vinfowise-logo-horizontal.svg
public/vinfowise-social-profile.svg
public/vinfowise-emblem.svg
```

Full brand usage notes are in:

```text
BRAND-KIT.md
```

## Run Locally

Start the Vite development server:

```bash
npm run dev
```

Vite serves the site at `http://127.0.0.1:5173/` by default.

## Common Commands

```bash
npm install --cache ./.npm-cache
npm run build
npm run preview -- --port 4173
```

## Edit Company Content

Most editable business content lives in:

```text
src/data/siteContent.js
```

Update company name, services, projects, testimonials, stats, team, blogs, contact details, WhatsApp number, and social links there.


### Vercel

1. Import the project into Vercel.
2. Use `npm run build` as the build command.
3. Use `dist` as the output directory.

### VINI customer onboarding

VINI keeps chat details in memory until a visitor explicitly opts in to saving their details and conversation. The Vercel API uses an HttpOnly, signed session cookie; the Supabase service-role key is only used server-side. The admin inbox is available at `/admin` and only authorizes the configured admin email.

1. Create a Supabase project and run [`supabase/migrations/20261113000000_vini_customer_onboarding.sql`](./supabase/migrations/20261113000000_vini_customer_onboarding.sql) in its SQL editor.
2. Enable Supabase email OTP/magic-link authentication, invite `vinfowiseitsolutions@gmail.com` as an Auth user, and allow the deployed website's `/admin` URL in the project's redirect URL settings.
3. Configure these Vercel environment variables for Preview and Production:

   - `SUPABASE_URL`: project URL
   - `SUPABASE_ANON_KEY`: project anon/public key
   - `SUPABASE_SERVICE_ROLE_KEY`: service-role secret; server-side only, never use a `VITE_` prefix
   - `VINI_SESSION_SECRET`: a randomly generated secret with at least 32 bytes of entropy (for example, generate one with `openssl rand -base64 48`)
   - `VINI_ADMIN_EMAIL`: `vinfowiseitsolutions@gmail.com`
   - `VITE_SUPABASE_URL`: same project URL, used for admin email-link authentication
   - `VITE_SUPABASE_ANON_KEY`: same anon/public key, used for admin email-link authentication

4. Redeploy after setting environment variables. Verify variable names under Vercel Project Settings > Environment Variables (never print or commit values). For local API testing, use `vercel dev` with the same values in an ignored `.env.local` file; `npm run dev` only serves the Vite frontend.

RLS is enabled with no browser-accessible table policies. Public writes and admin reads/updates/deletes go through Vercel API handlers; admin API requests verify the Supabase access token and enforce the configured admin email server-side. Visitor details and conversation history are only written after affirmative consent. The migration stores consent timestamp and policy version for auditability. Production and Preview need the same secure variables. Current production Vercel configuration was checked by variable names only; VINI/Supabase variables are not configured yet, so persistent onboarding/admin remain unavailable until those are added and the database migration is applied.

Security headers are configured in `vercel.json` and `netlify.toml`. The site uses a single essential, first-party, HttpOnly chat-session cookie for up to 30 days, and no advertising or analytics cookies. It discloses this in the Cookie Policy; a preference banner is not enabled because there are currently no non-essential cookies.

### Netlify

1. Import the project into Netlify.
2. Use `npm run build` as the build command.
3. Use `dist` as the publish directory.

SPA route rewrites are included for Netlify and Vercel.
