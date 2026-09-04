import { test, expect } from "@playwright/test";

test("user should login successfully", async ({ page }) => {
  // 1. Open login page
  await page.goto("/login");

  await page.locator("#email").fill("admin@example.com");

  await page.locator("#password").fill("123456");

  // 4. Click Sign In
  await page.getByRole("button", { name: /Sign In/i }).click();

  // 5. Dashboard should appear
  await expect(page).toHaveURL(/dashboard/);

  // 6. Verify dashboard content
  await expect(page.getByRole("heading", { name: /dashboard/i })).toBeVisible();
});
