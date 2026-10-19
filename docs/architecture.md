# Architecture

## Data flow (one direction)

```
pages / sections / components  →  hooks  →  services  →  data
```

- **Components** never import from `data/` or `services/` directly.
- **Services** are the only place the data source changes (local → API).
- **Hooks** return `{ data, loading, error, reload }` and own the async boundary.

### Adding a new resource (e.g. "testimonials")

1. Define the interface in `src/types/testimonial.ts`.
2. Add local content to `src/data/testimonials.ts`.
3. Implement `src/services/testimonials.service.ts` (`async getTestimonials()`).
4. Export from `src/services/index.ts`.
5. Create `src/hooks/useTestimonials.ts` using `useAsync`.
6. Build the section in `src/sections/testimonials/Testimonials.tsx`.
7. Register in `src/app/sections.ts` with `enabled: true`.

### Swapping local data for the API

Only `src/services/*.service.ts` changes. Replace:
```ts
import { testimonials } from '@/data/testimonials';
return testimonials;
```
With:
```ts
const res = await fetch(import.meta.env.VITE_API_BASE + '/testimonials');
return res.json();
```

## File tree (Batch 1 state)

Files marked [IMPLEMENT] are real code; [PLACEHOLDER] contain only a header comment
and `export {};`. JSON files that cannot hold comments are listed here as planned.

```
client/
  index.html              [IMPLEMENT] SEO head, #root
  vite.config.ts          [IMPLEMENT] React plugin, @/ alias
  tsconfig.json           [IMPLEMENT] references app + node
  tsconfig.app.json       [IMPLEMENT] strict, JSX, paths
  tsconfig.node.json      [IMPLEMENT] vite.config.ts + scripts/
  .env.example            [IMPLEMENT] VITE_SITE_URL
  public/
    robots.txt            [IMPLEMENT]
    favicon.svg           [IMPLEMENT] KH monogram
    images/profile/README.md  [IMPLEMENT] portrait spec
    cv/README.md          [IMPLEMENT] CV placement instructions
  scripts/
    generate-sitemap.ts   [PLACEHOLDER]
    validate-content.ts   [PLACEHOLDER]
  src/
    main.tsx              [IMPLEMENT] fonts + styles + App mount
    vite-env.d.ts         [IMPLEMENT] Vite client types
    app/
      App.tsx             [IMPLEMENT] router + ErrorBoundary
      AppShell.tsx        [IMPLEMENT] skip link + SiteNav + main + outlet
      routes.tsx          [IMPLEMENT] / and * routes
      ScrollManager.tsx   [IMPLEMENT] hash scroll on navigation
      ErrorBoundary.tsx   [IMPLEMENT] friendly fallback
      sections.ts         [IMPLEMENT] section registry
    types/
      profile.ts          [IMPLEMENT]
      {social,skill,project,education,training,certificate,experience,service,testimonial}.ts  [PLACEHOLDER]
      index.ts            [IMPLEMENT]
    content/
      ui.ts               [IMPLEMENT] all UI strings and labels
    data/
      profile.ts          [IMPLEMENT]
      {socials,skills,projects,education,training,certificates,experience,services,testimonials}.ts  [PLACEHOLDER]
    services/
      profile.service.ts  [IMPLEMENT]
      {socials,skills,projects,education,training,certificates,experience,services,testimonials}.service.ts  [PLACEHOLDER]
      index.ts            [IMPLEMENT]
    hooks/
      useAsync.ts, useProfile.ts, useMediaQuery.ts, useReducedMotion.ts  [IMPLEMENT]
      useScrollProgress.ts, useActiveSection.ts, useLockBodyScroll.ts    [IMPLEMENT]
      {useSocials,useSkills,useProjects,useProject,useTheme,useReveal}   [PLACEHOLDER]
    lib/
      scroll.ts, easing.ts, media.ts   [IMPLEMENT]
      format.ts                         [PLACEHOLDER]
    components/
      ui/{Container,Button,ProfilePhoto,Icon}  [IMPLEMENT]
      ui/{Badge,Tag,Card,SectionHeader,ExternalLink,Skeleton}  [PLACEHOLDER]
      layout/{SiteNav,MobileMenu}  [IMPLEMENT]
      layout/{SiteFooter,ThemeToggle}  [PLACEHOLDER]
    sections/
      intro/IntroStage     [IMPLEMENT]
      hero/Hero            [IMPLEMENT]
      about/About          [IMPLEMENT]
      {skills,featured-projects,education-learning,experience,services,testimonials,contact}  [PLACEHOLDER]
    pages/
      HomePage.tsx, NotFoundPage.tsx  [IMPLEMENT]
      {ProjectsPage,ProjectDetailsPage}.tsx  [PLACEHOLDER]
    seo/
      seo.config.ts, Seo.tsx, structuredData.ts  [IMPLEMENT]
    styles/
      tokens.css, reset.css, global.css  [IMPLEMENT]

docs/
  architecture.md        [IMPLEMENT] this file
  seo.md                 [IMPLEMENT]
  content-checklist.md   [IMPLEMENT]
  data-contract.md       [IMPLEMENT]
  roadmap.md             [IMPLEMENT]

## Planned JSON files (cannot hold comments — listed here)
- client/public/site.webmanifest — add when PWA support is needed
- client/public/og-image.png — supply manually (see docs/content-checklist.md)

## Conventions
- Components: PascalCase `.tsx` + same-name `.css` beside them
- Hooks: `useX.ts`
- BEM class names with component prefix (`.hero__title`, `.site-nav__link`)
- Import alias `@/` → `src/`
- No barrel files except `types/index.ts` and `services/index.ts`
- CSS logical properties everywhere (inline/block) for future RTL support
- One named export per file; default export only for lazy-loaded routes