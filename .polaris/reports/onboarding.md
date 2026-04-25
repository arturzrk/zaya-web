# Onboarding Report

**Date**: 2026-04-25
**Project**: ZayaDesign

## Analysis Summary

- **Path**: `/Users/artur/Projects/javascript/ZayaDesign`
- **Detected type**: TypeScript (Angular 5 — legacy, migration planned)
- **VCS**: git, branch `PreReleaseZaya`
- **Polaris**: Already initialized at v2026.4.1
- **Tests**: None detected
- **CI/CD**: None detected
- **Health grade**: A (8.0/10)

## Discovery Findings

| Topic | Answer |
|---|---|
| Purpose | Marketing & portfolio site for Zaya Garden Design company |
| Future roadmap | Subscription platform: user accounts, garden data storage, advice services |
| Workflow | Feature branches → PRs → merge to main (`PreReleaseZaya`) |
| AI agents | `claude`, `copilot` |
| TypeScript | Strict mode required |
| CSS approach | Mobile-first responsive (Tailwind CSS) |
| Deployment | Vercel (new to team — zero-config with GitHub integration) |
| Branding | Project-specific (not Aptean AppCentral) |

## Tech Stack Decision

Migrating from Angular 5 → **Next.js 15 (App Router) + React 19 + Tailwind CSS**.

Rationale: The project has a two-phase roadmap — static marketing site now, subscription app later. Next.js handles both phases with the same codebase (SSG for marketing pages, server-side for app features). Vercel is the natural deployment target with zero-config integration.

## Configuration Applied

- **Agents**: `claude`, `copilot`
- **Mission**: `software-dev`
- **VCS**: git
- **Aptean branding**: No (client-facing product)

## Files Created

- `.polaris/memory/constitution.md` — Project governing principles and tech stack
- `.polaris/reports/onboarding.md` — This report

## Next Steps

1. **Review the constitution** at `.polaris/memory/constitution.md` — adjust any principles that don't fit
2. **Plan the migration** — run `/polaris.specify` to define the Angular → Next.js migration as a feature
3. **Set up Vercel** — create a free account at vercel.com, import the GitHub repo, it auto-detects Next.js
4. **Run `polaris dashboard`** to launch the task dashboard
5. **Share `.polaris/`** with your team via git — it's already tracked
