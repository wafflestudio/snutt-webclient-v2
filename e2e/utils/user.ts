import { Page } from '@playwright/test';

export const givenUser = (page: Page, { login = true } = {}) =>
  login ? page.evaluate(() => localStorage.setItem('snutt_token', 'this-is-fake-token')) : null;
