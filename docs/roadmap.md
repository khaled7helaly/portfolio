# Portfolio Roadmap

## Batch order

| Batch | Scope | Status |
|-------|-------|--------|
| **Batch 1** | TypeScript architecture, Navigation/Hero, About, scroll-linked photo transition | ✅ Done |
| Batch 2 | Skills section | Planned |
| Batch 3 | Featured Projects section + Projects page | Planned |
| Batch 4 | Education & Learning section | Planned |
| Batch 5 | Experience section | Planned |
| Batch 6 | Services section | Planned |
| Batch 7 | Testimonials section | Planned |
| Batch 8 | Contact section + footer | Planned |
| Batch 9 | Theme toggle (dark mode) | Planned |
| Batch 10 | i18n / Arabic locale | Planned |
| Batch 11 | Prerendering / SSG for social previews | Planned |

## Rules
- Each batch is one commit per milestone (M1-M6 for Batch 1).
- A batch ships only when 	sc --noEmit, oxlint, and 
pm run build all pass.
- No batch touches dmin/ or server/.
- API integration (swapping local data for fetch) happens after all sections exist.

## Branch strategy
- Feature work on eat/client-batch-<N>.
- Squash-merge to main after acceptance criteria pass.
- Never force-push to main.