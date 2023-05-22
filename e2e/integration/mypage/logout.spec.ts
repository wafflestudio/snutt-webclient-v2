import { expect, test } from '@playwright/test';

import { givenUser } from '../../utils/user';

test('로그아웃이 잘 동작한다', async ({ page }) => {
  await page.goto('/mypage');
  await givenUser(page, { login: true });
  await page.getByText('로그아웃하기').click();

  // TODO: 스토리지 비워진거 테스트.. 어떻게하냐
  await expect(page).toHaveURL('/');
  // note: main 페이지의 정책에 강하게 결합되어 있음
  await expect(page.getByText('로그인하면 시간표를 이용할 수 있어요')).toHaveCount(1);
  await expect(page.getByText('강의를 검색하세요')).toHaveCount(1);
});
