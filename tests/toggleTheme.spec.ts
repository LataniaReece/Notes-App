import { test, expect } from "@playwright/test";

test("toggle theme mode applies and unapplies dark styles", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");

  await page.locator('[data-testid="toggle-theme-button"]').click();

  await expect(page.locator("html")).toHaveClass(/dark/);

  await page.locator('[data-testid="toggle-theme-button"]').click();

  await expect(page.locator("html")).not.toHaveClass(/dark/);
});
