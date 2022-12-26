import { expect, test } from "@playwright/test";

test("ui가 잘 보여진다", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("main")).toHaveCount(1);
});
