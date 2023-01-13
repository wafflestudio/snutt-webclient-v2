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

test('로그인되었을 경우, 시간표 생성 기능이 정상 동작한다 (성공 케이스)', async ({ page }) => {
  await page.goto('/?year=1001&semester=1');
  await givenUser(page, { login: true });
  await page.getByTestId('mt-create-timetable').click();
  await page.getByTestId('mt-create-timetable-title').type('나비의 시간표');
  await Promise.all([
    page.waitForRequest(
      (req) =>
        req.url().includes('/tables') &&
        req.method() === 'POST' &&
        req.postDataJSON().semester === 1 &&
        req.postDataJSON().year === 1001 &&
        req.postDataJSON().title === '나비의 시간표',
    ),
    page.getByTestId('mt-create-timetable-confirm').click(),
  ]);

  const tabs = page.getByTestId('mt-tab');
  await expect(tabs).toHaveCount(3);
  const newTab = tabs.filter({ hasText: '나비의 시간표' });
  await expect(newTab).toHaveAttribute('aria-selected', `${true}`);
});

test('로그인되었을 경우, 시간표 생성 기능이 정상 동작한다 (실패 케이스)', async ({ page }) => {
  await page.goto('/?year=1001&semester=1');
  await givenUser(page, { login: true });
  await page.getByTestId('mt-create-timetable').click();
  await page.getByTestId('mt-create-timetable-title').type('나의 시간표');
  await page.getByTestId('mt-create-timetable-confirm').click();

  const tabs = page.getByTestId('mt-tab');
  await expect(tabs).toHaveCount(2);
  await expect(page.getByTestId('mt-create-timetable-error')).toHaveText('동일한 이름의 시간표가 존재합니다');
  await page.getByTestId('mt-create-timetable-cancel').click();
  await page.getByTestId('mt-create-timetable').click();
  await expect(page.getByTestId('mt-create-timetable-error')).toHaveText('');
});

test('로그인되었을 경우, 시간표 삭제 기능이 정상 동작한다', async ({ page }) => {
  await page.goto('/?year=1001&semester=1');
  await givenUser(page, { login: true });

  const tabs = page.getByTestId('mt-tab');
  await tabs.filter({ hasText: '나무의 시간표' }).locator('[data-testid=mt-tab-delete]').click();
  await expect(page.getByTestId('mt-tt-delete-submit')).toBeDisabled();
  await page.getByTestId('mt-tt-delete-input').type('18학점');
  await Promise.all([
    page.waitForRequest((req) => req.method() === 'DELETE' && req.url().includes('/tables/456')),
    page.waitForRequest((req) => req.method() === 'GET' && req.url().includes('/tables')),
    page.getByTestId('mt-tt-delete-submit').click(),
  ]);
  await expect(tabs.filter({ hasText: '나의 시간표' })).toHaveAttribute('aria-selected', `${true}`);
});
