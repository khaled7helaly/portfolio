# Content Checklist

Things you (Khaled) must supply before the portfolio is ready to publish.

## Required now (Batch 1)

- [ ] **Portrait** — `client/public/images/profile/khaled.webp`
  - Minimum 1200 × 1500 px (4:5 ratio)
  - Under 250 KB
  - Simple/neutral background, face in the upper third
  - When missing: UI shows a "KH" monogram fallback (no layout shift)

- [ ] **CV PDF** — `client/public/cv/<filename>.pdf`
  - Update `src/data/profile.ts` → `resumeUrl: '/cv/<filename>.pdf'`
  - When missing: "Download CV" button is hidden

## Required before launch

- [ ] **OG image** — `client/public/og-image.png` (1200 × 630 px)
  - Used in social link previews for all routes
  - Enable commented lines in `index.html` and set `ogImagePath` in `seo/seo.config.ts`

- [ ] **Social URLs** — GitHub, LinkedIn (add to `src/data/socials.ts` when Batch 2 is built)

- [ ] **Final domain** — Set `VITE_SITE_URL` (see `docs/seo.md` launch checklist)

## Truthful content rules (enforced in code)

- No invented titles, employers, dates, awards or links
- No lorem ipsum or placeholder text in deployed builds
- Unknown fields are marked `// TODO(Khaled): ...` and omitted from the UI
- `scripts/validate-content.ts` (planned) will enforce required fields at CI time