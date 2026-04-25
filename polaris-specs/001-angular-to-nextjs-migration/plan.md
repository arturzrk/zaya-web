# Implementation Plan: Migration of Legacy Angular Site to Next.js

**Branch**: `main` | **Date**: 2026-04-25 | **Spec**: [spec.md](spec.md)
**GitHub**: [#1 — Migration of legacy angular design](https://github.com/arturzrk/zaya-web/issues/1)

## Summary

Migrate the existing Zaya Garden Design Angular 5 marketing site to Next.js 15 (App Router). The migration is a redesign opportunity: all content is preserved, the visual design is modernised with Tailwind CSS, and the result is a fast, SEO-optimised, mobile-first static site. Portfolio data is managed as static TypeScript constants (Phase 1); a backend CMS/API integration is planned as a future enhancement.

## Technical Context

**Language/Version**: TypeScript 5+ (strict mode)
**Framework**: Next.js 15 (App Router), React 19
**Styling**: Tailwind CSS v4 — mobile-first, utility-first
**Storage**: Static TypeScript constants (`lib/projects.ts`, `lib/policies.ts`) — no database in this feature
**Testing**: Jest + React Testing Library (unit/component), Playwright (E2E)
**Target Platform**: Vercel (production), Node.js 20 LTS
**Performance Goals**: Lighthouse mobile >= 85 Performance, >= 90 Accessibility/SEO/Best Practices
**Constraints**: TypeScript strict, named exports only, no default exports, no raw img tags, no inline style props

## Constitution Check

| Rule | Status | Notes |
|---|---|---|
| TypeScript strict | PASS | tsconfig already configured |
| Named exports only | PASS | enforced in all new files |
| No default exports | PASS | enforced in all new files |
| Tailwind classes (no inline styles) | PASS | applied throughout |
| next/image for all images | PASS | raw img tags prohibited |
| No Angular patterns | PASS | fresh Next.js codebase |
| Server Components by default | PASS | Client Components only where needed |
| Mobile-first | PASS | Tailwind sm:/md:/lg: breakpoints |

## Project Structure

```
app/
├── layout.tsx                    # Root layout (Header, Footer)
├── page.tsx                      # Home page
├── not-found.tsx                 # 404 page
├── about/
│   └── page.tsx
├── contact/
│   └── page.tsx
├── portfolio/
│   ├── page.tsx                  # Portfolio grid
│   └── [slug]/
│       └── page.tsx              # Portfolio detail
├── policy/
│   └── [slug]/
│       └── page.tsx
└── api/
    └── contact/
        └── route.ts              # Contact form stub

components/
├── Header.tsx
├── Footer.tsx
├── Hero.tsx
├── ProcessSteps.tsx
├── Services.tsx
├── PortfolioGrid.tsx
├── ProjectGallery.tsx
└── ContactForm.tsx

lib/
├── projects.ts                   # Static portfolio data
└── policies.ts                   # Static policy content

public/
└── images/
    └── portfolio/                # Migrated from Angular assets
```

## Work Packages

| WP | Title | Dependencies | Lane |
|---|---|---|---|
| WP01 | Shared layout — Header, Footer, root Layout | — | planned |
| WP02 | Home page | WP01 | planned |
| WP03 | Portfolio grid, detail pages, image migration | WP01 | planned |
| WP04 | Contact page and API route stub | WP01 | planned |
| WP05 | About, Policy, and 404 pages | WP01 | planned |
| WP06 | SEO metadata, Lighthouse audit, final polish | WP02–WP05 | planned |

## Future Enhancements (out of scope)

- **Backend CMS/API for portfolio data**: Replace static `lib/projects.ts` with API calls to a headless CMS or custom backend. Planned for Phase 2 subscription platform work.
- **Contact form email delivery**: Wire `app/api/contact/route.ts` to an email service (Resend or SendGrid).
- **Subscription platform**: User accounts, garden data storage, advice services.