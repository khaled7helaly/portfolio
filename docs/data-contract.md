# Data Contract

This document is the canonical definition of entity shapes used in `src/types/` and `src/data/`.
Local data must match these shapes exactly. The API must return the same shapes (with `id`, never `_id`).

## Profile (implemented in Batch 1)

```ts
interface Profile {
  name:             string;   // "Khaled Mahmoud Helaly"
  headline:         string;   // "Software Engineering · MERN Stack"
  photo:            string;   // "/images/profile/khaled.webp"
  photoAlt:         string;   // "Portrait of Khaled Mahmoud Helaly"
  resumeUrl?:       string;   // "/cv/<filename>.pdf" — omit until file exists
  aboutParagraphs:  string[]; // verified-fact paragraphs, no lorem ipsum
}
```

## Planned entities (interfaces in src/types/ placeholders)

All planned entities follow these conventions:
- `id: string` (never `_id`)
- `order: number` (ascending; services sort by this)
- `published: boolean` (false = excluded by the service layer)

| Entity | Key fields |
|--------|-----------|
| Social | platform, url, iconKey |
| Skill | name, category, level (1-5) |
| Project | slug, title, description, tech[], liveUrl?, repoUrl?, images[], featured |
| Education | institution, degree, field, startYear, endYear? |
| Training | title, provider, completedYear, certificateUrl? |
| Certificate | title, issuer, issuedYear, url?, imageUrl? |
| Experience | company, role, startDate, endDate?, bullets[] |
| Service | title, description, iconKey |
| Testimonial | authorName, authorRole, company?, quote, avatarUrl? |

Full interface definitions will be added to `src/types/` as each batch is implemented.