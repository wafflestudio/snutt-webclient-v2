import { expect } from '@playwright/test';

import { bdd } from '../../utils/bdd';

export const mainPageTest = bdd(({ page }) => ({
  Then: {
    '테이블에 글자가 존재한다': (text: string) => expect(page.getByTestId('main-timetable')).toContainText(text),
    '강의 개수가 올바르게 보인다': (hasText: string, count: number) =>
      expect(page.getByTestId('main-timetable-lecture').filter({ hasText })).toHaveCount(count),
    '강의 아이템에 css가 있다': (hasText: string, css: { [key: string]: string }) =>
      Promise.all(
        Object.entries(css).map(([k, v]) =>
          expect(page.getByTestId('main-timetable-lecture').filter({ hasText })).toHaveCSS(k, v),
        ),
      ),
  },
}));
