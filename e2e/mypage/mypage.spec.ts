import { expect, test } from '@playwright/test';

test('ui가 잘 보여진다', async ({ page }) => {
  await page.goto('/mypage');
  await expect(page.getByText('mypage')).toHaveCount(1);
});
