import { expect, test } from '@playwright/test';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { givenUser } from '../utils/user.ts';

test('비밀번호 변경 기능이 정상 동작한다 (비밀번호 확인 일치하지 않는 케이스)', async ({ page }) => {
  await page.goto('/mypage');
  await givenUser(page, { login: true });
  await page.getByTestId('mypage-change-password-old').type('asdf');
  await page.getByTestId('mypage-change-password-new').type('qwer');
  await page.getByTestId('mypage-change-password-confirm').type('zxcv');
  page.on('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('비밀번호 확인이 일치하지 않습니다.');
    await dialog.accept();
  });
  await page.getByTestId('mypage-change-password-submit').click();
});

test('비밀번호 변경 기능이 정상 동작한다 (비밀번호 포맷 일치하지 않는 케이스)', async ({ page }) => {
  await page.goto('/mypage');
  await givenUser(page, { login: true });
  await page.getByTestId('mypage-change-password-old').type('asdf');
  await page.getByTestId('mypage-change-password-new').type('qwer');
  await page.getByTestId('mypage-change-password-confirm').type('qwer');
  page.on('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('비밀번호는 영문자, 숫자가 조합된 6자리 이상 20자리 이하여야 합니다.');
    await dialog.accept();
  });
  await page.getByTestId('mypage-change-password-submit').click();
});

test('비밀번호 변경 기능이 정상 동작한다 (기존 비밀번호 틀린 케이스)', async ({ page }) => {
  await page.goto('/mypage');
  await givenUser(page, { login: true });
  // TODO:
});

test('비밀번호 변경 기능이 정상 동작한다 (정상 케이스)', async ({ page }) => {
  await page.goto('/mypage');
  await givenUser(page, { login: true });
  // TODO:
});
