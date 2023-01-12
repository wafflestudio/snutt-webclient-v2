import { expect, test } from '@playwright/test';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { givenUser } from '../utils/user.ts';

test('강의 수정 모달이 잘 보여진다', async ({ page }) => {
  await page.goto('/');
  await givenUser(page);
  const lectureItem = page.getByTestId('main-lecture-listitem');
  await expect(page.getByTestId('main-lecture-edit-dialog-content')).toHaveCount(0);
  await lectureItem.filter({ hasText: '컴퓨터공학부, 2학년' }).click();
  await expect(page.getByTestId('main-lecture-edit-dialog-title')).toHaveValue('컴퓨터프로그래밍');
  await page.getByTestId('main-lecture-edit-dialog-instructor').type('떡볶이맛 아몬드');
  await page.getByTestId('main-lecture-edit-dialog-color').filter({ hasText: '라벤더' }).click();
  await page.getByTestId('main-lecture-edit-dialog-time').nth(0).locator('input').type('낙아치');
  // TODO: 제출
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
