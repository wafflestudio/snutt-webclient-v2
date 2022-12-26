import { expect, test } from '@playwright/test';

test('ui가 잘 보여진다', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('SNUTT')).toHaveCount(1);
});
