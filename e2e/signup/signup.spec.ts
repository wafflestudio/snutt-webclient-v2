import { expect, test } from '@playwright/test';

test('ui가 잘 보여진다', async ({ page }) => {
  await page.goto('/signup');
  await expect(page.getByText('회원가입')).toHaveCount(1);
});
