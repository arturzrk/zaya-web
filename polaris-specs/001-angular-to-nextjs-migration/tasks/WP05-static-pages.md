---
work_package_id: WP05
title: About, Policy, and 404 pages
lane: "doing"
dependencies: []
base_branch: main
base_commit: e0c5d0798b3d2dcf8125e57456ed99f1d685505b
created_at: '2026-04-25T16:09:49.493591+00:00'
test_status: pending
test_file: tests/e2e/WP05-about-policy-and-404-pages.e2e.js
domain: frontend-craft
feature: 001-angular-to-nextjs-migration
shell_pid: "64338"
---

# WP05 — About, Policy, and 404 pages

## Objective

Build the About page with real company content, the dynamic Policy pages (cookies, privacy), and the 404 not-found page.

## Subtasks

1. Create `lib/policies.ts` with `PolicyPage[]` — cookie policy and privacy policy content (migrated from Angular, formatted as clean text/markdown)
2. Build `app/about/page.tsx`:
   - Real content: team background, philosophy, and approach of Zaya Garden Design
   - At least one image using `next/image`
   - Set page metadata
3. Build `app/policy/[slug]/page.tsx`:
   - `generateStaticParams` from `lib/policies.ts` slugs (`cookies`, `privacy`)
   - Renders policy title and content
   - Returns `notFound()` for unknown slugs
   - Set page metadata per policy
4. Build `app/not-found.tsx`:
   - Friendly message: "Page not found"
   - Clear navigation link back to home page (/)
   - Styled consistently with the rest of the site
5. Write Jest tests: policy page renders correct title, 404 page renders home link
6. Write Playwright E2E: visit /about, /policy/cookies, /policy/privacy, assert content loads; visit /nonexistent, assert 404 page

## Definition of Done

- [ ] /about renders real company content (not a placeholder)
- [ ] /policy/cookies and /policy/privacy render correctly
- [ ] Unknown policy slugs return 404
- [ ] /nonexistent URL renders the not-found page with home link
- [ ] All pages have unique title and meta description
- [ ] TypeScript compiles with zero errors, ESLint clean
- [ ] Jest and Playwright tests pass
