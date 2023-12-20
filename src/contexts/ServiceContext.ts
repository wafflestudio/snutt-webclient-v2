import { createContext } from 'react';

import { type HourMinutePickerService } from '@/usecases/hourMinutePickerService';
import { type HourMinuteService } from '@/usecases/hourMinuteService';
import { type LectureService } from '@/usecases/lectureService';
import { type TimeMaskService } from '@/usecases/timeMaskService';
import { type TimetableViewService } from '@/usecases/timetableViewService';

export type ServiceContext = {
  lectureService: LectureService;
  timeMaskService: TimeMaskService;
  hourMinuteService: HourMinuteService;
  hourMinutePickerService: HourMinutePickerService;
  timetableViewService: TimetableViewService;
};

export const serviceContext = createContext<ServiceContext | null>(null);
