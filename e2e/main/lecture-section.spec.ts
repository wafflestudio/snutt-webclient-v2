import { expect, test } from '@playwright/test';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { givenUser } from '../utils/user.ts';

test('강의 목록 탭이 정상 동작한다', async ({ page }) => {
  await page.goto('/');
  await givenUser(page);
  const resultTab = page.getByTestId('ml-result-tab');
  const currentTab = page.getByTestId('ml-current-tab');
  await expect(resultTab).toHaveAttribute('aria-selected', 'false');
  await expect(currentTab).toHaveAttribute('aria-selected', 'true');
  await resultTab.click();
  await expect(resultTab).toHaveAttribute('aria-selected', 'true');
  await expect(currentTab).toHaveAttribute('aria-selected', 'false');
});

test('현재 시간표 탭이 정상 동작한다', async ({ page }) => {
  await page.goto('/');
  await givenUser(page);
  const currentTab = page.getByTestId('ml-current-tab');
  await expect(currentTab).toHaveAttribute('aria-selected', 'true');

  const lectureItem = page.getByTestId('main-lecture-listitem');
  await expect(lectureItem.nth(0).getByTestId('main-lecture-listitem-title')).toHaveText('고급수학 2');
  await expect(lectureItem.nth(1).getByTestId('main-lecture-listitem-instructor')).toHaveText('이영기 / 4학점');
  await expect(lectureItem.nth(3).getByTestId('main-lecture-listitem-department')).toHaveText('생명과학부, 1학년');
  await expect(lectureItem.nth(4).getByTestId('main-lecture-listitem-time')).toHaveText(
    '화(12:30~13:45), 목(12:30~13:45)',
  );
});

test('수강편람 버튼이 정상 동작한다', async ({ page, context }) => {
  await page.goto('/');
  await givenUser(page);
  const currentTab = page.getByTestId('ml-current-tab');
  await expect(currentTab).toHaveAttribute('aria-selected', 'true');

  const lectureItem = page.getByTestId('main-lecture-listitem');
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    lectureItem.filter({ hasText: '고급수학 2' }).getByTestId('main-lecture-listitem-link').click(),
  ]);
  await expect(newPage).toHaveURL(
    'https://sugang.snu.ac.kr/sugang/cc/cc103.action?openSchyy=1001&openShtmFg=U000200001&openDetaShtmFg=U000300001&sbjtCd=L0442.000700&ltNo=001&sbjtSubhCd=000',
  );
  await expect(lectureItem.filter({ hasText: '복싱' }).getByTestId('main-lecture-listitem-link')).toHaveCount(0);
});

test('검색 결과 탭이 정상 동작한다', async ({ page }) => {
  await page.goto('/');
  await givenUser(page, { login: false });
  await page.getByTestId('main-searchbar-input').type('컴');
  await Promise.all([
    page.waitForRequest(
      (req) =>
        req.method() === 'POST' &&
        req.url().includes('/search_query') &&
        req.postDataJSON().title === '컴' &&
        req.postDataJSON().limit === 200 &&
        req.postDataJSON().semester === 1 &&
        req.postDataJSON().year === 1001 &&
        Object.entries(req.postDataJSON()).length === 4,
    ),
    page.getByTestId('main-searchbar-search').click(),
  ]);
  await expect(page.getByTestId('ml-result-tab')).toHaveAttribute('aria-selected', 'true');

  const lectureItem = page.getByTestId('main-lecture-listitem');
  await expect(lectureItem.nth(0).getByTestId('main-lecture-listitem-title')).toHaveText('컴퓨터구조');
});
