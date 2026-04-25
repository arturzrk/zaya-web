import { test, expect } from '@playwright/test';

test.describe('WP02: Home page', () => {
  test('should complete Home page', async ({ page }) => {
    await page.goto('/');
    // Verify the page shows "on /"
    // Verify All images use `next/image`
    // Verify Page has unique title and meta description
    // Verify Layout is usable at 375px width without horizontal scrolling
    // Verify TypeScript compiles with zero errors
    // Verify Jest component tests pass
    // Verify Playwright E2E test passes
    // Verify no JavaScript errors
  });
});
