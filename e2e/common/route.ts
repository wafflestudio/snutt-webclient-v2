import { expect } from '@playwright/test';

import { type Helpers } from '../utils/bdd';

const routePathMap = { 메인: () => '/' };

export const getRouteSpecs = ({ page }: Helpers) => ({
  When: {
    '화면을 방문한다': <P extends RoutePage>(
      path: Parameters<PathMap[P]> extends [] ? [P] : [P, ...Parameters<PathMap[P]>],
      query?: Record<string, number | string>,
    ) => page.goto(getUrl(path, query)),
  },

  Then: {
    '화면으로 이동한다': <P extends RoutePage>(
      path: Parameters<PathMap[P]> extends [] ? [P] : [P, ...Parameters<PathMap[P]>],
      query?: Record<string, number | string>,
    ) => expect(page).toHaveURL(getUrl(path, query)),
  },
});

type PathMap = typeof routePathMap;
type RoutePage = keyof PathMap;

const getUrl = <P extends RoutePage>(
  path: Parameters<PathMap[P]> extends [] ? [P] : [P, ...Parameters<PathMap[P]>],
  query: Record<string, number | string> = {},
) => {
  // TODO: @woohm402 find a better type..
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // prettier-ignore
  const pathName = Array.isArray(path) ? routePathMap[path[0]](...path.slice(1)) : routePathMap[path]();
  const queryString = Object.keys(query).length
    ? `?${new URLSearchParams(Object.fromEntries(Object.entries(query).map(([key, value]) => [key, String(value)])))}`
    : '';

  return pathName + queryString;
};
