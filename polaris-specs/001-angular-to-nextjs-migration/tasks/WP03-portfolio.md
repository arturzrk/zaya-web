---
work_package_id: WP03
title: Portfolio grid, detail pages, image migration
lane: "doing"
dependencies: []
base_branch: main
base_commit: 320eca3da451bd8b382b548108f489dba5f0ca8a
created_at: '2026-04-25T16:01:38.370720+00:00'
test_status: pending
test_file: tests/e2e/WP03-portfolio-grid-detail-pages-image-migration.e2e.js
domain: frontend-craft
feature: 001-angular-to-nextjs-migration
shell_pid: "59719"
---

# WP03 — Portfolio grid, detail pages, image migration

## Objective

Migrate all portfolio images from the Angular project into `public/images/portfolio/`, build the portfolio grid listing page, and build individual project detail pages with a gallery/lightbox.

## Subtasks

1. Copy all portfolio images from `/Users/artur/Projects/javascript/ZayaDesign/src/assets/images/` into `public/images/portfolio/` preserving folder structure
2. Create `lib/projects.ts` with typed `Project[]` array — one entry per portfolio project (slug, title, description, coverImage path, images array)
3. Build `components/PortfolioGrid.tsx`:
   - Responsive image grid (1 col mobile → 2 col sm → 3 col lg)
   - Each tile shows cover image using `next/image` and project title
   - Each tile links to `/portfolio/[slug]`
4. Build `app/portfolio/page.tsx`:
   - Renders PortfolioGrid with all projects from `lib/projects.ts`
   - Set page metadata
5. Build `components/ProjectGallery.tsx`:
   - Full-width display of all project images
   - Keyboard-navigable lightbox for enlarged view (Client Component)
   - Project title and description displayed
6. Build `app/portfolio/[slug]/page.tsx`:
   - `generateStaticParams` from `lib/projects.ts` slugs
   - Renders ProjectGallery for the matching project
   - Returns `notFound()` for unknown slugs
   - Set page metadata per project
7. Write Jest tests for PortfolioGrid (renders all tiles, correct links)
8. Write Playwright E2E: visit /portfolio → click first project → assert gallery loads

## Definition of Done

- [ ] All portfolio images accessible under /images/portfolio/
- [ ] /portfolio renders a grid of all projects
- [ ] Each project tile links to /portfolio/[slug]
- [ ] Portfolio detail page renders all project images
- [ ] Unknown slugs return 404
- [ ] generateStaticParams covers all slugs
- [ ] All images use `next/image`
- [ ] TypeScript compiles with zero errors, ESLint clean
- [ ] Jest and Playwright tests pass
