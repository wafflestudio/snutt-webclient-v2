import { expect, test } from '@playwright/test';

test('로컬 로그인이 성공적으로 동작한다.', async ({ page }) => {
  await page.goto('/login');
  const id = 'test-id';
  const password = 'test-password';

  await page.getByTestId('id-input').fill(id);
  await page.getByTestId('password-input').fill(password);

  await page.getByTestId('local-signin-button').click();

  await expect(page).toHaveURL('/');
});

test('로컬 로그인 실패시, 에러메시지는 빈 값이 노출되지 않는다.', async ({ page }) => {
  await page.goto('/login');
  const id = 'fail-test-id';
  const password = 'test-password';

  await expect(page.getByTestId('error-message')).toHaveText('');

  await page.getByTestId('id-input').fill(id);
  await page.getByTestId('password-input').fill(password);

  await page.getByTestId('local-signin-button').click();

  await expect(page.getByTestId('error-message')).not.toHaveText('');
});
