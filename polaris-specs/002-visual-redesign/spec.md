# Spec: Bold Garden Brand Visual Redesign

**Feature**: 002-visual-redesign
**Status**: Planned

---

## Overview

Redesign the visual identity of the Zaya Design website from a minimal neutral palette to a bold, confident garden brand aesthetic. The site must feel like it belongs to a premium design studio — photo-led, typographically expressive, and immediately recognisable as a garden and interior design company.

## User Scenarios

1. **First-time visitor** lands on the home page and immediately understands Zaya is a premium garden design studio — the hero image, large headline, and green accent colour communicate craft and nature before any text is read.
2. **Potential client** browses the portfolio and finds images are the primary focus — the grid is photo-forward with minimal chrome, and hovering reveals just enough context to invite a click.
3. **Mobile visitor** sees a layout that adapts gracefully — typography scales down elegantly, full-bleed sections remain impactful, and the navigation is thumb-friendly.
4. **Returning visitor** notices the site has a consistent, recognisable colour palette throughout — greens and warm neutrals that reinforce the brand across every page.

## Functional Requirements

- FR-01: The hero section displays a full-viewport-height background image with a large, bold headline overlaid in white.
- FR-02: A deep forest green (#2D5A27 or close) is applied as the primary accent: CTA buttons, active nav links, hover states, and section dividers.
- FR-03: Headings use a serif display typeface (Playfair Display) to convey craft and heritage; body text remains in Inter.
- FR-04: Section backgrounds alternate between pure white and a warm cream (#FAF7F2) to create rhythm without borders.
- FR-05: The portfolio grid is photo-forward — larger tiles, minimal hover overlay (title only), 2 columns on tablet, 3 on desktop.
- FR-06: The navigation header is transparent over the hero and transitions to an opaque background on scroll.
- FR-07: Primary buttons use green accent with white text; ghost buttons use green border with green text.
- FR-08: The footer uses a deep charcoal or forest green background with white text.
- FR-09: All colour choices meet WCAG AA contrast (4.5:1 body text, 3:1 large text).
- FR-10: Contact form fields and submit button adopt the green accent styling.
- FR-11: All existing functionality continues to work correctly after the redesign.

## Success Criteria

- SC-01: A first-time visitor identifies the site as a garden/nature design studio within 3 seconds of landing.
- SC-02: The green accent appears consistently on every page (nav, CTA button, footer).
- SC-03: Portfolio images display at minimum 4:3 aspect ratio without distortion.
- SC-04: Lighthouse accessibility score remains >= 90.
- SC-05: All 35 existing Jest tests continue to pass.
- SC-06: Site renders correctly at 375px, 768px, and 1280px+ viewports.

## Key Entities

- **Colour palette**: forest green #2D5A27, cream #FAF7F2, charcoal #1C1C1C, warm stone #A8967E, white
- **Typography**: Playfair Display (headings) + Inter (body)
- **Components affected**: Header, Hero, Footer, PortfolioGrid, Services, ProcessSteps, ContactForm, About page, all page layouts

## Out of Scope

- New pages or routes
- Content changes (copy, images, projects data)
- Backend or API changes
- JavaScript-driven scroll animation libraries
- Dark mode

## Assumptions

- Tailwind CSS is already installed; custom colours added via theme extension.
- Playfair Display loaded via next/font/google alongside existing Inter.
- Vercel preview URL used for review before merging to main.
