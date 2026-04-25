# E2E Test Plan: 001-angular-to-nextjs-migration

## Overview

Automated E2E tests for 6 work packages.

## Test Files

| Work Package | Title | Test File |
|---|---|---|
| WP01 | Shared layout — Header, Footer, root Layout | `WP01-shared-layout-header-footer-root-layout.e2e.js` |
| WP02 | Home page | `WP02-home-page.e2e.js` |
| WP03 | Portfolio grid, detail pages, image migration | `WP03-portfolio-grid-detail-pages-image-migration.e2e.js` |
| WP04 | Contact page and API route stub | `WP04-contact-page-and-api-route-stub.e2e.js` |
| WP05 | About, Policy, and 404 pages | `WP05-about-policy-and-404-pages.e2e.js` |
| WP06 | SEO metadata, Lighthouse audit, final polish | `WP06-seo-metadata-lighthouse-audit-final-polish.e2e.js` |

## Running Tests

```bash
# Run all E2E tests for this feature
polaris runtests --feature 001-angular-to-nextjs-migration

# Run with Playwright directly
npx playwright test tests/e2e/

# Run a specific work package test
npx playwright test tests/e2e/WP01-shared-layout-header-footer-root-layout.e2e.js
```
