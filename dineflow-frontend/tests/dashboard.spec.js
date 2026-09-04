import { test, expect } from "@playwright/test";

test("user should see dashboard after login", async ({ page }) => {
  // Open login page
  await page.goto("/login");

  // Login
  await page.locator("#email").fill("admin@example.com");
  await page.locator("#password").fill("123456");

  await page.getByRole("button", { name: /Sign In/i }).click();

  // Verify dashboard URL
  await expect(page).toHaveURL(/dashboard/);

  // Verify dashboard heading
  await expect(
    page.getByRole("heading", { name: /dashboard/i })
  ).toBeVisible();
});