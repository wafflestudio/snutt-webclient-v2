import { Page } from '@playwright/test';

type Type =
  | 'temp' // 임시 유저
  | 'local' // 로컬 로그인 유저
  | 'fb'; // 페이스북 로그인 유저

export const givenUser = (page: Page, { login = true, type = 'local' }: { type?: Type; login?: boolean } = {}) =>
  login ? page.evaluate(() => localStorage.setItem('snutt_token', { temp: 't3', local: 't1', fb: 't2' }[type])) : null;
