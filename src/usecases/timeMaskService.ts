import { CellStatus, DragMode, Position } from '@/entities/timeMask';

export interface TimetableService {
  getInitialCellStatus(row: number, col: number): CellStatus;
  getUpdatedCellStatus(prev: CellStatus, dragStart: Position, dragEnd: Position): CellStatus;
  checkIsInArea(target: Position, from: Position, to: Position): boolean;
  getDragMode(cellStatus: CellStatus, dragStart: Position): DragMode;
}

const getTimetableService = (): TimetableService => {
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
  };
};

export const timeMaskService = getTimetableService();
