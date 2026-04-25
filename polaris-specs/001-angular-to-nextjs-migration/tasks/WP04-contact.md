---
work_package_id: WP04
title: Contact page and API route stub
lane: planned
dependencies: []
test_status: pending
test_file: tests/e2e/WP04-contact-page-and-api-route-stub.e2e.js
domain: api-design
feature: 001-angular-to-nextjs-migration
---

# WP04 — Contact page and API route stub

## Objective

Build the contact page with a validated enquiry form and a Next.js API route stub that accepts submissions and returns success. No email delivery in this WP.

## Subtasks

1. Build `app/api/contact/route.ts`:
   - POST handler accepting `{ name, email, subject, message }`
   - Validates all fields server-side (required, valid email)
   - Returns `{ success: true }` — no email sent (stub)
   - Returns `{ success: false, error: string }` on validation failure
2. Build `components/ContactForm.tsx` (Client Component):
   - Fields: full name, email address, subject, message (all required)
   - Client-side validation before submit (required + email format)
   - Submits via `fetch` to `/api/contact`
   - Shows inline success message on 200 response (no page reload)
   - Shows error message on failure, preserves user input
   - No CAPTCHA
3. Build `app/contact/page.tsx`:
   - Renders ContactForm
   - Displays company phone, address, Facebook and Instagram links alongside the form
   - Set page metadata
4. Write Jest + RTL tests for ContactForm:
   - Renders all fields
   - Shows validation errors when submitting empty
   - Shows success message on successful mock fetch response
5. Write Playwright E2E: fill and submit the contact form, assert success message

## Definition of Done

- [ ] Form renders all four fields with no CAPTCHA
- [ ] Client-side validation prevents empty/invalid submissions
- [ ] Successful submission shows confirmation without page reload
- [ ] Failed submission shows error and preserves input
- [ ] API route validates and returns correct responses
- [ ] Contact details (phone, address, socials) displayed on page
- [ ] TypeScript compiles with zero errors, ESLint clean
- [ ] Jest and Playwright tests pass
