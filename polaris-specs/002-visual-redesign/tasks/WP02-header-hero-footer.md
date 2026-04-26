---
work_package_id: WP02
title: Header, Hero, Footer redesign
lane: "planned"
dependencies: ["WP01"]
base_branch: main
feature: 002-visual-redesign
test_file: ""
---

# WP02 — Header, Hero, Footer redesign

## Objective

Restyle the three structural components that frame every page. The header should dissolve into the hero and solidify on scroll; the hero should be bold and typographically expressive; the footer should provide strong visual closure with a dark background.

## Subtasks

1. `components/Header.tsx`:
   - Add `useEffect` scroll listener: apply `bg-white shadow-sm` when `scrollY > 60`, remove when at top
   - Active nav link: `text-forest font-semibold` instead of stone underline
   - Mobile menu background: `bg-cream`, links use `text-charcoal hover:text-forest`
   - Logo/brand text: `font-display` (Playfair Display)

2. `components/Hero.tsx`:
   - Container: `min-h-screen` (full viewport height)
   - Headline: `font-display text-5xl md:text-7xl font-bold text-white leading-tight`
   - Overlay: `bg-black/50` (slightly darker for text legibility)
   - Primary CTA: `bg-forest hover:bg-forest/90 text-white` rounded button
   - Secondary CTA: `border-2 border-white text-white hover:bg-white/10` ghost button

3. `components/Footer.tsx`:
   - Background: `bg-charcoal text-white`
   - Link hovers: `hover:text-forest` transition
   - Divider: `border-white/10`

4. Verify WCAG AA — white on `bg-forest` (#2D5A27) contrast ratio check
5. Run all 35 tests — must pass

## Definition of Done

- [ ] Header transparent on load, opaque on scroll
- [ ] Hero is full viewport height with Playfair Display headline
- [ ] Primary CTA is forest green, secondary is ghost
- [ ] Footer background is charcoal (#1C1C1C)
- [ ] All tests pass, TypeScript and ESLint clean
