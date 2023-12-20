import { createContext } from 'react';

import { type LectureService } from '@/usecases/lectureService';
import { type TimeMaskService } from '@/usecases/timeMaskService';

export type ServiceContext = {
  lectureService: LectureService;
  timeMaskService: TimeMaskService;
};

export const serviceContext = createContext<ServiceContext | null>(null);
