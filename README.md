# Vinfowise IT Solutions Website

React + Tailwind recreation of the public Vinfowise site, with reusable pages, centralized content, portfolio filters, careers, insights, privacy, and terms pages. The original deployed source was unavailable, so the current UI was reconstructed from the public site and its content API; original server-side features such as the admin and inquiry APIs are not included.

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

### Netlify

1. Import the project into Netlify.
2. Use `npm run build` as the build command.
3. Use `dist` as the publish directory.

SPA route rewrites are included for Netlify and Vercel.
