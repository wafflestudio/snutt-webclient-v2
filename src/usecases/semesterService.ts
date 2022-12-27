import { CourseBook } from '@/entities/semester';
import { EnvRepository, envRepository } from '@/repositories/envRepository';
import { SemesterRepository, semesterRepository } from '@/repositories/semesterRepository';

import { AuthService, authService } from './authService';

export interface SemesterService {
  getCourseBooks(): Promise<CourseBook[]>;
  getCourseBookLabel(cb: CourseBook): string;
}

const getSemesterService = (args: {
  services: [AuthService];
  repositories: [SemesterRepository, EnvRepository];
}): SemesterService => {
  const baseUrl = args.repositories[1].getBaseUrl();
  const apikey = args.services[0].getApiKey();

  return {
    getCourseBooks: () => args.repositories[0].getCourseBooks({ baseUrl, apikey }),
    getCourseBookLabel: ({ year, semester }: CourseBook) => `${year}-${[, 1, 'S', 2, 'W'][semester]}`,
  };
};

export const semesterService = getSemesterService({
  services: [authService],
  repositories: [semesterRepository, envRepository],
});
