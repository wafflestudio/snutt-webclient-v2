import { expect, test } from '@playwright/test';

import { givenUser } from '../../utils/user';

test('로그인되지 않았으면 로그인으로 리다이렉트된다', async ({ page }) => {
  await page.goto('/mypage');
  await givenUser(page, { login: false });
  await expect(page).toHaveURL('/login');
});
