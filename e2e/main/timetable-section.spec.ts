import { expect, test } from '@playwright/test';

test('시간표 목록 탭이 정상 동작한다 (시간표 2개인 학기)', async ({ page }) => {
  await page.goto('/');
  const tabs = page.getByTestId('mt-tab');
  await expect(tabs).toHaveCount(2);
  const tab1 = tabs.filter({ hasText: '나의 시간표' });
  const tab2 = tabs.filter({ hasText: '나무의 시간표' });
  await expect(tab1).toHaveAttribute('aria-selected', `${true}`);
  await expect(tab2).toHaveAttribute('aria-selected', `${false}`);
  await tab2.click();
  await expect(tab1).toHaveAttribute('aria-selected', `${false}`);
  await expect(tab2).toHaveAttribute('aria-selected', `${true}`);
});

test('시간표 목록 탭이 정상 동작한다 (시간표 1개인 학기)', async ({ page }) => {
  await page.goto('/?year=2001&semester=2');
  const tabs = page.getByTestId('mt-tab');
  await expect(tabs).toHaveCount(1);
  const tab1 = tabs.filter({ hasText: '나비의 시간표' });
  await expect(tab1).toHaveAttribute('aria-selected', `${true}`);
});

test('시간표 목록 탭이 정상 동작한다 (시간표 없는 학기)', async ({ page }) => {
  await page.goto('/?year=3001&semester=4');
  const tabs = page.getByTestId('mt-tab');
  await expect(tabs).toHaveCount(0);
});
