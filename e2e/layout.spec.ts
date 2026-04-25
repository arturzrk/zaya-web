import { test, expect } from "@playwright/test";

test("test_layout_header_and_footer_visible_on_home", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
});

test("test_header_nav_links_present", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Portfolio" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Contact" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "About" }).first()).toBeVisible();
});
