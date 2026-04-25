---
work_package_id: WP01
title: Shared layout — Header, Footer, root Layout
lane: planned
dependencies: []
test_status: pending
test_file: tests/e2e/WP01-shared-layout-header-footer-root-layout.e2e.js
domain: frontend-craft
feature: 001-angular-to-nextjs-migration
---

# WP01 — Shared layout: Header, Footer, root Layout

## Objective

Build the shell that wraps every page: the root Next.js layout, responsive header with navigation, and footer with contact details, social links, and policy page links. All subsequent WPs depend on this.

## Subtasks

1. Create `lib/types.ts` with all TypeScript interfaces from `data-model.md`
2. Create `app/layout.tsx` — root layout importing Header and Footer, sets global font and base Tailwind styles
3. Build `components/Header.tsx`:
   - Zaya logo (text or SVG)
   - Navigation links: Home, Portfolio, Contact, About
   - Mobile hamburger menu (toggle, no JS framework)
   - Active link highlight using Next.js `usePathname`
4. Build `components/Footer.tsx`:
   - Company address and phone number
   - Facebook and Instagram icon links
   - Links to /policy/cookies and /policy/privacy
   - Copyright line
5. Apply mobile-first responsive layout (hamburger on mobile, inline nav on md+)
6. Write Jest + RTL unit tests for Header and Footer (renders links, toggles mobile menu)
7. Write Playwright E2E smoke test: visit /, assert header and footer are visible

## Definition of Done

- [ ] `app/layout.tsx` wraps every page with Header and Footer
- [ ] Header navigation links render correctly on desktop and mobile
- [ ] Mobile hamburger toggles the nav without page reload
- [ ] Footer displays address, phone, social links, and policy links
- [ ] TypeScript compiles with zero errors
- [ ] ESLint reports zero warnings
- [ ] Jest tests pass for Header and Footer
- [ ] Playwright smoke test passes
