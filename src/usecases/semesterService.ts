import { type CourseBook } from '@/entities/semester';
import { type SemesterRepository, semesterRepository } from '@/repositories/semesterRepository';
import { authService, envService } from '@/services';
import { type AuthService } from '@/usecases/authService';
import { type EnvService } from '@/usecases/envService';

type CourseBookLabel = `${number}-${1 | 'S' | 2 | 'W'}`;
type CourseBookValue = `${number}-${1 | 2 | 3 | 4}`;
type BaseCourseBook = Omit<CourseBook, 'updated_at'>;

export interface SemesterService {
  getCourseBooks(): Promise<CourseBook[]>;
  courseBookToLabel(cb: BaseCourseBook): CourseBookLabel;
  courseBookToValue(cb: BaseCourseBook): CourseBookValue;
  valueToCourseBook(value: CourseBookValue): BaseCourseBook;
}

const getSemesterService = (args: {
  services: [AuthService, EnvService];
  repositories: [SemesterRepository];
}): SemesterService => {
  const baseUrl = args.services[1].getBaseUrl();
  const apikey = args.services[0].getApiKey();

  return {
    getCourseBooks: () => args.repositories[0].getCourseBooks({ baseUrl, apikey }),
    courseBookToLabel: ({ year, semester }) => `${year}-${[, 1, 'S', 2, 'W'][semester] as 1 | 'S' | 2 | 'W'}`,
    courseBookToValue: ({ year, semester }) => `${year}-${semester}`,
    valueToCourseBook: (value) => ({
      year: Number(value.split('-')[0]),
      semester: Number(value.split('-')[1]) as 1 | 2 | 3 | 4,
    }),
  };
};

export const semesterService = getSemesterService({
  services: [authService, envService],
  repositories: [semesterRepository],
});
