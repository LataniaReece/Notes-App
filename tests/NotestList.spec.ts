import { test, expect } from "@playwright/test";

test("clicking on note should open it in view", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.locator('[data-testid="notes-list"] > :first-child').click();
  const viewNote = page.getByTestId("view-note-wrapper");
  expect(viewNote).toBeVisible();

  const noteTitleInput = page.getByTestId("note-title-input");
  expect(noteTitleInput).toHaveValue("Exploration Ideas");
});

test("Clicking 'My Notes' button should close viewNote", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.locator('[data-testid="notes-list"] > :first-child').click();
  const viewNote = page.getByTestId("view-note-wrapper");
  expect(viewNote).toBeVisible();

  const noteTitleInput = page.getByTestId("note-title-input");
  expect(noteTitleInput).toHaveValue("Exploration Ideas");

  await page.locator('[data-testid="view-notes-button"]').click();

  expect(viewNote).not.toBeVisible();
});
