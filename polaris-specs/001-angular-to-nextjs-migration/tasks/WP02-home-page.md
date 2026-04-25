---
work_package_id: WP02
title: "Home page"
lane: planned
dependencies: [WP01]
feature: 001-angular-to-nextjs-migration
---

# WP02 — Home page

## Objective

Build the home page (`/`) with all four content sections from the Angular site, modernised with Tailwind CSS and mobile-first layout.

## Subtasks

1. Create `lib/services.ts` with the three service definitions (Garden Design, Interior Design, Execution Team)
2. Create `lib/process.ts` with the six project process steps
3. Build `components/Hero.tsx`:
   - Full-width hero image using `next/image`
   - Headline, subheadline, and call-to-action button linking to /portfolio
   - Works as a Server Component (no client-side JS required)
4. Build `components/Services.tsx`:
   - 3-column grid (stacks to 1 column on mobile)
   - One card per service from `lib/services.ts`
5. Build `components/ProcessSteps.tsx`:
   - Numbered 6-step list, visually distinct
   - Readable on mobile (single column)
6. Build `app/page.tsx`:
   - Compose Hero, company intro section (text + photo), ProcessSteps, Services
   - Set page `metadata` (title, description) using Next.js Metadata API
7. Write Jest + RTL tests for Services and ProcessSteps components
8. Write Playwright E2E test: visit /, assert all four sections are visible

## Definition of Done

- [ ] Hero, intro, process steps, and services sections render on /
- [ ] All images use `next/image`
- [ ] Page has unique title and meta description
- [ ] Layout is usable at 375px width without horizontal scrolling
- [ ] TypeScript compiles with zero errors
- [ ] ESLint reports zero warnings
- [ ] Jest component tests pass
- [ ] Playwright E2E test passes
