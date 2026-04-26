---
work_package_id: WP03
title: Portfolio grid, content pages, form styling
lane: "doing"
dependencies: [WP01]
base_branch: 002-visual-redesign-WP01
base_commit: 0965e3f4b3ce9c9380584af2d4899fe138588941
created_at: '2026-04-26T11:45:17.735160+00:00'
test_file: ''
feature: 002-visual-redesign
shell_pid: "47445"
---

# WP03 — Portfolio grid, content pages, form styling

## Objective

Apply the brand palette to all remaining components and pages: photo-forward portfolio, cream section backgrounds on home page content sections, green accent form styling, and full-width about image on mobile.

## Subtasks

1. `components/PortfolioGrid.tsx`:
   - Hover overlay: reduce from `bg-black/40` to `bg-black/25`
   - Title: `font-display text-base font-semibold` with a `border-b-2 border-forest` accent on hover

2. `components/Services.tsx`:
   - Wrap in `bg-cream` section background
   - Service number/icon: `text-forest font-display text-2xl font-bold`
   - Section heading: `font-display`

3. `components/ProcessSteps.tsx`:
   - Wrap in `bg-cream` section background
   - Step number circles: `bg-forest text-white`
   - Section heading: `font-display`

4. `components/ContactForm.tsx`:
   - Input focus ring: `focus:ring-forest focus:border-forest`
   - Submit button: `bg-forest hover:bg-forest/90 text-white`

5. `app/about/page.tsx`:
   - Image column: remove `md:grid-cols-2` split, make image full-width on mobile with `w-full`
   - Heading: `font-display`

6. `app/portfolio/page.tsx`, `app/contact/page.tsx`, `app/about/page.tsx`:
   - Page `<h1>` elements: add `font-display` class

7. `app/page.tsx` (home):
   - Company intro section: `bg-cream` background
   - Section headings: `font-display`

8. Run all 35 tests — must pass

## Definition of Done

- [ ] Portfolio hover overlay is lighter, title has green underline accent
- [ ] Services and ProcessSteps sit on cream backgrounds with green accents
- [ ] Contact submit button is forest green
- [ ] About image is full-width on mobile
- [ ] All page h1 headings use Playfair Display
- [ ] All tests pass, TypeScript and ESLint clean
