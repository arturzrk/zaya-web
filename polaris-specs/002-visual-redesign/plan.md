# Implementation Plan: Bold Garden Brand Visual Redesign

**Branch**: `002-visual-redesign` | **Date**: 2026-04-26 | **Spec**: spec.md

## Summary

Restyle the Zaya Design Next.js site with a bold garden brand identity: forest green accent (#2D5A27), Playfair Display serif headings, cream section backgrounds, transparent-to-opaque scrolling header, and a photo-forward portfolio grid. All 35 existing tests must continue to pass; no routes or content change.

## Technical Context

**Language/Version**: TypeScript 5+ / Next.js 15 App Router
**Primary Dependencies**: Tailwind CSS v4, next/font/google (Inter + Playfair Display)
**Storage**: N/A
**Testing**: Jest + React Testing Library (35 tests)
**Target Platform**: Vercel (web)
**Performance Goals**: Lighthouse performance >= 85, accessibility >= 90
**Constraints**: No new npm packages beyond google fonts; no JS animation libraries
**Scale/Scope**: ~10 components, 7 routes

## Constitution Check

- Named exports only (except Next.js route files) ✓
- No inline styles — Tailwind utility classes only ✓
- TypeScript strict ✓
- Mobile-first responsive ✓

## Project Structure

```
app/
├── layout.tsx          # Add Playfair Display font, update body bg to cream
├── globals.css         # CSS custom properties for brand colours
├── page.tsx            # Update hero + section backgrounds
├── portfolio/page.tsx  # Photo-forward grid update
├── about/page.tsx      # Full-width image on mobile
└── contact/page.tsx    # Green accent on form + button

components/
├── Header.tsx          # Transparent → opaque scroll behaviour
├── Hero.tsx            # Full-vh, large serif headline, green CTA
├── Footer.tsx          # Deep charcoal/green background
├── PortfolioGrid.tsx   # Larger tiles, minimal overlay
├── Services.tsx        # Cream section background, green accent icons
├── ProcessSteps.tsx    # Warm background, green step numbers
└── ContactForm.tsx     # Green border inputs, green submit button

tailwind.config.ts      # Extend theme: brand colours + Playfair Display font family
```

## Work Packages

| ID | Title | Scope |
|----|-------|-------|
| WP01 | Design tokens, fonts, global styles | tailwind.config.ts, globals.css, layout.tsx |
| WP02 | Header, Hero, Footer redesign | Header.tsx, Hero.tsx, Footer.tsx |
| WP03 | Portfolio grid and content pages | PortfolioGrid.tsx, about/page.tsx, contact/page.tsx, Services.tsx, ProcessSteps.tsx |
