# Spec: Migration of Legacy Angular Site to Next.js

**Feature**: 001-angular-to-nextjs-migration
**GitHub**: [#1 — Migration of legacy angular design](https://github.com/arturzrk/zaya-web/issues/1)
**Status**: Draft
**Date**: 2026-04-25

---

## Overview

Zaya Garden Design currently runs a marketing and portfolio website built on Angular 5 (2018). The site will be fully migrated to Next.js 15 and treated as a redesign opportunity: all content and brand identity are preserved, but the visual design, layout, and mobile experience are modernised using Tailwind CSS.

The result is a fast, SEO-optimised, mobile-first static marketing site ready for future extension into a subscription-based platform.

---

## User Scenarios

### US-01 — Visitor discovers Zaya on a phone
A prospective client finds the site via Google on their mobile device. They land on the home page, see a full-screen hero image, read a short company introduction, and scroll through the 3 service areas. The page loads quickly and the layout adapts cleanly to their screen.

### US-02 — Visitor browses the portfolio
A visitor navigates to the Portfolio page, sees a responsive image grid of completed projects, clicks on a project tile, and views a full-screen photo gallery for that project with a description.

### US-03 — Visitor sends an enquiry
A visitor on the Contact page fills in their name, email, subject, and message, then submits the form. They receive on-screen confirmation that their message was sent. No CAPTCHA is shown.

### US-04 — Visitor reads about the company
A visitor navigates to the About page and reads about the team, background, and philosophy of Zaya Garden Design.

### US-05 — Visitor lands on a non-existent URL
A visitor follows a broken link. They see a friendly 404 page that offers navigation back to the home page.

### US-06 — Visitor reads the privacy or cookie policy
A visitor clicks a footer link and views the relevant policy page in plain, readable text.

---

## Functional Requirements

### Navigation & Layout
- FR-01: Every page has a consistent header with the Zaya logo and navigation links (Home, Portfolio, Contact, About).
- FR-02: Every page has a consistent footer with contact details, social media links (Facebook, Instagram), and links to policy pages.
- FR-03: Navigation is fully usable on mobile viewports (hamburger or equivalent pattern).
- FR-04: The site renders without JavaScript (server-rendered HTML).

### Home Page
- FR-05: The home page displays a hero section with at least one full-width image and a call-to-action.
- FR-06: The home page displays a company introduction section with text and a primary photo.
- FR-07: The home page displays a 6-step project process section.
- FR-08: The home page displays a 3-column services section (Garden Design, Interior Design, Execution Team).

### Portfolio
- FR-09: The Portfolio page displays all projects as a responsive image grid.
- FR-10: Each portfolio tile links to a dedicated project detail page.
- FR-11: The Portfolio Detail page displays the project's images in a gallery/lightbox layout with a project description.
- FR-12: All 100+ existing portfolio images are accessible at stable URLs.

### Contact
- FR-13: The Contact page displays a form with fields: full name, email address, subject, message.
- FR-14: The form validates all fields client-side before submission (required, valid email format).
- FR-15: On successful submission, the user sees a confirmation message without a full page reload.
- FR-16: On submission failure, the user sees an error message and their input is preserved.
- FR-17: No CAPTCHA or bot-prevention mechanism is shown to the user.
- FR-18: The contact form submits to a Next.js API route (`/api/contact`). The route is implemented as a stub that accepts the request and returns a success response; email delivery is out of scope for this feature.
- FR-19: The Contact page also displays the company phone number, address, and social links.

### About
- FR-20: The About page contains meaningful content about the Zaya Garden Design team and philosophy (not a placeholder).

### Policy Pages
- FR-21: Cookie policy and privacy policy are available as separate pages, linked from the footer.

### 404
- FR-22: Any unmatched URL renders a 404 page with a link back to the home page.

### SEO & Performance
- FR-23: Every page has a unique title and meta description tag.
- FR-24: All images use lazy loading and are served in a modern format (WebP where supported).
- FR-25: The site is crawlable by search engines (server-rendered HTML for all content pages).

---

## Success Criteria

- SC-01: All 7 routes (/, /portfolio, /portfolio/[id], /contact, /about, /policy/[id], /not-found) return HTTP 200 and render meaningful content.
- SC-02: Google Lighthouse mobile score >= 85 on Performance, >= 90 on Accessibility, >= 90 on Best Practices, >= 90 on SEO for the home page.
- SC-03: The contact form submits successfully and displays a confirmation message (stub response accepted).
- SC-04: All existing portfolio project images load correctly on Portfolio Detail pages.
- SC-05: The site layout is fully usable on a 375px-wide viewport without horizontal scrolling.
- SC-06: TypeScript compiles with zero errors and ESLint reports zero warnings.

---

## Key Entities

| Entity | Description |
|---|---|
| **Project** | A portfolio item with a slug, title, description, cover image, and a collection of gallery images |
| **Service** | One of the three service offerings (Garden Design, Interior Design, Execution Team) |
| **ContactSubmission** | A user-submitted enquiry with name, email, subject, and message |
| **PolicyPage** | A static content page identified by a slug (e.g., cookies, privacy) |

---

## Out of Scope

- Email delivery from the contact form (deferred to a future feature)
- User authentication or accounts
- Subscription or payment features
- CMS integration
- Google reCAPTCHA or any bot-prevention mechanism
- Admin panel or content management
- Blog or news section
- Multi-language support

---

## Assumptions

- Portfolio project data (slugs, titles, descriptions, image lists) will be defined as static JSON or TypeScript constants in the codebase; no external CMS is used.
- About page content will be provided by the team before implementation; a reasonable placeholder is acceptable in the interim.
- Social media URLs (Facebook, Instagram) from the existing Angular site are still current.
- The existing Angular site remains live during migration; no DNS cutover is in scope here.

---

## Constraints

- All code must follow the project constitution: TypeScript strict, named exports only, no default exports, no inline style props, Tailwind classes for styling.
- No Angular patterns, idioms, or file structures may be introduced.
- All images must use next/image — no raw img tags.