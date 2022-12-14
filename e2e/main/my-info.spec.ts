import { expect, test } from '@playwright/test';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { givenUser } from '../utils/user.ts';

test('로그인했으면 내 정보가 보여진다', async ({ page }) => {
  await page.goto('/');
  await givenUser(page, { login: true });
  const myInfoLink = page.getByTestId('layout-my-info');
  await expect(myInfoLink).toHaveText('woohm402님');
  await myInfoLink.click();
  await expect(page).toHaveURL('/mypage');
});

test('로그인 안했으면 로그인 정보가 보여진다', async ({ page }) => {
  await page.goto('/');
  await givenUser(page, { login: false });
  const myInfoLink = page.getByTestId('layout-my-info');
  await expect(myInfoLink).toHaveText('로그인');
  await myInfoLink.click();
  await expect(page).toHaveURL('/login');
});
