import { expect, test } from '@playwright/test';

test('ui가 잘 보여진다', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByText('로그인')).toHaveCount(2);
});
