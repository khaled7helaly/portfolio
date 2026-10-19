# SEO Approach

## Strategy: static-first, runtime-second

This is a client-rendered SPA (React + Vite). SEO is handled in two layers:

1. **Static tags in `index.html`** — what crawlers and social bots see without executing JS.
   Includes `lang`, `title`, `meta description`, `og:type`, `og:site_name`, `og:title`,
   `og:description`, `theme-color`, and `favicon`.

2. **Dynamic tags via `seo/Seo.tsx`** — updates `<title>`, description, canonical,
   OG/Twitter tags and JSON-LD per route after JS loads. Used by Google and other JS-capable crawlers.

## Honest limitations

Social link previews (Twitter/X cards, WhatsApp, iMessage) read only the **static** tags in
`index.html`, because those bots do not execute JavaScript. This means all routes share the
same OG image and description until prerendering is added (planned as a later batch).

## Implementation summary

| File | Purpose |
|------|---------|
| `index.html` | Static head: lang, title, description, og tags, theme-color, favicon |
| `seo/seo.config.ts` | Constants: siteName, titleTemplate, defaultDescription, siteUrl |
| `seo/Seo.tsx` | Per-route head manager (no library) |
| `seo/structuredData.ts` | Person JSON-LD builder (verified facts only) |
| `public/robots.txt` | Allow all; sitemap line commented |
| `scripts/generate-sitemap.ts` | PLACEHOLDER — release step |

## Launch checklist

Before going live, complete these steps in order:

- [ ] Set `VITE_SITE_URL` in your hosting environment (no trailing slash, e.g. `https://khaled.dev`).
- [ ] Enable the `<link rel="canonical">` and `og:url` commented lines in `index.html`.
- [ ] Create `public/og-image.png` at 1200 × 630 px (shows in social previews for all routes).
- [ ] Enable the `og:image` and `twitter:image` commented lines in `index.html`.
- [ ] Set `ogImagePath` in `seo/seo.config.ts` to `'/og-image.png'`.
- [ ] Enable the Sitemap line in `public/robots.txt`.
- [ ] Run `scripts/generate-sitemap.ts` to generate `public/sitemap.xml`.
- [ ] Submit the sitemap URL to Google Search Console.
- [ ] Verify the JSON-LD Person schema with Google's Rich Results Test.

## Content rules

- Meta description must be <= 160 characters and use only verified facts.
- `structuredData.ts` must never include `jobTitle`, `worksFor`, awards or any unverified field.
- `sameAs` links (GitHub, LinkedIn) are added only once those URLs are confirmed.