# Control Map — 001-angular-to-nextjs-migration

## Flows

| Flow | Purpose | Key Files |
|------|---------|-----------|
| Home | Marketing landing page | app/page.tsx, components/Hero.tsx, components/Services.tsx, components/ProcessSteps.tsx |
| Portfolio Grid | Browse all projects | app/portfolio/page.tsx, components/PortfolioGrid.tsx |
| Portfolio Detail | View single project gallery | app/portfolio/[slug]/page.tsx, components/ProjectGallery.tsx |
| Contact | Send enquiry form | app/contact/page.tsx, components/ContactForm.tsx, app/api/contact/route.ts |
| About | Company information | app/about/page.tsx |
| Policy | Static policy pages | app/policy/[slug]/page.tsx |
| 404 | Not found fallback | app/not-found.tsx |

## Shared Dependencies

| Component | Used By | Path |
|-----------|---------|------|
| Header | All pages | components/Header.tsx |
| Footer | All pages | components/Footer.tsx |
| Layout | All pages | app/layout.tsx |
| Project data | Portfolio Grid, Portfolio Detail | lib/projects.ts |
| Policy data | Policy pages, Footer | lib/policies.ts |
