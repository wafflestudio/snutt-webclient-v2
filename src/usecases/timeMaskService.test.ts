import { expect, test } from '@jest/globals';

import { timeMaskService } from '@/usecases/timeMaskService';

test('getInitialCellStatus', () => {
  expect(timeMaskService.getInitialCellStatus(2, 3)).toStrictEqual([
    [false, false, false],
    [false, false, false],
  ]);
});

test('getDragMode', () => {
  expect(
    timeMaskService.getDragMode(
      [
        [false, false, true],
        [false, false, false],
      ],
      { i: 0, j: 2 },
    ),
  ).toBe('remove');
});

test('checkIsInArea', () => {
  expect(timeMaskService.checkIsInArea({ i: 0, j: 2 }, { i: 0, j: 2 }, { i: 0, j: 2 })).toBe(true);
  expect(timeMaskService.checkIsInArea({ i: 0, j: 2 }, { i: 0, j: 1 }, { i: 1, j: 3 })).toBe(true);
  expect(timeMaskService.checkIsInArea({ i: 0, j: 0 }, { i: 0, j: 1 }, { i: 1, j: 3 })).toBe(false);
});

test('getUpdatedCellStatus', () => {
  expect(
    timeMaskService.getUpdatedCellStatus(
      [
        [false, false, true],
        [false, false, false],
      ],
      { i: 0, j: 0 },
      { i: 1, j: 1 },
    ),
  ).toStrictEqual([
    [true, true, true],
    [true, true, false],
  ]);
});
