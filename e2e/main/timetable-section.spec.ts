import { expect, test } from '@playwright/test';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { givenUser } from '../utils/user.ts';

test('로그인되었을 경우, 시간표 목록 탭이 정상 동작한다 (시간표 2개인 학기)', async ({ page }) => {
  await page.goto('/');
  await givenUser(page);
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

test('로그인되었을 경우, 시간표 목록 탭이 정상 동작한다 (시간표 1개인 학기)', async ({ page }) => {
  await page.goto('/?year=2001&semester=2');
  await givenUser(page);
  const tabs = page.getByTestId('mt-tab');
  await expect(tabs).toHaveCount(1);
  const tab1 = tabs.filter({ hasText: '나비의 시간표' });
  await expect(tab1).toHaveAttribute('aria-selected', `${true}`);
});

test('로그인되었을 경우, 시간표 목록 탭이 정상 동작한다 (시간표 없는 학기)', async ({ page }) => {
  await page.goto('/?year=3001&semester=4');
  await givenUser(page);
  const tabs = page.getByTestId('mt-tab');
  await expect(tabs).toHaveCount(0);
});

test('로그인되었을 경우, 시간표 내용이 잘 보여진다 (월~금 시간표)', async ({ page }) => {
  await page.goto('/');
  await givenUser(page);
  const table = page.getByTestId('main-timetable');
  const lecture = page.getByTestId('main-timetable-lecture');
  await expect(table).not.toContainText('토');
  await expect(lecture).toHaveCount(18);
  await expect(lecture.filter({ hasText: '고급수학 2' })).toHaveCount(2);
  await expect(lecture.filter({ hasText: '상상력과 문화' }).first()).toHaveAttribute(
    'style',
    'background-color: rgb(166, 217, 48); color: rgb(255, 255, 255);',
  );
  await expect(lecture.filter({ hasText: '생물학실험' })).toHaveCSS('grid-column', '2 / 3');
  await expect(lecture.filter({ hasText: '생물학실험' })).toHaveCSS('grid-row', '16 / 20');
});

test('로그인되었을 경우, 시간표 내용이 잘 보여진다 (월~일 시간표)', async ({ page }) => {
  await page.goto('/?year=2001&semester=2');
  await givenUser(page);
  const table = page.getByTestId('main-timetable');
  const lecture = page.getByTestId('main-timetable-lecture');
  await expect(table).toContainText('일');
  await expect(lecture.filter({ hasText: '헬스' })).toHaveCount(7);
});

test('로그인되지 않았을 경우, 시간표 목록 탭이 정상 동작한다 (시간표 없는 학기)', async ({ page }) => {
  await page.goto('/?year=3001&semester=4');
  await givenUser(page, { login: false });
  const tabs = page.getByTestId('mt-tab');
  await expect(tabs).toHaveCount(0);
});
