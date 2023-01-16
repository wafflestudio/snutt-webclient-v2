import { expect, test } from '@playwright/test';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { givenUser } from '../utils/user.ts';

test('강의 수정 모달이 잘 보여진다 (성공케이스)', async ({ page }) => {
  await page.goto('/');
  await givenUser(page);
  const lectureItem = page.getByTestId('main-lecture-listitem');
  await expect(page.getByTestId('main-lecture-edit-dialog-content')).toHaveCount(0);
  await lectureItem.filter({ hasText: '컴퓨터공학부, 2학년' }).click();
  await expect(page.getByTestId('main-lecture-edit-dialog-title')).toHaveValue('컴퓨터프로그래밍');
  await page.getByTestId('main-lecture-edit-dialog-instructor').fill('떡볶이맛 아몬드');
  await page.getByTestId('main-lecture-edit-dialog-color').filter({ hasText: '라벤더' }).click();
  await page.getByTestId('main-lecture-edit-dialog-time').nth(0).locator('input').fill('낙아치');
  await page.getByTestId('main-lecture-edit-dialog-time').nth(1).locator('select').nth(1).selectOption('11');
  await page.getByTestId('main-lecture-edit-dialog-remark').clear();
  await Promise.all([
    page.waitForRequest(
      (req) =>
        req.method() === 'PUT' &&
        req.url().includes('tables/123/lecture/5d1decbddb261b554d609dcc') &&
        req.postDataJSON().class_time_json[0].place === '낙아치' &&
        req.postDataJSON().class_time_json[2].place === '302-208' &&
        req.postDataJSON().course_title === '컴퓨터프로그래밍' &&
        req.postDataJSON().credit === 4 &&
        req.postDataJSON().instructor === '떡볶이맛 아몬드' &&
        req.postDataJSON().remark === '' &&
        req.postDataJSON().class_time_mask[1] === 14680064 &&
        req.postDataJSON().class_time_mask[2] === 240 &&
        req.postDataJSON().colorIndex === 8,
    ),
    page.waitForRequest((req) => req.method() === 'GET' && req.url().includes('tables/123')),
    page.getByTestId('main-lecture-edit-dialog-submit').click(),
  ]);
  // TODO: 모달 닫히는거 확인
  // TODO: 커스텀 색깔 고르는거 잘 되는지
});

test('커스텀 색이 잘 수정된다', async ({ page }) => {
  await page.goto('/');
  await givenUser(page);
  const lectureItem = page.getByTestId('main-lecture-listitem');
  await expect(page.getByTestId('main-lecture-edit-dialog-content')).toHaveCount(0);
  await lectureItem.filter({ hasText: '김우찬 / 2학점' }).click();
  await page.getByTestId('main-lecture-edit-dialog-custom-color').click();
  await page.getByTestId('main-lecture-edit-dialog-custom-color').locator('input').fill('#1a1a1a', { force: true });
  await Promise.all([
    page.waitForRequest(
      (req) =>
        req.url().includes('tables/123/lecture/5d1a0132db261b554d5d0078') &&
        req.postDataJSON().colorIndex === 0 &&
        req.postDataJSON().color.bg === '#1a1a1a' &&
        req.postDataJSON().color.fg === '#ffffff' &&
        req.method() === 'PUT',
    ),
    page.waitForRequest((req) => req.method() === 'GET' && req.url().includes('tables/123')),
    page.getByTestId('main-lecture-edit-dialog-submit').click(),
  ]);
});

test('강의 수정 모달이 잘 취소된다', async ({ page }) => {
  await page.goto('/');
  await givenUser(page);
  const lectureItem = page.getByTestId('main-lecture-listitem');
  await expect(page.getByTestId('main-lecture-edit-dialog-content')).toHaveCount(0);
  await lectureItem.filter({ hasText: '컴퓨터공학부, 2학년' }).click();
  await page.getByTestId('main-lecture-edit-dialog-instructor').type('떡볶이맛 아몬드');
  await page.getByTestId('main-lecture-edit-dialog-cancel').click();
  await lectureItem.filter({ hasText: '컴퓨터공학부, 2학년' }).click();
  await expect(page.getByTestId('main-lecture-edit-dialog-instructor')).toHaveValue('이영기');
});

test('강의 수정 모달이 잘 취소된다 (실패케이스)', async ({ page }) => {
  await page.goto('/');
  await givenUser(page);
  const lectureItem = page.getByTestId('main-lecture-listitem');
  await expect(page.getByTestId('main-lecture-edit-dialog-content')).toHaveCount(0);
  await lectureItem.filter({ hasText: '상상력과 문화' }).click();
  await page.getByTestId('main-lecture-edit-dialog-time').nth(1).locator('select').nth(0).selectOption('1');
  await page.getByTestId('main-lecture-edit-dialog-submit').click();
  await expect(page.getByTestId('error-dialog-message')).toHaveText('강의 시간이 서로 겹칩니다.');
});

test('강의 수정 모달이 잘 취소된다 (성공케이스, 커스텀강의)', async ({ page }) => {
  await page.goto('/');
  await givenUser(page);
  // TODO:
});
