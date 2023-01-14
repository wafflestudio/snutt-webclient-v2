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
        req.postDataJSON().class_time_json[0].place === '낙아치' &&
        req.postDataJSON().class_time_json[2].place === '302-208' &&
        req.postDataJSON().course_title === '컴퓨터프로그래밍' &&
        req.postDataJSON().credit === 4 &&
        req.postDataJSON().instructor === '떡볶이맛 아몬드' &&
        req.postDataJSON().remark === '' &&
        req.postDataJSON().class_time_mask[1] === 14680064 &&
        req.postDataJSON().class_time_mask[2] === 240 &&
        req.postDataJSON().colorIndex === 7,
    ),
    page.getByTestId('main-lecture-edit-dialog-submit').click(),
  ]);
  // TODO: 모달 닫히는거 확인
  // TODO: 커스텀 색깔 고르는거 잘 되는지
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
  page.on('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('강의 시간이 서로 겹칩니다.');
    await dialog.accept();
  });
  await page.getByTestId('main-lecture-edit-dialog-submit').click();
});

test('강의 수정 모달이 잘 취소된다 (성공케이스, 커스텀강의)', async ({ page }) => {
  await page.goto('/');
  await givenUser(page);
  // TODO:
});
