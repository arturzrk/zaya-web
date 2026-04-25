# Project Constitution

**Project**: ZayaDesign
**Date**: 2026-04-25
**Version**: 1.0

---

## Project Identity

- **Name**: ZayaDesign
- **Purpose**: Marketing and portfolio website for Zaya Garden Design company. Presents services, portfolio, ideas, and design work. Future roadmap includes a subscription-based platform for storing garden-related information and offering advice services (user accounts, data persistence, paid tiers).
- **Work Tracking**: GitHub Projects (no Azure DevOps)

---

## Phase 1 — Technical Standards

### Languages & Frameworks

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript strict mode
- **Styling**: Tailwind CSS — mobile-first, utility-first
- **Node.js**: LTS version compatible with Next.js 15
- TypeScript `strict: true` is non-negotiable — no `any`, no type suppression without explicit justification

### Testing

- **Unit/Integration**: Jest + React Testing Library
- **Coverage minimum**: 80% (enforced in CI)
- **E2E**: Playwright
- Tests must pass before any PR can be merged

### Performance

- No formal performance budget defined yet
- Use `next/image` for all images — raw `<img>` tags are not permitted
- Server Components by default; Client Components only when browser APIs or interactivity require it

### Deployment

- **Platform**: Vercel, connected to GitHub
- **Production**: Auto-deploys on merge to `main`
- **Staging**: `PreReleaseZaya` branch deploys to a dedicated staging environment
- **PR Previews**: Every pull request receives an automatic Vercel preview URL
- Environment variables managed via Vercel dashboard (Project → Settings → Environment Variables); never commit secrets

---

## Phase 2 — Code Quality

*(Defaults applied)*

### Pull Request Requirements

- Minimum **1 approval** before merge
- All CI checks must pass (TypeScript, ESLint, Jest, Playwright)
- PR description must explain what changed and why

### Review Checklist

Reviewers should verify:
- TypeScript compiles with zero errors (`tsc --noEmit`)
- ESLint reports zero warnings or errors
- Tests added or updated for changed behaviour
- Mobile viewport considered for any UI change
- No inline `style` props introduced
- No `console.log` left in committed code

### Quality Gates

- `tsc --noEmit` — zero errors
- `eslint` — zero errors, zero warnings
- Jest coverage ≥ 80%
- Playwright E2E suite passes

### Documentation Standards

- No multi-paragraph docstrings or comment blocks
- One-line comments only when the *why* is non-obvious
- README kept up to date for setup and deployment steps

---

## Phase 3 — Tribal Knowledge

### Team Conventions

- **Named exports only** — no default exports anywhere in the codebase
- **No inline `style` props** — use Tailwind utility classes; for component-specific overrides use CSS Modules, not inline styles
- **Small, focused components** — avoid monolithic components; split by responsibility
- **App Router patterns** — all routes in `app/` directory; do not use the Pages Router
- **No Angular patterns** — this project is migrating away from Angular 5; do not introduce Angular conventions, idioms, or file structures

### Lessons Learned

- Monolithic components become hard to maintain and test — keep components small and composable from the start
- Angular 5 patterns (modules, decorators, two-way binding idioms) do not belong here — when in doubt, favour React and Next.js conventions

---

## Phase 4 — Governance

*(Defaults applied)*

### Amending This Constitution

- Propose changes via pull request with a clear rationale in the PR description
- At least one team member must review and approve the amendment
- Amendments take effect on merge to main

### Compliance

- All contributors (human and AI) are expected to follow this constitution
- Reviewers are responsible for checking compliance during PR review

### Exceptions

- Exceptions to any rule are handled case-by-case
- Document the exception and rationale in the PR description
- Do not establish exceptions as precedent without explicit team agreement

---

## License Compliance

All dependencies must use OSI-approved permissive licences.

**Allowed**: Apache-2.0, BSD-2-Clause, BSD-3-Clause, MIT, ISC, PSF-2.0, Unlicense, 0BSD, CC0-1.0

**Prohibited**: LGPL, AGPL, GPL, SSPL, BSL, CPAL, EUPL, MPL-2.0

Check new dependencies with `npx license-checker --onlyAllow 'MIT;Apache-2.0;BSD-2-Clause;BSD-3-Clause;ISC'` before adding them.

---

## Two-Phase Architecture Note

**Phase 1 (current):** Static marketing site — pages, portfolio gallery, contact form.

**Phase 2 (planned):** Subscription platform — authentication, user dashboard, stored garden data, advice services, payment integration.

Design data models and API boundaries with Phase 2 in mind even during Phase 1 work. Do not over-engineer, but do not paint into corners.
