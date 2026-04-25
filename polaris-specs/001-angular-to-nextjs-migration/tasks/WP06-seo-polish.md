---
work_package_id: WP06
title: "SEO metadata, Lighthouse audit, final polish"
lane: planned
dependencies: [WP02, WP03, WP04, WP05]
feature: 001-angular-to-nextjs-migration
---

# WP06 — SEO metadata, Lighthouse audit, final polish

## Objective

Ensure every page has complete SEO metadata, run a Lighthouse audit against SC-02 targets, and fix any issues that prevent the migration from meeting success criteria.

## Subtasks

1. Audit all pages for missing or duplicate `metadata` exports — add/fix where needed:
   - Unique `title` and `description` per page
   - `openGraph` metadata for home and portfolio pages
   - `robots` defaults (index, follow)
2. Add `public/sitemap.xml` — list all static and dynamic routes
3. Add `public/robots.txt` — allow all crawlers, reference sitemap
4. Run Lighthouse CI on deployed Vercel preview URL for the home page:
   - Performance >= 85, Accessibility >= 90, Best Practices >= 90, SEO >= 90
   - Document scores in a `polaris-specs/001-angular-to-nextjs-migration/lighthouse-report.md`
5. Fix any Lighthouse failures:
   - Missing alt text → add to all `next/image` usages
   - Contrast issues → adjust Tailwind colour choices
   - Missing landmark regions → add semantic HTML (main, nav, footer)
   - Image sizing → configure `sizes` prop on `next/image`
6. Cross-browser check: Chrome, Firefox, Safari (desktop + mobile viewport)
7. Final TypeScript and ESLint clean pass across all files
8. Update GitHub issue #1 with a comment linking to the Vercel preview URL

## Definition of Done

- [ ] All 7 routes have unique title and meta description
- [ ] sitemap.xml and robots.txt present and valid
- [ ] Lighthouse mobile scores: Performance >= 85, Accessibility >= 90, Best Practices >= 90, SEO >= 90
- [ ] All images have descriptive alt text
- [ ] No TypeScript errors, no ESLint warnings across the full codebase
- [ ] Site renders correctly in Chrome, Firefox, and Safari
- [ ] GitHub issue #1 updated with Vercel preview link
