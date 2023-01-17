import { expect, test } from '@playwright/test';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { givenUser } from '../utils/user.ts';

test('snutt 팀 링크로 잘 이동한다', async ({ page, context, baseURL }) => {
  await page.goto('/');
  await givenUser(page, { login: true });
  await page.getByText('WaffleStudio SNUTT 팀').click();
  const [newPage] = await Promise.all([context.waitForEvent('page'), page.getByText('WaffleStudio SNUTT 팀').click()]);
  await expect(newPage).toHaveURL(`${baseURL}/member`);
});

test('snutt github 링크로 잘 이동한다', async ({ page, context }) => {
  await page.goto('/');
  await givenUser(page, { login: true });
  await page.getByText('WaffleStudio SNUTT 팀').click();
  const [newPage] = await Promise.all([context.waitForEvent('page'), page.getByText('SNUTT Github').click()]);
  await expect(newPage).toHaveURL(`https://github.com/wafflestudio/snutt-webclient-v2`);
});

test('약관 링크로 잘 이동한다', async ({ page, context, baseURL }) => {
  await page.goto('/');
  await givenUser(page, { login: true });
  await page.getByText('약관').click();
  const [newPage] = await Promise.all([context.waitForEvent('page'), page.getByText('약관').click()]);
  await expect(newPage).toHaveURL(`${baseURL}/terms-of-service`);
});

test('개인정보 처리방침 링크로 잘 이동한다', async ({ page, context, baseURL }) => {
  await page.goto('/');
  await givenUser(page, { login: true });
  await page.getByText('개인정보 처리방침').click();
  const [newPage] = await Promise.all([context.waitForEvent('page'), page.getByText('개인정보 처리방침').click()]);
  await expect(newPage).toHaveURL(`${baseURL}/privacy_policy`);
});

test('개발자 괴롭히기 기능이 잘 동작한다 (취소)', async ({ page }) => {
  await page.goto('/');
  await givenUser(page, { login: true });
  await page.getByText('개발자 괴롭히기').click();
  // TODO:
});

test('개발자 괴롭히기 기능이 잘 동작한다 (폼 에러)', async ({ page }) => {
  await page.goto('/');
  await givenUser(page, { login: true });
  await page.getByText('개발자 괴롭히기').click();
  // TODO:
});

test('개발자 괴롭히기 기능이 잘 동작한다 (정상 제출)', async ({ page }) => {
  await page.goto('/');
  await givenUser(page, { login: true });
  await page.getByText('개발자 괴롭히기').click();
  // TODO:
});
