import { expect, test } from '@playwright/test';

test('학기 목록 드롭다운이 정상 동작한다', async ({ page }) => {
  await page.goto('/');
  const select = page.getByTestId('course-book-select');
  await expect(page).toHaveURL('/');
  await expect(select).toHaveValue('1001-1');
  await select.selectOption({ label: '2001-S' });
  await expect(page).toHaveURL('/?year=2001&semester=2');
  await expect(page.getByTestId('main-searchbar-input')).toHaveAttribute(
    'placeholder',
    '원하는 강의를 검색하세요. (수강편람 최근 업데이트: 2022. 12. 28)',
  );
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

test('검색 폼이 잘 보여진다', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('교양')).toHaveCount(1);
  await expect(page.getByText('영어진행 강의')).toHaveCount(1);
  await expect(page.getByText('시간대 검색')).toHaveCount(2);
});

test('검색 기능이 정상 동작한다', async ({ page }) => {
  await page.goto('/');
  // TODO:
});
