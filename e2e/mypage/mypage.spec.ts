import { expect, test } from '@playwright/test';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { givenUser } from '../utils/user.ts';

test('로그인되지 않았으면 로그인으로 리다이렉트된다', async ({ page }) => {
  await page.goto('/mypage');
  await givenUser(page, { login: false });
  await expect(page).toHaveURL('/login');
});

test('ui가 잘 보여진다', async ({ page }) => {
  await page.goto('/mypage');
  await givenUser(page, { login: true });
  await expect(page.getByTestId('mypage-my-id')).toContainText('SNUTT 아이디는 woohm402입니다.');
});
