import { BaseLecture } from '@/entities/lecture';
import { AmPm, HourMinute } from '@/entities/time';
import { TimetableDisplayMode } from '@/entities/timetableView';
import { StorageRepository, storageRepository } from '@/repositories/storageRepository';
import { ArrayElement } from '@/utils/array-element';

export interface TimetableViewService {
  getDisplayMode: () => TimetableDisplayMode;
  setDisplayMode: (mode: TimetableDisplayMode) => void;

  getGridPos: (
    time: ArrayElement<BaseLecture['class_time_json']>,
    isCustomLecture?: boolean,
  ) => { col: [number, number]; row: [number, number] };

  parseTime: (time: string) => HourMinute; // 11:55 => { hour: 11, minute: 55 }
  formatTime: (hour: number, minute: number) => string; // { hour: 11, minute: 55 } => 11:55
  clock12To24: (hour: number, type: AmPm) => number;
  isBefore: (hm1: HourMinute, hm2: HourMinute) => boolean;
}

export const getTimetableViewService = ({
  repositories,
}: {
  repositories: [StorageRepository];
}): TimetableViewService => {
  const getDisplayMode = () => (repositories[0].get('timetable_display_mode', true) === 'full' ? 'full' : 'real');
  const parseTime = (time: string) => ({ hour: +time.split(':')[0], minute: +time.split(':')[1] });
  const formatTime = (hour: number, minute: number) => `${`${hour}`.padStart(2, '0')}:${`${minute}`.padStart(2, '0')}`;

  return {
    getDisplayMode,
    setDisplayMode: (mode) => repositories[0].set('timetable_display_mode', mode, true),
    getGridPos: (time, isCustomLecture = false) => {
      const displayMode = getDisplayMode();

      // 요일
      const colStart = time.day + 2;
      const colEnd = colStart + 1;

      // 시간
      const rowStart = (() => {
        const { hour, minute } = parseTime(time.start_time);
        return (hour - 8) * 12 + minute / 5 + 2;
      })();
      const rowEnd = (() => {
        const { hour, minute } = parseTime(time.end_time);
        const row = (hour - 8) * 12 + minute / 5;
        return displayMode === 'full' && !isCustomLecture ? Math.ceil(row / 6) * 6 + 2 : row + 2;
      })();

      return { col: [colStart, colEnd], row: [rowStart, rowEnd] };
    },
    parseTime,
    formatTime,
    clock12To24: (hour, type) => hour + (type === AmPm.PM ? 12 : 0),
    isBefore: (hm1, hm2) => hm1.hour * 60 + hm1.minute < hm2.hour * 60 + hm2.minute,
  };
};

export const timetableViewService = getTimetableViewService({
  repositories: [storageRepository],
});
