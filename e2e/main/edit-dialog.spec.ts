import { expect, test } from '@playwright/test';

test('강의 수정 모달이 잘 보여진다', async ({ page }) => {
  await page.goto('/');
  const lectureItem = page.getByTestId('main-lecture-listitem');
  await expect(page.getByTestId('main-lecture-edit-dialog-content')).toHaveCount(0);
  await lectureItem.filter({ hasText: '컴퓨터공학부, 2학년' }).click();
  await expect(page.getByTestId('main-lecture-edit-dialog-content')).toContainText('컴퓨터프로그래밍');
});
