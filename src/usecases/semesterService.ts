import { EnvRepository, envRepository } from '@/repositories/envRepository';
import { SemesterRepository, semesterRepository } from '@/repositories/semesterRepository';

type CourseBook = { year: number; semester: 1 | 2 | 3 | 4 };

export interface SemesterService {
  getCourseBooks(): Promise<CourseBook[]>;
}

const getSemesterService = (args: {
  services: [];
  repositories: [SemesterRepository, EnvRepository];
}): SemesterService => {
  const baseUrl = args.repositories[1].getBaseUrl();

  return {
    getCourseBooks: () => args.repositories[0].getCourseBooks({ baseUrl }),
  };
};

export const userService = getSemesterService({
  services: [],
  repositories: [semesterRepository, envRepository],
});
