import { expect, test } from '@playwright/test';

test('학기 목록 드롭다운이 정상 동작한다', async ({ page }) => {
  await page.goto('/');
  const select = page.getByTestId('course-book-select');
  await expect(page).toHaveURL('/');
  await expect(select).toHaveValue('1001-1');
  await select.selectOption({ label: '2001-S' });
  await expect(page).toHaveURL('/?year=2001&semester=2');
});

test('필터 모달이 정상 동작한다', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('layout-searchbar-filter-button').click();
  await expect(page.getByText('상세조건 설정')).toHaveCount(1);
});

test('시간대 선택 기능이 정상 동작한다', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('layout-searchbar-filter-button').click();
  await page.getByTestId('layout-searchbar-filter-dialog-form-time-check').click();
  await page.getByTestId('layout-searchbar-filter-dialog-form-time-radio-manual').click();
  await page.getByTestId('layout-searchbar-filter-dialog-form-time-manual-button').click();
});

test('검색 기능이 정상 동작한다', async ({ page }) => {
  await page.goto('/');
  // TODO:
});
