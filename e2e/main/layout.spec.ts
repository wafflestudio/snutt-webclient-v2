import { expect, test } from '@playwright/test';

test('학기 목록 드롭다운이 정상 동작한다', async ({ page }) => {
  await page.goto('/');
  const select = page.getByTestId('course-book-select');
  await expect(page).toHaveURL('/');
  await expect(select).toHaveValue('1001-1');
  await select.selectOption({ label: '2001-S' });
  await expect(page).toHaveURL('/?year=2001&semester=2');
});
