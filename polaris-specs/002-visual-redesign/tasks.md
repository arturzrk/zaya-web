# Tasks: Bold Garden Brand Visual Redesign

## WP Summary

| ID | Title | Lane | Dependencies |
|----|-------|------|-------------|
| WP01 | Design tokens, fonts, global styles | planned | — |
| WP02 | Header, Hero, Footer redesign | planned | WP01 |
| WP03 | Portfolio grid, content pages, form styling | planned | WP01 |

---

## WP01 — Design tokens, fonts, global styles

### Subtasks
- [ ] Add Playfair Display to `next/font/google` in `app/layout.tsx` alongside Inter
- [ ] Extend `tailwind.config.ts` with brand colours: `forest` (#2D5A27), `cream` (#FAF7F2), `charcoal` (#1C1C1C), `stone-warm` (#A8967E)
- [ ] Add `fontFamily.display` (Playfair Display) and `fontFamily.sans` (Inter) to Tailwind theme
- [ ] Update `app/globals.css` with CSS custom properties for brand colours
- [ ] Set `app/layout.tsx` body background to cream, update font variable passing
- [ ] Verify all 35 existing tests still pass

### Definition of Done
- [ ] `tailwind.config.ts` has all brand colours and font families
- [ ] `layout.tsx` loads Playfair Display and applies cream background
- [ ] No TypeScript errors, no ESLint warnings
- [ ] All 35 tests pass

---

## WP02 — Header, Hero, Footer redesign

### Subtasks
- [ ] `Header.tsx`: transparent background when at top of page (scroll listener), transitions to cream/white on scroll; active link uses forest green; mobile menu styled with green accent
- [ ] `Hero.tsx`: full-viewport-height (`min-h-screen`), large Playfair Display headline (`text-5xl md:text-7xl`), white text over dark image overlay, green CTA button primary, ghost secondary button
- [ ] `Footer.tsx`: deep charcoal (`#1C1C1C`) background, white text, forest green hover states on links
- [ ] Verify WCAG AA contrast on all new colour combinations
- [ ] All 35 tests pass

### Definition of Done
- [ ] Header is transparent over hero, opaque on scroll
- [ ] Hero has full-height display with large serif headline
- [ ] Footer is charcoal with white text
- [ ] Tests pass, TypeScript and ESLint clean

---

## WP03 — Portfolio grid, content pages, form styling

### Subtasks
- [ ] `PortfolioGrid.tsx`: larger tiles, hover overlay shows title only (no heavy black fill), green underline accent on title
- [ ] `Services.tsx`: cream section background, forest green accent on service icons/numbers
- [ ] `ProcessSteps.tsx`: warm cream background, forest green step-number circles
- [ ] `app/contact/page.tsx` + `ContactForm.tsx`: green ring on focused inputs, green submit button
- [ ] `app/about/page.tsx`: full-width image on mobile (remove grid split below `md:`)
- [ ] `app/portfolio/page.tsx`: update section headings to Playfair Display class
- [ ] All 35 tests pass

### Definition of Done
- [ ] Portfolio grid is photo-forward with minimal overlay
- [ ] Services and process sections use cream backgrounds and green accents
- [ ] Contact form submit button is forest green
- [ ] About page image is full-width on mobile
- [ ] Tests pass, TypeScript and ESLint clean
