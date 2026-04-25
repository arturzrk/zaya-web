# Tasks — 001-angular-to-nextjs-migration

**Feature**: Migration of Legacy Angular Site to Next.js
**GitHub**: [#1](https://github.com/arturzrk/zaya-web/issues/1)

## Work Package Summary

| WP | Title | Dependencies | Lane |
|---|---|---|---|
| [WP01](tasks/WP01-shared-layout.md) | Shared layout — Header, Footer, root Layout | — | planned |
| [WP02](tasks/WP02-home-page.md) | Home page | WP01 | planned |
| [WP03](tasks/WP03-portfolio.md) | Portfolio grid, detail pages, image migration | WP01 | planned |
| [WP04](tasks/WP04-contact.md) | Contact page and API route stub | WP01 | planned |
| [WP05](tasks/WP05-static-pages.md) | About, Policy, and 404 pages | WP01 | planned |
| [WP06](tasks/WP06-seo-polish.md) | SEO metadata, Lighthouse audit, final polish | WP02, WP03, WP04, WP05 | planned |

## Implementation Order

```
WP01 (layout shell)
  ├── WP02 (home page)
  ├── WP03 (portfolio)
  ├── WP04 (contact)
  └── WP05 (about, policy, 404)
        └── WP06 (SEO + polish) ← depends on WP02–WP05
```

WP02–WP05 can be implemented in parallel once WP01 is done.
