import { expect, test } from '@jest/globals';

import { FullTimetable } from '@/entities/timetable';
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

test('getBitMask', () => {
  expect(
    timeMaskService.getBitMask([
      [false, false, true],
      [false, false, false],
    ]),
  ).toStrictEqual([0, 0, 2]);

  expect(
    timeMaskService.getBitMask([
      [false, false, true],
      [false, false, false],
      [false, true, false],
      [true, false, false],
      [false, true, false],
      [false, true, false],
    ]),
  ).toStrictEqual([4, 11, 32]);
});

test('getTimetableEmptyTimeBitMask', () => {
  expect(timeMaskService.getTimetableEmptyTimeBitMask({ lecture_list: [] } as unknown as FullTimetable)).toStrictEqual([
    1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823,
  ]);

  expect(
    timeMaskService.getTimetableEmptyTimeBitMask({
      lecture_list: [{ class_time_json: { day: 1, start: 0, len: 0.5 } }],
    } as unknown as FullTimetable),
  ).toStrictEqual([1073741823, 536870911, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823]);
});

test('getLectureFullTimeBitMask', () => {
  expect(timeMaskService.getLectureFullTimeBitMask([])).toStrictEqual([0, 0, 0, 0, 0, 0, 0]);

  expect(timeMaskService.getLectureFullTimeBitMask([{ day: 1, start: 0, len: 0.5 }])).toStrictEqual([
    0, 536870912, 0, 0, 0, 0, 0,
  ]);
});
