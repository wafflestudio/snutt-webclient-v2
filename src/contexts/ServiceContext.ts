import { createContext } from 'react';

import { type LectureService } from '@/usecases/lectureService';

export type ServiceContext = {
  lectureService: LectureService;
};

export const serviceContext = createContext<ServiceContext | null>(null);
