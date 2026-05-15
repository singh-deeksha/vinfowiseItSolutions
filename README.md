# Vinfowise IT Solutions Website

Production-ready React + Tailwind corporate website using the NeoTech Enterprise theme with reusable pages, centralized content, dark/light mode, lead forms, WhatsApp CTA, portfolio filters, careers, insights, privacy, and terms pages.

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

## Live Local Preview

The site is currently running locally at:

```text
http://localhost:4173/
```

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

## Deploy Online

This project is ready for static hosting.

### Vercel

1. Import the project into Vercel.
2. Use `npm run build` as the build command.
3. Use `dist` as the output directory.

### Netlify

1. Import the project into Netlify.
2. Use `npm run build` as the build command.
3. Use `dist` as the publish directory.

SPA route rewrites are included for Netlify and Vercel.
