# Discovery Notes — 001-angular-to-nextjs-migration

## Intent Summary
Migrate all pages and content from the existing Angular 5 ZayaDesign site to the new Next.js 15 codebase. The migration is treated as a redesign opportunity — modernised layout, mobile-first Tailwind CSS, improved typography — while preserving all content and brand identity.

## Q&A

**Q1 Scope**: Migrate all pages (Home, Portfolio, Portfolio Detail, Contact, About, Policy, 404)?
**A**: Yes, all pages. About page should be a real page, not a placeholder.

**Q2 Contact form backend**: What replaces localhost:5000/api/main/SendMail?
**A**: Decide later — form UI complete, API route stubbed.

**Q3 Design fidelity**: Pixel-perfect or redesign opportunity?
**A**: Redesign opportunity — modernise layout, typography, mobile experience.

**Q4 reCAPTCHA**: Keep or remove?
**A**: Remove entirely.

**Q5 Tracker & estimate**: GitHub issue and estimate?
**A**: https://github.com/arturzrk/zaya-web/issues/1 — "Migration of legacy angular design". No estimate provided.

## Existing Site Inventory
- 7 routes: /, /portfolio, /portfolio/:id, /contact, /about, /policy/:id, 404
- Key sections: hero slider, intro, 6-step process, 3-column services, portfolio grid, contact form, footer
- External: Google reCAPTCHA (to be removed), contact API at localhost:5000 (to be stubbed)
- Assets: 100+ portfolio images across multiple project folders
