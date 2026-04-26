---
work_package_id: WP01
title: Design tokens, fonts, global styles
lane: "planned"
dependencies: []
base_branch: main
feature: 002-visual-redesign
test_file: ""
---

# WP01 — Design tokens, fonts, global styles

## Objective

Establish the full design token foundation: Playfair Display font, brand colour palette in Tailwind, CSS custom properties, and cream body background. Everything downstream (WP02, WP03) builds on this.

## Subtasks

1. Add `Playfair_Display` to `next/font/google` in `app/layout.tsx`, expose as `--font-display` CSS variable
2. Extend `tailwind.config.ts` theme:
   - `colors.forest`: `#2D5A27`
   - `colors.cream`: `#FAF7F2`
   - `colors.charcoal`: `#1C1C1C`
   - `colors['stone-warm']`: `#A8967E`
   - `fontFamily.display`: Playfair Display variable
   - `fontFamily.sans`: Inter variable (already exists, ensure variable wired)
3. Update `app/globals.css` with CSS custom properties mirroring the palette
4. Update `app/layout.tsx` body: `bg-cream` background, pass both font variables to `<html>`
5. Run all 35 tests — must pass unchanged

## Definition of Done

- [ ] `tailwind.config.ts` has all 4 brand colours and 2 font families
- [ ] `layout.tsx` loads Playfair Display, body has cream background
- [ ] `npm run typecheck` clean
- [ ] `npm run lint` clean
- [ ] All 35 Jest tests pass
