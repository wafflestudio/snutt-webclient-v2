import { dayList } from '@/entities/time';
import { CellStatus, DragMode, Position, TimeMask, timeMaskHours } from '@/entities/timeMask';
import { FullTimetable } from '@/entities/timetable';

export interface TimeMaskService {
  getInitialCellStatus(row: number, col: number): CellStatus;
  getUpdatedCellStatus(prev: CellStatus, dragStart: Position, dragEnd: Position): CellStatus;
  checkIsInArea(target: Position, from: Position, to: Position): boolean;
  getDragMode(cellStatus: CellStatus, dragStart: Position): DragMode;
  getBitMask(cellStatus: CellStatus): TimeMask;
  getTimetableEmptyTimeBitMask(timetable?: FullTimetable): TimeMask;
}

const getTimeMaskService = (): TimeMaskService => {
  return {
    getInitialCellStatus: (r, c) =>
      Array(r)
        .fill(0)
        .map(() => Array(c).fill(false)),
    getUpdatedCellStatus: (prev, start, end) =>
      prev.map((row, i) =>
        row.map((col, j) =>
          timeMaskService.checkIsInArea({ i, j }, start, end)
            ? { add: true, remove: false }[timeMaskService.getDragMode(prev, start)]
            : col,
        ),
      ),
    checkIsInArea: (target: Position, from: Position, to: Position) =>
      target.i >= Math.min(from.i, to.i) &&
      target.i <= Math.max(from.i, to.i) &&
      target.j >= Math.min(from.j, to.j) &&
      target.j <= Math.max(from.j, to.j),
    getDragMode: (cellStatus, dragStart) => (cellStatus[dragStart.i][dragStart.j] ? 'remove' : 'add'),
    getBitMask: (cellStatus) => {
      const transposed = cellStatus[0].map((_, j) => cellStatus.map((row) => row[j])); // 행-열 반전
      return transposed.map((row) => row.map(Number).reduce((acc, cur) => acc * 2 + cur, 0)) as TimeMask;
    },
    getTimetableEmptyTimeBitMask: (timetable) => {
      const cellStatus = Array(timeMaskHours.length * 2)
        .fill(0)
        .map(() => Array(dayList.length).fill(true));

      timetable?.lecture_list
        .flatMap((l) => l.class_time_json)
        .forEach((t) => {
          for (let i = 0; i < t.len * 2; i++) {
            cellStatus[i + t.start * 2][t.day] = false;
          }
        });

      return timeMaskService.getBitMask(cellStatus);
    },
  };
};

export const timeMaskService = getTimeMaskService();
