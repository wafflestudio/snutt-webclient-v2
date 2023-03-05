import { describe, expect, test } from '@jest/globals';

import { StorageRepository } from '@/repositories/storageRepository';
import { getTimetableViewService } from '@/usecases/timetableViewService';

describe('getGridPos', () => {
  type Time = Parameters<ReturnType<typeof getTimetableViewService>['getGridPos']>[0];

  test('default mode', () => {
    const timetableViewService = getTimetableViewService({
      repositories: [{ get: () => null } as unknown as StorageRepository],
    });

    expect(timetableViewService.getGridPos({ start_time: '11:00', end_time: '13:00', day: 1 } as Time)).toStrictEqual({
      row: [38, 62],
      col: [3, 4],
    });

    expect(timetableViewService.getGridPos({ start_time: '10:00', end_time: '12:45', day: 2 } as Time)).toStrictEqual({
      row: [26, 59],
      col: [4, 5],
    });

    expect(
      timetableViewService.getGridPos({ start_time: '11:00', end_time: '12:45', day: 3 } as Time, true),
    ).toStrictEqual({
      row: [38, 59],
      col: [5, 6],
    });
  });

  test('real mode', () => {
    const timetableViewService = getTimetableViewService({
      repositories: [{ get: () => 'real' } as unknown as StorageRepository],
    });

    expect(timetableViewService.getGridPos({ start_time: '11:00', end_time: '13:00', day: 1 } as Time)).toStrictEqual({
      row: [38, 62],
      col: [3, 4],
    });

    expect(timetableViewService.getGridPos({ start_time: '10:00', end_time: '12:45', day: 2 } as Time)).toStrictEqual({
      row: [26, 59],
      col: [4, 5],
    });

    expect(
      timetableViewService.getGridPos({ start_time: '11:00', end_time: '12:45', day: 3 } as Time, true),
    ).toStrictEqual({
      row: [38, 59],
      col: [5, 6],
    });
  });

  test('full mode', () => {
    const timetableViewService = getTimetableViewService({
      repositories: [{ get: () => 'full' } as unknown as StorageRepository],
    });

    expect(timetableViewService.getGridPos({ start_time: '11:00', end_time: '13:00', day: 1 } as Time)).toStrictEqual({
      row: [38, 62],
      col: [3, 4],
    });

    expect(timetableViewService.getGridPos({ start_time: '10:00', end_time: '12:45', day: 2 } as Time)).toStrictEqual({
      row: [26, 62],
      col: [4, 5],
    });

    expect(
      timetableViewService.getGridPos({ start_time: '11:00', end_time: '12:45', day: 3 } as Time, true),
    ).toStrictEqual({
      row: [38, 59],
      col: [5, 6],
    });
  });
});