import { createContext } from 'react';

import { type HourMinutePickerService } from '@/usecases/hourMinutePickerService';
import { type HourMinuteService } from '@/usecases/hourMinuteService';
import { type LectureService } from '@/usecases/lectureService';
import { type TimeMaskService } from '@/usecases/timeMaskService';

export type ServiceContext = {
  lectureService: LectureService;
  timeMaskService: TimeMaskService;
  hourMinuteService: HourMinuteService;
  hourMinutePickerService: HourMinutePickerService;
};

export const serviceContext = createContext<ServiceContext | null>(null);
